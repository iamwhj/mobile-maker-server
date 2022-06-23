import mongoose from 'mongoose';
// 创建Schema和Model
export const createSchemaModel = (cname: string, field: object) => {
    const schema = new mongoose.Schema(field, { collection: cname, versionKey: false });
    const model = mongoose.model(cname, schema);
    return model
}