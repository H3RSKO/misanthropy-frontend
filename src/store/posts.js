import axios from 'axios'

// ACTION TYPE
const GET_ALL_POSTS = 'GET_ALL_POSTS' // ALL POSTS IN A SPECIFIC THREAD
const CREATE_POST = 'CREATE_POST'

// ACTION CREATORS
const getAllPosts = (posts) => ({
  type: GET_ALL_POSTS,
  posts
})

const createPost = (post) => ({
  type: CREATE_POST,
  post
})

// Thunks
export const fetchPosts = (threadId) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/posts/${threadId}`)
    console.log("in post thunk data is: ", data)
    return dispatch(getAllPosts(data))
  } catch(err) {console.log(err)}
}

export const makePosts = (threadId, post) => async (dispatch) => {
  try {
    const { data } = await axios.post(`/api/posts/${threadId}`, post)
    return dispatch(createPost(data))
  } catch(err) {console.log(err)}
}

// reducer
export default function (state = {posts: []}, action) {
  switch (action.type) {
    case GET_ALL_POSTS:
      return {...state, posts: action.posts}
    case CREATE_POST:
      return {...state, posts: action.post}
    default:
      return state
  }
}
