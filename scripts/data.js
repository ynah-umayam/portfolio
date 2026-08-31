export let porfolioData = {};
export let techStack = {};
export let experiences = [];

export function loadPortfolioData() {
  return fetch('data.json')
  .then((response) => {
    return response.json();
  }).then((data) => {
    porfolioData = data;
    techStack = porfolioData.techStack;
    experiences = porfolioData.experiences;
  })
}
