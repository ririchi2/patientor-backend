import express from 'express';
import cors from 'cors';
import diaryRouter from './src/routes/diaries';
import diagnoseRouter from './src/routes/diagnoses';
import patientRouter from './src/routes/patients';

export const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  res.send('pong');
});

app.use('/api/diaries', diaryRouter);

app.use('/api/diagnoses', diagnoseRouter);

app.use('/api/patients', patientRouter);

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
