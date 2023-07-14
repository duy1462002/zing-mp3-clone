import React from 'react';
import classNames from 'classnames/bind';
import styles from './PopperItem.module.scss';
const cx = classNames.bind(styles);

const PopperItem = ({text, iconLeft, iconRight}) => {
    return (
        <div className={cx('suggestion-item')}>
            <div className={cx('left-item')}>
                {iconLeft}
                <p className={cx('suggestion-text')}>{text}</p>
            </div>
            {iconRight}
        </div>
    );
};

export default PopperItem;
