import { createContext } from 'react';
import GoTrue from 'gotrue-js';

const goTrue: GoTrue = new GoTrue({
  APIUrl: 'https://test-white-places.netlify.app/.netlify/identity',
});

const GoTrueContext = createContext<GoTrue>(goTrue);

export default goTrue;
export { GoTrueContext };
