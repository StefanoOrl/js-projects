document.addEventListener('DOMContentLoaded', (e) => {
  const rbsGame = (yourChoice) => {
    let humanChoice, botChoice;
    humanChoice = yourChoice.target.id;
    botChoice = randomChoice(randToRpsInt());
    // botChoice = randToRpsInt();
    const results = decideWinner(humanChoice, botChoice);
    // array of possibilities
    // [0,1] human lost | bot won
    // [1,0] human won | bot lost
    // [0.5,0.5] draw
    const outcome = finalMessage(results); // eg: ('message':'You won','color':'green')
    rpsFrontEnd(yourChoice.target.id, botChoice, outcome.message);

    console.group(yourChoice.target.id);
    console.log('You chose ' + humanChoice);
    console.log('Computer chose ' + botChoice);

    // console.log(yourChoice.target.alt);
    // console.log(yourChoice.target.src);
    console.log('The result is: ' + results);
    console.log(`%c ${outcome.message}`, `font-weight:bold`);
    console.groupEnd(yourChoice.target.id);
  };

  const randToRpsInt = () => {
    // const choices = ['rock', 'paper', 'scissors'];
    // we get randomly numbers 0, 1 or 2
    return Math.floor(Math.random() * 3);
    // return choices[Math.floor(Math.random() * 3)];
  };
  const randomChoice = (number) => {
    const choices = ['rock', 'paper', 'scissors'];
    return choices[number];
  };

  const decideWinner = (yourChoice, computerChoice) => {
    const rpsDatabase = {
      rock: { scissors: 1, rock: 0.5, paper: 0 },
      scissors: { paper: 1, scissors: 0.5, rock: 0 },
      paper: { rock: 1, paper: 0.5, scissors: 0 },
    };

    const yourScore = rpsDatabase[yourChoice][computerChoice];
    const computerScore = rpsDatabase[computerChoice][yourChoice];

    // if (yourScore > computerScore) {
    //   return [yourScore, computerScore] + ' => You won!';
    // } else if (yourScore < computerScore) {
    //   return [yourScore, computerScore] + ' => Computer won!';
    // } else {
    //   return [yourScore, computerScore] + ' => Draw!';
    // }
    return [yourScore, computerScore];
  };

  const increaseHumanScore = () => {
    const humanTotal = document.querySelector(
      'body > table > tbody > tr:nth-child(1) > td > div > h4 > span'
    );
    let counter = humanTotal.getAttribute('value');
    counter++;
    humanTotal.setAttribute('value', counter);
    humanTotal.innerText = counter;
    return counter;
  };

  const increaseComputerScore = () => {
    const computerTotal = document.querySelector(
      'body > table > tbody > tr:nth-child(2) > td > div > h4 > span'
    );
    let counter = computerTotal.getAttribute('value');
    counter++;
    computerTotal.setAttribute('value', counter);
    computerTotal.innerText = counter;
    return counter;
  };

  const increaseDrawScore = () => {
    const drawTotal = document.querySelector(
      'body > table > tbody > tr:nth-child(3) > td > div > h4 > span'
    );
    let counter = drawTotal.getAttribute('value');
    counter++;
    drawTotal.setAttribute('value', counter);
    drawTotal.innerText = counter;
    return counter;
  };

  const finalMessage = ([yourScore, computerScore]) => {
    if (yourScore > computerScore) {
      increaseHumanScore();
      // return ' => You won! ' + counter;
      return { message: 'You won!', color: 'blue', score: increaseHumanScore };
    } else if (yourScore < computerScore) {
      increaseComputerScore();
      // return ' => Computer won! ' + counter;
      return {
        message: 'Computer won!',
        color: 'red',
        score: increaseComputerScore,
      };
    } else {
      increaseDrawScore();
      // return ' => Draw!';
      return { message: 'Draw!', color: 'purple', score: increaseDrawScore };
    }
  };

  const rpsFrontEnd = (humanChoice, botChoice, finalMessage) => {
    const imageDatabase = {
      // get images by src
      rock: document.querySelector('#rock').src,
      paper: document.querySelector('#paper').src,
      scissors: document.querySelector('#scissors').src,
    };

    // let's remove all the images
    // const rpsImages = document.getElementsByTagName('#rock_paper_scissor img');
    // Array.from(images).forEach((elem) => {
    //   elem.delete();
    // });
    const rockPaperScissor = document.querySelector('#rock_paper_scissors');
    const removeImages = () => {
      while (rockPaperScissor.hasChildNodes()) {
        rockPaperScissor.removeChild(rockPaperScissor.firstChild);
      }
    };
    removeImages();

    const humanDiv = document.createElement('div');
    const botDiv = document.createElement('div');
    const messageDiv = document.createElement('div');
    const keepPlayingBtn = document.createElement('button');
    const keepPlayingClasses = ['btn', 'btn-primary', 'btn-lg'];
    keepPlayingBtn.classList.add(...keepPlayingClasses);
    keepPlayingBtn.innerText = 'Keep playing';

    humanDiv.innerHTML = `
    <h4>Your choice</h4>
    <img src="${imageDatabase[humanChoice]}" />`;
    botDiv.innerHTML = `
    <h4>Computer choice</h4>
    <img src="${imageDatabase[botChoice]}" />`;
    messageDiv.innerHTML = `<h3>${finalMessage}</h3>`;

    document.querySelector('#rock_paper_scissors').prepend(humanDiv);
    document.querySelector('#rock_paper_scissors').appendChild(messageDiv);
    document.querySelector('#rock_paper_scissors').appendChild(botDiv);
    document.querySelector('#rock_paper_scissors').appendChild(keepPlayingBtn);

    const playAgain = () => {
      removeImages();
      imgRpsGame.forEach((element) => {
        rockPaperScissor.appendChild(element);
      });
    };
    keepPlayingBtn.addEventListener('click', playAgain);
  };

  const imgRpsGame = document.querySelectorAll('#rock_paper_scissors img');
  imgRpsGame.forEach((element) => {
    element.addEventListener('click', rbsGame);
  });
});
