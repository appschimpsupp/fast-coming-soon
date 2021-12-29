import Router from "koa-router";
import "@babel/polyfill";
import dotenv from "dotenv";
import "isomorphic-fetch";
import Shopify from "@shopify/shopify-api";
import {receiveWebhook, registerWebhook} from '@shopify/koa-shopify-webhooks';
dotenv.config();
const webhookRouter = new Router();
const webhook = receiveWebhook({secret: process.env.SHOPIFY_API_SECRET});

// 	Requests to view stored customer data.
webhookRouter.post("/customer_data_request", webhook, async (ctx) => {
  try {
    console.log(`Webhook processed, returned status code 200`);
    await Shopify.Webhooks.Registry.process(ctx.req, ctx.res);
    ctx.res.statusCode = 200;
  } catch (error) {
    console.log(`Failed to process webhook: ${error}`);
  }
});

// 	Requests to delete customer data.
webhookRouter.post("/customer_data_erasure", webhook, async (ctx) => {
  try {
    console.log(`Webhook processed, returned status code 200`);
    await Shopify.Webhooks.Registry.process(ctx.req, ctx.res);
    ctx.res.statusCode = 200;
  } catch (error) {
    console.log(`Failed to process webhook: ${error}`);
  }
});

// 	Requests to delete shop data.
webhookRouter.post("/shop_erasure", webhook, async (ctx) => {
  try {
    console.log(`Webhook processed, returned status code 200`);
    await Shopify.Webhooks.Registry.process(ctx.req, ctx.res);
    ctx.res.statusCode = 200;
  } catch (error) {
    console.log(`Failed to process webhook: ${error}`);
  }
});

// 	Requests to view stored customer data.
webhookRouter.post("/customers/data_request	", webhook, async (ctx) => {
  console.log(`Customers Webhook processed, returned status code 200`);
  await Shopify.Webhooks.Registry.process(ctx.req, ctx.res);
  ctx.res.statusCode = 200;
});

// Uninstall webhook.
 webhookRouter.post("/uninstall", webhook, async (ctx) => {
        try {
          console.log('Uninstall Webhook Called ');
          const payload = ctx.request.body;
          console.log('Uninstall Webhook payload ' + JSON.stringify(payload));
          
          const prisma = ctx.prisma;

          await prisma.accessDetails.delete({
            where: {
              shop: payload.myshopify_domain,
            },
          }).finally(async () => {
            await prisma.$disconnect()
          }) 
    
          await prisma.activePlans.delete({
            where: {
              shop: payload.myshopify_domain,
            },
          }).finally(async () => {
            await prisma.$disconnect()
          });
          
          ctx.res.statusCode = 200;
          //await Shopify.Webhooks.Registry.process(ctx.req, ctx.res);
          console.log(`Webhook processed, returned status code 200`);
        } catch (error) {
          console.log(`Failed to process webhook: ${error}`);
        }
      });

  export default webhookRouter;