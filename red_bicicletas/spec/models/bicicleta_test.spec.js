var Bicicleta = require('../../models/bicicleta');

beforeEach(() => { Bicicleta.allBicis = []})  //resetear la coleccion
describe('Bicicleta.allBicis()', () => {
    it('comienza vacia', () => {
        expect(Bicicleta.allBicis.length).toBe(0);
    });
});

describe('Bicicleta.add()', () => {
    it('agrega una', () => {
        expect(Bicicleta.allBicis.length).toBe(0); //estado previo

        var a = new Bicicleta(1,'rojo','urbana',[-32.9542, -60.6323]);
        Bicicleta.add(a);

        expect(Bicicleta.add.length).toBe(1); //estado posterior
        expect(Bicicleta.allBicis[0]).toBe(a);
    });
});

describe('Bicicleta.findById()', () => {
    it('debe devolver la bici con id 1', () => {
        expect(Bicicleta.allBicis.length).toBe(0);

        var aBici = new Bicicleta(1,'rosa','urbana');
        var aBici2 = new Bicicleta(2,'celeste','deportiva');
        Bicicleta.add(aBici);
        Bicicleta.add(aBici2);

        var target = Bicicleta.findById(1);

        expect(target.id).toBe(1);
        expect(target.color).toBe(aBici.color);
        expect(target.modelo).toBe(aBici.modelo);
    });
});

describe('Bicicleta.removeById()', () => {
    it('debe eliminar la bici con id 1', () => {
        expect(Bicicleta.allBicis.length).toBe(0);

        var aBici = new Bicicleta(1,'rosa','urbana');
        var aBici2 = new Bicicleta(2,'celeste','deportiva');
        Bicicleta.add(aBici);
        Bicicleta.add(aBici2);

        expect(Bicicleta.allBicis.length).toBe(2);

        var target = Bicicleta.removeById(1);

        expect(Bicicleta.allBicis.length).toBe(1);
    });
});