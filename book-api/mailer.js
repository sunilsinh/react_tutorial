import nodemailer from "nodemailer";

const from = '"Bookworm" <info@bookworm.com>';

/*function setup() {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
}
*/
function setup() {
  
  var transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 587,
  auth: {
    user: 'gupta.vishal7222@gmail.com',
    pass: 'vishal@123'
  }
	});
  return transporter;
}


export function sendConfirmationEmail(user) {
  const tranport = setup();
  consoel.log(user);
  const email = {
    from,
    to: user.email,
    subject: "Welcome to Bookworm",
    text: `
    Welcome to Bookworm. Please, confirm your email.

    ${user.generateConfirmationUrl()}
    `
  };

  tranport.sendMail(email);
}

export function sendResetPasswordEmail(user) {
  const tranport = setup();
  console.log(user);
  const email = {
    from,
    to: user.email,
    subject: "Reset Password",
    text: `
    To reset password follow this link

    ${user.generateResetPasswordLink()}
    `
  };

  tranport.sendMail(email);
}
