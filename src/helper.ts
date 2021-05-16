import { generatePath } from 'react-router-dom';

// 이거 테스트 어캐하지?
export const urlBuilder = {
  introduction(): string {
    return generatePath('/');
  },
  documents(projectId: string): string {
    return generatePath('/project/:projectId/documents', {
      projectId,
    });
  },
  document(projectId: string, documentId: string): string {
    return generatePath('/project/:projectId/documents/:documentId', {
      projectId,
      documentId,
    });
  },
};
