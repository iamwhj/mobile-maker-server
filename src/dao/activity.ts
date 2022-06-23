import Activity from '../models/activity';
import { processParams } from '../common'
import { Paging } from '../common/types';

export default class ActivityDao {
    async insert(data: Object) {
        const ripeData = await processParams(data, Activity)
        const activity = new Activity(ripeData)
        const res = await activity.save()
        return res
    }
    async find(data: Paging) {
        // 分页(页码，条数)，不传返回全部
        let skip = (data.pageNum - 1) * data.pageSize || 0
        let limt = data.pageSize || 0
        let list = await Activity.find().skip(skip).limit(limt)
        // 总条数
        let count = await Activity.find().countDocuments()
        return {data: list, count}
    }
}