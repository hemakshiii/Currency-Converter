
const BASE_URL ="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdown = document.querySelectorAll(".drop-down select");
const btn=document.querySelector(".btnn")
const fromCurr=document.querySelector(".from select")
const toCurr=document.querySelector(".to select")
const msg = document.querySelector(".msg")

for(select of dropdown)
{
  for(currCode in countryList)
  {
    let newOption = document.createElement("option");
    newOption.innerText=currCode;
    newOption.value=currCode;
    if(select.name === "from" && currCode==="USD")
    {
      newOption.selected="selected";
    }
    else if(select.name === "to" && currCode==="INR")
    {
      newOption.selected="selected";
    }
    select.append(newOption)
  }
  
select.addEventListener("change",(evt)=>{
upFlag(evt.target);
})
}


const upFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;

  // Find the closest parent with the class "from" or "to"
  let parentElement = element.closest('.from, .to');

  if (parentElement) {
      let img = parentElement.querySelector('img');
      if (img) {
          img.src = newSrc;
      }
  }
};

btn.addEventListener("click", async(evt)=>{
  evt.preventDefault();
  let amount = document.querySelector(".amount input")
  let amtVal= amount.value;
 if(amtVal ==="" || amtVal<0)
 {
   amtVal=1;
  amount.value="1"
 }

 const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
 let response = await fetch(URL);
 let data =await response.json();
 let rate=data[toCurr.value.toLowerCase()];

 let finalAmount=amtVal*rate;
 msg.innerText=`${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`
});