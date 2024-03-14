const { Fragment } = React
const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { AppHeader } from "./cmps/AppHeader.jsx"
import { About } from "./views/About.jsx"
import { Home } from "./views/Home.jsx"
import { MailIndex } from "./apps/mail/views/MailIndex.jsx"
import { NoteIndex } from "./apps/note/views/NoteIndex.jsx"
import { MailDetails } from "./apps/mail/cmps/MailDetails.jsx"
import { MailCompose } from "./apps/mail/views/MailCompose.jsx"
import { MailList } from "./apps/mail/cmps/MailList.jsx"
import { MailFilter } from "./apps/mail/cmps/MailFilter.jsx"



export function App() {
    return <Router>
        <section className="app grid main-layout">
            <AppHeader />
            <main className="main-content full grid main-layout">
                <Routes>
                    <Route path="/" element={ <Home /> } />
                    <Route path="/about" element={ <About /> } />
                    <Route path="/mail" element={ <MailIndex /> } >
                        {/* <Route path="/mail/mail" element={ <MailDetails /> } /> */ }
                        <Route path="/mail/list" element={ <Fragment><MailFilter /> <MailList /></Fragment> } />
                        <Route path="/mail/read/:mailId" element={ <MailDetails /> } />
                        <Route path="/mail/compose" element={ <MailCompose /> } />
                    </Route>
                    <Route path="/note" element={ <NoteIndex /> } />
                </Routes>
            </main>
        </section>
    </Router>
}
