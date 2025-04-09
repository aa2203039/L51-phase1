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
  