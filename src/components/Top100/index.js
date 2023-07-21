import React, { memo } from 'react'
import classNames from 'classnames/bind';
import style from './Top100.module.scss';
import SongItem from '../SongItem';
import { useDispatch } from 'react-redux';
import * as actions from "~/store/actions"
import Scrollbars from 'react-custom-scrollbars-2';
const cx = classNames.bind(style);

const Top100 = ({data}) => {
    const dispatch = useDispatch();
    
    const songsPlayAble = data?.filter(song => song.isWorldWide);
    console.log(songsPlayAble);

    const handleSetPlaylist = () => {
        dispatch(actions.setPlaylist(songsPlayAble));
    }

  return (
    <div className={cx('wrapper')}>
        <h3 className={cx('heading')}>#top 100</h3>
        <Scrollbars style={{ height: 'calc(100vh - 96px)', width: '100%' }}>
            {songsPlayAble?.map((song, index) => <SongItem key={song?.encodeId} data={song} onSetPlaylist = {handleSetPlaylist} topNumber={index + 1}/>)}
        </Scrollbars>
    </div>
  )
}

export default memo(Top100)