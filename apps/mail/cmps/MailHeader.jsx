
const { useState } = React
const { Link } = ReactRouterDOM

import { NavMenu } from "../../../cmps/NavMenu.jsx"
import { MailHeaderFilter } from "./MailHeaderFilter.jsx"


export function MailHeader({ filterBy, onSetFilter, setIsSideBar }) {
    const [isNavMenu, setIsNavMenu] = useState(null)
    

    return (
        <header className="mail-header full">
            <button onClick={ () => setIsSideBar(prevSideBar => !prevSideBar) }><i className="fa-solid fa-bars"></i></button>
            <div >
                <Link to="/" className="flex">
                    <img className="logo" src="assets/img/horse.png" alt="" />
                    <h3 className="logo">AppSus</h3>
                </Link>
            </div>
            
                <MailHeaderFilter filterBy={ filterBy } onSetFilter={ onSetFilter } />
            <i className="fa-solid fa-gear"></i>
            <div className="svg-container" onClick={ () => setIsNavMenu(true) }>
                <svg viewBox="0 0 24 24"><path d="M6,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM16,6c0,1.1 0.9,2 2,2s2,-0.9 2,-2 -0.9,-2 -2,-2 -2,0.9 -2,2zM12,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2z"></path></svg>
                { isNavMenu && <NavMenu setIsNavMenu={ setIsNavMenu } isNavMenu={ isNavMenu } /> }
            </div>
        </header>
    )
}