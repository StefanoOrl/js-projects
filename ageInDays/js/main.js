document.addEventListener('DOMContentLoaded', (e) => {
  const ageDiv = document.querySelector('#age');
  const clickMeBtn = document.querySelector('#clickMe');
  const resetBtn = document.querySelector('#reset');

  const ageInDays = () => {
    const thisYear = new Date().getFullYear();
    const myBirthYear = prompt('What year were you born?');
    const myAge = thisYear - myBirthYear;
    const myAgeInDays = myAge * 365;

    if (myBirthYear != null) {
      const textAnswer = document.createTextNode(myAgeInDays + ' days');
      const daysWrap = document.createElement('p');
      ageDiv.appendChild(daysWrap);
      daysWrap.appendChild(textAnswer);
      ageDiv.innerHTML +=
        '<h2>So far you have been living ' + myAgeInDays + ' days</h2>';
      let counter = clickMeBtn.value;
      console.group('Your Age #' + counter);
      console.log('Your year of birth is ' + myBirthYear);
      console.log('Current year is ' + thisYear);
      console.log('Your age is ' + myAge);
      console.log('So far you have been living ' + myAgeInDays + ' days');
      console.groupEnd('Your Age');
      counter++;
      clickMeBtn.value = counter;
      // return myAgeInDays;
    }
  };

  const reset = () => {
    ageDiv.innerHTML = '';
    console.clear();
    clickMeBtn.value = 0;
  };

  clickMeBtn.addEventListener('click', ageInDays);
  resetBtn.addEventListener('click', reset);
});
