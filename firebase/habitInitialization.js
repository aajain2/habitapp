const habitsData = [
  {
    id: 'gym',
    name: 'Going to the Gym',
    description: 'In our fitness era',
    picture: 'https://firebasestorage.googleapis.com/v0/b/trabitapp.appspot.com/o/Assets%2FhabitImages%2Fgym.png?alt=media&token=39c710db-5186-4c8e-88d4-a8f648c27dbf',
    prompts: [
      'Take a picture of you next to the gym equipment.',
      'Strike a pose in the mirror and take a photo.',
      'Take a selfie with a friend or alone.',
      'Take a picture of you working out.',
      'Take a thumbs up in the mirror.'
    ]
  },
  {
    id: 'showering',
    name: 'Showering',
    description: 'Hey, life gets busy, we get it',
    picture: 'https://firebasestorage.googleapis.com/v0/b/trabitapp.appspot.com/o/Assets%2FhabitImages%2Fshowering.png?alt=media&token=66a5099a-cfd4-4900-8c0c-80b327bbc917',
    prompts: [
      'Take a selfie with your wet hair.',
      'Take a photo of running water.',
      'Take a photo of a peace sign next to running water.',
      'Take a photo of your body wash or shampoo.',
      'Take a photo of the shower stall.',
      'Give us your biggest smile after your shower.',
      'Take a thumbs-up mirror photo before your shower.'
    ]
  },
  {
    id: 'vegetables',
    name: 'Eating More Vegetables',
    description: 'A little a day goes a long way',
    picture: 'https://firebasestorage.googleapis.com/v0/b/trabitapp.appspot.com/o/Assets%2FhabitImages%2Fvegetables.png?alt=media&token=2a3c98c8-0db6-4b54-a5dd-df9c3cef40be',
    prompts: [
      'Take a photo of yourself holding a fork with a veggie on it.',
      'Take a selfie with your veggies.',
      'Take a photo of your choice of veggies.',
      'Take a selfie of yourself biting your vegetable.',
      'Give us your biggest smile with your vegetable.',
      'Hold a thumbs up next to your vegetable.'
    ]
  },
  {
    id: 'studying',
    name: 'Studying',
    description: 'Grinding, locking in... you got this',
    picture: 'https://firebasestorage.googleapis.com/v0/b/trabitapp.appspot.com/o/Assets%2FhabitImages%2Fstudying.png?alt=media&token=c106a4eb-b87f-43f8-838d-86dba2d6967a',
    prompts: [
      'Take a selfie of yourself doing work.',
      'Take a photo of your desk setup.',
      'Take a selfie with someone you’re working with or alone.',
      'Take a thumbs-up photo of yourself with your work.',
      'Give us the biggest smile while doing work.'
    ]
  },
  {
    id: 'treat',
    name: 'Daily Treat',
    description: 'You worked hard for it',
    picture: 'https://firebasestorage.googleapis.com/v0/b/trabitapp.appspot.com/o/Assets%2FhabitImages%2Ftreat.png?alt=media&token=435e6bd8-8f44-4b18-8b9d-6007431c463a',
    prompts: [
      'Take a bite of your treat.',
      'Hold a thumbs up with your treat.',
      'Take a selfie while eating your treat.',
      'Take a picture of your dessert.',
      'Give us the biggest smile with your treat.'
    ]
  },
  {
    id: 'hydration',
    name: 'Staying Hydrated',
    description: 'Hydrate or diedrate',
    picture: 'https://firebasestorage.googleapis.com/v0/b/trabitapp.appspot.com/o/Assets%2FhabitImages%2Fhydration.png?alt=media&token=74cd1ba4-47fc-4477-b412-9cb922729818',
    prompts: [
      'Take a photo of yourself drinking water.',
      'Hold a thumbs up with your water bottle.',
      'Take a photo of your empty water bottle.',
      'Give us the biggest smile with your water bottle.'
    ]
  },
  {
    id: 'brushingTeeth',
    name: 'Brushing Teeth',
    description: 'At least once a day!',
    picture: 'https://firebasestorage.googleapis.com/v0/b/trabitapp.appspot.com/o/Assets%2FhabitImages%2FbrushingTeeth.png?alt=media&token=36d8d3b4-fdc8-4774-8673-415063bf10cb',
    prompts: [
      'Take a photo of your toothpaste and toothbrush.',
      'Take a photo of yourself brushing your teeth.',
      'Give us your biggest minty smile with your toothbrush.',
      'Show us your pearly whites.',
      'Take a mirror picture of yourself brushing your teeth.'
    ]
  },
  {
    id: 'sunscreen',
    name: 'Putting on Sunscreen',
    description: "Don't let the UV get to you",
    picture: 'https://firebasestorage.googleapis.com/v0/b/trabitapp.appspot.com/o/Assets%2FhabitImages%2Fsunscreen.png?alt=media&token=84021e2f-0391-4670-8e93-7fc0e62912a3',
    prompts: [
      'Take a mirror picture of applying sunscreen.',
      'Take a picture with your sunscreen bottle.',
      'Give us your biggest smile with sunscreen on.',
      'Take a picture of yourself outside with the sun hitting your face.'
    ]
  }
];

const admin = require('firebase-admin');
const serviceAccount = require('../functions/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function initializeHabits() {
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