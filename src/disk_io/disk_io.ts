

async function writeToFile(path: string, data: Object): Promise<void> {
    const fs = require('fs');
    fs.writeToFile(path, data);
}

function readFromFile(path: string): Object {
    const fs = require('fs');
    return fs.readFromFile(path);
}