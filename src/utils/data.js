import fs from 'fs';

class Data {
    constructor(path) {
        this.path = path;
    }

    readData() {
        let rawdata = fs.readFileSync(this.path);
        let readData = JSON.parse(rawdata);
    
        return readData;
    }
    
    writeData(data) {
        let jsonData = JSON.stringify(data);
        fs.writeFileSync(this.path, jsonData);
    }
}

export default Data;

