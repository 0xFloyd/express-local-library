var mongoose = require("mongoose");
var moment = require('moment');

var Schema = mongoose.Schema;

var BookInstanceSchema = new Schema({
  book: { type: Schema.Types.ObjectId, ref: "Book", required: true }, //reference to the associated book
  imprint: { type: String, required: true },
  status: {
    type: String,
    required: true,
    enum: ["Available", "Maintenance", "Loaned", "Reserved"], //allowed values of a string. prevents misspellings and invalid entries
    default: "Maintenance"
  },
  due_back: { type: Date, default: Date.now } // We use default to set the default status for newly created bookinstances
});

// Virtual for bookinstance's URL
BookInstanceSchema.virtual("url").get(function() {
  return "/catalog/bookinstance/" + this._id;
});

BookInstanceSchema
  .virtual('due_back_formatted')
  .get(function () {
    return moment(this.due_back).format('MMMM Do, YYYY');
  });

//Export model
module.exports = mongoose.model("BookInstance", BookInstanceSchema);
