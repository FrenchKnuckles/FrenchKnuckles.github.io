window.addEventListener("scroll",function(){
    const box=document.getElementById("topper");
    if(window.scrollY>0) {
        box.classList.add("scrolled");
    }
    else{
        box.classList.remove("scrolled");
    }
});
let dark=true;
const btn=document.querySelector(".button");

btn.addEventListener("click",function(event){
    dark=!dark;
    if(dark){
        btn.classList.add("white");
    }
    else{
        btn.classList.remove("white");
    }   
    const body=document.querySelector("body");
    if(dark){
        body.classList.add("dark-mode");
    }
    else{
        body.classList.remove("dark-mode");
    }
});

document.addEventListener("DOMContentLoaded", () => {
    console.log(`${new Date().toISOString()} , view , document`);

    function getElementType(target) {
        if (target.tagName === "IMG") return "image";
        if (target.tagName === "A") return "hyperlink";
        if (target.tagName === "BUTTON") return "button";
        if (target.tagName === "SELECT") return "drop-down";
        if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") return "form field";
        if (/H[1-6]/.test(target.tagName)) return "heading";
        if (target.tagName === "P" || target.tagName === "DIV") return "text";
        return target.tagName.toLowerCase();
    }

    document.body.addEventListener("click", (event) => {
        const target = event.target;
        const timestamp = new Date().toISOString();
        const elementType = getElementType(target);
        console.log(`${timestamp} , click , ${elementType}`);
    });

    const seenSections = new Set();

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id || entry.target.className || "unknown";
                if (!seenSections.has(id)) {
                    seenSections.add(id);
                    console.log(`${new Date().toISOString()} , view , ${id}`);
                }
            }
        });
    }, {
        threshold: 0.5
    });

    const sectionsToTrack = ['aboutm', 'Skillset', 'intro'];
    sectionsToTrack.forEach(id => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
    });
});
