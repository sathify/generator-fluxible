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
        },
        {
            type: 'list',
            name: 'buildSystem',
            default: 0,
            message: 'Which build system do you want to use?',
            choices: ['Grunt', 'Gulp']
        }];

        this.prompt(prompts, function (props) {
            this.displayName = props.name;
            this.name = str.slugify(props.name);
            this.buildSystem = str.slugify(props.buildSystem);
            done();
        }.bind(this));
    },

    writing: {
        config: function () {
            this.template('_editorconfig', '.editorconfig', this.context);
            this.template('_gitignore', '.gitignore', this.context);
            this.template('_eslintrc', '.eslintrc', this.context);
            this.template('_babelrc', '.babelrc', this.context);
            if(this.buildSystem === 'grunt'){
                this.template('_package_grunt.json', 'package.json', this.context);
            } else if (this.buildSystem === 'gulp'){
                this.template('_package_gulp.json', 'package.json', this.context);
            }
        },

        projectfiles: function () {
            this.template('app.js', 'app.js', this.context);
            this.template('client.js', 'client.js', this.context);
            if(this.buildSystem === 'grunt'){
                this.template('Gruntfile.js', 'Gruntfile.js', this.context);
            } else if (this.buildSystem === 'gulp'){
                this.template('gulpfile.js', 'gulpfile.js', this.context);
            }
            this.template('server.js', 'server.js', this.context);
            this.template('start.js', 'start.js', this.context);
            this.template('webpack.config.js', 'webpack.config.js', this.context);
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
