function increment(key) {
  const targetInput = document.getElementById(`input_${key}`)
  targetInput.stepUp();
}

function decrement(key) {
  const targetInput = document.getElementById(`input_${key}`)
  targetInput.stepDown();
}

function toggleAddIgemView() {
  const addGroups = document.querySelectorAll('.addGroup');
  const addDate = document.querySelector('.add_date');
  const addIgemBtn = document.getElementById("addIgemBtn");
  const saveIgemsBtn = document.getElementById("saveIgemsBtn");
  const lines = document.querySelectorAll('.line');

  addGroups.forEach(group => {
    group.style.display = group.style.display === 'flex' ? 'none' : 'flex';
  })

  addDate.style.display = addDate.style.display === 'block' ? 'none' : 'block'; 
  addIgemBtn.textContent = addIgemBtn.textContent === "Close" ? "Add iGems" : "Close";
  saveIgemsBtn.style.display = saveIgemsBtn.style.display === "block" ? "none" : "block";

  // adjust line grid columns
  lines.forEach(line => {
    line.style.gridTemplateColumns = line.style.gridTemplateColumns === '0.5fr 1.5fr 3fr 3fr 2fr 1fr 3fr 2fr 2fr' ? '0.5fr 1.5fr 3fr 3fr 2fr 1fr 3fr 2fr' : '0.5fr 1.5fr 3fr 3fr 2fr 1fr 3fr 2fr 2fr';
  })

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

    // if (ecBtnValue === "Edit") {
      if (lastClicked && lastClicked != index) {
        optionBoxes[lastClicked].style.visibility = "hidden";
        rows[lastClicked].classList.remove('highlight');
        const editBtn = document.getElementById(`editBtn_${lastClicked}`);
        // editBtn.textContent = "Edit";
        // ecBtnValue = editBtn.textContent;
      }
      row.classList.add('highlight');
      optionBoxes[index].style.visibility = "visible";
      lastClicked = index;
      // setTimeout(() => {
      //   optionBox.classList.add("hidden");
      // }, 5000);
    // }
  });
});

var lastEditedRow;
var originaInnerHTML;
var lineValues = [];
var lastIndex;
// var ecBtnValue = 'Edit';

const editMode = document.querySelector('.editMode');


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
  // editBtn.textContent = editBtn.textContent === "Close" ? "Edit" : "Close";
  // ecBtnValue = editBtn.textContent;

  // if (ecBtnValue === "Close") {
    // originaInnerHTML = rows[index].innerHTML;
    var setDate = new Date(new Date().setDate(new Date(lineValues[1]).getDate())).toISOString().split('T')[0];

    var status = lineValues[4];
    var selectStatus = `<select name="edit" id="statusSelect" class="edit_status"><option value="On-Going" ${status === 'On-Going' ? 'selected' : ''}>On-going</option><option value="Pending" ${status === 'Pending' ? 'selected' : ''}>Pending</option><option value="Completed" ${status === 'Completed' ? 'selected' : ''}>Completed</option><option value="URGENT" ${status === 'URGENT' ? 'selected' : ''}>URGENT</option></select>`

    editMode.innerHTML = `<button type="button" id="closeEditModeBtn" onclick="closeEditor()">Close</button><form action="/edit" method="post" id="editForm" class="flex-col"><input type="num" name="edit" readonly value="${lineValues[0]}" class="edit_id"><input type="date" id="currentDate" name="edit" value="${setDate}" class="edit_date"><input type="text" value="${lineValues[2]}" name="edit" class="edit_category"/><input type="text" value="${lineValues[3]}" name="edit" class="edit_task"/>${selectStatus}<div class="flex-row"><input type="number" step="0.5" value="${lineValues[5]}" name="edit" class="edit_earned"/><button type="submit" class="saveBtn">Save</button></div></form>`;

    editMode.style.display = 'flex';
    ecBtnValue = 'Close';
  // }
}

function closeEditor(){
  editMode.style.display = 'none';
}


const warningBox = document.querySelector('.warningBox');

function deleteRow(index) {
  const deleteBtn = document.getElementById(`deleteBtn_${index}`);
  const idVal = deleteBtn.getAttribute('data-deleteID');
  const deleteID = document.querySelector('#deleteID');
  deleteID.setAttribute('value', idVal);

  warningBox.style.display = 'flex';
}

const exitBtn = document.getElementById('no');
exitBtn.addEventListener('click', function () {
  warningBox.style.display = 'none';
})