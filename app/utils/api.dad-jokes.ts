export interface Joke {
  joke: string;
}

export function fetchRandomJoke(api:string): Promise<Joke> {
  return fetch(`${api}`, {
      headers: {
        accept: "application/json",
        "User-Agent": "ui.dev React Hooks Cours",
      },
    })
    .then((res) => res.json())
    .then((joke) => {
      if (!joke) {
        throw new Error(`There was an error fetching jokes.`)
      }

      return joke;
    })
}