import Koa from "koa";
import routerTask from "./routes/taskRoutes";
// import koaBody from 'koa-body';
import cors from '@koa/cors';
//run app
const app = new Koa();
// app.use(koaBody({
//     parsedMethods: ['POST', 'PUT', 'DELETE']
//   }));
app.use(cors());

//router
app.use(routerTask.routes());
app.use(routerTask.allowedMethods());
export default app;