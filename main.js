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
    score.target += run;
  } else if (run === "W") {
    score.wickets += 1;
  } else {
    score.extras += 1;
    score.target += 1;
  }
  localStorage.setItem("scoreCard", JSON.stringify(score));
}

function addExtraRun(extraRun) {
  
}
