var inputs = document.querySelectorAll(".numberInput");

function increment(key) {
  var targetInput = inputs[key];
  targetInput.stepUp();
}

function decrement(key) {
  var targetInput = inputs[key];
  targetInput.stepDown();
}

function toggleAddIgemView() {
  // const cells = document.querySelectorAll(".hiddenCell");
  //   console.log(cells.length);
  const addGrid = document.querySelector("#addGrid");
  addGrid.style.display = addGrid.style.display === "grid" ? "none" : "grid";

  const addIgemBtn = document.getElementById("addIgemBtn");
  addIgemBtn.textContent =
    addIgemBtn.textContent === "Close" ? "Add iGems" : "Close";

  const saveIgemsBtn = document.getElementById("saveIgemsBtn");
  saveIgemsBtn.style.display =
    saveIgemsBtn.style.display === "block" ? "none" : "block";
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
const optionBoxes = document.querySelectorAll(".optionBox");
var closeClicked = false;
var lastClicked;

rows.forEach((row) => {
  row.addEventListener("click", function () {
    const index = row.id;

    if (ecBtnValue === "Edit") {
      if (lastClicked && lastClicked != index) {
        optionBoxes[lastClicked].style.visibility = "hidden";
        const editBtn = document.getElementById(`editBtn_${lastClicked}`);
        // const saveBtn = document.getElementById(`saveBtn_${lastClicked}`);

        // saveBtn.style.display = "none";
        editBtn.textContent = "Edit";
        ecBtnValue = editBtn.textContent;
        console.log(ecBtnValue);
      }

      optionBoxes[index].style.visibility = "visible";
      lastClicked = index;

      // setTimeout(() => {
      //   optionBox.classList.add("hidden");
      // }, 5000);
    }


  });
});

var lastEditedRow;
var originaInnerHTML;
var lineValues = [];
var lastIndex;
var ecBtnValue = 'Edit';

function editRow(index) {
  lastIndex = index;
  lineValues = [];

  const rows = document.querySelectorAll(".row");
  const line = rows[index];
  const lineChildren = line.children[0].children;
  console.log(lineChildren);

  for (var i = 0; i < lineChildren.length; i++) {
    lineValues.push(lineChildren[i].innerHTML);
  }

  if (ecBtnValue === 'Close') {

  }

  const editBtn = document.getElementById(`editBtn_${index}`);
  editBtn.textContent = editBtn.textContent === "Close" ? "Edit" : "Close";
  ecBtnValue = editBtn.textContent;
  console.log(ecBtnValue);


  if (lastIndex) {
    rows[lastIndex].innerHTML = originaInnerHTML;
  }

  rows[index].innerHTML = `<form action="/edit" method="post" id="editForm" class="line"><input type="text" value="${lineValues[0]}" name="edit_category"/><input type="text" value="${lineValues[1]}" name="edit_task"/><input type="text" value="${lineValues[2]}" name="edit_status"/><div class="flex-row"><input type="number" value="${lineValues[3]}" name="edit_earned"/><button type="submit" class="saveBtn">Save</button></div></form>`;
}

function deleteRow(index) {
  console.log(`Deleting row ${index}`);
}

function saveRow(index) {
  console.log(`Saving row ${index}`);
}