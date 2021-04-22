import faunadb from 'faunadb';

if (!process.env.FAUNA_SECRET) {
  throw 'no fauna secret';
}

export const faunaClient = new faunadb.Client({
  secret: process.env.FAUNA_SECRET,
});

export * from './createCollection';
