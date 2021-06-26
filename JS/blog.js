var blogBody, numItem, getAllItems, addItem, deleteItem;
var titleArr, dateArr, desArr;
// titleArrJ = [];
// dateArrJ = [];
// desArrJ = [];
// localStorage.setItem("titleJSON", JSON.stringify(titleArrJ));
// localStorage.setItem("dateJSON", JSON.stringify(dateArrJ));
// localStorage.setItem("summaryJSON", JSON.stringify(desArrJ));

var app = new function (){
    this.blogBody = document.getElementById('blogItem');

    let temptitle = localStorage.getItem("titleJSON");
    let tempdate = localStorage.getItem("dateJSON");
    let tempsumm = localStorage.getItem("summaryJSON");

    this.titleArr = JSON.parse(temptitle);
    this.dateArr = JSON.parse(tempdate);
    this.desArr = JSON.parse(tempsumm);

    if (this.titleArr == null) {
        this.titleArr = [];
        this.dateArr = [];
        this.desArr = [];
    }

    this.getAllItems = function() {
        var post = '';
        if(this.titleArr.length > 0) {
            for (j = 0; j < this.titleArr.length; j++) {
                post += '<section>';
                post += '<h2>' + this.titleArr[j] + '</h2>';
                post += '<p>' + this.desArr[j] + '</p>';
                post += '<p>' + (new Date(this.dateArr[j])) + '</p>';
                post += '<button onclick="app.editItem(' + j + ')">Edit</button>';
                post += '<button onclick="app.deleteItem(' + j + ')">Delete</button>';
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
            localStorage.setItem("titleJSON", JSON.stringify(this.titleArr));
            localStorage.setItem("dateJSON", JSON.stringify(this.dateArr));
            localStorage.setItem("summaryJSON", JSON.stringify(this.desArr));
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
                localStorage.setItem("titleJSON", JSON.stringify(currScope.titleArr));
                localStorage.setItem("dateJSON", JSON.stringify(currScope.dateArr));
                localStorage.setItem("summaryJSON", JSON.stringify(currScope.desArr));

                currScope.getAllItems();
                closeEdit();
            }
        }
    }
    this.deleteItem = function (index) {
        this.titleArr.splice(index, 1);
        this.dateArr.splice(index, 1);
        this.desArr.splice(index, 1);
        localStorage.setItem("titleJSON", JSON.stringify(this.titleArr));
        localStorage.setItem("dateJSON", JSON.stringify(this.dateArr));
        localStorage.setItem("summaryJSON", JSON.stringify(this.desArr));
        this.getAllItems();
    }
};


// prompt button
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