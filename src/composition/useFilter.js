import { ref, onMounted, onUnmounted, computed } from "vue";
import { filter } from '../api/todoStorage'
export default function userFilter(todosRef) {
    const visibleRef = ref('all');
    const choose = ['all', 'active', 'completed'];

    const onHashChange = () => {
        // cosole.log(location.hash);
        const hash = location.hash.replace(/#\/?/, '');
        console.log(hash);
        if (choose.includes(hash)) {
            visibleRef.value = hash;
        } else {
            location.hash = '';
            visibleRef.value = 'all';
        }
    }

    // 1. 组件挂载完成的生命周期函数
    onMounted(() => {
        window.addEventListener("hashchange", onHashChange);
    });
    // 2. 组件销毁过后的生命周期函数
    onUnmounted(() => {
        window.removeEventListener("hashchange", onHashChange);
    });

    const filteredTodosRef = computed(() => {
        return filter(todosRef.value, visibleRef.value);
    });

    const activeNumber = computed(() => {
        return filter(todosRef.value, 'active').length;
    });
    const completedNumber = computed(() => {
        return filter(todosRef.value, 'completed').length;
    })

    const count = computed(() => {
        return filter(todosRef.value, visibleRef.value).length;
    })

    return {
        visibleRef,
        filteredTodosRef,
        activeNumber,
        completedNumber,
        count,
    }
}