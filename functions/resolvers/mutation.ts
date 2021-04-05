import { MutationResolvers } from 'codegen/resolver-types';
import projectList from '../fakeDB';

const mutationResolver: MutationResolvers = {
  chagneProjectTitle: (
    _parent,
    { changeProjectTitleInput: { title, newTitle } }
  ) => {
    const targetProject = projectList.find(
      (project) => project.title === title
    );

    if (!targetProject) {
      return {
        code: 400,
        success: false,
        message: 'invalid title',
      };
    }

    targetProject.title = newTitle;

    return {
      code: 200,
      success: true,
      message: 'update title',
      project: targetProject,
    };
  },
};

export default mutationResolver;
