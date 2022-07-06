import { createSchemaModel } from '../common';

const ComponentModel = createSchemaModel('component', {
    path: String,
    name: String,
    full_name: String,
    version: String, // 当前版本
    last_version: String, // 上一次成功能版本
    author: String,
    category_id: Number, // 分类 
})

export default ComponentModel;