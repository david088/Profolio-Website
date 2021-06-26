// Web app's Firebase configuration /////////////////////
var firebaseConfig = {
    apiKey: "AIzaSyC79MWmwkG4UK21sVneVCzJ1BhYXCZ0-i8",
    authDomain: "web-phase4.firebaseapp.com",
    projectId: "web-phase4",
    storageBucket: "web-phase4.appspot.com",
    messagingSenderId: "721427012728",
    appId: "1:721427012728:web:96ca7e3a22b5c31ea8218d",
    measurementId: "G-BR02BXEQ9W"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//////////////////////////////////////////////////////////

const greetingUser = document.querySelector('.resultSec');
var isLoggedIn = false;
var username = "";
var cookieTag = "logInCode";

///////////////////////////////////////////////////////////

// check if logged in
var decodedCookie = decodeURIComponent(document.cookie);
var cookieList = decodedCookie.split(';');
console.log("Cookies: " + cookieList);
for (var i = 0; i < cookieList.length; i++) {
    var strList = cookieList[i].split("=");
    if (strList[0] == cookieTag) {
        username = strList[1];
        if (username == "") {
            isLoggedIn = false;
        } else {
            isLoggedIn = true;
        }
        break;
    }
}

if (isLoggedIn) {
    console.log("ALREADY LOGGED IN");
    //document.getElementById('blogSection').style.display = 'block';
    var nameU = username.split("+");
    greetingUser.innerHTML = "Greetings, " + nameU[0];
    document.getElementById('logInButton').style.display = 'none';
    document.getElementById('logOutButton').style.display = 'inline-block';
    
} else {
    console.log("NEED TO LOG IN");
    document.getElementById('logInButton').style.display = 'inline-block';
    document.getElementById('logOutButton').style.display = 'none';
}

//////////////////////////////////////////////////////////////

// Log In with Google Auth
function logIn(){
    var GoogleProvider = new firebase.auth.GoogleAuthProvider();
    var cred, token, users;
    console.log("LOG IN");
    firebase.auth().signInWithPopup(GoogleProvider)
    .then((res) => {

        console.log("Am I In?");
        cred = res.credential;
        token = cred.accessToken;
        users = res.user;

        // document.getElementById('blogSection').style.display = 'block';
        document.cookie = cookieTag+"="+users.displayName+"+"+users.email+"+"+users.uid;
        username = users.displayName+"+"+users.email+"+"+users.uid;
        greetingUser.innerHTML = "Greetings, " + users.displayName;

        console.log(document.cookie);
        console.log(token);
        console.log(users.displayName);
        console.log(users.email);
        console.log(users.uid);
        document.getElementById('logInButton').style.display = 'none';
        document.getElementById('logOutButton').style.display = 'inline-block';
        showAllBlogs();
        isLoggedIn = true;

    }).catch((err) => {
        var errCode = err.code;
        var errMess = err.message;
        var email = err.email;
        var credential = err.credential;
        console.log("ERROR?: " + errCode);
    });
}

// Log out
function logOut() {
    document.cookie=cookieTag+"=";
    console.log(document.cookie);
    //document.getElementById('blogSection').style.display = 'none';
    greetingUser.innerHTML = "Hi, Stranger";
    
    username = '';
    showAllBlogs();
    isLoggedIn = false;

    document.getElementById('logInButton').style.display = 'inline-block';
    document.getElementById('logOutButton').style.display = 'none';
}

///////////////////////////////////////////////////////////////////////

// Firebase Storage
var datebase = firebase.firestore();

// Create Post then add to Firestore
function createBlog() {
    let inputTitle = document.getElementById('addTitle').value;
    let inputSum = document.getElementById('addSummary').value;
    if (inputTitle == null || inputTitle == '') {
        alert('Title Cannot Be Empty!');
        document.getElementById('addTitle').value = "";
        document.getElementById('addSummary').value = "";
    } else if (inputSum == null || inputSum == ''){
        alert('Summary Cannot Be Empty!');
        document.getElementById('addTitle').value = "";
        document.getElementById('addSummary').value = "";
    } else {
        inputTitle = DOMPurify.sanitize( inputTitle );
        inputSum = DOMPurify.sanitize( inputSum );
        let strL = username.split("+");

        datebase.collection("blog").add({
            title: inputTitle,
            summary: inputSum,
            date: new Date(),
            author: strL[0],
            email: strL[1],
            uid: strL[2]
        }).then((ref) =>{
            console.log("Blog ID: " + ref.id);
        }).catch ((err) => {
            console.log("Error adding blog: ", err);
        })

        document.getElementById('addTitle').value = '';
        document.getElementById('addSummary').value = '';
    }
}

// Show all blogs from the Firestore
function showAllBlogs() {
    datebase.collection("blog").get().then((query) => {
        var post = '';
        var i = 0;
        query.forEach((item) => {
            var data = item.data();
            post += '<article class="eachBlogItem">';
            post += '<h2> Title: ' + data.title + '</h2>';
            post += '<section class="aBlock"><p class="p1">Summary:<br><br>' + data.summary + '</p>';
            post += '<p class="p2">Created by ' + data.author + ' (' +data.email+ ')</p>';
            post += '<p class="p2">' + data.date.toDate().toString() + '</p></section>';

            // check if displaying blog is created by current logged in user
            var nameList = username.split("+");
            if (nameList[2] == data.uid) {
                post += '<button class="customButton" onclick="editBlog('+i+')"><img class="secretButton" src="../img/edit.png" alt="EDIT"></button>';
                post += '<button class="customButton" onclick="deleteBlog('+i+')"><img class="secretButton" src="../img/delete.png" alt="EDIT"></button>';
            }
            post += '</article>';
            i++;
        });
        document.getElementById('blogItem').innerHTML = post;
    });
}

// Delete blog from Firestore
function deleteBlog(id){
    var docId;
    datebase.collection("blog").get().then((query) => {
        var j = 0;
        query.forEach((item) => {
            if (j == id) {
                docId = item.id;
            }
            j++;
        });
        datebase.collection("blog").doc(docId).delete().then(()=>{
            console.log("DELETED A BLOG");
            showAllBlogs();
        }).catch((err) => {
            console.log("ERROR DELETING BLOG");
        });
    });
}

// Edit blog
var docId;
function editBlog(id) {
    var docData;
    promptDialog.showModal();
    document.getElementById('defaultBlock').style.display = 'none';
    document.getElementById('editBlock').style.display = 'block';
    
    datebase.collection("blog").get().then((query) => {
        var j = 0;
        query.forEach((item) => {
            if (j == id) {
                docId = item.id;
                docData = item.data();
            }
            j++;
        });

        document.getElementById('editTitle').value= docData.title;
        document.getElementById('editSummary').value= docData.summary;
    });

    editData = docData;
}

// Save button at Editing page
function saveChange() {
        let theTitle = document.getElementById('editTitle').value;
        let theSumm = document.getElementById('editSummary').value;

        if (theTitle == null || theTitle == '') {
            alert("Title Cannot be Empty");
            document.getElementById('addTitle').value = "";
            document.getElementById('addSummary').value = "";
        } else if ( theSumm == null || theSumm == '') {
            alert("Summary Cannot be Empty");
            document.getElementById('addTitle').value = "";
            document.getElementById('addSummary').value = "";
        } else {
            theTitle = DOMPurify.sanitize( theTitle );
            theSumm = DOMPurify.sanitize( theSumm );
            let strL = username.split("+");
            datebase.collection("blog").doc(docId).update({
                    title: theTitle,
                    summary: theSumm,
                    date: new Date(),
                    author: strL[0],
                    email: strL[1],
                    uid: strL[2] 
            }).then(()=>{
                    console.log("EDITED A BLOG");
                    showAllBlogs();
                    closeEdit();
            }).catch((err) => {
                    console.log("ERROR EDITING BLOG");
            });
         }
    }


// Function to display the blogs on page load
showAllBlogs();

///////////////////////////////////////////////////////////////////////

// Create blog button control 
const openPrompt = document.querySelector('#blogButton');
const closePrompt = document.querySelector('.cancelB');
const okPrompt = document.querySelector('.submitB');
const promptDialog = document.querySelector('#blogD');

openPrompt.addEventListener('click', ()=>{
    if (isLoggedIn) {
        promptDialog.showModal();
    } else {
        alert("PLEASE LOG IN TO CREATE BLOGS!");
    }
    
});
closePrompt.addEventListener('click', ()=>{
    document.getElementById('addTitle').value = '';
    document.getElementById('addSummary').value = '';
    promptDialog.close();
});
okPrompt.addEventListener('click', ()=>{
    createBlog();
    showAllBlogs();
    promptDialog.close();
});
promptDialog.addEventListener('close', ()=>{
    promptDialog.returnValue = '';
});

// Close Editing overlay
function closeEdit() {
    document.getElementById('editBlock').style.display = 'none';
    document.getElementById('defaultBlock').style.display = 'block';
    promptDialog.close();
}

