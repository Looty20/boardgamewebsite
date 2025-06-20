import React from 'react';

function Sidebar({ addObject }) {
  return (
    <div className="w-48 bg-gray-200 p-4 space-y-2">
      <h3 className="font-bold">Add Element</h3>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 w-full rounded"
        onClick={() => addObject('Card')}
      >
        Add Card
      </button>
      <button
        className="bg-purple-500 hover:bg-purple-600 text-white px-2 py-1 w-full rounded"
        onClick={() => addObject('Token')}
      >
        Add Token
      </button>
    </div>
  );
}

export default Sidebar;
