const search = document.getElementById('search');
const matchList = document.getElementById('match-list');

//search states.json and filter
const searchStates = async searchText => {
  const res = await fetch('../data/state.json');
  const states = await res.json();

  //get matches from current input
  let matches = states.filter(state => {
    const regex = new RegExp(`^${searchText}`, 'gi');
    return state.name.match(regex) || state.abbr.match(regex);
  });
  if (searchText.length === 0) {
    matches = [];
    matchList.innerHTML = '';
  }
  outputHtml(matches);
  console.log(matches);
};
//show results in html
const outputHtml = matches => {
  if (matches.length > 0) {
    const html = matches
      .map(
        match => `
    <div class = "bg-gray-900 m-2 h-28 rounded">
    <h4 class="text-2xl text-gray-300 m-4 pt-2">${match.name} (${match.abbr})<span class="text-blue-400 ml-2">    ${match.capital}</span></h4>
    <small class="text-gray-300 ml-4">Latitude:${match.lat} / Logitude:${match.long}</small>
    </div>`
      )
      .join('');
    matchList.innerHTML = html;
    console.log(html);
  }
};

search.addEventListener('input', () => searchStates(search.value));
