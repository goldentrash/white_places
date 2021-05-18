import { generatePath } from 'react-router-dom';

// 이거 테스트 어캐하지?
export default {
  introduction(): string {
    return generatePath('/projects/white_places/documents/introduction');
  },
  documents(projectTitle: string): string {
    return generatePath('/projects/:projectTitle/documents', {
      projectTitle,
    });
  },
  document(projectTitle: string, documentTitle: string): string {
    return generatePath('/projects/:projectTitle/documents/:documentTitle', {
      projectTitle,
      documentTitle,
    });
  },
};
