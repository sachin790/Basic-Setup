const mongoose = require('mongoose');

const { Schema } = mongoose;

const bookSchema = new Schema({
    name: { type: String, default: null },
    code: { type: String, default: null },
    authorId: { type: Schema.ObjectId, ref: 'authors', default: null },
    isDeleted: { type: Boolean, default: false },
    quantity: { type: Number, default: 1 },
}, {
    timestamps: true,
});

bookSchema.set('toObject');
bookSchema.set('toJSON');
bookSchema.index({ code: 1, authorId: -1 }, { unique: true });
module.exports = mongoose.model('books', bookSchema);
