/**
 * Altera a versão para SNAPSHOT antes do build
 */
const fs = require('fs');
const semver = require('semver');

let packageJson = require('./package.json');

// No formato '0.1.0', '0.2.0'
let release = '0.0.0';

// No formato '0.1.0-pre.0', '0.1.0-pre.1', '0.1.0-pre.2'
let snapshot = '0.0.0';
let version = packageJson.version;
if (semver.prerelease(version)) {
    // Pre-release
    if (semver.gt(version, snapshot)) {
        snapshot = version;
    }
} else if (semver.gt(version, release)) {
    release = version;
}

// Se não possui snapshot da versão atual, zera para garantir o uso do preminor
if (semver.gt(release, snapshot)) {
    snapshot = '0.0.0';
}

// Numero da nova versão SNAPHSOT (pre)
// Se já possui um prerelease, apenas incrementa a versão do snapshot
// Ex. Se existir '0.1.0-pre.0', a proxima será '0.1.0-pre.1'
if (snapshot !== '0.0.0') {
    version = semver.inc(snapshot, 'prerelease', 'pre');
} else {
    version = semver.inc(release, 'preminor', 'pre');
}

console.log('Incrementing react-native-colibri version to: "' + version + '"');

packageJson.version = version;

fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, 4));
