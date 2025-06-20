import React from 'react';

function Inspector({ object, updateObject }) {
  if (!object) return <div className="w-64 bg-gray-100 p-4">No element selected</div>;

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateObject({ [name]: value });
  };

  return (
    <div className="w-64 bg-gray-100 p-4 space-y-2">
      <h3 className="font-bold">Inspector</h3>
      <div>
        <label className="block text-sm">Name</label>
        <input
          className="w-full p-1 border rounded"
          name="name"
          value={object.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label className="block text-sm">X</label>
        <input
          type="number"
          className="w-full p-1 border rounded"
          name="x"
          value={object.x}
          onChange={handleChange}
        />
      </div>
      <div>
        <label className="block text-sm">Y</label>
        <input
          type="number"
          className="w-full p-1 border rounded"
          name="y"
          value={object.y}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

export default Inspector;
