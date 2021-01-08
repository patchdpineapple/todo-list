import { eventhandler } from './eventhandler.js';
import { data } from './data.js';
import { display } from './display.js';
import { methods } from './methods.js';





// if storage is empty, populate the storage with the projects array 
if (!JSON.parse(localStorage.getItem('projects'))) {
    console.log('storage empty');
    methods.updateStorage();
} else {
    console.log('storage has projects');
    methods.getStorage();
}

window.methods = methods;
window.data = data; //used for debugging only
eventhandler.initializeEvents();
display.removeTasks();
display.displayProjects();
display.displayDefault();

