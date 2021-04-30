import React, { ReactElement } from 'react';
import { Container } from '@material-ui/core';
import { RouteComponentProps } from 'react-router-dom';
import { ListItem, SearchStatistics } from 'components';

type Information = {
  title: string;
};

export const Informations = (props: RouteComponentProps): ReactElement => {
  // will get throw apollo client (local state)
  const informations: Information[] = [
    {
      title: 'intro',
    },
    {
      title: 'api spec',
    },
  ];

  return (
    <Container>
      <SearchStatistics
        numberOfResult={informations.length}
        type="Informations"
      />
      {informations.map((info) => (
        <ListItem
          key={info.title}
          title={info.title}
          pageUrl={props.match.url + '/' + info.title}
        />
      ))}
    </Container>
  );
};
