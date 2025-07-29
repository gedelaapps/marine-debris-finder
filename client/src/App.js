import React, { useState } from 'react';
import Map from './components/Map';
import DebrisForm from './components/DebrisForm';

function App() {
  const [location, setLocation] = useState(null);

  return (
    <div>
      <h1>Marine Debris Reporting Platform</h1>
      <Map onLocationSelect={setLocation} />
      {location && <DebrisForm location={location} />}
    </div>
  );
}

export default App;
