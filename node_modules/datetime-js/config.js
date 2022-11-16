const DateTime = require('./src/datetime');
const fs = require('fs');
const dir = __dirname;
const pkg = require('./package.json');

const config = {
    pkg: pkg,
    dir: {
        base: dir,
        src: `${dir}/src`,
        dest: `${dir}/dist`
    }
};

config.banner = (() => {
    const yr = DateTime(new Date(), '%Y');
    return [
        '/**',
        `${pkg.name} v${pkg.version}`,
        `${pkg.description}`,
        `(c) ${yr} ${pkg.author}`,
        pkg.license
    ].join('\n* ') + '\n**/';
})();

module.exports = config;
