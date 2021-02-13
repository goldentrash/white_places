import { Elm } from '../src/Main.elm';

const flags = {
  user: {
    name: localStorage.getItem('name'),
    jwt: localStorage.getItem('jwt'),
  },
};

const App = Elm.Main.init({ flags });
