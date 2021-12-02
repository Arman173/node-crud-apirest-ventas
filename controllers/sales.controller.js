const { request, response } = require('express');
const Sale = require('../models/sale.schema');


const test = ( req = request, res = response ) => {
    res.json({ message: 'Api Rest Working' });
}

const addSale = ( req = request, res = response ) => {
    let sale = new Sale();

    const { Date, Description = 'none description', Amount = 0, Status = 0, Paid = '' } = req.body;

    sale.Date = Date;
    sale.Description = Description;
    sale.Amount = Amount;
    sale.Status = Status;
    sale.Paid = Paid;

    sale.save( ( err, saleStored ) => {
        if( err ) return res.status(500).send({ message: 'Error to save the sale' });

        if( !saleStored ) return res.status(404).send({ message: 'The sale could not be saved' });

        return res.status(200).send({ sale: saleStored });
    });
}

const getSale = ( req = request, res = response ) => {
    const { id } = req.params;

    if( !id ) return res.status(404).send({ message: 'The id is invalid' });

    Sale.findById( id, ( err, sale ) => {
        if( err ) return res.status(500).send({ message: 'Error to try get sale' });

        if( !sale ) return res.status(404).send({ message: 'No sale to show' });

        return res.status(200).send({ sale });
    });
}

const getSales = ( req = request, res = response ) => {
    Sale.find({}).sort('Date').exec( ( err, sales ) => {
        if( err ) return res.status(500).send({ message: 'Error to return data' });

        if( !sales ) return res.status(404).send({ message: 'No sales to show' });
        
        return res.status(200).send({ sales });
    });
}

const updateSale = ( req = request, res = response ) => {
    const sale = req.body;

    if( !sale ) return res.status(404).send({ message: 'The sale is invalid', body: req.body });

    Sale.findByIdAndUpdate(sale._id, sale, {new: true}, ( err, saleUpdated ) => {
        if( err ) return res.status(500).send({ message: 'Error to update' });

        if( !saleUpdated ) return res.status(404).send({ message: 'Could not find/update the sale' });

        return res.status(200).send({
            sale: saleUpdated
        });
    });
}

const deleteSale = ( req = request, res = response ) => {
    const { id } = req.params;

    if( !id ) return res.status(404).send({ message: 'The id is invalid' });

    Sale.findByIdAndRemove(id, ( err, saleDeleted ) => {
        if( err ) return res.status(500).send({ message: 'The sale couldnt be deleted' });

        if( !saleDeleted ) return res.status(404).send({ message: 'This sale cant be delete' });

        return res.status(200).send({
            sale: saleDeleted
        });
    });
}


module.exports = {
    test,
    addSale,
    getSale,
    getSales,
    updateSale,
    deleteSale
}