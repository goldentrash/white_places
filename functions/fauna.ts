import faunadb, { query } from 'faunadb';

if (!process.env.FAUNA_SECRET) {
  throw 'no fauna secret';
}

console.log(`fauna secret: ${process.env.FAUNA_SECRET}`);
const client = new faunadb.Client({ secret: process.env.FAUNA_SECRET });

// 관련 파일들만 따로 만들어야 할지도?
export const createCollection = async (): Promise<void> => {
  await client.query(query.CreateCollection({ name: 'projects' }));
};

export default client;
