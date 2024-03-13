import { MailPreview } from "./MailPreview.jsx";

export function MailList({ mails, onDeleteMail }) {

    // return <pre>
    //     { JSON.stringify(mails, null, 2) }
    // </pre>

    return <ul className="mail-list clean-list">
        { mails.map(mail =>
            <li className="flex space-between" key={ mail.id }>
                <button onClick={ () => onDeleteMail(mail) }>✕</button>
                <MailPreview mail={ mail } />
            </li>) }
    </ul>
}
