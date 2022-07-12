import Router from 'koa-router'
import HtmlTemplateControll from '../controller/htmlTemplate'
import HtmlTemplate from '../models/htmlTemplate';

const htmlTemplateCntl = new HtmlTemplateControll()
const router = new Router({
    prefix: '/htmlTemplate'
})

router.post('/', async ctx => {
    const record: any = await HtmlTemplate.find();
    if (record && record.length > 0) {
        // 更新
        await htmlTemplateCntl.update(ctx, record[0])
    } else {
        // 第一次新建插入
        await htmlTemplateCntl.create(ctx)
    }
})

router.get('/', htmlTemplateCntl.getList)

export default router;