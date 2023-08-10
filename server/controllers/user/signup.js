import User from "../../models/user.js";

const signUpUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        error: "Email already exists. Please log in with your email.",
        redirectUrl: "/user/login",
      });
    }

    const user = await User.create({
      name,
      email,
      password,
      refreshToken: null,
      accountAccessDetails: {
        creationDate: Date.now(),
        isLoggedInCurrently: false,
        lastLoggedIn: Date.now(),
        isSubscribed: {
          subscription: false,
          paymentDate: null,
          expirationDate: null,
        },
      },
      passwordResetToken: null,
      passwordResetExpiry: null,
    });

    const responseData = {
      user: user.name,
      message: "Sign Up Successful. Please login to your account.",
      redirectUrl: "/user/login",
    };

    return res.status(200).json(responseData);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Signup Unsuccessful. Please try again",
      redirectUrl: "/user/singup",
    });
  }
};

export default signUpUser;
