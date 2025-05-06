import { useEffect, useState } from 'react';
import axios from 'axios';
import type TradeProps from '../../types/types';

const TradeManager = () => {
  const [trades, setTrades] = useState<TradeProps[]>([]);
  const [tradeName, setTradeName] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);

  const fetchTrades = async () => {
    const res = await axios.get('http://localhost:4500/api/trades/');
    setTrades(res.data);
  };

  useEffect(() => {
    fetchTrades();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await axios.put(`http://localhost:4500/api/trades/${editingId}`, {
        Trade_Name: tradeName,
      });
    } else {
      await axios.post('http://localhost:4500/api/trades', {
        Trade_Name: tradeName,
      });
    }
    setTradeName('');
    setEditingId(null);
    fetchTrades();
  };

  const handleEdit = (trade: TradeProps) => {
    setTradeName(trade.Trade_Name);
    setEditingId(trade.Trade_Id);
  };

  const handleDelete = async (id: number) => {
    await axios.delete(`http://localhost:4500/api/trades/${id}`);
    fetchTrades();
  };

  return (
    <div className="min-h-screen bg-indigo-100 flex flex-col items-center py-10 px-4">
      <h2 className="text-3xl font-bold text-indigo-800 mb-8">Manage Trades</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md mb-6 w-full max-w-xl space-y-4"
      >
        <input
          type="text"
          placeholder="Enter trade name"
          className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={tradeName}
          onChange={(e) => setTradeName(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded-lg w-full transition-colors duration-300"
        >
          {editingId ? 'Update Trade' : 'Add Trade'}
        </button>
      </form>

      {trades.length === 0 && (
        <div className="text-center text-gray-600 font-medium">No trades yet</div>
      )}

      <div className="w-full max-w-xl space-y-4">
        {trades.map((trade) => (
          <div
            key={trade.Trade_Id}
            className="bg-white rounded-lg shadow-md p-4 flex justify-between items-center"
          >
            <span className="text-gray-800 font-medium">{trade.Trade_Name}</span>
            <div className="space-x-2">
              <button
                onClick={() => handleEdit(trade)}
                className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-md font-semibold transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(trade.Trade_Id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md font-semibold transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TradeManager;
