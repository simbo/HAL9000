module.exports = function(grunt) {
	'use strict';

	// Force use of Unix newlines
	grunt.util.linefeed = '\n';



	/* =============================================================================
	   Project Configuration
	   ========================================================================== */

	grunt.initConfig({



		/* =============================================================================
		   Get NPM data
		   ========================================================================== */

		pkg: grunt.file.readJSON('package.json'),



		/* =============================================================================
		   Task Config: LESS
		   ========================================================================== */

		less: {
			theme: {
				options: {
					strictMath: true,
					sourceMap: true,
					outputSourceFiles: true,
					report: 'min',
					compress: false,
					sourceMapURL: 'styles.min.css.map',
					sourceMapFilename: 'assets/css/styles.min.css.map'
				},
				files: {
					'assets/css/styles.min.css': 'assets/less/styles.less'
				}
			}
		},



   		/* =============================================================================
		   Task Config: Watch
		   ========================================================================== */

		autoprefixer: {
			options: {
				browsers: ['last 2 versions', 'ie 8', 'ie 9', 'android 2.3', 'android 4', 'opera 12'],
				map: true
			},
			core: {
				src: 'assets/css/styles.min.css'
			},
		},



   		/* =============================================================================
		   Task Config: Watch
		   ========================================================================== */

		watch: {
			html: {
				files: [
					'*.html'
				],
		        options: {
					livereload: true
				}
			},
			less: {
				files: [
					'assets/less/*.less'
				],
				tasks: [
					'build-css',
					'notify:css'
				],
		        options: {
					livereload: true
				}
			}
		},



		/* =============================================================================
		   Task Config: Notifications
		   ========================================================================== */

		notify: {
			css: {
				options: {
					title: 'Task complete',
					message: 'LESS compiled, CSS minified.'
				}
			}
		}

	});



	/* =============================================================================
	   Load NPM Tasks
	   ========================================================================== */

	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-notify');



	/* =============================================================================
	   Custom Tasks
	   ========================================================================== */

	grunt.registerTask( 'build-css', [
		'less',
		'autoprefixer'
	]);
	grunt.registerTask( 'build-all', [
		'build-css'
	]);
	grunt.registerTask( 'default', [
		'build-all'
	]);



};
