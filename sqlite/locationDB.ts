import { City, Country } from '@/types'
import Bugsnag from '@bugsnag/expo'
import { openDatabaseSync } from 'expo-sqlite'

// Open the database synchronously
const db = openDatabaseSync('countries.db')

// Function to create the tables if they don't exist
export const setupDatabase = async () => {
  try {
    // DROP TABLE IF EXISTS countries;
    await db.execAsync(`
    CREATE TABLE IF NOT EXISTS countries (
        id INTEGER PRIMARY KEY,
        name TEXT,
        iso2 TEXT UNIQUE,
        iso3 TEXT,
        phonecode TEXT,
        emoji TEXT,
        name_ar TEXT
      );
    `)

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS cities (
        id INTEGER PRIMARY KEY,
        name TEXT,
        country_code TEXT,
        latitude TEXT,
        longitude TEXT
      );
    `)
  } catch (error) {
    Bugsnag.notify(error as Error)
    console.error('Error setting up database:', error)
  }
}

// Function to insert countries
export const insertCountries = async (countries: Country[]) => {
  try {
    // Begin inserting countries and cities using execAsync
    let countryCount = 0
    for (const country of countries) {
      // Insert country data
      await db.runAsync(
        `INSERT OR IGNORE INTO countries (id, name, iso2, iso3, phonecode, emoji, name_ar) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        country.id,
        country.name,
        country.iso2,
        country.iso3,
        country.phonecode,
        country.emoji,
        country.translations.ar
      )

      countryCount++
    }

    console.log(`${countryCount} Countries inserted successfully`)
  } catch (error) {
    Bugsnag.notify(error as Error)
    console.error('Error inserting countries data:', error)
  }
}

export const insertCities = async (cities: City[]) => {
  try {
    let cityCount = 0

    for (const city of cities) {
      await db.runAsync(
        `INSERT OR IGNORE INTO cities (id, name, country_code, latitude, longitude) VALUES (?, ?, ?, ?, ?)`,
        city.id,
        city.name,
        city.country_code,
        city.latitude,
        city.longitude
      )

      cityCount++
    }

    console.log(`${cityCount} cities inserted successfully`)
  } catch (error) {
    Bugsnag.notify(error as Error)
    console.error('Error inserting cities data:', error)
  }
}

// Function to fetch all countries
export const getCountries = async () => {
  const result: Country[] = await db.getAllAsync('SELECT * FROM countries')
  return result
}

// Function to fetch cities of a specific country
export const getCitiesByCountry = async (iso2: string) => {
  const result: City[] = await db.getAllAsync(
    'SELECT * FROM cities WHERE country_code = ?',
    iso2
  )
  return result
}

export default db
