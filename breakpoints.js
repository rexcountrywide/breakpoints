/*
  Breakpoints.js
  version 1.0
  
  Creates handy events for your responsive design breakpoints
  
  Copyright 2011 XOXCO, Inc
  http://xoxco.com/

  Documentation for this plugin lives here:
  http://xoxco.com/projects/code/breakpoints
  
  Licensed under the MIT license:
  http://www.opensource.org/licenses/mit-license.php

  Optimized just a little by Happy Cog.

*/
(function($) {

  var lastSize = 0;
  var interval = null;

  $.fn.resetBreakpoints = function() {
    $(window).unbind('resize');
    if (interval) {
      clearInterval(interval);
    }
    lastSize = 0;
  };

  $.fn.setBreakpoints = function(settings) {
    var options = $.extend({
      distinct: true,
      breakpoints: new Array(320,480,768,1024)
    }, settings);

    function sortCallback(a,b) { return (b-a); }
    interval = setInterval(doit, 250);

    function doit() {

      var w = $(window).width(),
          bps = options.breakpoints.sort(sortCallback);
          done = false;

      for (var bp in bps) {

        if (w == lastSize) {
          return;
        }

        // fire onEnter when a browser expands into a new breakpoint
        // if in distinct mode, remove all other breakpoints first.
        if (!done && w >= options.breakpoints[bp] && lastSize < options.breakpoints[bp]) {
          if (options.distinct) {
            for (var x in options.breakpoints.sort(sortCallback)) {
              if ($('body').hasClass('breakpoint-' + options.breakpoints[x])) {
                $('body').removeClass('breakpoint-' + options.breakpoints[x]);
                $(window).trigger({
                  type: 'exitBreakpoint' + options.breakpoints[x],
                  down: (lastSize > w),
                  up:   (lastSize < w)
                });
              }
            }
            done = true;
          }
          $('body').addClass('breakpoint-' + options.breakpoints[bp]);
          $(window).trigger({
            type: 'enterBreakpoint' + options.breakpoints[bp],
            down: (lastSize > w),
            up:   (lastSize < w)
          });

        }

        // fire onExit when browser contracts out of a larger breakpoint
        if (w < options.breakpoints[bp] && lastSize >= options.breakpoints[bp]) {
          $('body').removeClass('breakpoint-' + options.breakpoints[bp]);
          $(window).trigger({
            type: 'exitBreakpoint' + options.breakpoints[bp],
            down: (lastSize > w),
            up:   (lastSize < w)
          });
        }

        // if in distinct mode, fire onEnter when browser contracts into a smaller breakpoint
        if (options.distinct && // only one breakpoint at a time
            w >= options.breakpoints[bp] && // and we are in this one
            w < options.breakpoints[bp-1] && // and smaller than the bigger one
            lastSize > w && // and we contracted
            lastSize >0 &&  // and this is not the first time
            !$('body').hasClass('breakpoint-' + options.breakpoints[bp])) { // and we aren't already in this breakpoint
          $('body').addClass('breakpoint-' + options.breakpoints[bp]);
          $(window).trigger({
            type: 'enterBreakpoint' + options.breakpoints[bp],
            down: (lastSize > w),
            up:   (lastSize < w)
          });
        }
      }

      // set up for next call
      if (lastSize != w) {
        lastSize = w;
      }
    }

    return this;
  };

})(jQuery);