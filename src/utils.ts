import { NewDiaryEntry, Weather, Visibility, NewPatientEntry, Gender, DiagnoseEntry, HealthCheckRating, NewEntryWithoutId } from './types';

const toNewDiaryEntry = (object: any): NewDiaryEntry => {
  return {
    date: parseDate(object.date),
    comment: parseComment(object.comment),
    weather: parseWeather(object.weather),
    visibility: parseVisibility(object.visibility)
  };
};

export const toNewPatientEntry = (object: any): NewPatientEntry => {
  return {
    name: parseName(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
    entries: []
  }
}

export const toNewEntry = (object: any): NewEntryWithoutId => {
  switch (object.type) {
    case 'HealthCheck':
      return {
        description: parseDescription(object.description),
        date: parseDate(object.date),
        specialist: parseSpecialist(object.specialist),
        diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
        type: 'HealthCheck',
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
      };
    case 'OccupationalHealthcare':
      return {
        // id: String(object.id),
        description: parseDescription(object.description),
        date: parseDate(object.date),
        specialist: parseSpecialist(object.specialist),
        diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
        type: 'OccupationalHealthcare',
        employerName: parseEmployerName(object.employerName),
        sickLeave: parseSickLeave(object.sickLeave)
      };
    case 'Hospital':
      return {
        description: parseDescription(object.description),
        date: parseDate(object.date),
        specialist: parseSpecialist(object.specialist),
        diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
        type: 'Hospital',
        discharge: parseDischarge(object.discharge)
      };
    default:
      throw new Error('Incorrect or missing type: ' + object.type);
  }
};

const parseComment = (comment: any): string => {
  if (!comment || !isString(comment)) {
    throw new Error('Incorrect or missing comment: ' + comment);
  };
  return comment;
};

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  };
  return date;
};

const isWeather = (param: any): param is Weather => {
  return Object.values(Weather).includes(param);
};

const parseWeather = (weather: any): Weather => {
  if (!weather || !isWeather(weather)) {
    throw new Error('Incorrect or missing weather: ' + weather);
  };
  return weather;
};

const isVisibility = (param: any): param is Visibility => {
  return Object.values(Visibility).includes(param);
};

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param as HealthCheckRating);
};

const parseHealthCheckRating = (healthCheckRating: any): HealthCheckRating => {
  if (!healthCheckRating || !isHealthCheckRating(healthCheckRating)) {
    throw new Error('Incorrect or missing healthheckrating: ' + healthCheckRating)
  };
  return healthCheckRating
};

const parseVisibility = (visibility: any): Visibility => {
  if (!visibility || !isVisibility(visibility)) {
    throw new Error('Incorrect or missing visibility: ' + visibility);
  };
  return visibility;
};

const parseName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name: ' + name);
  };
  return name;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  };
  return gender;
};

const parseSsn = (ssn: any): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn: ' + ssn);
  };
  return ssn;
}

const parseOccupation = (occupation: any): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation: ' + occupation)
  };
  return occupation;
};

const parseDescription = (description: any): string => {
  if (!description || !isString(description)) {
    throw new Error('Incorrect or missing description: ' + description)
  };
  return description;
};

const parseSpecialist = (specialist: any): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error('Incorrect or missing specialist: ' + specialist)
  };
  return specialist;
};

const parseDiagnosisCodes = (object: unknown): Array<DiagnoseEntry['code']> | undefined => {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    // return [] as Array<DiagnoseEntry['code']>;
    // or return undefined so if diagnosiscode is not provided, we dont return an empty array
    return undefined
  }

  return object.diagnosisCodes as Array<DiagnoseEntry['code']>;
};

const parseEmployerName = (employerName: any): string => {
  if (!employerName || !isString(employerName)) {
    throw new Error('Incorrect or missing employerName: ' + employerName)
  };
  return employerName;
};

const isSickLeave = (param: any): param is { startDate: string; endDate: string } => {
  return (
    typeof param === 'object' &&
    param !== null &&
    'startDate' in param &&
    typeof param.startDate === 'string' &&
    isDate(param.startDate) && // Assuming you have an isDate function for date validation
    'endDate' in param &&
    typeof param.endDate === 'string' &&
    isDate(param.endDate) // Assuming you have an isDate function for date validation
  );
};

const parseSickLeave = (sickLeave: any): { startDate: string; endDate: string } | undefined => {
  if (!sickLeave || !isSickLeave(sickLeave)) {
    // Return undefined if the input is missing or invalid
    return undefined;
  }
  return {
    startDate: parseDate(sickLeave.startDate),
    endDate: parseDate(sickLeave.endDate),
  };
};

const isDischarge = (param: any): param is { date: string, criteria: string } => {
  return (
    typeof param === 'object' &&
    param != null &&
    'date' in param &&
    typeof param.date === 'string' &&
    isDate(param.date) &&
    'criteria' in param &&
    typeof param.criteria === 'string'
  )
};

const parseCriteria = (criteria: any): string => {
  if (!criteria || !isString(criteria)) {
    throw new Error('Incorrect or missing criteria: ' + criteria)
  };
  return criteria;
};

const parseDischarge = (discharge: any): { date: string, criteria: string } => {
  if (!discharge || !isDischarge(discharge)) {
    throw new Error('Incorrect or missing discharge: ' + discharge)
  }
  return {
    date: parseDate(discharge.date),
    criteria: parseCriteria(discharge.criteria)
  }
};

// const parseType = (type: any) => {
//   switch (type) {
//     case 'HealthCheck':
//       return "HealthCheck";
//     case 'OccupationalHealthcare':
//       return "OccupationalHealthcare";
//     case 'Hospital':
//       return "Hospital";
//     default:
//       throw new Error('Incorrect or missing type: ' + type)
//   }
//   // if(!type || !isString(type)) {
//   //   throw new Error('Incorrect or missing type: ' + type)
//   // };
//   // return type;
// };

export default toNewDiaryEntry;
