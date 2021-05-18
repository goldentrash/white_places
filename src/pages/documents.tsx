import React, { ReactElement } from 'react';
import PageList from 'components/pageList';
import urlBuilder from 'helpers/urlBuilder';

export const Documents = (): ReactElement => {
  const documents = [{ id: '123123', title: 'introduction' }];

  return (
    <PageList>
      <PageList.Statistics numberOfResult={123} type="Documents" />
      {documents.map((doc) => {
        return (
          <PageList.Item
            key={doc.id}
            title={doc.title}
            pageUrl={urlBuilder.document('white_places', doc.title)}
          />
        );
      })}
    </PageList>
  );
};
export default Documents;
