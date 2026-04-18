import { MongoClient } from "mongodb";
import "dotenv/config";

export let dbo;
export const connectDb = async () => {
    try {
        console.log(process.env.PRACTICE_PROJECT_3_MONGO_LINK);
        
        const client = new MongoClient(process.env.PRACTICE_PROJECT_3_MONGO_LINK);
        await client.connect();
        dbo = client.db('testing_db');
        console.log('db connected');
        
    }
    catch (err) {
        console.log(err);

    }
};