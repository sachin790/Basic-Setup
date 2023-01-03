const mongoose = require('mongoose');

const { Schema } = mongoose;

const authorSchema = new Schema({
    firstName: { type: String, default: null },
    lastName: { type: String, default: null },
    email: { type: String, default: null, index: { unique: true } },
    isDeleted: { type: Boolean, default: false },
}, {
    timestamps: true,
});

authorSchema.set('toObject');
authorSchema.set('toJSON');
module.exports = mongoose.model('authors', authorSchema);
