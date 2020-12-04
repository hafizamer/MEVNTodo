require('dotenv').config({ path: '.env' });

module.exports={
    mongoUri: process.env.VUE_APP_APIKEY,
    PORT: process.env.VUE_APP_PORT || 3001,
}