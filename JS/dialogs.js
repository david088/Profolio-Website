var alertText = 'ALERT! ALERT! ALERT! YOU CLICKED THE ALERT BUTTON';
var alertOutText = 'An alert was shown';
var comfirmText = 'The value returned by the confirm method is : ';
var emptyPrompt = 'User didn’t enter anything';
var outputText = '';
var dialogButtons = document.querySelectorAll('.jumpButton');

dialogButtons.forEach(function(button, index){
    button.addEventListener("click", function(){

        document.querySelector('.resultSec').innerHTML = '';
                
        getResult(index);
        
    });
});

function strResult(str, name) {
    let res = '';
    return `${str[0]}${name}${str[1]}`;
}

aResult = (inputPrompt) => {
    return 'Your answer is ' + inputPrompt + '! Sorry, the correct answer is 田 !'; 
}

function getConfrim () {
    return confirm('JavaScript is fun! Right?');
}

function getResult(x) {
    switch(x) {
        case 1:
            setTimeout(function(){outputText = confirm('JavaScript is fun! Right?'); document.querySelector('.resultSec').innerHTML = comfirmText+outputText;}, 0);
            break;
        case 2:
            setTimeout(
                function(){
                    outputText = prompt("What is 1+1=", "");
                    if (outputText == "" || outputText == null) {
                        outputText = emptyPrompt;
                    } else {
                        outputText = aResult(outputText);
                    }
                    document.querySelector('.resultSec').innerHTML = outputText;
                }, 0);
            break;
        case 3:
            setTimeout(function(){
                outputText = prompt("Please enter your name:", "");
                if (outputText == "" || outputText == null) {
                    outputText = emptyPrompt;
                } else {
                    let newText = DOMPurify.sanitize( outputText );
                    outputText = strResult`Hi, ${newText} ! Hopefully you enjoy your stay!`;;
                }
                document.querySelector('.resultSec').innerHTML = outputText;
            }, 0);
            break;
        default:
            setTimeout( function() {alert(alertText); document.querySelector('.resultSec').innerHTML = alertOutText;}, 0);
            break;
    }
}