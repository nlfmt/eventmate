import nodemailer from 'nodemailer';

import { env } from '@/env.mjs';

const mailer = nodemailer.createTransport({
  host: "us2.smtp.mailhostbox.com",
  port: 25,
  secure: false,
  auth: {
      user: "info@eventmate.tech",
      pass: env.EMAIL_PASS
  },
  requireTLS: true,
});

export default mailer;