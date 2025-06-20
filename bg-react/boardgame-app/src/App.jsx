// App.jsx
import React, { useState } from 'react';
import BoardCanvas from './components/BoardCanvas';
import Toolbar from './components/Toolbar';
import Inspector from './components/Inspector';
import Sidebar from './components/Sidebar';

function App() {
  const [objects, setObjects] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const addObject = (type) => {
    const newObject = {
      id: Date.now().toString(),
      type,
      x: 100,
      y: 100,
      name: `${type} ${objects.length + 1}`,
    };
    setObjects([...objects, newObject]);
  };

  const updateObject = (id, updates) => {
    setObjects(objects.map(obj => obj.id === id ? { ...obj, ...updates } : obj));
  };

  return (
    <div className="flex h-screen">
      <Sidebar addObject={addObject} />
      <div className="flex flex-col flex-1">
        <Toolbar />
        <BoardCanvas
          objects={objects}
          setSelectedId={setSelectedId}
          selectedId={selectedId}
        />
      </div>
      <Inspector
        object={objects.find(o => o.id === selectedId)}
        updateObject={(updates) => updateObject(selectedId, updates)}
      />
    </div>
  );
}

export default App;
