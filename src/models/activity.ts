import { createSchemaModel } from '../common';

const ActivityModel = createSchemaModel('activity', {
    name: String,
    age: Number
})

export default ActivityModel;