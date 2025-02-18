const { Schema, models, model } = require("mongoose");
const { type } = require("os");

const MenuItemSchema = new Schema({
    image: {type: String},
    name: {type: String},
    description: {type: String},
    basePrice: {type: Number},
}, {timestamps: true})

export const MenuItem = models?.MenuItem || model('MenuItem', MenuItemSchema);