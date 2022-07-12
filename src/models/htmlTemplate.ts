import { createSchemaModel } from '../common';

const HtmlTemplateModel = createSchemaModel('htmlTemplate', {
    html: String, // html模板
    success_html: String, // 上一份打包成功的模板
})

export default HtmlTemplateModel;