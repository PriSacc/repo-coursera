var mongoose = require('mongoose');
var Reserva = require('./reserva');
var Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const saltRounds = 10;
const uniqueValidator = require('mongoose-unique-validator');
const Token = require('./token')
const mailer = require('../mailer/mailer')
const crypto = require('crypto')

const validateEmail = function(email) {
    const re = /^\w+([\.-]?\w+)+@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
}

var usuarioSchema = new Schema({
    nombre: {
        type: String,
        trim: true,
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'El email es obligatorio'],
        lowercase: true,
        unique: true,
        validate: [validateEmail, 'Por favor, ingrese un email valido'],
        match: [/^\w+([\.-]?\w+)+@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
    },
    password: {
        type: String,
        required: [true, 'El password es obligatorio']
    },
    passwordResetToken: String,
    passwordResetTokenExpires: Date,
    verificado: {
        type: Boolean,
        default: false
    }

});

usuarioSchema.plugin(uniqueValidator, {message: 'El {PATH} ya existe con otro usuario.'});
//plugin: modulos de mongoose

usuarioSchema.pre('save', function(next) { //pre -> antes del save ejecuta esto
    if (this.isModified('password')) {
        this.password = bcrypt.hashSync(this.password, saltRounds);
    }
    next();
});

usuarioSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

usuarioSchema.methods.reservar = function(biciID, desde, hasta, cb) {
    var reserva = new Reserva({usuario: this._id, bicicleta: biciID, desde: desde, hasta: hasta});
    console.log(reserva);
    reserva.save(cb);
}

usuarioSchema.methods.enviar_email_bienvenida = function(cb) {
    const token = new Token({_userId: this.id, token: crypto.randomBytes(16).toString('hex')});
    const email_destination = this.email;
    token.save(function(err) { //persistencia
        if (err) { return console.log(err.message);}
        const mailOptions = {
            from:'no-reply@redbicicletas.com',
            to: email_destination,
            subject: 'Verificacion de cuenta',
            text: 'Hola \n\n'+'Por favor, para verificar su cuenta haga click en este link: \n'+'http://localhost:3000'+'\/token/confirmation\/'+token.token+'\n'
        };

        mailer.sendMail(mailOptions, function (err) {
            if (err) { return console.log(err.message);}
            console.log('Mail de verificacion enviado a '+email_destination+'.');
        });
    });

}

usuarioSchema.methods.resetPassword = function (cb) {
    const token = new Token({ _userId: this.id, token: crypto.randomBytes(16).toString('hex') })
    const email_destination = this.email;
    token.save(function (err) {
        if (err) {
            return console.log(err.message);
        }

        const mailOptions = {
            from: 'no-reply@redbicicletas.com',
            to: email_destination,
            subject: 'Reseteo de password de cuenta',
            text: 'Hola,\n\n' + 'Por favor, para resetear la clave de su cuenta haga click en este link: \n' + 'http://localhost:3000' + '\/resetPassword\/' + token.token + '\n'
        };

        mailer.sendMail(mailOptions, function (err) {
            if (err) return cb(err);

            console.log('Se ha enviado un email para resetear el password a: ' + email_destination + '.');
        });

        cb(null);
    });
}

module.exports = mongoose.model('Usuario', usuarioSchema);