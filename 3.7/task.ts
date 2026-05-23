enum Priority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

enum Status {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

interface TodoItem {
  todo: string;
  priority: Priority;
}

interface User {
  name: string;
  status: Status;
  todos: TodoItem[];
  changeStatus(this: User, newStatus: Status): void;
  addTodo(this: User, todo: string, priority?: Priority): void;
  displayTodos(this: User): void;
  displayActiveTodos(this: User): void;
}

const user: User = {
  name: '',
  status: Status.ACTIVE,
  todos: [],

  changeStatus(this: User, newStatus: Status) {
    this.status = newStatus;
    console.log(`User status changed to ${newStatus}`);
  },

  addTodo(this: User, todo: string, priority: Priority = Priority.MEDIUM) {
    const item: TodoItem = { todo, priority };
    this.todos.push(item);
    console.log(`Todo added: ${todo} (Priority: ${priority})`);
  },

  displayTodos(this: User) {
    console.log(`Todos for ${this.name}:`);
    this.todos.forEach((todo) => {
      console.log(`${todo.todo} (Priority: ${todo.priority})`);
    });
  },

  displayActiveTodos(this: User) {
    console.log(`Active Todos for ${this.name}:`);
    this.todos
      .filter((todo) => todo.priority !== Priority.HIGH)
      .forEach((todo) => {
        console.log(`${todo.todo} (Priority: ${todo.priority})`);
      });
  },
};

user.name = 'John';
user.changeStatus(Status.ACTIVE);
user.addTodo('take delivery', Priority.HIGH);
user.addTodo('stocktaking', Priority.HIGH);
user.addTodo('collect the order');
user.addTodo('throw out the trash', Priority.LOW);
user.displayTodos();
user.displayActiveTodos();
user.changeStatus(Status.INACTIVE);