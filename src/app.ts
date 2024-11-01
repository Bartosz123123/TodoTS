import './sass/main.scss';
import { autoBind } from './decorators/Autobind';

interface Todo {
	id: string;
	value: string;
}

class TodoList {
	allTodoUl: HTMLUListElement;
	Popup: HTMLDivElement;

	constructor() {
		this.allTodoUl = document.querySelector('.all-todos')! as HTMLUListElement;
		this.Popup = document.querySelector('.popup')! as HTMLDivElement;
	}

	createNewTodo(todo: Todo) {
		const newElLi = document.createElement('li');
		newElLi.classList.add('todo-item');
		newElLi.setAttribute('id', todo.id);

		newElLi.innerHTML = `<p class="todo">${todo.value}</p>
                    <button class="todo-icon completeBtn"><i class="fa-solid fa-check"></i></button>
                    <button class="todo-icon editBtn"><i class="fa-solid fa-pen"></i></button>
                    <button class="todo-icon deleteBtn"><i class="fa-solid fa-trash"></i></button>`;

		this.allTodoUl.append(newElLi);

		this.showEditTodo(todo.id);
		this.completeTodo(todo.id);
		this.deleteTodoFn(todo.id);
	}

	private editTodo(todoId: string) {
		const editBtn = document.querySelector('.popup-btn') as HTMLButtonElement;

		editBtn?.addEventListener(
			'click',
			() => {
				const popupInput = document.querySelector(
					'.popup-input'
				) as HTMLInputElement;

				const editTodoLi = document.getElementById(todoId) as HTMLElement;

				if (editTodoLi) {
					const todoText = editTodoLi.querySelector(
						'.todo'
					)! as HTMLParagraphElement;
					if (todoText) {
						if (popupInput.value !== '') {
							todoText.innerHTML = popupInput.value;
						} else {
							alert('please text something');
						}
					}
				}

				this.Popup.classList.remove('open-popup');

				popupInput.value = '';
			},
			{ once: true }
		);
	}

	private showEditTodo(todoId: string) {
		const editTodoLi = document.getElementById(todoId);

		if (editTodoLi) {
			const editTodoBtn = editTodoLi.querySelector('.editBtn');

			editTodoBtn?.addEventListener('click', () => {
				const todoText = editTodoLi.querySelector('.todo')!.innerHTML;

				const popupInput = document.querySelector(
					'.popup-input'
				) as HTMLInputElement;

				popupInput.value = todoText;

				this.Popup.classList.add('open-popup');
				// console.log(todoText);
				this.editTodo(todoId);
			});
		}
	}

	private completeTodo(todoId: string) {
		const completeTodoLi = document.getElementById(todoId);

		if (completeTodoLi) {
			const completeTodoBtn = completeTodoLi.querySelector('.completeBtn');
			const todoText = completeTodoLi.querySelector('.todo');
			completeTodoBtn?.addEventListener('click', () => {
				todoText?.classList.toggle('completed');
			});
		}
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
