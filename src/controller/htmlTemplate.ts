import { ParameterizedContext, DefaultContext } from 'koa';
import HtmlTemplateDao from '../dao/htmlTemplate';
import { returnBody } from '../utils';
import { Code, htmlTemplateTypes } from '../common/types';

const htmlTemplateDao = new HtmlTemplateDao()

export default class HtmlTemplateControll {
    async create(ctx: ParameterizedContext) {
        const v: DefaultContext = ctx.request;
        const html = v.body.html;
        const params = { html }
        const data = await htmlTemplateDao.insert(params)
        ctx.body = returnBody({
            code: Code.SUCCESS,
            message: '插入成功',
            data
        })
    }
    async getList(ctx: ParameterizedContext) {
        const data = await htmlTemplateDao.find()
        ctx.body = returnBody({
            code: Code.SUCCESS,
            message: '查询成功',
            data
        })
    }
    async update(ctx: ParameterizedContext, record: htmlTemplateTypes) {
        const v: DefaultContext = ctx.request;
        const html = v.body.html;
        const id = record.id;
        const data = {
            html,
            success_html: record.html
        }
        const res = await htmlTemplateDao.update(id, data)
        ctx.body = returnBody({
            code: Code.SUCCESS,
            message: '更新成功',
            data: res
        })
    }
}