module.exports = function(grunt){
  grunt.initConfig({
    uglify: {
      target: {
        files: {
          'build/prod/js/main.min.js': ['build/dev/js/main.js']
        }
      }
    },//uglify
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'build/dev/css',
          src: ['*.css', '!*.min.css'],
          dest: 'build/prod/css',
          ext: '.min.css'
        }]
      }
    },//cssmin
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          'build/prod/index.html': 'build/dev/index.html'
        }
      }
    },//htmlmin
    watch: {
     options : {
       livereload : true
     },
     files: ['build/dev/**/*'],
     tasks: ['uglify','cssmin','htmlmin']
    }
  });//init
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', ['uglify', 'cssmin', 'htmlmin', 'watch']);
};//wraper
// , , 'watch'
