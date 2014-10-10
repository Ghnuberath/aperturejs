module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      options: {
        bitwise:   true,
        eqeqeq:    true,
        immed:     true,
        latedef:   true,
        newcap:    true,
        noarg:     true,
        nonbsp:    true,
        nonew:     true,
        sub:       true,
        undef:     true,
        boss:      true,
        eqnull:    true,
        node:      true,
        jquery:    true,
        camelcase: true,
        quotmark:  'single',
        //maxdepth:  4,
        globals: {
          aperture:true,
          window:false,
          document:false,
          OpenLayers:false,
          Raphael:false
        },
        ignores: ['node_modules/**', 'bower_components/**', 'dist/**', 'lib/pre.js', 'lib/pre-package.js', 'lib/post.js', 'header.js']
      },
      lib: {
        files: {
          src: [
            'Gruntfile.js', 
            'lib/*.js', 
            'lib/**/*.js', 
            'lib/**/**/*.js'
          ]
        },
        options: {}
      },
      test: {
        files:   {
          src: [
            'test/*.js',
            'test/**/*.js'
          ]
        },
        options: {}
      }
    },
    concat: {
      lib : {
        src : [
          'lib/aperture.js',
          'lib/base.js',
          'lib/util.js',
          'lib/core-classes/Class.js',
          'lib/core-packages/config.js',
          'lib/core-packages/log.js',
          'lib/core-packages/canvas.js',
          'lib/core-classes/Format.js',
          'lib/core-classes/Transition.js',
          'lib/core-classes/Layer.js',
          'lib/core-classes/Color.js',
          'lib/core-classes/Date.js',
          'lib/core-classes/IconLayer.js',
          'lib/core-classes/LabelLayer.js',
          'lib/core-classes/NodeSet.js',
          'lib/core-classes/MapKey.js',
          'lib/core-classes/Mapping.js',
          'lib/core-classes/RadialLayer.js',
          'lib/core-classes/BarLayer.js',
          'lib/core-classes/Range.js',
          'lib/core-classes/Set.js',
          'lib/core-packages/filter.js',
          'lib/core-packages/io.js',
          'lib/core-packages/palette.js',
          'lib/core-packages/vizlet.js',
          'lib/packages/log/AjaxAppender.js',
          'lib/packages/log/AlertBoxAppender.js',
          'lib/packages/log/BufferingAppender.js',
          'lib/packages/log/ConsoleAppender.js',
          'lib/packages/log/DOMAppender.js',
          'lib/packages/capture.js',
          'lib/packages/layout.js',
          'lib/packages/pubsub.js',
          'lib/packages/store.js',
          'lib/packages/geo/map.js',
          'lib/packages/chart/AxisLayer.js',
          'lib/packages/chart/BarSeriesLayer.js',
          'lib/packages/chart/ChartLayer.js',
          'lib/packages/chart/RuleLayer.js',
          'lib/packages/chart/LineSeriesLayer.js',
          'lib/packages/canvas/RaphaelCanvas.js',
          'lib/core-classes/NodeLayer.js',
          'lib/core-classes/LinkLayer.js',
          'lib/core-classes/SankeyPathLayer.js'
        ],
        dest : 'aperture.js'
      }
    },
    uglify : {
      lib: {
        files: {
          'aperture.min.js' : [ 'aperture.js' ]
        }
      }
    },
    watch: {
      lib: {
        files: [
          'lib/*.js', 
          'lib/**/*.js', 
          'lib/**/**/*.js'
        ],
        tasks: ['clean:lib','dist'],
        options: {
          spawn: false
        }
      }
    },
    clean: {
      'lib': ['aperture.js', 'aperture.min.js'],
      'bower':['bower_components']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  
  grunt.registerTask('package', [
    'jshint:lib',
    'concat:lib',
    'uglify:lib'
  ]);
  grunt.registerTask('default', ['package', 'watch']);
};
