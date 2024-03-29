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
      }`
    );

    return {
      didEncounterErrors: ({ errors }) => {
        errors.map((error) => {
          // netlify function log `console.log` not `console.error`
          console.log(
            `${LogLevel.Error} - ${new Date().toString()}: ${
              error.message
            } at ${operationName ?? 'anonymous'}`
          );
          console.log(error.stack);
        });
      },

      willSendResponse: () => {
        console.log(
          `${LogLevel.Info} - ${new Date().toString()}: Terminate ${
            operationName ?? 'anonymous'
          }`
        );
      },
    };
  },
};

export default logger;
