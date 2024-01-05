var targetInput;

function increment(key) {
  targetInput = document.getElementById("input-" + key);
  targetInput.stepUp();
}

function decrement(key) {
  targetInput = document.getElementById("input-" + key);
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