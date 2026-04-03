const mongoose = require('mongoose');

const financialRecordSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    amount: {
        type: Number,
        required: [true, 'Please add an amount']
    },
    type: {
        type: String,
        enum: ['income', 'expense'],
        required: [true, 'Please specify if it is income or expense']
    },
    category: {
        type: String,
        required: [true, 'Please add a category'],
        trim: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

// Middleware to filter out soft-deleted records by default
financialRecordSchema.pre(/^find/, function(next) {
    this.find({ isDeleted: false });
    next();
});

module.exports = mongoose.model('FinancialRecord', financialRecordSchema);
