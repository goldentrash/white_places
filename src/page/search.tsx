import React, { ReactElement, useEffect } from 'react';
import { useProjectsLazyQuery } from 'codegen/document-types';

const Search = (): ReactElement => {
  const [loadProjects, { loading, error, data }] = useProjectsLazyQuery();

  useEffect(() => {
    console.log('load projects!');
    loadProjects();
  }, [loadProjects]);

  if (loading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>error...</div>;
  }

  console.log(data);
  return <div>watch console!</div>;
};

export default Search;
