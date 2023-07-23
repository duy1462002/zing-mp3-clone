import React, { memo, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import style from './Artist.module.scss';
import { PlayCircleFilled } from '@ant-design/icons';
import * as apis from '~/apis';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '~/store/actions';
import SongList from '~/components/SongList';
import Scrollbars from 'react-custom-scrollbars-2';
const cx = classNames.bind(style);

const Artist = () => {
    const dispatch = useDispatch();
    const { artist } = useSelector((state) => state.app);
    const { songs } = useSelector((state) => state.curMusic);
    const [isHavePlaylist, setIsHavePlaylist] = useState(true);
    console.log(artist);
    useEffect(() => {
        if (artist?.playlistId) {
            const fetchDataPlaylist = async () => {
                const res = await apis.apiGetPlaylist(artist?.playlistId);
                if (res.data.err === 0) {
                    let songsFetched = res?.data?.data?.song?.items;
                    const songsPlayAble = songsFetched.filter((song) => song.isWorldWide);
                    dispatch(actions.setPlaylist(songsPlayAble));
                }
            };
            fetchDataPlaylist();
        } else {
            setIsHavePlaylist(false);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [artist]);

    const handlePlayPlaylist = () => {
        dispatch(actions.setCurSongId(songs[0].encodeId));
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('heading')}>
                <img className={cx('avatar')} src={artist?.thumbnail} alt="" />
                <div className={cx('info')}>
                    <div className={cx('name-and-play')}>
                        <h1>{artist?.name}</h1>
                        <PlayCircleFilled className={cx('play-btn')} onClick={handlePlayPlaylist} />
                    </div>
                </div>
            </div>

            <div>
                {isHavePlaylist ? <Scrollbars style={{ height: 'calc(100vh - 92px - 96px - 120px)', width: '100%' }}>
                    <div className={cx('song-list')}>
                        <h3>Songs by {artist?.name}</h3>
                        <SongList />
                    </div>
                </Scrollbars> : <h2 style={{marginTop: 16}}>This artist have no playlist</h2>}
            </div>
        </div>
    );
};

export default memo(Artist);
