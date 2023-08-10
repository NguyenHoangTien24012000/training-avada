import Koa from 'koa';
import koaBody from 'koa-body';
import routesProducts from './routes/productRoutes';
import routesTask from './routes/taskRoutes'

//run app
const app = new Koa();
app.use(koaBody());

//router
app.use(routesProducts.routes());
app.use(routesProducts.allowedMethods());

app.use(async ctx => {
    ctx.body = {
      success: false,
      message:"Page not found!"
    };
});
  
app.listen(8080);
