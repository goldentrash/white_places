import {
  DocumentResolvers,
  Task,
  Opinion,
  Document,
} from 'codegen/resolver-types';

const isTask = (document: Document): document is Task => {
  return (document as Task).workers !== undefined;
};

const isOpinion = (document: Document): document is Opinion => {
  return (document as Opinion).liek !== undefined;
};

const documentResolver: DocumentResolvers = {
  __resolveType: (parent) => {
    if (isTask(parent)) return 'Task';
    if (isOpinion(parent)) return 'Opinion';
    return null;
  },
};

export default documentResolver;
