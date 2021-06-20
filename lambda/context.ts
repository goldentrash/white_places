import { HandlerContext } from '@netlify/functions';

type AuthContext = {
  user: { email: string };
  identity: { url: string; token: string };
};
const isAuthContext = (
  clientContext: HandlerContext['clientContext']
): clientContext is AuthContext => {
  return clientContext?.user !== undefined;
};

type Context = { auth: AuthContext | null };

const context = ({
  context: { clientContext },
}: {
  context: HandlerContext;
}): Context => {
  const auth = isAuthContext(clientContext) ? clientContext : null;

  return {
    auth,
  };
};

export default context;
export { Context };
