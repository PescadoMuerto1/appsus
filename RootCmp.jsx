const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { AppHeader } from "./cmps/AppHeader.jsx"
import { About } from "./views/About.jsx"
import { Home } from "./views/Home.jsx"
import { MailIndex } from "./apps/mail/views/MailIndex.jsx"
import { NoteIndex } from "./apps/note/views/NoteIndex.jsx"
import { MailDetails } from "./apps/mail/cmps/MailDetails.jsx"
import { MailCompose } from "./apps/mail/cmps/MailCompose.jsx"



export function App() {
    return <Router>
        <section className="app grid main-layout">
            <AppHeader />
            <main className="main-content full grid main-layout">
                <Routes>
                    <Route path="/" element={ <Home /> } />
                    <Route path="/about" element={ <About /> } />
                    <Route path="/mail" element={ <MailIndex /> }>
                        <Route path="/mail/inbox" element={ <MailIndex /> } />
                        <Route path="/mail/inbox/:mailId" element={ <MailDetails /> } />
                        <Route path="/mail/compose" element={ <MailCompose /> } />
                    </Route>
                    <Route path="/note" element={ <NoteIndex /> } />
                </Routes>
            </main>
        </section>
    </Router>
}
