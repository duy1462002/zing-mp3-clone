import React from 'react';
import classNames from 'classnames/bind';
import style from './SettingPopper.module.scss'
import PopperItem from '../PopperItem';
import { AlipayCircleOutlined, BgColorsOutlined, ContactsOutlined, InfoCircleOutlined, LockOutlined, RightOutlined, TrademarkCircleFilled } from '@ant-design/icons';
import CustomSeparate from '~/components/CustomSeparate';
const cx = classNames.bind(style);

const SettingPopper = () => {
  return (
    <div className={cx('wrapper')}>
        <PopperItem text="Change theme" iconLeft={<BgColorsOutlined/>} iconRight={<RightOutlined/>}/>
        <PopperItem text="Info" iconLeft={<InfoCircleOutlined/>}/>

        <CustomSeparate/>

        <PopperItem text="Contact" iconLeft={<ContactsOutlined/>}/>
        <PopperItem text="Advertisement" iconLeft={<AlipayCircleOutlined />}/>
        <PopperItem text="Terms of use" iconLeft={<TrademarkCircleFilled/>}/>
        <PopperItem text="Privacy Policy" iconLeft={<LockOutlined/>}/>
        

    </div>
  )
}

export default SettingPopper;