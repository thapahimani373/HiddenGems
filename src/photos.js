const photos = {
  'karekare-beach': require('../assets/images/karekare-beach.jpg'),
  'kitekite-falls': require('../assets/images/kitekite-falls.jpg'),
  'mount-eden-rim': require('../assets/images/mount-eden-rim.jpg'),
  'wairere-falls': require('../assets/images/wairere-falls.jpg'),
  'wellington-duck-pond': require('../assets/images/wellington-duck-pond.jpg'),
  'havana-coffee': require('../assets/images/havana-coffee.jpg'),
  'stingray-bay': require('../assets/images/stingray-bay.jpg'),
  'rangitoto-lava-caves': require('../assets/images/rangitoto-lava-caves.jpg'),
};

export const gemPhoto = (gem) => {
  if (gem.imageUrl) {
    return { uri: gem.imageUrl };
  }

  return photos[gem.photo] || null;
};
