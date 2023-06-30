import patients from '../../data/patients-full';
import { PatientEntry, NonSensitivePatientEntry, NewPatientEntry, NewEntryWithoutId, Entry } from '../types';
import { v4 as uuidv4 } from 'uuid';


const getEntries = (): Array<PatientEntry> => {
  return patients;
};

const getNonSensitiveEntries = (): Array<NonSensitivePatientEntry> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addEntry = (entry: NewPatientEntry): PatientEntry => {

  const NewPatientEntry = {
    id: uuidv4(),
    ...entry
  }

  patients.push(NewPatientEntry);
  return NewPatientEntry;
};

const findById = (id: string): PatientEntry | undefined => {
  const entry = patients.find(d => d.id === id.toString());
  return entry;
};

const addPatientEntry = (id: string, entry: NewEntryWithoutId): Entry | undefined => {
  const patientIndex = patients.findIndex((patient) => patient.id === id);

  if (patientIndex === -1) {
    // Patient with the provided id not found
    return undefined;
  }

  const createdEntry: Entry = {
    id: uuidv4(),
    ...entry,
  };

  console.log(uuidv4())

  // if (!createdEntry.diagnosisCodes || createdEntry.diagnosisCodes.length === 0) {
  //   // Remove the diagnosisCodes property if it's not provided or empty
  //   delete createdEntry.diagnosisCodes;
  // }

  patients[patientIndex].entries.push(createdEntry);

  return createdEntry;
};


export default {
  getEntries,
  getNonSensitiveEntries,
  addEntry,
  findById,
  addPatientEntry
}
