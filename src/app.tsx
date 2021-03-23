import React from 'react';

type AppProps = {
  name?: string;
  age?: number;
};

const App: React.FC<AppProps> = ({ name = 'guest', age = 3 }: AppProps) => {
  return (
    <div>
      hello {name}!
      <br />
      you are {age} years old!
    </div>
  );
};

export default App;
