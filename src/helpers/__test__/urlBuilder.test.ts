import { ProfileParams, ProjectParams } from 'src/routes/RootLevelPath';
import urlBuilder from '../urlBuilder';

test('build main url', () => {
  expect(() => urlBuilder.main()).not.toThrow();
});

test('build auth url', () => {
  expect(() => urlBuilder.auth()).not.toThrow();
});

test('build profile url', () => {
  const params: ProfileParams = {
    userID: '123',
  };

  expect(() => urlBuilder.profile(params)).not.toThrow();
});

test('build project url', () => {
  const params: ProjectParams = {
    projectID: '123',
  };

  expect(() => urlBuilder.project(params)).not.toThrow();
});

test('build search url', () => {
  expect(() => urlBuilder.search()).not.toThrow();
});
