import { useEffect, useState } from 'react';
import axios from 'axios';
import type TraineeProps from '../../types/types';
import type TradeProps from '../../types/types';

const TraineeManager = () => {
  const [trainees, setTrainees] = useState<TraineeProps[]>([]);
  const [trades, setTrades] = useState<TradeProps[]>([]);
  const [form, setForm] = useState({
    FirstNames: '',
    LastName: '',
    Gender: '',
    Trade_Id: 0,
  });
  const [editingId, setEditingId] = useState<number | null>(null);

  const fetchTrainees = async () => {
    const res = await axios.get('http://localhost:4500/api/trainees');
    setTrainees(res.data);
  };

  const fetchTrades = async () => {
    const res = await axios.get('http://localhost:4500/api/trades');
    setTrades(res.data);
  };

  useEffect(() => {
    fetchTrainees();
    fetchTrades();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'Trade_Id' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await axios.put(`http://localhost:4500/api/trainees/${editingId}`, form);
    } else {
      await axios.post('http://localhost:4500/api/trainees', form);
    }

    setForm({ FirstNames: '', LastName: '', Gender: '', Trade_Id: 0 });
    setEditingId(null);
    fetchTrainees();
  };

  const handleEdit = (t: TraineeProps) => {
    setForm({
      FirstNames: t.FirstNames,
      LastName: t.LastName,
      Gender: t.Gender,
      Trade_Id: t.Trade_Id,
    });
    setEditingId(t.Trainees_Id);
  };

  const handleDelete = async (id: number) => {
    await axios.delete(`http://localhost:4500/api/trainees/${id}`);
    fetchTrainees();
  };

  return (
    <div className="min-h-screen bg-indigo-100 py-10 px-4 flex flex-col items-center">
      <h2 className="text-3xl font-bold text-indigo-800 mb-8">Manage Trainees</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-xl space-y-4 mb-8"
      >
        <input
          type="text"
          name="FirstNames"
          placeholder="First Names"
          className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={form.FirstNames}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="LastName"
          placeholder="Last Name"
          className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={form.LastName}
          onChange={handleChange}
          required
        />
        <select
          name="Gender"
          className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={form.Gender}
          onChange={handleChange}
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <select
          name="Trade_Id"
          className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={form.Trade_Id}
          onChange={handleChange}
          required
        >
          <option value="">Select Trade</option>
          {trades.map((trade) => (
            <option key={trade.Trade_Id} value={trade.Trade_Id}>
              {trade.Trade_Name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded-lg w-full transition duration-300"
        >
          {editingId ? 'Update Trainee' : 'Add Trainee'}
        </button>
      </form>

      {trainees.length === 0 ? (
        <div className="text-center text-gray-600 font-medium">No trainees yet</div>
      ) : (
        <div className="w-full max-w-xl space-y-4">
          {trainees.map((t) => (
            <div
              key={t.Trainees_Id}
              className="bg-white rounded-lg shadow-md p-4 flex justify-between items-start"
            >
              <div>
                <p className="font-semibold text-gray-800">
                  {t.FirstNames} {t.LastName}
                </p>
                <p className="text-sm text-gray-600">Gender: {t.Gender}</p>
                <p className="text-sm text-gray-600">
                  Trade: {trades.find((trade) => trade.Trade_Id === t.Trade_Id)?.Trade_Name || 'Unknown'}
                </p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => handleEdit(t)}
                  className="bg-green-500 hover:bg-yellow-500 text-white px-3 py-1 rounded-md font-semibold transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(t.Trainees_Id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md font-semibold transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TraineeManager;
