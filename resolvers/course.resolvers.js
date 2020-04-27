const Course = require('../models/course');

module.exports = {

    Query: {
        async getCourses(obj, { page, limit }) {
            let courses = Course.find()
            if (page !== undefined) {
                courses = courses.limit(limit).skip((page - 1) * limit);

            }
            return await courses;

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
        async deleteCourse(obj, { id }) {
            //find element
            await Course.deleteOne({ _id: id });
            return {
                message: `The course with id ${id} it was removed`
            }

        }
    }

}