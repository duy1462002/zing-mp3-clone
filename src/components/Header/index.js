import React, { useEffect, useState } from 'react';
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
import { useNavigate } from 'react-router-dom';
import * as apis from "~/apis"
import * as actions from "~/store/actions"
import { useDispatch } from 'react-redux';
import useDebounce from '~/hooks/useDebounce';
const cx = classNames.bind(styles);

const Header = ({ isScroll }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate(-1);
    };
    const handleGoForward = () => {
        navigate(1);
    };
    
    const [searchValue, setSearchValue] = useState('');
    const [dataSearch, setDataSearch] = useState({});
    
    const searchValueDebounced = useDebounce(searchValue, 1000)

    useEffect(() => {
        const fetchDataSearch = async () => {
            const res = await apis.apiSearch(searchValueDebounced);
            if(res?.data?.err === 0) {
                setDataSearch(res?.data?.data);
            }
        }
        fetchDataSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchValueDebounced])

    return (
        <div className={cx('wrapper', { isScroll: isScroll })}>
            <div className={cx('search-container')}>
                <ArrowLeftOutlined className={cx('lr-button')} onClick={handleGoBack} />
                <ArrowRightOutlined className={cx('lr-button')} onClick={handleGoForward} />

                <Popover content={<SearchPopper data={dataSearch}/>} trigger="click" arrow={false} color="#34224f">
                    <Search
                        style={{
                            width: 400,
                        }}
                        size="large"
                        placeholder="Search songs, artists, lyrics..."
                        allowClear
                        bordered={false}
                        className={cx('search')}
                        value={searchValue}
                        onChange={(e) => {setSearchValue(e.target.value)}}
                        onFocus={() => {dispatch(actions.setFocusSearch(true))}}
                        onBlur={() => {dispatch(actions.setFocusSearch(false))}}
                        
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
                    placement="bottomLeft"
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
                    placement="bottomLeft"
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
