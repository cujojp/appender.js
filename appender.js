/////////////////////////////////////
//
// fn.Appender
// -----------------------------
// Reposition html elements for your responsive web application and 
// Appender.js will fire while you resize your browser and place 
// content and elements where you want it.
//
// -----------------------------
//
// GETTING STARTED
// =======================
// To reposition content throughout your responsive site, define which html elements are going to be visible and hidden at your specific media queries.
// 
// CSS Example: 
// .desktop-only { display: none;  }
// .mobile-only  { display: block; }
// @media only screen and (min-width: 768px) {
//   .mobile-only  { display: none;  }
//   .desktop-only { display: block; }
// }
//
// When writing HTML you can now use the classes written in your stylesheet to reposition content accordingly. Add a data attribute named 'data-append' to the parent of the element which you are seeking to be moved. Make sure the class name of the element moving matches the value of the 'data-append' attribute. So it should look something like the following: 
// 
// HTML Example:
// 
// <div class="desktop-only" data-append="awesome-content">
//   <div class="awesome-content">
//     <img src="http://www.placekitten.com/500 >
//   </div>
//   <div class="non-moving-content">
//     <p>This content will not move, but the image will!</p>
//   </div>
// </div>   
// …
// <div class="mobile-only" data-append="awesome-content"></div>
//
// Also add empty elements for content which will be added at its specific breakpoint.
// 
// INITIALIZATION:
// $.fn.appender({ appendedModule: '.awesome-content' }) 
//
// NOTE: The default class name is 'content-holder'
//
// -----------------------------
//
// DEPENDENCIES:
// - /public/javascript/libs/jquery-1.7.2.js
//
//
// Copyright 2012 Kaleb White
// http://cujo.jp/
//
// Licensed under the MIT license:
// http://www.opensource.org/licenses/mit-license.php
//
/////////////////////////////////////

!(function( $, window, document, undefined ){
  var Appender,
  defaults
  
  /////////////////////////////////////
  // Begin Appender
  /////////////////////////////////////

  // Defaults, can be modified when initializing the method's
  // - appendModule: the class name and data name that will be moving through the DOM
  // - dataName: the data attribute which of the parent element
  var defaults = {
    appendedModule : '.content-holder',
    dataName : 'data-append'
  }
  
  Appender = function( elem, options ){

    var options
    this.options = $.extend({}, defaults, options)
    options = this.options

    // fn.appender properties
    //========================================
    // our module's class name
    this.$selectedModule = $(options.appendedModule) 
    // the module data name
    this.$moduleAttr = options.dataName 
    // query selector of all query selectors
    this.$moduleSet = $( "["+ this.$moduleAttr +"='"+ this.$selectedModule.parents( "["+ this.$moduleAttr +"]" ).attr( this.$moduleAttr ) + "']" )  

    // Let's start the show!
    this.init()
  }

  Appender.prototype = {

    init: function() {
      var self = this

      $(domReady)

      // Utility function to execute on jQuery's DOM Ready 
      function domReady(){
        // on resizie we need to call the heavy lifter!
        $(window).resize($.proxy(self.append_to_visible_element, self))
        // also run it on init!
        self.append_to_visible_element()
      }
    },

    // Heavy lifter!
    // Find the hidden element and appends it's content to the next visible element
    append_to_visible_element: function(e) {
      var self = this

      self.$selectedModule.each(function(i){
        if( self.$selectedModule.eq(i).is( ":hidden" ) ){
          self.$selectedModule.eq(i).appendTo( self.$moduleSet.filter( ":visible" ).eq(i) )
        }
      })
    }
  }

  $.fn.appender = function(options) {
    new Appender(this, options)
  }

})( jQuery, window , document );
