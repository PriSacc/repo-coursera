var Reserva = require('../../models/reserva');
var Usuario = require('../../models/usuario');
var Bicicleta = require('../../models/bicicleta');
var mongoose = require('mongoose');
var server = require('../../bin/www');

describe('Testeando Usuarios', function() {
    beforeAll(function(done) {
        var mongoDB = 'mongodb://localhost/testdb';
        mongoose.connect(mongoDB, {useNewUrlParser: true});

        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'Error al conectar a MongoDB'));
        db.once('open', function() {
            console.log('Conexion exitosa');
            done();
        });
    });

    afterAll(function(done) {
        Reserva.deleteMany({}, function(err, success) {
            if (err) console.log(err);
            Usuario.deleteMany({}, function(err,success) {
                if(err) console.log(err);
                mongoose.disconnect();
                done();
            });
        });
    });

    describe('Cuando un usuario reserva una bici', () => {
        it('debe existir la reserva', (done) => {
            const usuario = new Usuario({nombre: 'Rogelio'});
            usuario.save();
            const bicicleta = new Bicicleta({code:1,color:'rojo', modelo:'urbana'});
            bicicleta.save();

            var hoy = new Date();
            var mañana = new Date();

            mañana.setDate(hoy.getDate()+1);
            usuario.reservar(bicicleta.id, mañana, function(err, reserva) {
                //find({}) es una promesa
                Reserva.find({}).populate('bicicleta').populate('usuario').exec(function(err, reservas) {
                    console.log(reservas[0]);

                    expect(reservas.length).toBe(1);
                    expect(reservas[0].diasDeReserva()).toBe(2);
                    expect(reservas[0].bicicleta.code).toBe(1);
                    expect(reservas[0].usuario.nombre).toBe(usuario.nombre);
                    done();
                });
            });
        });
    });


});