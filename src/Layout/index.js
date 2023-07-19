import React, { useEffect, useState } from 'react'
import LeftSideBar from '~/components/LeftSideBar/LeftSideBar'
import classNames from 'classnames/bind'
import styles from './Layout.module.scss'
import Header from '~/components/Header';
import MusicPlayer from '~/components/MusicPlayer';
const cx = classNames.bind(styles);

const Layout = ({children}) => {

  const [scrollPosition, setScrollPosition] = useState(0);
  const [isScroll, setIsScroll] = useState(false);
  const handleScroll = () => {
    const currentPosition = window.scrollY;
    setScrollPosition(currentPosition);
  };
  

  useEffect(() => {
    // Đăng ký sự kiện cuộn khi component được render
    window.addEventListener('scroll', handleScroll);
    scrollPosition ? setIsScroll(true) : setIsScroll(false);
    // Hủy đăng ký sự kiện khi component unmount để tránh memory leak
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollPosition]);

  return (
    <div className={cx('wrapper')}>
        <div className={cx('main')}>
          <LeftSideBar/>
          <div className={cx('content')}>
              <Header isScroll={isScroll}/>
              {children}
          </div>
        </div>

        <div className={cx('player-wrapper')}>
          <MusicPlayer/>
        </div>
    </div>
  )
}

export default Layout