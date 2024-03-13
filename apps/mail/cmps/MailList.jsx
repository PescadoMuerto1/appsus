import { MailPreview } from "./MailPreview.jsx";

export function MailList({ mails, onDeleteMail, onMailSelect }) {

    return <table className="mail-list">
        <tbody>
            { mails.map(mail =>
                <tr key={ mail.id } >
                    <td><button onClick={ () => onDeleteMail(mail) }>✕</button></td>
                    <MailPreview mail={ mail } onClick={ onMailSelect }/>
                </tr>) }
        </tbody>
    </table>
}
