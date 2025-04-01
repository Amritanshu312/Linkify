import mongoose, { Schema, model } from "mongoose";


const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Email is invalid",
    ]
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  profile: {
    type: String,
    required: false,
    default: ""
  },
  authtype: {
    type: String,
    required: true,
    default: "password"
  },
  name: {
    type: String,
    required: [true, "Name is required"]
  }
},
  {
    timestamps: true,
    collection: "users"
  }
);

const User = mongoose.models?.User || model('User', UserSchema);
export default User;
