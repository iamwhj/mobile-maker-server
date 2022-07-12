import HtmlTemplate from '../models/htmlTemplate';
import { processParams } from '../common'

export default class HtmlTemplateDao {
    async insert(data: object) {
        const ripeData = await processParams(data, HtmlTemplate)
        const htmlTemplate = new HtmlTemplate(ripeData)
        const res = await htmlTemplate.save()
        return res
    }
    async find() {
        const res = await HtmlTemplate.find()
        return res;
    }
    async update(id: number, data: Object) {
        const res = await HtmlTemplate.updateOne({ id }, { ...data })
        return res;
    }
}