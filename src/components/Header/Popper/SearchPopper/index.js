import React from 'react';
import classNames from 'classnames/bind';
import styles from './SearchPopper.module.scss';
import { RiseOutlined } from '@ant-design/icons';
import PopperItem from '../PopperItem';
const cx = classNames.bind(styles);

const SearchPopper = () => {
  return (
    <div className={cx('wrapper')}>
        <strong className={cx('title')}>Suggested for you</strong>
        <div className={cx('suggestion')}>
            <PopperItem text="Ngày mình chia tay..." iconLeft={<RiseOutlined />}/>
            <PopperItem text="Ngày mình chia tay..." iconLeft={<RiseOutlined />}/>
            <PopperItem text="Ngày mình chia tay..." iconLeft={<RiseOutlined />}/>
            <PopperItem text="Ngày mình chia tay..." iconLeft={<RiseOutlined />}/>
            
        </div>
    </div>
  )
}

export default SearchPopper