import React from 'react';
import classNames from 'classnames/bind';
import style from './SongItem.module.scss';
import { Col, Divider, Row } from 'antd';
import { HeartOutlined } from '@ant-design/icons';
import ClickAbleText from '../ClickAbleText';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '~/store/actions';
const cx = classNames.bind(style);

const SongItem = ({ data, onSetPlaylist = () => {}, topNumber = null }) => {
    const { currentSongId } = useSelector((state) => state.curMusic);

    const dispatch = useDispatch();
    function convertDuration(time) {
        return Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2);
    }

    const handlePlayMusic = () => {
        dispatch(actions.setCurSongId(data?.encodeId));
        dispatch(actions.setPlay(true));
        onSetPlaylist();
    };

    return (
        <div className={cx('wrapper', { active: data.encodeId === currentSongId })}>
            <div className={cx('song-item')}>
                <Row>
                    <Col span={12} className={cx('first-column')}>
                        {topNumber ? <h3 className={cx('top-number')}>{topNumber}</h3> :<HeartOutlined />}
                        <img
                            onClick={handlePlayMusic}
                            className={cx('song-img')}
                            alt=""
                            src={data?.thumbnail}
                        />
                        <div className={cx('song-info')}>
                            <strong className={cx('song-title')} onClick={handlePlayMusic}>
                                {data?.title}
                            </strong>
                            <ClickAbleText className={cx('artist-names')}>
                                {data?.artistsNames}
                            </ClickAbleText>
                        </div>
                    </Col>
                    <Col span={10} className={cx('second-col')}>
                        <ClickAbleText className={cx('album-title')}>
                            {data?.album?.title}
                        </ClickAbleText>
                    </Col>
                    <Col span={2} className={cx('third-col')}>
                        <p>{convertDuration(data?.duration)}</p>
                    </Col>
                </Row>
            </div>
            <Divider
                orientation="left"
                className={cx('divider')}
                style={{ margin: 0, backgroundColor: 'gray', opacity: 0.3 }}
            />
        </div>
    );
};

export default SongItem;
