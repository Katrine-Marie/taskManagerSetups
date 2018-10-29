module.exports = function(grunt) {
  require('time-grunt')(grunt);

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		sass: {
			dist: {
        options : {
          sourceMap:true,
          outputStyle:'compressed',
          sourceComments:false
        },
				files: {
					['css/style.css'] : ['source/scss/*.scss']
				}
			}
		},
    cssmin: {
      target: {
        files: [{
          expand: true,
          src: ['css/style.css'],
          ext: '.min.css'
        }]
      }
    },
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['source/js/partials/*.js', 'source/js/app.js'],
        dest: 'source/js/bundled.js',
      },
    },
    uglify: {
      options: {
        mangle: false,
        compress: {
          drop_console: true
        }
      },
      my_target: {
        files: {
          'js/output.min.js': ['source/js/bundled.js']
        }
      }
    },

		watch: {
			css: {
				files: ['source/scss/*.scss', 'css/*.css', 'source/js/*.js', 'source/js/partials/*.js'],
				tasks: ['sass', 'cssmin', 'concat', 'uglify'],
        options: {
          livereload:true
        }
			}
		}

	});

  // imagemin
  // JSHint

  require('load-grunt-tasks')(grunt, {scope: 'devDependencies'});

	grunt.registerTask('default',['watch']);
}
