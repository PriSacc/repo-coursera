var Bicicleta = require('../../models/bicicleta');
var mongoose = require("mongoose");

describe("Testing bicis", function () {
    beforeEach(function (done) {
      var mongoDB = "mongodb://localhost/red_bicicletas";
      mongoose.connect(mongoDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true 
      });
      var db = mongoose.connection;
      db.on("error", console.error.bind(console, "MongoDB conecction error: "));
      db.once("open", function () {
        console.log("You are connected to test DB");
        done();
      });
    });
  
    afterEach(function (done) {
      Bicicleta.deleteMany({}, function (err, success) {
        if (err) console.log(err);
        mongoose.disconnect(err);
        done();
      });
    });
  
    describe("Bicicleta.createIntance", () => {
      it("Crea una instancia de bicicleta", () => {
        var bici = Bicicleta.createInstance(1, "verde", "urbana", [-34, -54]);
  
        expect(bici.code).toBe(1);
        expect(bici.color).toBe("verde");
        expect(bici.modelo).toBe("urbana");
        expect(bici.ubicacion[0]).toBe(-34);
        expect(bici.ubicacion[1]).toBe(-54);
      });
    });
  
    describe("Bicicleta.allBicis", () => {
      it("Comienza vacía", (done) => {
        Bicicleta.allBicis(function (err, bicis) {
          expect(bicis.length).toBe(0);
          done();
        });
      });
    });
  
    describe("Bicicleta.add", () => {
      it("Agrega solo una bici", (done) => {
        var abici = new Bicicleta({ code: 1, color: "verde", modelo: "urbana" });
        Bicicleta.add(abici, function (err, newBici) {
          if (err) console.log(err);
          Bicicleta.allBicis(function (err, bicis) {
            expect(bicis.length).toBe(1);
            expect(bicis[0].code).toBe(abici.code);
            done();
          });
        });
      });
    });
  
    describe("Bicicleta.findByCode", () => {
      it("Devolver la bici con codigo 1", (done) => {
        Bicicleta.allBicis(function (err, bicis) {
          expect(bicis.length).toBe(0);
  
          var abici = new Bicicleta({code: 1,color: "verde",modelo: "urbana",});
          Bicicleta.add(abici, function (error, newBici) {
            if (err) console.log(err);
  
            var abici2 = new Bicicleta({code: 2,color: "roja",modelo: "urbana",});
            Bicicleta.add(abici2, function (err, newBici) {
              if (err) console.log(err);
              Bicicleta.findByCode(1, function (err, targetBici) {
                expect(targetBici.code).toBe(abici.code);
                expect(targetBici.color).toBe(abici.color);
                expect(targetBici.modelo).toBe(abici.modelo);
                done();
              });
            });
          });
        });
      });
    });
  
    describe("Bicicleta.removeByCode", () => {
      it("Eliminar la bici con codigo 1", (done) => {
        Bicicleta.allBicis(function (err, bicis) {
          expect(bicis.length).toBe(0);
          var abici = new Bicicleta({code: 1, color: "verde", modelo: "urbana",});
          Bicicleta.add(abici, function (err, newBici) {
            if (err) console.log(err);
            Bicicleta.removeByCode(1, function (err) {
              Bicicleta.allBicis(function () {
                expect(bicis.length).toBe(0);
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