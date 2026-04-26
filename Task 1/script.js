const lists = document.getElementById("task-list")
const input = document.getElementById("input")
const addBtn = document.getElementById("add-btn")

addBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    const input_value = input.value.trim();

    if(input_value === ""){
        alert("Input can't be empty")
        return
    }
    const newTask = document.createElement("div");
    newTask.innerHTML = `<input type="checkbox"> ${input_value} <button class="delete-btn">Delete</button>`;
    lists.appendChild(newTask);
    input.value = ""
})