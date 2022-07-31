export const fetchPeople = () =>
  fetch(`https://swapi.dev/api/people/`)
    .then((response) => {
      return response.json();
    })
    .then(({ results }) => {
      return results;
    });

export const fetchPeopleFilter = (search: string) =>
  fetch(`https://swapi.dev/api/people/?search=${search}`)
    .then((response) => {
      return response.json();
    })
    .then(({ results }) => {
      return results;
    });
