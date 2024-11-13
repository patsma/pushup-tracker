<script setup lang="ts">
import { onMounted } from 'vue'
import { ensureNotFalsy, randomCouchString } from 'rxdb/plugins/core'
import { useDatabase } from './composables/useDatabase'

// Use your database here
const database = await useDatabase()

// State management
const newTodoName = ref('')

// Update URL in description text
const route = window.location.href

onMounted(async () => {
  // render reactive todo list
  const $todoList = getById('todo-list')
  database.todos
    .find({
      sort: [{ state: 'desc' }, { lastChange: 'desc' }]
    })
    .$.subscribe(todos => {
      $todoList.innerHTML = ''
      todos.forEach(todo => $todoList.append(getHtmlByTodo(todo)))
    })
})

async function addTodo() {
  if (newTodoName.value.length < 1) {
    return
  }
  await database.todos.insert({
    id: randomCouchString(10),
    name: newTodoName.value,
    state: 'open',
    lastChange: Date.now()
  })
  newTodoName.value = ''
}

function clearCompleted() {
  database.todos.find({ selector: { state: 'done' } }).remove()
}

function getById<T = HTMLElement>(id: string): T {
  return ensureNotFalsy(document.getElementById(id)) as any
}
const escapeForHTML = (s: string) =>
  s.replace(/[&<]/g, c => (c === '&' ? '&amp;' : '&lt;'))
const isEnterEvent = (ev: KeyboardEvent) =>
  ev.code === 'Enter' || ev.keyCode === 13

function getHtmlByTodo(todo: RxTodoDocument): HTMLLIElement {
  const $liElement = document.createElement('li')
  const $viewDiv = document.createElement('div')
  const $checkbox = document.createElement('input')
  const $label = document.createElement('label')
  const $deleteButton = document.createElement('button')
  $liElement.append($viewDiv)
  $viewDiv.append($checkbox)
  $viewDiv.append($label)
  $viewDiv.append($deleteButton)

  // event: toggle todo state
  $checkbox.onclick = () =>
    todo.incrementalPatch({ state: todo.state === 'done' ? 'open' : 'done' })
  $checkbox.type = 'checkbox'
  $checkbox.classList.add('toggle')

  // event: change todo name
  $label.contentEditable = 'true'
  const updateName = async () => {
    let newName = $label.innerText || ($label.textContent as string)
    newName = newName
      .replace(/<br>/g, '')
      .replace(/\&nbsp;/g, ' ')
      .trim()
    if (newName !== todo.name) {
      await todo.incrementalPatch({ name: newName })
    }
  }
  $label.onblur = () => updateName()
  $label.onkeyup = async ev => {
    if (isEnterEvent(ev)) {
      updateName()
    }
  }
  $label.innerHTML = escapeForHTML(todo.name)

  // event: delete todo
  $deleteButton.classList.add('destroy')
  $deleteButton.onclick = () => todo.remove()

  if (todo.state === 'done') {
    $liElement.classList.add('completed')
    $checkbox.checked = true
  }

  return $liElement
}
</script>

<template>
  <GitHubBanner />
  <section class="todoapp">
    <header class="header">
      <h1>p2p todos</h1>
      <p class="description">
        This is a
        <a href="https://rxdb.info/offline-first.html" target="_blank"
          >local first</a
        >
        todo app that stores data locally with
        <a href="https://rxdb.info/" target="_blank">RxDB</a> and replicates it
        <a href="https://rxdb.info/replication-p2p.html" target="_blank"
          >peer-to-peer with WebRTC</a
        >
        to other devices without sending the data through any central server.
        Open this url in another browser/device/tab to test the replication:
        <br />
        <code>{{ route }}</code>
        The whole app is implemented without a framework in about 200 lines of
        TypeScript code. To learn more about how it works, I recommend looking
        at the
        <a
          href="https://github.com/pubkey/rxdb-quickstart/blob/master/src/index.ts"
          target="_blank"
          >source code</a
        >
        and read the
        <a href="https://rxdb.info/quickstart.html" target="_blank"
          >RxDB Quickstart Guide</a
        >.
      </p>
      <hr />
      <input
        v-model="newTodoName"
        @keyup.enter="addTodo"
        id="insert-todo"
        class="new-todo"
        placeholder="What needs to be done? (Enter to submit)"
        autofocus
      />
    </header>
    <section class="main">
      <input id="toggle-all" class="toggle-all" type="checkbox" />
      <label for="toggle-all">Mark all as complete</label>
      <ul class="todo-list" id="todo-list"></ul>
      <footer class="footer">
        <span class="todo-count"></span>
        <ul class="filters">
          <!-- <li>
                        <a class="selected">All</a>
                    </li> -->
          <!-- <li>
                        <a>Completed</a>
                    </li> -->
        </ul>
        <button
          @click="clearCompleted"
          class="clear-completed"
          id="clear-completed"
        >
          Clear completed
        </button>
      </footer>
    </section>
  </section>
  <TheFooter />
</template>

<style>
@import 'todomvc-app-css/index.css';

.description {
  padding: 15px;
  margin-bottom: 10px;
}

code {
  display: block;
  padding: 15px;

  /**
     * https://css-tricks.com/better-line-breaks-for-long-urls/
     */
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-word;
  hyphens: auto;
}

a {
  color: #b83f45;
  font-weight: bold;
  text-decoration: none;
}

a:visited {
  color: #b83f45;
}

/**
 * @link https://codepo8.github.io/css-fork-on-github-ribbon/
 */
#forkongithub a {
  background: #000;
  color: #fff;
  text-decoration: none;
  font-family: arial, sans-serif;
  text-align: center;
  font-weight: bold;
  padding: 5px 40px;
  font-size: 1rem;
  line-height: 2rem;
  position: relative;
  transition: 0.5s;
}

#forkongithub a:hover {
  background: #b83f45;
  color: #fff;
}

#forkongithub a::before,
#forkongithub a::after {
  content: '';
  width: 100%;
  display: block;
  position: absolute;
  top: 1px;
  left: 0;
  height: 1px;
  background: #fff;
}

#forkongithub a::after {
  bottom: 1px;
  top: auto;
}

@media screen and (min-width: 800px) {
  #forkongithub {
    position: fixed;
    display: block;
    top: 0;
    right: 0;
    width: 200px;
    overflow: hidden;
    height: 200px;
    z-index: 9999;
  }

  #forkongithub a {
    width: 200px;
    position: absolute;
    top: 60px;
    right: -60px;
    transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    -o-transform: rotate(45deg);
    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.8);
  }
}
</style>
