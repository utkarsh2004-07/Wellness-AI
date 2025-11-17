'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function AdminVideosPage() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    title: '',
    category: 'face-yoga',
    description: '',
    premium_required: false
  });
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/admin/videos', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        setVideos(data.videos);
      } else {
        setError(data.error || 'Failed to fetch videos');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    
    const file = fileInputRef.current?.files[0];
    if (!file) {
      setError('Please select a video file');
      return;
    }

    if (!uploadForm.title.trim()) {
      setError('Please enter a video title');
      return;
    }

    setUploading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('video', file);
      formData.append('title', uploadForm.title);
      formData.append('category', uploadForm.category);
      formData.append('description', uploadForm.description);
      formData.append('premium_required', uploadForm.premium_required);

      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/admin/videos', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setVideos([data.video, ...videos]);
        setShowUploadForm(false);
        setUploadForm({
          title: '',
          category: 'face-yoga',
          description: '',
          premium_required: false
        });
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } else {
        setError(data.error || 'Video upload failed');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link href="/admin/dashboard" className="text-primary hover:underline">
                ← Dashboard
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Video Management</h1>
            </div>
            <button
              onClick={() => setShowUploadForm(!showUploadForm)}
              className="btn-primary"
            >
              {showUploadForm ? 'Cancel' : 'Upload Video'}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* Upload Form */}
        {showUploadForm && (
          <div className="card mb-8">
            <h2 className="text-xl font-bold mb-4">Upload New Video</h2>
            <form onSubmit={handleUpload} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Video File
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="video/*"
                  className="input-field"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Supported formats: MP4, MOV, AVI (Max 100MB)
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={uploadForm.title}
                  onChange={(e) => setUploadForm({ ...uploadForm, title: e.target.value })}
                  className="input-field"
                  placeholder="Enter video title"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={uploadForm.category}
                  onChange={(e) => setUploadForm({ ...uploadForm, category: e.target.value })}
                  className="input-field"
                >
                  <option value="face-yoga">Face Yoga</option>
                  <option value="massage">Massage</option>
                  <option value="exercise">Exercise</option>
                  <option value="tutorial">Tutorial</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={uploadForm.description}
                  onChange={(e) => setUploadForm({ ...uploadForm, description: e.target.value })}
                  className="input-field"
                  rows={3}
                  placeholder="Enter video description"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="premium_required"
                  checked={uploadForm.premium_required}
                  onChange={(e) => setUploadForm({ ...uploadForm, premium_required: e.target.checked })}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label htmlFor="premium_required" className="ml-2 block text-sm text-gray-900">
                  Require premium subscription
                </label>
              </div>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  disabled={uploading}
                  className="btn-primary"
                >
                  {uploading ? 'Uploading...' : 'Upload Video'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowUploadForm(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Videos List */}
        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">All Videos</h2>
            <div className="text-sm text-gray-600">
              Total: {videos.length} videos
            </div>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading videos...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video) => (
                <div key={video._id} className="border border-gray-200 rounded-lg overflow-hidden">
                  {/* Video Thumbnail */}
                  <div className="aspect-video bg-gray-100 flex items-center justify-center">
                    {video.thumbnail_url ? (
                      <img 
                        src={video.thumbnail_url} 
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-4xl text-gray-400">🎥</div>
                    )}
                  </div>

                  {/* Video Info */}
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900 line-clamp-2">
                        {video.title}
                      </h3>
                      {video.premium_required && (
                        <span className="bg-secondary text-white px-2 py-1 rounded text-xs font-medium ml-2">
                          Premium
                        </span>
                      )}
                    </div>

                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {video.description || 'No description'}
                    </p>

                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span className="capitalize">{video.category.replace('-', ' ')}</span>
                      <span>{formatDate(video.createdAt)}</span>
                    </div>

                    {video.duration_seconds > 0 && (
                      <div className="mt-2 text-xs text-gray-500">
                        Duration: {formatDuration(video.duration_seconds)}
                      </div>
                    )}

                    <div className="mt-3 flex space-x-2">
                      <a
                        href={video.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs bg-primary text-white px-3 py-1 rounded hover:bg-primary/90"
                      >
                        View
                      </a>
                      <button className="text-xs bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {videos.length === 0 && !loading && (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">🎥</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No videos uploaded yet
              </h3>
              <p className="text-gray-600 mb-4">
                Upload your first face yoga or massage video to get started.
              </p>
              <button
                onClick={() => setShowUploadForm(true)}
                className="btn-primary"
              >
                Upload First Video
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}