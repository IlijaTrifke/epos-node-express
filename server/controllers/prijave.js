const Prijave = require("../models/prijave");
const asyncWrapper = require("../errors/asyncWrapper.js");
const customError = require("../errors/customError");
const { google } = require("googleapis");
const nodemailer = require("nodemailer");
const path = require("path");

//definisanje transportera za nodemailer, glavnog pomagala preko kog uspevamo da posaljemo korisnicima mejl
let transporter = nodemailer.createTransport({
  service: "gmail",
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PWD,
  },
});

let potvrdaMail = {
  subject: "[BASKET 3na3] - Uspešno evidentirana prijava",
  html: '<p>Po&scaron;tovani,</p> <p><br></p> <p>Va&scaron;a prijava za takmičenje u ko&scaron;arci <strong>Basket 3na3</strong> je <strong>uspe&scaron;no evidentirana</strong>.</p> <p><br></p> <p>Vi&scaron;e informacija možete očekivati nakon zatvaranja prijava.</p> <p><br></p> <p>Pozdrav,</p> <div> <div> <div align="left"> <table> <tbody> <tr> <td> <p><img src="https://lh5.googleusercontent.com/zzJV9API8HKKnyre6Q565fd22LqzDgFWUO67kAX6DR2AECHJkAkg8F3rXrFFlZOz6-u_Heag4YJNR_jR6bo2Py-JKh2R5uig1VnhLWYmnjhYNlN4mVQb52KFYX3uHvNHpwIQf8jRU_FrmoBxZzb3ICL7tKugfAyosFujsfEZI6WGrE6lPOTwrwJyfEeG95WO" width="151" height="151"></p> </td> </tr> </tbody> </table> </div>Ilija Trifunović<br>Koordinator tima za informacione tehnologije<br>na projektu FON Hakaton 2023.<br><br>Mejl:&nbsp;<a href="mailto:ilija.trifunovic@fonis.rs" target="_blank">ilija.trifunovic@fonis.rs<br></a>Adresa: Jove Ilića 154, Beograd </div> </div>',
};

//definisanje naše funkcije koja će poslati mejl u zavisnoti od unetih parametara
const sendEmail = (to, subject, html) => {
  let mailOptions = {
    from: process.env.EMAIL,
    to,
    cc: "",
    subject,
    html,
  };

  //samo odvijanje slanja mejla
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

//definisanje naše funkcije koja če kasnije na serveru biti pozvana i koja će pokrenuti procese navedene u telu ove funkcije
const napraviPrijavu = asyncWrapper(async (req, res, next) => {
  //smeštanje tela requesta(tačnije samog objekta prijava) u promenljivu
  let prijava = req.body;
  console.log(prijava);

  //definisanje kredicijala i povezivanje sa sheetom u koje se smeštaju vrednosti objekta prijava
  const auth = new google.auth.GoogleAuth({
    keyFile: path.join(__dirname, "../credentials.json"),
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });
  console.log(auth);
  const client = await auth.getClient();
  const spreadsheetId = "1Gzy5h4k9YgY0rusYNHVEdgz0hpe8w2vfRNXQgksqMFE";
  const googleSheets = google.sheets({ version: "v4", auth: client });

  await googleSheets.spreadsheets.values.append({
    auth,
    spreadsheetId,
    range: "Sheet1!A:F",
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [
        [
          prijava.pitanje1,
          prijava.pitanje2,
          prijava.pitanje3,
          prijava.pitanje4,
          prijava.vesti,
          prijava.clanovi[0].imePrezime +
            "\n" +
            prijava.clanovi[0].email +
            "\n" +
            prijava.clanovi[0].brojTelefona +
            "\n" +
            prijava.clanovi[0].status +
            "\n" +
            prijava.clanovi[0].imeSkole +
            "\n" +
            prijava.clanovi[0].linkCV,

          prijava.clanovi[1].imePrezime +
            "\n" +
            prijava.clanovi[1].email +
            "\n" +
            prijava.clanovi[1].brojTelefona +
            "\n" +
            prijava.clanovi[1].status +
            "\n" +
            prijava.clanovi[1].imeSkole +
            "\n" +
            prijava.clanovi[1].linkCV,

          prijava.clanovi[2].imePrezime +
            "\n" +
            prijava.clanovi[2].email +
            "\n" +
            prijava.clanovi[2].brojTelefona +
            "\n" +
            prijava.clanovi[2].status +
            "\n" +
            prijava.clanovi[2].imeSkole +
            "\n" +
            prijava.clanovi[2].linkCV,

          prijava.clanovi[3].imePrezime +
            "\n" +
            prijava.clanovi[3].email +
            "\n" +
            prijava.clanovi[3].brojTelefona +
            "\n" +
            prijava.clanovi[3].status +
            "\n" +
            prijava.clanovi[3].imeSkole +
            "\n" +
            prijava.clanovi[3].linkCV,
        ],
      ],
    },
  });

  //spajanje svih mejlova u jedan niz
  let emails = [];
  for (let i = 0; i < prijava.clanovi.length; i++) {
    emails.push(prijava.clanovi[i].email);
  }

  //pozivanje naše funkcije koja šalje mejlove
  sendEmail(emails, potvrdaMail.subject, potvrdaMail.html);
  await Prijave.create(prijava);
  res
    .status(201) //created
    .json({ success: true, msg: "Uspesno dodata prijava", data: null });
});

module.exports = {
  napraviPrijavu,
};
