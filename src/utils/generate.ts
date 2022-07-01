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
    const activityData = JSON.parse(activity.page);
    const activityId = activity.id;

    let htmlTemplate = `
    <!DOCTYPE html>
    <html lang="">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no">
        <link rel="icon" href="favicon.ico">
        <title><!-- ACTIVITY_TITLE --></title>
        <script defer="defer" src="http://127.0.0.1:5500/generate/dist/scripts/chunk-vendors.9d42d826.min.js"></script>
        <script defer="defer" src="http://127.0.0.1:5500/generate/dist/scripts/app.9d42d826.min.js"></script>
    </head>
    <body>
        <noscript>
            <strong>We're sorry but <%= htmlWebpackPlugin.options.title %> doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
        </noscript>
        <div id="app"></div>
        <!-- built files will be auto injected -->
        <!-- ACTIVITY_DATA -->
    </body>
    </html>
    `
    const ACTIVITY_TITLE = activityData.detail.title;
    const ACTIVITY_DATA = `<script> var activity = ${activity.page}; var activityId = ${activityId} </script>`;
    htmlTemplate = htmlTemplate
        .replace('<!-- ACTIVITY_TITLE -->', ACTIVITY_TITLE)
        .replace('<!-- ACTIVITY_DATA -->', ACTIVITY_DATA);

    return htmlTemplate
}