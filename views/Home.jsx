const { NavLink } = ReactRouterDOM

import { AppHeader } from "../cmps/AppHeader.jsx";

export function Home() {
    return <section className="home">
        <AppHeader />
        <nav className="menu-nav-content grid">
            <NavLink to="/">
                <i className="fa-solid fa-house"></i>
                Home
            </NavLink>
            <NavLink to="/about">
                <i className="fa-solid fa-circle-info"></i>
                About
            </NavLink>
            <NavLink to="/mail/list?folder=inbox">
                <i className="fa-solid fa-envelope-open-text"></i>
                Mail
            </NavLink>
            <NavLink to="/note">
                <i className="fa-solid fa-note-sticky"></i>
                Note
            </NavLink>
        </nav>

    </section>
}