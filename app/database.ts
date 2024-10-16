import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('census');

export interface Person {
  id: number;
  province: string;
  district: string;
  localLevelGovernment: string;
  ward: string;
  censusUnit: string;
  censusUnitType: string;
  locality: string;
  lot: string;
  section: string;
  structure: string;
  workloadNumber: string;
  pdNo: string;
  householdNumber: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  date: string; // Consider using a Date type depending on your date format
  gender: string;
  peopleCount: string
  citizenship: string;
  nonCitizenship: string;
}

export const initializeDB = async () => {
  await db.execAsync(`
    PRAGMA journal_mode = WAL;           



     CREATE TABLE IF NOT EXISTS person (
      id INTEGER PRIMARY KEY NOT NULL,
      province TEXT NOT NULL,
      district TEXT NOT NULL,
      localLevelGovernment TEXT NOT NULL,
      ward TEXT NOT NULL,
      censusUnit TEXT NOT NULL,
      censusUnitType TEXT NOT NULL,
      workloadNumber TEXT NOT NULL,
      locality TEXT NOT NULL,
      section TEXT NOT NULL,
      structure TEXT NOT NULL,
      lot TEXT NOT NULL,
      pdNo TEXT NOT NULL,
      householdNumber TEXT NOT NULL,
      firstName TEXT NOT NULL,
      lastName TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT NOT NULL,
      date TEXT NOT NULL,
      gender TEXT NOT NULL,
      peopleCount TEXT,
      citizenship TEXT,
      nonCitizenship TEXT
    );





  `);
};

export const addPerson = async (
    firstName: string,
    lastName: string,
    phone: string,
    email: string,
    date: string,
    gender: string,
    peopleCount: string,
    citizenship: string,
    nonCitizenship: string // Include non-citizen country
  ) => {
    try {
      const result = await db.runAsync(
        'INSERT INTO person (firstName, lastName, phone, email, date, gender, peopleCount, citizenship, nonCitizenship) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        firstName,
        lastName,
        phone,
        email,
        date,
        gender,
        peopleCount,
        citizenship,
        nonCitizenship
      );
      return result.lastInsertRowId;
    } catch (error) {
      console.error("Error adding person:", error);
    }
  };
// The rest of your code remains unchanged
export const updatePerson = async (id: number, firstName: string, lastName: string, phone: string, email: string, date: string, gender: string, province: string, district: string, localLevelGovernment: string, ward: string, censusUnit: string, censusUnitType: string, workloadNumber: string, locality: string, section: string, structure: string, lot: string, pdNo: string, householdNumber: string, peopleCount: string) => {
  try {
    await db.runAsync('UPDATE person SET province = ?, district = ?, localLevelGovernment = ?, ward = ?, censusUnit = ?, censusUnitType = ?, workloadNumber = ?,locality= ?,section = ?,structure = ?, lot = ?, pdNo = ?, householdNumber = ?, firstName = ?, lastName = ?, phone = ?, email = ?, date = ?, gender = ?, peopleCount = ?, WHERE id = ?', firstName, lastName, phone, email, date, gender,province,district, localLevelGovernment,ward, censusUnit, censusUnitType, workloadNumber, locality, section, structure, lot, pdNo, householdNumber, peopleCount, id);
  } catch (error) {
    console.error("Error updating person:", error);
  }
};

export const deletePerson = async (id: number) => {
  try {
    await db.runAsync('DELETE FROM person WHERE id = ?', id);
  } catch (error) {
    console.error("Error deleting person:", error);
  }
};

export const getPersons = async () => {
  try {
    const allRows = await db.getAllAsync('SELECT * FROM person') as Person[];
    return allRows;
  } catch (error) {
    console.error("Error getting persons:", error);
    return [];
  }
};
