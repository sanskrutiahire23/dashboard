import React, { useState, useEffect } from 'react';

const Mycourses = () => {
  const [courses, setCourses] = useState([]);

  
  useEffect(() => {
    getCourses();
  }, []);

  const getCourses = async () => {
    try {
      const response = await fetch('http://localhost:5000/getcourse', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch courses');
      }

      const data = await response.json();
      setCourses(data.courses);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  return (
    <div className="courses">
      {courses.length === 0 ? (
        <p>No Courses Enroll</p>
      ) : (
        courses.map((course) => (
          <div key={course._id} className="course-card">
            <img src={course.image} alt={course.title} />
            <h3>{course.title}</h3>
            <p>{course.instructor}</p>
            <span className="rating">⭐ {course.rating}</span>
             
          </div>
        ))
      )}
    </div>
  );
};

export default Mycourses;
