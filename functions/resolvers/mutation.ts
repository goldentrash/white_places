import { MutationResolvers } from 'codegen/resolver-types';
import projectList from '../fakeDB';
import { UserInputError } from 'apollo-server-lambda';

const mutationResolver: MutationResolvers = {
  chagneProjectTitle: (
    _parent,
    { changeProjectTitleInput: { title, newTitle } }
  ) => {
    const targetProject = projectList.find(
      (project) => project.title === title
    );

    if (!targetProject) {
      throw new UserInputError('invalid title');
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
