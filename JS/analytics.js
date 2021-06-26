(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
    
    ga('create', 'UA-PANDA-Y', 'auto');
    ga('create', 'UA-PANAN-Y', 'auto', 'DetectivePanda', '54321');

    ga(function(tracker) {
        console.log(tracker);
        tracker.send('event', 'Video', 'play', 'cats.mp4');
    });

    ga(function() {
        console.log('Visiting: ' + ga.getByName('DetectivePanda').get('title'));
        console.log('Name: ' + ga.getByName('DetectivePanda').get('name'));
        console.log('ClientID: ' + ga.getByName('DetectivePanda').get('clientId'));
        console.log('URL: ' + ga.getByName('DetectivePanda').get('referrer'));
    });


    ga('send', 'pageview', location.hostname);

    
    if (window.performance) {
        var timeSincePageLoad = Math.round(performance.now());
        ga('send', 'timing', 'JS Dependencies', 'load', timeSincePageLoad);
    }
    
    ga('DetectivePanda.send', {
        hitType: 'event',
        eventCategory: 'Video',
        eventAction: 'play',
        eventLabel: 'cats.mp4'
    });