/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var str = require('underscore.string');

module.exports = yeoman.generators.Base.extend({
    initializing: function () {
        this.pkg = require('../package.json');
    },

    prompting: function () {
        var done = this.async();

        this.log(yosay(
            'Welcome to the riveting ' + chalk.red('Fluxible') + ' generator!'
        ));

        var prompts = [{
            type: 'input',
            name: 'name',
            default: this.appname,
            message: 'Whats the name of your project?',
            validate: function(input) {
                return !!input;
            }
        }];

        this.prompt(prompts, function (props) {
            this.displayName = props.name;
            this.name = str.slugify(props.name);

            done();
        }.bind(this));
    },

    writing: {
        config: function () {
            this.template('_editorconfig', '.editorconfig', this.context);
            this.template('_gitignore', '.gitignore', this.context);
            this.template('_jshintrc', '.jshintrc', this.context);
            this.template('_package.json', 'package.json', this.context);
        },

        projectfiles: function () {
            this.template('app.js', 'app.js', this.context);
            this.template('client.js', 'client.js', this.context);
            this.template('Gruntfile.js', 'Gruntfile.js', this.context);
            this.template('server.js', 'server.js', this.context);
            this.directory('actions', 'actions', this.context);
            this.directory('components', 'components', this.context);
            this.directory('configs', 'configs', this.context);
            this.directory('stores', 'stores', this.context);
        }
    },

    install: function () {
        this.installDependencies({
            npm: true,
            bower: false,
            skipInstall: this.options['skip-install']
        });
    }
});
