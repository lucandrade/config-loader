const fs = require('fs');
const _ = require('lodash');

let cache = {};
let configPath = './config';

const vars = {
    env: process.env.NODE_ENV || 'development'
};

function loadFile(filename) {
    const fullConfigPath = `${process.cwd()}/${configPath}`;

    if (fs.existsSync(`${fullConfigPath}/${filename}.js`) || fs.existsSync(`${fullConfigPath}/${filename}.json`)) {
        delete require.cache[require.resolve(`${fullConfigPath}/${filename}`)];
        return require(`${fullConfigPath}/${filename}`);
    }

    return null;
}

function getData(fileName) {
    if (cache.hasOwnProperty(fileName)) {
        return cache[fileName];
    }

    const data = loadFile(fileName);

    if (data) {
        cache[fileName] = data;
        return cache[fileName];
    }

    return vars;
}

function get(path, defaultValue) {
    const parts = path.split('.');
    const data = getData(parts.shift());

    if (data) {
        if (parts.length === 0) {
            return _.get(data, path, defaultValue || data);
        }

        return _.get(data, parts.join('.'), defaultValue);
    }

    return null;
}

function set(path, value) {
    if (path.split('.').length === 1) {
        _.set(vars, path, value);
    } else {
        _.set(cache, path, value);
    }
}

function path(path) {
    configPath = path;

    return config;
}

function clear() {
    cache = {};
    return config;
}

function config(name = null, defaultValue = null) {
    if (!name) {
        return {
            get,
            set,
            path,
            clear
        };
    }

    return get(name, defaultValue);
}

module.exports = config;
