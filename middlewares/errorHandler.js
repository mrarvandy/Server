function errHandler (err, req, res, next) {
    if (err.name === 'SequelizeValidationError') {
        const arr = []
        for (let i = 0; i < err.errors.length; i++) {
            arr.push(err.errors[i].message)
        }
        const message = arr.join(', ')
        res.status(400).json({
            message: message
        })
    } else if (err.name === 'SequelizeUniqueConstraintError') {
        const arr = []
        for (let i = 0; i < err.errors.length; i++) {
            arr.push(err.errors[i].message)
        }
        const message = arr.join(', ')
        res.status(400).json({
            message: message
        })
    } else if (err.name === 'JsonWebTokenError') {
        res.status(401).json({
            message: 'Not Authenticated'
        })
    } else if (err.code) {
        res.status(err.code).json({
            message: err.message
        })
    } else {
        res.status(500).json({
            message: 'Internal Server Error'
        })
    }
}

module.exports = errHandler