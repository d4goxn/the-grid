module.exports = function( grunt ) {
	'use strict';

	grunt.initConfig({
		clean: {
			client: [
				'client/build',
				'client/dist'
			],
			server: [
				'server/build',
				'server/dist'
			]
		},

		livescript: {
			client: {
				files: {
					'client/build/index.js': 'client/source/index.ls',
				}
			},
			server: {
				files: {
					'server/build/index.js': 'server/source/index.ls'
				}
			}
		},

		copy: {
			client: {
				expand: true,
				cwd: 'client/build/',
				src: '**/*.js',
				dest: 'client/dist/'
			},
			server: {
				expand: true,
				cwd: 'server/build/',
				src: '**/*.js',
				dest: 'server/dist/'
			}
		},

		template: {
			'process-html-template': {
				options: {
					data: {
						scriptSrc: '/static/index.js'
					}
				},
				files: {
					'client/dist/index.html': [ 'client/source/index.html.tpl' ]
				}
			}
		},

		watch: {
			options: {
				livereload: true
			},
			client: {
				files: [ 'client/source/**' ],
				tasks: [ 'build-client' ]
			},
			server: {
				files: [ 'server/source/**' ],
				tasks: [ 'build-server', 'forever:restart' ]
			}
		},

		forever: {
			server: {
				options: {
					index: 'server/build/index.js',
					logDir: 'logs'
				}
			}
		}
	});

	require( 'load-grunt-tasks' )( grunt );

	grunt.registerTask( 'build-client', [ 'clean:client', 'template', 'livescript:client', 'copy:client' ]);
	grunt.registerTask( 'build-server', [ 'clean:server', 'livescript:server', 'copy:server' ]);
	grunt.registerTask( 'serve', [ 'forever:start', 'watch' ]);
	grunt.registerTask( 'default', [ 'build-client', 'build-server' ]);
};
