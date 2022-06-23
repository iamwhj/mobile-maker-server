import mongoose from 'mongoose';

const ActivitySchema = new mongoose.Schema({
    name: String,
    age: Number,
});
const Activity = mongoose.model('activity', ActivitySchema);

export default Activity;