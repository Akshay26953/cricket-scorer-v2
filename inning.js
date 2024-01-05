const form = document.querySelector("form");
const targetOpt = document.querySelector(".targetOpt");
const dialog = document.getElementById("dialog");
let overs = document.getElementById("overs");
let target = document.getElementById("target");

function showDialog() {
  const matchStatus = localStorage.getItem("matchSetup");
  if (matchStatus === null) {
    dialog.style.display = "block";
  } else {
    dialog.style.display = "none";
  }
}
showDialog();

function setTarget() {
  let inn = document.querySelector('input[name="inn"]:checked').value;

  if (inn === "true") {
    targetOpt.style.display = "block";
  } else {
    targetOpt.style.display = "none";
  }
}

function subSetup() {
  let inn = document.querySelector('input[name="inn"]:checked').value;

  const matchSetup = {
    overs: Number(overs.value),
    target: Number(target.value),
    inn: inn,
  };

  localStorage.setItem("matchSetup", JSON.stringify(matchSetup));
  showDialog();
}
