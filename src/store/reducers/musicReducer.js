import actionTypes from '../actions/actionTypes';

const initState = {
    currentSongId: null,
};

const musicReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.SET_CUR_SONG_ID:
            return {
                ...state,
                currentSongId: action.songId || null,
            };
        default:
            return state;
    }
};

export default musicReducer;
