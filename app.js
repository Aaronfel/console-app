require('colors');

const { saveDB, readDB } = require('./helpers/saveArchive');
const {
  inquirerMenu,
  pause,
  readInput,
  listTasksToDelete,
  confirm,
  showListChecklist,
} = require('./helpers/inquirer');
const Tasks = require('./models/tasks');

const main = async () => {
  let opt = '';
  const tasks = new Tasks();

  const tasksDB = readDB();

  if (tasksDB) {
    tasks.tasksFromArray(tasksDB);
  }

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case '1':
        const desc = await readInput('Description:');
        tasks.createTask(desc);
        break;

      case '2':
        console.log(tasks.completeList());
        break;
      case '3':
        console.log(tasks.listPendingCompleted(true));
        break;
      case '4':
        console.log(tasks.listPendingCompleted(false));
        break;

      case '5':
        const ids = await showListChecklist(tasks.listArr);
        tasks.toggleCompleted(ids);
        break;
      case '6':
        const id = await listTasksToDelete(tasks.listArr);
        if (id !== '0') {
          const ok = await confirm('Are you sure?');
          ok && tasks.deleteTask(id), console.log('  Deleted succesfully');
        }
    }

    saveDB(tasks.listArr);

    if (opt !== 0) await pause();
  } while (opt !== '0');
};

main();
