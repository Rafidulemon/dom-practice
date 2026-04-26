const lists = document.getElementById("table-body");
const input = document.getElementById("input");
const addBtn = document.getElementById("add-btn");

// add task
addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const input_value = input.value.trim();

  if (input_value === "") {
    alert("Input can't be empty");
    return;
  }
  const newTask = document.createElement("tr");
  newTask.innerHTML = `
    <td><input type="checkbox"/></td>
    <td>${input_value}</td>
    <td><button class="delete-btn">Delete</button></td>
  `;
  lists.appendChild(newTask);
  input.value = "";
});

// enter key
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addBtn.click();
});

// delete
lists.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    e.target.closest("tr").remove();
  }
});

// mark complete
lists.addEventListener("change", (e) => {
  if (e.target.type === "checkbox") {
    const row = e.target.closest("tr");
    if (e.target.checked) {
      row.classList.add("completed");
    } else {
      row.classList.remove("completed");
    }
  }
});

// filter
const filterBtns = document.querySelectorAll(".filter-btn");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {

    // active button style
    filterBtns.forEach((b) => b.classList.remove("active-filter"));
    btn.classList.add("active-filter");

    const filter = btn.id;
    const rows = lists.querySelectorAll("tr");

    rows.forEach((row) => {
      const isCompleted = row.classList.contains("completed");
      if (filter === "all") {
        row.style.display = "";
      } else if (filter === "active") {
        row.style.display = isCompleted ? "none" : "";
      } else if (filter === "completed") {
        row.style.display = isCompleted ? "" : "none";
      }
    });
  });
});