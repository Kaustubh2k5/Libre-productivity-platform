import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,
});

export const sendOtpEmail = async (email: string, otp: string) => {
  console.log("Before sendMail");
  await transporter.sendMail({
    from: process.env.MAIL_USER,

    to: email,

    subject: "Your OTP Verification Code",

    html: `
      <div
        style="
          background-color: #f4f4f4;
          padding: 40px 20px;
          font-family: Arial, sans-serif;
        "
      >
        <div
          style="
            max-width: 600px;
            margin: auto;
            background: white;
            border: 1px solid #e5e5e5;
            border-radius: 12px;
            overflow: hidden;
          "
        >
          <div style="padding: 48px 32px;">
            <div style="text-align: center;">
              <h1
                style="
                  font-size: 28px;
                  margin-bottom: 8px;
                  color: #111;
                "
              >
                Welcome to Libre
              </h1>

              <p
                style="
                  color: #666;
                  font-size: 15px;
                  margin-bottom: 40px;
                "
              >
                Use the verification code below
                to secure your identity.
              </p>
            </div>

            <div
              style="
                background: #f9f9f9;
                border: 1px solid #eee;
                border-radius: 12px;
                padding: 32px;
                text-align: center;
              "
            >
              <div
                style="
                  font-size: 42px;
                  font-weight: bold;
                  letter-spacing: 12px;
                  color: #e60000;
                  font-family: monospace;
                "
              >
                ${otp}
              </div>

              <p
                style="
                  margin-top: 20px;
                  color: #888;
                  font-size: 12px;
                  text-transform: uppercase;
                  letter-spacing: 1px;
                "
              >
                Expires in 5 minutes
              </p>
            </div>

            <div
              style="
                margin-top: 40px;
                color: #777;
                font-size: 14px;
                line-height: 1.6;
              "
            >
              <p>
                If you didn’t request this code,
                you can safely ignore this email.
              </p>

              <div
                style="
                  margin-top: 32px;
                  padding-top: 24px;
                  border-top: 1px solid #eee;
                "
              >
                <p
                  style="
                    margin: 0;
                    font-weight: bold;
                    color: #333;
                  "
                >
                  The Libre Team
                </p>

                <p
                  style="
                    margin-top: 4px;
                    font-size: 12px;
                    color: #999;
                  "
                >
                  Empowering Productivity
                </p>
              </div>
            </div>
          </div>

          <div
            style="
              background: #fafafa;
              padding: 20px;
              text-align: center;
              border-top: 1px solid #eee;
            "
          >
            <p
              style="
                font-size: 10px;
                color: #aaa;
                letter-spacing: 2px;
                text-transform: uppercase;
              "
            >
              © 2026 Libre
            </p>
          </div>
        </div>
      </div>
    `,
  });
  console.log("After sendMail");
};
