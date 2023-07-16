import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import style from './MusicPlayer.module.scss';
import {
    AlignLeftOutlined,
    HeartOutlined,
    MoreOutlined,
    PauseCircleOutlined,
    PlayCircleOutlined,
    RetweetOutlined,
    SoundOutlined,
    StepBackwardOutlined,
    StepForwardOutlined,
    SwapOutlined,
    UnorderedListOutlined,
    YoutubeOutlined,
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '~/store/actions';
import { Col, Row, Slider } from 'antd';
import * as apis from '~/apis';
import ClickAbleText from '../ClickAbleText';

const cx = classNames.bind(style);
var intervalID;
const MusicPlayer = () => {
    const dispatch = useDispatch();
    const { currentSongId, isPlaying } = useSelector((state) => state.curMusic);

    const [audio, setAudio] = useState(new Audio());
    const [songInfo, setSongInfo] = useState(null);
    const [sliderValue, setSliderValue] = useState(0);

    function convertDuration(time) {
        return Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2);
    }

    useEffect(() => {
        const fetchSong = async () => {
            const [res1, res2] = await Promise.all([
                apis.apiGetInfoSong(currentSongId),
                apis.apiGetSong(currentSongId),
            ]);
            if (res2.data.err === 0) {
                audio.pause();
                setAudio(new Audio(res2.data.data['128']));
                if (res1.data.err === 0) {
                    setSongInfo(res1.data.data);
                    console.log(res1);
                }
            } else {
                // dispatch(actions.setPlay(false));
                alert('phai co tien moi nghe dc bai nay');
            }
        };

        fetchSong();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentSongId]);
    //play music when click a song
    // console.log(songSource);
    useEffect(() => {
        if (isPlaying) {
            intervalID = setInterval(() => {
                let percent = Math.round((audio.currentTime * 10000) / songInfo?.duration) / 100;
                setSliderValue(percent);
            }, 200);
        } else {
            clearInterval(intervalID);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isPlaying]);

    useEffect(() => {
        intervalID && clearInterval(intervalID);
        audio.load();
        if (isPlaying) {
            audio.play();
            intervalID = setInterval(() => {
                let percent = Math.round((audio.currentTime * 10000) / songInfo?.duration) / 100;
                setSliderValue(percent);
            }, 200);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [audio]);

    const handlePlayMusic = () => {
        if (songInfo) {
            if (isPlaying) {
                audio.pause();
                dispatch(actions.setPlay(false));
            } else {
                audio.play();
                dispatch(actions.setPlay(true));
            }
        }
    };

    const marks = {
        0: {
            style: {
                color: 'white',
            },
            label: convertDuration((sliderValue * songInfo?.duration) / 100),
        },
        100: {
            style: {
                color: 'white',
            },
            label: convertDuration(songInfo?.duration),
        },
    };

    const handleChangeDurationSong = (value) => {
        audio.currentTime = (value * songInfo?.duration) / 100;
        setSliderValue(value);
    };

    return (
        <div className={cx('wrapper')}>
            <Row>
                <Col xs={12} sm={12} md={8} lg={8} xl={8}>
                    <div className={cx('song-info')}>
                        <img
                            className={cx('song-img')}
                            src={songInfo?.thumbnail}
                            alt={songInfo?.title}
                        />

                        <div className={cx('info')}>
                            <strong>{songInfo?.title}</strong>
                            <ClickAbleText>{songInfo?.artistsNames}</ClickAbleText>
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
                            <div onClick={handlePlayMusic}>
                                {isPlaying ? (
                                    <PauseCircleOutlined className={cx('action-btn', 'play-btn')} />
                                ) : (
                                    <PlayCircleOutlined className={cx('action-btn', 'play-btn')} />
                                )}
                            </div>
                            <StepForwardOutlined className={cx('action-btn')} />
                            <RetweetOutlined className={cx('action-btn')} />
                        </div>
                        <div className={cx('slide-bar')}>
                            <Slider
                                value={sliderValue}
                                marks={marks}
                                railStyle={{ backgroundColor: 'gray' }}
                                onChange={(value) => handleChangeDurationSong(value)}
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
