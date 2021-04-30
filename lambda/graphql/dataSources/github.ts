import { RESTDataSource } from 'apollo-datasource-rest';

export class GithubAPI extends RESTDataSource {
  baseURL = 'https://github.api/com';

  constructor() {
    super();
  }
}
