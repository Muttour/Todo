import { ref, computed } from 'vue'
export default function useEditTodo(todosRef) {

    const editableRef = ref('');//正在编辑的todo
    let origin = '';
    const onEditTodo = (todo) => {
        editableRef.value = todo.id;
        origin = todo.title;
    }

    const editDone = () => {
        editableRef.value = '';
    }

    const allRef = computed({
        get() {
            var val = todosRef.value.filter((it) => !it.completed).length === 0;
            return val;
        },
        set(checked) {
            todosRef.value.forEach((todo) => {
                todo.completed = checked;
            });
        },
    })

    const cancelEdit = (todo) => {       
        todo.title = origin;
        editableRef.value = '';     
    }

    return {
        editableRef,
        onEditTodo,
        editDone,
        cancelEdit,
        allRef,
    }
}