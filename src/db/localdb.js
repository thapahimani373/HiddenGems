import * as SQLite from 'expo-sqlite';

let db = null;

export const openDb = async () => {
  if (db) {
    return db;
  }

  db = await SQLite.openDatabaseAsync('hiddengems-v2.db');

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS gems (
      id TEXT PRIMARY KEY,
      name TEXT,
      description TEXT,
      category TEXT,
      latitude REAL,
      longitude REAL,
      imageUrl TEXT,
      photo TEXT
    );
  `);

  console.log('Local database ready');

  return db;
};

export const saveGems = async (gems) => {
  const database = await openDb();

  for (let i = 0; i < gems.length; i++) {
    const gem = gems[i];

    await database.runAsync(
      'INSERT OR REPLACE INTO gems (id, name, description, category, latitude, longitude, imageUrl, photo) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      gem.id,
      gem.name,
      gem.description,
      gem.category,
      gem.latitude,
      gem.longitude,
      gem.imageUrl,
      gem.photo
    );
  }

  console.log('Saved', gems.length, 'gems offline');
};


export const getGems = async () => {
  const database = await openDb();

  const rows = await database.getAllAsync('SELECT * FROM gems ORDER BY name');

  return rows;
};
