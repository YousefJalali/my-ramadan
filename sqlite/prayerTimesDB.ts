import { CachedPrayerTimes, PrayerTimesAPIResponse } from '@/types'
import Bugsnag from '@bugsnag/expo'
import { openDatabaseSync } from 'expo-sqlite'

// Open the database synchronously
const db = openDatabaseSync('prayer_times.db')

// Function to create the tables if they don't exist
export const setupPrayerTimesDB = async () => {
  try {
    // DROP TABLE IF EXISTS prayer_times;
    await db.execAsync(`CREATE TABLE IF NOT EXISTS prayer_times (
        id TEXT PRIMARY KEY, 
        url TEXT, 
        timings TEXT, 
        hijriDate TEXT, 
        gregorianDate TEXT,
        hijriDay NUMBER,
        gregorianDay NUMBER,
        hijriMonth NUMBER,
        gregorianMonth NUMBER,
        latitude REAL,
        longitude REAL,
        method INTEGER,
        latitudeAdjustmentMethod TEXT,
        midnightMode TEXT,
        school TEXT,
        offset TEXT,
        timezone TEXT
      )`)
  } catch (error) {
    Bugsnag.notify(error as Error)
    console.error('Error setting up database:', error)
  }
}

export const insertPrayerTimes = async (
  url: string,
  prayerTimes: PrayerTimesAPIResponse
) => {
  try {
    let dayCount = 0
    for (const dailyPrayerTimes of prayerTimes) {
      const { timings, date, meta } = dailyPrayerTimes
      const uniqueId = `${url}-${date.hijri.date}` // Unique ID per date

      // Insert country data
      await db.runAsync(
        `INSERT OR REPLACE INTO prayer_times 
          (id, url, timings, hijriDate, gregorianDate, hijriDay, gregorianDay, hijriMonth, gregorianMonth, latitude, longitude, method, latitudeAdjustmentMethod, midnightMode, school, offset, timezone) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,

        uniqueId,
        url,
        JSON.stringify(timings),
        date.hijri.date,
        date.gregorian.date,
        date.hijri.day,
        date.gregorian.day,
        date.hijri.month.number,
        date.gregorian.month.number,
        meta.latitude,
        meta.longitude,
        meta.method.id,
        meta.latitudeAdjustmentMethod,
        meta.midnightMode,
        meta.school,
        JSON.stringify(meta.offset),
        meta.timezone
      )

      dayCount++
    }

    console.log(`${dayCount} daily prayer times inserted successfully`)
  } catch (error) {
    Bugsnag.notify(error as Error)
    console.error('Error inserting prayer times:', error)
  }
}

export const getCachedPrayerTimes = async (url: string) => {
  const result: CachedPrayerTimes[] = await db.getAllAsync(
    'SELECT * FROM prayer_times WHERE url = ?',
    url
  )
  return result
}

export default db
