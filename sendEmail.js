const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(express.json());
const nodemailer = require('nodemailer');

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  const data = req.body;

  const transporter = nodemailer.createTransport({
    host: 'webmail.all-inkl.com', // All-Inkl SMTP Server
    port: 587,
    secure: false,
    auth: {
      user: 'ordination@praxis-1140.at',
      pass: process.env.SMTP_PASS
    }
  });

  try {
    await transporter.sendMail({
      from: 'ordination@praxis-1140.at',
      to: 'ordination@praxis-1140.at',
      subject: `Neue Termin-Anfrage von ${data.vorname} ${data.nachname}`,
      text: JSON.stringify(data, null, 2)
    });
    res.status(200).json({ message: 'Email gesendet!' });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
}
module.exports = app;