import axios from 'axios'

// ACTION TYPE
const GET_ALL_USERS = 'GET_ALL_USERS'
const ADD_USER = 'ADD_USER'
const GET_USER = 'GET_USER'
const GET_COOKIE_USER = 'GET_COOOKIE_USER'
const LOG_OUT_USER = 'LOG_OUT_USER'
const GET_ERROR = 'GET_ERROR'

// ACTION CREATOR
const getUsers = (users) => ({
  type: GET_ALL_USERS,
  users
})

const addUser = (newUser) => ({
  type: ADD_USER,
  newUser
})

const getUser = (user) => ({
  type: GET_USER,
  user
})

const getCookieUser = (cookieUser) => ({
  type: GET_COOKIE_USER,
  cookieUser
})

const logOutUser = (defaultUser) => ({
  type: LOG_OUT_USER,
  defaultUser
})

const getError = (error) => ({
  type: GET_ERROR,
  error
})


// THUNK
export const fetchUsers = () => async (dispatch) => {
  try{
    const {data} = await axios.get('/api/users')
    return dispatch(getUsers(data))
  }
  catch(err) {console.log(err)}
}

export const addNewUser = (newUser) => async (dispatch) => {
  try {
    const {data} = await axios.post('/api/users/signup', newUser)
    return dispatch(addUser({...data, loggedIn: true}))
  }
  catch(err) {console.log(err)}
}

export const authenticateUser = (user) => async (dispatch) => {
  try {
    const {data} = await axios.post('/api/users/login', user)
    console.log('In thunk, user returned from API >> ', data)

    return dispatch(getUser({...data, loggedIn: true}))
  } catch(authError) {
    console.log('autherror>> ', authError)
    return dispatch(getError({error: authError}))
  }
}

// check if user has cookie
export const checkUserCookie = (cookie) => async (dispatch) => {
  try {
    console.log(`in user store cookie is: ${cookie}`)
    const { data } = await axios.get(`/api/auth/me/${cookie}`)
    if (data) {
      return dispatch(getCookieUser({...data, loggedIn: true}))
    } else {
      console.log('no cookie!')
      return
    }
  } catch(authError) {
    console.log('autherror>> ', authError)
    return dispatch(getError({error: authError}))
  }
}

// logout user
export const logOutCurrentUser = () => async (dispatch) => {
  try {
    // destroy cookie
    document.cookie = "connect.sid="

    // set state to no user
    return dispatch(getUser({loggedIn: false}))
  } catch(err) {dispatch(getError({error: err}))}
}

// reducer
export default function (state = {user: {loggedIn: false}}, action) {
  switch (action.type) {
    case GET_ALL_USERS:
      return {...state, allUsers: action.users}
    case ADD_USER:
      return {...state, user: action.newUser}
    case GET_USER:
      return {...state, user: action.user}
    case GET_COOKIE_USER:
      return {...state, user: action.cookieUser}
    case LOG_OUT_USER:
      return {...state, user: action.defaultUser}
    case GET_ERROR:
      return {...state, error: action.error}
    default:
      return state
  }
}
