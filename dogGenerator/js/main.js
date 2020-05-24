document.addEventListener('DOMContentLoaded', (e) => {
  const generateDog = () => {
    let image = document.createElement('img');
    let catWrapper = document.querySelector('#dog');
    let promise = new Promise((resolve, reject) => {
      let promiseUrl = '//source.unsplash.com/200x200/?dog';
      const error = false;
      if (!error) {
        resolve(fetch(promiseUrl));
      } else {
        reject('Sorry, no data back from the server!');
      }
    });
    promise.then((result) => {
      console.log(result);
      image.src = result.url;
      catWrapper.appendChild(image);
    });
  };

  const dogBtn = document.querySelector('#generateDog');
  dogBtn.addEventListener('click', generateDog);
});
