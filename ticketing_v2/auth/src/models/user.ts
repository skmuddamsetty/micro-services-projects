import mongoose from 'mongoose';
import { PasswordManager } from '../services/password';

// an interface that describes the properties that are required to create a new user
interface UserAttrs {
  email: string;
  password: string;
}

// an interface that describes the properties a User Model has
// this is required because we have to tell typescript that there is a build function available on this model
// without this, if you are accessing User.build({}), typescript is going to complain that it cannot find the build method
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// an interface that describes the properties a User Document has
// this is useful to add more properties to the UserDocument which will have additional properties created by mongoose. for ex: createdAt, updatedAt
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
  // createdAt: string;
  // updatedAt: string;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

// defining static properties on userSchema
// in other words adding a function to a model
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

// pre save hook
userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await PasswordManager.toHash(this.get('password'));
    this.set('password', hashed);
  }
  done();
});

// creating a model from schema
const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
