const showRuns = document.querySelector(".showRuns");
const showOvers = document.querySelector(".showOvers");
const sec2 = document.querySelector(".sec2");

function showScore() {
  const score = JSON.parse(localStorage.getItem("scoreCard"));

  console.log(score);
  if (score === null) {
    showRuns.innerHTML = "0 / 0";
    showOvers.innerHTML = "0.0 Overs";
    sec2.innerHTML = "";
  } else {
    const data = score.overs
      .map((e, index) => {
        return `<div class="overs"><div class="overTag">Over ${
          index + 1
        }</div> <div class="over">${e
          .map((e) => {
            if (e[0] == "W" || e[2] == "W") {
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
    showRuns.innerHTML = score.score + " / " + score.wickets;

    if (score.over.length - score.extras < 6) {
      showOvers.innerHTML =
        score.overs.length -
        1 +
        "." +
        (score.over.length - score.extras) +
        " Overs";
    } else {
      showOvers.innerHTML = score.overs.length + "." + "0 Overs";
    }

    sec2.innerHTML = data;
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
  } else if (run === "W") {
    score.wickets += 1;
  } else {
    score.extras += 1;
    score.score += 1;
  }
  localStorage.setItem("scoreCard", JSON.stringify(score));
  showScore();
}

function addExtraRun(extraRun) {
  const score = JSON.parse(localStorage.getItem("scoreCard"));
  if (extraRun === 0) {
    run = score.over.pop();
    console.log(run);
  } else {
    run = extraRun + "+" + score.over.pop();
  }
  score.over.push(run);
  score.overs.pop();
  score.overs.push(score.over);
  score.score += extraRun;
  localStorage.setItem("scoreCard", JSON.stringify(score));
  showScore();
}

function resetLast() {
  const score = JSON.parse(localStorage.getItem("scoreCard"));
  console.log(score.over.length);
  if (score.over.length !== 0) {
    const lastScore = score.over.pop();
    if (typeof lastScore === "number") {
      score.score -= lastScore;
    } else {
      if (lastScore[0] === "W" || lastScore[2] === "W") {
        score.wickets -= 1;
        if (lastScore[2] === "W") {
          score.score -= Number(lastScore[0]);
        }
      } else {
        score.extras -= 1;
        if (lastScore[2] === "w" || lastScore[2] === "n") {
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

function resetAll() {
  const reset = confirm("Do you want to start fresh?");
  if (reset) {
    localStorage.clear();
  }
  showScore();
}
