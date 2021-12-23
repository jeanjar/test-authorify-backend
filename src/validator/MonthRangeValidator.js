const InvalidMontException = require('../utils/exceptions/InvalidMonthException')

module.exports = function isValid(month) {
    if (month < 0 || month > 11) {
        throw new InvalidMontException
    }
}