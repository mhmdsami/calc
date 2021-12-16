const root = document.documentElement;
const themeSelector = document.querySelector("select");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const equals = document.querySelector(".equals");
const clearButton = document.querySelector(".clear");
const deleteButton = document.querySelector(".delete");
const mainScreen = document.querySelector("h3");
const secondaryScreen = document.querySelector("h5");

function setTheme(theme){
    root.style.setProperty("--bg-color", theme[0]);
    root.style.setProperty("--primary-color", theme[1]);
    root.style.setProperty("--primary-highlight", theme[2]);
    root.style.setProperty("--secondary-color", theme[3]);
    root.style.setProperty("--font-color", theme[4]);
}

let themes = {
    default: ["#ffffff", "#EEEEEE", "#ffffff", "#2C272E", "#2C272E"],
    justBlack: ["#212529", "#343a40", "#212529", "#495057", "#adb5bd"],
    retro: ["#FAEDF0", "#FABB51", "#FAEDC6", "#3E8E7E", "#121212"],
    nord: ["#4C566A", "#2E3440", "#3B4252", "#434C5E", "#D8DEE9"],
    greenishDelight: ["#D3E4CD", "#ADC2A9", "#D3E4CD", "#3E8E7E", "#353535"],
    space: ["#222831", "#00ADB5", "#222831", "#393E46", "#EEEEEE"],
    discordDark: ["#40444b", "#36393f", "#40444d", "#2f3136", "#eaeaeb"]
}

let expression = "";
numbers.forEach(number => {
    number.addEventListener("click", () => {
        if(mainScreen.innerText != ""){
            expression = "";
            secondaryScreen.innerText = null;
            mainScreen.innerText = null;
        }
        expression += number.innerHTML;
        secondaryScreen.append(number.innerHTML);
    });
});


operators.forEach(operator => {
    operator.addEventListener("click", () => {
        if(secondaryScreen.innerText != ""){
            if(secondaryScreen.innerText.includes("=")){
                expression = mainScreen.innerText;
                secondaryScreen.innerText = mainScreen.innerText;
                mainScreen.innerText = null;
            }

            if(["+", "-", "*", "/"].indexOf(secondaryScreen.innerText.split("").slice(-1)[0]) == -1){
                expression += operator.innerHTML;
                secondaryScreen.append(operator.innerHTML);
            }
        }
    });
});

equals.addEventListener("click", () => {
    try{
        let answer = eval(expression)
        mainScreen.innerText = answer;
        secondaryScreen.append("=");
    }catch(SyntaxError){
        mainScreen.innerText = "ERROR";
    }
});

clearButton.addEventListener("click", () => {
    mainScreen.innerText = null;
    secondaryScreen.innerText = null;
    expression = "";
});

deleteButton.addEventListener("click", () => {
    console.log("Pressesd")
    if(mainScreen.innerText == ""){
        expression = expression.slice(0, -1);
        secondaryScreen.innerText = expression;
    }else{
        mainScreen.innerText = null;
        secondaryScreen.innerText = null;
        expression = "";
    }
});

themeSelector.addEventListener("change", () => {
    setTheme(themes[themeSelector.value])
});
