export function NoteTodo({ todo }) {

    return (
        <li className='note-todo' key={5}>
            {console.log(todo)}
            <label htmlFor={`todo${todo.id}`}>{todo.text}</label>
            <input
                type="checkbox"
                id={`todo${todo.id}`}
                name={`todo${todo.id}`}
                checked={todo.isChecked}
            />
        </li>
    )
}