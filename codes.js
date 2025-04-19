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
    console.log(`[MyTracker] ${new Date().toISOString()} , view , document`);

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
        console.log(`[MyTracker] ${timestamp} , click , ${elementType}`);
    });

    const seenSections = new Set();

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id || entry.target.className || "unknown";
                if (!seenSections.has(id)) {
                    seenSections.add(id);
                    console.log(`[MyTracker] ${new Date().toISOString()} , view , ${id}`);
                }
            }
        });
    }, {
        threshold: 0.5
    });

    const sectionsToTrack = ['aboutm', 'Skillset', 'intro','cv'];
    sectionsToTrack.forEach(id => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
    });
});

function analyzeText() {
    const text = document.getElementById('analyzer').value;

    const letterCount = (text.match(/[a-zA-Z]/g) || []).length;
    const wordCount = (text.match(/\b\w+\b/g) || []).length;
    const spaceCount = (text.match(/ /g) || []).length;
    const newlineCount = (text.match(/\n/g) || []).length;
    const specialCharCount = (text.match(/[^a-zA-Z0-9\s]/g) || []).length;

    const words = text.toLowerCase().match(/\b\w+\b/g) || [];

    const pronouns = ["i", "you", "he", "she", "it", "we", "they", "me", "him", "her", "us", "them", "my", "your", "his", "its", "our", "their", "mine", "yours", "hers", "ours", "theirs"];
    const prepositions = ["in", "on", "at", "by", "for", "with", "about", "against", "between", "into", "through", "during", "before", "after", "above", "below", "to", "from", "up", "down", "over", "under"];
    const articles = ["a", "an"];

    const countOccurrences = (wordList) => {
        return wordList.reduce((acc, word) => {
            if (acc[word]) acc[word]++;
            else acc[word] = 1;
            return acc;
        }, {});
    };

    const filterAndCount = (set) => {
        return countOccurrences(words.filter(w => set.includes(w)));
    };

    const pronounCounts = filterAndCount(pronouns);
    const prepositionCounts = filterAndCount(prepositions);
    const articleCounts = filterAndCount(articles);

    document.getElementById('results').innerHTML = `
        <p><strong>Letters:</strong> ${letterCount}</p>
        <p><strong>Words:</strong> ${wordCount}</p>
        <p><strong>Spaces:</strong> ${spaceCount}</p>
        <p><strong>Newlines:</strong> ${newlineCount}</p>
        <p><strong>Special Symbols:</strong> ${specialCharCount}</p>
        <hr>
        <h3>Pronouns:</h3>
        <pre>${JSON.stringify(pronounCounts, null, 2)}</pre>
        <h3>Prepositions:</h3>
        <pre>${JSON.stringify(prepositionCounts, null, 2)}</pre>
        <h3>Indefinite Articles:</h3>
        <pre>${JSON.stringify(articleCounts, null, 2)}</pre>
    `;
}
