export const selectCourses = (state) => state.courses.courses;
export const selectCourseById = (state) => state?.courses?.course;
export const selectAuthors = (state) => state?.authors?.authors;
export const selectCourseAuthors = (state) => state?.authors?.courseAuthors;

export const selectCourseAuthorsIds = (courseId) => (state) =>
	state.courses.courses.find((course) => course.id === courseId)?.authors;

export const selectUserRole = (state) => state.user.role;
export const selectUserName = (state) => state.user.name;
export const selectAppError = (state) => state.app.appError;
