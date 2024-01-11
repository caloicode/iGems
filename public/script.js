var inputs = document.querySelectorAll(".numberInput");

function increment(key) {
  var targetInput = inputs[key];
  targetInput.stepUp();
}

function decrement(key) {
  var targetInput = inputs[key];
  targetInput.stepDown();
}

function toggleCell() {
  const cells = document.querySelectorAll(".hiddenCell");
  //   console.log(cells.length);

  const addIgemBtn = document.getElementById("addIgemBtn");
  addIgemBtn.textContent =
    addIgemBtn.textContent === "Close" ? "Add iGems" : "Close";

  const saveIgemsBtn = document.getElementById("saveIgemsBtn");
  saveIgemsBtn.style.display =
    saveIgemsBtn.style.display === "block" ? "none" : "block";

  cells.forEach((cell) => {
    cell.style.display =
      cell.style.display === "table-cell" ? "none" : "table-cell";
  });
}

function toggleHiddenDiv() {
  const hiddenDiv = document.getElementById("addBox");
  const toggleButton = document.getElementById("addBtn");

  hiddenDiv.style.display =
    hiddenDiv.style.display === "block" ? "none" : "block";
  toggleButton.textContent =
    toggleButton.textContent === "Add Gaim" ? "Close" : "Add Gaim";
}

const rows = document.querySelectorAll(".row");
var lastClicked;

rows.forEach((row) => {
  row.addEventListener("click", function () {
    const lastClickedOptionBox = document.getElementById(
      `optionBox_${lastClicked}`
    );
    if (lastClickedOptionBox) {
      lastClickedOptionBox.classList.add("hidden");
    }
    // console.log(row.id);
    const index = row.id;
    const optionBox = document.getElementById(`optionBox_${index}`);
    optionBox.classList.toggle("hidden");

    lastClicked = index;

    // setTimeout(() => {
    //   optionBox.classList.add("hidden");
    // }, 5000);
  });
});

var lastEditedRow;
function editRow(index) {
  const editBtn = document.getElementById(`editBtn_${index}`);
  const saveBtn = document.getElementById(`saveBtn_${index}`);

  saveBtn.style.display = saveBtn.style.display === "block" ? "none" : "block";
  editBtn.textContent = editBtn.textContent === "Close" ? "Edit" : "Close";

  // if (lastEditedRow) {
  // }

  const rows = document.querySelectorAll("tr");
  const content = rows[index + 1];
  const html = content.innerHTML;
  console.log(html);
  
  // const contentVal = content[0].textContent;
  // content[0].innerHTML = `<td><input type="text" value="${contentVal}" name="edit_category" id="edit_category">
  // </td>`;
  // console.log(content[0]);
  


  // console.log(lastEditedRow);
  
  // console.log(lastEditedRow.innerHTML);

  // const rows = document.querySelectorAll("tr");
  // const editableRow = rows[index + 1];
  // const category = editableRow.children[0];
  // category.setAttribute('contenteditable', 'true');
  // const task = editableRow.children[1];
  // task.setAttribute('contenteditable', 'true');
}

function deleteRow(index) {
  // Implement the logic to delete the row here
  console.log(`Deleting row ${index}`);
}

function saveRow(index) {
  console.log(`Saving row ${index}`);
}
