import { ApolloServerPlugin } from 'apollo-server-plugin-base';
import colors from 'colors';

const logger: ApolloServerPlugin = {
  serverWillStart: () => {
    console.log(colors.green('Server starting up!'));
    console.log();
  },

  requestDidStart: ({ request: { operationName, variables, query } }) => {
    console.log(colors.green('Request starting up!'));

    if (operationName) {
      console.log(colors.yellow('operation name:'));
      console.log(operationName);
    }

    if (variables) {
      console.log(colors.yellow('variables:'));
      console.log(variables);
    }

    if (query) {
      console.log(colors.yellow('query:'));
      console.log(query);
    }

    return {
      didEncounterErrors: ({ errors }) => {
        console.log(colors.yellow('encounter errors!'));
        errors.map((error) => {
          console.error(JSON.stringify(error, null, 4));
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
