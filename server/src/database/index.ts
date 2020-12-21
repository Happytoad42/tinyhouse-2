import { MongoClient } from 'mongodb';

const user = 'admin';
const userPassword = '71O2tkLMk9oNL18k';
const dbName = 'main';
const cluster = 'tinyhouse-v1.c3hzl';
const uri =
  'mongodb+srv://admin:71O2tkLMk9oNL18k@tinyhouse-v1.c3hzl.mongodb.net/<dbname>?retryWrites=true&w=majority';

export const connectDatabase = async () => {
  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = client.db('main');

  return {
    listings: db.collection('test_listings'),
  };
};
