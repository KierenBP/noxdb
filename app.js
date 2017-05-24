const mysql = require('mysql');

const fetch = require('./lib/fetch');
const insert = require('./lib/insert');
const update = require('./lib/update');
const remove = require('./lib/remove');


function NoxDb({ host, port, user, password, database }) {
  this.connection = mysql.createConnection({
    host,
    port,
    user,
    password,
    dateStrings: 'date',
  });
  this.connection.query(`USE ${database}`);
}


// Database Fetch Function

NoxDb.prototype.fetch = function fetchDb({ table, select, count, where, orderby, limit, join }) {
  return fetch({
    table,
    select,
    count,
    where,
    orderby,
    limit,
    join,
    connection: this.connection,
  });
};

// Database Insert Function

NoxDb.prototype.insert = function insertDb({ table, values }) {
  return insert({
    table,
    values,
    connection: this.connection,
  });
};


// Database Update Function

NoxDb.prototype.update = function updateDb({ table, values, where }) {
  return update({
    table,
    values,
    where,
    connection: this.connection,
  });
};

// // Database Remove Function


NoxDb.prototype.remove = function removeDb({ table, where }) {
  return remove({
    table,
    where,
    connection: this.connection,
  });
};


module.exports = NoxDb;
