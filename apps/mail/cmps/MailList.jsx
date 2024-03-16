const { useOutletContext } = ReactRouterDOM

import { MailPreview } from "./MailPreview.jsx";

export function MailList() {
    const [mails, setMails, onDeleteMail, onMailSelect, onToggleProperty] = useOutletContext()
    if (!mails) return <div><img src="assets/img/planeloader.gif" /></div>
    return <section className="mail-list grid">
        { mails.map(mail =>
            <MailPreview mail={ mail } key={ mail.id }
                onDeleteMail={ onDeleteMail }
                onMailSelect={ onMailSelect }
                onToggleProperty={ onToggleProperty }
            />
        )
        }
    </section >
}
