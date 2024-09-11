import { faker } from '@faker-js/faker';
import crypto from 'crypto';

export function generateCustomer() {
    return {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        address: {
            line1: faker.location.streetAddress(),
            line2: faker.location.secondaryAddress(),
            postcode: faker.location.zipCode(),
            city: faker.location.city(),
            state: faker.location.state({ abbreviated: true }),
            country: faker.location.countryCode(),
        },
        createdAt: new Date(),
    };
}

function anonymizeString(input: string): string {
    const hash = crypto.createHash('sha256');
    hash.update(input);
    return hash.digest('hex').slice(0, 8);
}

export function anonymizeCustomer(customer: any) {
    const anonymized = { ...customer };
    anonymized.firstName = anonymizeString(customer.firstName);
    anonymized.lastName = anonymizeString(customer.lastName);
    anonymized.email = `${anonymizeString(customer.email.split('@')[0])}@${customer.email.split('@')[1]}`;
    anonymized.address = {
        ...customer.address,
        line1: anonymizeString(customer.address.line1),
        line2: anonymizeString(customer.address.line2),
        postcode: anonymizeString(customer.address.postcode),
    };
    return anonymized;
}