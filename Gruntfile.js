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
        loopfunc:  true, //TODO remove one day
        quotmark:  'single',
        //maxdepth:  4,
        globals: {
          aperture:true,
          alert:false,
          window:false,
          document:false,
          OpenLayers:false,
          Raphael:false,
          OpenAjax:false, //TODO get rid of this global by getting rid of pubsub.js
          google:false, //TODO get rid of this global by extracting packages/geo
          define:false, //TODO get rid of this global by extracting packages/geo
          jsIdentifierRegEx:true, //TODO get rid of this global - move to aperture.util
          findFieldChainValue:true //TODO get rid of this global - move to aperture.util          
        },
        ignores: ['node_modules/**', 'bower_components/**', 'dist/**', 'lib/pre.js', 'lib/pre-package.js', 'lib/post.js', 'header.js'],
        force: true
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
          'lib/header.js',
          'lib/pre.js',
          //BEGIN aperture-core          
          'lib/base.js',
          'lib/util.js',
          'lib/core-classes/Class.js',
          'lib/core-packages/config.js',
          'lib/core-packages/log.js',
          'lib/core-packages/canvas.js',
          'lib/core-classes/Transition.js',
          'lib/core-classes/Layer.js',
          'lib/core-packages/vizlet.js',
          'lib/core-classes/Format.js',          
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
          'lib/core-classes/NodeLayer.js',
          'lib/core-classes/LinkLayer.js',
          'lib/core-classes/SankeyPathLayer.js',
          'lib/core-packages/filter.js',
          'lib/core-packages/io.js',
          'lib/core-packages/palette.js',
          //END aperture-core
          //BEGIN aperture-log
          'lib/packages/log/*.js',
          //END aperture-log
          //BEGIN aperture-capture
          'lib/packages/capture.js',
          //END aperture-capture
          //BEGIN aperture-layout
          'lib/packages/layout.js',
          //END aperture-layout
          //BEGIN aperture-pubsub
          'lib/packages/pubsub.js',
          //END aperture-pubsub
          //BEGIN aperture-cms
          'lib/packages/store.js',
          //END aperture-cms
          //BEGIN aperture-geo
          'lib/packages/geo/*.js',
          //END aperture-geo
          //BEGIN aperture-chart
          'lib/packages/chart/*.js',
          //END aperture-chart
          //BEGIN aperture-raphael
          'lib/packages/canvas/RaphaelCanvas.js',
          //END aperture-raphael*/
          'lib/post.js'
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
        tasks: ['clean:lib','package'],
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
