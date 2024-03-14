
import { MailPreview } from "./MailPreview.jsx";


export function MailList({ mails, onDeleteMail, onMailSelect, onToggleProperty }) {


    return <table className="mail-list">
        <tbody>
            { mails.map(mail =>
                <MailPreview mail={ mail } key={ mail.id }
                    onDeleteMail={ onDeleteMail }
                    onMailSelect={ onMailSelect }
                    onToggleProperty={ onToggleProperty } />
            )
            }
        </tbody>
    </table >
}
