// WP REST API: https://developer.wordpress.org/rest-api/reference/

const url = 'https://webagencyprato.it/wp-json/wp/v2/posts';
const postWrapper = document.querySelector('.latest_posts');
const fetchData = async () => {
  try {
    const agencyData = await fetch(url, {
      timeout: 500,
    });
    console.log(agencyData); // PROMISE
    const response = await agencyData.json();
    console.log(response); // ARRAY OF OBJECTS
    const postTitles = response.map((post) => {
      const innerContent = `
        <li>
        <h2>${post.title.rendered}</h2>
        <p>${post.excerpt.rendered}</p>        
        <a target="_blank" href="${post.link}">Read more</a>
        </li>
        `;
      postWrapper.innerHTML += innerContent;
    });
    // console.log(postTitles);
  } catch (err) {
    console.log(err.message);
    throw new Error(`Unable to fetch data`);
  }
};

document.addEventListener('DOMContentLoaded', fetchData);
