import React from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import style from './Top100.module.scss';
import SinglePlaylist from '~/components/SinglePlaylist';
const cx = classNames.bind(style);

const Top100 = () => {
    const { top100 } = useSelector((state) => state.app);
    console.log(top100);
    return (
        <div className={cx('wrapper')}>
            {top100?.data?.map((playlist, index) => (
                <SinglePlaylist key={index} data={playlist} />
            ))}
        </div>
    );
};

export default Top100;
