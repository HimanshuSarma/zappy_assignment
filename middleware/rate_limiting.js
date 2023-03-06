const { client } = require('../redis/config')

const rateLimiting = ({expiry, maxRequests}) => {
    return async function (req, res, next) {
        const ip = (req.headers[`x-forwarded-for`] || req.connection.remoteAddress);
        const totalRequests = await client.incr(ip);
        if (totalRequests === 1) {
            await client.expire(ip, expiry);
        }

        console.log(8, totalRequests);

        if (totalRequests > maxRequests) {
            return res.status(500).send({
                success: false,
                message: `Too many requests. Please try after some time`
            })
        }

        next();
    }
    
}   

module.exports = {
    rateLimiting
}
