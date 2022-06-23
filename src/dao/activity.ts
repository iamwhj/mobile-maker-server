import Activity from "../models/activity";

export default class ActivityDao {
    async insert(data: Object) {
        const activity = new Activity(data)
        const res = await activity.save()
        return res
    }
}