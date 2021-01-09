import { data } from './data.js';
import { methods } from './methods.js';
import { format } from 'date-fns';

const display = (function () {

    // this method displays all projects from the projects list array 
    function displayProjects() {
        document.querySelector('.all_project_items_wrapper').remove();  //delete all projects from dom
        const allprojectswrapper = document.createElement('div');         //make new wrapper for all projects
        allprojectswrapper.classList.add('all_project_items_wrapper');


        //display all projects in the array
        for (let i = 0; i < data.projects.length; i++) {
            const projectitemwrapper = document.createElement('div');   //make wrapper
            projectitemwrapper.classList.add('projects_item_wrapper'); //add class for css
            projectitemwrapper.classList.add('parent_wrapper');
            projectitemwrapper.setAttribute('data-id', data.projects[i].id); //set id to connect to projects array index


            const projects_item_label = document.createElement('p');
            projects_item_label.classList.add('projects_item_label');
            projects_item_label.textContent = data.projects[i]._name;
            projects_item_label.addEventListener('click', (e) => {
                removeTasks();
                displayTodoProjectName(e.target.closest('.parent_wrapper').getAttribute('data-id'));
                displayAllTask(e.target.closest('.parent_wrapper').getAttribute('data-id'));
            }); //add event to view tasks of this project

            const projects_item_delete_button = document.createElement('div');
            projects_item_delete_button.classList.add('projects_item_delete_button');
            projects_item_delete_button.classList.add('btn');
            projects_item_delete_button.textContent = '-';
            projects_item_delete_button.setAttribute('data-id', data.projects[i].id);
            projects_item_delete_button.addEventListener('click', (e) => {

                const projectid = e.target.closest('.parent_wrapper').getAttribute('data-id');
                const containerid = document.getElementById('todo_container').getAttribute('data-id');


                deleteProject(projectid);
                displayProjects();
                // e.target.closest('.parent_wrapper').remove();
                if (containerid == 'all') {
                    removeTasks();
                    displayDefault();
                }
                else if (projectid === containerid) {
                    removeTasks();
                    displayDefault();
                } else if (Number(projectid) < Number(containerid)) {
                    let tempid = Number(containerid) - 1;
                    const newcontainerid = tempid.toString();
                    removeTasks();
                    displayTodoProjectName(newcontainerid);
                    displayAllTask(newcontainerid);
                }

                methods.updateStorage();
            });

            //combine all to wrapper
            projectitemwrapper.append(projects_item_label);
            projectitemwrapper.append(projects_item_delete_button);

            //put wrapper or project item into DOM
            allprojectswrapper.append(projectitemwrapper);

        }
        document.getElementById('projects_container').append(allprojectswrapper); //put all projects wrapper into DOM
    }


    //this method displays the selected project name and the add new task button
    function displayTodoProjectName(projectid) {

        const todo_container = document.getElementById('todo_container'); //main container for todo items and project title
        todo_container.setAttribute('data-id', projectid);

        // if (e.target.getAttribute('class') == "projects_item_label") {
        //     todo_container.setAttribute('data-id', e.target.closest('.projects_item_wrapper').getAttribute('data-id'));
        // } else {
        //     todo_container.setAttribute('data-id', projectid);
        // }


        const add_todo_wrapper = document.createElement('div');
        add_todo_wrapper.classList.add('add_todo_wrapper');
        add_todo_wrapper.classList.add('parent_wrapper');
        add_todo_wrapper.setAttribute('data-id', todo_container.getAttribute('data-id')); //set id to get tasks

        const add_todo_label = document.createElement('p');             //project title
        add_todo_label.classList.add('add_todo_label');
        const boldlabel = document.createElement('strong');
        // boldlabel.textContent = data.projects[todo_container.getAttribute('data-id')].name;
        boldlabel.textContent = data.projects[projectid]._name;

        add_todo_label.append(boldlabel);
        add_todo_wrapper.append(add_todo_label);

        const add_todo_buttons_wrapper = document.createElement('div');         // buttons wrapper + add task and delete project buttons
        add_todo_buttons_wrapper.classList.add('add_todo_buttons_wrapper');
        const add_todo_button = document.createElement('div');
        add_todo_button.classList.add('add_todo_button');
        add_todo_button.classList.add('btn');
        add_todo_button.textContent = '+new task';
        add_todo_button.addEventListener('click', () => {
            document.querySelector('.add_todo_form').reset();
            document.querySelector('.dim_screen_container').classList.remove('hide');
            document.querySelector('.add_todo_form_container').classList.remove('hide');
        });
        const add_todo_delete_button = document.createElement('div');
        add_todo_delete_button.classList.add('add_todo_delete_button');
        add_todo_delete_button.classList.add('btn');
        add_todo_delete_button.textContent = '-';
        add_todo_delete_button.addEventListener('click', (e) => {

            const projectid = e.target.closest('.parent_wrapper').getAttribute('data-id');

            removeTasks();
            document.querySelector(`.projects_item_wrapper[data-id="${projectid}"]`).remove();
            deleteProject(projectid);
            displayDefault();
            methods.updateStorage();
        });

        add_todo_buttons_wrapper.append(add_todo_button);
        add_todo_buttons_wrapper.append(add_todo_delete_button);
        add_todo_wrapper.append(add_todo_buttons_wrapper);

        todo_container.append(add_todo_wrapper);

    }

    // this function displays all tasks from all projects
    function displayDefault() {
        document.getElementById('todo_container').setAttribute('data-id', 'all');
        if (document.getElementById('todo_container').children.length === 0) {
            console.log('displaying all tasks');
        }
        const todo_container = document.getElementById('todo_container')

        const add_todo_wrapper = document.createElement('div');
        add_todo_wrapper.classList.add('add_todo_wrapper');
        // add_todo_wrapper.setAttribute('data-id', todo_container.getAttribute('data-id')); //set id to get tasks

        const add_todo_label = document.createElement('p');             //project title
        add_todo_label.classList.add('add_todo_label');
        const boldlabel = document.createElement('strong');
        boldlabel.textContent = 'All Tasks';
        add_todo_label.append(boldlabel);
        add_todo_wrapper.append(add_todo_label);
        todo_container.append(add_todo_wrapper);

        for (let x = 0; x < data.projects.length; x++) {
            displayAllTask(x);
        }

    }

    //this method displays all task from a given id
    function displayAllTask(projectid) {
        for (let i = 0; i < data.projects[projectid].tasks.length; i++) {
            const todo_container = document.getElementById('todo_container');

            const todo_item_wrapper = document.createElement('div');
            const todo_item_wrapper2 = document.createElement('div');
            const todo_item_wrapper3 = document.createElement('div');
            const todo_item_complete_button = document.createElement('div');
            const image = document.createElement('img');
            const todo_item_label = document.createElement('p');
            const todo_item_date = document.createElement('p');
            const todo_item_edit_button = document.createElement('div');
            const image2 = document.createElement('img');

            todo_item_wrapper.classList.add('todo_item_wrapper');
            todo_item_wrapper.classList.add('parent_wrapper');
            todo_item_wrapper2.classList.add('todo_item_wrapper2');
            todo_item_wrapper3.classList.add('todo_item_wrapper3');
            todo_item_complete_button.classList.add('todo_item_complete_button');
            // todo_item_complete_button.classList.add('btn');
            todo_item_label.classList.add('todo_item_label');
            todo_item_date.classList.add('todo_item_date');
            todo_item_edit_button.classList.add('todo_item_edit_button');
            // todo_item_edit_button.classList.add('btn');

            image.setAttribute('src', 'https://s.svgbox.net/hero-outline.svg?ic=badge-check&fill=000');
            image.setAttribute('width', '20');
            image.setAttribute('height', '20');

            image2.setAttribute('src', 'https://s.svgbox.net/hero-outline.svg?ic=dots-horizontal&fill=000');
            image2.setAttribute('width', '32');
            image2.setAttribute('height', '32');

            todo_item_label.textContent = data.projects[projectid].tasks[i]._title;
            todo_item_date.textContent = format(new Date(data.projects[projectid].tasks[i]._date), 'MMMM dd, yyyy');


            switch (data.projects[projectid].tasks[i]._priority) {
                case '1':
                    todo_item_wrapper.setAttribute('style', 'background-color: hsla(0, 100%, 50%, 0.7);');
                    break;
                case '2':
                    todo_item_wrapper.setAttribute('style', 'background-color: orange');
                    break;
                case '3':
                    todo_item_wrapper.setAttribute('style', 'background-color: yellow');
                    break;
                case '4':
                    todo_item_wrapper.setAttribute('style', 'background-color: white');
                    break;

            }

            todo_item_wrapper.setAttribute('data-id', projectid)
            todo_item_wrapper.setAttribute('data-taskid', i);
            // todo_item_wrapper.setAttribute('data-wrapperid', i);
            todo_item_complete_button.setAttribute('data-taskid', i);
            image.setAttribute('data-taskid', i);
            image2.setAttribute('data-taskid', i);


            // event listeners added below

            todo_item_complete_button.addEventListener('click', (e) => {
                const projectid = e.target.closest('.parent_wrapper').getAttribute('data-id');
                const taskid = e.target.closest('.todo_item_wrapper').getAttribute('data-taskid');

                console.log(projectid + " " + taskid);
                methods.deleteTask(projectid, taskid);
                e.target.closest('.todo_item_wrapper').remove();
                // document.querySelector(`.todo_item_wrapper[data-id="${taskid}"]`).remove();


                if (document.getElementById('todo_container').getAttribute('data-id') == 'all') {
                    removeTasks();
                    displayDefault();
                } else {
                    console.log('not all');
                    removeTasks();
                    displayTodoProjectName(projectid);
                    displayAllTask(projectid);
                }

                methods.updateStorage();
            });

            todo_item_label.addEventListener('click', (e) => {
                const projectid = e.target.closest('.parent_wrapper').getAttribute('data-id');
                const taskid = e.target.closest('.parent_wrapper').getAttribute('data-taskid');

                document.querySelector('.dim_screen_container').classList.remove('hide');
                document.querySelector('.see_task_wrapper').classList.remove('hide');
                document.querySelector('.see_project').textContent = `Project: ${data.projects[projectid]._name}`;
                document.querySelector('.see_name').textContent = data.projects[projectid].tasks[taskid]._title;
                document.querySelector('.see_description').textContent = data.projects[projectid].tasks[taskid]._description;
                document.querySelector('.see_date').textContent = format(new Date(data.projects[projectid].tasks[taskid]._date), 'MMMM dd, yyyy');

                document.querySelector('.see_priority').textContent = data.projects[projectid].tasks[taskid]._priority;

                document.querySelector('.see_task_wrapper').setAttribute('data-id', projectid);
                document.querySelector('.see_task_wrapper').setAttribute('data-taskid', taskid);

            });

            todo_item_edit_button.addEventListener('click', (e) => {
                const projectid = e.target.closest('.parent_wrapper').getAttribute('data-id');
                const taskid = e.target.closest('.todo_item_wrapper').getAttribute('data-taskid');

                document.querySelector('.edit_task').reset();
                document.querySelector('.edit_name').value = data.projects[projectid].tasks[taskid]._title;
                document.querySelector('.edit_description').value = data.projects[projectid].tasks[taskid]._description;
                document.querySelector('.edit_date').value = data.projects[projectid].tasks[taskid]._date;

                const task_priority = data.projects[projectid].tasks[taskid]._priority;
                console.log(task_priority);

                document.querySelector('.dim_screen_container').classList.remove('hide');
                document.querySelector('.edit_task_wrapper').classList.remove('hide');
                document.querySelector('.edit_task_wrapper').setAttribute('data-id', projectid);
                document.querySelector('.edit_task_wrapper').setAttribute('data-taskid', taskid);

            });



            //appendd all of the task elements to dom inside todo_container
            todo_container.append(todo_item_wrapper);
            todo_item_wrapper.append(todo_item_wrapper2);
            todo_item_wrapper.append(todo_item_edit_button);
            todo_item_wrapper2.append(todo_item_wrapper3);
            todo_item_wrapper2.append(todo_item_date);
            todo_item_wrapper3.append(todo_item_complete_button);
            todo_item_wrapper3.append(todo_item_label);
            todo_item_complete_button.append(image);
            todo_item_edit_button.append(image2);
        }

    }

    // this method removes all tasks and current project from the DOM
    function removeTasks() {

        document.getElementById('todo_container').setAttribute('data-id', 'none');  //remove container id

        if (document.querySelector('.add_todo_wrapper')) {
            document.querySelector('.add_todo_wrapper').remove();                  //remove project title

        }
        const els = document.querySelectorAll('.todo_item_wrapper');          //remove all todo/tasks
        els.forEach((el) => { el.remove() });

    }

    //this method deletes a project from the project list . this is attached to the delete project button
    function deleteProject(projectid) {

        data.projects.splice(projectid, 1);
        methods.updateProjectId();
    }



    return {
        displayProjects,
        deleteProject,
        removeTasks,
        displayAllTask,
        displayTodoProjectName,
        displayDefault,
    }

})();

export { display }