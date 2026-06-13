import express from 'express';
import cors from 'cors';
import { FoodRouter } from './routers/food.router.ts';
import { CategoryRouter } from './routers/category.router.ts';
import { AuthRouter } from './routers/auth.router.ts';
import { OrderRouter } from './routers/order.router.ts';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/foods', FoodRouter);
app.use('/categories', CategoryRouter);
app.use('/auth', AuthRouter);
app.use('/orders', OrderRouter);

if (process.env['NODE_ENV'] !== 'production') {
  app.listen(4000, () => {
    console.log('Server running on port 4000');
  });
}

export default app;
