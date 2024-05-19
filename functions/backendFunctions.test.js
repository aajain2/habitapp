// Import dependencies
const { expect, jest } = require('@jest/globals');
require('./testSetup'); // Ensure Firebase is initialized before running tests

// Mock Firestore methods
const mockCollection = jest.fn();
const mockDoc = jest.fn();
const mockSet = jest.fn();
const mockUpdate = jest.fn();
const mockGet = jest.fn();
const mockAdd = jest.fn().mockResolvedValue({ id: 'testPostId' });
const mockDelete = jest.fn();
const mockWhere = jest.fn();
const mockForEach = jest.fn(callback => { callback({ id: '123', data: () => ({ flags: 1 }) }); });

// Mock Firebase Admin
jest.mock('firebase-admin', () => {
  const actualAdmin = jest.requireActual('firebase-admin');
  return {
    ...actualAdmin,
    firestore: jest.fn(() => ({
      collection: mockCollection.mockReturnThis(),
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

// Mock setup for Firebase functions such as schedule
jest.mock('firebase-functions/v2/pubsub', () => ({
  schedule: jest.fn().mockReturnValue({
    onRun: jest.fn().mockImplementation(callback => callback())
  })
}));

// Import functions
const { handleNewUserRegistration } = require('../functions/auth');
const { createPost, flagPost } = require('../functions/posts');
const { addFriend, removeFriend } = require('../functions/social');
const { completeHabit } = require('../functions/habits');
const { scheduledDailyCleanup } = require('../functions/dailyCleanup');

// Clear mocks between tests
beforeEach(() => {
  jest.clearAllMocks();
});

// Describe blocks for each module
describe('Firebase Function Tests', () => {
  // Authentication tests
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

  // Posts tests
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
      // Setup a post with an initial flag count
      const initialData = { flags: 1 };
      mockGet.mockResolvedValueOnce({ exists: true, data: () => initialData });

      const postData = { postId: '123' };
      const context = { auth: { uid: '123' } };
      const result = await flagPost(postData, context);

      expect(result).toHaveProperty('message', 'Post flagged successfully');
      expect(mockUpdate).toHaveBeenCalledWith({ flags: initialData.flags + 1 });
    });
  });

  // Social tests
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

  // Habits tests
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

  // Daily cleanup tests
  describe('Daily Cleanup', () => {
    test('Scheduled daily cleanup should work correctly', async () => {
      await scheduledDailyCleanup({});
      expect(mockDelete).toHaveBeenCalled();
      expect(mockUpdate).toHaveBeenCalled();
    });
  });
});
