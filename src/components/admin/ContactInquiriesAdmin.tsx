'use client';

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, Eye, Mail, Phone } from "lucide-react";

interface ContactInquiry {
  _id: string;
  name: string;
  email: string;
  phone: string;
  service?: string;
  message?: string;
  status: 'new' | 'contacted' | 'converted' | 'closed';
  source: string;
  referrer?: string;
  createdAt: string;
  updatedAt: string;
  contactedAt?: string;
  notes?: string;
}

export const ContactInquiriesAdmin = () => {
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    loadInquiries();
  }, [statusFilter]);

  const loadInquiries = async () => {
    setIsLoading(true);
    try {
      const adminPin = localStorage.getItem('adminPin') || '7653';
      const response = await fetch(`/api/contact?status=${statusFilter}`, {
        headers: {
          'X-Admin-Pin': adminPin,
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setInquiries(data.inquiries || []);
          if (data.inquiries.length === 0) {
            showMessage('success', 'Database connected! No inquiries yet. Submit a contact form to test.');
          }
        } else {
          throw new Error(data.error || 'Failed to load inquiries');
        }
      } else if (response.status === 401) {
        showMessage('error', 'Authentication failed. Please check admin PIN.');
        setInquiries([]);
      } else {
        throw new Error(`HTTP ${response.status}: Failed to load inquiries`);
      }
    } catch (error: any) {
      console.error('Failed to load inquiries:', error);
      if (error.message.includes('fetch')) {
        showMessage('error', 'Database connection issue. Make sure MongoDB is initialized.');
      } else {
        showMessage('error', `Error: ${error.message}`);
      }
      setInquiries([]);
    } finally {
      setIsLoading(false);
    }
  };

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 5000);
  };

  const updateInquiryStatus = async (id: string, status: string, notes?: string) => {
    try {
      const adminPin = localStorage.getItem('adminPin') || '7653';
      const response = await fetch(`/api/contact/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'X-Admin-Pin': adminPin,
        },
        body: JSON.stringify({ status, notes }),
      });

      if (!response.ok) throw new Error('Failed to update inquiry');

      showMessage('success', 'Inquiry updated successfully');
      loadInquiries();
    } catch (error: any) {
      showMessage('error', error.message);
    }
  };

  const deleteInquiry = async (id: string) => {
    if (!confirm('Are you sure you want to delete this inquiry?')) return;

    try {
      const adminPin = localStorage.getItem('adminPin') || '7653';
      const response = await fetch(`/api/contact/${id}`, {
        method: 'DELETE',
        headers: {
          'X-Admin-Pin': adminPin,
        },
      });

      if (!response.ok) throw new Error('Failed to delete inquiry');

      showMessage('success', 'Inquiry deleted successfully');
      loadInquiries();
    } catch (error: any) {
      showMessage('error', error.message);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      new: 'bg-blue-100 text-blue-800',
      contacted: 'bg-yellow-100 text-yellow-800',
      converted: 'bg-green-100 text-green-800',
      closed: 'bg-gray-100 text-gray-800',
    };
    return variants[status as keyof typeof variants] || variants.new;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Contact Inquiries</h2>
        <div className="flex gap-4">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-input bg-background rounded-md text-sm"
          >
            <option value="all">All Inquiries</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="converted">Converted</option>
            <option value="closed">Closed</option>
          </select>
          <Button onClick={loadInquiries} variant="outline">
            Refresh
          </Button>
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

      {/* Database Connection Status */}
      <div className="bg-muted p-6 card-rounded">
        <h3 className="font-bold mb-2">📊 Database Status</h3>
        <div className="space-y-2 text-sm">
          <p>✅ API Route: /api/contact (POST) - Ready</p>
          <p>⏳ MongoDB Connection: Initialize database first</p>
          <p>📧 Email Integration: Resend API configured</p>
        </div>
        <div className="mt-4">
          <p className="text-muted-foreground text-sm">
            Contact inquiries will appear here once the database is initialized and contact forms are submitted.
          </p>
        </div>
      </div>

      {/* Inquiries List */}
      {isLoading ? (
        <p className="text-muted-foreground">Loading inquiries...</p>
      ) : inquiries.length === 0 ? (
        <div className="text-center py-12">
          <Mail className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">No Inquiries Yet</h3>
          <p className="text-muted-foreground mb-4">
            Contact inquiries will appear here once:
          </p>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>1. Database is initialized (click "Initialize DB" on homepage)</li>
            <li>2. Contact forms are submitted via /estimate page</li>
            <li>3. MongoDB Atlas connection is working</li>
          </ul>
        </div>
      ) : (
        <div className="space-y-4">
          {inquiries.map((inquiry) => (
            <div key={inquiry._id} className="bg-background border border-border p-6 card-rounded">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold">{inquiry.name}</h3>
                    <Badge className={getStatusBadge(inquiry.status)}>
                      {inquiry.status}
                    </Badge>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4" />
                      <a href={`mailto:${inquiry.email}`} className="text-blue-600 hover:underline">
                        {inquiry.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4" />
                      <a href={`tel:${inquiry.phone}`} className="text-blue-600 hover:underline">
                        {inquiry.phone}
                      </a>
                    </div>
                  </div>

                  {inquiry.service && (
                    <p className="text-sm text-muted-foreground mb-2">
                      <strong>Service:</strong> {inquiry.service}
                    </p>
                  )}

                  {inquiry.message && (
                    <p className="text-sm text-muted-foreground mb-4">
                      <strong>Message:</strong> {inquiry.message}
                    </p>
                  )}

                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>Received: {formatDate(inquiry.createdAt)}</span>
                    <span>Source: {inquiry.source}</span>
                    {inquiry.referrer && inquiry.referrer !== 'direct' && (
                      <span>From: {new URL(inquiry.referrer).hostname}</span>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => deleteInquiry(inquiry._id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};