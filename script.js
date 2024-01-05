var cursor = document.querySelector(".cursor");
document.addEventListener("mousemove",function(e){
    cursor.style.cssText = "left: " + e.clientX + "px; top: " + e.clientY + "px;";

});


window.addEventListener("scroll",()=>{
    document.getElementById("name").style.transform = `translateY(${window.scrollY * 0.6}px)`;
    console.log(`${window.scrollY * 1 + window.innerWidth}px`);
    document.getElementById("name").style.opacity = `${1-(window.scrollY * 0.0014)}`;

    document.getElementById("name2").style.transform = `translateY(${window.scrollY * 0.6}px)`;
    console.log(`${window.scrollY * 1 + window.innerWidth}px`);
    document.getElementById("name2").style.opacity = `${1-(window.scrollY * 0.0014)}`;
    
    // document.getElementById("container").style.transform = `translateY(-${window.scrollY*1.2}px)`;
})


document.getElementById("arrdwn").addEventListener('click',()=>{
    if (document.getElementById("navmenu").style.top == `-100px`) {
        document.getElementById("navmenu").style.top = `0px`;
        document.getElementById("navbox").style.opacity = `1`;
        // document.getElementById("arrdwn").style.transform = `rotateX(-180deg)`;
    }
    else {
        document.getElementById("navmenu").style.top = `-100px`;
        document.getElementById("navbox").style.transitionDelay = `0s`;
        document.getElementById("navbox").style.opacity = `0`;
        // document.getElementById("arrdwn").style.transform = `rotateX(180deg)`;
        
    }
})

