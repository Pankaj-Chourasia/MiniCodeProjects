const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');

const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    special: getRandomSpecial
};

generateEl.addEventListener('click', ()=>{
    const length = +lengthEl.value;
    const uppercase = uppercaseEl.checked;
    const lowercase = lowercaseEl.checked;
    const numbers = numbersEl.checked;
    const symbols = symbolsEl.checked;

    resultEl.innerText = generatePassword(lowercase, uppercase, numbers, symbols, length);
});

function generatePassword(lower, upper, number, special, length){

    let generatedPassword = '';

    const typesCount = lower + upper + number + special;

    const typesArr = [{lower}, {upper}, {number}, {special}].filter(item => Object.values(item)[0]);

    if(typesCount === 0){
        return '';
    }

    for(let i = 0; i < length; i += typesCount){
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];
            console.log(funcName);
            generatedPassword += randomFunc[funcName]();
        });
    }
    const finalPassword = generatedPassword.slice(0, length);

    return finalPassword;
}

clipboardEl.addEventListener('click', ()=>{
    const password = resultEl.innerHTML;
    if(!password) return;

    navigator.clipboard.writeText(password);
    alert('Password copied to clipboard');
});

function getRandomLower(){
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper(){
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber(){
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSpecial(){
   const symbols = '@#<>!~*&^%$)(_+=-;:[]{}';
   return symbols[Math.floor(Math.random() * symbols.length)];
}

