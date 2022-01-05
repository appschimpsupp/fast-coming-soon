import Router from "koa-router";
import Shopify, { DataType } from "@shopify/shopify-api";

const settingsRouter = new Router();

// Get app coming soon settings.
settingsRouter.get("/getSettings", async (ctx) => {
    try {
      console.log('Get App Settings');
      const shopQuery = ctx.query.shop;
     
      console.log('shopQuery ' + shopQuery);

      const prisma = ctx.prisma;
      const result = await prisma.appSettings.findUnique({
        where: {
          shop: shopQuery,
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

  // Save app settings in DB.
  settingsRouter.post("/saveSettings", async (ctx) => {
    try {
      console.log('Save Settings Request');
      const prisma = ctx.prisma;
      const payload = ctx.request.body;

      console.log('payload :- ' + payload.formData);
      console.log('Get Active Theme :- ' + payload.shop);
      console.log('contentTitle :- ' + payload.formData);
      const activeThemeStatus = await prisma.appSettings.upsert({
        where: { shop: payload.shop },
        update: { settings: JSON.stringify(payload.formData) },
        create: {
          shop: payload.shop,
          settings: JSON.stringify(payload.formData),
        }
      }).finally(async () => {
        await prisma.$disconnect()
      })
      
      console.log(activeThemeStatus);
      ctx.body = { data: activeThemeStatus };
      ctx.res.statusCode = 200;
    } catch (error) {
      console.log(`Failed to process webhook: ${error}`);
    }
  });


  // Get app coming soon settings.
settingsRouter.get("/planCheck", async (ctx) => {
  try {
    console.log('Plan Check');
    const prisma = ctx.prisma;
    const shopQuery = ctx.query.shop;

    const result = await prisma.accessDetails.findUnique({
      where: {
        shop: shopQuery,
      },
    }).finally(async () => {
      await prisma.$disconnect()
    }) 

    const plansData = await prisma.activePlans.findUnique({
      where: {
        shop: shopQuery,
      },
    }).finally(async () => {
      await prisma.$disconnect()
    })

    let resultPlansData = {};
    
    if(plansData != null){
       resultPlansData = JSON.parse(plansData.data);
    }
    
    console.log('shopQuery ' + shopQuery);

    if(plansData != null && resultPlansData.body.recurring_application_charge.status == 'active') {
      ctx.body = { confirmation_url: 'active' };
    } else {
      const client = new Shopify.Clients.Rest(shopQuery, result.token);
      let returnUrl = process.env.HOST + '/afterSubscription?shop='+shopQuery;

          // Delete previous entry if any
          if(plansData != null && resultPlansData.body.recurring_application_charge.status == 'pending') {
            
            await prisma.activePlans.delete({
              where: {
                shop: shopQuery,
              },
            }).finally(async () => {
              await prisma.$disconnect()
            }) 
          }
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
          console.log('plan check responseSubscription ' + responseSubscription);
          let planData = {
            shop: shopQuery,
            data: JSON.stringify(responseSubscription)
          }
      await prisma.activePlans.create({ data: planData });
      const confirmationURL = responseSubscription.body.recurring_application_charge.confirmation_url;

      console.log('redirecting url : : ' + confirmationURL);
      ctx.body = { confirmation_url: confirmationURL };
    }

    ctx.res.statusCode = 200;
  } catch (error) {
    console.log(`Failed to Active Theme: ${error}`);
  }
});

export default settingsRouter;