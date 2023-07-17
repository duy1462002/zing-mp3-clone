import React from 'react';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import {
    ArrowLeftOutlined,
    ArrowRightOutlined,
    DownloadOutlined,
    SettingOutlined,
} from '@ant-design/icons';
import Search from 'antd/es/input/Search';
import { Button, Popover } from 'antd';
import SearchPopper from './Popper/SearchPopper';
import SettingPopper from './Popper/SettingPopper';
import AvatarPopper from './Popper/AvatarPopper';
const cx = classNames.bind(styles);

const Header = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('search-container')}>
                <ArrowLeftOutlined className={cx('lr-button')} />
                <ArrowRightOutlined className={cx('lr-button')} />

                <Popover content={<SearchPopper />} trigger="click" arrow={false} color="#34224f">
                    <Search
                        style={{
                            width: 300,
                        }}
                        size="large"
                        placeholder="Search songs, artists, lyrics..."
                        allowClear
                        bordered={false}
                        className={cx('search')}
                    />
                </Popover>
            </div>

            <div className={cx('nav-container')}>
                <Button
                    className={cx('download-btn')}
                    type="primary"
                    shape="round"
                    icon={<DownloadOutlined />}
                >
                    Download for Windows
                </Button>

                <Popover
                    content={<SettingPopper />}
                    trigger="click"
                    arrow={false}
                    color="#34224f"
                    overlayInnerStyle={{ padding: '6px' }}
                    placement='bottomLeft'
                >
                    <Button
                        className={cx('setting-btn')}
                        type="primary"
                        shape="circle"
                        icon={<SettingOutlined />}
                    />
                </Popover>
                
                <Popover
                    content={<AvatarPopper />}
                    trigger="click"
                    arrow={false}
                    color="#34224f"
                    overlayInnerStyle={{ padding: '6px' }}
                    placement='bottomLeft'
                >
                <img
                    src="https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png"
                    alt=""
                    className={cx('avatar')}
                />
                </Popover>
            </div>
        </div>
    );
};

export default Header;