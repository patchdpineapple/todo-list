const testmodule = (function(){

    function testlang(){
        console.log('test');
    }
    
    //project class
    class project {
        // tasks = new Array(0);
    
        constructor(name, id) {
            this.name = name;
            this.id = id;
        }
    
        get name() {
            return this._name;
        }
    
        set name(value) {
            this._name = value;
        }
    }
    
    //all projects array
    let projects = [];
    
    //method add project
    function addProject() {
        const inputname = document.querySelector('.project_name_input').value; //get data
        projects.push(new project(inputname, projects.length)) //add new project with name to list
        displayProjects();
    }
    
    
    function displayProjects() {
        document.querySelector('.all_project_items_wrapper').remove();  //delete all projects from dom
        const allprojectswrapper = document.createElement('div');         //make new wrapper for all projects
        allprojectswrapper.classList.add('all_project_items_wrapper');
    
    
        //display all projects in the array
        for (let i = 0; i < projects.length; i++) {
            const projectitemwrapper = document.createElement('div');   //make wrapper
            projectitemwrapper.classList.add('projects_item_wrapper'); //add class for css
            projectitemwrapper.setAttribute('data-id', projects[i].id); //set id to connect to projects array index
    
            const projectname = document.createElement('p');
            projectname.classList.add('projects_item_label');
            projectname.textContent = projects[i].name;
    
            const deleteprojectbutton = document.createElement('div');
            deleteprojectbutton.classList.add('projects_item_delete_button');
            deleteprojectbutton.classList.add('btn');
            deleteprojectbutton.textContent = '-';
            deleteprojectbutton.addEventListener('click', (e) => { deleteProject(e) });
    
            //combine all to wrapper
            projectitemwrapper.append(projectname);
            projectitemwrapper.append(deleteprojectbutton);
    
            //put wrapper or project item into DOM
            allprojectswrapper.append(projectitemwrapper);
    
        }
    
        document.getElementById('projects_container').append(allprojectswrapper); //put all projects wrapper into DOM
    
    }
    //update id property of project to properly connect to dom
    function updateProjectId() {
    
        if(projects.length == 0)
            return;
    
        const domprojectitems = document.querySelectorAll('.projects_item_wrapper');
    
        for (let i = 0; i < projects.length; i++) {
            projects[i].id = i;
            domprojectitems[i].setAttribute('data-id', projects[i].id);
    
        }
    }
    
    
    //method delete project
    function deleteProject(e) {
        const getwrapper = e.target.parentNode;
        projects.splice(getwrapper.getAttribute('data-id'), 1);
        getwrapper.remove();
        updateProjectId();
    }

    return {
        projects,
        addProject,
        deleteProject,
        testlang
    }
})();




export {testmodule}