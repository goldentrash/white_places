import { Elm } from '../src/Main.elm';
import './app.css';

const flags = {
  username: 'user',
  jwt: 'jwt',
};

const App = Elm.Main.init({ flags });
