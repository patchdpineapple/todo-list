import {eventhandler} from './eventhandler.js';
import {data} from './data.js';
import {display} from './display.js';

window.data = data;


eventhandler.initializeEvents();
display.removeTasks();
display.displayProjects(); 
display.displayDefault();

