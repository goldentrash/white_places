import React, { ReactElement } from 'react';
import { PageList } from 'components';
import { Url } from './routes';

export const Documents = (): ReactElement => {
  const documents = [{ id: '123123', title: 'asdf' }];

  return (
    <PageList>
      <PageList.Statistics numberOfResult={123} type="Documents" />
      {documents.map((doc) => {
        return (
          <PageList.Item
            key={doc.id}
            title={doc.title}
            pageUrl={Url.Document(doc.id)}
          />
        );
      })}
    </PageList>
  );
};
