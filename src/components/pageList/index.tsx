import React, { ReactElement } from 'react';
import Container, { ContainerProps } from '@material-ui/core/Container';

export type PageListProps = ContainerProps;
export const PageList = ({ children }: PageListProps): ReactElement => {
  return <Container>{children}</Container>;
};

export { StatisticsProps as PageListStatisticsProps } from './statistics';
import { Statistics } from './statistics';
PageList.Statistics = Statistics;

export { ItemProps as PageListItemProps } from './item';
import { Item } from './item';
PageList.Item = Item;
