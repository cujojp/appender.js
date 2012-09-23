appender.js
===========

Reposition html elements for your responsive site and Appender.js will place content and elements where you want.


----------------------------------------------------------
Getting Started
===========

To reposition content throughout your responsive site, define which html elements are going to be visible and hidden at your specific media queries.

CSS Example: 
    .desktop-only {
      display: none;
    }
    .mobile-only {
      display: block;
    }

    @media only screen and (min-width: 768px) {
      .mobile-only {
        display: none;
      }
      .desktop-only {
        display: block;
      }
    }

When writing HTML you can now use the classes written in your stylesheet to reposition content accordingly. Add a data attribute named 'data-append' to the parent of the element which you are seeking to be moved. Make sure the class name of the element moving matches the value of the 'data-append' attribute. So it should look something like the following: 

HTML Example:

    <div class="desktop-only" data-append="moving-content">
      <div class="moving-content">
        <img src="http://www.placekitten.com/500 >
      </div>
      <div class="non-moving-content">
        <p>
          This content will not move, but the image will!
        </p>
      </div>
    </div>   
		…
    <div class="mobile-only" data-append="moving-content"></div>

Also add empty elements for content which will be added at its specific breakpoint.

----------------------------------------------------------

Options
===========

You can add your options when initializing the plugin. The element's class name can be modified (default class is 'content-holder'), and even the data-attribute name can be adjusted (default data-attribute is 'append')

----------------------------------------------------------

See it in Action
===========

coming soon, sorry! :(
