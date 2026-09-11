import React, { useEffect, useState } from 'react';
import { adminApi } from '../../adminApi';
import { Spinner } from '../../components/Spinner';

export const AdminQA = () => {
  const [qaItems, setQaItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  
  // Modal state
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({ category: '', question: '', answer: '', slug: '', status: '' });
  const [submitting, setSubmitting] = useState(false);

  const fetchQA = async () => {
    setLoading(true);
    try {
      const data = await adminApi.getQA(filter);
      setQaItems(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQA();
  }, [filter]);

  const openModal = (item) => {
    setSelectedItem(item);
    setFormData({
      category: item.category || '',
      question: item.question || '',
      answer: item.answer || '',
      slug: item.slug || '',
      status: item.status || 'pending'
    });
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await adminApi.updateQA(selectedItem.id, formData);
      closeModal();
      fetchQA();
    } catch (err) {
      console.error(err);
      alert('Failed to update Q&A item');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-primary">Q&A Management</h1>
        <select 
          className="form-control w-auto" 
          value={filter} 
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="published">Published</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {loading ? (
        <Spinner size={40} className="mt-12" />
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="p-4 font-semibold text-gray-600">Date</th>
                <th className="p-4 font-semibold text-gray-600">Question</th>
                <th className="p-4 font-semibold text-gray-600">Category</th>
                <th className="p-4 font-semibold text-gray-600">Status</th>
                <th className="p-4 font-semibold text-gray-600 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {qaItems.map(item => (
                <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-4 text-sm text-gray-500 whitespace-nowrap">
                    {new Date(item.created_at).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <p className="font-medium text-gray-900 line-clamp-1">{item.question}</p>
                    {item.submitted_by_email && <p className="text-xs text-gray-500">By: {item.submitted_by_email}</p>}
                  </td>
                  <td className="p-4 text-sm text-gray-600">{item.category}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full 
                      ${item.status === 'published' ? 'bg-green-100 text-green-700' : 
                        item.status === 'pending' ? 'bg-orange-100 text-orange-700' : 
                        'bg-red-100 text-red-700'}`}>
                      {item.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button 
                      onClick={() => openModal(item)}
                      className="text-accent hover:text-accent-hover font-medium text-sm"
                    >
                      {item.status === 'pending' ? 'Review' : 'Edit'}
                    </button>
                  </td>
                </tr>
              ))}
              {qaItems.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-gray-500">No Q&A items found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
            <h2 className="text-xl font-bold mb-4">Review Q&A Submission</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="form-group mb-0">
                <label className="form-label">Category</label>
                <input type="text" name="category" required className="form-control" value={formData.category} onChange={handleFormChange} />
              </div>
              <div className="form-group mb-0">
                <label className="form-label">Slug</label>
                <input type="text" name="slug" className="form-control" value={formData.slug} onChange={handleFormChange} placeholder="optional-url-slug" />
              </div>
              <div className="form-group mb-0">
                <label className="form-label">Question</label>
                <textarea name="question" required className="form-control" rows="3" value={formData.question} onChange={handleFormChange}></textarea>
              </div>
              <div className="form-group mb-0">
                <label className="form-label">Answer</label>
                <textarea name="answer" className="form-control" rows="6" value={formData.answer} onChange={handleFormChange}></textarea>
              </div>
              <div className="form-group mb-0">
                <label className="form-label">Status</label>
                <select name="status" className="form-control" value={formData.status} onChange={handleFormChange}>
                  <option value="pending">Pending</option>
                  <option value="published">Published</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
              <div className="flex justify-end gap-3 mt-4 pt-4 border-t">
                <button type="button" onClick={closeModal} className="btn btn-outline text-gray-600 border-gray-300">Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={submitting}>
                  {submitting ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
