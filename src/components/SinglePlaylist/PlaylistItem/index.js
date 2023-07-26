import React from 'react';
import classNames from 'classnames/bind';
import style from './PlaylistItem.module.scss';
import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(style);

const PlaylistItem = ({data}) => {
    const navigate = useNavigate();

    const handleClickPlaylist = (item) => {
        const playlistPath = item?.link?.split('.')[0];
            const playlistPath2 = playlistPath.split('/');
            playlistPath2[1] = "playlist";
            const playlistPath3 = playlistPath2.join('/');
            navigate(playlistPath3);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('image-wrapper')}>
                <img
                    className={cx('image')}
                    onClick={() => {handleClickPlaylist(data)}}
                    src={data?.thumbnailM}
                    alt=""
                />
            </div>
            <p>{data?.title}</p>
        </div>
    );
};

export default PlaylistItem;
