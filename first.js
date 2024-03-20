const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies"

const dropdown=document.querySelectorAll(".dropdown select")
const btn=document.querySelector("form button")
const fromCurr=document.querySelector(".from select")
const toCurr=document.querySelector(".to select")
const msg=document.querySelector(".msg");

// when document load for first time we want usd to inr default

for(let select of dropdown){
    for(currcode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=currcode;
        newOption.value=currcode;
        if(select.name==="from" && currcode==="USD"){
            newOption.selected="selected";
        }
        else if(select.name==="to" && currcode==="INR"){
            newOption.selected="selected";
        }
        select.append(newOption);
 }


 // Ye for loop ke andhar kyu lagaya (eventListener)
 select.addEventListener("change",(evt)=>{
    // console.log(evt.target);  /*evt.target is a  select*/
    updateFlag(evt.target);
 });
};



const updateFlag=(element)=>{
let currcode=element.value;
let countrycode=countryList[currcode];
let newSrc=`https://flagsapi.com/${countrycode}/flat/64.png`;
let img=element.parentElement.querySelector("img");
img.src=newSrc;
}

const updateExchangeRate=async()=>{
    let amount=document.querySelector(".amount input");
    let amtVal=amount.value;
    // console.log(amtVal);
    if(amtVal==="" || amtVal<1){
        amtVal=1;
        amount.value="1";
    } 
    
    // console.log(fromCurr.value,toCurr.value);
    const URL=`${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`  //we have to sent request to this URL(fetch API used on this URL)
    
    let response=await fetch(URL);
    let data=await response.json();
    // console.log(data);
    let rate=data[toCurr.value.toLowerCase()];   
    // console.log(rate);
    
    let finalAmount=amtVal*rate
    msg.innerText=`${amtVal}${fromCurr.value} = ${finalAmount}${toCurr.value}`
}

btn.addEventListener("click",(evt)=>{
evt.preventDefault(); // button click karne par jo baar baar load ho raha hai vo hath jayegha
updateExchangeRate();
})

window.addEventListener("load", () => {
    updateExchangeRate();
  });