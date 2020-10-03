var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var schemaActual = new Schema({
    listItem: {type: String},
    timestamp: {type: String}
}, {collection: 'todo_list'});

exports.schemaActual = schemaActual;
