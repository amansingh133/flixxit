import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
    default: null,
  },
  consumption: {
    type: Schema.Types.ObjectId,
    ref: "Consumption",
  },
  preferences: {
    type: Schema.Types.ObjectId,
    ref: "Preference",
  },
  watchlist: {
    type: Schema.Types.ObjectId,
    ref: "Watchlist",
  },
  accountDetails: {
    creationDate: { type: Date, default: Date.now },
    isLoggedInCurrently: { type: Boolean, default: false },
    lastLoggedIn: { type: Date, default: null },
    subscription: {
      isSubscribed: { type: Boolean, default: false },
      subscriptionType: { type: String, default: "Yearly" },
      paymentDate: { type: Date, default: null },
      expirationDate: { type: Date, default: null },
    },
  },
  passwordResetOtp: {
    type: Number,
    default: null,
  },
  otpExpiry: {
    type: Date,
    default: null,
  },
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

userSchema.methods.checkPassword = async function (password) {
  try {
    const match = await bcrypt.compare(password, this.password);
    return match;
  } catch (error) {
    throw error;
  }
};

userSchema.methods.updateLoggedIn = async function () {
  try {
    if (!this.accountDetails.lastLoggedIn) {
      // This is the first login
      this.accountDetails.lastLoggedIn = new Date();
      this.accountDetails.isLoggedInCurrently = true;
      await this.save();
    } else {
      this.accountDetails.lastLoggedIn = new Date();
      this.accountDetails.isLoggedInCurrently = true;
      await this.save();
    }
  } catch (error) {
    console.error("Error updating logged in status:", error);
    throw error;
  }
};

userSchema.methods.logout = async function () {
  try {
    this.accountDetails.isLoggedInCurrently = false;
    await this.save();
  } catch (error) {
    console.error("Error updating logged out status:", error);
    throw error;
  }
};

userSchema.methods.updateSubscription = async function (type) {
  try {
    this.accountDetails.subscription.isSubscribed = true;
    this.accountDetails.subscription.subscriptionType = type;
    this.accountDetails.subscription.paymentDate = new Date();

    const expirationDate = new Date(
      this.accountDetails.subscription.paymentDate
    );

    if (type === "monthly") {
      expirationDate.setMonth(expirationDate.getMonth() + 1);
    } else if (type === "annual") {
      expirationDate.setFullYear(expirationDate.getFullYear() + 1);
    }

    this.accountDetails.subscription.expirationDate = expirationDate;

    await this.save();
  } catch (error) {
    throw error;
  }
};

userSchema.methods.cancelSubscription = async function () {
  try {
    this.accountDetails.subscription.isSubscribed = false;
    this.accountDetails.subscription.subscriptionType = null;
    this.accountDetails.subscription.paymentDate = null;
    this.accountDetails.subscription.expirationDate = null;
    await this.save();
  } catch (error) {
    throw error;
  }
};

const User = model("User", userSchema);

export default User;
