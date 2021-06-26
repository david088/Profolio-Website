#Changelog
All changes to this webiste will be document in this file.

2021-02-27 David Zhao <zhl042@ucsd.edu>

    - Update webiste with JaavScript
    - The webiste uses top naviagtion bar for visitors going through pages with ease, but it does not support small screen nor phone size screens as the buttons will appear out of places. A simple dropdown button was created but does not work as intened.

    Added:
        * dropDownButton.js:
            - Implemented JavavScript function to allow button behavior. Click to open/close.
            - This addition affects all pages on website.
    
    Changed:
        * styles_Art.css:
            - Update CSS file for dropedown menu to fit small screens. 

    Removed:
        * styles_Art.css:
            - Remove dropdown menu hover effect as it might block views and may affect user expereinces.  


2021-02-28 David Zhao <zhl042@ucsd.edu>

    - Update webiste with JaavScript
    - One of the major feature is to show a list of artworks that created, but at some screens the image appear small and users cannot enlarge the artwork individually.

    Added:
        * largeImageJS.js:
            - Implemented JavaScript function to create overlay large image of choice on click.
            - Overlay window has close button to close the window.
        
        * styles_Art:
            - Added new CSS to for overlay window.
            - Added code to make the overlay window resposive to different screen sizes.

        * art.html:
            - Add image onclick functions to enable JavaScript functions


2021-02-28 David Zhao <zhl042@ucsd.edu>

    - After the majority of the features are complete. It is needed to track number of interaction between users and the webiste because it gives me a better understanding whether recuritors looks at the webiste and how many pages do they look at. In order to achieve this, I used the third-party JavaScript analytics.js from Google Analytics.

    Added:
        * analytics.js:
            - This file contains neccessary code to create Google Analytics trackers as well as sending the information to the G.A.
            - The information sending is number of view per page and the amount of time is spent on a certain page.
            - It also dsiplay the visitor information in console log to show they are visitig the website.

        * All files head:
            - All files' head have included the JavaScript to track and send information.  


2021-03-12 David Zhao <zhl042@ucsd.edu>
    - Many images included within the website are too large. To further improving website's accessability, PNG and JPG will be compressed to smaller sizes or manuelly resize the images to increase the Accessibility. To improve performance, image needs to have explicit width and height to reduce layout shifting. Furthermore, some text on website home page have poor contrast with the background.

    Changed:
        * index.html:
            - Some text colors are changed to create proper contrast between the text and background.
            
        * index.html, art.html:
            - All images are compressed into smaller sizes.

        * styles_Work.css, styles_WordExp.css, styles_Art.css, styles_About.css:
            - Image are assigned explicit width and height to avoid layout shifting.

    
    Removed:
        * art.html:
            - Remove large images requests to improve site performance.


2021-03-15 David Zhao <zhl042@ucsd.edu>
    - There are too many <div> is used through the website.

    Changed:
        * All html pages: 
            - Naviagtion button wrapped by <div> will be wrapped by <nav> 
        
        * styles_art.css:
            - Change selectors that were used for <div> to nested selector without <div>
    
    Removed:
        * art.html:
            - Remove all tags that used to wrap images.
        
        