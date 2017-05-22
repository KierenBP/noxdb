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


describe('Database functions', function() {
    // Fetch Database function
  describe('#fetch()', function() {
    it('should eventaully have array length of 1', function(done) {
        db.fetch({ table: 'test', select: '*' }).should.eventually.have.lengthOf(1).notify(done);
    });
    it('should eventually have an array with a object in it with the key of `rowname` and `testItem` for the key', function(done) {
        db.fetch({ table: 'test', select: 'rowname' }).should.eventually.deep.equal([ { rowname: 'testItem' } ]).notify(done);
    });
  });
});
