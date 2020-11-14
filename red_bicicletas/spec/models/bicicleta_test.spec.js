var server = require('../../bin/www');
var mongoose = require('mongoose');
var Bicicleta = require('../../models/bicicleta');

describe('Testeando bicicletas', function() {
    beforeAll(function(done) {
        var mongoDB = 'mongodb://localhost/testdb';
        mongoose.connect(mongoDB, {useNewUrlParser: true});

        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'MondoDB error de conexion'));
        db.once('open', function() {
            console.log('Conexion a BD correcta');
            done();
        });
    });

    afterAll(function(done) {
        Bicicleta.deleteMany({}, function(err, success) {
            if (err) console.log(err);
            mongoose.disconnect();
            done();
        });
    });

    describe('Bicicleta.createInstance()', () => {
        it('crea una instancia de Bicicleta', () => {
            var bici = Bicicleta.createInstance(1, 'rojo', 'urbana', [-33.9876,-66.2341]);

            expect(bici.code).toBe(1);
            expect(bici.color).toBe('rojo');
            expect(bici.modelo).toBe('urbana');
            expect(bici.ubicacion[0]).toEqual(-33.9876);
            expect(bici.ubicacion[1]).toEqual(-66.2341);
        });
    });

    describe('Bicicleta.allBicis()', () => {
        it('comienza vacia', (done) => {
            Bicicleta.allBicis(function(err, bicis) {
                expect(bicis.length).toBe(0);
                done();
            });
        });
    });

    describe('Bicicleta.add()', () => {
        it('agrega solo una bici', (done) => {
            var aBici = new Bicicleta({code: 1, color:'azul', modelo:'deportiva'});
            Bicicleta.add(aBici, function(err, newBici) {
                if (err) console.log('err');
                Bicicleta.allBicis(function(err, bicis) {
                    expect(bicis.length).toEqual(1);
                    expect(bicis[0].code).toEqual(aBici.code);

                    done();
                });
            });
        });
    });

    describe('Bicicleta.findByCode()', () => {
        it('debe devolver la bici con codigo 1', (done) => {
            Bicicleta.allBicis(function(err, bicis) {
                expect(bicis.length).toBe(0);

                var aBici = new Bicicleta({code: 1, color: 'rojo', modelo: 'deportiva'});
                Bicicleta.add(aBici, function(err, newBici) {
                    if (err) console.log(err);

                    var aBici2 = new Bicicleta({code: 2, color: 'azul', modelo: 'urbana'});
                    Bicicleta.add(aBici2, function(err, newBici) {
                        if (err) console.log(err);
                        Bicicleta.findByCode(1, function(err, targetBici) {
                            expect(targetBici.code).toBe(aBici.code);
                            expect(targetBici.color).toBe(aBici.color);
                            expect(targetBici.modelo).toBe(aBici.modelo);

                            done();
                        });
                    });
                });
            });
        });
    });


});

// beforeEach(() => { Bicicleta.allBicis = []; });  //resetear la coleccion
// describe('Bicicleta.allBicis()', () => {
//     it('comienza vacia', () => {
//         expect(Bicicleta.allBicis.length).toBe(0);
//     });
// });

// describe('Bicicleta.add()', () => {
//     it('agrega una', () => {
//         expect(Bicicleta.allBicis.length).toBe(0); //estado previo

//         var a = new Bicicleta(1,'rojo','urbana',[-32.9542, -60.6323]);
//         Bicicleta.add(a);

//         expect(Bicicleta.add.length).toBe(1); //estado posterior
//         expect(Bicicleta.allBicis[0]).toBe(a);
//     });
// });

// describe('Bicicleta.findById()', () => {
//     it('debe devolver la bici con id 1', () => {
//         expect(Bicicleta.allBicis.length).toBe(0);

//         var aBici = new Bicicleta(1,'rosa','urbana');
//         var aBici2 = new Bicicleta(2,'celeste','deportiva');
//         Bicicleta.add(aBici);
//         Bicicleta.add(aBici2);

//         var target = Bicicleta.findById(1);

//         expect(target.id).toBe(1);
//         expect(target.color).toBe(aBici.color);
//         expect(target.modelo).toBe(aBici.modelo);
//     });
// });

// describe('Bicicleta.removeById()', () => {
//     it('debe eliminar la bici con id 1', () => {
//         expect(Bicicleta.allBicis.length).toBe(0);

//         var aBici = new Bicicleta(1,'rosa','urbana');
//         var aBici2 = new Bicicleta(2,'celeste','deportiva');
//         Bicicleta.add(aBici);
//         Bicicleta.add(aBici2);

//         expect(Bicicleta.allBicis.length).toBe(2);

//         var target = Bicicleta.removeById(1);

//         expect(Bicicleta.allBicis.length).toBe(1);
//     });
// });