import React, { ReactElement, useEffect } from 'react';
import {
  useGetProjectsLazyQuery,
  useChangeProjectTitleMutation,
} from 'codegen/document-types';

const Search = (): ReactElement => {
  const [
    loadProjects,
    { loading, error: queryError, data: queryResult },
  ] = useGetProjectsLazyQuery();

  const [
    change,
    { data: mutationResult, error: mutationError },
  ] = useChangeProjectTitleMutation();

  useEffect(() => {
    console.log('load projects!');
    loadProjects();
  }, [loadProjects]);

  if (loading) {
    return <div>loading...</div>;
  }

  if (queryError) {
    console.error(queryError);
    return <div>error...</div>;
  }

  if (mutationError) {
    console.error(mutationError);
    return <div>error...</div>;
  }

  if (queryResult) {
    console.log('query result');
    console.log(queryResult);
  }

  if (mutationResult) {
    console.log('mutation result');
    console.log(mutationResult);
  }

  const worngVariables = {
    input: {
      title: '2',
      newTitle: 'asdf',
    },
  };

  return (
    <div>
      <button
        onClick={() => {
          void change({ variables: worngVariables });
        }}
      >
        mutation test
      </button>
    </div>
  );
};

export default Search;
