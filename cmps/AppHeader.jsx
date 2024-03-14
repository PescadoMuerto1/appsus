const { Link, NavLink } = ReactRouterDOM

export function AppHeader() {

    return <header className="app-header grid main-layout full">
        <div className="header-logo">
            <Link to="/">
                <div className="flex">
                    <img className="logo" src="assets/img/horse.png" alt="" />
                    <h3 className="logo">AppSus</h3>
                </div>
            </Link>

        </div>
        <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/mail?folder=inbox">Mail</NavLink>
            <NavLink to="/note">Note</NavLink>
        </nav>
    </header>
}
