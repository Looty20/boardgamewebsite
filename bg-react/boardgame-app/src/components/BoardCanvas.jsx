import React from 'react';

function BoardCanvas({ objects, selectedId, setSelectedId }) {
  return (
    <div className="flex-1 bg-green-100 relative">
      {objects.map(obj => (
        <div
          key={obj.id}
          onClick={() => setSelectedId(obj.id)}
          className={`absolute cursor-pointer px-2 py-1 rounded shadow ${
            selectedId === obj.id ? 'bg-blue-400 text-white' : 'bg-white'
          }`}
          style={{ left: obj.x, top: obj.y }}
        >
          {obj.name}
        </div>
      ))}
    </div>
  );
}

export default BoardCanvas;
