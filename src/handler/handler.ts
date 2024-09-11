import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import * as db from '../db';
import { generateCustomer, anonymizeCustomer } from '../utils';

export async function handleGetRoot(req: Request, res: Response) {
    res.send('Customer Anonymizer is running');
}

export async function handleAddCustomers() {
    const batchSize = Math.floor(Math.random() * 10) + 1;
    const customers = Array.from({ length: batchSize }, generateCustomer);

    try {
        await db.addCustomers(customers);
        const anonymizedCustomers = customers.map(anonymizeCustomer);
        await db.addAnonymizedCustomers(anonymizedCustomers);
    } catch (error) {
        console.error('Error in handleAddCustomers:', error);
    }
}

export async function handleCustomerChange(change: any) {
    if (change.operationType === 'insert' || change.operationType === 'update') {
        const customerId = change.documentKey._id;
        const customer = await db.getCustomer(new ObjectId(customerId));

        if (customer) {
            const anonymizedCustomer = anonymizeCustomer(customer);
            await db.updateAnonymizedCustomer(new ObjectId(customerId), anonymizedCustomer);
            console.log(`Anonymized customer: ${customerId}`);
        }
    }
}