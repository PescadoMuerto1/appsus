
const { useState, useRef, useEffect } = React
const { NavLink } = ReactRouterDOM

export function NoteNavMenu({ setIsNavMenu, isNavMenu }) {
    const navRef = useRef(null)

    useEffect(() => {

        const handleClickOutside = (event) => {
            if (isNavMenu && navRef.current && !navRef.current.contains(event.target)) {
                setIsNavMenu(false)
            }
        }

        if (!isNavMenu) document.removeEventListener("mousedown", handleClickOutside)
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)

    }, [isNavMenu])

    return (
        <section className="menu-nav" ref={navRef}>
            <nav className="menu-nav-content">
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
    )
}