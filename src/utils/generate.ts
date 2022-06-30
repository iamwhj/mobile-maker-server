import Koa from 'koa'
import Router from 'koa-router'
import { resolve } from 'path'
import { readdirSync } from 'fs';

const router = new Router()

export const generateRouter = (app: Koa, routerPath: string, prefix = ''): void => {
    const result = readdirSync(routerPath);
    result.forEach(item => {
        const current = require(resolve(routerPath, item));
        if (current.routes) {
            router.use(prefix, current.routes(), current.allowedMethods());
        } else if (current.default && current.default.routes) {
            router.use(prefix, current.default.routes(), current.default.allowedMethods());
        }
    });
    app.use(router.routes()).use(router.allowedMethods());
};

export const generateHtml = (activity: any) => {
    const activityData = activity.page;
    const activityId = activity.id;

    const htmlTemplate = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <div id="app">挂载容器</div>

        <script>
            var activity = ${activityData}; var activityId = ${activityId};
        </script>
    </body>
    </html>
    `
    return htmlTemplate
}