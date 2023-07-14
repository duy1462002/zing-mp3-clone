import React from 'react';
import classNames from 'classnames/bind';
import style from './MusicPlayer.module.scss';
import {
    AlignLeftOutlined,
    HeartOutlined,
    MoreOutlined,
    PlayCircleOutlined,
    RetweetOutlined,
    SoundOutlined,
    StepBackwardOutlined,
    StepForwardOutlined,
    SwapOutlined,
    UnorderedListOutlined,
    YoutubeOutlined,
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { Col, Row, Slider } from 'antd';

const cx = classNames.bind(style);

const MusicPlayer = () => {
    const { currentSongId } = useSelector((state) => state.curMusic);
    console.log(currentSongId);

    const marks = {
        0: {
            style: {
                color: 'white',
            },
            label: <strong>00:00</strong>,
        },
        100: {
            style: {
                color: 'white',
            },
            label: <strong>3:57</strong>,
        },
    };

    return (
        <div className={cx('wrapper')}>
            <Row>
                <Col xs={12} sm={12} md={8} lg={8} xl={8}>
                    <div className={cx('song-info')}>
                        <img
                            className={cx('song-img')}
                            src="https://avatar-ex-swe.nixcdn.com/song/2021/05/11/1/1/d/f/1620717401203_640.jpg"
                            alt=""
                        />

                        <div className={cx('info')}>
                            <strong>Cây rút tiền</strong>
                            <p>24k.Right</p>
                        </div>

                        <div className={cx('icons')}>
                            <HeartOutlined />
                            <MoreOutlined />
                        </div>
                    </div>
                </Col>
                <Col xs={12} sm={12} md={8} lg={8} xl={8}>
                    <div className={cx('song-player')}>
                        <div className={cx('actions')}>
                            <SwapOutlined className={cx('action-btn')} />
                            <StepBackwardOutlined className={cx('action-btn')} />
                            <PlayCircleOutlined className={cx('action-btn', 'play-btn')} />
                            <StepForwardOutlined className={cx('action-btn')} />
                            <RetweetOutlined className={cx('action-btn')} />
                        </div>
                        <div className={cx('slide-bar')}>
                            <Slider
                                marks={marks}
                                defaultValue={37}
                                railStyle={{ backgroundColor: 'gray' }}
                            />
                        </div>
                    </div>
                </Col>
                <Col xs={0} sm={0} md={8} lg={8} xl={8}>
                    <div className={cx('song-settings')}>
                        <YoutubeOutlined className={cx('setting-btn')} />
                        <AlignLeftOutlined className={cx('setting-btn')} />
                        <div className={cx('volume-wrapper')}>
                            <SoundOutlined className={cx('volume-btn')} />
                            <Slider
                                className={cx('volume-slider')}
                                defaultValue={100}
                                railStyle={{ backgroundColor: 'gray' }}
                            />
                        </div>
                        <UnorderedListOutlined className={cx('list-btn')} />
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default MusicPlayer;
