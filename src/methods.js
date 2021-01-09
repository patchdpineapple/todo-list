import { data, project, task } from './data.js';
import { format } from 'date-fns';
import { display } from './display.js';



const methods = (function () {




    //this method adds a new project object to the project list array. 
    // this method is attach to the add project button
    function addProject() {
        const inputname = document.querySelector('.project_name_input').value; //get input data from dom
        if (inputname == '')
            return;
        data.projects.push(new project(inputname, data.projects.length)) //add new project with name and id to list

    }

    //this method adds a new task object to the tasks array of the current project
    function addTask(projectid) {
        const task_name = document.querySelector('.todo_name').value; //get input data from dom
        const task_description = document.querySelector('.todo_description').value;
        const task_date = document.querySelector('.todo_date').value;
        let task_priority = '';

        if (document.querySelector('.todo_priority1').checked)
            task_priority = '1';
        else if (document.querySelector('.todo_priority2').checked)
            task_priority = '2';
        else if (document.querySelector('.todo_priority3').checked)
            task_priority = '3';
        else if (document.querySelector('.todo_priority4').checked)
            task_priority = '4';

        if (task_name == '' || task_description == '' || task_date == '' || task_priority == '')
            return;

        data.projects[projectid].tasks.push(new task(task_name, task_description, task_date, task_priority)) //add new project with name and id to list

    }

    //this methood is used to give functionality to edit tasks buttons
    function editTask(e) {

        // const projectid = document.querySelector('.edit_task_wrapper').getAttribute('data-id');
        const projectid = e.target.closest('.parent_wrapper').getAttribute('data-id');
        const taskid = document.querySelector('.edit_task_wrapper').getAttribute('data-taskid');


        const task_name = document.querySelector('.edit_name').value;
        const task_description = document.querySelector('.edit_description').value;
        const task_date = document.querySelector('.edit_date').value;
        let edited_priority = '';

        if (document.querySelector('.edit_priority1').checked)
            edited_priority = '1';
        else if (document.querySelector('.edit_priority2').checked)
            edited_priority = '2';
        else if (document.querySelector('.edit_priority3').checked)
            edited_priority = '3';
        else if (document.querySelector('.edit_priority4').checked)
            edited_priority = '4';

        if (task_name == '' || task_description == '' || task_date == '' || edited_priority == '')
            return;

        data.projects[projectid].tasks[taskid]._priority = edited_priority;
        data.projects[projectid].tasks[taskid]._title = task_name
        data.projects[projectid].tasks[taskid]._description = task_description
        data.projects[projectid].tasks[taskid]._date = task_date


    }

    // This method is used to delete a task from the tasks array of the selected project
    function deleteTask(projectid, taskid) {
        data.projects[projectid].tasks.splice(taskid, 1);
    }

    //update id property of project to properly connect to dom
    function updateProjectId() {

        if (data.projects.length == 0)
            return;

        const domprojectitems = document.querySelectorAll('.projects_item_wrapper');

        for (let i = 0; i < data.projects.length; i++) {
            data.projects[i].id = i;
            domprojectitems[i].setAttribute('data-id', data.projects[i].id);
            console.log('updated');
        }
    }


    //*****methods below for storage*****

    // this method sets/updates the projects array to local storage
    function updateStorage() {
        localStorage.setItem('projects', JSON.stringify(data.projects));
        console.log('projects stored in localStorage');
    }

    // this method retrieves the projects array from storage
    function getStorage() {
        data.projects = JSON.parse(localStorage.getItem('projects'));
    }

    function emptyStorage() {
        localStorage.clear();
        console.log('storage cleared');
    }



    return {
        addProject,
        addTask,
        updateProjectId,
        deleteTask,
        editTask,
        updateStorage,
        getStorage,
        emptyStorage,
    }
})();




export { methods }