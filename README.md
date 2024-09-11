Customer Anonymizer
This project implements a service that monitors a MongoDB collection of customer data, anonymizes sensitive fields, and copies the anonymized data to a separate collection.
Prerequisites

Node.js (version 14 or higher)
npm (Node Package Manager)
MongoDB (Make sure it's installed and running)

Setup

****
Create a .env file in the root directory with the following content:
DB_URI = "mongodb+srv://admin:Pass1234@cluster0.ywu6t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
