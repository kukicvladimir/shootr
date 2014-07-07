module.exports = (grunt) ->

  grunt.initConfig
    pkg: grunt.file.readJSON('package.json'),
    coffee:
      glob_to_multiple:
        expand: true
        cwd: 'coffee/'
        src: ['**/*.coffee']
        dest: 'js/'
        ext: '.js'

    watch:
      coffee:
        files: ['**/*.coffee']
        tasks: ['coffee:glob_to_multiple']

  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-watch'

  grunt.registerTask 'default',  'coffee'