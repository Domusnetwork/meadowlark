module.exports = function (grunt) {

	// load plugins
	[
	'grunt-cafe-mocha',
	'grunt-contrib-jshint',
	'grunt-link-checker',
	'grunt-exec',
	].forEach(function (task) {
		grunt.loadNpmTasks(task);
	});



	// parameters
	var target = grunt.option('target') || 'dev';
	var port = grunt.option('port') || 3000;
	var host = grunt.option('host') || 'localhost';



	// configure plugins
	grunt.initConfig({

		cafemocha: {
			all: { src: 'qa/tests-*.js', options: { ui: 'tdd'} }
		}, // cafemocha


		jshint: {
			app: ['meadowlark.js', 'public/js/**/*.js', 'lib/**/*.js'],
			qa: ['Gruntfile.js', 'public/qa/**/*.js', 'qa/**/*.js']
		}, // jshint


		'link-checker': {
			dev: {
				site: host,
				options: {
					initialPort: port
				}
			} // dev
		}, // 'link-checker'


		exec: {
			gitStatus: {
				cmd: 'git status'
			}
		}, // exec


	}); // initConfig



	// register tasks
	grunt.registerTask('default', [
		'cafemocha',
		'jshint',
		'link-checker:' + target,
		'exec',
	]);


	grunt.registerTask('test', ['exec']);


};