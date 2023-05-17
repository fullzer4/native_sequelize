import express, { Request, Response } from 'express';
import { User } from './utils/createUser';

export const app = express();
const port = 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Leia a documentacao para consumir outra rotas');
});

app.get('/createuser', async (req: Request, res: Response) => {
  res.send('Leia a documentacao para consumir outra rotas');
});

app.listen(port, () => {
  console.log(`Servidor está rodando na porta: http://localhost:${port}`);
});