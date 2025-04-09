router.post('/assign-instructor', async (req, res) => {
    const { courseId, instructorId } = req.body;
    const users = await readJSON('users.json');
    const instructor = users.find(u => u.id === instructorId && u.type === 'instructor');
    if (!instructor || !instructor.interested_courses.includes(courseId)) {
      return res.status(400).json({ message: "instructor has no interest in course" });
    }
    const classes = await readJSON('classes.json');
    const newClass = {
      course_id: courseId,
      instructor_id: instructorId,
      enrolled_students: [],
      pending_students: [],
      capacity: 30,
      validated: false
    };
    classes.push(newClass);
    await writeJSON('classes.json', classes);
    res.json({ message: "instructor an class created" });
  });
  