export const handler = async (event: any, context: any) => {
  console.log('all is well');

  return {
    statusCode: 200,
    body: JSON.stringify({ event, context }),
  };
};
