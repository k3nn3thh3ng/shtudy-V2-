const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = mongoose.Schema({ 
	createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
	createdOn: Date,
	title: String,
	question: {type: String, required: true},
	solution: String,
	level: String,
	Subject: String,
	difficulty: Number,
	verified: {type: Boolean, default: true}
});

module.exports = mongoose.model('Question', questionSchema);