const Course = require('../models/course');

module.exports = {

    Query: {
        async getCourses(obj, { page, limit }) {
            const courses = await Course.find();
            return courses;

        },
        async getCourse(obj, { id }) {
            const course = await Course.findById(id);
            return course;
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