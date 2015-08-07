var current_version = 121;
var version;

require('nw.gui').Window.get().showDevTools();

var gui = require('nw.gui');
var win = gui.Window.get();

var fs = require('fs'),
    path = require('path'),
    https = require('https'),
    sys = require('util'),
    exec = require('child_process').exec;

var mod_dir = path.join(gui.App.dataPath, 'mods'),
    mod_dir_ls = fs.readdirSync(mod_dir);
    
fs.createReadStream(mod_dir + '/mods.js').pipe(fs.createWriteStream(main_dir + 'mods.js'));

var main_dir_index = global.module.filename,
    main_dir = main_dir_index.replace('/load.html', '/');

var download = function(url, dest, cb) {
  var file = fs.createWriteStream(dest);
  var request = https.get(url, function(response) {
    response.pipe(file);
    file.on('finish', function() {
      file.close(cb);  // close() is async, call cb after close completes.
      console.log('Download complete : ' + url);
      document.write('<html style="background: #333333"><h2 style="font-family: Courier New; color: #fff;">Download complete : ' + url + '</h2></html>');
    });
  }).on('error', function(err) { // Handle errors
    fs.unlink(dest); // Delete the file async. (But we don't check the result)
    if (cb) cb(err.message);
  });
};

download('https://raw.githubusercontent.com/DoubloonDevs/SnoopSlayer/gh-pages/downloads/windows/download.DATA', main_dir + 'download.DATA');
setTimeout(function() {
  version = fs.readFileSync('download.DATA', 'utf8');
  if (version > current_version) {
    download('https://raw.githubusercontent.com/DoubloonDevs/SnoopSlayer/gh-pages/downloads/windows/init.js', main_dir + 'init.js');
    download('https://raw.githubusercontent.com/DoubloonDevs/SnoopSlayer/gh-pages/downloads/windows/Game.js', main_dir + 'Game.js');
    download('https://raw.githubusercontent.com/DoubloonDevs/SnoopSlayer/gh-pages/downloads/windows/ClientInput.js', main_dir + 'ClientInput.js');
    download('https://raw.githubusercontent.com/DoubloonDevs/SnoopSlayer/gh-pages/downloads/windows/styles.css', main_dir + 'styles.css');
    download('https://raw.githubusercontent.com/DoubloonDevs/SnoopSlayer/gh-pages/downloads/windows/LoadMedia.js', main_dir + 'LoadMedia.js');
    download('https://raw.githubusercontent.com/DoubloonDevs/SnoopSlayer/gh-pages/downloads/windows/index.html', main_dir + 'index.html');
    download('https://raw.githubusercontent.com/DoubloonDevs/SnoopSlayer/gh-pages/downloads/windows/package.json', main_dir + 'package.json');
  }
}, 1000);

setTimeout(function() {
  //self.location = 'index.html';
}, 2000);