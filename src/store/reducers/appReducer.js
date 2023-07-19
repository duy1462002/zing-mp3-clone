import actionTypes from "../actions/actionTypes";

const initState = {
    banner: [],
    newRelease: [],
    playlists: [],
}

const appReducer = (state = initState, action) => {
    switch(action.type) {   
        case actionTypes.GET_HOME:
            return {
                ...state,
                banner: action.homeData?.find(item => item.sectionType === "banner").items || null,
                newRelease: action.homeData?.find(item => item.sectionType === "new-release").items.all || null,
                playlists: action.homeData?.filter(item => item && item.sectionType === "playlist") || null,
            }; 
        default:
            return state;
    }
}

export default appReducer;