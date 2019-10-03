const GoogleSpreadsheet = require('google-spreadsheet');
const creds = require('./client_secret.json');
const PATH = '../src/app/services/database.json';
const { promisify } = require('util');
const fs = require('fs');
    
async function getSheet() {
    const document = new GoogleSpreadsheet('1ke_Lewq2kzbLWb-bFibLkmWgifSS-TZV72S0Nea5wgQ');
    await promisify(document.useServiceAccountAuth)(creds);
    
    const excludeKeys = ['app:edited', '_links', '_xml', 'save', 'del'];
    const info = await promisify(document.getInfo)();
    const sheet = info.worksheets[0];
    
    const rows = await promisify(sheet.getRows)();
    rows.forEach(obj => {
        excludeKeys.forEach(key => delete obj[key]);
        
        console.log(obj);
    });
    
    return rows;
}

getSheet().then(json => {
    fs.writeFileSync(PATH, JSON.stringify(json, null, 4), {encoding:'utf8'});
    console.log(`SUCCESS: Database written to ${PATH}`);
}).catch(err => console.log(err));