import express, { Request, Response } from 'express';

export const app = express();
const port = 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Leia a documentacao para consumir outra rotas');
});

app.listen(port, () => {
  console.log(`Servidor está rodando na porta ${port}`);
});