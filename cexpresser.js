const fs = require('fs');

module.exports = async (path) => {
    if (!path) throw "Invalid Path Provided"
    try {
        let file = fs.readFile(path);
        if (!file) throw "No File Returned";
        if (!file.token) throw "No Token Within File"
        return file;
    } catch (e) {
        throw e;
    }
}