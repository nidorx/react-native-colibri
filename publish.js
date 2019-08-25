/**
 * Faz o build publicação no repositorio e tag do github.
 * 
 * O versionamento do package.json não é feito automaticamente, afim de permitir um maior controle sobre o deploy.
 * 
 * Os passos para usar esses script são:
 * 
 * 1 - Após fazer alterações de código, conduzir normalmente com os commits no git
 * 2 - No momento de fazer a publicação de uma versão, no terminal:
 *    a) git add --all
 *    b) git commit -m "Mensagem das alterações feitas"
 *    c) node ./publish.js
 */

const fs = require('fs');
const rimraf = require('rimraf');
const cpExec = require('child_process').exec;

function exec(command, callback) {
   callback = callback || function () { };

   return new Promise(function (accept, reject) {
      console.log('[' + command + ']');
      const com = cpExec(command);

      com.stdout.on('data', function (data) {
         console.log(data.toString());
      });

      com.stderr.on('data', function (data) {
         console.error(data.toString());
      });

      com.on('exit', function (code, signal) {
         if (signal) {
            reject({
               code: code,
               signal: signal
            });
            callback(code);
         } else {
            accept({
               code: code,
               signal: signal
            });
            callback(null, signal);
         }
      });
   });
}

var package = JSON.parse(fs.readFileSync(__dirname + '/package.json'));

rimraf('./dist', {}, function (err) {
   if (err) {
      throw err;
   }

   exec('npm run-script build')
      // publicação
      .then(publish.bind(undefined, 'web'))
      .then(publish.bind(undefined, 'react'))
      .then(publish.bind(undefined, 'node'))
      // commit e push
      .then(exec.bind(undefined, 'git add --all', null))
      .then(exec.bind(undefined, 'git commit -m "Publicação da versão v' + package.version + '"', null))
      .then(exec.bind(undefined, 'git push', null))
      .then(exec.bind(undefined, 'git tag v' + package.version, null))
      .then(exec.bind(undefined, 'git push --tags', null))
      .catch(err => {
         console.error(err);
      })
});

function publish(suffix) {

   package.main = 'dist/' + suffix + '.js';
   package.name = 'entangled-states' + (suffix === 'node' ? '' : ('-' + suffix));

   let peerDependencies;

   if (suffix === 'node') {
      peerDependencies = {
         "ws": "^6.1.3"
      };
   } else if (suffix === 'react') {
      peerDependencies = {
         "react-native": "*"
      };
   }

   package.peerDependencies = peerDependencies;

   fs.writeFileSync(__dirname + '/package.json', JSON.stringify(package, null, 3));

   console.log('Publicando artefato: ' + package.name + '@' + package.version);

   return exec('npm publish');
}
