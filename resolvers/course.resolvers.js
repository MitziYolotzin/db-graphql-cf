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

        async updateCourse(obj, { id, input }) {
            const course = await Course.findByIdAndUpdate(id, input);
            return course;
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