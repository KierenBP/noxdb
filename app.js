const mysql = require('mysql');

const fetch = require('./lib/fetch');
const insert = require('./lib/insert');
const update = require('./lib/update');
const remove = require('./lib/remove');


function NoxDb(host, port, user, password, database) {
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

NoxDb.prototype.fetch = ({ table, select, count, where, orderby, limit, join }) => fetch({
  table,
  select,
  count,
  where,
  orderby,
  limit,
  join,
  connection: this.connection,
});

// Database Insert Function

NoxDb.prototype.insert = ({ table, values }) => insert({
  table,
  values,
  connection: this.connection,
});



// Database Update Function

NoxDb.prototype.update = ({ table, values, where }) => update({
  table,
  values,
  where,
  connection: this.connection,
});



// // Database Remove Function

NoxDb.prototype.remove = ({ table, where }) => remove({
  table,
  where,
  connection: this.connection,
});


module.exports = NoxDb;
