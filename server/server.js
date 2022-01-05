import "@babel/polyfill";
import dotenv from "dotenv";
import "isomorphic-fetch";
import createShopifyAuth, { verifyRequest } from "@shopify/koa-shopify-auth";
import Shopify, { DataType } from "@shopify/shopify-api";
import cors from '@koa/cors';
import Koa from "koa";
import bodyParser  from 'koa-bodyparser';
import next from "next";
import Router from "koa-router";
import indexRouter from './routers/index';
import { registerWebhook } from '@shopify/koa-shopify-webhooks';
import { PrismaClient } from '@prisma/client';

const render = require('koa-ejs'); // EJS template engine.
const path = require('path');

dotenv.config();
const port = parseInt(process.env.PORT, 10) || 8081;
const dev = process.env.NODE_ENV !== "production";
const app = next({
  dev,
});

const handle = app.getRequestHandler();

Shopify.Context.initialize({
  API_KEY: process.env.SHOPIFY_API_KEY,
  API_SECRET_KEY: process.env.SHOPIFY_API_SECRET,
  SCOPES: process.env.SCOPES.split(","),
  HOST_NAME: process.env.HOST.replace(/https:\/\//, ""),
  API_VERSION: '2021-10',
  IS_EMBEDDED_APP: true,
  // This should be replaced with your preferred storage strategy
  SESSION_STORAGE: new Shopify.Session.MemorySessionStorage(),
});

// Storing the currently active shops in memory will force them to re-login when your server restarts. You should
// persist this object in your app.
const ACTIVE_SHOPIFY_SHOPS = {};
let shopObj = {}; // Contains shop name.
let hostObj = {}; // Contains host string.

app.prepare().then(async () => {
  const server = new Koa();
 
  const router = new Router();
  const prisma = new PrismaClient();
  server.context.prisma = prisma;
  

  // render function for EJS.
  render(server, {
    root: path.join(__dirname, 'views'),
    layout: false,
    viewExt: 'html',
    cache: false,
    debug: true
  });

  server.keys = [Shopify.Context.API_SECRET_KEY];
  server.use(
    createShopifyAuth({
      accessMode: 'offline',
      async afterAuth(ctx) {
        console.log('After Authorization Called');
        // Access token and shop available in ctx.state.shopify
        const { shop, accessToken, scope } = ctx.state.shopify;
        const host = ctx.query.host;
        hostObj = ctx.query.host;
        ACTIVE_SHOPIFY_SHOPS[shop] = scope;
        shopObj = shop;

        // Set Global context variables to access data at each request.
        server.context.shop = shop;
        const client = new Shopify.Clients.Rest(shop, accessToken);

        if(ctx.query.host) {
          server.context.hostVal = ctx.query.host;
        }
        
        const response = await registerWebhook({
          address: process.env.HOST + '/uninstall',
          topic: 'APP_UNINSTALLED',
          accessToken,
          shop,
          apiVersion: '2021-10',
        });

        console.log('Webhook Response : '+ JSON.stringify(response));
        console.log('accessToken : '+ accessToken);
        console.log('shop : '+ shop);
        console.log('shopObj : '+ shopObj);
       
        // Insert Access Token in DB.
        if (response.success) {
          let user = {
            shop: shop,
            token: accessToken
          }
          const result2 = await prisma.accessDetails.create({ data: user });
          console.log('result : ' + result2);
        }

        if (!response.success) {
          console.log(
            `Failed to register APP_UNINSTALLED webhook: ${response.result}`
          );
        }
        
        if (response.success) {
          let returnUrl = process.env.HOST + '/afterSubscription?shop='+shop;
          
          const responseSubscription = await client.post({
            path: 'recurring_application_charges',
            data: {"recurring_application_charge": 
              {
                "name":"Premium Plan",
                "trial_days": 7,
                "price":0.99,
                "return_url": returnUrl,
                "test": false
              }},
            type: DataType.JSON,
          });
          console.log('rasdesponseSubscription : ' + JSON.stringify(responseSubscription));
          
          let planData = {
            shop: shop,
            data: JSON.stringify(responseSubscription)
          }
          await prisma.activePlans.create({ data: planData });
          const confirmationURL = responseSubscription.body.recurring_application_charge.confirmation_url;
          ctx.redirect(confirmationURL);
        }
        // Redirect to app with shop parameter upon auth
        //ctx.redirect(`/?shop=${shop}&host=${host}`);
      },
    })
  );

  // Update billing status of user payment.
  router.get("/afterSubscription", async (ctx) => {
    try {
      const prisma = new PrismaClient();
      shopObj = ctx.shop;

      if(!shopObj) {
        shopObj = ctx.query.shop;
      }

      console.log(' shopObj : ' + shopObj);
      const result = await prisma.accessDetails.findUnique({
        where: {
          shop: shopObj,
        },
      });
      //console.log('ctx : ' + JSON.stringify(ctx) );
      const accessToken = result.token;  
      const client = new Shopify.Clients.Rest(shopObj, accessToken);
      console.log(' result : ' + result);
      if(result !== null) {
        const chargeID = ctx.query.charge_id;
        console.log('chargeID ' + chargeID);
        const responseSingleCharge = await client.get({
          path: 'recurring_application_charges/'+chargeID,
        });
        console.log('Single Charge ID : ' + JSON.stringify(responseSingleCharge) );
        if(responseSingleCharge.body.recurring_application_charge.status == "active") {
          console.log('Single Charge ID : ' + responseSingleCharge.body.recurring_application_charge.status );
          
          // Update status active.
          await prisma.activePlans.upsert({
            where: { shop: shopObj },
            update: { data: JSON.stringify(responseSingleCharge) },
            create: {
              shop: shopObj,
              data: JSON.stringify(responseSingleCharge),
            }
          }).finally(async () => {
            await prisma.$disconnect()
          });


          ctx.redirect(`/?shop=${shopObj}&host=${ctx.hostVal}`);
        }
      } 
      ctx.body = 'error';
    } catch (error) {
      console.log(`Failed After Confirmation URL: ${error}`);
    }
  });

  const handleRequest = async (ctx) => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
    ctx.res.statusCode = 200;
  };
  // Test post.
  router.post(
    "/graphql",
    verifyRequest({ returnHeader: true }),
    async (ctx, next) => {
      await Shopify.Utils.graphqlProxy(ctx.req, ctx.res);
    }
  );

  // Handle show Coming Page proxy request from front end.
  router.get("/coming_soon", async (ctx) => {
    try {
      console.log('Show Coming Soon Page' + ctx.shop);
      shopObj = ctx.get('x-forwarded-host');
      console.log('Show Coming Soon Page payload ' + JSON.stringify());
      console.log('Show Coming Soon Page payload ' + JSON.stringify(ctx.request));
      console.log('Show Coming Soon Page payload ' + JSON.stringify(ctx.request.shop));
      // Get app settings.
      const prisma = new PrismaClient();

      // Get avtivation status
      const actviationStatus = await prisma.activeStatus.findUnique({
        where: {
          shop: shopObj,
        },
      }).finally(async () => {
        await prisma.$disconnect()
      })
      
      console.log('actviationStatus : ' + actviationStatus);

      // if(actviationStatus == null) {
      //   ctx.body = '<h3>Please activate your Coming Soon page from settings.</h3>';
      // }
      
      // if( ! actviationStatus.status || actviationStatus.status == 'deactivate') {
      //   ctx.body = '<h3>Activate Your Coming Soon Page</h3>';
      //   return ;
      // }

      const settings = await prisma.appSettings.findUnique({
        where: {
          shop: shopObj,
        },
      }).finally(async () => {
        await prisma.$disconnect()
      })

      console.log('settings : ' + settings);
      
      // Get active theme.
      const activeTheme = await prisma.activetheme.findUnique({
        where: {
          shop: shopObj,
        },
      }).finally(async () => {
        await prisma.$disconnect()
      })

      let formData = '';
      let shop = '';
      let activeThemeID = '1';

      console.log('activeTheme : ' + activeTheme);

      if(activeTheme !== null) {
        activeThemeID = activeTheme.theme_id;
      }

      if(settings !== null) {
        formData = JSON.parse(settings.settings);
        shop = settings.shop;
      } else {
        formData = 'none';
        shop = 'none';
      }
     
      await ctx.render(
        'theme-' + activeThemeID + '/index', 
        { 
          data : formData, 
          shop: shop,
        }
      );

      // ctx.body = ctx.render('index');
      // ctx.res.statusCode = 200;
    } catch (error) {
      console.log(`Failed to Active Theme: ${error}`);
    }
  });


  router.get("(/_next/static/.*)", handleRequest); // Static content is clear
  router.get("/_next/webpack-hmr", handleRequest); // Webpack content is clear
  router.get("(.*)", async (ctx) => {
   
    let accessToken = '';
    const shop = ctx.query.shop;
    shopObj    = shop; 
    console.log('ctx query : ' + JSON.stringify(ctx.query));
    console.log('server called : ' + JSON.stringify(shop) );
    //console.log('ctx : ' + JSON.stringify(ctx));

    // This shop hasn't been seen yet, go through OAuth to create a session
    
    // Get access token to check if this shop is new or not.
    // Get active theme.
    if(shopObj) {
      const prisma = new PrismaClient();
      const result = await prisma.accessDetails.findUnique({
          where: {
            shop: shopObj,
      },
      }).finally(async () => {
          await prisma.$disconnect()
      });
      
      if(result) {
         accessToken = result.token;
      }
      console.log('accessTokenResult :' + accessToken);
    }

    //if (ACTIVE_SHOPIFY_SHOPS[shop] === undefined) {
    if (accessToken == '' && shop) {
     ctx.redirect(`/auth?shop=${shop}`);
    } else {
     await handleRequest(ctx);
    }

    //await handleRequest(ctx);
  });

  server.use(cors());
  server.use(bodyParser());
  server.use(indexRouter());
  server.use(router.allowedMethods());
  server.use(router.routes());
  
  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
