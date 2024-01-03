const inputSlider = document.querySelector("[data-lengthSlider]"); 
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]"); 
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/'; 

let password= ""; 
let passwordLength= 10; 
let checkCount= 1; 
handleSlider(); 

//set strength circle to grey
setIndicator("#ccc"); 


// set passwordLength
function handleSlider(){
    inputSlider.value= passwordLength; 
    lengthDisplay.innerText= passwordLength; 
}

function setIndicator(color){
    indicator.style.backgroundColor = color; 
    indicator.style.boxShadow = `0 0 8px 5px ${color}`;
    // shadow (H.W.)
}

function getRndInteger(min, max){
    return Math.floor(Math.random()*(max-min)) + min; 
}

function generateRandomNumber(){
    return getRndInteger(0,9); 
}

function generateLowerCase(){
    return String.fromCharCode(getRndInteger(97,123)); 
}

function generateUpperCase(){
     return String.fromCharCode(getRndInteger(65,91)); 
}

function generateSymbol(){
    return symbols[getRndInteger(0,30)]; 
}

function calcStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if (uppercaseCheck.checked) hasUpper = true;
    if (lowercaseCheck.checked) hasLower = true;
    if (numbersCheck.checked) hasNum = true;
    if (symbolsCheck.checked) hasSym = true;
  
    if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
      setIndicator("#0f0");
    } else if (
      (hasLower || hasUpper) &&
      (hasNum || hasSym) &&
      passwordLength >= 6
    ) {
      setIndicator("#ff0");
    } else {
      setIndicator("#f00");
    }
}

function calcStrength (){
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if (uppercaseCheck.checked) hasUpper = true;
    if (lowercaseCheck.checked) hasLower = true;
    if (numbersCheck.checked) hasNum = true;
    if (symbolsCheck.checked) hasSym = true;
  
    if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
      setIndicator("#0f0");
    } else if (
      (hasLower || hasUpper) &&
      (hasNum || hasSym) &&
      passwordLength >= 6
    ) {
      setIndicator("#ff0");
    } else {
      setIndicator("#f00");
    }
}

async function copyContent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value); 
        copyMsg.innerText = "copied"; 
    }
    catch(e){
        copyMsg.innerText =  "failed"; 
    }
    //to make copy wala span visible
    copyMsg.classList.add("active"); 

    setTimeout(() => {
        copyMsg.classList.remove("active"); 
    }, 2000);
}

function getRandomInt(n) {
    return Math.floor(Math.random() * n);
  }
  function shuffle(s) {
    var arr = s.split('');           // Convert String to array
    var n = arr.length;              // Length of the array
    
    for(var i=0 ; i<n-1 ; ++i) {
      var j = getRandomInt(n);       // Get random of [0, n-1]
      
      var temp = arr[i];             // Swap arr[i] and arr[j]
      arr[i] = arr[j];
      arr[j] = temp;
    }
    
    s = arr.join('');                // Convert Array to string
    return s;                        // Return shuffled string
  }

function handleCheckBoxChange(){
    checkCount = 0; 
    allCheckBox.forEach((checkbox)=>{
        if(checkbox.checked){
            checkCount++; 
        }  
    })

    if(passwordLength<checkCount){
        passwordLength= checkCount; 
        handleSlider(); 
    }
}

allCheckBox.forEach((checkbox)=>{
    checkbox.addEventListener('click', handleCheckBoxChange)
})

inputSlider.addEventListener('input', (event)=>{
    passwordLength= event.target.value; 
    handleSlider(); 
})

copyBtn.addEventListener('click', ()=>{
    if(passwordDisplay.value){
        copyContent();
    }
})


// function getRandomInt(n) {
//   return Math.floor(Math.random() * n);
// }


generateBtn.addEventListener('click', ()=>{
     // none of the checkbox are selected
     if(checkCount==0) 
     return; 

     if(passwordLength<checkCount){
        passwordLength= checkCount; 
        handleSlider(); 
    }

    // let's start journey to find the new password
    console.log("Starting the journey");
    
    //remove old password
    password= ""; 

    // let's put the stuff mentioned by checkboxes

    // if(uppercaseCheck.checked){
    //     password+=generateUpperCase();
    // }
    // if(lowercaseCheck.checked){
    //     password+=generateLowerCase(); 
    // }
    // if(numbersCheck.checked){
    //     password+=generateRandomNumber();
    // }
    // if(symbolsCheck.checked){
    //     password+=generateSymbol(); 
    // }

    let funcArr = []; 

    if(uppercaseCheck.checked) 
    funcArr.push(generateUpperCase);
         
    if(lowercaseCheck.checked) 
    funcArr.push(generateLowerCase);
         
    if(numbersCheck.checked) 
    funcArr.push(generateRandomNumber);
         
    if(symbolsCheck.checked) 
    funcArr.push(generateSymbol);

    //compulsory addition in password string or password
    for(let i=0; i<funcArr.length; i++){
        password+= funcArr[i](); 
    }
    console.log("compulsory addition done");

    // remaining addition 
    for(let i=0; i<passwordLength-funcArr.length; i++){
        let randIndex= getRndInteger(0, funcArr.length); 
        password= password + funcArr[randIndex](); 
    }
    console.log("remaining addition done");

    //shuffle the password
    password= shuffle(password);
    console.log("shuffling done");
    // show in UI
    passwordDisplay.value = password;
    console.log("UI addition done");
    //calculate strength
    calcStrength(); 

})
