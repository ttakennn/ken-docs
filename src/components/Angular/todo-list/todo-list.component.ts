import { CommonModule } from '@angular/common';
import { Component, Injector, WritableSignal, computed, effect, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';

interface Todo {
  title: string;
  complete: WritableSignal<boolean>;
}

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatTabsModule],
  template: `
    <header class="left-to-right" style="margin-top: 8px">
      <h3 style="margin-bottom: 0; font-weight: bold">Todo List</h3>
      <small style="font-size: medium">
        <label for="switch-1" style="margin-bottom: 0; font-weight: bold">
          <input
            type="checkbox"
            id="switch-1"
            name="switch-1"
            role="switch"
            [checked]="false"
            (change)="toggleCompleted()"
          />
          Hide Complete
        </label>
      </small>
    </header>

    <article style="margin-top: 8px; font-size: medium">
      <div *ngFor="let todo of filterList()">
        <label>
          <input type="checkbox" [checked]="todo.complete()" (change)="updateTodo(todo.complete)" />
          {{ todo.title }}
        </label>
      </div>

      <footer class="left-to-right">
        <form style="display: contents">
          <input
            #title
            type="text"
            name="addtodo"
            placeholder="Something important..."
            aria-label="Add todo"
            style="margin-bottom: 0; border-radius: 4px 0px 0px 4px"
            required
          />
          <button
            type="submit"
            style="margin: 0px; border-radius: 0px 4px 4px 0px"
            (click)="addTodo(title.value); title.value = ''"
          >
            +Add Todo
          </button>
        </form>
      </footer>
    </article>
  `,
  styles: `
    .left-to-right {
      display: grid;
      grid-template-columns: 1fr max-content;
      align-items: center;
    }
  `,
})
export class TodoListComponent {
  hideCompleted = signal(false);

  constructor(private injector: Injector) {
    this.initializeLogging();
  }

  todoList = signal<Todo[]>([
    { title: 'Angular App', complete: signal(false) },
    { title: 'Profile', complete: signal(false) },
  ]);

  filterList = computed(() =>
    !this.hideCompleted() ? this.todoList() : this.todoList().filter((todo) => !todo.complete()),
  );

  updateTodo(complete: WritableSignal<boolean>) {
    complete.update((value) => !value);
  }

  toggleCompleted() {
    this.hideCompleted.update((value) => !value);
  }

  addTodo(title: string) {
    this.todoList.update((state) => [...state, { title, complete: signal(false) }]);
  }

  initializeLogging() {
    effect(
      () => {
        console.log(`Todo list: ${JSON.stringify(this.todoList())}`);
      },
      { injector: this.injector },
    );
  }
}
