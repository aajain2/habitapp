const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function initializeFirestore() {
  // Habits with associated prompts
  const habitsData = [
    { id: 'drinkWater', name: 'Drink Water', prompts: ['Take a photo of your filled water bottle', 'Snap your glass as you drink the last sip'] },
    { id: 'readBooks', name: 'Read Books', prompts: ['Capture your current reading spot', 'Show off the book you are currently reading'] },
    { id: 'morningRun', name: 'Morning Run', prompts: ['Take a selfie during your morning run', 'Photo of your running shoes post-run'] },
    { id: 'studySession', name: 'Study Session', prompts: ['Photograph your study area', 'Take a picture of your notes today'] },
    { id: 'meditate', name: 'Meditate', prompts: ['A serene snap of your meditation space', 'Capture a calming element during meditation'] },
    { id: 'eatFruits', name: 'Eat Fruits', prompts: ['Share a picture of today\'s fruit snack', 'Snap a shot of you eating a fruit'] },
    { id: 'playInstrument', name: 'Play an Instrument', prompts: ['Photo of your music practice session', 'Capture your instrument setup'] },
    { id: 'exercise', name: 'Exercise', prompts: ['Post-workout selfie', 'Take a photo of your gym gear'] },
    { id: 'cookMeals', name: 'Cook Meals', prompts: ['Showcase your cooking process', 'Plate presentation of your meal today'] },
    { id: 'bikeRiding', name: 'Bike Riding', prompts: ['Capture a scene from your bike ride', 'Photo with your bicycle after the ride'] }
  ];

  const batch = db.batch();

  // Populate habits and prompts
  habitsData.forEach(habit => {
    const habitRef = db.collection('Habits').doc(habit.id);
    batch.set(habitRef, {
      name: habit.name,
      description: habit.description
    });

    habit.prompts.forEach((prompt, index) => {
      const promptRef = habitRef.collection('Prompts').doc(`prompt${index + 1}`);
      batch.set(promptRef, {
        description: prompt
      });
    });
  });

  // Sample users
  const users = [
    { id: 'user1', username: 'Alice', email: 'alice@example.com', profilePicUrl: '' },
    { id: 'user2', username: 'Bob', email: 'bob@example.com', profilePicUrl: '' }
  ];

  users.forEach(user => {
    const userRef = db.collection('Users').doc(user.id);
    batch.set(userRef, {
      username: user.username,
      email: user.email,
      profilePicUrl: user.profilePicUrl
    });

    // Adding friend relationship
    const friendRef = userRef.collection('Friends').doc('user2'); // Assuming both are friends for the sake of example
    batch.set(friendRef, {
      status: 'confirmed',
      addedOn: admin.firestore.FieldValue.serverTimestamp()
    });

    // Sample daily habit tracking
    const habitsTrackingRef = userRef.collection('Habits').doc('2023-01-01'); // Example date
    batch.set(habitsTrackingRef, {
      habitId: 'drinkWater',
      completed: false,
      promptId: 'prompt1',
      photoUrl: ''
    });
  });

  // Execute the batch
  try {
    await batch.commit();
    console.log('Firestore has been fully initialized with initial data.');
  } catch (error) {
    console.error('Error initializing Firestore: ', error);
  }
}

initializeFirestore().catch(console.error);
