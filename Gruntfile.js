module.exports = function(grunt) {
    'use strict';
    require('load-grunt-tasks')(grunt);


    grunt.initConfig({
        clean: ['dist/**/*'],
        copy: {
            dev: {
			    expand: true,
			    cwd: 'assets/fonts/',
			    src: '**',
			    dest: 'dist/fonts',
			    flatten: true,
			    filter: 'isFile',
            }
        },

        sass: {
            dist: {
                options: {
                    style: 'compressed',
                    sourcemap: 'none'
                },
                files: {
                    'dist/css/app.min.css': 'src/sass/app.scss',
                }
            }
        },
        jade: {
            compile: {
                options: {
                    client: false,
                    pretty: true
                },
                files: [{
                    cwd: "src/jade",
                    src: "*.jade",
                    dest: "dist/html",
                    expand: true,
                    ext: ".html"
                }]
            }
        },

        concat:{
            options: {
                separator: ';',
            },
                dist: {
                    src: ['src/js/jquery-1.12.3.min.js','src/js/bootstrap.js',],
                    dest: 'dist/js/app.js',
            },
        },
        uglify: {
            dist: {
                options: {
                    sourcemap: 'none',
                    mangle: false
                },
                files: {
                    'dist/js/app.min.js': 'dist/js/app.js',
                }
            }
        },
        watch: {
            configFiles: {
                files: [ 'Gruntfile.js', 'config/*.js' ],
                options: {
                    reload: true
                }
            },
            templates: {
                files: ['src/jade/**/*.jade'],
                tasks: ['jade'],
                options: {
                    spawn: false,
                },
            },
            styles: {
                files: ['src/sass/**/*.scss'],
                tasks: ['sass'],
                options: {
                    spawn: false,
                },
            }
        }
    });

    grunt.registerTask('pre', 'Wipes dist folders and compiles SASS', ['clean', 'sass']);
    // grunt.registerTask('compile', 'pre + RequireJS Optimizer and demo file', ['pre', 'requirejs', 'htmlbuild:compile', 'copy:compile']);
    grunt.registerTask('build', 'pre + concat & uglify', ['pre','jade','concat','uglify','copy:dev']);
    grunt.registerTask('default', 'Just copy files (for development)', ['pre']);
};