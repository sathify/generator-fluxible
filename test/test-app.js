/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
/*globals describe,before,it*/

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('fluxible:app', function () {
    describe('grunt build', function () {
        before(function (done) {
            helpers.run(path.join(__dirname, '../app'))
                .inDir(path.join(os.tmpdir(), './temp-test'))
                .withOptions({ 'skip-install': true })
                .withPrompt({buildSystem: 'grunt'})
                .on('end', done);
        });

        it('creates files', function () {
            assert.file([
                'package.json',
                'Gruntfile.js',
                '.editorconfig',
                '.eslintrc',
                'app.js',
                'components/Application.js'
            ]);
        });
    });

    describe('gulp build', function () {
        before(function (done) {
            helpers.run(path.join(__dirname, '../app'))
                .inDir(path.join(os.tmpdir(), './temp-test'))
                .withOptions({ 'skip-install': true })
                .withPrompt({buildSystem: 'gulp'})
                .on('end', done);
        });

        it('creates files', function () {
            assert.file([
                'package.json',
                'gulpfile.js',
                '.editorconfig',
                '.eslintrc',
                'app.js',
                'components/Application.js'
            ]);
        });
    });
});
