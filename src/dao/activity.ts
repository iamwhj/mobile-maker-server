import Activity from '../models/activity';
import { processParams } from '../common'
import { Paging } from '../common/types';
import { generateHtml } from '../utils/generate';


export default class ActivityDao {
    async insert(data: object) {
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
        return { data: list, count }
    }
    async update(id: number, data: Object) {
        const res = await Activity.updateOne({ id }, { ...data })
        return res;
    }
    async findOne(id: number) {
        let res = await Activity.findOne({ id })
        return res;
    }
    async preview(id: number) {
        const activity = await this.findOne(id)
        const htmlStr = generateHtml(activity)
        return htmlStr;
    }
    async publish(id: number) {
        const activity = await this.findOne(id)
        const htmlStr = generateHtml(activity, true)
        return htmlStr;
    }
}