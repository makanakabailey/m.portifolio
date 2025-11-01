'use client';

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Trash2, Upload, Plus } from "lucide-react";

interface DailyPost {
  _id?: string;
  title: string;
  description: string;
  mediaUrl?: string;
  mediaType?: "image" | "video" | "gif";
  fileSize?: number;
  order: number;
  createdAt?: string;
  updatedAt?: string;
  isActive: boolean;
}

export const DailyPostsAdmin = () => {
  const [posts, setPosts] = useState<DailyPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newPost, setNewPost] = useState<Partial<DailyPost>>({
    title: "",
    description: "",
    mediaUrl: "",
    mediaType: "image",
    isActive: true
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/posts');
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      } else {
        // Fallback to localStorage for development
        const stored = localStorage.getItem('dailyPosts');
        if (stored) {
          setPosts(JSON.parse(stored));
        }
      }
    } catch (error) {
      console.error('Failed to load posts:', error);
      showMessage('error', 'Failed to load posts. Using local storage.');
      
      // Fallback to localStorage
      const stored = localStorage.getItem('dailyPosts');
      if (stored) {
        setPosts(JSON.parse(stored));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 5000);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        showMessage('error', 'File size must be less than 5MB');
        return;
      }

      // Validate file type
      const allowedTypes = ['image/', 'video/', 'image/gif'];
      if (!allowedTypes.some(type => file.type.startsWith(type))) {
        showMessage('error', 'Only images, videos, and GIFs are allowed');
        return;
      }

      setSelectedFile(file);
      setNewPost(prev => ({
        ...prev,
        mediaType: file.type.startsWith('video/') ? 'video' : 
                  file.type === 'image/gif' ? 'gif' : 'image'
      }));
    }
  };

  const uploadFile = async (): Promise<string | null> => {
    if (!selectedFile) return null;

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const adminPin = localStorage.getItem('adminPin') || '7653';
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'X-Admin-Pin': adminPin,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const result = await response.json();
      return result.url;
    } catch (error) {
      console.error('Upload error:', error);
      // For development, create a placeholder URL
      const placeholderUrl = URL.createObjectURL(selectedFile);
      return placeholderUrl;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newPost.title || !newPost.description) {
      showMessage('error', 'Title and description are required');
      return;
    }

    if (posts.length >= 4) {
      showMessage('error', 'Maximum 4 posts allowed');
      return;
    }

    setIsSubmitting(true);
    setUploadProgress(0);

    try {
      let mediaUrl = newPost.mediaUrl;
      
      // Upload file if selected
      if (selectedFile) {
        setUploadProgress(50);
        const uploadedUrl = await uploadFile();
        if (uploadedUrl) {
          mediaUrl = uploadedUrl;
        }
        setUploadProgress(75);
      }

      const postData = {
        ...newPost,
        mediaUrl,
        order: posts.length,
        fileSize: selectedFile?.size || 0,
      };

      // Try API first
      try {
        const adminPin = localStorage.getItem('adminPin') || '7653';
        const response = await fetch('/api/posts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Admin-Pin': adminPin,
          },
          body: JSON.stringify(postData),
        });

        if (response.ok) {
          const result = await response.json();
          setPosts(prev => [...prev, result]);
          showMessage('success', 'Post created successfully!');
        } else {
          throw new Error('API failed');
        }
      } catch (apiError) {
        // Fallback to localStorage
        const newPostWithId: DailyPost = {
          _id: Date.now().toString(),
          title: newPost.title || '',
          description: newPost.description || '',
          mediaUrl: mediaUrl,
          mediaType: newPost.mediaType,
          fileSize: selectedFile?.size || 0,
          order: posts.length,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          isActive: true
        };
        
        const updatedPosts = [...posts, newPostWithId];
        setPosts(updatedPosts);
        localStorage.setItem('dailyPosts', JSON.stringify(updatedPosts));
        showMessage('success', 'Post saved locally (database not connected)');
      }

      // Reset form
      setNewPost({
        title: "",
        description: "",
        mediaUrl: "",
        mediaType: "image",
        isActive: true
      });
      setSelectedFile(null);
      setUploadProgress(100);
      
    } catch (error) {
      console.error('Submit error:', error);
      showMessage('error', 'Failed to create post');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setUploadProgress(0), 1000);
    }
  };

  const deletePost = async (postId: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      // Try API first
      const adminPin = localStorage.getItem('adminPin') || '7653';
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
        headers: {
          'X-Admin-Pin': adminPin,
        },
      });

      if (response.ok) {
        setPosts(prev => prev.filter(p => p._id !== postId));
        showMessage('success', 'Post deleted successfully!');
      } else {
        throw new Error('API failed');
      }
    } catch (error) {
      // Fallback to localStorage
      const updatedPosts = posts.filter(p => p._id !== postId);
      setPosts(updatedPosts);
      localStorage.setItem('dailyPosts', JSON.stringify(updatedPosts));
      showMessage('success', 'Post deleted locally');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Daily Posts Management</h2>
        <div className="text-sm text-muted-foreground">
          {posts.length}/4 posts
        </div>
      </div>

      {/* Status Message */}
      {message && (
        <div className={`p-4 rounded-lg ${
          message.type === 'success' 
            ? 'bg-green-50 border border-green-200 text-green-800' 
            : 'bg-red-50 border border-red-200 text-red-800'
        }`}>
          {message.text}
        </div>
      )}

      {/* Add New Post Form */}
      <div className="bg-muted p-6 card-rounded">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Add New Post
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={newPost.title || ''}
              onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Enter post title (max 100 characters)"
              maxLength={100}
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={newPost.description || ''}
              onChange={(e) => setNewPost(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Enter post description (max 500 characters)"
              maxLength={500}
              rows={3}
              required
            />
          </div>

          <div>
            <Label htmlFor="media">Media File (Optional)</Label>
            <div className="flex items-center gap-4">
              <input
                id="media"
                type="file"
                accept="image/*,video/*,.gif"
                onChange={handleFileSelect}
                className="flex-1 text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
              />
              {selectedFile && (
                <span className="text-sm text-muted-foreground">
                  {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)}MB)
                </span>
              )}
            </div>
          </div>

          {uploadProgress > 0 && (
            <div className="w-full bg-secondary rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          )}

          <Button 
            type="submit" 
            disabled={isSubmitting || posts.length >= 4}
            className="w-full"
          >
            {isSubmitting ? 'Creating Post...' : 'Create Post'}
          </Button>
        </form>
      </div>

      {/* Existing Posts */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Current Posts</h3>
        
        {isLoading ? (
          <p className="text-muted-foreground">Loading posts...</p>
        ) : posts.length === 0 ? (
          <p className="text-muted-foreground">No posts yet. Create your first post above!</p>
        ) : (
          <div className="grid gap-4">
            {posts.map((post, index) => (
              <div key={post._id || index} className="bg-background border border-border p-4 card-rounded">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-semibold mb-2">{post.title}</h4>
                    <p className="text-sm text-muted-foreground mb-3">{post.description}</p>
                    
                    {post.mediaUrl && (
                      <div className="mb-3">
                        {post.mediaType === 'video' ? (
                          <video 
                            src={post.mediaUrl} 
                            className="w-32 h-24 object-cover rounded"
                            controls
                          />
                        ) : (
                          <img 
                            src={post.mediaUrl} 
                            alt={post.title}
                            className="w-32 h-24 object-cover rounded"
                          />
                        )}
                      </div>
                    )}
                    
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>Order: {post.order}</span>
                      {post.mediaType && <span>Type: {post.mediaType}</span>}
                      {post.createdAt && (
                        <span>Created: {new Date(post.createdAt).toLocaleDateString()}</span>
                      )}
                    </div>
                  </div>
                  
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => deletePost(post._id!)}
                    className="ml-4"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};