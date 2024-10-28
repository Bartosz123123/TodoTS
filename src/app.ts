import './sass/main.scss';
import { autoBind } from './decorators/Autobind';

interface Todo {
	id: string;
	value: string;
}

class TodoList {
	allTodoUl: HTMLUListElement;

	constructor() {
		this.allTodoUl = document.querySelector('.all-todos')! as HTMLUListElement;
	}

	createNewTodo(todo: Todo) {
		const newElLi = document.createElement('li');
		newElLi.classList.add('todo-item');
		newElLi.setAttribute('id', todo.id);

		newElLi.innerHTML = `<span class="todo">${todo.value}</span>
                    <button class="todo-icon completeBtn"><i class="fa-solid fa-check"></i></button>
                    <button class="todo-icon editBtn"><i class="fa-solid fa-pen"></i></button>
                    <button class="todo-icon deleteBtn"><i class="fa-solid fa-trash"></i></button>`;

		this.allTodoUl.append(newElLi);

		this.deleteTodoFn(todo.id);
	}

	private deleteTodoFn(todoId: string) {
		const deleteLi = document.getElementById(todoId);

		if (deleteLi) {
			const deleteBtn = deleteLi.querySelector(
				'.deleteBtn'
			) as HTMLButtonElement;

			deleteBtn?.addEventListener('click', () => {
				deleteLi.remove();
			});
		}
	}
	
	// private deleteTodoFn(newElLi: HTMLElement) {
	// 	const deleteBtn = newElLi.querySelector('.deleteBtn')! as HTMLButtonElement;
	// 	console.log(deleteBtn);
	// 	deleteBtn?.addEventListener('click', () => {
	// 		newElLi.remove();
	// 	});
	// }
}

class GetTodo extends TodoList {
	todoInput: HTMLInputElement;
	todoBtn: HTMLButtonElement;

	constructor() {
		super();
		this.todoInput = document.querySelector('.todo-input')! as HTMLInputElement;
		this.todoBtn = document.querySelector('.add-todo')! as HTMLButtonElement;

		this.addTodo();
	}

	private addTodo() {
		this.todoBtn.addEventListener('click', this.addNewTodos);
	}

	private clearInput() {
		this.todoInput.value = '';
	}

	@autoBind
	private addNewTodos() {
		const inputValue = this.todoInput.value;
		if (inputValue !== '') {
			const getNewID = () =>
				Math.floor(Math.random() * Date.now()).toString(16);
			const rID = getNewID().toString();

			const todo: Todo = {
				id: rID,
				value: inputValue,
			};

			this.createNewTodo(todo);
			this.clearInput();
		} else {
			alert('Add something to your todo :D');
		}
	}
}

new GetTodo();
new TodoList();
