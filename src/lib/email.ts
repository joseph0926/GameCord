import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

export async function sendEmail({ to, subject, html, from }: SendEmailOptions) {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is not defined");
  }

  try {
    const data = await resend.emails.send({
      from: from || "GameCord <onboarding@resend.dev>",
      to,
      subject,
      html,
    });

    return { success: true, data };
  } catch (error) {
    console.error("Failed to send email:", error);
    return { success: false, error };
  }
}

function getVerificationEmailHtml(verificationUrl: string) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>이메일 인증</title>
      </head>
      <body style="
        font-family: 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif;
        margin: 0;
        padding: 20px;
        background-color: #f9fafb;
      ">
        <div style="
          max-width: 600px;
          margin: 0 auto;
          background-color: white;
          border-radius: 10px;
          padding: 40px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        ">
          <h1 style="
            color: #1f2937;
            font-size: 24px;
            margin-bottom: 24px;
            text-align: center;
          ">
            이메일 주소 인증
          </h1>
          
          <p style="
            color: #4b5563;
            font-size: 16px;
            line-height: 24px;
            margin-bottom: 24px;
          ">
            안녕하세요!<br>
            계정 보안을 위해 이메일 주소 인증이 필요합니다.
          </p>

          <div style="text-align: center; margin: 32px 0;">
            <a href="${verificationUrl}" 
               style="
                 display: inline-block;
                 background-color: #2563eb;
                 color: white;
                 text-decoration: none;
                 padding: 12px 24px;
                 border-radius: 6px;
                 font-weight: 500;
               "
            >
              이메일 인증하기
            </a>
          </div>

          <p style="
            color: #6b7280;
            font-size: 14px;
            line-height: 20px;
            margin-top: 24px;
          ">
            버튼이 작동하지 않는 경우, 아래 링크를 브라우저에 복사하여 붙여넣어주세요:<br>
            <a href="${verificationUrl}" style="color: #2563eb; word-break: break-all;">
              ${verificationUrl}
            </a>
          </p>

          <div style="
            margin-top: 32px;
            padding-top: 24px;
            border-top: 1px solid #e5e7eb;
            text-align: center;
            color: #9ca3af;
            font-size: 12px;
          ">
            이 이메일은 회원가입 과정에서 발송되었습니다.<br>
            본인이 요청하지 않은 경우 이 이메일을 무시하셔도 됩니다.
          </div>
        </div>
      </body>
    </html>
  `;
}

export async function sendVerificationEmail(email: string, token: string) {
  const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${token}`;

  return sendEmail({
    to: email,
    subject: "이메일 주소를 인증해주세요",
    html: getVerificationEmailHtml(verificationUrl),
  });
}
