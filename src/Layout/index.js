import React from 'react'
import LeftSideBar from '~/components/LeftSideBar/LeftSideBar'
import classNames from 'classnames/bind'
import styles from './Layout.module.scss'
import Header from '~/components/Header';
import MusicPlayer from '~/components/MusicPlayer';
const cx = classNames.bind(styles);

const Layout = ({children}) => {
  return (
    <div className={cx('wrapper')}>
        <div className={cx('main')}>
          <LeftSideBar/>
          <div className={cx('content')}>
              <Header/>
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