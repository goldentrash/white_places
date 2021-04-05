import {
  MutationResponseResolvers,
  ChangeProjectResponse,
  MutationResponse,
} from 'codegen/resolver-types';

const isChangeProjectResponse = (
  response: MutationResponse
): response is ChangeProjectResponse => {
  return (
    response.success === false &&
    (response as ChangeProjectResponse).project !== undefined
  );
};

const mutationResponseResolver: MutationResponseResolvers = {
  __resolveType: (parent) => {
    if (isChangeProjectResponse(parent)) return 'ChangeProjectResponse';
    return null;
  },
};

export default mutationResponseResolver;
