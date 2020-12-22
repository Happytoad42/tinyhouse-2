import { MongoClient } from 'mongodb';
import { Database } from '../lib/types';

const user = 'admin';
const userPassword = '71O2tkLMk9oNL18k';
const cluster = 'tinyhouse-v1.c3hzl';
const dbName = 'main';

const uri = `mongodb+srv://${user}:${userPassword}@${cluster}.mongodb.net/${dbName}?retryWrites=true&w=majority`;

export const connectDatabase = async (): Promise<Database> => {
  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = client.db('main');

  console.log(`[database]: Connected to database`);

  return {
    listings: db.collection('test_listings'),
  };
};
