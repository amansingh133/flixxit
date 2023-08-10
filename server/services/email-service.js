import nodemailer from "nodemailer";

export const sendResetOtp = async (email, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: `${process.env.email}`,
        pass: `${process.env.emailPassword}`,
      },
    });

    const mailOptions = {
      from: `${process.env.email}`,
      to: email,
      subject: "Password Reset",
      text: `Your password reset token for Flixxit account is: ${otp}`,
    };
    const info = await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw error;
  }
};
