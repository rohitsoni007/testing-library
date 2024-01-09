const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema(
    {
        name: {
          type: String,
        },
        email: {
            type: String,
        },
        phone: {
            type: String,
        },
        addedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            index: true,
        },
        updatedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        isDeleted: {
            type: Boolean,
            default: false,
            index: true,
        },
        deletedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        deletedAt: {
            type: Date,
        },
    },
    { timestamps: true }
);


resumeSchema.pre('save', function (next) {
    if (this.isModified('isDeleted') && this.isDeleted) {
        this.deletedAt = new Date();
    }
    next();
});




const Resume = mongoose.model('Resume', resumeSchema);

module.exports = Resume;
