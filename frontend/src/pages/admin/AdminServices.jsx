import React, { useEffect, useState } from 'react';
import { adminApi } from '../../adminApi';
import { Spinner } from '../../components/Spinner';
import { Plus, Edit2, Trash2 } from 'lucide-react';

export const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ 
    title: '', slug: '', short_description: '', full_description: '', is_published: false, display_order: 0 
  });
  const [submitting, setSubmitting] = useState(false);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const data = await adminApi.getServices();
      setServices(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const openModal = (service = null) => {
    if (service) {
      setEditingId(service.id);
      setFormData({
        title: service.title,
        slug: service.slug,
        short_description: service.short_description,
        full_description: service.full_description,
        is_published: service.is_published,
        display_order: service.display_order
      });
    } else {
      setEditingId(null);
      setFormData({ title: '', slug: '', short_description: '', full_description: '', is_published: true, display_order: 0 });
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
        await adminApi.updateService(editingId, formData);
      } else {
        await adminApi.createService(formData);
      }
      closeModal();
      fetchServices();
    } catch (err) {
      console.error(err);
      alert('Failed to save service');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        await adminApi.deleteService(id);
        fetchServices();
      } catch (err) {
        console.error(err);
        alert('Failed to delete service');
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-primary">Services Management</h1>
        <button onClick={() => openModal()} className="btn btn-primary flex items-center gap-2">
          <Plus size={18} /> Add Service
        </button>
      </div>

      {loading ? (
        <Spinner size={40} className="mt-12" />
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="p-4 font-semibold text-gray-600">Order</th>
                <th className="p-4 font-semibold text-gray-600">Title & Slug</th>
                <th className="p-4 font-semibold text-gray-600">Status</th>
                <th className="p-4 font-semibold text-gray-600 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map(service => (
                <tr key={service.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-4 text-gray-500 w-16 text-center">{service.display_order}</td>
                  <td className="p-4">
                    <p className="font-bold text-gray-900">{service.title}</p>
                    <p className="text-sm text-gray-500">/{service.slug}</p>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full 
                      ${service.is_published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                      {service.is_published ? 'PUBLISHED' : 'DRAFT'}
                    </span>
                  </td>
                  <td className="p-4 flex justify-end gap-3">
                    <button onClick={() => openModal(service)} className="text-blue-600 hover:text-blue-800 p-1" title="Edit">
                      <Edit2 size={18} />
                    </button>
                    <button onClick={() => handleDelete(service.id)} className="text-red-600 hover:text-red-800 p-1" title="Delete">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {services.length === 0 && (
                <tr>
                  <td colSpan="4" className="p-8 text-center text-gray-500">No services found.</td>
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
            <h2 className="text-xl font-bold mb-4">{editingId ? 'Edit Service' : 'Add New Service'}</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="form-group mb-0">
                  <label className="form-label">Title</label>
                  <input type="text" name="title" required className="form-control" value={formData.title} onChange={handleFormChange} />
                </div>
                <div className="form-group mb-0">
                  <label className="form-label">Slug</label>
                  <input type="text" name="slug" required className="form-control" value={formData.slug} onChange={handleFormChange} />
                </div>
              </div>
              
              <div className="form-group mb-0">
                <label className="form-label">Short Description</label>
                <textarea name="short_description" required className="form-control" rows="2" value={formData.short_description} onChange={handleFormChange} maxLength="255"></textarea>
              </div>
              
              <div className="form-group mb-0">
                <label className="form-label">Full Description</label>
                <textarea name="full_description" required className="form-control" rows="6" value={formData.full_description} onChange={handleFormChange}></textarea>
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
                  {submitting ? 'Saving...' : 'Save Service'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
