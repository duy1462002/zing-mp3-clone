import {
    BankOutlined,
    CompassOutlined,
    DotChartOutlined,
    PlayCircleOutlined,
    PlusOutlined,
    StarOutlined,
} from '@ant-design/icons';
import logo from '~/assets/logo-dark.svg';
import classNames from 'classnames/bind';
import styles from './LeftSideBar.module.scss';
import MenuAntDesign from './Menu';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import routes from '~/config/routes';
import { useSelector } from 'react-redux';
const cx = classNames.bind(styles);

const LeftSideBar = () => {
    const {isLogin} = useSelector(state => state.app)
    const navigate = useNavigate();

    const Menu_items = [
        { label: 'Discover', key: routes.discover, icon: <CompassOutlined /> },
        { label: '#zingchart', key: routes.zingchart, icon: <DotChartOutlined /> },
        { label: 'Top 100', key: routes.top100, icon: <StarOutlined /> },
        { type: 'divider', icon: <BankOutlined /> },
        { label: 'Billboard', key: routes.billboard, icon: <CompassOutlined /> },
        { label: 'Library', key: routes.library, icon: <BankOutlined /> },
        
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

    if (isLogin) {
        Menu_items.push(myMusic);
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('logo-wrapper')} onClick={() => navigate(routes.discover)}>
                <img src={logo} alt="logo" className={cx('logo')} />
            </div>

            <div className={cx('menu-wrapper')}>
                <MenuAntDesign data={Menu_items} />

                {isLogin ? (
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
