import React, { ReactElement } from 'react';
import PageList from 'components/pageList';
import urlBuilder from 'helpers/urlBuilder';

export const Documents = (): ReactElement => {
  const documents = [
    { id: '123123', title: 'introduction' },
    { id: '123ff123', title: 'intrasoduction' },
  ];

  return (
    <PageList>
      <PageList.Statistics numberOfResult={123} type="Documents" />
      {documents.map((document) => {
        return (
          <PageList.Item
            key={document.id}
            title={document.title}
            pageUrl={urlBuilder.document('white_places', document.title)}
          />
        );
      })}
    </PageList>
  );
};
export default Documents;
