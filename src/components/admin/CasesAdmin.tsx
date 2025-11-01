'use client';

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Trash2, Edit, Plus, Save, X } from "lucide-react";

interface CaseStudy {
  _id?: string;
  title: string;
  slug: string;
  tags: string[];
  description: string;
  thumbnailUrl: string;
  detailImages: string[];
  industry: string;
  projectType: string;
  companyType: string;
  services: string[];
  order: number;
  isPublished: boolean;
  createdAt?: string;
  updatedAt?: string;
}

const defaultCases: CaseStudy[] = [
  {
    _id: "1",
    title: "Authority Builder - Business Consultant Portfolio",
    slug: "authority-builder",
    tags: ["Copywriting", "Lead Generation", "Trust Building"],
    description: "A comprehensive business consultant portfolio designed to establish authority and generate high-quality leads.",
    thumbnailUrl: "/assets/case-authority-builder.jpg",
    detailImages: [
      "/assets/detail-authority-1.jpg",
      "/assets/detail-authority-2.jpg",
      "/assets/detail-authority-3.jpg",
      "/assets/detail-authority-4.jpg",
      "/assets/detail-authority-5.jpg",
      "/assets/detail-authority-6.jpg"
    ],
    industry: "Business Consulting",
    projectType: "Portfolio Website",
    companyType: "Consultant",
    services: ["Web Design", "Copywriting", "SEO"],
    order: 1,
    isPublished: true,
  },
  {
    _id: "2",
    title: "Architect Portfolio - Visual Storytelling",
    slug: "architect-portfolio",
    tags: ["Visual Design", "UX", "Architecture"],
    description: "A stunning visual portfolio showcasing architectural projects with immersive storytelling.",
    thumbnailUrl: "/assets/case-architect-portfolio.jpg",
    detailImages: [
      "/assets/detail-architect-1.jpg",
      "/assets/detail-architect-2.jpg",
      "/assets/detail-architect-3.jpg",
      "/assets/detail-architect-4.jpg",
      "/assets/detail-architect-5.jpg",
      "/assets/detail-architect-6.jpg"
    ],
    industry: "Architecture",
    projectType: "Portfolio Website",
    companyType: "Architecture Firm",
    services: ["Web Design", "Visual Design", "UX"],
    order: 2,
    isPublished: true,
  },
  {
    _id: "3",
    title: "Marketing Agency - Results Machine",
    slug: "marketing-agency",
    tags: ["ROI", "Analytics", "B2B"],
    description: "A data-driven marketing agency website focused on demonstrating ROI and client results.",
    thumbnailUrl: "/assets/case-marketing-agency.jpg",
    detailImages: [
      "/assets/detail-marketing-1.jpg",
      "/assets/detail-marketing-2.jpg",
      "/assets/detail-marketing-3.jpg",
      "/assets/detail-marketing-4.jpg",
      "/assets/detail-marketing-5.jpg",
      "/assets/detail-marketing-6.jpg"
    ],
    industry: "Marketing",
    projectType: "Agency Website",
    companyType: "Marketing Agency",
    services: ["Web Development", "Analytics", "Dashboard"],
    order: 3,
    isPublished: true,
  },
];

export const CasesAdmin = () => {
  const [cases, setCases] = useState<CaseStudy[]>(defaultCases);
  const [isLoading, setIsLoading] = useState(false);
  const [editingCase, setEditingCase] = useState<CaseStudy | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    loadCases();
  }, []);

  const loadCases = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/cases');
      if (response.ok) {
        const data = await response.json();
        if (data.length > 0) {
          setCases(data);
        }
      }
    } catch (error) {
      console.error('Failed to load cases:', error);
      showMessage('error', 'Using default cases (database not connected)');
    } finally {
      setIsLoading(false);
    }
  };

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 5000);
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleEdit = (caseStudy: CaseStudy) => {
    setEditingCase({ ...caseStudy });
  };

  const handleSave = async () => {
    if (!editingCase) return;

    if (!editingCase.title || !editingCase.description) {
      showMessage('error', 'Title and description are required');
      return;
    }

    setIsSubmitting(true);

    try {
      const updatedCase = {
        ...editingCase,
        slug: generateSlug(editingCase.title),
        updatedAt: new Date().toISOString(),
      };

      // Try API first
      try {
        const adminPin = localStorage.getItem('adminPin') || '7653';
        const isNew = !editingCase._id || editingCase._id.startsWith('new-');
        
        const response = await fetch(
          isNew ? '/api/cases' : `/api/cases/${editingCase.slug}`,
          {
            method: isNew ? 'POST' : 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'X-Admin-Pin': adminPin,
            },
            body: JSON.stringify(updatedCase),
          }
        );

        if (response.ok) {
          const result = await response.json();
          if (isNew) {
            setCases(prev => [...prev, result]);
          } else {
            setCases(prev => prev.map(c => c._id === editingCase._id ? updatedCase : c));
          }
          showMessage('success', `Case ${isNew ? 'created' : 'updated'} successfully!`);
        } else {
          throw new Error('API failed');
        }
      } catch (apiError) {
        // Fallback to local state
        const isNew = !editingCase._id || editingCase._id.startsWith('new-');
        if (isNew) {
          const newCase = { ...updatedCase, _id: Date.now().toString() };
          setCases(prev => [...prev, newCase]);
        } else {
          setCases(prev => prev.map(c => c._id === editingCase._id ? updatedCase : c));
        }
        showMessage('success', `Case ${isNew ? 'created' : 'updated'} locally`);
      }

      setEditingCase(null);
    } catch (error) {
      console.error('Save error:', error);
      showMessage('error', 'Failed to save case');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (caseStudy: CaseStudy) => {
    if (!confirm(`Are you sure you want to delete "${caseStudy.title}"?`)) return;

    try {
      // Try API first
      const adminPin = localStorage.getItem('adminPin') || '7653';
      const response = await fetch(`/api/cases/${caseStudy.slug}`, {
        method: 'DELETE',
        headers: {
          'X-Admin-Pin': adminPin,
        },
      });

      if (response.ok) {
        setCases(prev => prev.filter(c => c._id !== caseStudy._id));
        showMessage('success', 'Case deleted successfully!');
      } else {
        throw new Error('API failed');
      }
    } catch (error) {
      // Fallback to local state
      setCases(prev => prev.filter(c => c._id !== caseStudy._id));
      showMessage('success', 'Case deleted locally');
    }
  };

  const handleAddNew = () => {
    const newCase: CaseStudy = {
      _id: `new-${Date.now()}`,
      title: "",
      slug: "",
      tags: [],
      description: "",
      thumbnailUrl: "",
      detailImages: [],
      industry: "",
      projectType: "",
      companyType: "",
      services: [],
      order: cases.length + 1,
      isPublished: true,
    };
    setEditingCase(newCase);
  };

  const updateEditingCase = (field: keyof CaseStudy, value: any) => {
    if (!editingCase) return;
    setEditingCase(prev => prev ? { ...prev, [field]: value } : null);
  };

  const addTag = (tag: string) => {
    if (!editingCase || !tag.trim()) return;
    const newTags = [...editingCase.tags, tag.trim()];
    updateEditingCase('tags', newTags);
  };

  const removeTag = (index: number) => {
    if (!editingCase) return;
    const newTags = editingCase.tags.filter((_, i) => i !== index);
    updateEditingCase('tags', newTags);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Case Studies Management</h2>
        <Button onClick={handleAddNew} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add New Case
        </Button>
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

      {/* Edit Form Modal */}
      {editingCase && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-background p-6 card-rounded max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">
                {editingCase._id?.startsWith('new-') ? 'Add New Case' : 'Edit Case'}
              </h3>
              <Button variant="ghost" size="icon" onClick={() => setEditingCase(null)}>
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-title">Title *</Label>
                <Input
                  id="edit-title"
                  value={editingCase.title}
                  onChange={(e) => updateEditingCase('title', e.target.value)}
                  placeholder="Case study title"
                />
              </div>

              <div>
                <Label htmlFor="edit-description">Description *</Label>
                <Textarea
                  id="edit-description"
                  value={editingCase.description}
                  onChange={(e) => updateEditingCase('description', e.target.value)}
                  placeholder="Brief description of the case study"
                  rows={3}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-industry">Industry</Label>
                  <Input
                    id="edit-industry"
                    value={editingCase.industry}
                    onChange={(e) => updateEditingCase('industry', e.target.value)}
                    placeholder="e.g., Architecture, Marketing"
                  />
                </div>
                <div>
                  <Label htmlFor="edit-project-type">Project Type</Label>
                  <Input
                    id="edit-project-type"
                    value={editingCase.projectType}
                    onChange={(e) => updateEditingCase('projectType', e.target.value)}
                    placeholder="e.g., Portfolio Website, E-commerce"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="edit-thumbnail">Thumbnail URL</Label>
                <Input
                  id="edit-thumbnail"
                  value={editingCase.thumbnailUrl}
                  onChange={(e) => updateEditingCase('thumbnailUrl', e.target.value)}
                  placeholder="/assets/case-example.jpg"
                />
              </div>

              <div>
                <Label>Tags</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {editingCase.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-secondary text-secondary-foreground px-2 py-1 rounded text-sm flex items-center gap-1"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(index)}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add tag"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addTag((e.target as HTMLInputElement).value);
                        (e.target as HTMLInputElement).value = '';
                      }
                    }}
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button onClick={handleSave} disabled={isSubmitting} className="flex-1">
                  {isSubmitting ? 'Saving...' : 'Save Case'}
                </Button>
                <Button variant="outline" onClick={() => setEditingCase(null)} className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cases List */}
      <div className="space-y-4">
        {isLoading ? (
          <p className="text-muted-foreground">Loading cases...</p>
        ) : (
          <div className="grid gap-4">
            {cases.map((caseStudy) => (
              <div key={caseStudy._id} className="bg-background border border-border p-4 card-rounded">
                <div className="flex gap-4">
                  {caseStudy.thumbnailUrl && (
                    <img
                      src={caseStudy.thumbnailUrl}
                      alt={caseStudy.title}
                      className="w-24 h-18 object-cover rounded"
                    />
                  )}
                  
                  <div className="flex-1">
                    <h4 className="font-semibold mb-2">{caseStudy.title}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{caseStudy.description}</p>
                    
                    <div className="flex flex-wrap gap-1 mb-2">
                      {caseStudy.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>Industry: {caseStudy.industry}</span>
                      <span>Order: {caseStudy.order}</span>
                      <span>Status: {caseStudy.isPublished ? 'Published' : 'Draft'}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleEdit(caseStudy)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleDelete(caseStudy)}
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
    </div>
  );
};