import './style.css';

console.log('Hello, World!');

const mainElement = document.querySelector('main');
const errorTextFinal = 'Failed to fetch data from the API after multiple attempts. Check API availability and reload the page'

async function fetchData(url: string) {
  try {
    const response = await fetch(url);
    return response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

function displayData(postsData: string, commentsData: string, profileData: string) {
  if (mainElement) {
    mainElement.innerHTML = `
      <p>Posts: ${JSON.stringify(postsData)}</p>
      <p>Comments: ${JSON.stringify(commentsData)}</p>
      <p>Profile: ${JSON.stringify(profileData)}</p>
      <a href="http://localhost:3000">External API URL</a>
    `;
  } else {
    console.error('Could not find main element in index.html');
  }
}

async function fetchDataAndDisplay() {
    let postsData = null;
    let commentsData = null;
    let profileData = null;

    for (let attempt = 1; attempt < 5; attempt++) {
      try {
        postsData = await fetchData('http://localhost:3000/posts');
        commentsData = await fetchData('http://localhost:3000/comments');
        profileData = await fetchData('http://localhost:3000/profile');
  
        if (postsData && commentsData && profileData) {
          displayData(postsData, commentsData, profileData);
          return; // Exit the function if data is successfully fetched
        }
      } catch (error) {
        console.error('Failed to fetch data from the API:', error);
      }
      if (mainElement) {
        mainElement.innerHTML = `Failed to fetch data from the API. Retrying... ${attempt}`
      }
      console.error(`Failed to fetch data from the API. Retrying... ${attempt}`);
      await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for 2 seconds before retrying
    }
  
    console.error(errorTextFinal);
    if (mainElement) {
      mainElement.innerHTML = errorTextFinal;}
  }
  
  fetchDataAndDisplay();