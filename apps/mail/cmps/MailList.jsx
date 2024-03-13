import { MailPreview } from "./MailPreview.jsx";

export function MailList({ mails, onDeleteMail, onMailSelect }) {

    return <table className="mail-list">
        <tbody>
            { mails.map(mail =>
                <tr key={ mail.id } onClick={ () => onMailSelect(mail) }>
                    <td><button onClick={ (ev) => onDeleteMail(ev, mail) }>✕</button></td>
                    <MailPreview mail={ mail } />
                </tr>) }
        </tbody>
    </table>
}
