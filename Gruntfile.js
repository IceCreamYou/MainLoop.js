module.exports = function(grunt) {
  var banner = '/**\n' +
               ' * mainloop.js <%= pkg.version %>-<%= grunt.template.today("yyyymmdd") %>\n' +
               ' *\n' +
               ' * @author <%= pkg.author %>\n' +
               ' * @license <%= pkg.license %>\n' +
               ' */\n';
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: banner,
        compress: {
          dead_code: false,
          side_effects: false,
          unused: false,
        },
        mangle: true,
        preserveComments: function(node, comment) {
          return (/^!/).test(comment.value);
        },
        report: 'min',
        sourceMap: true,
      },
      target: {
        files: {
          'build/mainloop.min.js': ['src/mainloop.js'],
        },
      },
    },
    jshint: {
      options: {
        browser: true, // include browser globals
        eqeqeq: true, // require strict equality
        futurehostile: true, // warn if future-ES keywords are used
        globals: { // globally available variable names; value = is writable
          alert: false,
          define: false, // for AMD exports
          module: false, // for CommonJS exports
        },
        latedef: 'nofunc', // disallow using variables before they're defined
        noarg: true, // disallow using arguments.caller and arguments.callee
        nonbsp: true, // disallow non-breaking spaces
        undef: true, // warn if a variable is used without being defined
        unused: true, // warn if a variable is defined but not used
        typed: true, // support typed array globals
        worker: true, // support Web Worker globals
      },
      target: {
        src: [
          'src/mainloop.js',
          'Gruntfile.js',
        ],
      },
    },
    jscs: {
      options: {
        config: '.jscs.json',
      },
      main: [
        'src/mainloop.js',
        'Gruntfile.js',
      ],
    },
    watch: {
      files: [
        'src/mainloop.js',
      ],
      tasks: ['uglify', 'exec:jsduck_notify'],
    },
    exec: {
      jsduck_notify: {
        // For some reason I can't get jsduck to run programmatically on
        // Windows, but it works manually, so this is a workaround.
        command: 'node -p "\'You need to run \\"jsduck --config=.jsduck.json\\" from the project directory to generate updated documentation.\'"',
      },
      jsduck: {
        command: 'jsduck --config=.jsduck.json',
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.registerTask('default', ['uglify', 'jshint', 'jscs', 'exec:jsduck_notify']);
  grunt.registerTask('lint', ['jshint', 'jscs']);
  grunt.registerTask('docs', ['exec:jsduck']);
};
