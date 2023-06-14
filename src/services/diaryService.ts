import diaries from '../../data/diaries';
import { DiaryEntry, NonSensitiveDiaryEntry } from '../../types';

// const diaries: Array<DiaryEntry> = diaryData as Array<DiaryEntry>;

const getEntries = (): Array<DiaryEntry> => {
  return diaries;
};

// select fields we want to use with Pick
// const getNonSensitiveEntries = (): Pick<DiaryEntry, 'id' | 'date' | 'weather' | 'visibility'>[] => {
//   return diaries;
// }

// omit fields we dont want to use with Omit
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

const addEntry = () => {
  return null;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addEntry
};
