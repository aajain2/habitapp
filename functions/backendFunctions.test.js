// This file sets up testing environment for Firebase functions. It includes the initialization of Firebase Admin,
// mocks of Firestore methods, and setup for various Firebase service mocks to enable thorough testing of functions.

// Import testing utilities and Jest for mocking
const { expect, jest } = require('@jest/globals');
require('./testSetup'); // Ensures Firebase is initialized before running tests

// Mock Firestore methods to simulate database interactions
const mockCollection = jest.fn();
const mockDoc = jest.fn();
const mockSet = jest.fn();
const mockUpdate = jest.fn();
const mockGet = jest.fn();
const mockAdd = jest.fn().mockResolvedValue({ id: 'testPostId' }); // Mocks the add method with a preset resolved value
const mockDelete = jest.fn();
const mockWhere = jest.fn();
// Mock forEach to simulate iterating over query results
const mockForEach = jest.fn(callback => { callback({ id: '123', data: () => ({ flags: 1 }) }); });

// Mock Firebase Admin to override Firestore with custom mock functions
jest.mock('firebase-admin', () => {
  const actualAdmin = jest.requireActual('firebase-admin'); // Retain other Firebase Admin functionalities
  return {
    ...actualAdmin,
    firestore: jest.fn(() => ({
      collection: mockCollection.mockReturnThis(), // Chainable mocks
      doc: mockDoc.mockReturnThis(),
      set: mockSet.mockResolvedValue(),
      update: mockUpdate.mockResolvedValue(),
      get: mockGet.mockResolvedValue({ exists: true, data: () => ({ flags: 1 }) }),
      add: mockAdd,
      delete: mockDelete.mockResolvedValue(),
      where: mockWhere.mockReturnThis(),
      forEach: mockForEach
    }))
  };
});

// Mock setup for Firebase scheduled functions
jest.mock('firebase-functions/v2/pubsub', () => ({
  schedule: jest.fn().mockReturnValue({
    onRun: jest.fn().mockImplementation(callback => callback()) // Mock scheduled function triggers
  })
}));

// Import function handlers from other files
const { handleNewUserRegistration } = require('../firebase/auth');
const { createPost, flagPost } = require('../functions/posts');
const { addFriend, removeFriend } = require('../functions/social');
const { completeHabit } = require('../firebase/habits');
const { scheduledDailyCleanup } = require('../functions/dailyCleanup');

// Clear all mocks before each test to ensure clean test environment
beforeEach(() => {
  jest.clearAllMocks();
});

// Define test suites for each module
describe('Firebase Function Tests', () => {
  // Tests for authentication functions
  describe('Authentication', () => {
    test('User registration should work correctly', async () => {
      const user = { uid: '123', email: 'test@example.com' };
      const data = { firstName: 'Test', lastName: 'User', username: 'testuser' };
      await handleNewUserRegistration(user, data);
      expect(mockSet).toHaveBeenCalledWith({
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
        username: 'testuser',
        profilePicUrl: '',
        selectedHabit: 'drinkWater'
      });
    });
  });

  // Tests for post management functions
  describe('Posts', () => {
    test('Create post should work correctly', async () => {
      const postData = { promptId: '123', photoUrl: 'http://example.com/photo.jpg' };
      const context = { auth: { uid: '123' } };
      const result = await createPost(postData, context);
      expect(result.id).toBe('testPostId');
      expect(mockAdd).toHaveBeenCalledWith({
        userId: '123',
        promptId: '123',
        photoUrl: 'http://example.com/photo.jpg',
        createdAt: expect.any(Date),
        flags: 0
      });
    });

    test('Flag post should increment flags', async () => {
      const initialData = { flags: 1 };
      mockGet.mockResolvedValueOnce({ exists: true, data: () => initialData });

      const postData = { postId: '123' };
      const context = { auth: { uid: '123' } };
      const result = await flagPost(postData, context);

      expect(result).toHaveProperty('message', 'Post flagged successfully');
      expect(mockUpdate).toHaveBeenCalledWith({ flags: initialData.flags + 1 });
    });
  });

  // Tests for social interaction functions
  describe('Social', () => {
    test('Add friend should work correctly', async () => {
      const data = { targetUserId: '456' };
      const context = { auth: { uid: '123' } };
      const result = await addFriend(data, context);
      expect(result).toHaveProperty('message', 'Friend request sent successfully.');
    });

    test('Remove friend should work correctly', async () => {
      const data = { targetUserId: '456' };
      const context = { auth: { uid: '123' } };
      const result = await removeFriend(data, context);
      expect(result).toHaveProperty('message', 'Friend removed successfully.');
    });
  });

  // Tests for habit management functions
  describe('Habits', () => {
    test('Complete habit should work correctly', async () => {
      const data = { habitId: 'run', promptId: 'prompt1', completionTime: new Date() };
      const context = { auth: { uid: '123' } };
      mockGet.mockResolvedValueOnce({ exists: false });
      const result = await completeHabit(data, context);
      expect(result).toHaveProperty('message', 'Habit completed successfully.');
      expect(mockSet).toHaveBeenCalled();
    });
  });

  // Tests for daily cleanup functions
  describe('Daily Cleanup', () => {
    test('Scheduled daily cleanup should work correctly', async () => {
      await scheduledDailyCleanup({});
      expect(mockDelete).toHaveBeenCalled();
      expect(mockUpdate).toHaveBeenCalled();
    });
  });
});
