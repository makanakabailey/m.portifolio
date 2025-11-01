// Mock database for development when MongoDB is not available
interface MockPost {
  _id: string;
  title: string;
  content: string;
  excerpt: string;
  date: string;
  tags: string[];
  published: boolean;
}

interface MockCase {
  _id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  image: string;
  tags: string[];
  published: boolean;
  date: string;
}

interface MockContact {
  _id: string;
  name: string;
  email: string;
  message: string;
  date: string;
  status: 'new' | 'read' | 'replied';
}

// In-memory storage
let mockPosts: MockPost[] = [
  {
    _id: '1',
    title: 'Welcome to My Portfolio',
    content: 'This is a sample blog post to demonstrate the functionality.',
    excerpt: 'A sample blog post for testing.',
    date: new Date().toISOString(),
    tags: ['welcome', 'portfolio'],
    published: true
  }
];

let mockCases: MockCase[] = [
  {
    _id: '1',
    slug: 'sample-project',
    title: 'Sample Project',
    description: 'A demonstration project showcasing modern web development.',
    content: 'This is a detailed description of the sample project...',
    image: '/placeholder-project.jpg',
    tags: ['web', 'react', 'nextjs'],
    published: true,
    date: new Date().toISOString()
  }
];

let mockContacts: MockContact[] = [];

export const mockDb = {
  posts: {
    find: () => mockPosts.filter(p => p.published),
    findById: (id: string) => mockPosts.find(p => p._id === id),
    create: (post: Omit<MockPost, '_id'>) => {
      const newPost = { ...post, _id: Date.now().toString() };
      mockPosts.push(newPost);
      return newPost;
    },
    update: (id: string, updates: Partial<MockPost>) => {
      const index = mockPosts.findIndex(p => p._id === id);
      if (index !== -1) {
        mockPosts[index] = { ...mockPosts[index], ...updates };
        return mockPosts[index];
      }
      return null;
    },
    delete: (id: string) => {
      const index = mockPosts.findIndex(p => p._id === id);
      if (index !== -1) {
        return mockPosts.splice(index, 1)[0];
      }
      return null;
    }
  },
  cases: {
    find: () => mockCases.filter(c => c.published),
    findBySlug: (slug: string) => mockCases.find(c => c.slug === slug && c.published),
    create: (caseItem: Omit<MockCase, '_id'>) => {
      const newCase = { ...caseItem, _id: Date.now().toString() };
      mockCases.push(newCase);
      return newCase;
    },
    update: (id: string, updates: Partial<MockCase>) => {
      const index = mockCases.findIndex(c => c._id === id);
      if (index !== -1) {
        mockCases[index] = { ...mockCases[index], ...updates };
        return mockCases[index];
      }
      return null;
    },
    delete: (id: string) => {
      const index = mockCases.findIndex(c => c._id === id);
      if (index !== -1) {
        return mockCases.splice(index, 1)[0];
      }
      return null;
    }
  },
  contacts: {
    find: () => mockContacts,
    create: (contact: Omit<MockContact, '_id'>) => {
      const newContact = { 
        ...contact, 
        _id: Date.now().toString(),
        status: 'new' as const,
        date: new Date().toISOString()
      };
      mockContacts.push(newContact);
      return newContact;
    },
    update: (id: string, updates: Partial<MockContact>) => {
      const index = mockContacts.findIndex(c => c._id === id);
      if (index !== -1) {
        mockContacts[index] = { ...mockContacts[index], ...updates };
        return mockContacts[index];
      }
      return null;
    },
    delete: (id: string) => {
      const index = mockContacts.findIndex(c => c._id === id);
      if (index !== -1) {
        return mockContacts.splice(index, 1)[0];
      }
      return null;
    }
  }
};