import React from 'react';
import classNames from 'classnames/bind';
import style from './ClickAbleText.module.scss';
const cx = classNames.bind(style);

const ClickAbleText = ({ children, className }) => {
    return <div className={cx(style.wrapper, className)}>{children}</div>;
};

export default ClickAbleText;
