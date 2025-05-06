import { useEffect, useState } from 'react';
import axios from 'axios';
import type ModuleProps from '../../types/types';

const ModuleManager = () => {
  const [modules, setModules] = useState<ModuleProps[]>([]);
  const [modName, setModName] = useState('');
  const [modCredits, setModCredits] = useState<number>(0);
  const [editingId, setEditingId] = useState<number | null>(null);

  const fetchModules = async () => {
    const res = await axios.get('http://localhost:4500/api/modules');
    setModules(res.data);
  };

  useEffect(() => {
    fetchModules();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ModName: modName,
      ModCredits: modCredits,
    };

    if (editingId) {
      await axios.put(`http://localhost:4500/api/modules/${editingId}`, payload);
    } else {
      await axios.post('http://localhost:4500/api/modules', payload);
    }

    setModName('');
    setModCredits(0);
    setEditingId(null);
    fetchModules();
  };

  const handleEdit = (mod: ModuleProps) => {
    setModName(mod.ModName);
    setModCredits(mod.ModCredits);
    setEditingId(mod.Module_Id);
  };

  const handleDelete = async (id: number) => {
    await axios.delete(`http://localhost:4500/api/modules/${id}`);
    fetchModules();
  };

  return (
    <div className="min-h-screen bg-indigo-100 py-6">
      <div className="max-w-xl mx-auto bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">Module Management</h2>
        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <input
            type="text"
            placeholder="Module Name"
            className="border px-4 py-2 w-full rounded"
            value={modName}
            onChange={(e) => setModName(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Module Credits"
            className="border px-4 py-2 w-full rounded"
            value={modCredits}
            onChange={(e) => setModCredits(Number(e.target.value))}
            required
          />
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full">
            {editingId ? 'Update Module' : 'Add Module'}
          </button>
        </form>

        {modules.length === 0 ? (
          <div className="text-center text-gray-500">No Modules Yet</div>
        ) : (
          <div className="space-y-2">
            {modules.map((mod) => (
              <div
                key={mod.Module_Id}
                className="flex justify-between items-center border p-3 rounded bg-gray-50"
              >
                <div>
                  <p className="font-medium">{mod.ModName}</p>
                  <p className="text-sm text-gray-600">Credits: {mod.ModCredits}</p>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => handleEdit(mod)}
                    className="bg-green-500 hover:bg-yellow-700 text-white px-2 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(mod.Module_Id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ModuleManager;
