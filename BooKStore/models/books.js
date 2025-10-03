const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    tittle: {
        type: String,
        required: [true, 'book is required'],
        trim: true,
        maxLength: [100, 'book length can not exceed 100 chars']
    },
    author: {
        type: String,
        required: [true, 'author is required'],
        trim: true,
    },
    year: {
        type: Number,
        required: [true, 'publication year is required'],
        min: [1000, 'year must be at least 1000'],
        max: [new Date().getFullYear(), 'year can not be in future']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Book', BookSchema);
