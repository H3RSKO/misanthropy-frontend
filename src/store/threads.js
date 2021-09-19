import axios from 'axios'

// ACTION TYPE
const GET_ALL_THREADS = 'GET_ALL_THREADS'
const GET_ONE_THREAD = 'GET_ONE_THREAD'
const ADD_THREAD = 'ADD_THREAD'

// ACTION CREATORS
const getAllThreads = (threads) => ({
  type: GET_ALL_THREADS,
  threads
})

const getOneThread = (thread) => ({
  type: GET_ONE_THREAD,
  thread
})

const addThread = (thread) => ({
  type: ADD_THREAD,
  thread
})

// Thunks
export const fetchThreads = () => async (dispatch) => {
  try {
    const {data} = await axios.get('/api/threads')
    console.log(`the threads data is ${data}`)
    return dispatch(getAllThreads(data))
  } catch(err) {console.log(err)}
}

// need thunk to pull in thread data ie. poster, time posted, likes etc
export const getThreadInfo = (threadId) => async (dispatch) => {
  try {
    const {data} = await axios.get(`/api/threads/${threadId}`)
    console.log('the thread data: ', data)
    return dispatch(getOneThread(data))
  } catch(err) {console.log(err)}
}

// when posting new thread, need to split off initial text post as first post in thread
export const createThreads = (thread) => async (dispatch) => {
  console.log('the thread in createThreads: ', thread)
  try {
    const {data} = await axios.post('/api/threads', thread)
    const postData = await axios.post(`/api/posts/${data.id}`, {text: thread.text, userId: thread.userId, threadId: data.id})
    return dispatch(addThread(data))
  } catch(err) {console.log(err)}
}



// reducer
export default function (state = {threads: []}, action) {
  switch (action.type) {
    case GET_ALL_THREADS:
      return {...state, threads: action.threads}
    case GET_ONE_THREAD:
      return {...state, thread: action.thread}
    case ADD_THREAD:
      return {...state, threads: [...state.threads, action.thread]}
    default:
      return state
  }
}
