const api = `https://icanhazdadjoke.com/`
const json = `"Accept: application/json"`

export function fetchItem (id) {
  return fetch(`${api}/item/${id}${json}`)
    .then((res) => res.json())
}

export function fetchComments (ids) {
  return Promise.all(ids.map(fetchItem))
    .then((comments) => removeDeleted(onlyComments(removeDead(comments))))
}

export function fetchMainPosts (type) {
  return fetch(`${api}/${type}stories${json}`)
    .then((res) => res.json())
    .then((ids) => {
      if (!ids) {
        throw new Error(`There was an error fetching the ${type} posts.`)
      }

      return ids.slice(0, 50)
    })
    .then((ids) => Promise.all(ids.map(fetchItem)))
    .then((posts) => removeDeleted(onlyPosts(removeDead(posts))))
}

export function fetchRandomJoke () {
  return fetch(`${api}`, {
      headers: {
        accept: "application/json",
        "User-Agent": "ui.dev React Hooks Cours",
      },
    })
    .then((res) => res.json())
    .then((jokes) => {
      if (!jokes) {
        throw new Error(`There was an error fetching jokes.`)
      }

      return jokes;
    })
}