import { Project } from 'codegen/resolver-types';

const projectList: Project[] = [
  {
    title: 'hi',
    summary: 'df',
    documents: [
      { title: 'dfdf', workers: [] },
      { title: 'hihi', liek: 1 },
    ],
  },
  {
    title: 'h2',
    summary: 'df',
    documents: [
      { title: 'dfdf', workers: ['asdf'] },
      { title: 'hfff', liek: 100 },
    ],
  },
  {
    title: 'h2',
    summary: 'aaaaadf',
    documents: [
      { title: 'dfdf', workers: ['aa', 'bb', 'dd'] },
      { title: 'hihi', liek: 1 },
    ],
  },
  {
    title: 'need some new title!',
    summary: 'aaaaadf',
    documents: [
      { title: 'dfdf', workers: [] },
      { title: 'hiasdfasdfhi', liek: 1 },
      { title: 'hihi', liek: 12 },
      { title: 'hihi', liek: 4441 },
    ],
  },
];

export default projectList;
