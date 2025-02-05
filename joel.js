const fs = require('fs');
if (fs.existsSync('joel.env')) require('dotenv').joel({ path: './joel.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}

module.exports = {
    OWNER_IMG: process.env.OWNER_IMG || "https://files.catbox.moe/yvf7h8.png",
    
