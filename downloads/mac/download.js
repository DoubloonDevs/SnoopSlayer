var current_version = 120;
var version = 121;
var updates = true;

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
    main_dir = main_dir_index.replace('/index.html', '/');

var download = function(url, dest, cb) {
  var file = fs.createWriteStream(dest);
  var request = https.get(url, function(response) {
    response.pipe(file);
    file.on('finish', function() {
      file.close(cb);  // close() is async, call cb after close completes.
    });
  }).on('error', function(err) { // Handle errors
    fs.unlink(dest); // Delete the file async. (But we don't check the result)
    if (cb) cb(err.message);
  });
};

require('dns').resolve('www.google.com', function(err) {
  if (err)
    updates = false;
  else 
    updates = true;
});

if (updates) {
  download('https://raw.githubusercontent.com/DoubloonDevs/SnoopSlayer/gh-pages/downloads/mac/download.DATA', main_dir + 'download.DATA');
  version = fs.readFileSync('download.DATA', 'utf8');
  if (version > current_version) {
    download('https://raw.githubusercontent.com/DoubloonDevs/SnoopSlayer/gh-pages/downloads/mac/init.js', main_dir + 'init.js');
    download('https://raw.githubusercontent.com/DoubloonDevs/SnoopSlayer/gh-pages/downloads/mac/Game.js', main_dir + 'Game.js');
    download('https://raw.githubusercontent.com/DoubloonDevs/SnoopSlayer/gh-pages/downloads/mac/styles.css', main_dir + 'styles.css');
    download('https://raw.githubusercontent.com/DoubloonDevs/SnoopSlayer/gh-pages/downloads/mac/LoadMedia.js', main_dir + 'LoadMedia.js');
    download('https://raw.githubusercontent.com/DoubloonDevs/SnoopSlayer/gh-pages/downloads/mac/index.html', main_dir + 'index.html');
    download('https://raw.githubusercontent.com/DoubloonDevs/SnoopSlayer/gh-pages/downloads/mac/package.json', main_dir + 'package.json');
  }
}
setInterval(function() {
  self.location = "index.html";
}, 1000);