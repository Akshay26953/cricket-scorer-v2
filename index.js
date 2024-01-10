const showTarget = document.querySelector(".showTarget");
const srTeam = document.querySelector(".srTeam");
const srScore = document.querySelector(".srScore");
const srRuns = document.querySelector(".srRuns");
const srOvers = document.querySelector(".srOvers");
const stBalls = document.querySelector(".stBalls");
const stRuns = document.querySelector(".stRuns");
const infotar = document.querySelector(".infotar");
const inforrr = document.querySelector(".inforrr");
const currentOvers = document.getElementById("currentOvers");
const coBalls = document.getElementById("coBalls");
const currentInn = document.getElementById("currentInn");
const extraRunBtn = document.querySelector(".extraRunBtn");
const matchResult = document.querySelector(".matchResult");
const endFirstInn = document.getElementById("endFirstInn");
const runBtnSet = document.querySelector(".runBtnSet").children;

// const sec2 = document.querySelector(".sec2");
const form = document.querySelector("form");
const targetOpt = document.querySelector(".targetOpt");
const dialog = document.getElementById("dialog");
// let overs = document.getElementById("overs");

const getData = () => {
  const matchStatus = JSON.parse(localStorage.getItem("matchSetup"));
  const score = JSON.parse(localStorage.getItem("scoreCard"));
  return {
    matchStatus,
    score,
    ballsBowled:
      score !== null
        ? (score.overs.length - 1) * 6 + score.over.length - score.extras
        : 0,
    totalBalls: score !== null ? matchStatus.overs * 6 : 0,
  };
};

function checkMatchStatus() {
  const { matchStatus, score, ballsBowled, totalBalls } = getData();
  if (matchStatus !== null && score !== null) {
    if (matchStatus.inn === "false") {
      // code for first batting
      if (ballsBowled == totalBalls) {
        endFirstInn.style.display = "block";
      }
    } else {
      if (matchStatus.target < score.score) {
        console.log("Team B won");
      } else if (
        matchStatus.target < score.score &&
        totalBalls === ballsBowled
      ) {
        console.log("Team B won");
      } else if (
        matchStatus.target - 1 > score.score &&
        totalBalls === ballsBowled
      ) {
        console.log("Team A Won");
      } else if (
        matchStatus.target - 1 === score.score &&
        totalBalls === ballsBowled
      ) {
        console.log("Match Tied");
      }
    }
  }
}

function showDialog() {
  const matchStatus = localStorage.getItem("matchSetup");
  if (matchStatus === null) {
    dialog.style.display = "block";
  } else {
    dialog.style.display = "none";
  }
  showScore();
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

function showScore() {
  checkMatchStatus();

  const { matchStatus, score, ballsBowled, totalBalls } = getData();
  if (score === null) {
    if (matchStatus !== null) {
      srTeam.innerHTML = `${
        matchStatus.inn === "true" ? "Team B :" : "Team A :"
      }`;
      srOvers.innerHTML = "(0.0/" + matchStatus.overs + ")";
    }
  } else {
    const showAllOvers = score.overs
      .map((e, index) => {
        return `<div class="overs"><div class="overTag">Over ${
          index + 1
        }</div> <div class="over">${e
          .map((e) => {
            if (e[0] == "W" || e[1] == "W") {
              return `<span class="ball wkt">${e}</span>`;
            } else if (e == 6 || e[0] == "6") {
              return `<span class="ball six">${e}</span>`;
            } else if (e == 4 || e[0] == "4") {
              return `<span class="ball four">${e}</span>`;
            } else {
              return `<span class="ball">${e}</span>`;
            }
          })
          .join(" ")}</div></div>`;
      })
      .join(" ");
    currentOvers.innerHTML = showAllOvers;

    if (matchStatus.inn === "true") {
      showTarget.style.display = "block";
      stRuns.innerHTML = matchStatus.target - score.score;
      stBalls.innerHTML = totalBalls - ballsBowled;
      infotar.style.display = "block";
      inforrr.style.display = "block";
      infotar.innerHTML = "Target: " + matchStatus.target;
    }

    srTeam.innerHTML = `${
      matchStatus.inn === "true" ? "Team B : " : "Team A : "
    }`;

    srRuns.innerHTML = score.score + " / " + score.wickets;

    if (score.over.length - score.extras < 6) {
      srOvers.innerHTML =
        "(" +
        (score.overs.length - 1) +
        "." +
        (score.over.length - score.extras) +
        "/" +
        matchStatus.overs +
        ")";
    } else {
      srOvers.innerHTML =
        "(" + score.overs.length + ".0" + "/" + matchStatus.overs + ")";
    }

    const showCurrentOver = score.over
      .map((e) => {
        if (e[0] == "W" || e[1] == "W") {
          return `<span class="ball wkt">${e}</span>`;
        } else if (e == 6 || e[0] == "6") {
          return `<span class="ball six">${e}</span>`;
        } else if (e == 4 || e[0] == "4") {
          return `<span class="ball four">${e}</span>`;
        } else {
          return `<span class="ball">${e}</span>`;
        }
      })
      .join(" ");

    coBalls.innerHTML = showCurrentOver;
  }
}
showScore();

function addRun(run) {
  updateOver(run);
}

function updateOver(run) {
  const score = localStorage.getItem("scoreCard");
  if (score === null) {
    scoreSheet = {
      target: 0,
      overs: [],
      over: [],
      score: 0,
      wickets: 0,
      extras: 0,
      extraRun: 0,
    };
  } else {
    scoreSheet = JSON.parse(score);
  }
  updateOvers(run, scoreSheet);
}
function updateOvers(run, score) {
  if (score.over.length - score.extras > 5) {
    score.over = [];
    score.extras = 0;
  } else {
    score.overs.pop();
  }
  score.over.push(run);
  score.overs.push(score.over);
  updateScore(run, score);
}

function updateScore(run, score) {
  if (typeof run === "number") {
    score.score += run;
  } else {
    if (run === "W") {
      score.wickets += 1;
    } else {
      score.extras += 1;
      score.score += 1;
    }
    for (let x of runBtnSet) {
      x.disabled = true;
    }
    extraRunBtn.style.display = "block";
  }
  localStorage.setItem("scoreCard", JSON.stringify(score));
  showScore();
}

function addExtraRun(extraRun) {
  const score = JSON.parse(localStorage.getItem("scoreCard"));
  if (extraRun === 0) {
    run = score.over.pop();
  } else {
    run = extraRun + score.over.pop();
  }
  for (let x of runBtnSet) {
    x.disabled = false;
  }
  extraRunBtn.style.display = "none";
  score.over.push(run);
  score.overs.pop();
  score.overs.push(score.over);
  score.score += extraRun;
  localStorage.setItem("scoreCard", JSON.stringify(score));
  showScore();
}

function resetLast() {
  const last = confirm("Do you want to delete score on last ball?");
  if (last) {
    const score = JSON.parse(localStorage.getItem("scoreCard"));
    if (score.over.length !== 0) {
      const lastScore = score.over.pop();
      if (typeof lastScore === "number") {
        score.score -= lastScore;
      } else {
        if (lastScore[0] === "W" || lastScore[1] === "W") {
          score.wickets -= 1;
          if (lastScore[1] === "W") {
            score.score -= Number(lastScore[0]);
          }
        } else {
          score.extras -= 1;
          if (lastScore[1] === "w" || lastScore[1] === "n") {
            score.score -= Number(lastScore[0]) + 1;
          }
        }
      }
      score.overs.pop();
      score.overs.push(score.over);
      localStorage.setItem("scoreCard", JSON.stringify(score));
    }
    showScore();
  }
}

function resetAll() {
  const reset = confirm("Do you want to start fresh?");
  if (reset) {
    localStorage.clear();
  }
  showScore();
}

function startNewGame() {
  matchResult.style.display = "none";
  if (reset) {
    localStorage.clear();
  }
  showScore();
}

function startNewInning() {
  const { matchStatus, score } = getData();
  endFirstInn.style.display = "none";

  matchStatus.inn = "true";
  matchStatus.target = score.score + 1;
  localStorage.setItem("teamAscore", JSON.stringify(score));
  localStorage.removeItem("scoreCard");
  localStorage.setItem("matchSetup", JSON.stringify(matchStatus));
}
