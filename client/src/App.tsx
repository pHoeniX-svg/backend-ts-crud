import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);
  console.log(process.env.REACT_APP_API_KEY);

  return (
    <>
      <h1>App</h1>
    </>
  );
}

export default App;
