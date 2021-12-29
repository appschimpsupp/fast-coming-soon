import Router from "koa-router";
import Shopify, { DataType } from "@shopify/shopify-api";

const shopRouter = new Router();

// Get shop data from Shopify API.
shopRouter.get("/getShopData", async (ctx) => {
    try {
      const shopQuery = ctx.query.shop;
      console.log('Get Shop Data' + shopQuery);
      
      const prisma = ctx.prisma;

      const result = await prisma.accessDetails.findUnique({
        where: {
          shop: shopQuery,
        },
      }).finally(async () => {
        await prisma.$disconnect()
      })   
      
      const client = new Shopify.Clients.Rest(shopQuery, result.token);
      const data = await client.get({
        path: 'shop',
      });
     
      if(result !== null) {
        ctx.body = { data: data, shop : shopQuery };
      } else {
        ctx.body = { data: 'none' };
      }
      
      ctx.res.statusCode = 200;
    } catch (error) {
      console.log(`Failed to Active Theme: ${error}`);
    }
  });

  shopRouter.get("/getActivationStatus", async (ctx) => {
    try {
      const shopQuery = ctx.query.shop;
      console.log('Get Activation Status shopshopshop ' + shopQuery);
      const prisma = ctx.prisma;
      
      const result = await prisma.activeStatus.findUnique({
        where: {
          shop: shopQuery
        },
      }).finally(async () => {
        await prisma.$disconnect()
      })    
      console.log(result);
      if(result !== null) {
        ctx.body = { data: result };
      } else {
        ctx.body = { data: 'none' };
      }
      
      ctx.res.statusCode = 200;
    } catch (error) {
      console.log(`Failed to Active Theme: ${error}`);
    }
  });

   // Activate or Deactivate coming soon page.
   shopRouter.post("/activationStatus", async (ctx) => {
    try {
      console.log('Update Activation Status Request');
      const payload = ctx.request.body;
      console.log('payload :- ' + JSON.stringify(payload));

      const prisma = ctx.prisma;
      let activationValue = 0;

      const result = await prisma.accessDetails.findUnique({
        where: {
          shop: payload.shop,
        },
      }).finally(async () => {
        await prisma.$disconnect()
      });

      const client = new Shopify.Clients.Rest(payload.shop, result.token);
      console.log('result :- ' + result.token);

      // let themeCode = '';

      if(payload.action == 'activate') {
        // themeCode = '{% capture CFH %}{{ content_for_header  }}{% endcapture %}' +
        // "{% if CFH contains 'admin_bar_iframe' %}" +
        // "{% assign admin = true %}{% elsif CFH contains 'preview_bar_injector-' %}{% assign admin = true %}{% endif %}" +
        // "{% if admin %}{% else %}" +
        // '<script>' + 
        //    ' var url  = window.location.href;' + 
        //     '  if(url.indexOf("oseid") > -1 || url.indexOf("fts") > -1) {} else {' +
        //      '  window.location.pathname == "/apps/fast-coming-soon" ? "" : window.location.href = "{{shop.url}}/apps/fast-coming-soon"; ' +
        //      '} ' + 
        // '</script>'+ 
        // '{% endif %}';

        activationValue = 1;
        
      }

      // Get active theme of current shop.
      // const themeData = await client.get({
      //   path: 'themes',
      //   type: DataType.JSON
      // });

      // console.log('themeData request' + themeData);
      // console.log('themeData Stringify : ' + JSON.stringify(themeData));
      // let themeID = 0;
      // if(themeData) {
      //   themeData.body.themes.map( theme => {
      //     if(theme.role == 'main') {
      //       themeID = theme.id;
      //     }
          
      //   });
      // }
     
      // console.log('Current Theme ID : ' + themeID);

      if(result.token) {
        // // Get theme.liquid template.
        // const dataThemeLiquid = await client.get({
        //   path: 'themes/'+themeID+'/assets',
        //   query: {"asset[key]":"layout/theme.liquid"},
        // });
        
        // console.log('theme.liquid template : ' + dataThemeLiquid.body.asset.value);

       // let themeLiquidDataStr = '';
        // // Add Coming Soon template.if(payload.action == 'activate') {
        // if(dataThemeLiquid.body.asset.value && payload.action == 'activate') {
        //   let themeLiquidData = dataThemeLiquid.body.asset.value;
        //   themeLiquidDataStr = themeLiquidData.replace("<head>", "<head>{% include 'fast-coming-soon' %}");
        // } else if(dataThemeLiquid.body.asset.value && payload.action == 'deactivate') {
        //   let themeLiquidData = dataThemeLiquid.body.asset.value;
        //   themeLiquidDataStr = themeLiquidData.replace("{% include 'fast-coming-soon' %}", "");

        //   // Delete the snippet
        //   // const dataDelete = await client.delete({
        //   //   path: 'themes/'+themeID+'/assets',
        //   //   query: {"asset[key]":"snippets/fast-coming-soon.liquid"},
        //   // });
        //   // console.log('dataDelete : ' + dataDelete);
        // }
        
        // const dataThemeLiquidUpdate = await client.put({
        //   path: 'themes/'+themeID+'/assets',
        //   data: {
        //       "asset":
        //         {
        //           "key":"layout/theme.liquid",
        //           "value": themeLiquidDataStr
        //         }
        //       },
        //   type: DataType.JSON,
        // });

        // console.log('dataThemeLiquidUpdate : ' + dataThemeLiquidUpdate);

        // if(payload.action == 'activate') {
        //   const data2 = await client.put({
        //     path: 'themes/'+themeID+'/assets',
        //     data: {
        //         "asset":
        //           {
        //             "key":"snippets/fast-coming-soon.liquid",
        //             "value": themeCode
        //           }
        //         },
        //     type: DataType.JSON,
        //   });
        // }

        // Add/Update metafield.
        const metaData = await client.post({
          path: 'metafields',
          data: {
            "metafield":
              {
                "namespace":"fastComingSoon",
                "key":"status",
                "value":activationValue,
                "type":"number_integer"
              }
            },
          type: DataType.JSON,
        });
        console.log('metaData request' + JSON.stringify(metaData));
        
        // Update status in DB.
        // const dbActiveStatus = await prisma.activeStatus.upsert({
        //   where: { shop: payload.shop },
        //   update: { 	status: payload.action },
        //   create: {
        //     shop: payload.shop,
        //     status: payload.action,
        //   }
        // }).finally(async () => {
        //   await prisma.$disconnect()
        // })
        //console.log('data theme request' + data);
        ctx.body = { data: 'success' };
      }
      
      ctx.res.statusCode = 200;
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  });

  export default shopRouter;