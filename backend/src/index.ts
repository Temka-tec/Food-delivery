import express from 'express';
import cors from 'cors';
import { FoodRouter } from './routers/food.router.ts';
import { CategoryRouter } from './routers/category.router.ts';
import { AuthRouter } from './routers/auth.router.ts';
import { OrderRouter } from './routers/order.router.ts';
import { Prisma } from './generated/prisma/client.ts';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/foods', FoodRouter);
app.use('/categories', CategoryRouter);
app.use('/auth', AuthRouter);
app.use('/orders', OrderRouter);

app.use((err: unknown, _req, res, _next) => {
  console.error(err);

  if (err instanceof Prisma.PrismaClientInitializationError) {
    return res.status(500).json({
      message:
        'Database connection failed. Check DATABASE_URL in the backend Vercel project.',
    });
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      return res.status(409).json({
        message: 'Username or email already exists',
      });
    }

    if (err.code === 'P2021' || err.code === 'P2022') {
      return res.status(500).json({
        message:
          'Database schema is not ready. Run Prisma db push or migrations on the production database.',
      });
    }
  }

  return res.status(500).json({
    message: 'Internal server error',
  });
});

if (process.env['NODE_ENV'] !== 'production') {
  app.listen(4000, () => {
    console.log('Server running on port 4000');
  });
}

export default app;
