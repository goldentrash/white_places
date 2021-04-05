import { ApolloServerPlugin } from 'apollo-server-plugin-base';
import colors from 'colors';

const logger: ApolloServerPlugin = {
  serverWillStart: () => {
    console.log(colors.green('Server starting up!'));
    console.log();
  },

  requestDidStart: ({ request: { operationName, variables, query } }) => {
    if (operationName) {
      console.log(colors.yellow('operation name:'));
      console.log(operationName);
      console.log();
    }

    if (variables) {
      console.log(colors.yellow('variables:'));
      console.log(variables);
      console.log();
    }

    if (query) {
      console.log(colors.yellow('query:'));
      console.log(query);
      console.log();
    }

    return {
      didEncounterErrors: ({ errors }) => {
        console.log(colors.yellow('encounter errors!'));
        errors.map((error) => {
          console.error(JSON.stringify(error, null, 4));
          console.log();
        });
      },

      willSendResponse: ({ response: { data } }) => {
        console.log(colors.yellow('response'));
        console.log(JSON.stringify(data, null, 4));
        console.log();
      },
    };
  },
};

export default logger;
