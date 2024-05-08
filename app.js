import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [numbersId, setNumbersId] = useState('');
  const [response, setResponse] = useState(null);

  const handleInputChange = (event) => {
    setNumbersId(event.target.value);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(/numbers/$,{numbersId});
      setResponse(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numbersId]); // Fetch data whenever numbersId changes
  
  return (
    <div>
      <h1>Average Calculator</h1>
      <label>
        Enter qualified number ID (p for prime, f for Fibonacci, e for even, r for random):
        <input type="text" value={numbersId} onChange={handleInputChange} />
      </label>
      <button onClick={fetchData}>Fetch Data</button>

      {response && (
        <div>
          <h2>Response:</h2>
          <p>Numbers before: {response.numbers_before.join(', ')}</p>
          <p>Latest number: {response.latest_number}</p>
          <p>Numbers after: {response.numbers_after.join(', ')}</p>
          <p>Average: {response.average}</p>
        </div>
      )}
    </div>
  );
}

export default App;