# NoxDB - A MySQLjs Wrapper
[![Travis](https://img.shields.io/travis/KierenBP/noxdb.svg)]()
[![npm](https://img.shields.io/npm/v/noxdb.svg)]()
[![license](https://img.shields.io/github/license/kierenbp/noxdb.svg)]()


A small wrapper for [MySQL.js](https://github.com/mysqljs/mysql). Contains the most basic queries and was mainly built for use in quick projects that don't need a lot of heavy MySQL queries.

# Install Instructions 
YarnPkg: `yarn add noxdb`

NPM: `npm install --save noxdb`

# Database Functions
`const NoxDb = require('noxdb');`

    const db = new NoxDB({
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: '',
        database: 'test'
    })


## Fetch - Get table content - Returns array that contains the rows in objects
### Select Query

`db.fetch({params})` (Promise)

Params:

`table` - Table to query - *string*

    'table'

`select` - Columns to select - *Array that contains strings that match column names*

    ['column', 'column']
    
`count` - Columns to count - *Array that contains strings that match column names* 

    ['column', 'column']

`where` - specify row/s - *Array of objects* 

    {
      col: `Name of column`,
      value: `Value in column`
    }

`orderby` - Order query by - *Array of objects* 

    {
      col: `Name of column to order by`, 
      order: `Order By (asc, desc)`
    }

`limit` - Limit by (and offset) - *Object* 

    { 
      `offset`: `Offset amount`, `amount`: `Amount of rows`
    }

`join` - JOIN other tables to the query - *Object*

    {
      type: `Type of JOIN (LEFT JOIN, RIGHT JOIN, JOIN etc.)`,
      table: `Table to join`,
      col: `Colum to combine from joining table`,
      value: `Normally a column on existing table to combine with (eg. userid to userid)`
    }

## Insert
### Insert Query - Insert into selected table - Returns an object that contains the insert id

`db.insert({params})`  (Promise)

Params:

`table` - Table to query - *string*

    'table'

`values` - Values to insert into table - *Object. Keys name of column, props value to put into column*

    {
     column: `Value in column`
    }

## Update
### Update Query - Update a selected column - Returns object

`db.update({params})`  (Promise)

Params:

`table` - Table to query - *string*

    'table'

`values` - Values to update on specified column  - *Object. Keys name of column, props value to put into column*

    {
     column: `New Value in column`
    }

`where` - target row/s you want to update - *Object. Keys name of column, props value that you are searching for*

    {
     column: `Value in column`
    }

## Delete
### Delete Query - Update a selected column - Returns object

`db.delete({params})`  (Promise)

Params:


`table` - Table to query - *string*

    'table'
`where` - target row/s you want to delete - *Object. Keys name of column, props value that you are searching for*

    {
     column: `Value in column`
    }