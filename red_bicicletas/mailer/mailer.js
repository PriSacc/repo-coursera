const nodemailer = require('nodemailer');

const mailConfig = {
     host: 'smtp.ethereal.email',
     port: 587,
     auth: {
        user: 'grover17@ethereal.email',
        pass: 'tzetQ5uq1mP1DZkwVm'
    }
};

module.exports = nodemailer.createTransport(mailConfig);