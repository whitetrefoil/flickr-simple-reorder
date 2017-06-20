// App
// ==========

// Mutations
// ----------

export const ONE_MORE_MODAL = 'ONE_MORE_MODAL'
export const ONE_LESS_MODAL = 'ONE_LESS_MODAL'

// Login
// ==========

// Mutations
// ----------

export const LOGIN__SET_LOGIN_TOKEN  = 'login/SET_LOGIN_TOKEN'
export const LOGIN__SET_ACCESS_TOKEN = 'login/SET_ACCESS_TOKEN'
export const LOGIN__UNSET_TOKEN      = 'login/UNSET_TOKEN'
export const LOGIN__SET_USER_INFO    = 'login/SET_USER_INFO'
export const LOGIN__LOGOUT           = 'login/LOGOUT'

// Actions
// ----------

export const LOGIN__REQUEST_LOGIN_TOKEN  = 'login/REQUEST_LOGIN_TOKEN'
export const LOGIN__REQUEST_ACCESS_TOKEN = 'login/REQUEST_ACCESS_TOKEN'
export const LOGIN__CHECK_TOKEN          = 'login/CHECK_TOKEN'
export const LOGIN__REQUEST_USER_INFO    = 'login/REQUEST_USER_INFO'

// Photosets
// ==========

// Mutations
// ----------

export const PHOTOSETS__SET_LIST                = 'photosets/SET_LIST'
export const PHOTOSETS__SET_STATUS              = 'photosets/SET_STATUS'
export const PHOTOSETS__SET_PREFERENCE_ORDER_BY = 'photosets/SET_PREFERENCE_ORDER_BY'
export const PHOTOSETS__SET_PREFERENCE_IS_DESC  = 'photosets/SET_PREFERENCE_IS_DESC'

// Actions
// ----------

export const PHOTOSETS__GET_LIST  = 'photosets/GET_LIST'
export const PHOTOSETS__ORDER_SET = 'photosets/ORDER_SET'
