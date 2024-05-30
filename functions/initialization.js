const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function initializeHabits() {
  const habitsData = [
    { 
      id: 'drinkWater', 
      name: 'Drinking More Water', 
      description: 'Let\'s get our water game on', 
      prompts: [
          'Take a photo of your filled water bottle', 
          'Snap your glass as you drink the last sip',
          'Show your daily water intake chart',
          'Take a picture of your favorite water flavor enhancer'
      ]
    },
    { 
      id: 'readBooks', 
      name: 'Read Books', 
      description: 'Let\'s make that brain bigger', 
      prompts: [
          'Capture your current reading spot', 
          'Show off the book you are currently reading',
          'Share a favorite quote from today\'s reading',
          'Take a picture of your bookshelf'
      ]
    },
    { 
      id: 'exercise', 
      name: 'Daily Exercise', 
      description: 'Time to get those endorphins flowing', 
      prompts: [
          'Show your workout gear',
          'Snap a photo mid-workout',
          'Capture your post-workout meal',
          'Take a picture of your exercise tracking app'
      ]
    },
    { 
      id: 'meditate', 
      name: 'Meditate', 
      description: 'Find your inner peace', 
      prompts: [
          'Take a picture of your meditation spot',
          'Show your meditation timer app',
          'Capture a serene view that helps you relax',
          'Snap a photo of your meditation journal'
      ]
    },
    { 
      id: 'eatHealthy', 
      name: 'Eat Healthy', 
      description: 'Nourish your body with good food', 
      prompts: [
          'Take a photo of your healthy meal',
          'Show off your meal prep for the week',
          'Capture your favorite healthy snack',
          'Snap a picture of a new healthy recipe you\'re trying'
      ]
    },
    { 
      id: 'sleepWell', 
      name: 'Sleep Well', 
      description: 'Improve your sleep quality', 
      prompts: [
          'Take a picture of your bedtime routine',
          'Show your sleep tracking app',
          'Capture your cozy bed setup',
          'Snap a photo of a relaxing pre-sleep activity'
      ]
    },
    { 
      id: 'learnNewSkill', 
      name: 'Learn a New Skill', 
      description: 'Expand your horizons', 
      prompts: [
          'Take a photo of your learning materials',
          'Show your progress on a new skill',
          'Capture a moment from your practice session',
          'Snap a picture of your completed project'
      ]
    },
    { 
      id: 'journaling', 
      name: 'Journaling', 
      description: 'Reflect and record your thoughts', 
      prompts: [
          'Take a photo of your journal entry',
          'Show your journaling setup',
          'Capture a quote or thought that stood out today',
          'Snap a picture of your favorite journaling tools'
      ]
    }
  ];

  // Start batch write
  const batch = db.batch();

  // Populate Habits and Prompts
  habitsData.forEach(habit => {
    const habitRef = db.collection('habits').doc(habit.id);
    batch.set(habitRef, { name: habit.name, description: habit.description, prompts: habit.prompts });
  });

  // Execute the batch write
  try {
    await batch.commit();
    console.log('Firestore has been fully initialized with initial data.');
  } catch (error) {
    console.error('Error initializing Firestore:', error);
  }
}

initializeHabits().catch(console.error);