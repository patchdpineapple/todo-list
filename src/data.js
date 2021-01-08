//project class
class project {
    // tasks = new Array(0);
    

    constructor(name, id) {
        this.name = name;
        this.id = id;
        this.tasks = []; 
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }


}

class task {
    
    constructor(title, description, date, priority) {
        this.title = title;
        this.description = description;
        this.date = date;
        this.priority = priority;
    }

    get title() {
        return this._title;
    }

    set title(value) {
        this._title = value;
    }

    get description() {
        return this._description;
    }

    set description(value) {
        this._description = value;
    }

    get date() {
        return this._date;
    }

    set date(value) {
        this._date = value;
    }

    get priority() {
        return this._priority;
    }

    set priority(value) {
        this._priority = value;
    }

}

const data = (function (){

    
    

    //all projects array
    let projects = [
        // {
        //     name: 'sample1',
        //     id: '0',
        //     tasks: [
        //         {
        //             title: 'sampletitle',
        //             description: 'sampledesc',
        //             date: 'January 1, 2020',
        //             priority: '1'
        //         }, 
        //         {
        //             title: 'sampletitle2',
        //             description: 'sampledesc2',
        //             date: 'January 2, 2020',
        //             priority: '2'
        //         },
        //         {
        //             title: 'sampletitle3',
        //             description: 'sampledesc3',
        //             date: 'January 3, 2020',
        //             priority: '3'
        //         },
        //     ],
        // },
        // {
        //     name: 'sample2',
        //     id: '1',
        //     tasks: [
        //         {
        //             title: '2sampletitle',
        //             description: 'sampledesc',
        //             date: 'January 1, 2020',
        //             priority: '1'
        //         }, 
        //         {
        //             title: '2sampletitle2',
        //             description: 'sampledesc2',
        //             date: 'January 2, 2020',
        //             priority: '2'
        //         },
        //         {
        //             title: '2sampletitle3',
        //             description: 'sampledesc3',
        //             date: 'January 3, 2020',
        //             priority: '3'
        //         },
        //     ],
        // },
        // {
        //     name: 'sample3',
        //     id: '2',
        //     tasks: [
        //         {
        //             title: '3sampletitle',
        //             description: 'sampledesc',
        //             date: 'January 1, 2020',
        //             priority: '1'
        //         }, 
        //         {
        //             title: '3sampletitle2',
        //             description: 'sampledesc2',
        //             date: 'January 2, 2020',
        //             priority: '2'
        //         },
        //         {
        //             title: '3sampletitle3',
        //             description: 'sampledesc3',
        //             date: 'January 3, 2020',
        //             priority: '3'
        //         },
        //     ],
        // },
    
    ];

    return {
        projects,
    }

})();

export  {data, project, task}
// export {project}
// export {task}