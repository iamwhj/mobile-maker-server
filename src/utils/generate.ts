import Koa from 'koa'
import Router from 'koa-router'
import { resolve } from 'path'
import { readdirSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import HtmlTemplateDao from '../dao/htmlTemplate';

// 路由自动挂载
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

export const generateHtml = async (activity: any, publish?: boolean) => {
    const activityData = JSON.parse(activity.page);
    const activityId = activity.id;

    // 获取html模板
    const htmlTemplateDao = new HtmlTemplateDao();
    const htmlRecord: any = await htmlTemplateDao.find();
    let htmlTemplate = htmlRecord[0].html;

    const ACTIVITY_TITLE = activityData.detail.title;
    const ACTIVITY_DATA = `<script> var activity = ${activity.page}; var activityId = ${activityId} </script>`;
    htmlTemplate = htmlTemplate
        .replace('<!-- ACTIVITY_TITLE -->', ACTIVITY_TITLE)
        .replace('<!-- ACTIVITY_DATA -->', ACTIVITY_DATA);

    if (publish) {
        const { HTML_FOLDER } = process.env;
        const folderPath = resolve(__dirname, '../../', HTML_FOLDER as string);
        if (!existsSync(folderPath)) mkdirSync(folderPath);
        // 活动发布
        writeFileSync(resolve(folderPath, `${activityId}.html`), htmlTemplate, 'utf-8')
    }

    return htmlTemplate
}