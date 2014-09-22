/*!
 * gulp-dedupe, https://github.com/hoho/gulp-dedupe
 * (c) 2014 Marat Abdullin, MIT license
 */

'use strict';

var through = require('through');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;
var path = require('path');
var defaults = require('lodash.defaults');


module.exports = function(options) {
    var filesMap = {};

    options = defaults(options || {}, {
        error: false, // Throw an error in case of duplicate.
        same: true // Throw an error in case duplicates have different contents.
    });

    function bufferContents(file) {
        if (file.isNull()) { return; }
        if (file.isStream()) { return this.emit('error', new PluginError('gulp-dedupe', 'Streaming not supported')); }

        var fullpath = path.resolve(file.path),
            f;

        if ((f = filesMap[fullpath])) {
            if (options.error) {
                this.emit('error', new PluginError('gulp-dedupe', 'Duplicate `' + file.path + '`'));
            } else if (options.same && file.contents.toString() !== f.contents.toString()) {
                this.emit('error', new PluginError('gulp-dedupe', 'Duplicate file `' + file.path + '` with different contents'));
            }
            return;
        } else {
            filesMap[fullpath] = file;
        }
        this.emit('data', file);
    }

    function endStream() {
        this.emit('end');
    }

    return through(bufferContents, endStream);
};
