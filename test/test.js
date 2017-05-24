const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

const should = require('chai').should();
const expect = require('chai').expect();

// Import Module
const NoxDb = require('./../app');

// Setup Connection
const db = new NoxDb({
    host: process.env.HOST || '127.0.0.1',
    port: process.env.PORT || 3306,
    user: process.env.DBUSER || 'root',
    password: process.env.DBPASS || '',
    database: process.env.DATABASE || 'test'
})

// Random gen value to insert into database
let randomGen = 'testData' + (Math.floor(Math.random() * 20) + 1).toString();
let randomGenUpdate = 'updatedTestData' + (Math.floor(Math.random() * 20) + 1).toString();


describe('Database functions', function() {
    // Fetch Database function
  describe('#fetch()', function() {
    it('should eventaully have array length of 1', function(done) {
        db.fetch({ table: 'test', select: ['rowname'], where: [{col: 'rowname', value: 'testItem'}]  }).should.eventually.have.lengthOf(1).notify(done);
    });
    it('should eventually have an array with a object in it with the key of `rowname` and `testItem` for the key', function(done) {
        db.fetch({ table: 'test', select: ['rowname'], where: [{col: 'rowname', value: 'testItem'}]  }).should.eventually.deep.equal([ { rowname: 'testItem' } ]).notify(done);
    });
  });
      // Insert Database function
  describe('#insert()', function() {
    it('should eventaully add value:' + randomGen + ' to database', function(done) {
        db.insert({ table: 'test', values: { rowname: randomGen }}).then(() => {
            done();
        }).catch(err => done(err));
    });
    it('should eventually have an array with a object in it with the key of `rowname` and ' + randomGen + ' for the key', function(done) {
        db.fetch({ table: 'test', select: ['rowname'], where: [{col: 'rowname', value: randomGen}] }).should.eventually.deep.equal([ { rowname: randomGen } ]).notify(done);
    });
  });
      // Update Database function
  describe('#update()', function() {
    it('should eventaully update value:' + randomGen + ' to ' + randomGenUpdate, function(done) {
        db.update({ table: 'test', values: { rowname: randomGenUpdate }, where: { rowname: randomGen }}).then(() => {
            done();
        }).catch(err => done(err));
    });
    it('should eventually have an array with a object in it with the key of `rowname` and ' + randomGenUpdate + ' for the key', function(done) {
        db.fetch({ table: 'test', select: ['rowname'], where: [{col: 'rowname', value: randomGenUpdate}] }).should.eventually.deep.equal([ { rowname: randomGenUpdate } ]).notify(done);
    });
  });
      // Remove Database function
  describe('#remove()', function() {
    it('should eventaully remove value:' + randomGenUpdate + ' from database', function(done) {
        db.remove({ table: 'test', where: { rowname: randomGenUpdate }}).then(() => {
            done();
        }).catch(err => done(err));
    });
    it('should eventually have an empty array', function(done) {
        db.fetch({ table: 'test', select: ['rowname'], where: [{col: 'rowname', value: randomGenUpdate}] }).should.eventually.deep.equal([]).notify(done);
    });
  });
});
