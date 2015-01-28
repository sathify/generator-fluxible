/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('fluxible:app', function () {
    before(function (done) {
        helpers.run(path.join(__dirname, '../app'))
            .inDir(path.join(os.tmpdir(), './temp-test'))
            .withOptions({ 'skip-install': true })
            .withPrompt()
            .on('end', done);
    });

    it('creates files', function () {
        assert.file([
            'package.json',
            '.editorconfig',
            '.jshintrc',
            'app.js',
            'components/Application.jsx'
        ]);
    });
});
