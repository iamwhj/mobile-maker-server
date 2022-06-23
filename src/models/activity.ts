import { createSchemaModel } from '../common';

const ActivityModel = createSchemaModel('activity', {
    name: String,
    time: String,
    creator: String,
    reviewer: String,
    reviewer_time: String,
    status: String,
    page: String
})

export default ActivityModel;