import React, { ReactElement } from 'react';
import { useParams } from 'react-router-dom';
import { Markdown } from 'components';
import Container from '@material-ui/core/Container';

export const Document = (): ReactElement => {
  const { documentId } = useParams();

  return (
    <Container>
      <Markdown>{'some contents id ' + documentId}</Markdown>
    </Container>
  );
};
