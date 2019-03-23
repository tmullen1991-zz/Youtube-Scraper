var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
var VideoSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  youtubeID: {
    type: String,
    required: true
  },
  video: {
    type: Schema.Types.ObjectId,
    ref: "Video"
  }
});

// This creates our model from the above schema, using mongoose's model method
var Video = mongoose.model("Video", VideoSchema);

// Export the Article model
module.exports = Video;
