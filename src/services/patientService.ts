import patients from '../../data/patients';
import { PatientEntry, NonSensitivePatientEntry, NewPatientEntry } from '../types';
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

export default {
  getEntries,
  getNonSensitiveEntries,
  addEntry
}
