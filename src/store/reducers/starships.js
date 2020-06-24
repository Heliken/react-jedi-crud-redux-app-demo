import {SET_STARSHIPS, DELETE_STARSHIP, CHANGE_BELOVED_STATUS, EDIT_STARSHIP, ADD_STARSHIP} from '../actions/starships'

const initialState = {
  allStarships: []
}

function starships(state = initialState, action) {
  switch(action.type) {
    case SET_STARSHIPS:
      return {...state,
        allStarships: action.starships
      };
    case DELETE_STARSHIP:
      return {...state,
        allStarships: state.allStarships.filter(starship => starship.id !== action.id)
      };
    case CHANGE_BELOVED_STATUS:
      return {...state,
        allStarships: state.allStarships.map((starship) => {
          return starship.id === action.id ? {...starship, beloved: !starship.beloved} : starship
        })
      };
    case EDIT_STARSHIP:
      return {...state,
        allStarships: state.allStarships.map((starship) => {
          return starship.id === action.data.id ? action.data : starship
        })
      };
    case ADD_STARSHIP:
      return {...state,
        allStarships: [...state.allStarships, action.data]
      };
    default:
      return state;
  }
}

export default starships;