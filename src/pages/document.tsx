import React, { ReactElement } from 'react';
import { useParams } from 'react-router-dom';
import Markdown from 'components/markdown';
import Container from '@material-ui/core/Container';

export const Document = (): ReactElement => {
  const { documentTitle } = useParams();

  // if document exist!
  return (
    <Container>
      <Markdown>{'some contents id ' + documentTitle}</Markdown>
    </Container>
  );
};
export default Document;
