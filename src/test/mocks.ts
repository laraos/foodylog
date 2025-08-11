/**
 * Mock Implementations for FoodyLog Testing
 * 
 * Centralized mock implementations for external dependencies including
 * Convex, Clerk, Capacitor plugins, and browser APIs. These mocks provide
 * realistic behavior for testing without external dependencies.
 */

import { vi } from 'vitest';
import React from 'react';

/**
 * Convex Client Mocks
 * 
 * Mocks for Convex database operations, queries, and mutations.
 * Provides realistic behavior for testing data operations.
 */
export const mockConvexClient = {
  query: vi.fn(),
  mutation: vi.fn(),
  action: vi.fn(),
  subscribe: vi.fn(),
  close: vi.fn(),
};

/**
 * Mock Convex React hooks
 */
export const mockUseQuery = vi.fn();
export const mockUseMutation = vi.fn();
export const mockUseAction = vi.fn();

/**
 * Clerk Authentication Mocks
 * 
 * Comprehensive mocks for Clerk authentication including user management,
 * session handling, and authentication state.
 */
export const mockClerkUser = {
  id: 'user_test123',
  firstName: 'Test',
  lastName: 'User',
  fullName: 'Test User',
  emailAddresses: [
    {
      id: 'email_test123',
      emailAddress: 'test@example.com',
      verification: { status: 'verified' },
    },
  ],
  primaryEmailAddress: {
    id: 'email_test123',
    emailAddress: 'test@example.com',
    verification: { status: 'verified' },
  },
  imageUrl: 'https://example.com/avatar.jpg',
  hasImage: true,
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-01'),
  lastSignInAt: new Date('2024-01-01'),
  publicMetadata: {},
  privateMetadata: {},
  unsafeMetadata: {},
  update: vi.fn(),
  reload: vi.fn(),
  delete: vi.fn(),
};

export const mockClerkSession = {
  id: 'session_test123',
  status: 'active',
  lastActiveAt: new Date(),
  expireAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
  abandon: vi.fn(),
  end: vi.fn(),
  remove: vi.fn(),
  reload: vi.fn(),
  getToken: vi.fn().mockResolvedValue('mock_jwt_token'),
};

/**
 * Mock Clerk hooks
 */
export const mockUseAuth = vi.fn(() => ({
  isSignedIn: true,
  isLoaded: true,
  userId: 'user_test123',
  sessionId: 'session_test123',
  actor: null,
  orgId: null,
  orgRole: null,
  orgSlug: null,
  has: vi.fn(),
  signOut: vi.fn(),
  getToken: vi.fn().mockResolvedValue('mock_jwt_token'),
}));

export const mockUseUser = vi.fn(() => ({
  isSignedIn: true,
  isLoaded: true,
  user: mockClerkUser,
}));

export const mockUseSession = vi.fn(() => ({
  isLoaded: true,
  session: mockClerkSession,
}));

export const mockUseClerk = vi.fn(() => ({
  loaded: true,
  user: mockClerkUser,
  session: mockClerkSession,
  client: {
    signIn: {
      create: vi.fn(),
      prepareFirstFactor: vi.fn(),
      attemptFirstFactor: vi.fn(),
    },
    signUp: {
      create: vi.fn(),
      prepareEmailAddressVerification: vi.fn(),
      attemptEmailAddressVerification: vi.fn(),
    },
  },
  openSignIn: vi.fn(),
  openSignUp: vi.fn(),
  openUserProfile: vi.fn(),
  signOut: vi.fn(),
}));

/**
 * Capacitor Plugin Mocks
 * 
 * Mocks for Capacitor native plugins used in FoodyLog including
 * Camera, Preferences, Filesystem, and Network status.
 */
export const mockCapacitorCamera = {
  getPhoto: vi.fn().mockResolvedValue({
    webPath: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwA/8A8A',
    format: 'jpeg',
    saved: false,
  }),
  requestPermissions: vi.fn().mockResolvedValue({
    camera: 'granted',
    photos: 'granted',
  }),
  checkPermissions: vi.fn().mockResolvedValue({
    camera: 'granted',
    photos: 'granted',
  }),
};

export const mockCapacitorPreferences = {
  get: vi.fn().mockImplementation(({ key }) => {
    const mockData: Record<string, any> = {
      'foodylog-ui-theme': { value: 'light' },
      'foodylog_offline_actions': { value: '[]' },
      'foodylog_user_preferences': { value: '{}' },
    };
    return Promise.resolve(mockData[key] || { value: null });
  }),
  set: vi.fn().mockResolvedValue(undefined),
  remove: vi.fn().mockResolvedValue(undefined),
  clear: vi.fn().mockResolvedValue(undefined),
  keys: vi.fn().mockResolvedValue({ keys: [] }),
  migrate: vi.fn().mockResolvedValue(undefined),
  removeOld: vi.fn().mockResolvedValue(undefined),
};

export const mockCapacitorFilesystem = {
  readFile: vi.fn().mockResolvedValue({
    data: 'base64_file_data',
  }),
  writeFile: vi.fn().mockResolvedValue({
    uri: 'file://path/to/file.jpg',
  }),
  deleteFile: vi.fn().mockResolvedValue(undefined),
  mkdir: vi.fn().mockResolvedValue(undefined),
  rmdir: vi.fn().mockResolvedValue(undefined),
  readdir: vi.fn().mockResolvedValue({
    files: [],
  }),
  getUri: vi.fn().mockResolvedValue({
    uri: 'file://path/to/file.jpg',
  }),
  stat: vi.fn().mockResolvedValue({
    type: 'file',
    size: 1024,
    ctime: Date.now(),
    mtime: Date.now(),
    uri: 'file://path/to/file.jpg',
  }),
  rename: vi.fn().mockResolvedValue(undefined),
  copy: vi.fn().mockResolvedValue({
    uri: 'file://path/to/copy.jpg',
  }),
  checkPermissions: vi.fn().mockResolvedValue({
    publicStorage: 'granted',
  }),
  requestPermissions: vi.fn().mockResolvedValue({
    publicStorage: 'granted',
  }),
};

export const mockCapacitorNetwork = {
  getStatus: vi.fn().mockResolvedValue({
    connected: true,
    connectionType: 'wifi',
  }),
  addListener: vi.fn().mockImplementation((_event, _callback) => {
    // Return a mock listener that can be removed
    return {
      remove: vi.fn(),
    };
  }),
};

/**
 * Browser API Mocks
 * 
 * Mocks for browser APIs that aren't available in the test environment
 * or need controlled behavior for testing.
 */
export const mockGeolocation = {
  getCurrentPosition: vi.fn().mockImplementation((success) => {
    success({
      coords: {
        latitude: 37.7749,
        longitude: -122.4194,
        accuracy: 10,
        altitude: null,
        altitudeAccuracy: null,
        heading: null,
        speed: null,
      },
      timestamp: Date.now(),
    });
  }),
  watchPosition: vi.fn().mockReturnValue(1),
  clearWatch: vi.fn(),
};

export const mockNotification = {
  requestPermission: vi.fn().mockResolvedValue('granted'),
  permission: 'granted',
};

/**
 * File API Mocks
 */
export const createMockFile = (
  name: string = 'test.jpg',
  type: string = 'image/jpeg',
  size: number = 1024,
  content: string = 'test file content',
) => {
  const file = new File([content], name, { type });
  
  // Mock file properties that might not be available in test environment
  Object.defineProperty(file, 'size', {
    value: size,
    writable: false,
  });
  
  return file;
};

export const createMockFileReader = () => ({
  // eslint-disable-next-line no-unused-vars
  readAsDataURL: vi.fn().mockImplementation(function(this: any, _file: File) {
    // Simulate async file reading
    setTimeout(() => {
      this.result = `data:${_file.type};base64,dGVzdCBmaWxlIGNvbnRlbnQ=`;
      this.onload?.({ target: this });
    }, 0);
  }),
  // eslint-disable-next-line no-unused-vars
  readAsText: vi.fn().mockImplementation(function(this: any, _file: File) {
    // Simulate async file reading
    setTimeout(() => {
      this.result = 'test file content';
      this.onload?.({ target: this });
    }, 0);
  }),
  abort: vi.fn(),
  result: null,
  error: null,
  readyState: 0,
  onload: null,
  onerror: null,
  onabort: null,
  onloadstart: null,
  onloadend: null,
  onprogress: null,
});

export const mockFileReader = createMockFileReader();

/**
 * URL API Mocks
 */
export const mockURL = {
  createObjectURL: vi.fn().mockReturnValue('blob:http://localhost:3000/mock-object-url'),
  revokeObjectURL: vi.fn(),
};

/**
 * Setup function to apply all mocks
 * 
 * Call this in test setup to apply all necessary mocks for FoodyLog testing.
 */
export function setupMocks() {
  // Mock Convex
  vi.mock('convex/react', () => ({
    useQuery: mockUseQuery,
    useMutation: mockUseMutation,
    useAction: mockUseAction,
    ConvexProvider: ({ children }: { children: React.ReactNode }) => children,
  }));

  // Mock Clerk
  vi.mock('@clerk/clerk-react', () => ({
    useAuth: mockUseAuth,
    useUser: mockUseUser,
    useSession: mockUseSession,
    useClerk: mockUseClerk,
    ClerkProvider: ({ children }: { children: React.ReactNode }) => children,
    SignIn: () => 'SignIn Component',
    SignUp: () => 'SignUp Component',
    UserButton: () => 'UserButton Component',
    SignedIn: ({ children }: { children: React.ReactNode }) => children,
    SignedOut: () => null,
  }));

  // Mock Capacitor
  vi.mock('@capacitor/camera', () => ({
    Camera: mockCapacitorCamera,
  }));

  vi.mock('@capacitor/preferences', () => ({
    Preferences: mockCapacitorPreferences,
  }));

  vi.mock('@capacitor/filesystem', () => ({
    Filesystem: mockCapacitorFilesystem,
  }));

  vi.mock('@capacitor/network', () => ({
    Network: mockCapacitorNetwork,
  }));

  // Mock browser APIs
  Object.defineProperty(navigator, 'geolocation', {
    value: mockGeolocation,
    writable: true,
  });

  Object.defineProperty(window, 'Notification', {
    value: mockNotification,
    writable: true,
  });

  Object.defineProperty(global, 'FileReader', {
    value: vi.fn().mockImplementation(() => mockFileReader),
    writable: true,
  });

  // Mock URL constructor properly
  Object.defineProperty(global, 'URL', {
    value: class MockURL {
      constructor(url: string, _base?: string) {
        // Simple URL validation
        if (!url || typeof url !== 'string') {
          throw new TypeError('Invalid URL');
        }
        
        // More accurate URL validation
        if (url === 'http://' || url === '://example.com' || url === '') {
          throw new TypeError('Invalid URL');
        }
        
        // Check for protocol
        if (!url.includes(':')) {
          throw new TypeError('Invalid URL');
        }
        
        // Basic URL pattern check
        const urlPattern = /^[a-zA-Z][a-zA-Z\d+\-.]*:.+/;
        if (!urlPattern.test(url)) {
          throw new TypeError('Invalid URL');
        }
        
        this.href = url;
        this.protocol = url.split(':')[0] + ':';
      }
      href: string = '';
      protocol: string = '';
      static createObjectURL = mockURL.createObjectURL;
      static revokeObjectURL = mockURL.revokeObjectURL;
    },
    writable: true,
  });
}

/**
 * Reset all mocks to their initial state
 * 
 * Call this in test cleanup to ensure clean state between tests.
 */
export function resetMocks() {
  vi.clearAllMocks();
  
  // Reset mock implementations to defaults
  mockUseAuth.mockReturnValue({
    isSignedIn: true,
    isLoaded: true,
    userId: 'user_test123',
    sessionId: 'session_test123',
    actor: null,
    orgId: null,
    orgRole: null,
    orgSlug: null,
    has: vi.fn(),
    signOut: vi.fn(),
    getToken: vi.fn().mockResolvedValue('mock_jwt_token'),
  });

  mockUseUser.mockReturnValue({
    isSignedIn: true,
    isLoaded: true,
    user: mockClerkUser,
  });

  mockCapacitorPreferences.get.mockImplementation(({ key }) => {
    const mockData: Record<string, any> = {
      'foodylog-ui-theme': { value: 'light' },
      'foodylog_offline_actions': { value: '[]' },
      'foodylog_user_preferences': { value: '{}' },
    };
    return Promise.resolve(mockData[key] || { value: null });
  });
}