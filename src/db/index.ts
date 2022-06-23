import mongoose from 'mongoose';

const connectDB = () => {
    const { DB_NAME, DB_ADDRESS, DB_PORT } = process.env
    const path = `mongodb://${DB_ADDRESS}:${DB_PORT}/${DB_NAME}`
    mongoose.connect(path)
}

export default connectDB