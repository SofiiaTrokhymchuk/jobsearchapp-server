const mongoose = require("mongoose");

const RoleSchema = new mongoose.Schema(
  {
    roleName: {
      type: String,
      unique: true,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("Role", RoleSchema);
