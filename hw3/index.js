/* YOUR CODE HERE! */
let boxesEl = document.getElementsByClassName('box')
let boxCont = document.querySelector(".box-container");
let offset = [0, 0];
let boxAmount = 1;
let maxNum = 1;
let colors = ["Violet", "Yellow", "Tomato", "Orange", "SlateBlue", "Gray", "Gold", "Pink", "Magenta", "Green", "Brown"];

[...boxesEl].forEach((box) => {
    handlers(box)
})

function createNewObject(eve){
    boxAmount++; maxNum++;
    const newObj = document.createElement("div");
    newObj.className = "box";
    newObj.innerHTML = maxNum;
    newObj.style.left = eve.target.getBoundingClientRect().right + 'px';
    newObj.style.top = eve.target.getBoundingClientRect().bottom + 'px';

    boxCont.appendChild(newObj);

    boxesEl = document.getElementsByClassName('box');
    handlers(newObj);
   
}

function removeObject(eve){
    boxAmount--;
    boxCont.removeChild(eve.target);
}

function handlers(box) {

    box.addEventListener('dblclick', (eve) => {
        if (!eve.altKey) {
            createNewObject(eve);
        }
        else{
            if (boxAmount > 1){
                removeObject(eve);
            }
        }
    })

    box.addEventListener('mousedown', (eve) => {
        if (eve.target.classList.contains('box')) {
            mouseDown = true;
            offset = [
                eve.target.offsetLeft - eve.clientX,
                eve.target.offsetTop - eve.clientY
            ];
        }
    })

    box.addEventListener('mousedown', (eve) => {
        if (eve.which === 3) {
            eve.target.style.background = colors[Math.floor(Math.random() * 10)];
        }
    })

    box.addEventListener('mouseup', (eve) => {
        mouseDown = false;
    })

    box.addEventListener('mousemove', (eve) => {
        if (eve.which === 1 && mouseDown) {
            let xCoord = eve.clientX + offset[0];
            let yCoord = eve.clientY + offset[1];
            eve.target.style.left = xCoord + 'px';
            eve.target.style.top = yCoord + 'px';
        }
    })

    box.addEventListener('click', (eve) => {
        if (eve.shiftKey) {
            if (eve.target.classList.contains("box-large")) {
                eve.target.classList.remove("box-large");
            } 
            else {
                eve.target.classList.add("box-large");
            }
        }
    })
}

window.addEventListener("contextmenu", eve => eve.preventDefault());
