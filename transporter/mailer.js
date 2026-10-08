const nodemailer = require("nodemailer");

const tranporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'isahfalalu52@gmail.com',
        pass: 'Isah08068589723'
      }

})

module.exports = tranporter
