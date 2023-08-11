import Koa from 'koa';
import koaBody from 'koa-body';
import routesProducts from './routes/productRoutes';
import routesTask from './routes/taskRoutes'
import cors from '@koa/cors';
//run app
const app = new Koa();
app.use(koaBody({
  parsedMethods: ['POST', 'PUT', 'DELETE']
}));
app.use(cors());

//router
app.use(routesProducts.routes());
app.use(routesProducts.allowedMethods());
app.use(routesTask.routes());
app.use(routesTask.allowedMethods());



app.use(async ctx => {
    ctx.status = 404;
    ctx.body = {
      success: false,
      message:"Page not found!"
    };
});
  
app.listen(8080);
