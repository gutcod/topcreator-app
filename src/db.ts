import { MongoClient, Db, Collection, ObjectId } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.DB_URI;
const client = new MongoClient(uri);

let db: Db;
let customersCollection: Collection;
let anonymizedCollection: Collection;

export async function connectToDatabase() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        db = client.db();
        customersCollection = db.collection('customers');
        anonymizedCollection = db.collection('customers_anonymised');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
}

export async function addCustomers(customers: any[]) {
    try {
        const result = await customersCollection.insertMany(customers);
        console.log(`Added ${result.insertedCount} customers`);
        return result;
    } catch (error) {
        console.error('Error adding customers:', error);
        throw error;
    }
}

export async function addAnonymizedCustomers(customers: any[]) {
    try {
        const result = await anonymizedCollection.insertMany(customers);
        console.log(`Anonymized ${result.insertedCount} customers`);
        return result;
    } catch (error) {
        console.error('Error adding anonymized customers:', error);
        throw error;
    }
}

export async function getCustomer(id: ObjectId) {
    return await customersCollection.findOne({ _id: id });
}

export async function updateAnonymizedCustomer(id: ObjectId, data: any) {
    return await anonymizedCollection.updateOne(
        { _id: id },
        { $set: data },
        { upsert: true }
    );
}

export function watchCustomers(callback: (change: any) => void) {
    const changeStream = customersCollection.watch();
    changeStream.on('change', callback);
    console.log('Watching for changes in customers collection');
}

export async function closeConnection() {
    await client.close();
    console.log('Disconnected from MongoDB');
}