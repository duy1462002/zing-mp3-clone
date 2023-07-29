import React, { useEffect } from 'react';
import { database } from '~/firebase';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '~/store/actions';
import { doc, getDoc } from 'firebase/firestore';
import SongList from '~/components/SongList';
import Scrollbars from 'react-custom-scrollbars-2';

const Library = () => {
    const dispatch = useDispatch();
    const { userData } = useSelector((state) => state.app);
    const { user } = useSelector((state) => state.app);
    const docRef = doc(database, 'users', `${user?.uid}`);
    console.log(userData);

    useEffect(() => {
        const getUser = async () => {
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                dispatch(actions.setUserData(docSnap.data()));
            } else {
                // docSnap.data() will be undefined in this case
                console.log('No such document!');
            }
        };
        getUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        dispatch(actions.setPlaylist(userData?.songs));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userData]);
    return (
        <div>
            <h2>Songs loved by {userData?.email}</h2>
            <Scrollbars style={{ height: 'calc(100vh - 92px - 140px)', width: '100%' }}>
                <SongList deleteAble />
            </Scrollbars>
        </div>
    );
};

export default Library;
