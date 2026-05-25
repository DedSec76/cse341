const Util = {}

Util.handleErrors = fn => (req, res, next) => 
    Promise.resolve(fn(req, res, next)).catch(next)

Util.validation = (schema) => async (req, res, next) => {
    const result = await schema.safeParseAsync(req.body)

    if(!result.success) {
        return res.status(400).json({
            success: false,
            error: result.error.flatten()
        })
    }

    req.body = result.data 

    next()
}   

module.exports = Util

