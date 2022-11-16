
const config = require('./config');
const fs = require('fs');
const uglify = require("uglify-js");
const log = console.log;

// create distribution dir
(() => {

    ((dir) => {
        if (!fs.statSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
    })(`${config.dir.dest}`);

    const srcPath = `${config.dir.src}/datetime.js`;
    const destPath = `${config.dir.dest}/datetime.js`;

    // copy
    log('copying..');
    write(destPath, [config.banner, read(srcPath)].join('\n'));

    log('generating minified..');
    // uglify
    let res = uglify.minify(read(destPath), {
        output: {
            preamble: config.banner
        }
    });
    write(`${config.dir.dest}/datetime.min.js`, res.code);
    log('done!');
})();

function read(path) {
    return fs.readFileSync(path, { encoding: 'utf8' });
}

function write(path, content) {
    fs.writeFileSync(path, content, { encoding: 'utf8', flag: 'w' });
}
