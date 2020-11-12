var Bicicleta = require('../../models/bicicleta');
var request = require('request');
var server = require('../../bin/www'); //para que apague y prenda el server cuando corren los test y terminan 

beforeEach(() => { Bicicleta.allBicis = []})
describe('Bicicleta API', () => {
    describe('GET BICICLETAS /', () => {
        it('Estado 200', () => {
            expect(Bicicleta.allBicis.length).toBe(0);

            var a = new Bicicleta(1,'rojo','urbana',[-32.9542, -60.6323]);
            Bicicleta.add(a);

            request.get('http://localhost:3000/api/bicicletas', function(error, response, body) {
                expect(response.statusCode).toBe(200);
            });
        });
    });

    describe('POST BICICLETAS /create', () => {
        it('Estado 200', (done) => {
            var head = {'content-type' : 'application/json'};
            var aBici = '{"id":10, "color":"rojo", "modelo":"urbana", "lat":-32.44,"lng":-60.44}';
            request.post({
                headers: head,
                url: 'http://localhost:3000/api/bicicletas/create',
                body: aBici
            }, function(error, response, body) {
                expect(response.statusCode).toBe(200);
                expect(Bicicleta.findById(10).color).toBe("rojo");
                done(); //lo que espera jasmine para terminar el test, tner algo que le diga a jasmine que espere hasta que temrine el request
            });
        });
    });

    describe('DELETE BICICLETAS /delete', () => {
        it('Estado 204', (done) => {
            var a = new Bicicleta(1,'rojo','urbana',[-32.95, -60.23]);
            var b = new Bicicleta(1,'rojo','urbana',[-32.42, -60.63]);
            Bicicleta.add(a);
            Bicicleta.add(b);

            var head = {'content-type' : 'application/json'};
            var aBici = '{"id":1}';

            request.delete({
                headers: head,
                url: 'http://localhost:3000/api/bicicletas/delete',
                body: aBici
            }, function(error, response, body) {
                expect(response.statusCode).toBe(204);
                expect(Bicicleta.allBicis.length).toBe(1);
                done();
            });
        });
    });

    describe('UPDATE BICICLETAS /update', () => {
        it('Estado 200', (done) => {
            var head = {'content-type' : 'application/json'};
            var aBici = '{"id":10, "color":"azul", "modelo":"urbana", "lat":-32.9542,"lng":-60.6323}';
            var a = new Bicicleta(10,'rojo','urbana',[-32.9542, -60.6323]);
            Bicicleta.add(a);

            request.post({
                headers: head,
                url: 'http://localhost:3000/api/bicicletas/update',
                body: aBici
            }, function(error, response, body) {
                expect(response.statusCode).toBe(200);
                expect(Bicicleta.findById(10).color).toBe("azul");
                done();
            });
        });
    });

});