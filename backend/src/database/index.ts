import { connect } from "mongoose";

export const connectToDatabase = async () => {
    await connect('mongodb+srv://admin:mGHbGeAy5qpPtfNf@cluster0.d9djs7j.mongodb.net/?appName=Cluster0')
}