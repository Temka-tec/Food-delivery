import { Schema, model} from 'mongoose';

const foodSchema = new Schema({
    name: { type: String, required:true},
    price: { type:Number, required:true},
    image: {type:String, required:true},
    ingredients: {type:String, required:true},
    categoryIds: [{type: Schema.Types.ObjectId, ref: 'Category', required: true}],
}, {
    timestamps: true,
});

export const FoodModel = model('Food', foodSchema);