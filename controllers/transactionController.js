const { Transaction } = require('../models')

class TransactionController {
    static createTransaction (req, res, next) {
        const { products, order_id, totalPrice } = req.body
        const { id } = req.currentUser
        Transaction.create({
            UserId: id,
            products: products,
            order_id: order_id,
            totalPrice: totalPrice
        })
            .then((data) => {
                res.status(201).json({
                    id: data.id,
                    UserId: data.UserId,
                    products: data.products,
                    order_id: data.order_id,
                    totalPrice: data.totalPrice
                })
            })
            .catch((err) => {
                next(err)
            })
    }

    static readTransactions (req, res, next) {
        const { id } = req.currentUser
        Transaction.findAll({
            where: {
                UserId: id
            }
        })
            .then((data) => {
                const arr = []
                for (let i = 0; i < data.length; i++) {
                    arr.push({
                        id: data[i].id,
                        UserId: data[i].UserId,
                        products: data[i].products,
                        order_id: data[i].order_id,
                        totalPrice: data[i].totalPrice
                    })
                }
                res.status(200).json({
                    transactions: arr
                })
            })
            .catch((err) => {
                next(err)
            })
    }

    static readOneTransaction (req, res, next) {
        Transaction.findOne({
            where: {
                id: Number(req.params.id)
            }
        })
            .then((data) => {
                res.status(200).json({
                    id: data.id,
                    UserId: data.UserId,
                    products: data.products,
                    order_id: data.order_id,
                    totalPrice: data.totalPrice
                })
            })
            .catch((err) => {
                next(err)
            })
    }
}

module.exports = TransactionController