var quiz = {
  "name": "Super Hero Name Quiz",
  "description": "How many super heros can you name",
  "questionStem": "What is the real name of ",
  "questions": [
    {"question": "Superman", "answer": "Clarke Kent"},
    {"question": "Wonder Woman", "answer": "Dianna Prince"},
    {"question": "Batman", "answer": "Bruce Wayne"}
]
}

//dom refrences//
var $question = document.getElementById("question");
var $form = document.getElementById('answer')
var $input = document.getElementById("input");
var $feedback = document.getElementById("feedback");
var $score = document.getElementById("score");
var $start = document.getElementById("button");

$start.addEventListener('click', function() { play(quiz) }, false)

function update(element, content, klass) {
  var p = element.firstChild || document.createElement("p");

  p.textContent = content;
  element.appendChild(p);
  if (klass) {
    p.className = klass;

  }
}

var points = 0
update($score, points)

function play(quiz) {
  points = 0
  update($score, points)
  $form.addEventListener('submit', function(event) {
    event.preventDefault();
    check($form[0].value);
  }, false)
  var i = 0;
  chooseQuestion();
  // gameover();

  function chooseQuestion() {
    var question = quiz.questions[i].question;
    ask(question);
  }

  function ask(question){
    update($question, quiz.questionStem + question)
    $form[0].value = "";
    $form[0].focus();
  }

  function check(answer) {
    if (answer === quiz.questions[i].answer) {
      update($feedback, "Correct!", "right");
      points++;
      update($score, points)
      update($input, "You put " + answer)
    }else {
      update($feedback, "WRONG!", "wrong");
      update($input, "You put " + answer + ", but the correct answer was " + quiz.questions[i].answer + ".")

    }
    i++;
    if (i ===quiz.questions.length) {
      gameover();
    }else{
      chooseQuestion();
    }
  }


  function gameover() {
    alert("Game Over, you scored " + points + " points");
    update(question, "Game OVER! You scored " + points + " points")
    update($start, "Play Again?")
  }
}
