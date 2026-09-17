import React, { useEffect, useState, useRef } from 'react';
import { adminApi } from '../../adminApi';
import { Spinner } from '../../components/Spinner';
import { Plus, Edit2, Trash2, Image as ImageIcon, Star, GripVertical } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const CATEGORIES = [
  "GST Updates",
  "ITR Filing",
  "Tax Saving Tips",
  "Compliance Alerts",
  "Corporate Advisory",
  "General Finance"
];

export const AdminBlog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ 
    title: '', slug: '', excerpt: '', content: '', cover_image_url: '', category: CATEGORIES[0], status: 'draft' 
  });
  const [submitting, setSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [draggedPostId, setDraggedPostId] = useState(null);
  const fileInputRef = useRef(null);

  const sortedPosts = [...posts].sort((a, b) => {
    if (a.is_spotlighted && !b.is_spotlighted) return -1;
    if (!a.is_spotlighted && b.is_spotlighted) return 1;
    if (a.is_spotlighted && b.is_spotlighted) {
      const rankA = a.spotlight_rank || 999;
      const rankB = b.spotlight_rank || 999;
      return rankA - rankB;
    }
    return new Date(b.created_at) - new Date(a.created_at);
  });

  const handleToggleSpotlight = async (post) => {
    try {
      const isNowSpotlighted = !post.is_spotlighted;
      let newRank = null;
      if (isNowSpotlighted) {
         const spotlighted = sortedPosts.filter(p => p.is_spotlighted);
         newRank = spotlighted.length + 1;
      }
      await adminApi.updateBlogPost(post.id, { is_spotlighted: isNowSpotlighted, spotlight_rank: newRank });
      fetchPosts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDragStart = (e, post) => {
    if (!post.is_spotlighted) {
      e.preventDefault();
      return;
    }
    setDraggedPostId(post.id);
    e.dataTransfer.effectAllowed = 'move';
    // Firefox requires data to be set for drag to work
    e.dataTransfer.setData('text/plain', post.id);
  };

  const handleDragOver = (e, post) => {
    if (!post.is_spotlighted) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = async (e, targetPost) => {
    e.preventDefault();
    if (!draggedPostId || !targetPost.is_spotlighted || draggedPostId === targetPost.id) {
      setDraggedPostId(null);
      return;
    }

    let spotlighted = sortedPosts.filter(p => p.is_spotlighted);
    const draggedIdx = spotlighted.findIndex(p => p.id === draggedPostId);
    const targetIdx = spotlighted.findIndex(p => p.id === targetPost.id);

    if (draggedIdx === -1 || targetIdx === -1) {
      setDraggedPostId(null);
      return;
    }

    const item = spotlighted.splice(draggedIdx, 1)[0];
    spotlighted.splice(targetIdx, 0, item);

    setDraggedPostId(null);
    
    try {
      setLoading(true);
      await Promise.all(
        spotlighted.map((p, i) => adminApi.updateBlogPost(p.id, { spotlight_rank: i + 1 }))
      );
      fetchPosts();
    } catch(err) {
      console.error(err);
      setLoading(false);
    }
  };

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const data = await adminApi.getBlogPosts();
      setPosts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const openModal = (post = null) => {
    if (post) {
      setEditingId(post.id);
      setFormData({
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        cover_image_url: post.cover_image_url || '',
        category: post.category,
        status: post.status
      });
    } else {
      setEditingId(null);
      setFormData({ title: '', slug: '', excerpt: '', content: '', cover_image_url: '', category: CATEGORIES[0], status: 'draft' });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    let updates = { [name]: value };
    
    // Auto slugify if typing title and it's a new post (not editing)
    if (name === 'title' && !editingId) {
      updates.slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    }
    
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setUploadingImage(true);
    try {
      const { url } = await adminApi.uploadBlogImage(file);
      setFormData(prev => ({ ...prev, cover_image_url: url }));
    } catch (err) {
      console.error(err);
      alert('Failed to upload image. Please ensure it is < 5MB and a valid image format.');
    } finally {
      setUploadingImage(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e, forceStatus = null) => {
    if (e) e.preventDefault();
    setSubmitting(true);
    
    const dataToSubmit = { ...formData };
    if (forceStatus) {
      dataToSubmit.status = forceStatus;
    }
    
    if (!dataToSubmit.cover_image_url) {
      dataToSubmit.cover_image_url = 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80';
    }

    try {
      if (editingId) {
        await adminApi.updateBlogPost(editingId, dataToSubmit);
      } else {
        await adminApi.createBlogPost(dataToSubmit);
      }
      closeModal();
      fetchPosts();
    } catch (err) {
      console.error(err);
      alert(`Failed to save blog post: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      try {
        await adminApi.deleteBlogPost(id);
        fetchPosts();
      } catch (err) {
        console.error(err);
        alert('Failed to delete blog post');
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-primary">Blog Management</h1>
        <button onClick={() => openModal()} className="btn btn-primary flex items-center gap-2">
          <Plus size={18} /> New Post
        </button>
      </div>

      {loading ? (
        <Spinner size={40} className="mt-12" />
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="p-4 font-semibold text-gray-600">Post</th>
                <th className="p-4 font-semibold text-gray-600">Category</th>
                <th className="p-4 font-semibold text-gray-600">Last Updated</th>
                <th className="p-4 font-semibold text-gray-600">Spotlight</th>
                <th className="p-4 font-semibold text-gray-600">Status</th>
                <th className="p-4 font-semibold text-gray-600 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedPosts.map((post, index) => {
                const spotlightedCount = sortedPosts.filter(p => p.is_spotlighted).length;
                const isFirstSpotlight = index === 0;
                const isLastSpotlight = index === spotlightedCount - 1;

                return (
                <tr 
                  key={post.id} 
                  className={`border-b border-gray-100 hover:bg-gray-50 transition-opacity ${draggedPostId === post.id ? 'opacity-30' : ''}`}
                  draggable={post.is_spotlighted}
                  onDragStart={(e) => handleDragStart(e, post)}
                  onDragOver={(e) => handleDragOver(e, post)}
                  onDrop={(e) => handleDrop(e, post)}
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      {post.is_spotlighted ? (
                        <div className="flex items-center gap-1 text-gray-400 cursor-grab hover:text-gray-600" title="Drag to reorder">
                          <GripVertical size={16} />
                          <span className="font-mono text-xs font-bold text-gray-500 w-3 text-center">{post.spotlight_rank}</span>
                        </div>
                      ) : (
                        <div className="w-9"></div>
                      )}
                      <div>
                        <p className="font-bold text-gray-900 line-clamp-1">{post.title}</p>
                        <p className="text-sm text-gray-500">/{post.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-gray-600 whitespace-nowrap">
                    <span className="px-2 py-1 bg-gray-100 text-xs font-semibold uppercase tracking-wider text-accent rounded-sm">
                      {post.category}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-gray-500 whitespace-nowrap">
                    {new Date(post.updated_at).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleToggleSpotlight(post)} className={`p-1 rounded ${post.is_spotlighted ? 'text-accent hover:text-yellow-600' : 'text-gray-300 hover:text-gray-500'}`} title="Toggle Spotlight">
                        <Star size={18} fill={post.is_spotlighted ? 'currentColor' : 'none'} />
                      </button>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full 
                      ${post.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                      {post.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="p-4 flex justify-end gap-3 items-center h-full mt-2">
                    <button onClick={() => openModal(post)} className="text-blue-600 hover:text-blue-800 p-1" title="Edit">
                      <Edit2 size={18} />
                    </button>
                    <button onClick={() => handleDelete(post.id)} className="text-red-600 hover:text-red-800 p-1" title="Delete">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
                );
              })}
              {posts.length === 0 && (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-gray-500">No blog posts found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Editor Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-50 rounded-xl shadow-xl w-full max-w-6xl max-h-[95vh] overflow-y-auto flex flex-col">
            
            <div className="flex justify-between items-center p-6 border-b bg-white rounded-t-xl shrink-0">
              <h2 className="text-xl font-bold text-primary">{editingId ? 'Edit Blog Post' : 'New Blog Post'}</h2>
              <div className="flex gap-3">
                <button type="button" onClick={closeModal} className="btn btn-outline text-gray-600 border-gray-300 py-1">Cancel</button>
                <button 
                  type="button" 
                  onClick={(e) => handleSubmit(e, 'draft')} 
                  className="btn btn-outline text-gray-600 border-gray-300 py-1"
                  disabled={submitting}
                >
                  Save Draft
                </button>
                <button 
                  type="button" 
                  onClick={(e) => handleSubmit(e, 'published')} 
                  className="btn btn-primary py-1"
                  disabled={submitting}
                >
                  Publish Post
                </button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto flex-grow flex flex-col md:flex-row gap-6">
              
              {/* Left Column: Form Controls */}
              <div className="w-full md:w-1/2 flex flex-col gap-5">
                <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                  <h3 className="font-bold text-gray-700 mb-4 border-b pb-2">Meta Information</h3>
                  
                  <div className="form-group">
                    <label className="form-label">Title</label>
                    <input type="text" name="title" required className="form-control" value={formData.title} onChange={handleFormChange} />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="form-group">
                      <label className="form-label">Slug</label>
                      <input type="text" name="slug" required className="form-control" value={formData.slug} onChange={handleFormChange} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Category</label>
                      <select name="category" className="form-control" value={formData.category} onChange={handleFormChange}>
                        {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Excerpt (Short summary)</label>
                    <textarea name="excerpt" required className="form-control" rows="2" value={formData.excerpt} onChange={handleFormChange} maxLength="1000"></textarea>
                  </div>

                  <div className="form-group mb-0">
                    <label className="form-label">Cover Image</label>
                    {formData.cover_image_url && (
                      <div className="mb-3 relative group">
                        <img src={formData.cover_image_url} alt="Cover" className="w-full h-32 object-cover rounded-md border" />
                        <button 
                          type="button" 
                          onClick={() => setFormData(prev => ({...prev, cover_image_url: ''}))}
                          className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    )}
                    <div className="flex items-center gap-3">
                      <input 
                        type="file" 
                        accept="image/jpeg, image/png, image/webp" 
                        className="hidden" 
                        ref={fileInputRef}
                        onChange={handleImageUpload} 
                      />
                      <button 
                        type="button" 
                        onClick={() => fileInputRef.current?.click()} 
                        className="btn btn-outline flex items-center gap-2 py-2 px-4 border-gray-300 text-gray-700 w-full justify-center"
                        disabled={uploadingImage}
                      >
                        <ImageIcon size={18} /> {uploadingImage ? 'Uploading...' : (formData.cover_image_url ? 'Replace Image' : 'Upload Image')}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm flex-grow flex flex-col">
                  <h3 className="font-bold text-gray-700 mb-4 border-b pb-2">Content (Markdown)</h3>
                  <textarea 
                    name="content" 
                    required 
                    className="form-control font-mono text-sm flex-grow min-h-[300px]" 
                    value={formData.content} 
                    onChange={handleFormChange}
                    placeholder="# Main Heading&#10;&#10;Write your post content here using markdown..."
                  ></textarea>
                </div>
              </div>

              {/* Right Column: Live Preview */}
              <div className="w-full md:w-1/2 bg-white rounded-lg border border-gray-200 shadow-sm flex flex-col overflow-hidden">
                <div className="bg-gray-100 px-4 py-3 border-b text-sm font-bold text-gray-500 uppercase tracking-wider shrink-0">
                  Live Preview
                </div>
                <div className="p-8 overflow-y-auto prose prose-navy max-w-none flex-grow">
                  {!formData.content ? (
                    <p className="text-gray-400 italic mt-10 text-center">Start typing to see preview...</p>
                  ) : (
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {formData.content}
                    </ReactMarkdown>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};
