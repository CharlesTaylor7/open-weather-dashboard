import { useState, useEffect } from 'react';

export default function App() {
  const [count, setCount] = useState(0);
  const [apiResult, setApiResult] = useState({});
  console.log('api key', OPEN_WEATHER_API_KEY);
  /*
  useEffect(() => {
    fetch('https://api.openweathermap.org/data/3.0/onecall?lat=35&lon=-85&appid=32462e94fa616cc6f77157cc3c965959&lang=en')
      .then(response => response.json())
      .then(setApiResult)
  }, [])
   */

  return (
    <div className="flex flex-col justify-content align-items gap-5">
      <h1>Vite + React + Typescript</h1>
      <button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button>
      <p>
        Edit <code>src/App.tsx</code> and save to test HMR
      </p>
    </div>
  );
}
