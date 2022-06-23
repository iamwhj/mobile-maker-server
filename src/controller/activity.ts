import { ParameterizedContext, DefaultContext } from "koa";
import ActivityDao from '../dao/activity';

const activityDao = new ActivityDao()

export default class ActivityControll {
    async create(ctx: ParameterizedContext) {
        const v: DefaultContext = ctx.request;
        const name = v.body.name;
        const age = v.body.age;
        const data = await activityDao.insert({ name, age })
        ctx.body = {
            code: 0,
            message: '插入成功',
            data
        }
    }
}