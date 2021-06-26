// set inital date to the request form section
document.getElementById('response').innerHTML = "";

var urlGet = 'https://httpbin.org/get';
var urlPost = 'https://httpbin.org/post';
var urlPut = 'https://httpbin.org/put';
var urlDelete = 'https://httpbin.org/delete';
var titleStr = "Request Form ";

function concatField(str, id, name, body, date) {
    return `${str[0]}${id}${str[1]}${name}${str[2]}${body}${str[3]}${date}`;
}

async function respondGet(){
    document.getElementById('date').value = new Date();
    let getId = document.getElementById('id');
    let getName = document.getElementById('article_name');
    let getBody = document.getElementById('article_body');
    let getDate = document.getElementById('date').value;

    let requestData = 
    concatField`?id=${getId.value}&article_name=${getName.value}&article_body=${getBody.value}&date=${getDate}`;

    let response = await fetch(urlGet+requestData, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
    });

    if (response.ok) {
        let json = await response.json();
        document.getElementById('response').innerHTML = "<pre>" + JSON.stringify(json, undefined, 2) + "</pre>";
    } else {
        alert("HTTP-Error" + response.status);
    }

    clearFiled();
}

async function respondPost(){  
    document.getElementById('date').value = new Date();
    const form = new FormData(document.getElementById('get_form'));

    let response = await fetch(urlPost, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(Object.fromEntries(form))
    });

    if (response.ok) {
        let json = await response.json();
        document.getElementById('response').innerHTML = "<pre>" + JSON.stringify(json, undefined, 2) + "</pre>";
    } else {
        alert("HTTP-Error" + response.status);
    }

    clearFiled();
}

async function respondPut(){  
    document.getElementById('date').value = new Date();
    
    const form = new FormData(document.getElementById('get_form'));

    let response = await fetch(urlPut, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(Object.fromEntries(form))
    });

    if (response.ok) {
        let json = await response.json();
        document.getElementById('response').innerHTML = "<pre>" + JSON.stringify(json, undefined, 2) + "</pre>";
    } else {
        alert("HTTP-Error" + response.status);
    }

    clearFiled();
}

async function respondDelete(){  
    document.getElementById('date').value = new Date();
    let getId = document.getElementById('id');
    let getName = document.getElementById('article_name');
    let getBody = document.getElementById('article_body');
    let getDate = document.getElementById('date').value;

    let requestData = 
    concatField`?id=${getId.value}&article_name=${getName.value}&article_body=${getBody.value}&date=${getDate}`;
    
    let response = await fetch(urlDelete+requestData, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
    });

    if (response.ok) {
        let json = await response.json();
        document.getElementById('response').innerHTML = "<pre>" + JSON.stringify(json, undefined, 2) + "</pre>";
    } else {
        alert("HTTP-Error" + response.status);
    }

    clearFiled();
}

function showGetForm(){
    setBlock("- Get");
    document.getElementById('submitBtn').setAttribute("onClick", "respondGet()") ;
    document.getElementById('response').innerHTML = "";
}
function showPostForm(){
    setBlock("- Post");
    document.getElementById('submitBtn').setAttribute("onClick", "respondPost()") ;
    document.getElementById('response').innerHTML = "";
}
function showPutForm(){
    setBlock("- Put");
    document.getElementById('submitBtn').setAttribute("onClick", "respondPut()") ;
    document.getElementById('response').innerHTML = "";
}
function showDeleteForm(){
    setBlock("- Delete");
    document.getElementById('submitBtn').setAttribute("onClick", "respondDelete()") ;
    document.getElementById('response').innerHTML = "";
}

function setBlock(str){
    document.getElementById('get_form').style.display = "block";
    document.getElementById('formTitle').innerHTML = titleStr + str;
}
function clearFiled(){
    document.getElementById('article_name').value = "";
    document.getElementById('article_body').value = "";
}
