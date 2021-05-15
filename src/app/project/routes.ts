export const enum Path {
  Document = 'documents/:documentId',
  Documents = 'documents',
  Followers = 'followers',
  Timeline = 'timeline',
}

import { generatePath } from 'react-router-dom';
export const Url = {
  Document(documentId: string): string {
    return generatePath(Path.Document, { documentId });
  },
  Documents(): string {
    return generatePath(Path.Documents, {});
  },
  Followers(): string {
    return generatePath(Path.Followers, {});
  },
  Timeline(): string {
    return generatePath(Path.Timeline, {});
  },
};
