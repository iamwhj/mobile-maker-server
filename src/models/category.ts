import { createSchemaModel } from '../common';

const ComponentModel = createSchemaModel('category', {
    name: String,
    priority: String,
})

export default ComponentModel;