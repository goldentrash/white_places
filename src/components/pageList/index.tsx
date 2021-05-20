import React, { ReactElement } from 'react';
import Container, { ContainerProps } from '@material-ui/core/Container';

export type PageListProps = ContainerProps;
export const PageList = ({
  children,
  ...otherProps
}: PageListProps): ReactElement => {
  return <Container {...otherProps}>{children}</Container>;
};
export default PageList;

import Statistics, { StatisticsProps } from './statistics';
export type PageListStatisticsProps = StatisticsProps;
PageList.Statistics = Statistics;

import Item, { ItemProps } from './item';
export type PageListItemProps = ItemProps;
PageList.Item = Item;
