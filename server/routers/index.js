import combineRouters from 'koa-combine-routers';
import themeRouter from './theme-requests';
import settingsRouter from './app-settings';
import shopRouter from './shop-requests';
import webhookRouter from './webhook-requests';
import subscriptionSettings from './subscription-settings';

// Combine all routers.
const indexRouter = combineRouters(
    settingsRouter,
    themeRouter,
    shopRouter,
    webhookRouter,
    subscriptionSettings
  )

export default indexRouter;