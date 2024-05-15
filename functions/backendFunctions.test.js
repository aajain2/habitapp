const { initializeTestEnvironment, assertSucceeds } = require('@firebase/rules-unit-testing');
const { createPost, deletePosts } = require('./posts');
const { addOrUpdateHabitProgress } = require('./habits');
const { scheduledCleanup } = require('./dailyCleanup');

describe('Firebase Backend Functions', () => {
  let testEnv;

  beforeAll(async () => {
    testEnv = await initializeTestEnvironment({
      projectId: 'trabit',
      firestore: {
        host: 'localhost',
        port: 8080
      }
    });
  });

  afterAll(async () => {
    await testEnv.cleanup();
  });

  // Test group for Posts Functions
  describe('Posts Functions', () => {
    test('create post function', async () => {
      const context = { auth: { uid: 'user_123' } };
      const postData = { userId: 'user_123', promptId: 'prompt_1', photoUrl: 'url_to_photo' };

      await expect(createPost(postData, context)).resolves.toBeDefined();
    });

    test('delete posts function', async () => {
      await expect(deletePosts()).resolves.toBeUndefined();
    });
  });

  // Test group for Habits Functions
  describe('Habits Functions', () => {
    test('add or update habit progress', async () => {
      const fakeContext = { auth: { uid: 'test_user' } };
      const habitData = { date: '2023-05-01', completed: true, promptId: 'prompt1', photoUrl: 'some_url' };

      await expect(addOrUpdateHabitProgress(habitData, fakeContext)).resolves.toBeDefined();
    });
  });

  // Test group for Daily Cleanup Functions
  describe('Daily Cleanup Functions', () => {
    test('daily cleanup function', async () => {
      await expect(scheduledCleanup()).resolves.toBeUndefined();
    });
  });
});
