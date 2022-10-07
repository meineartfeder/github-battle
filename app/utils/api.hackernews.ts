const api = `https://hacker-news.firebaseio.com/v0`
const json = '.json?print=pretty'

interface Post {
  id: string;
  type: string;
  dead: boolean;
  deleted: boolean;
}

function removeDead(posts: Post[]): Post[] {
  return posts.filter(Boolean).filter(({ dead }) => dead !== true)
}

function removeDeleted(posts: Post[]): Post[] {
  return posts.filter(({ deleted }) => deleted !== true)
}

function onlyComments(posts: Post[]): Post[] {
  return posts.filter(({ type }) => type === 'comment')
}

function onlyPosts(posts: Post[]): Post[] {
  return posts.filter(({ type }) => type === 'story')
}

export function fetchItem (id: Post): Promise<Post> {
  return fetch(`${api}/item/${id}${json}`)
    .then((res) => res.json())
}

export function fetchComments (ids: Post[]) {
  return Promise.all(ids.map(fetchItem))
    .then((comments) => removeDeleted(onlyComments(removeDead(comments))))
}

interface MainPost {
  type: "top" | "new"
}

export function fetchMainPosts(type: MainPost) {
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

interface User {
  id: string
}

export function fetchUser(id: User): Promise<User> {
  return fetch(`${api}/user/${id}${json}`)
    .then((res) => res.json())
}

export function fetchPosts (ids: Post[]): Promise<Post[]> {
  return Promise.all(ids.map(fetchItem))
    .then((posts) => removeDeleted(onlyPosts(removeDead(posts))))
}