'use strict';

module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    copy: {
      main: {
        files: [
          { expand: true, cwd: 'src/', src: ['**'], dest: 'build/package/' },
          {
            expand: true,
            cwd: 'assets/icons/',
            src: ['**'],
            dest: 'build/package/icons/',
          },
          {
            expand: true,
            cwd: 'node_modules/qrcode/build/',
            src: 'qrcode.min.js',
            dest: 'build/package/lib/',
          },
          { src: 'manifest.json', dest: 'build/package/' },
        ],
      },
    },
    zip: {
      main: {
        srcPath: 'build/package/',
        packageName: '<%= pkg.name %>',
        archiveName: '<%= pkg.name %>.zip',
      },
    },
  });

  grunt.registerMultiTask('zip', function () {
    const done = this.async();

    const archiveName = this.data.archiveName;
    const packageName = this.data.packageName;
    const srcPath = this.data.srcPath;

    const fs = require('fs');
    const archiver = require('archiver');

    const output = fs.createWriteStream(__dirname + '/build/' + archiveName);
    const archive = archiver('zip', { zlib: { level: 9 } });

    output.on('close', function () {
      grunt.log.writeln(
        'Zip file for ' +
          packageName +
          ' created (' +
          archive.pointer() +
          ' bytes)'
      );
      done(true);
    });

    archive.on('warning', function (err) {
      if (err.code === 'ENOENT') {
        // Need to perform better handling, but for now this works.
        grunt.log.writeln(err);
      } else {
        grunt.log.writeln(err);
      }
    });

    archive.on('error', function (err) {
      done(err);
    });

    archive.pipe(output);
    archive.directory(srcPath, false);
    archive.finalize();
  });

  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('build', ['copy:main', 'zip:main']);
};
