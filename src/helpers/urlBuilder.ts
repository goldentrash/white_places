import { generatePath } from 'react-router-dom';

const generateUrl = (path: string, params?: Record<string, string>): string => {
  return encodeURI(generatePath(path, params));
};

// 이거 테스트 어캐하지?
export default {
  introduction(projectTitle = 'white places'): string {
    return generateUrl('/projects/:projectTitle/documents/introduction', {
      projectTitle,
    });
  },
  documents(projectTitle: string): string {
    return generateUrl('/projects/:projectTitle/documents', {
      projectTitle,
    });
  },
  document(projectTitle: string, documentTitle: string): string {
    return generateUrl('/projects/:projectTitle/documents/:documentTitle', {
      projectTitle,
      documentTitle,
    });
  },
  writeDocument(projectTitle: string): string {
    return generateUrl('/projects/:projectTitle/documents/write', {
      projectTitle,
    });
  },
  opinions(projectTitle: string): string {
    return generateUrl('/projects/:projectTitle/opinions', {
      projectTitle,
    });
  },
  opinion(projectTitle: string, opinionTitle: string): string {
    return generateUrl('/projects/:projectTitle/opinions/:opinionTitle', {
      projectTitle,
      opinionTitle,
    });
  },
  tasks(projectTitle: string): string {
    return generateUrl('/projects/:projectTitle/tasks', {
      projectTitle,
    });
  },
  task(projectTitle: string, taskTitle: string): string {
    return generateUrl('/projects/:projectTitle/tasks/:taskTitle', {
      projectTitle,
      taskTitle,
    });
  },
};
