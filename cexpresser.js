const fs = require('fs');

module.exports = async (path) => {
    if (!path) throw "Invalid Path Provided"
    try {
        let buff = fs.readFileSync(path), file1 = await JSON.stringify(buff), file = await JSON.parse(file1);
        if (!file) throw "No File Returned";
        if (!file.token) throw "No Token Within File"
        return file;
    } catch (e) {
        throw e;
    }
}