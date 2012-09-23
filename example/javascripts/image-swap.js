/////////////////////////////////////
//
// app.ImageSwap
// -----------------------------
// 
// DESCRIPTION: 
// This module will switch the image source when the user is on a certain breakpoint.
// We dont want to load a full size image when the user is on a mobile view and likewise
// for desktop views.
//
// Developers, yeah you! When using you will need to add a data attribute, named hmm. I dont know,
// "data-mobile-img" and contain the source of the mobile image we will want to swap your 
// desktop image with. Also the image that will do the swapping will need a class of, "mobile-img"
// this is so we know exactly what image will do the swapping. :)
//
// Example!
// -----------------------------
// <div class="foo" data-mobile-img="foo.jpg">
//   <img src="bar.jpg" class="mobile-img" /> 
// </div>
//
// 
// DEPENDENCIES:
// - /public/javascript/libs/jquery-1.7.2.js
// - /public/javascript/modules/core.js
// - /public/javascript/modules/responsive-breakpoints.js
//
// TODOs: (feature requests ;) )
// 1) Add ability for users to define own breakpoints mobile, desktop
//    a. Would probably be an object {mobile: 620, desktop: 800, ultra-display: 1900}
//    b. Markup would rely on object names, <div class="switch-img" data-ultra-display="img-src"><img src="" class="switch-img"></div>
// 2) Add ability for users to define more than two breakpoints
// 
//
// INITIALIZATION:
// app.ImageSwap = new app._Modules.ImageSwap() 
// 
/////////////////////////////////////
!function( $, app ) {
  var ImageSwap,
  defaults,
  helpers


  /////////////////////////////////////
  // Begin ImageSwap
  /////////////////////////////////////
  
  defaults = {
    mobileImageSrc: 'mobile-img',
    desktopImageSrc: 'desktop-img',
    imageContainer: '.mobile-img',
    createNewImage: true // if an image doesnt exist, do you want to make one?
  }

  ImageSwap = function( options ) {
    var options

    // Map optional configs if they exist  
    this.options = options ? $.extend({}, defaults, options) : defaults
    options = this.options

    // ImageSwap jQuery extended elements
    this.$mobileImageContainer = $( options.imageContainer )
    this.$swapImage = $('img' + options.imageContainer)
    this.$mobileImageSrc = options.mobileImageSrc
    this.$mobileImageClass = options.imageContainer
    this.$desktopImageSrc = options.desktopImageSrc
    this.$createEmptyImage = options.createNewImage

    // Set up the module
    this.init()
  }

  // ImageSwap Methods
  ImageSwap.prototype = {


    setup0_768: function() {

      if( this.init0_768 ) return
      
      var self = this
      this.init0_768 = true
      this.init769up = false    

      // find each container which has the class mobile-image so we can swap out images
      this.$mobileImageContainer.each(function(i){
        // get the image source of the mobile image
        var el = $(this),
        mobileImageSrc = el.data(self.$mobileImageSrc), 
        imageTarget = el.find('img' + self.$mobileImageClass)

        // if the element doesnt have an attribute we need to kill the empty image
        if (!mobileImageSrc || !mobileImageSrc.length)  {
          if( $.hasData(this) ) {
            imageTarget.remove()
          }
        }

        // if it has an attribute to do swapping we can swap, its just incase we dont want to swap
        if( $.hasData(this) ) {
          if(!$(this).data('mobile-img')) return // a bit hacky

          // replace the image source with the new one :)
          if (imageTarget.length == 0 && self.$createEmptyImage) {
            el.append('<img src='+ mobileImageSrc +' class='+ self.$mobileImageClass.replace('.', '') +' >')
          } else {
            imageTarget.attr('src',mobileImageSrc)
          }
        }  
      })
    },

    setup769up: function() {

      if( this.init769up ) return

      var self = this
      this.init0_768 = false
      this.init769up = true   

      this.$mobileImageContainer.each(function(i){
        // get the image source of the desktop image
        var el = $(this),
        desktopImageSrc = el.data(self.$desktopImageSrc), 
        imageTarget = el.find('img' + self.$mobileImageClass)

        // if the element doesnt have an attribute we need to kill the empty image
        if (!desktopImageSrc || !desktopImageSrc.length)  imageTarget.remove()
        
        // if it has an attribute to do swapping we can swap, its just incase we dont want to swap
        if( $.hasData(this) ) {
          // replace the image source with the new one :)
          if (imageTarget.length == 0 && self.$createEmptyImage) {
            el.append('<img src='+ desktopImageSrc +' class='+ self.$mobileImageClass.replace('.', '') +' >')
          } else {
            imageTarget.attr('src',desktopImageSrc)
          }

        } 
      })
      
    },

    init: function() { 
      var self = this

      $(domReady)

      function domReady(){
        // DOM Ready inits
        // Recommend calling a sequence of private functions here to kick off the app
        handleResponsive()
      }

      // handleResponsive is a utility to assign all of the breakpoint event handlers we want for this module
      function handleResponsive() {
        app.ResponsiveBreakpoints.register_event(
          '0-768',
          'image-swap-0-768',
          // $.proxy(self.setup0_768, self) // retain "this" for module
          self.setup0_768.bind(self) // using es5-shim.js
        )

        app.ResponsiveBreakpoints.register_event(
          '768-+',
          'image-swap-768up',
          // $.proxy(self.setup769up, self) // retain "this" for module
          self.setup769up.bind(self) // using es5-shim.js
        )
      } // end handleResponsive

    } // end fn.init

  } // end ImageSwap.prototype

  // Attach the ImageSwap constructor to our global namespace
  //app._Modules.ImageSwap = ImageSwap

}( window.jQuery )
;
