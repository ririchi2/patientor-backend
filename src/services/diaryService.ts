import diaries from '../../data/diaries';
import { DiaryEntry, NonSensitiveDiaryEntry, NewDiaryEntry } from '../types';

// const diaries: Array<DiaryEntry> = diaryData as Array<DiaryEntry>;

const getEntries = (): Array<DiaryEntry> => {
  return diaries;
};

// select fields we want to use with TS Pick
// const getNonSensitiveEntries = (): Pick<DiaryEntry, 'id' | 'date' | 'weather' | 'visibility'>[] => {
//   return diaries;
// }

// omit fields we dont want to use with TS Omit
// const getNonSensitiveEntries = (): Omit<DiaryEntry, 'comment'>[] => {
//   return diaries;
// }

// or create a new type
const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
  return diaries.map(({ id, date, weather, visibility }) => ({
    id,
    date,
    weather,
    visibility,
  }));
};

const addEntry = (entry: NewDiaryEntry): DiaryEntry => {

  const newDiaryEntry = {
    id: Math.max(...diaries.map(d => d.id)) + 1,
    ...entry
  };

  diaries.push(newDiaryEntry);
  return newDiaryEntry;
};

const findById = (id: number): DiaryEntry | undefined => {
  const entry = diaries.find(d => d.id === id);
  return entry;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addEntry,
  findById
};
