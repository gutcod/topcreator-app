Customer Anonymizer
This project implements a service that monitors a MongoDB collection of customer data, anonymizes sensitive fields, and copies the anonymized data to a separate collection.
Prerequisites

Setup

Clone the repository:
Copygit clone https://github.com/your-username/customer-anonymizer.git
cd customer-anonymizer

Install dependencies:
Copynpm install

Create a .env file in the root directory with the following content:
CopyDB_URI=mongodb://localhost:27017/shop
Adjust the URI if your MongoDB is running on a different host or port.

Running the Application
To start the application, run:
Copynpm start
The server will start on http://localhost:3000. You should see console output indicating that the server is running and connected to the database.
How It Works

The application generates fake customer data and inserts it into the customers collection.
It watches for changes (inserts and updates) in the customers collection.
When a change is detected, it anonymizes the sensitive fields and copies the anonymized data to the customers_anonymised collection.
The anonymization process replaces sensitive data with deterministic 8-character strings.

Project Structure

server.ts: The main application file containing all the logic for data generation, anonymization, and database operations.
package.json: Defines project dependencies and scripts.
.env: Contains the database connection string.

Development
This project uses TypeScript. To compile the TypeScript code, run:
Copynpm run build
To run the compiled JavaScript, use:
Copynpm run start:prod
Formatting
The project uses Prettier for code formatting. To format the code, run:
Copynpm run format
Notes

The application continuously generates and anonymizes data. To stop it, press Ctrl+C in the terminal where it's running.
Make sure your MongoDB instance has enough storage capacity for the continuously generated data.
