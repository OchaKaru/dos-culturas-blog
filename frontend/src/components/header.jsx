import * as React from "react";
import {navigate} from "gatsby";
import loadable from '@loadable/component';

import logo from "../images/temp_logo.svg";

const FilledButton = loadable(() => import('../arroz-con-webo').FilledButton);
const TextButton = loadable(() => import('../arroz-con-webo').TextButton);
const Subheading = loadable(() => import('../arroz-con-webo').Subheading);

export default function Header() {
    const [active, set_active] = React.useState('home');
    const [nav_list, update_nav_list] = React.useState([]);

    React.useEffect(() => {
        const go = page => {
            set_active(page);
            navigate(`/${page}/`);
        }

        let nav_list = [];
        if(active === 'home')
            nav_list.push(<FilledButton role="primary" pill>Home</FilledButton>);
        else
            nav_list.push(<TextButton role="primary" pill onClick={() => go("home")}>Home</TextButton>);

        if(active === 'library')
            nav_list.push(<FilledButton role="primary" pill>Recipes</FilledButton>);
        else
            nav_list.push(<TextButton role="primary" pill onClick={() => go("library")}>Recipes</TextButton>);

        if(active === 'about')
            nav_list.push(<FilledButton role="primary" pill>About</FilledButton>);
        else
            nav_list.push(<TextButton role="primary" pill onClick={() => go("about")}>About</TextButton>);
        
        update_nav_list(nav_list);
    }, [active]);

    return (
        <div className="header">
            <div className="header-logo">
                <img src={logo} alt="logo" />
                <Subheading>Dos Culturas</Subheading>
            </div>
            <ul className="nav-links">
                {nav_list}
            </ul>
        </div>
    );
}