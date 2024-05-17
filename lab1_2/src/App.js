import React, { useState } from 'react';
import './App.css'; 
import Slider from './components/Slider';
import TableView from './components/TableView';
import CardView from './components/CardView';

function App() {
  const [activeComponent, setActiveComponent] = useState(null);

  const handleClose = () => {
    setActiveComponent(null);
  };

  return (
    <div className="App">
      <button onClick={() => setActiveComponent('Slider')}>Show Slider</button>
      <button onClick={() => setActiveComponent('TableView')}>Show Table View</button>
      <button onClick={() => setActiveComponent('CardView')}>Show Card View</button>

      {activeComponent === 'Slider' && <Slider onClose={handleClose} />}
      {activeComponent === 'TableView' && <TableView onClose={handleClose} />}
      {activeComponent === 'CardView' && <CardView onClose={handleClose} />}
    </div>
  );
}

export default App;
