"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./sass/main.scss");
var Autobind_1 = require("./decorators/Autobind");
var TodoList = (function () {
    function TodoList() {
        this.allTodoUl = document.querySelector('.all-todos');
        this.Popup = document.querySelector('.popup');
    }
    TodoList.prototype.createNewTodo = function (todo) {
        var newElLi = document.createElement('li');
        newElLi.classList.add('todo-item');
        newElLi.setAttribute('id', todo.id);
        newElLi.innerHTML = "<p class=\"todo\">".concat(todo.value, "</p>\n                    <button class=\"todo-icon completeBtn\"><i class=\"fa-solid fa-check\"></i></button>\n                    <button class=\"todo-icon editBtn\"><i class=\"fa-solid fa-pen\"></i></button>\n                    <button class=\"todo-icon deleteBtn\"><i class=\"fa-solid fa-trash\"></i></button>");
        this.allTodoUl.append(newElLi);
        this.showEditTodo(todo.id);
        this.completeTodo(todo.id);
        this.deleteTodoFn(todo.id);
    };
    TodoList.prototype.editTodo = function (todoId) {
        var _this = this;
        var editBtn = document.querySelector('.popup-btn');
        editBtn === null || editBtn === void 0 ? void 0 : editBtn.addEventListener('click', function () {
            var popupInput = document.querySelector('.popup-input');
            var editTodoLi = document.getElementById(todoId);
            if (editTodoLi) {
                var todoText = editTodoLi.querySelector('.todo');
                if (todoText) {
                    if (popupInput.value !== '') {
                        todoText.innerHTML = popupInput.value;
                    }
                    else {
                        alert('please text something');
                    }
                }
            }
            _this.Popup.classList.remove('open-popup');
            popupInput.value = '';
        }, { once: true });
    };
    TodoList.prototype.showEditTodo = function (todoId) {
        var _this = this;
        var editTodoLi = document.getElementById(todoId);
        if (editTodoLi) {
            var editTodoBtn = editTodoLi.querySelector('.editBtn');
            editTodoBtn === null || editTodoBtn === void 0 ? void 0 : editTodoBtn.addEventListener('click', function () {
                var todoText = editTodoLi.querySelector('.todo').innerHTML;
                var popupInput = document.querySelector('.popup-input');
                popupInput.value = todoText;
                _this.Popup.classList.add('open-popup');
                _this.editTodo(todoId);
            });
        }
    };
    TodoList.prototype.completeTodo = function (todoId) {
        var completeTodoLi = document.getElementById(todoId);
        if (completeTodoLi) {
            var completeTodoBtn = completeTodoLi.querySelector('.completeBtn');
            var todoText_1 = completeTodoLi.querySelector('.todo');
            completeTodoBtn === null || completeTodoBtn === void 0 ? void 0 : completeTodoBtn.addEventListener('click', function () {
                todoText_1 === null || todoText_1 === void 0 ? void 0 : todoText_1.classList.toggle('completed');
            });
        }
    };
    TodoList.prototype.deleteTodoFn = function (todoId) {
        var deleteLi = document.getElementById(todoId);
        if (deleteLi) {
            var deleteBtn = deleteLi.querySelector('.deleteBtn');
            deleteBtn === null || deleteBtn === void 0 ? void 0 : deleteBtn.addEventListener('click', function () {
                deleteLi.remove();
            });
        }
    };
    return TodoList;
}());
var GetTodo = (function (_super) {
    __extends(GetTodo, _super);
    function GetTodo() {
        var _this = _super.call(this) || this;
        _this.todoInput = document.querySelector('.todo-input');
        _this.todoBtn = document.querySelector('.add-todo');
        _this.addTodo();
        return _this;
    }
    GetTodo.prototype.addTodo = function () {
        this.todoBtn.addEventListener('click', this.addNewTodos);
    };
    GetTodo.prototype.clearInput = function () {
        this.todoInput.value = '';
    };
    GetTodo.prototype.addNewTodos = function () {
        var inputValue = this.todoInput.value;
        if (inputValue !== '') {
            var getNewID = function () {
                return Math.floor(Math.random() * Date.now()).toString(16);
            };
            var rID = getNewID().toString();
            var todo = {
                id: rID,
                value: inputValue,
            };
            this.createNewTodo(todo);
            this.clearInput();
        }
        else {
            alert('Add something to your todo :D');
        }
    };
    __decorate([
        Autobind_1.autoBind
    ], GetTodo.prototype, "addNewTodos", null);
    return GetTodo;
}(TodoList));
new GetTodo();
new TodoList();
//# sourceMappingURL=app.js.map