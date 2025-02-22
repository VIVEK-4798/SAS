const { model, Schema, models } = require("mongoose");

const UserInfoSchema = new Schema({
    
    email: { type: String, required: true },
    streetAddress: { type: String, default: "" },
    zipCode: { type: String, default: "" },
    city: { type: String, default: "" },
    country: { type: String, default: "" },
    phone: { type: String, default: "" },
    admin: { type: Boolean, default: false },
}, {timestamps: true});

export const UserInfo = models?.UserInfo || model('UserInfo', UserInfoSchema)