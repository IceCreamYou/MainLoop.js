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
        trailing: true,
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
      tasks: ['uglify', 'jsduck'],
    },
    jsduck: {
      main: {
        src: [
          'src'
        ],
        dest: 'docs',
        options: {
          external: ['DOMHighResTimeStamp'],
          footer: '<span style="color: #444; font-size: 12px;"><span style="float: left; padding-left: 1em;"><a href="https://github.com/IceCreamYou/MainLoop.js" style="color: #083772;">Fork this project on Github</a></span><span style="clear: both;">By <a href="http://www.isaacsukin.com/" style="color: #083772;">Isaac Sukin</a> (<a href="https://github.com/IceCreamYou" style="color: #083772;">IceCreamYou</a>)</span></span>',
          'local-storage-db': 'jsduckml',
          title: 'MainLoop.js Documentation',
          warnings: ['-global']
        }
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-jsduck');
  grunt.registerTask('default', ['uglify', 'jshint', 'jscs', 'jsduck']);
  grunt.registerTask('lint', ['jshint', 'jscs']);
};
