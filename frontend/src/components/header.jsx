import * as React from "react";
import {useRouter} from "next/router";
import {usePathname} from "next/navigation";
import {FilledButton, TextButton, Subheading, Icon, on_client} from '../arroz-con-webo';

import logo from "../images/temp_logo.svg";


export default function Header() {
    const [active, set_active] = React.useState(on_client(usePathname)?? "home");
    const router = useRouter();

    const [nav_list, update_nav_list] = React.useState([]);

    React.useEffect(() => {
        const go = page => {
            set_active(page);
            router.push(page);
        }

        console.log(router.asPath);

        let nav_list = [];
        if(active === '/home')
            nav_list.push(<FilledButton role="primary" pill onClick={() => go("/home")}>Home</FilledButton>);
        else
            nav_list.push(<TextButton role="primary" pill onClick={() => go("/home")}>Home</TextButton>);

        if(active === '/library')
            nav_list.push(<FilledButton role="primary" pill onClick={() => go("/library")}>Recipes</FilledButton>);
        else
            nav_list.push(<TextButton role="primary" pill onClick={() => go("/library")}>Recipes</TextButton>);

        if(active === '/about')
            nav_list.push(<FilledButton role="primary" pill onClick={() => go("/about")}>About</FilledButton>);
        else
            nav_list.push(<TextButton role="primary" pill onClick={() => go("/about")}>About</TextButton>);
        
        update_nav_list(nav_list);
    }, [active]);

    return (
        <div className="header">
            <div className="header-logo">
                <Icon scale={3}>
                    <svg viewBox="32 -8 64 64" xmlns="http://www.w3.org/2000/svg">
                        <g id="iconCarrier">
                            <path d="M50.633 13.479c0.334-2.112 1.209-4.062 2.355-5.696c1.03-1.469 2.242-2.665 3.574-3.514c2.688-1.601 5.922-2.362 9.411-2.362c4.375 0 8.416 1.156 11.654 3.15c4.377 2.443 6.946 6.227 8.28 9.912c0.004 0.018 0.007 0.036 0.011 0.053c0.659 1.783 1.008 3.679 1.008 5.621c0 7.732-6.267 14-14 14c-5.254 0-9.951-2.868-12.432-7.48c-1.286-2.469-2.399-5.266-3.32-8.148C51.233 15.787 50.781 14.645 50.633 13.479z"/>
                            <path d="M62.546 3.93c-0.06-0.295-0.151-0.585-0.271-0.868c-0.122-0.288-0.264-0.566-0.423-0.836c-0.155-0.273-0.332-0.534-0.532-0.789c-0.202-0.26-0.42-0.507-0.662-0.744c-0.236-0.236-0.489-0.455-0.745-0.66c-0.256-0.197-0.523-0.374-0.797-0.533c-0.284-0.044-0.561-0.155-0.846-0.197c-0.175-0.017-0.351-0.025-0.527-0.025c-0.556 0-1.11 0.065-1.653 0.193c-0.528 0.129-1.048 0.309-1.556 0.536c-0.494 0.233-0.983 0.504-1.457 0.815"/>
                        </g>
                    </svg>
                </Icon>
                <Subheading>Dos Culturas</Subheading>
            </div>
            <ul className="nav-links">
                {nav_list}
            </ul>
        </div>
    );
}