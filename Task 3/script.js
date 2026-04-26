const counter = document.querySelector(".number")
let count = 0;
const increase = document.querySelector(".increase")
const decrease = document.querySelector(".decrease")
const reset = document.querySelector(".reset")
increase.addEventListener("click", (e)=>{
    count++;
    e.preventDefault()
    counter.textContent = count
})

decrease.addEventListener("click", (e)=>{
    count--;
    if(count<0){
        count = 0
        return
    }
    e.preventDefault()
    counter.textContent = count
})

reset.addEventListener("click", (e)=>{
    count = 0;
    e.preventDefault()
    counter.textContent = count
})