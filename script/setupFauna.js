const faunadb = require('faunadb');
const { CreateCollection, Do, If, Exists, Collection, Delete } = faunadb.query;
const faunaClient = faunadb.Client({ secret: 'asdf' });

const deleteAndCreateCollection = async (name) => {
  await faunaClient.query(
    Do(
      If(Exists(Collection(name)), Delete(Collection(name), false)),
      CreateCollection({ name })
    )
  );
};

deleteAndCreateCollection(); // for eslint
