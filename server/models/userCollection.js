const mongoose = require("mongoose");
const usersSchema = new mongoose.Schema({
  userName: String,
  payDate: {
    type: Date,
    default: Date.now,
    isNotified: {
      type: Boolean,
    },
  },
});

module.exports = mongoose.models.User || mongoose.model("User", usersSchema);
