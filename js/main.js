let winX = 0;
let winY = 0;

let dX = 0;
let dY = 0;

let newX = 0;
let newY = 0;

let activeWindow = null;

document.addEventListener("mousedown", mouseDown);

function mouseDown(e) {

    const clickedElement = e.target;
    const winHead = clickedElement.closest(".head");
    const windo = clickedElement.closest(".window");

    if(!windo) return;
    const allWindo = document.querySelectorAll(".window");
    allWindo.forEach(win => {
        if(win.style.zIndex>=0)win.style.zIndex = 0;
    });
    windo.style.zIndex = 1;
    
    if(!winHead) return;
    const win = winHead.parentElement;
    document.body.style.userSelect = "none";
    console.log("SET ON 0");
    if(win.style.width=="100vw"){
        console.log("UWU");
        win.style.width = "40vw";
        win.style.height = "50vh";
        win.querySelector("section").style.height = "50vh";
        win.querySelector("section").querySelector(".scroller").style.height = "50vh";
        win.style.left = e.clientX - 20 + "px";
        win.style.top = e.clientY + "px";
    }
    winX = win.style.left;
    winY = win.style.top;

    activeWindow = win;

    
    
    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseup", mouseUp);

    winX = activeWindow.getBoundingClientRect().left;
    winY = activeWindow.getBoundingClientRect().top;

    

    dX = e.clientX - winX;
    dY = e.clientY - winY;
}

function mouseMove(e) {

    newX = e.clientX - dX;
    newY = e.clientY - dY;
    
    winX = activeWindow.getBoundingClientRect().left;
    winY = activeWindow.getBoundingClientRect().top;

    activeWindow.style.left = newX + "px";
    activeWindow.style.top = newY + "px";
    
}

function mouseUp(e) {
    document.body.style.userSelect = "";
    activeWindow = null;
    document.removeEventListener("mousemove", mouseMove);
}


function closeWindow(obje) {
    activeWindow = null;
    document.removeEventListener("mousemove", mouseMove);
    obje.parentElement.parentElement.style.zIndex = -1;
}

function extendWindow(obje) {
    activeWindow = null;
    document.removeEventListener("mousemove", mouseMove);
    const winStyl = obje.parentElement.parentElement.style;
    const SectionStyl = obje.parentElement.parentElement.querySelector("section");
    const scrollerStyl = SectionStyl.querySelector(".scroller");
    winStyl.top = 0;
    winStyl.left = 0;
    winStyl.width = "100vw";
    winStyl.height = "100vh";
    console.log(SectionStyl.innerHTML);
    SectionStyl.style.height = "100vh";
    scrollerStyl.style.height = "100vh";
    
}

function openWin(winName) {
    activeWindow = null;
    const windo = document.getElementById(winName).parentElement;
    windo.style.zIndex = 0;
    console.log(winName);
    
}

function copyText(obje){
    const txt = obje.innerHTML;
    navigator.clipboard.writeText(txt);
    alert(txt + " is copied to the clipboard");
}