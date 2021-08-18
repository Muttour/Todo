<template>
  <div id="app">
    <section class="todoapp">
      <header class="header">
        <h1>todos</h1>
        <input
          class="new-todo"
          autofocus=""
          autocomplete="off"
          placeholder="What needs to be done?"
          v-model="newTodoRef"
          @keyup.enter="addTodo"
        />
      </header>
      <section class="main">
        <input
          id="toggle-all"
          class="toggle-all"
          type="checkbox"
          v-model="allRef"
        />
        <label for="toggle-all">Mark all as complete</label>
        <ul class="todo-list">
          <li
            class="todo"
            v-for="item in filteredTodosRef"
            :key="item"
            :class="{
              completed: item.completed,
              editing: item.id === editableRef,
            }"
          >
            <div class="view">
              <input class="toggle" type="checkbox" v-model="item.completed" />
              <label @dblclick="onEditTodo(item)">{{ item.title }}</label>
              <button class="destroy" @click="deleteTodo(item)"></button>
            </div>
            <input
              class="edit"
              type="text"
              v-model="item.title"
              @keyup.enter="editDone"
              @blur="editDone"
              @keyup.esc="cancelEdit(item)"
            />
          </li>
        </ul>
      </section>
      <footer class="footer">
        <span class="todo-count">
          <strong>{{ count }}</strong>
          <span>item{{ count > 1 ? "s" : "" }} left</span>
        </span>
        <ul class="filters">
          <li v-show="todosRef.length > 0">
            <a
              href="#/all"
              :class="{ selected: visibleRef === 'all' }"
              @click="visibleRef = 'all'"
              >All</a
            >
          </li>
          <li v-show="activeNumber > 0">
            <a
              href="#/active"
              :class="{ selected: visibleRef == 'active' }"
              @click="visibleRef = 'active'"
              >Active</a
            >
          </li>
          <li v-show="completedNumber > 0">
            <a
              href="#/completed"
              :class="{ selected: visibleRef == 'completed' }"
              @click="visibleRef = 'completed'"
              >Completed</a
            >
          </li>
        </ul>
        <button
          class="clear-completed"
          v-show="completedNumber > 0"
          @click="deleteCompleted"
        >
          Clear completed
        </button>
      </footer>
    </section>
  </div>
</template>

<script>
import useTodoList from "./composition/useTodoList";
import useNewTodo from "./composition/useNewTodo";
import useFilter from "./composition/useFilter";
import useEditTodo from "./composition/useEditTodo";
import userDeleteTodo from "./composition/useDeleteTodo";
export default {
  setup() {
    const { todosRef } = useTodoList();

    return {
      todosRef,
      ...useNewTodo(todosRef),
      ...useFilter(todosRef),
      ...useEditTodo(todosRef),
      ...userDeleteTodo(todosRef),
    };
  },
  // data: () => {
  //   return {
  //     type: "all",
  //   };
  // },
  // computed: {
  //   count() {
  //     if (this.type == "active") {
  //       return activeNumber;
  //     } else if (this.type == "completed") {
  //       return completedNumber;
  //     } else {
  //       return todosRef.length;
  //     }
  //   },
  // },
};
</script>

