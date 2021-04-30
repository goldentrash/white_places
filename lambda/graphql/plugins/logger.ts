import { ApolloServerPlugin } from 'apollo-server-plugin-base';

const enum LogLevel {
  Info = 'INFO',
  Error = 'ERROR',
  Warn = 'WARNING',
}

export const logger: ApolloServerPlugin = {
  serverWillStart: () => {
    console.log(`${LogLevel.Info} - ${new Date().toString()}: Server started`);
  },

  requestDidStart: ({ request: { operationName } }) => {
    console.log(
      `${LogLevel.Info} - ${new Date().toString()}: Get ${
        operationName ?? 'anonymous'
      } request`
    );

    return {
      didEncounterErrors: ({ errors }) => {
        errors.map((error) => {
          console.error(
            `${LogLevel.Error} - ${new Date().toString()}: ${
              error.message
            } at ${operationName ?? 'anonymous'}`
          );
        });
      },

      willSendResponse: () => {
        console.log(
          `${LogLevel.Info} - ${new Date().toString()}: Resolve ${
            operationName ?? 'anonymous'
          }`
        );
      },
    };
  },
};
