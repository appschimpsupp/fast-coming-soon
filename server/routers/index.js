import combineRouters from 'koa-combine-routers';
import themeRouter from './theme-requests';
import settingsRouter from './app-settings';
import shopRouter from './shop-requests';
import webhookRouter from './webhook-requests';

// Combine all routers.
const indexRouter = combineRouters(
    settingsRouter,
    themeRouter,
    shopRouter,
    webhookRouter
  )

export default indexRouter;