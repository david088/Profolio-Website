const imgDialog = document.querySelector('#dialogImg');
                const imgClose = document.querySelector('#imgClose');
                function largeImg(source){
                    document.getElementById('resultSec').src = source.src;
                    document.getElementById('resultSec').alt = source.alt;
                    imgDialog.showModal();
                }
                imgClose.addEventListener('click', ()=> {
                    imgDialog.close();
                });