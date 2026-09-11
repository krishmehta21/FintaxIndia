import React, { useEffect, useState } from 'react';
import { adminApi } from '../../adminApi';
import { Spinner } from '../../components/Spinner';
import { Plus, Edit2, Trash2 } from 'lucide-react';

export const AdminTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ 
    client_name: '', client_role: '', client_company: '', content: '', is_published: true, display_order: 0 
  });
  const [submitting, setSubmitting] = useState(false);

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const data = await adminApi.getTestimonials();
      setTestimonials(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const openModal = (test = null) => {
    if (test) {
      setEditingId(test.id);
      setFormData({
        client_name: test.client_name,
        client_role: test.client_role || '',
        client_company: test.client_company || '',
        content: test.content,
        is_published: test.is_published,
        display_order: test.display_order
      });
    } else {
      setEditingId(null);
      setFormData({ client_name: '', client_role: '', client_company: '', content: '', is_published: true, display_order: 0 });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleFormChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (editingId) {
        await adminApi.updateTestimonial(editingId, formData);
      } else {
        await adminApi.createTestimonial(formData);
      }
      closeModal();
      fetchTestimonials();
    } catch (err) {
      console.error(err);
      alert('Failed to save testimonial');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      try {
        await adminApi.deleteTestimonial(id);
        fetchTestimonials();
      } catch (err) {
        console.error(err);
        alert('Failed to delete testimonial');
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-primary">Testimonials Management</h1>
        <button onClick={() => openModal()} className="btn btn-primary flex items-center gap-2">
          <Plus size={18} /> Add Testimonial
        </button>
      </div>

      {loading ? (
        <Spinner size={40} className="mt-12" />
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="p-4 font-semibold text-gray-600">Client Info</th>
                <th className="p-4 font-semibold text-gray-600">Content Preview</th>
                <th className="p-4 font-semibold text-gray-600">Status</th>
                <th className="p-4 font-semibold text-gray-600 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {testimonials.map(t => (
                <tr key={t.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-4">
                    <p className="font-bold text-gray-900">{t.client_name}</p>
                    <p className="text-sm text-gray-500">{t.client_role} {t.client_company ? `@ ${t.client_company}` : ''}</p>
                  </td>
                  <td className="p-4 max-w-md">
                    <p className="text-gray-600 truncate">{t.content}</p>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full 
                      ${t.is_published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                      {t.is_published ? 'PUBLISHED' : 'DRAFT'}
                    </span>
                  </td>
                  <td className="p-4 flex justify-end gap-3 h-full items-center">
                    <button onClick={() => openModal(t)} className="text-blue-600 hover:text-blue-800 p-1" title="Edit">
                      <Edit2 size={18} />
                    </button>
                    <button onClick={() => handleDelete(t.id)} className="text-red-600 hover:text-red-800 p-1" title="Delete">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {testimonials.length === 0 && (
                <tr>
                  <td colSpan="4" className="p-8 text-center text-gray-500">No testimonials found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
            <h2 className="text-xl font-bold mb-4">{editingId ? 'Edit Testimonial' : 'Add New Testimonial'}</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="form-group mb-0">
                <label className="form-label">Client Name</label>
                <input type="text" name="client_name" required className="form-control" value={formData.client_name} onChange={handleFormChange} />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="form-group mb-0">
                  <label className="form-label">Role (Optional)</label>
                  <input type="text" name="client_role" className="form-control" value={formData.client_role} onChange={handleFormChange} />
                </div>
                <div className="form-group mb-0">
                  <label className="form-label">Company (Optional)</label>
                  <input type="text" name="client_company" className="form-control" value={formData.client_company} onChange={handleFormChange} />
                </div>
              </div>
              
              <div className="form-group mb-0">
                <label className="form-label">Testimonial Content</label>
                <textarea name="content" required className="form-control" rows="4" value={formData.content} onChange={handleFormChange}></textarea>
              </div>

              <div className="grid grid-cols-2 gap-4 items-center">
                <div className="form-group mb-0 flex items-center gap-2">
                  <input type="checkbox" id="is_published" name="is_published" checked={formData.is_published} onChange={handleFormChange} className="w-4 h-4" />
                  <label htmlFor="is_published" className="font-medium text-gray-700">Published</label>
                </div>
                <div className="form-group mb-0">
                  <label className="form-label text-sm">Display Order</label>
                  <input type="number" name="display_order" className="form-control" value={formData.display_order} onChange={handleFormChange} />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-4 pt-4 border-t">
                <button type="button" onClick={closeModal} className="btn btn-outline text-gray-600 border-gray-300">Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={submitting}>
                  {submitting ? 'Saving...' : 'Save Testimonial'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
