import express from 'express';
import * as db from './db';
import routes from './routes';
import { handleAddCustomers, handleCustomerChange } from './handler/handler';

const app = express();
const port = 3000;

app.use('/', routes);

async function startServer() {
  await db.connectToDatabase();

  setInterval(handleAddCustomers, 200);

  db.watchCustomers(handleCustomerChange);

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

startServer().catch(console.error);

process.on('SIGINT', async () => {
  console.log('Shutting down gracefully');
  await db.closeConnection();
  process.exit(0);
});