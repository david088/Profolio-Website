const outPutMessage = document.querySelector('.resultSec');
const emptyString = 'User didn’t enter anything';
function promptResult(str, food) {
    let res = '';
    return `${str[0]}${food}${str[1]}`;
}

// ALERT //////////////////////////////////////////////////
const openAlert = document.querySelector('#alertCB');
const closeAlert = document.querySelector('.alertClose');
const alertDialog = document.querySelector('#alertD');

openAlert.addEventListener('click', ()=>{
    outPutMessage.innerHTML = '';
    alertDialog.showModal();
})
closeAlert.addEventListener('click', ()=>{
    alertDialog.close();
})

// COMFIRM ////////////////////////////////////////////////
const openCon = document.querySelector('#confirmCB');
const closeCon = document.querySelector('.confirmClose');
const okCon = document.querySelector('.confirmOk');
const confirmDialog = document.querySelector('#confirmD');

openCon.addEventListener('click', ()=>{
    outPutMessage.innerHTML = '';
    confirmDialog.showModal();
});
closeCon.addEventListener('click', ()=>{
    confirmDialog.close('Confrim Result: False');
});
okCon.addEventListener('click', ()=>{
    confirmDialog.close('Confirm Result: True');
})
confirmDialog.addEventListener('close', ()=>{
    outPutMessage.innerHTML = confirmDialog.returnValue;
    confirmDialog.returnValue = '';
});

// PROMPT //////////////////////////////////////////////////
const openPrompt = document.querySelector('#safePCB');
const closePrompt = document.querySelector('.promptClose');
const okPrompt = document.querySelector('.promptOk');
const promptDialog = document.querySelector('#promptD');

openPrompt.addEventListener('click', ()=>{
    outPutMessage.innerHTML = '';
    promptDialog.showModal();
});
closePrompt.addEventListener('click', ()=>{
    document.getElementById('promptInput').value = '';
    promptDialog.close(emptyString);
});
okPrompt.addEventListener('click', ()=>{
    let inputStr = document.getElementById('promptInput').value;
    if (inputStr == '' || inputStr == null){
        promptDialog.close(emptyString);
    } else {
        let cleanText = DOMPurify.sanitize( inputStr );
        inputStr = promptResult`You ate ${cleanText} for breakfast!`;
        promptDialog.close(inputStr);
    }
    document.getElementById('promptInput').value = '';
});
promptDialog.addEventListener('close', ()=>{
    outPutMessage.innerHTML = promptDialog.returnValue;
    promptDialog.returnValue = '';
});