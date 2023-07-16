import React from 'react';
import classNames from 'classnames/bind';
import style from './SongList.module.scss';
import { Col, Divider, Row } from 'antd';
import { SortAscendingOutlined } from '@ant-design/icons';
import SongItem from '../SongItem';
const cx = classNames.bind(style);

const SongList = ({data, totalSongs}) => {
    console.log(data);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('heading')}>
                <Row>
                    <Col span={12} className={cx('first-col')}>
                        <SortAscendingOutlined />
                        <span className={cx('heading-text')}>Song</span>
                    </Col>
                    <Col span={10}>Album</Col>
                    <Col span={2} style={{marginLeft: '-12px'}}>Duration</Col>
                </Row>
            </div>
            <Divider
                orientation="left"
                className={cx('divider')}
                style={{ margin: 0, backgroundColor: 'gray', opacity: 0.3 }}
            />
            <div className={cx('song-lists')}>
                {data?.map(song => <SongItem key={song?.encodeId} data={song}/>)}
            </div>

            <div className={cx('total-songs')}>{`Total: ${totalSongs?.total} songs`}</div>
        </div>
    );
};

export default SongList;
