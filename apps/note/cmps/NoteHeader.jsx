const { Link, NavLink } = ReactRouterDOM

export function NoteHeader() {

    return (

        <header className="note-header">
            <i className="fa-solid fa-bars"></i>
            <div >
                <Link to="/" className="flex">
                    <img className="logo" src="assets/img/horse.png" alt="" />
                    <h3 className="logo">AppSus</h3>
                </Link>
            </div>
            <input type="text" className="search" placeholder="Search" />
            <i className="fa-solid fa-gear"></i>
            <div className="svg-container">
                <svg viewBox="0 0 24 24"><path d="M6,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM16,6c0,1.1 0.9,2 2,2s2,-0.9 2,-2 -0.9,-2 -2,-2 -2,0.9 -2,2zM12,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2z"></path></svg>
                <section className="menu-nav">
                    <nav className="menu-nav-content">
                        <NavLink to="/">
                            <i className="fa-solid fa-house"></i>
                            Home
                        </NavLink>
                        <NavLink to="/about">
                            <i class="fa-solid fa-circle-info"></i>
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
            </div>
        </header>
    )
}