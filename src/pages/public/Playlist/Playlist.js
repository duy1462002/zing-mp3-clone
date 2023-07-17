import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as apis from '~/apis';
import classNames from 'classnames/bind';
import style from './Playlist.module.scss';
import { Button } from 'antd';
import { HeartOutlined, MoreOutlined, PlayCircleTwoTone } from '@ant-design/icons';
import SongList from '~/components/SongList';
import ClickAbleText from '~/components/ClickAbleText';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { useDispatch } from 'react-redux';
import * as actions from "~/store/actions"
const cx = classNames.bind(style);

const Playlist = () => {
    const dispatch = useDispatch();
    // eslint-disable-next-line no-unused-vars
    const { title, id } = useParams();
    const [playlistData, setPlaylistData] = useState(null);

    useEffect(() => {
        const fetchDataPlaylist = async () => {
            const res = await apis.apiGetPlaylist(id);
            if (res.data.err === 0) {
                setPlaylistData(res?.data?.data);
                let songsFetched = res?.data?.data?.song?.items;
                const songsPlayAble = songsFetched.filter(song => song.isWorldWide);
                dispatch(actions.setPlaylist(songsPlayAble));
            }
        };

        fetchDataPlaylist();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('left-content')}>
                <div className={cx('thumbnail')}>
                    <img className={cx('thumbnail-img')} src={playlistData?.thumbnailM} alt="" />
                </div>

                <div className={cx('playlist-content')}>
                    <div className={cx('info')}>
                        <h3>{playlistData?.title}</h3>
                        <div className={cx('artists-names')}>
                            <ClickAbleText>
                                {playlistData?.artists[0].name},
                            </ClickAbleText>
                            <ClickAbleText>
                                {playlistData?.artists[1].name},
                            </ClickAbleText>
                            <ClickAbleText>
                                {playlistData?.artists[2].name},
                            </ClickAbleText>
                            <ClickAbleText>
                                {playlistData?.artists[3].name}
                            </ClickAbleText>
                        </div>
                        <p>{playlistData?.like} likes</p>
                        <p>{playlistData?.listen} listens</p>
                    </div>

                    <div className={cx('actions')}>
                        <Button
                            className={cx('playlist-btn')}
                            type="primary"
                            shape="round"
                            icon={<PlayCircleTwoTone />}
                        >
                            Play playlist
                        </Button>

                        <div className={cx('icons')}>
                            <HeartOutlined className={cx('icon')} />
                            <MoreOutlined className={cx('icon')} />
                        </div>
                    </div>
                </div>
            </div>

            <Scrollbars style={{ height: 'calc(100vh - 92px - 96px)', width: '100%' }}>
                <div className={cx('right-content')}>
                  <div className={cx('heading')}>
                    <span className={cx('heading-text')}>Lời tựa</span>
                    <span>{playlistData?.sortDescription}</span>
                  </div>
                  <SongList/>
                </div>

                
            </Scrollbars>
        </div>
    );
};

export default Playlist;
