"use strict";
const locationHTML = document.getElementById('location');
const spokenHTML = document.getElementById('spoken');
const checkDigitHTML = document.getElementById('checkDigit');
const SPOKEN = ["ALPHA", "BRAVO", "CHARLIE", "DELTA", "ECHO", "FOXTROT", "GOLF", "HOTEL", "INDIA", "JULIET", "KILO", "LIMA", "MIKE", "NOVEMBER", "OSCAR", "PAPA", "QUEBEC", "ROMEO", "SIERRA", "TANGO", "UNIFORM", "VICTOR", "WHISKEY", "XRAY", "YANKEE", "ZULU"];
const NUMBERS = ["ZERO", "ONE", "TWO", "THREE", "FOUR", "FIVE", "SIX", "SEVEN", "EIGHT", "NINE"];
locationHTML.addEventListener("input", () => {
    let location = locationHTML.value.toLocaleUpperCase();
    locationHTML.value = location.replace(/[^A-Z]/, '');
    if (!(location == "RETURNS" || location == "RETURN" || location == "RETUR"))
        locationHTML.value = locationHTML.value.substring(0, 4);
    if (locationHTML.value.length === 4) {
        let spoken = "";
        let checkDigit = 45;
        for (let i = 0; i < 4; i++) {
            let a = locationHTML.value.charCodeAt(i) - 65;
            spoken += SPOKEN[a] + (i === 3 ? "" : " ");
            if (i === 0) {
                a *= 5;
            }
            else if (i == 1 || i == 2) {
                a *= 7;
            }
            else {
                a *= 3;
            }
            checkDigit += a;
        }
        checkDigit = Math.round(((checkDigit / 99) - Math.floor(checkDigit / 99)) * 99);
        spokenHTML.innerHTML = spoken;
        checkDigitHTML.innerHTML = NUMBERS[Math.floor(checkDigit / 10)] + " " + NUMBERS[checkDigit % 10];
        spokenHTML.classList.remove("yellowText");
        checkDigitHTML.classList.remove("blackText");
    }
    else if (locationHTML.value == "RETURNS") {
        spokenHTML.innerHTML = "RETURNS";
        checkDigitHTML.innerText = "FOUR EIGHT";
        spokenHTML.classList.remove("yellowText");
        checkDigitHTML.classList.remove("blackText");
    }
    else {
        checkDigitHTML.innerHTML = "_";
        spokenHTML.innerHTML = "_";
        spokenHTML.classList.add("yellowText");
        checkDigitHTML.classList.add("blackText");
    }
});
if ("serviceWorker" in navigator) {
    if (navigator.serviceWorker.controller) {
    }
    else {
        navigator.serviceWorker
            .register("sw.js", {
            scope: "./"
        });
    }
}
//# sourceMappingURL=main.js.map