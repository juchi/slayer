module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            dist: {
                src: ['src/geometry.js', 'src/weapon.js', 'src/movable.js', 'src/enemy.js', 'src/player.js', 'src/input.js', 'src/game.js'],
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

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-babel');
    grunt.registerTask('default', ['concat', 'babel']);
};
