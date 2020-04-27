const Course = require('../models/course');

module.exports = {

    Query: {
        getCourses(obj, { page, limit }) {
            if (page !== undefined) {
                return courses.slice(page * limit, (page + 1) * limit);
                //init in 0
                //return courses.slice((page-1) * limit, (page) * limit);
            }
            return courses;
        },
        getCourse(obj, { id }) {
            console.log(id);
            //when function return true, return value, when match find id
            return courses.find((course) => id == course.id);
        }

    },
    Mutation: {
        async addCourse(obj, { input }) {
            //instance new obj of the model
            //const course = new  Course({ title: title, views: views });
            const course = new Course(input);
            await course.save();
            return course;
        },

        updateCourse(obj, { id, input }) {
            //send function, execute for each element in array, send element as argument 
            //return true, position, when they are the same id, receive the item´s position to update 
            const courseIndex = courses.findIndex((course) => id === course.id);
            const course = courses[courseIndex];
            //save in a new variable, and construct new obj with value of element, and additional values they modify
            const newCourse = Object.assign(course, input);
            course[courseIndex] = newCourse;

            return newCourse;
        },
        deleteCourse(obj, { id }) {
            //find element
            //function, if it returns false, the new array, no contains the element
            courses = courses.filter((course) => course.id != id);
            return {
                message: `The course with id ${id} it was removed`
            }

        }
    }

}