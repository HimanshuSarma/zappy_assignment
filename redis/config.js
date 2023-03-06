const { createClient } = require('redis');

const client = createClient({
    url: `redis://default:am1ql7QFyGHNSaPD6mnucyupmhAQ7V2b@redis-14470.c283.us-east-1-4.ec2.cloud.redislabs.com:14470`
});

client.on('error', err => console.log('Redis Client Error', err));

const handler = async () => {
    await client.connect();
}

handler();
module.exports = {
    client
}

