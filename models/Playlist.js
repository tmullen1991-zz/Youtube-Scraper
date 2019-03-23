var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
var PlaylistSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  list: {
    type: Array,
    required: true
  },
  playlist: {
    type: Schema.Types.ObjectId,
    ref: "Playlist"
  }
});

// This creates our model from the above schema, using mongoose's model method
var Playlist = mongoose.model("Playlist", PlaylistSchema);

// Export the Article model
module.exports = Playlist;
