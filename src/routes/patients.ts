import express from 'express';
import patientService from '../services/patientService';
import { toNewEntry, toNewPatientEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);

    const addedEntry = patientService.addEntry(newPatientEntry);
    res.json(addedEntry);
  } catch (e: any) {
    res.status(400).send(e.message);
  }
});

router.get('/:id', (req, res) => {
  const patient = patientService.findById(req.params.id);

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    const patientId = req.params.id;
    console.log(patientId);


    const newEntry = toNewEntry(req.body);

    const addedEntry = patientService.addPatientEntry(patientId, newEntry);
    res.json(addedEntry);
  } catch (e: any) {
    res.status(400).send(e.message);
  }
});

export default router;
