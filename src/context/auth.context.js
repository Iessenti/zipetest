import {createContext} from 'react'

function noop() {}

export const AuthContext = createContext({
  username: null,
  login: noop,
  isAuthenticated: false
})