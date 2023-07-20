import actionTypes from '../actions/actionTypes';

const initState = {
    banner: [],
    newRelease: [],
    playlists: [],
    chart: {},
    topSongs: [],
    chartHome: {},
};

const appReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_HOME:
            return {
                ...state,
                banner: action.homeData?.find((item) => item.sectionType === 'banner').items || null,
                newRelease: action.homeData?.find((item) => item.sectionType === 'new-release').items.all || null,
                playlists: action.homeData?.filter((item) => item && item.sectionType === 'playlist') || null,
                chart: action.homeData?.find((item) => item && item.sectionId === 'hZC').chart || null,
                topSongs: action.homeData?.find((item) => item && item.sectionId === 'hZC').items || null,
            };
        case actionTypes.GET_CHART:
            return {
                ...state,
                chartHome: action?.chartData,
            };
        default:
            return state;
    }
};

export default appReducer;
