module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    var config = grunt.file.readJSON('config.json');
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            dist: {
                src: config.files,
                dest: 'dist/slayer.js'
            }
        },
        babel: {
            options: {},
            dist: {
                files: {
                    'dist/slayer.js': 'dist/slayer.js'
                }
            }
        }
    });

    grunt.registerTask('default', ['concat', 'babel']);
};
