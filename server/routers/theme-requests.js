import Router from "koa-router";
const themeRouter = new Router();

// Get active theme.
themeRouter.get("/activeTheme", async (ctx) => {
    try {
      const shopQuery = ctx.query.shop;
      console.log('Get Active Theme');
     
      const prisma = ctx.prisma;
      
      const result = await prisma.activetheme.findUnique({
        where: {
          shop: shopQuery,
        },
      }).finally(async () => {
        await prisma.$disconnect()
      });
             
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

  // Save selected theme in DB.
  themeRouter.post("/saveTheme", async (ctx) => {
    try {
      console.log('Save Theme request');
      const prisma = ctx.prisma;
      
      const payload = ctx.request.body;
      console.log('payload :- ' + payload);
      const activeThemeStatus = await prisma.activetheme.upsert({
        where: { shop: payload.shop },
        update: { theme_id: payload.id },
        create: {
          shop: payload.shop,
          theme_id: payload.id,
        }
      })
      
      console.log(activeThemeStatus);
      ctx.body = { data: activeThemeStatus };
      ctx.res.statusCode = 200;
    } catch (error) {
      console.log(`Failed to process webhook: ${error}`);
    }
  });

  export default themeRouter;