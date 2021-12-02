const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SaleSchema = Schema({
    Date:          String,
    Description:   String,
    Amount:        Number,
    Status:        Number,
    Paid:          String
});

module.exports = mongoose.model( 'Sale', SaleSchema );
