const GoogleSpreadsheet = require('google-spreadsheet');
const creds = require('./client_secret.json');
const { getList, downloadFile } = require('./googledrive');
const PATHS = {
    'finn-ordet': '../src/app/services/finn-ordet.json',
    'finn-bildet': '../src/app/services/finn-bildet.json',
    'ord-deling': '../src/app/services/ord-deling.json',
    'sant-usant': '../src/app/services/sant-usant.json'
};
const { promisify } = require('util');
const fs = require('fs');
const convert = {
    'int': e => parseInt(e),
    'arr': e => e.split(',').map(str => str.trim())
};
    
async function getSheet(title) {
    const document = new GoogleSpreadsheet('1ke_Lewq2kzbLWb-bFibLkmWgifSS-TZV72S0Nea5wgQ');
    await promisify(document.useServiceAccountAuth)(creds);
    
    const excludeKeys = ['app:edited', '_links', '_xml', 'save', 'del'];
    const info = await promisify(document.getInfo)();
    const sheet = info.worksheets.find(e => e.title === title);    
    const rows = await promisify(sheet.getRows)();
    
    rows.forEach(obj => {
        excludeKeys.forEach(key => delete obj[key]);

        Object.keys(obj).forEach(key => {
            let keyType = key.split('.');
            
            if (keyType.length > 1) {
                if (Object.keys(convert).includes(keyType[1])) {
                    obj[keyType[0]] = convert[keyType[1]](obj[key]);
                    delete obj[key];
                }
            }
        })
    });
    
    return rows;
}

function runImport() {
    let arg = process.argv.slice(2)[0];
    let PATH = PATHS[arg];
    
    if (PATH) {
        getSheet(arg).then(async json => {            
            fs.writeFileSync(PATH, JSON.stringify(json, null, 4), {encoding: 'utf8'});
            console.log(`Database written to ${PATH}`);
            console.log('...proceeding to download images');
    
            let fileList = await getList();
            let nameList = fileList.map(file => file.name);
            let filesCreated = 0;    
            
            for (let image of json) {
                if (image.src) {
                    if (nameList.includes(image.src)) {
                        let file = fileList.filter(e => e.name === image.src)[0];
                        let created = await downloadFile(image.category, file.id, file.name);
                        if (created) filesCreated++;
                    } else {
                        console.log(`Image "src: ${image.src}, id: ${image.id}" does not exists!`);
                    }
                }
            }
    
            console.log(`Downloaded ${filesCreated} files`);
        }).catch(err => console.log(err));
    } else {
        console.log(`INVALID ARGUMENT => ${Object.keys(PATHS)}`);
    }
}

runImport();