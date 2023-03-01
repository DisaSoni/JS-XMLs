function navActive(id){
    const activeItem = document.getElementById(`nav-${id}`);
    activeItem.className += " active";
}

window.onload = getSetGo;

function getSetGo() {
    if (location.pathname === "/shop"){
        navActive("shop");
    }
    else if (location.pathname === "/"){
        navActive("home");
    }
    else if (location.pathname === "/about"){
        navActive("about");
    }
}
