const Task = require('./task');

class Tasks {
  _list = {};

  get listArr() {
    const list = [];
    Object.keys(this._list).forEach((key) => {
      list.push(this._list[key]);
    });

    return list;
  }

  constructor() {
    this._list = {};
  }

  deleteTask(id = '') {
    if (this._list[id]) {
      delete this._list[id];
    }
  }

  tasksFromArray(tasks = []) {
    tasks.forEach((task) => {
      this._list[task.id] = task;
    });
  }

  createTask(desc = '') {
    const task = new Task(desc);
    this._list[task.id] = task;
  }

  completeList() {
    console.log();
    this.listArr.forEach((task, index) => {
      const idx = `${index + 1}`.green;
      console.log(
        `${idx} ${task.desc} :: ${
          task.completedIn ? 'Completed'.green : 'Pending'.red
        }`
      );
    });
  }

  listPendingCompleted(completed = true) {
    console.log();
    let cont = 0;
    this.listArr.forEach((task) => {
      if (completed) {
        cont++;
        task.completedIn &&
          console.log(
            `${cont.toString().green} ${task.desc} :: ${task.completedIn.green}`
          );
      } else {
        cont++;
        !task.completedIn &&
          console.log(
            `${cont.toString().green} ${task.desc} :: ${'Pending'.red}`
          );
      }
    });
  }

  toggleCompleted(ids = []) {
    ids.forEach((id) => {
      const task = this._list[id];
      if (!task.completedIn) {
        task.completedIn = new Date().toISOString();
      }
    });

    this.listArr.forEach((task) => {
      if (!ids.includes(task.id)) {
        this._list[task.id].completedIn = null;
      }
    });
  }
}

module.exports = Tasks;
