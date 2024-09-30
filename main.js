  let gameName="gusse teh word";
  document.title = gameName;
  document.querySelector("h1").innerHTML = gameName;
  document.querySelector("footer").innerHTML =`${gameName} &copy; ${new Date().getFullYear()} `;
   
  let numbertri = 6;
  let numberlet = 6;
  let currenttry = 1;
  let numberofhint = 2;


  let word="";
  const words=["create","update","delete","master","branch","mainly","Elzero","school"];
  word = words[Math.floor(Math.random() * words.length)].toLowerCase();
  let messagearee=document.querySelector(".message"); 

  let char=document.querySelector(".word");
  char.innerHTML=`<span>word to guess =></span> ${words.join(" || ")}`;



  document.querySelector(".hint span").innerHTML = numberofhint;
  const hintbutton=document.querySelector(".hint");
  hintbutton.addEventListener("click" , gethint);

  function generateinput(){
    const inputscontainer =document.querySelector(".inputs");

    for(let i = 1 ; i <= numbertri ; i++){
        const trydiv=document.createElement("div");
        trydiv.classList.add(`try-${i}`);
        trydiv.innerHTML=`<span>try${i}</span>`;

         if(i !== 1)trydiv.classList.add("disabled-inputs");

         for(let j = 1 ; j <= numberlet ; j++){

            const input = document.createElement("input");
            input.type = "text";
            input.id = `guess-${i}-letter-${j}`;
            input.setAttribute("maxlength", "1");

            trydiv.appendChild(input);
         }

        inputscontainer.appendChild(trydiv);
    }
    inputscontainer.children[0].children[1].focus();

    const inputsInDisabled = document.querySelectorAll(".disabled-inputs input");
    inputsInDisabled.forEach((input) => (input.disabled = true));

    const inputs= document.querySelectorAll("input");

    inputs.forEach((input, index) =>{
        input.addEventListener("input", function(){
            this.value= this.value.toLowerCase();
            // console.log(index);
            const nextinput = inputs[index + 1];
            if(nextinput) nextinput.focus();
        });

        input.addEventListener("keydown", function(event){
            // console.log(event)
            const currenindex = Array.from(inputs).indexOf(this); 
           //console.log(currenindex);
            if(event.key === "ArrowRight"){
                const nextinput = currenindex + 1;
                if(nextinput < inputs.length) inputs[nextinput].focus();
            }
            if(event.key === "ArrowLeft"){
                const previnput = currenindex - 1;
                if(previnput >= 0) inputs[previnput].focus();
            }
        });
    });
  }
const guessbuttom = document.querySelector(".check");
guessbuttom.addEventListener("click", handleguess);

// console.log(word);
function handleguess(){
    let succes = true;
    for(let i=1;i <=numberlet; i++){
        const inputfiled = document.querySelector(`#guess-${currenttry}-letter-${i}`);
        // console.log(inputfiled);
        const letter = inputfiled.value.toLowerCase();
        // console.log(letter);
        const feleter = word[i - 1];

        if(letter === feleter){
            inputfiled.classList.add("in_place");
        }else if(word.includes(letter) && letter !== ""){
            inputfiled.classList.add("not_place");
            succes = false;
        }else{
            inputfiled.classList.add("no");
            succes = false;
        }
    }

    if(succes){
        messagearee.innerHTML = `you win the word is <span>${word}</span>`;
        if(numberofhint === 2){
            messagearee.innerHTML = ` <p>congratz you didnt us hint nad word is ${word}</p>`;
        }
        let Alltri = document.querySelectorAll(".inputs > div");
        Alltri.forEach((trydiv) => trydiv.classList.add("disabled-inputs"));
        guessbuttom.disabled=true;
        hintbutton.disabled = true;
    }else{
        document.querySelector(`.try-${currenttry}`).classList.add("disabled-inputs");
        const currenttryinput=document.querySelectorAll(`.try-${currenttry} input`);
        currenttryinput.forEach((input) => (input.disabled = true));
        
        currenttry++;
        const nexttryinput =document.querySelectorAll(`.try-${currenttry} input`);
        nexttryinput.forEach((input) => (input.disabled = false));
        
        let el = document.querySelector(`.try-${currenttry}`);
        if(el){
            document.querySelector(`.try-${currenttry}`).classList.remove("disabled-inputs");
            el.children[1].focus();
        }else{
            guessbuttom.disabled=true;
            hintbutton.disabled = true;
            messagearee.innerHTML = `you lose the word is <span>${word}</span>`;
        }
    }
}

function gethint(){
    if(numberofhint > 0){
        numberofhint--;
        document.querySelector(".hint span").innerHTML = numberofhint;
        
    }
    if(numberofhint===0){
        hintbutton.disabled = true;
    }

    const enabledinput = document.querySelectorAll("input:not([disabled]");
    const emptyinput = Array.from(enabledinput).filter((input) => input.value==="");
    // console.log(emptyinput);
    if(emptyinput.length > 0){
        const randomindex = Math.floor(Math.random() * emptyinput.length);
        const randominput = emptyinput[randomindex];
        const indextofill = Array.from(enabledinput).indexOf(randominput)
        if(indextofill !==-1){
            randominput.value = word[indextofill].toLowerCase();
        }

        // console.log(randomindex);
        // console.log(randominput);
        // console.log(indextofill);
    }
        
}
function handel(event){
    if(event.key==="Backspace"){
        const inputs = document.querySelectorAll("input:not([disabled]");
        const currentindex = Array.from(inputs).indexOf(document.activeElement)
        // console.log(currentindex);
        if(currentindex > 0){
            const currentinput = inputs[currentindex];
            const prev = inputs[currentindex - 1];
            currentinput.value = "";
            prev.value = "";
            prev.focus();
        }
    }
}

document.addEventListener("keydown", handel)

window.onload=function(){
    generateinput();
    // handleguess();
};