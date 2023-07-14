import {
    BankOutlined,
    CompassOutlined,
    DotChartOutlined,
    LockOutlined,
    PlayCircleOutlined,
    PlusOutlined,
    StarOutlined,
    TrophyFilled,
} from '@ant-design/icons';
import logo from '~/assets/logo-dark.svg';
import classNames from 'classnames/bind';
import styles from './LeftSideBar.module.scss';
import MenuAntDesign from './Menu';
import { Button } from 'antd';
const cx = classNames.bind(styles);

const LeftSideBar = () => {
    const Menu_items = [
        { label: 'Discover', key: '/', icon: <CompassOutlined /> },
        { label: '#zingchart', key: '/zingchart', icon: <DotChartOutlined /> },
        { label: 'Radio', key: '/radio', icon: <LockOutlined /> },
        { label: 'Library', key: '/library', icon: <BankOutlined /> },
        { type: 'divider', icon: <BankOutlined /> },
        { label: 'Billboard', key: '/billboard', icon: <CompassOutlined /> },
        { label: 'Topic', key: '/topic', icon: <TrophyFilled /> },
        { label: 'Top 100', key: '/top100', icon: <StarOutlined /> },
    ];
    const myMusic = {
        label: 'My playlists',
        icon: <PlayCircleOutlined />,
        key: '/cc',
        theme:'dark',
        children: [
            { label: 'playlist 1', key: '/pl1', icon: <PlayCircleOutlined /> },
            { label: 'playlist 2', key: '/pl2', icon: <PlayCircleOutlined /> },
            { label: 'Create a playlist', key: '/plc', icon: <PlusOutlined /> },
        ],
    };

    const currentUser = true;

    if (currentUser) {
        Menu_items.push(myMusic);
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('logo-wrapper')}>
                <img src={logo} alt="logo" className={cx('logo')} />
            </div>

            <div className={cx('menu-wrapper')}>
                <MenuAntDesign data={Menu_items} />

                {currentUser ? (
                    <>
                    </>
                ) : (
                    <div className={cx('login-banner')}>
                        <p className={cx('banner-text')}>
                            Đăng nhập để khám phá playlist dành riêng cho bạn
                        </p>
                        <Button type="primary" shape="round" className={cx('banner-button')}>
                            Đăng nhập
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LeftSideBar;
