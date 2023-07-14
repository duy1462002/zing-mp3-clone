import Billboard from "~/pages/public/Billboard/Billboard";
import config from "../config";
import Discover from "../pages/public/Discover/Discover"
import Library from "../pages/public/Library/Library"
import Radio from "../pages/public/Radio/Radio"
import ZingChard from "../pages/public/ZingChart/Zingchart"
import Topic from "~/pages/public/Topic/Topic";
import Top100 from "~/pages/public/Top100/Top100";


const publicRoutes = [
    { path: config.routes.discover, component: Discover},
    { path: config.routes.zingchart, component: ZingChard},
    { path: config.routes.radio, component: Radio},
    { path: config.routes.library, component: Library},
    { path: config.routes.billboard, component: Billboard},
    { path: config.routes.topic, component: Topic},
    { path: config.routes.top100, component: Top100},
]

export {publicRoutes}