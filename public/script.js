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
        editBtn.textContent = "Edit";
        ecBtnValue = editBtn.textContent;
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

  for (var i = 0; i < lineChildren.length; i++) {
    lineValues.push(lineChildren[i].innerHTML);
  }

  const editBtn = document.getElementById(`editBtn_${index}`);
  editBtn.textContent = editBtn.textContent === "Close" ? "Edit" : "Close";
  ecBtnValue = editBtn.textContent;

  if (ecBtnValue === "Close") {
    originaInnerHTML = rows[index].innerHTML;

    rows[index].innerHTML = `<form action="/edit" method="post" id="editForm" class="line"><input type="num" name="edit" readonly value="${lineValues[0]}" class="edit_id"><input type="text" value="${lineValues[1]}" name="edit" class="edit_category"/><input type="text" value="${lineValues[2]}" name="edit" class="edit_task"/><input type="text" value="${lineValues[3]}" name="edit" class="edit_status"/><div class="flex-row"><input type="number" step="0.5" value="${lineValues[4]}" name="edit" class="edit_earned"/><button type="submit" class="saveBtn">Save</button></div></form>`;
    ecBtnValue = 'Close';
  } else {
    rows[index].innerHTML = originaInnerHTML;
  }
}

const warningBox = document.querySelector('.warningBox');

function deleteRow(index) {
  //  console.log(deleteID.getAttribute());
  const deleteBtn = document.getElementById(`deleteBtn_${index}`);
  const idVal = deleteBtn.getAttribute('data-deleteID');
  // console.log(deleteBtn.getAttribute('data-deleteID'));
  const deleteID = document.querySelector('#deleteID');
  deleteID.setAttribute('value', idVal);


  // const confirmBtn = document.querySelector('#yes');
  // confirmBtn.setAttribute('name', index);

  warningBox.style.display = 'flex';
  // confirmBtn.setAttribute()
  // console.log(`Deleting row ${index}`);
}

// function exitDelete() {
const exitBtn = document.getElementById('no');
exitBtn.addEventListener('click', function () {
  warningBox.style.display = 'none';
})
// }

function saveRow(index) {
  console.log(`Saving row ${index}`);
}