import { PrayerTimes, PrayerTimesResponse } from '@/types'
import { openDatabaseSync } from 'expo-sqlite'

// Open the database synchronously
const db = openDatabaseSync('prayer_times.db')

// Function to create the tables if they don't exist
export const setupPrayerTimesDB = async () => {
  try {
    await db.execAsync(`CREATE TABLE IF NOT EXISTS prayer_times (
        id TEXT PRIMARY KEY, 
        timings TEXT, 
        hijri_date TEXT, 
        gregorian_date TEXT,
        latitude REAL,
        longitude REAL,
        method INTEGER,
        latitudeAdjustmentMethod TEXT,
        midnightMode TEXT,
        school TEXT,
        offset TEXT
      )`)
  } catch (error) {
    console.error('Error setting up database:', error)
  }
}

export const insertPrayerTimes = async (
  url: string,
  prayerTimes: PrayerTimesResponse[]
) => {
  try {
    let dayCount = 0
    for (const dailyPrayerTimes of prayerTimes) {
      const { timings, date, meta } = dailyPrayerTimes
      const uniqueId = `${url}` // Unique ID per date

      // Insert country data
      await db.runAsync(
        `INSERT OR REPLACE INTO prayer_times 
          (id, timings, hijri_date, gregorian_date, latitude, longitude, method, latitudeAdjustmentMethod, midnightMode, school, offset) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,

        uniqueId,
        JSON.stringify(timings),
        date.hijri.date,
        date.gregorian.date,
        meta.latitude,
        meta.longitude,
        meta.method.id,
        meta.latitudeAdjustmentMethod,
        meta.midnightMode,
        meta.school,
        JSON.stringify(meta.offset)
      )

      dayCount++
    }

    console.log(`${dayCount} daily prayer times inserted successfully`)
  } catch (error) {
    console.error('Error inserting prayer times:', error)
  }
}

export const getCachedPrayerTimes = async (url: string) => {
  const result: PrayerTimes[] = await db.getAllAsync(
    'SELECT * FROM prayer_times WHERE id = ?',
    url
  )
  return result
}

export default db
