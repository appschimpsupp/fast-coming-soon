import Router from "koa-router";
import fetch from "node-fetch";
import Shopify, { DataType } from '@shopify/shopify-api';

const subscriptionSettings = new Router();

// Get Mailchimp audience lists.
subscriptionSettings.get("/getSubscriptionLists", async (ctx) => {
    
      const mcKey = ctx.query.mckey;
      var dataCenter = ctx.query.mckey.split('-')[1]; 
      console.log('mcKey := ' + mcKey);
      console.log('dataCenter := ' + dataCenter);
      /**** MailChimp Code ****/
      const url = 'https://'+dataCenter+'.api.mailchimp.com/3.0/lists/';
      const options = {
        method: 'GET',  
        headers: {
          Accept: 'application/json', 
          'Content-Type': 'application/json',
          'authorization' : 'apikey '+ mcKey
        }
      };

      const data = await fetch(url, options)
        .then(res => res.json())
        .then(json => {
            console.log('Mailchimp List Response:' + JSON.stringify(json));
            ctx.body = { data: json };
            ctx.res.statusCode = 200;
          }
        ).catch(err => {
          ctx.res.statusCode = 400;
          ctx.body = { data: err };
        });
    /**** MailChimp Code Ends ****/
  });

// Add mail to subscription list.
subscriptionSettings.get("/addSubscription", async (ctx) => {
  const shopQuery = ctx.query.shop;
  const email = ctx.query.email;
  let finalStatus = 'fail';
  
  let fname = '';
  let lname = '';

  if(ctx.query.name != '' && ctx.query.name != null) {
    fname = ctx.query.name.split(' ').slice(0, -1).join(' ');
    lname = ctx.query.name.split(' ').slice(-1).join(' ');
  }

  if(!fname || fname == 'undefined') {
    fname='';
  }
  if(!lname || lname == 'undefined') {
    lname='';
  }

  console.log('getSubscriptionTest := := := := := ' + shopQuery);
  console.log('email := := := := := ' + email);

  const prisma = ctx.prisma;
  
  const result = await prisma.appSettings.findUnique({
    where: {
      shop: shopQuery,
    },
  }).finally(async () => {
    await prisma.$disconnect()
  });

  let formData = {};

  //console.log('Store Data := := := := := ' + result.settings);
  if(result != null) {
     formData = JSON.parse(result.settings);
  }
  

  console.log('Store Data := := := := := ' + formData.subscriptionStatus );
  console.log('Store Data := := := := := ' + formData.mcStatus );
  console.log('Store Data := := := := := ' + formData.mclistOption );
  console.log('Store Data := := := := := ' + formData.mckey );

  // Add Shopify subscriber
  if(
      (
        formData.subscriptionStatus == true &&
        formData.saveShopifyCustStatus == false
      ) ||
      result == null
    ) {
      console.log('Shopify Customer Add Request');

      const tokenData = await ctx.prisma.accessDetails.findUnique({
          where: {
            shop: shopQuery,
      },
      }).finally(async () => {
          await prisma.$disconnect()
      });

      console.log('Shopify Customer tokenData' + JSON.stringify(tokenData));

      let shopifyCustomerData = {
        "customer":{
          'accepts_marketing': true,
          "first_name": fname,
          "last_name": lname,
          "email": email,
        }
      }

      const client = new Shopify.Clients.Rest(shopQuery, tokenData.token);
      const data = await client.post({
        path: 'customers',
        data: shopifyCustomerData,
        type: DataType.JSON,
      });

      console.log('Shopify Customer Add Request data : ' + JSON.stringify(data));
      if(data.body.customer) {
        finalStatus = 'success';
        ctx.res.statusCode = 200;
      }
  }

  // Add Mailchimp subscriber.
  if(
    formData.subscriptionStatus == true &&
    formData.mcStatus == true && 
    formData.mclistOption != '' && 
    formData.mckey != ''
  ) {
    console.log('Mailchimp Request');
    var dataCenter = formData.mckey.split('-')[1]; 
    const url = 
        'https://'+dataCenter+'.api.mailchimp.com/3.0/lists/'+formData.mclistOption+'/members';
      const options = {
        method: 'POST',
        headers: {
          Accept: 'application/json', 
          'Content-Type': 'application/json',
          'authorization' : 'apikey '+ formData.mckey
        },
        body: JSON.stringify({
          "email_address": email,
          "status": "subscribed",
          "merge_fields": {
            "FNAME": fname,
            "LNAME": lname
          }
        })
      };

    await fetch(url, options)
    .then(res => res.json())
    .then(json => {
      console.log('MC Json Response :' + JSON.stringify(json));
      if(json.status == 'subscribed') {
        ctx.res.statusCode = 200;
        finalStatus = 'success';
      } else {
        ctx.res.statusCode = 400;
      }
    })
    .catch(err => console.error('error:' + err));
  }
    // Add Klaviyo subscriber
    if(
      formData.subscriptionStatus == true &&
      formData.klStatus == true && 
      formData.kllistOption != '' && 
      formData.klkey != ''
    ) {
      console.log('Klaviyo Request');
  
      const url = 
        'https://a.klaviyo.com/api/v2/list/'+formData.kllistOption+'/members?api_key='+formData.klkey;
      const options = {
        method: 'POST',
        headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
        body: JSON.stringify({
          profiles: [{email: email, first_name: fname, last_name: lname}]
        })
      };

    await fetch(url, options)
    .then(res => res.json())
    .then(json => {
      console.log(json);
      if(json.message) {
        ctx.res.statusCode = 400;
      } else {
        finalStatus = 'success';
        ctx.res.statusCode = 200;
      }
    })
    .catch(err => console.error('error:' + err));

    
    //console.log('addSubscriber : ' + JSON.stringify(addSubscriber));
  }
  
  console.log('Final Status: ' + finalStatus);
  ctx.body = { data: finalStatus };
});

// Get Klaviyo lists.
subscriptionSettings.get("/getKlaviyoLists", async (ctx) => {
  let finalResponse = '';
  //const shopQuery = ctx.query.shop;
  const klkey = ctx.query.klkey;
  //console.log('klkey := ' + klkey);
  
  /**** Klaviyo Code ****/
  const url = 'https://a.klaviyo.com/api/v2/lists?api_key='+klkey;
  const options = {method: 'GET', headers: {Accept: 'application/json'}};

  await fetch(url, options)
    .then(res => res.json())
    .then(json => {
        console.log('Klaviyo List Response:' + JSON.stringify(json));
        finalResponse = json;
        ctx.body = { data: finalResponse };
        ctx.res.statusCode = 200;
      }
    ).catch(err => {
      ctx.res.statusCode = 400;
      ctx.body = { data: err };
    });
  // console.log('Klaviyo List Response:' + JSON.stringify(klResponse));
  /**** Klaviyo Code Ends ****/
  
 
});

export default subscriptionSettings;