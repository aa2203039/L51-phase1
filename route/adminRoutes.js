router.post('/express-interest', async (req, res) => {
    const { instructorId, courseId } = req.body;
    const users = await readJSON('users.json');
    const instructor = users.find(u => u.id === instructorId && u.type === 'instructor');
    if (!instructor) {
      return res.status(404).json({ message: "instructor not found" });
    }
    if (!instructor.interested_courses.includes(courseId)) {
      instructor.interested_courses.push(courseId);
      await writeJSON('users.json', users);
    }
    res.json({ message: "done" });
  });
router.get('/weekly-schedule', async (req, res) => {
    const classes = await readJSON('classes.json');
    const courses = await readJSON('courses.json');
    const users = await readJSON('users.json');
    const validatedClasses = classes.filter(cls => cls.validated);
    const schedule = validatedClasses.map(cls => {
      const course = courses.find(c => c.id === cls.course_id);
      const instructor = users.find(u => u.id === cls.instructor_id);
      return {
        course_id: cls.course_id,
        course_name: course?.name || "undefined",
        instructor_name: instructor?.name || "undefined",
        day: cls.day || "undefined",
        time: cls.time || "undefined"
      };
    });
    res.json(schedule);
  });
  