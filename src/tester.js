import { format } from 'date-fns';


const testmodule = (function(){

    
    function testdate() {
        const date = format(new Date("2021-01-04"), 'MMMM dd, yyyy');

        console.log('display date');
        console.log(date);
    }
    

    
    
   

    return {
        testdate,
    }
})();




export {testmodule}