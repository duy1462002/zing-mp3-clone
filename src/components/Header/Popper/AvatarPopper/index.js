import React from 'react';
import classNames from 'classnames/bind';
import style from './AvatarPopper.module.scss';
import PopperItem from '../PopperItem';
import CustomSeparate from '~/components/CustomSeparate';
import { BlockOutlined, LogoutOutlined, UploadOutlined } from '@ant-design/icons';
const cx = classNames.bind(style);

const AvatarPopper = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('user-info')}>
                <img
                    src="https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png"
                    alt=""
                    className={cx('avatar')}
                />
                <div className={cx('info')}>
                    <strong className={cx('name')}>Đỗ Hoàng Phương Duy</strong>
                    <p className={cx('status')}>Basic</p>
                </div>
            </div>

            <CustomSeparate />

            <div className={cx('personal-setting')}>
                <div className={cx('personal')}>Personal</div>
    
                <PopperItem text="Block list" iconLeft={<BlockOutlined/>}/>
                <PopperItem text="Upload song" iconLeft={<UploadOutlined/>}/>
            </div>

            <CustomSeparate />

            <div className={cx('logout-item')}><PopperItem text="Logout" iconLeft={<LogoutOutlined/>}/></div>
        </div>
    );
};

export default AvatarPopper;
