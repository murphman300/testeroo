const fs = require('fs');

module.exports = async (path) => {
    if (!path) throw "Invalid Path Provided"
    try {
        let file = fs.readFileSync(path);
        console.log(file);
        if (!file) throw "No File Returned";
        if (!file.token) throw "No Token Within File"
        return file;
    } catch (e) {
        throw e;
    }
}