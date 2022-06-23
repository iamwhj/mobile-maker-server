import { ParameterizedContext, DefaultContext } from 'koa';
import ActivityDao from '../dao/activity';
import { returnBody } from '../utils';
import { Code } from '../common/types';

const activityDao = new ActivityDao()

export default class ActivityControll {
    async create(ctx: ParameterizedContext) {
        const v: DefaultContext = ctx.request;
        const name = v.body.name;
        const time = v.body.time;
        const creator = v.body.creator;
        const reviewer = v.body.reviewer;
        const reviewer_time = v.body.reviewer_time;
        const status = v.body.status;
        const page = v.body.page;
        const params = { name, time, creator, reviewer, reviewer_time, status, page }
        const data = await activityDao.insert(params)
        ctx.body = returnBody({
            code: Code.SUCCESS,
            message: '插入成功',
            data
        })
    }
    async getList(ctx: ParameterizedContext) {
        const v: DefaultContext = ctx.request;
        const pageNum: number = v.body.pageNum;
        const pageSize: number = v.body.pageSize;
        const params = { pageNum, pageSize }
        const data = await activityDao.find(params)
        ctx.body = returnBody({
            code: Code.SUCCESS,
            message: '查询成功',
            data
        })
    }
}