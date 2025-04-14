import React, { useState } from 'react';
import './Courses.css';  

const Courses = () => {
  const [courses] = useState([
    {
      id: 1,
      title: 'Figma for Beginners: Fundamentals of Figma',
      instructor: 'Richardino Gueva',
      rating: 4.5,
      image:
        'https://cdn.dribbble.com/users/241205/screenshots/6140359/frame_3.6.png',
    },
    {
      id: 2,
      title: '"Frontend Development for Complete Beginners Guide',
      instructor: 'Sanyno Kamon',
      rating: 4.7,
      image:
        'https://www.gamelab.id/uploads/modules/3%20(8).jpg?1638853694406',
    },
    {
        id: 3,
        title: '"Web Development for Complete Beginners Guide',
        instructor: 'Sanyno Kamon',
        rating: 4.7,
        image:
          'https://png.pngtree.com/png-vector/20190611/ourlarge/pngtree-web-development-illustration-modern-can-be-used-for-landing-pages-web-png-image_1496210.jpg',
      },
      {
        id: 4,
        title: 'UI Design for Beginners',
        instructor: 'Sanyno Kamon',
        rating: 4.7,
        image:
          'https://png.pngtree.com/png-clipart/20230409/original/pngtree-ui-ux-design-png-image_9039917.png',
      },
      {
        id: 5,
        title: 'UX Design for Beginners',
        instructor: 'Sanyno Kamon',
        rating: 4.7,
        image:
          'https://png.pngtree.com/png-clipart/20231020/original/pngtree-applications-and-ux-ui-illustration-in-minimal-style-png-image_13379577.png',
      },
      {
        id: 6,
        title: 'ML for Beginners',
        instructor: 'Sanyno Kamon',
        rating: 4.7,
        image:
          'https://lecontent.sololearn.com/material-images/4bfce0b0c00e42f491a42e1501428123-MachineLearning.png',
      },
     
  ]);

   
  const enrollCourse = async (courseId) => {
    const course = courses.find((course) => course.id === courseId);
    if (!course) {
      console.error('Course not found!');
      return;
    }

    const courseData = {
      image: course.image,
      title: course.title,
      instructor: course.instructor,
      rating: course.rating,
    };

    console.log('Sending course data:', courseData); 

    try {
      const response = await fetch('http://localhost:5000/addcourse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(courseData),
      });

      if (!response.ok) {
        throw new Error('Failed to add course');
      }

      const result = await response.json();
      console.log('Course added:', result);
      alert('Course added successfully!');
    } catch (error) {
      console.error('Error enrolling course:', error);
      alert('Failed to add course.');
    }
  };

  return (
    <div className="main-contents">
       

      <div className="courses">
        {courses.map((course) => (
          <div key={course.id} className="course-card" data-id={course.id}>
            <img src={course.image} alt={course.title} />
            <h3>{course.title}</h3>
            <p>{course.instructor}</p>
            <span className="rating">⭐ {course.rating}</span>
            <button
              className="enroll-btn"
              onClick={() => enrollCourse(course.id)} // Passing courseId to the enrollCourse function
            >
              Enroll Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
