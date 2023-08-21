// eslint-disable-next-line no-undef
new Vue({
  el: "#app",
  data() {
    return {
      isDark: true,
      show: true,
      todoTitle: "",
      todos: [],
    };
  },
  created() {
    const query = `
      query {
        getTodos {
          id title done createdAt updatedAt
        }
      }
    `;
    fetch("/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ query }),
    })
      .then((res) => res.json())
      .then((response) => {
        this.todos = response.data.getTodos;
      })
      .catch((e) => console.log(e));
  },
  methods: {
    addTodo() {
      const title = this.todoTitle.trim();
      if (!title) {
        return;
      }
      fetch("/api/todo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      })
        .then((res) => res.json())
        .then(({ todo }) => {
          this.todos.push(todo);
          this.todoTitle = "";
        })
        .catch((e) => console.log(e));
    },
    removeTodo(id) {
      fetch(`/api/todo/${id}`, {
        method: "DELETE",
      })
        .then(() => {
          this.todos = this.todos.filter((t) => t.id !== id);
        })
        .catch((e) => console.log(e));
    },
    completeTodo(id) {
      fetch(`/api/todo/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ done: true }),
      })
        .then((res) => res.json())
        .then(({ todo }) => {
          const idx = this.todos.findIndex((t) => t.id === todo.id);
          this.todos[idx].updatedAt = todo.updatedAt;
        })
        .catch((e) => console.log(e));
    },
  },
  filters: {
    capitalize(value) {
      return value.toString().charAt(0).toUpperCase() + value.slice(1);
    },
    date(value, withTime) {
      const options = {
        year: "numeric",
        month: "long",
        day: "2-digit",
      };
      if (withTime) {
        options.hour = "2-digit";
        options.minute = "2-digit";
        options.second = "2-digit";
      }
      return new Intl.DateTimeFormat("us-US", options).format(new Date(+value));
    },
  },
});
