/*global module:false*/
module.exports = function (grunt) {
  var sourceFiles = ['camel_case.js', 'no-*.js', 'potential-point-free.js'];

  grunt.initConfig({

    filenames: {
      options: {
        valid: 'dashes',
        except: 'verify-md5.js'
      },
      src: [sourceFiles, '!camel_case.js']
    },

    eslint: {
      target: sourceFiles,
      options: {
        config: '.eslintrc',
        rulesdir: ['.']
      }
    },

    jshint: {
      all: sourceFiles,
      options: {
        jshintrc: 'utils/.jshintrc',
        reporter: require('jshint-summary')
      }
    },

    jscs: {
      src: sourceFiles,
      options: {
        config: 'utils/jscs.json'
      }
    }
  });

  var plugins = module.require('matchdep').filterDev('grunt-*');
  plugins.forEach(grunt.loadNpmTasks);

  grunt.registerTask('lint', ['filenames', 'jshint', 'jscs', 'eslint']);
  grunt.registerTask('default', ['deps-ok', 'nice-package', 'lint']);
};
