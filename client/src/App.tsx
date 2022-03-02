import { useState } from 'react';
import { Login } from './components';
import './index.css';

function App() {
  const [count, setCount] = useState(0);
  console.log(process.env.REACT_APP_API_KEY);

  return (
    <>
      <main className="App">
        <Login />
      </main>
    </>
  );
}

export default App;
