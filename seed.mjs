// One-off script: puts the starting Hidden Gems into Firestore.
// photo is the name of a picture in assets/images, loaded by src/photos.js.
// imageUrl stays empty here and is only used by gems added with the camera.
// Run with: node seed.mjs
import { initializeApp } from 'firebase/app';
import { collection, addDoc, getDocs, getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAuukzyF5rxRLp5eHp00B4mnFcQEudLP90',
  authDomain: 'hiddengems-50df6.firebaseapp.com',
  projectId: 'hiddengems-50df6',
  storageBucket: 'hiddengems-50df6.firebasestorage.app',
  messagingSenderId: '1020856499416',
  appId: '1:1020856499416:web:1248b39d49964a6f01ebad',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const gems = [
  {
    name: 'Karekare Beach',
    description:
      'Black sand beach west of Auckland with a long empty stretch that most tourists skip for Piha next door. Best at low tide when the flat sand goes on forever.',
    category: 'Beach',
    latitude: -36.9906,
    longitude: 174.4836,
    imageUrl: '',
    photo: 'karekare-beach',
  },
  {
    name: 'Kitekite Falls',
    description:
      'Three tiered waterfall about forty minutes up a bush track from Piha. There is a swimming hole at the base that stays cold all summer.',
    category: 'Waterfall',
    latitude: -36.9553,
    longitude: 174.4794,
    imageUrl: '',
    photo: 'kitekite-falls',
  },
  {
    name: 'Mount Eden Crater Rim',
    description:
      'Everyone walks to the summit. Almost nobody follows the quiet eastern rim path, which has the same view of the harbour without the tour buses.',
    category: 'Viewpoint',
    latitude: -36.8774,
    longitude: 174.7645,
    imageUrl: '',
    photo: 'mount-eden-rim',
  },
  {
    name: 'Wairere Falls Lookout',
    description:
      'Steep climb through native bush in the Kaimai Range. The halfway lookout puts you level with the drop, which is worth the burning legs.',
    category: 'Hiking',
    latitude: -37.8231,
    longitude: 175.8567,
    imageUrl: '',
    photo: 'wairere-falls',
  },
  {
    name: 'Wellington Botanic Garden Duck Pond',
    description:
      'Tucked below the cable car top station. Locals eat lunch here. Ten minutes from Lambton Quay and completely quiet on a weekday.',
    category: 'Park',
    latitude: -41.2823,
    longitude: 174.7677,
    imageUrl: '',
    photo: 'wellington-duck-pond',
  },
  {
    name: 'Havana Coffee Works',
    description:
      'Roastery in a side street in Te Aro. You smell it before you find it. Small room, no seating to speak of, best flat white in the city.',
    category: 'Cafe',
    latitude: -41.2951,
    longitude: 174.7772,
    imageUrl: '',
    photo: 'havana-coffee',
  },
  {
    name: 'Cathedral Cove Track Side Path',
    description:
      'Most people head straight for the arch. The unsigned side path partway along drops you at Stingray Bay, which is usually empty.',
    category: 'Beach',
    latitude: -36.8283,
    longitude: 175.7906,
    imageUrl: '',
    photo: 'stingray-bay',
  },
  {
    name: 'Rangitoto Summit Lava Caves',
    description:
      'A short marked detour before the summit leads into lava tubes you can walk through. Take a torch, there is no lighting inside.',
    category: 'Hiking',
    latitude: -36.7869,
    longitude: 174.8592,
    imageUrl: '',
    photo: 'rangitoto-lava-caves',
  },
];

const existing = await getDocs(collection(db, 'HiddenGems'));

if (existing.size > 0) {
  console.log('HiddenGems already has', existing.size, 'documents. Nothing added.');
  process.exit(0);
}

for (const gem of gems) {
  const doc = await addDoc(collection(db, 'HiddenGems'), gem);
  console.log('added', gem.name, doc.id);
}

console.log('Done. Seeded', gems.length, 'gems.');
process.exit(0);
