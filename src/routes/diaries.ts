import express from 'express';
import diaryService from '../services/diaryService';
import toNewDiaryEntry from '../utils';


const router = express.Router();

router.get('/', (_req, res) => {
  res.send(diaryService.getNonSensitiveEntries());
});

// router.post('/', (req, res) => {
//   const { date, weather, visibility, comment } = req.body;
//   const newDiaryEntry = diaryService.addEntry({
//     date,
//     weather,
//     visibility,
//     comment,
//   });
//   res.json(newDiaryEntry);
// });
router.post('/', (req, res) => {
  try {
    const newDiaryEntry = toNewDiaryEntry(req.body);

    const addedEntry = diaryService.addEntry(newDiaryEntry);
    res.json(addedEntry);
  } catch (e: any) {
    res.status(400).send(e.message);
  }
});

router.get('/:id', (req, res) => {
  const diary = diaryService.findById(Number(req.params.id));

  if (diary) {
    res.send(diary);
  } else {
    res.sendStatus(404);
  }
});

export default router;
