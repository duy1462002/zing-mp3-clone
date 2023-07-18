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
import { Col, Popover, Row, Slider } from 'antd';
import * as apis from '~/apis';
import ClickAbleText from '../ClickAbleText';
import PlaylistPopper from './PlaylistPopper';

const cx = classNames.bind(style);
var intervalID;
const MusicPlayer = () => {
    const dispatch = useDispatch();
    const { currentSongId, isPlaying, songs } = useSelector((state) => state.curMusic);
    const [audio, setAudio] = useState(new Audio());
    const [songInfo, setSongInfo] = useState(null);
    const [sliderValue, setSliderValue] = useState(0);
    const [isShuffle, setIsShuffle] = useState(false);
    const [isRepeat, setIsRepeat] = useState(false);
    const [mute, setMute] = useState(false);
    const [volumeValue, setVolumeValue] = useState(100);

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
                }
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
        setSliderValue(0);
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
    //handleAutoPlayNextSong
    useEffect(() => {
        const handleEnded = () => {
            if (isRepeat) {
                audio.currentTime = 0;
                audio.play();
            } else if (isShuffle) {
                handleShuffle();
            } else {
                handleNextSong();
            }
        };

        audio.addEventListener('ended', handleEnded);

        return () => {
            audio.removeEventListener('ended', handleEnded);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [audio, isShuffle, isPlaying, isRepeat]);

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

    //handle button actions
    const handleNextSong = () => {
        if (songs) {
            if (isShuffle) {
                handleShuffle();
            } else {
                let currentSongIndex;
                songs?.forEach((song, index) => {
                    if (song?.encodeId === currentSongId) currentSongIndex = index;
                });

                if (currentSongIndex < songs.length - 1) {
                    dispatch(actions.setCurSongId(songs[currentSongIndex + 1]?.encodeId));
                }
            }
        }
    };

    const handlePrevSong = () => {
        if (songs) {
            if (isShuffle) {
                handleShuffle();
            } else {
                let currentSongIndex;
                songs?.forEach((song, index) => {
                    if (song?.encodeId === currentSongId) currentSongIndex = index;
                });

                if (currentSongIndex !== 0) {
                    dispatch(actions.setCurSongId(songs[currentSongIndex - 1]?.encodeId));
                }
            }
        }
    };

    const handleShuffle = () => {
        const randomIndex = Math.round(Math.random() * songs?.length) - 1;
        dispatch(actions.setCurSongId(songs[randomIndex].encodeId));
    };

    const handleMuteVolume = () => {
        mute ? setVolumeValue(100) : setVolumeValue(0);
        setMute((prev) => !prev);
    };

    const handleChangeVolume = (value) => {
        setVolumeValue(value);
        if (value === 0) {
            setMute(true);
        } else {
            setMute(false);
        }
    };
    //change Volume Music
    useEffect(() => {
        audio.volume = volumeValue / 100;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [volumeValue]);

    //handle Keyboard
    useEffect(() => {
        //spacekey
        const handleKeyDown = (e) => {
            if (e.code === 'Space') {
                e.preventDefault();
                if (songInfo) {
                    if (isPlaying) {
                        audio.pause();
                        dispatch(actions.setPlay(false));
                    } else {
                        audio.play();
                        dispatch(actions.setPlay(true));
                    }
                }
            }
            if (e.code === 'ArrowLeft') {
                audio.currentTime -= 5;
            }
            if (e.code === 'ArrowRight') {
                audio.currentTime += 5;
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isPlaying]);

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
                            <SwapOutlined
                                className={cx('action-btn', { shuffle: isShuffle })}
                                onClick={() => {
                                    setIsShuffle((prev) => !prev);
                                }}
                            />
                            <StepBackwardOutlined
                                className={songs ? cx('action-btn') : cx('action-btn-disable')}
                                onClick={handlePrevSong}
                            />
                            <div onClick={handlePlayMusic}>
                                {isPlaying ? (
                                    <PauseCircleOutlined className={cx('action-btn', 'play-btn')} />
                                ) : (
                                    <PlayCircleOutlined className={cx('action-btn', 'play-btn')} />
                                )}
                            </div>
                            <StepForwardOutlined
                                className={songs ? cx('action-btn') : cx('action-btn-disable')}
                                onClick={handleNextSong}
                            />
                            <RetweetOutlined
                                className={cx('action-btn', { repeat: isRepeat })}
                                onClick={() => {
                                    setIsRepeat((prev) => !prev);
                                }}
                            />
                        </div>
                        <div className={cx('slide-bar')}>
                            <Slider
                            dots={false}
                                tooltip={{ open: false }}
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
                            <SoundOutlined
                                className={cx('volume-btn', { mute: mute })}
                                onClick={handleMuteVolume}
                            />
                            <Slider
                                className={cx('volume-slider')}
                                value={volumeValue}
                                railStyle={{ backgroundColor: 'gray' }}
                                onChange={handleChangeVolume}
                            />
                        </div>

                        <Popover
                            content={<PlaylistPopper />}
                            trigger="click"
                            arrow={false}
                            color="#34224f"
                            overlayInnerStyle={{ padding: '6px', marginBottom: '12px' }}
                            placement="topLeft"
                        >
                            <UnorderedListOutlined className={cx('list-btn')} />
                        </Popover>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default MusicPlayer;
