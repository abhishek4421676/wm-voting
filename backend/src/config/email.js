const { Resend } = require("resend");

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY);

// Send password reset email
const sendPasswordResetEmail = async (email, resetUrl, userName) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "Voting Platform <onboarding@resend.dev>", // Use your verified domain in production
      to: [email],
      subject: "Password Reset Request",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #f9f9f9;
            }
            .content {
              background-color: white;
              padding: 30px;
              border-radius: 10px;
              box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            }
            .header {
              color: #2563eb;
              font-size: 24px;
              font-weight: bold;
              margin-bottom: 20px;
            }
            .button {
              display: inline-block;
              padding: 12px 30px;
              background-color: #2563eb;
              color: white;
              text-decoration: none;
              border-radius: 5px;
              margin: 20px 0;
            }
            .footer {
              margin-top: 20px;
              padding-top: 20px;
              border-top: 1px solid #eee;
              font-size: 12px;
              color: #666;
            }
            .warning {
              background-color: #fef2f2;
              border-left: 4px solid #ef4444;
              padding: 12px;
              margin: 15px 0;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="content">
              <div class="header">Password Reset Request</div>
              
              <p>Hello ${userName},</p>
              
              <p>You recently requested to reset your password for your Voting Platform account. Click the button below to reset it:</p>
              
              <a href="${resetUrl}" class="button">Reset Password</a>
              
              <p>Or copy and paste this link into your browser:</p>
              <p style="word-break: break-all; color: #2563eb;">${resetUrl}</p>
              
              <div class="warning">
                <strong>⚠️ Security Notice:</strong>
                <ul style="margin: 5px 0;">
                  <li>This link will expire in 1 hour</li>
                  <li>If you didn't request this, please ignore this email</li>
                  <li>Your password won't change until you click the link and set a new password</li>
                </ul>
              </div>
              
              <div class="footer">
                <p>This is an automated message, please do not reply to this email.</p>
                <p>&copy; ${new Date().getFullYear()} Voting Platform. All rights reserved.</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
Hello ${userName},

You recently requested to reset your password for your Voting Platform account.

Reset your password by clicking this link:
${resetUrl}

This link will expire in 1 hour.

If you didn't request this password reset, please ignore this email. Your password won't change until you access the link above and create a new one.

---
This is an automated message, please do not reply to this email.
© ${new Date().getFullYear()} Voting Platform. All rights reserved.
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      throw new Error(error.message);
    }

    console.log("Password reset email sent:", data.id);
    return { success: true, messageId: data.id };
  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw error;
  }
};

module.exports = {
  sendPasswordResetEmail,
};
