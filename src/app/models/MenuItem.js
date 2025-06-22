const { Schema, models, model, default: mongoose } = require("mongoose");

    const ExtraPriceSchema = new Schema({
        name: String,
        price: Number,
    });

const MenuItemSchema = new Schema({
  image: [{ type: String }],
  name: { type: String },
  description: { type: String },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
  basePrice: { type: Number },
  sizes: { type: [ExtraPriceSchema] },
  extraIngredientsPrices: { type: [ExtraPriceSchema] },
  isFeatured: { type: Boolean, default: false },
  isBestSeller: { type: Boolean, default: false },
}, { timestamps: true });


export const MenuItem = models?.MenuItem || model('MenuItem', MenuItemSchema);