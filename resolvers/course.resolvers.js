const Course = require('../models/course');
const User = require('../models/user');

module.exports = {

    Query: {
        async getCourses(obj, { page, limit }, context) {
            console.log(context);
            //let courses = Course.find().populate('user');
            let courses = Course.find();
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
        async addCourse(obj, { input, user }, context) {
            //only just user init session
            //if context false
            if (!context || context.currentUser) return null;
            //maybe implement permissions, validate if user have level permissions in DB



            const userObj = await User.findById(user);
            //instance new obj of the model
            //which user does the course belong
            const course = new Course({...input, user });
            await course.save();
            await userObj.courses.push(course);
            await userObj.save();
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
    },
    Course: {
        async user(c) {
            return await User.findById(c.user);
        }
    }

}