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
  updateScore(run, scoreSheet);
}

function updateScore(run, score) {
  console.log(run, score);
  if (typeof run === "number") {
    score.target += run;
  } else if (run === "W") {
    score.wickets += 1;
  } else {
    score.extras += 1;
    score.target += 1;
  }
  score.over.push(run);
  localStorage.setItem("scoreCard", JSON.stringify(score));
}

function addExtras() {}
