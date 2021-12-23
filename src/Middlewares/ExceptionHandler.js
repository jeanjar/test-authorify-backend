module.exports = function ExceptionHandler(error, request, response, next) {
    response.status(500).send({error: error.message})
}