
const categoryReducer = (state = null, action) => {
  switch(action.type) {
    case 'GET_ALL_CATEGORY': return state;
    case 'SET_ALL_CATEGORY': return action.category
    default: return state
  }
}

export default categoryReducer;
