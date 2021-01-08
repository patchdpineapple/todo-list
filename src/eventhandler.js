import { methods } from './methods.js';
import { display } from './display.js';
import { data } from './data.js';

const eventhandler = (function () {


    function initializeEvents() {

        //event to close forms when clicked outside
        const dim_screen_container = document.querySelector('.dim_screen_container');
        dim_screen_container.addEventListener('click', (e) => {
            console.log('clicked document');
            dim_screen_container.classList.add('hide');
            const forms = document.querySelectorAll('.form');
            forms.forEach((form) => {
                form.classList.add('hide');
                form.addEventListener('click', (e) => { e.stopPropagation() });
            });

        })

        //add_project_form_button
        const add_project_form_button = document.querySelector('.add_project_form_button');
        add_project_form_button.addEventListener('click', () => {
            methods.addProject();
            display.displayProjects();
            document.querySelector('.dim_screen_container').classList.add('hide');
            document.querySelector('.add_project_form_container').classList.add('hide');
            methods.updateStorage();

        });

        //add_todo_form_button
        const add_todo_form_button = document.querySelector('.add_todo_form_button');
        add_todo_form_button.addEventListener('click', (e) => {

            const projectid = document.getElementById('todo_container').getAttribute('data-id');
            methods.addTask(projectid);

            display.removeTasks();
            display.displayTodoProjectName(projectid);
            display.displayAllTask(projectid);
            document.querySelector('.dim_screen_container').classList.add('hide');
            document.querySelector('.add_todo_form_container').classList.add('hide');
            methods.updateStorage();
        });

        //add_projects_button
        const add_projects_button = document.querySelector('.add_projects_button');
        add_projects_button.addEventListener('click', (e) => {
            document.querySelector('.add_project_form').reset();
            document.querySelector('.dim_screen_container').classList.remove('hide');
            document.querySelector('.add_project_form_container').classList.remove('hide');
            e.stopPropagation();

        });



        //edit_task_button
        const edit_task_button = document.querySelector('.edit_task_button');
        edit_task_button.addEventListener('click', (e) => {
            const projectid = e.target.closest('.parent_wrapper').getAttribute('data-id');
            methods.editTask(e);

            if (document.getElementById('todo_container').getAttribute('data-id') == 'all') {
                display.removeTasks();
                display.displayDefault();
            } else {
                display.removeTasks();
                display.displayTodoProjectName(projectid);
                display.displayAllTask(projectid);
            }
            document.querySelector('.edit_task_wrapper').classList.add('hide');
            document.querySelector('.dim_screen_container').classList.add('hide');
            methods.updateStorage();
        });

        //see_task_edit_button
        const see_task_edit_button = document.querySelector('.see_task_edit_button');
        see_task_edit_button.addEventListener('click', (e) => {
            const projectid = document.querySelector('.see_task_wrapper').getAttribute('data-id');
            const taskid = document.querySelector('.see_task_wrapper').getAttribute('data-taskid');

            document.querySelector('.edit_task').reset();
            document.querySelector('.see_task_wrapper').classList.add('hide');
            document.querySelector('.edit_task_wrapper').classList.remove('hide');
            document.querySelector('.edit_task_wrapper').setAttribute('data-id', projectid);
            document.querySelector('.edit_task_wrapper').setAttribute('data-taskid', taskid);
            e.stopPropagation();
        });

        //close buttons
        const close_buttons = document.querySelectorAll('.close_buttons');
        close_buttons.forEach((button) => {
            button.addEventListener('click', (e) => {
                e.target.closest('.parent_wrapper').classList.add('hide');
                e.target.closest('.dim_screen_container').classList.add('hide');
            });
        });

    }

    function viewProject() {
        console.log('you viewed this project');
    }

    return {
        initializeEvents,
        viewProject,
    }

})();

export { eventhandler }