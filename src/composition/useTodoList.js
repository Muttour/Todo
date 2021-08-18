import * as todoStorage from '../api/todoStorage';
import { ref, watchEffect } from "vue";
export default function useTodoList() {
    const todosRef = ref(todoStorage.fetch());
    // console.log(todosRef);
    watchEffect(() => {
        todoStorage.save(todosRef.value);
    });
    return {
        todosRef,
    };
}

