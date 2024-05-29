
// import { useParams } from "react-router-dom";

// function CourseDetail(){
//     let {id}=useParams();
//     return (
//     <h1>Course Detail {id}</h1>
// );
// }

// export default CourseDetail


import React from 'react';
import { useParams } from 'react-router-dom';

function CourseDetail() {
    let { course_id } = useParams();
    return <div>Course Detail for course ID: {course_id}</div>;
}

export default CourseDetail;
