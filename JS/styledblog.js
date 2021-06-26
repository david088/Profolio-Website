var blogBody, numItem, getAllItems, addItem, deleteItem;
var titleArr, dateArr, desArr;
// titleArrJ = ['IronMan'];
// dateArrJ = ['2021-02-28T14:20:04.111Z'];
// desArrJ = ['Iron Man is a 2008 American superhero film based on the Marvel Comics character. The main actor was  Robert Downey Jr.'];
// localStorage.setItem("titleJSONstyled", JSON.stringify(titleArrJ));
// localStorage.setItem("dateJSONstyled", JSON.stringify(dateArrJ));
// localStorage.setItem("summaryJSONstyled", JSON.stringify(desArrJ));
var app = new function (){
    this.blogBody = document.getElementById('blogItem');

    let temptitle = localStorage.getItem("titleJSONstyled");
    let tempdate = localStorage.getItem("dateJSONstyled");
    let tempsumm = localStorage.getItem("summaryJSONstyled");

    this.titleArr = JSON.parse(temptitle);
    this.dateArr = JSON.parse(tempdate);
    this.desArr = JSON.parse(tempsumm);

    if (this.titleArr == null) {
        this.titleArr = ['IronMan'];
        this.dateArr = ['2021-02-28T14:20:04.111Z'];
        this.desArr = ['Iron Man is a 2008 American superhero film based on the Marvel Comics character. The main actor was  Robert Downey Jr.'];
    }

    this.getAllItems = function() {
        var post = '';
        if(this.titleArr.length > 0) {
            for (j = 0; j < this.titleArr.length; j++) {
                post += '<section class="eachBlogItem">';
                post += '<h2> Title: ' + this.titleArr[j] + '</h2>';
                post += '<div class="aBlock"><p class="p1">Summary:<br><br>' + this.desArr[j] + '</p>';
                post += '<p class="p2">' + (new Date(this.dateArr[j])) + '</p></div>';
                post += '<button class="customButton" onclick="app.editItem(' + j + ')"><img class="secretButton" src="../img/edit.png" alt="EDIT"></button>';
                post += '<button class="customButton" onclick="app.deleteItem(' + j + ')"><img class="secretButton" src="../img/delete.png" alt="EDIT"></button>';
                post += '</section>';
            }
        }
        
        return this.blogBody.innerHTML = post;
    }

    this.addItem = function(Date){
        let inputTitle = document.getElementById('addTitle').value;
        let inputSum = document.getElementById('addSummary').value;
        if (inputTitle == null || inputTitle == '') {
            alert('Title Cannot Be Empty!');
        } else if (inputSum == null || inputSum == ''){
            alert('Summary Cannot Be Empty!');
        } else {
            inputTitle = DOMPurify.sanitize( inputTitle );
            inputSum = DOMPurify.sanitize( inputSum );
            this.titleArr.push(inputTitle);
            this.dateArr.push(Date);
            this.desArr.push(inputSum);
            localStorage.setItem("titleJSONstyled", JSON.stringify(this.titleArr));
            localStorage.setItem("dateJSONstyled", JSON.stringify(this.dateArr));
            localStorage.setItem("summaryJSONstyled", JSON.stringify(this.desArr));
        }
        document.getElementById('addTitle').value = '';
        document.getElementById('addSummary').value = '';
        this.getAllItems();
        promptDialog.close();
    }

    this.editItem = function (index) {
        promptDialog.showModal();
        document.getElementById('defaultBlock').style.display = 'none';
        document.getElementById('editBlock').style.display = 'block';


        document.getElementById('editTitle').value= this.titleArr[index];
        document.getElementById('editSummary').value= this.desArr[index];

        currScope = this;

        document.getElementById('saveChange').onsubmit = function() {
            let theTitle = document.getElementById('editTitle').value;
            let theSumm = document.getElementById('editSummary').value;

            if (theTitle == null || theTitle == '') {
                alert("Title Cannot be Empty");
            } else if ( theSumm == null || theSumm == '') {
                alert("Summary Cannot be Empty");
            } else {
                theTitle = DOMPurify.sanitize( theTitle );
                theSumm = DOMPurify.sanitize( theSumm );
                currScope.titleArr.splice(index, 1, theTitle);
                currScope.desArr.splice(index, 1, theSumm);
                currScope.dateArr.splice(index, 1, new Date());
                localStorage.setItem("titleJSONstyled", JSON.stringify(currScope.titleArr));
                localStorage.setItem("dateJSONstyled", JSON.stringify(currScope.dateArr));
                localStorage.setItem("summaryJSONstyled", JSON.stringify(currScope.desArr));

                currScope.getAllItems();
                closeEdit();
            }
        }
    }
    this.deleteItem = function (index) {
        this.titleArr.splice(index, 1);
        this.dateArr.splice(index, 1);
        this.desArr.splice(index, 1);
        localStorage.setItem("titleJSONstyled", JSON.stringify(this.titleArr));
        localStorage.setItem("dateJSONstyled", JSON.stringify(this.dateArr));
        localStorage.setItem("summaryJSONstyled", JSON.stringify(this.desArr));
        this.getAllItems();
    }
};


// prompt button
const outPutMessage2 = document.querySelector('.resultSec');
const emptyString = 'Hi, Stranger';
var visitorName = '[anonymous]';

function promptResult(str, food) {
    return `${str[0]}${food}${str[1]}`;
}

const openPrompt = document.querySelector('#blogButton');
const closePrompt = document.querySelector('.cancelB');
const okPrompt = document.querySelector('.submitB');
const promptDialog = document.querySelector('#blogD');

openPrompt.addEventListener('click', ()=>{
    promptDialog.showModal();
});
closePrompt.addEventListener('click', ()=>{
    document.getElementById('addTitle').value = '';
    document.getElementById('addSummary').value = '';
    promptDialog.close();
});
okPrompt.addEventListener('click', ()=>{
    app.addItem(new Date());
});
promptDialog.addEventListener('close', ()=>{
    promptDialog.returnValue = '';
});

function closeEdit() {
    document.getElementById('editBlock').style.display = 'none';
    document.getElementById('defaultBlock').style.display = 'block';
    promptDialog.close();
}
function activateUI() {
    app.getAllItems();
}
function clearLocal() {
    localStorage.clear();
}

// //const openPrompt2 = document.querySelector('#safePCB');
// const closePrompt2 = document.querySelector('.promptClose');
// const okPrompt2 = document.querySelector('.promptOk');
// const promptDialog2 = document.querySelector('#promptD');

// // openPrompt2.addEventListener('click', ()=>{
// //     outPutMessage2.innerHTML = '';
// //     promptDialog2.showModal();
// // });
// closePrompt2.addEventListener('click', ()=>{
//     document.getElementById('promptInput').value = '';
//     promptDialog2.close(emptyString);
// });
// okPrompt2.addEventListener('click', ()=>{
//     let inputStr = document.getElementById('promptInput').value;
//     if (inputStr == '' || inputStr == null){
//         promptDialog2.close(emptyString);
//     } else {
//         let cleanText = DOMPurify.sanitize( inputStr );
//         inputStr = promptResult`HI, ${cleanText}! WELCOME!`;
//         visitorName = cleanText;
//         promptDialog2.close(inputStr);
//     }
//     document.getElementById('promptInput').value = '';
// });
// promptDialog2.addEventListener('close', ()=>{
//     outPutMessage2.innerHTML = promptDialog2.returnValue;
//     promptDialog2.returnValue = '';
// });
