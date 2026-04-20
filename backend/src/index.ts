import express from 'express';
import { connectToDatabase } from './database/index.ts';
import { FoodRouter } from './routers/food.router.ts';
import { CategoryRouter } from './routers/category.router.ts';
import { AuthRouter } from './routers/auth.router.ts';
await connectToDatabase();

const app = express();

app.use(express.json());

app.use('/foods', FoodRouter);
app.use('/categories', CategoryRouter);
app.use("/auth", AuthRouter)


app.listen(4000, () => {
    console.log(`Exemple app listening on port 4000`)
})