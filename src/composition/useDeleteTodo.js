export default function userDeleteTodo(todosRef) {
    const deleteTodo = (todo) => {
        todosRef.value.splice(todosRef.value.indexOf(todo), 1);
        if (!todosRef.value.length) {
            location.pathname = ''
        }
    }

    const deleteCompleted = () => {
        todosRef.value = todosRef.value.filter((it) => !it.completed);
        if (!todosRef.value.length) {
            location.pathname = ''
        }
    }

    return {
        deleteTodo,
        deleteCompleted
    }
}