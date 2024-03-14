export function NoteTodo({ todo, index, onCheckTodo }) {

    return (
        <li key={Math.random()} className='note-todo' onClick={ev => ev.stopPropagation()} >
            <input
                type="checkbox"
                id={`todo${todo.id}`}
                name={`todo${todo.id}`}
                checked={todo.isChecked}
                onChange={(ev) => onCheckTodo(ev, index)}
            />
            <label htmlFor={`todo${todo.id}`}>{todo.text}</label>
        </li>
    )
}