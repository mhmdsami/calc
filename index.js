const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator")
const equals = document.querySelector(".equals")
const mainScreen = document.querySelector("h3");
const secondaryScreen = document.querySelector("h5");

let expression = '';
numbers.forEach(number => {
    number.addEventListener("click", () => {
        if(mainScreen.innerText != ''){
            expression = '';
            secondaryScreen.innerText = null;
            mainScreen.innerText = null;
        }
        expression += number.innerHTML;
        secondaryScreen.append(number.innerHTML);
    });
});


operators.forEach(operator => {
    operator.addEventListener("click", () => {
        if(mainScreen.innerText != ''){
            expression = mainScreen.innerText;
            secondaryScreen.innerText = mainScreen.innerText;
            mainScreen.innerText = null;
        }
        if(["+", "-", "*", "/"].indexOf(secondaryScreen.innerText.split(-2)) == -1){
            expression += operator.innerHTML;
            secondaryScreen.append(operator.innerHTML);
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