import { Schema, model, models } from "mongoose";

enum UserRole {
  Admin = 'admin',
  Guest = 'guest'
}

// interface User {
//   email: string;
//   id: string;
//   username: string;
//   role: UserRole;
//   hasPlusOne: boolean;
//   tableNumber: number | null;
// }

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  hasPlusOne: {
    type: Boolean,
    required: true
  },
  tableNumber: {
    type: Number,
    required: true
  }
});

const User = models?.User || model("User", UserSchema);

export default User;
