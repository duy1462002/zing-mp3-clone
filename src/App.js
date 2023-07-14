// import { useSelector, useDispatch } from "react-redux/es/hooks/useSelector";
import { Route, Routes } from 'react-router-dom';
import { publicRoutes } from './Routes';
import Layout from './Layout';
import "~/GlobalStyle/GlobalStyle.css"
import "~/GlobalStyle/AntDesignCustom.css"
import "~/GlobalStyle/SlickCustom.css"
import { useEffect } from 'react';
import * as actions from '~/store/actions'
import { useDispatch } from 'react-redux';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actions.getDiscover())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="App">
            <Routes>
                {publicRoutes.map((route, index) => {
                    const Page = route.component;
                    return <Route key={index} path={route.path} element={<Layout><Page /></Layout>} />;
                })}
            </Routes>
        </div>
    );
}

export default App;
