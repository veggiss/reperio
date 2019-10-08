const fs = require('fs');
const {google} = require('googleapis');
const credentials = require('./client_secret.json');
const PATH = '../src/assets/img/games/images';
const auth = new google.auth.JWT(
    credentials.client_email, null,
    credentials.private_key, [
        'https://www.googleapis.com/auth/drive'
    ]
);

const drive = google.drive({ version: 'v3', auth });

function fileExist(filePath) {
    return new Promise((resolve, reject) => {
        fs.access(filePath, fs.F_OK, (err) => {
            if (err) reject(err);
            else resolve(true);
        })
    });
}

function getListOfFiles(folderId) {
    return new Promise((resolve, reject) => {
        drive.files.list({
            q: `'${folderId}' in parents`
        }, (err, folder) => {
            if (err) reject(err);
            else resolve(folder.data.files);
        });
    });
}

function downloadFile(category, fileId, fileName) {
    return new Promise(async (resolve, reject) => {
        let filePath = `${PATH}/${category}/${fileName}`;
        
        fs.access(filePath, fs.F_OK, exist => {
            if (!exist) {
                resolve(false);
            } else {
                const dest = fs.createWriteStream(filePath);
                drive.files.get({fileId: fileId, alt: 'media'}, {responseType: 'stream'}, (err, res) => {
                    res.data.on('end', () => {
                        resolve(true);
                    }).on('error', err => {
                        reject(err);
                    }).pipe(dest);
                });
            }
        })
    });
}

async function getList() {
    let category = await getListOfFiles('1Fch2fzUggXFbTRvnnubu4xulJmCwua2A');
    let promises = [];
    
    category.forEach(async folder => {
        promises.push(getListOfFiles(folder.id));  
    });
    
    return new Promise(async (resolve, reject) => {
        Promise.all(promises)
            .then(files => {
                let list = [];
                
                files.forEach(cat => cat.forEach(file => {
                    list.push(file);
                }));
                
                resolve(list);
            }).catch((err) => reject(err));
    });
}

module.exports = {
    getList: getList,
    downloadFile: downloadFile
};

