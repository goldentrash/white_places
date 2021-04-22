import { query } from 'faunadb';
import { faunaClient } from './index';

export const createCollection = async (): Promise<void> => {
  await faunaClient.query(query.CreateCollection({ name: 'projects' }));
};
