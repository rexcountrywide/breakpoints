# Breakpoints.js

This is a fork of the original Breakpoints.js

Define breakpoints for your responsive design, and Breakpoints.js will fire custom events when the browser enters and/or exits that breakpoint.
[Get it from Github](https://github.com/xoxco/breakpoints)
[View Demo](http://xoxco.com/projects/code/breakpoints/)
Created by [XOXCO](http://xoxco.com)

## Changed

Optimized by pulling anonymous functions out of loops and not running size comparison logic when the window size doesn't change. (It runs at an interval of 250ms.)

Added `up` and `down` properties to the event. See below.

## Instructions

	$(window).setBreakpoints({
	// use only largest available vs use all available
		distinct: true, 
	// array of widths in pixels where breakpoints
	// should be triggered
		breakpoints: [
			320,
			480,
			768,
			1024
		] 
	});		
	
	$(window).bind('enterBreakpoint320',function() {
		...
	});
	
	$(window).bind('exitBreakpoint480',function(e) {
		if (e.up) {
			// going up
		}
		if (e.down) {
			// going down
		}
	});
	
	$(window).bind('enterBreakpoint768',function(e) {
		...
	});
	
	$(window).bind('exitBreakpoint768',function(e) {
		...
	});
	
	
	$(window).bind('enterBreakpoint1024',function(e) {
		...
	});
	
	$(window).bind('exitBreakpoint1024',function(e) {
		...
	});

