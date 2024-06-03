 
 import {Link} from 'react-router-dom';
import AllCourses from './AllCourses';
import {useState,useEffect} from 'react';
import axios from 'axios';
const baseUrl='http://127.0.0.1:8000/api';

function Home() {
    const [courseData,setCourseData]=useState([]);
    useEffect(()=>
    {
        try{
        axios.get(baseUrl+'/course/?result=4')
        .then((response)=>
        {
            console.log(response.data);
            setCourseData(response.data);
        });
        }catch(error){
            console.log(error);
        }
        },[]);
        console.log(courseData)
    return (
        <div className='container mt-3'>
        {/* Latest Courses */}
        <div className="container mt-4">
            <h3 className="pb-1 mb-2">Latest Courses <Link to="/all-courses" class="float-end">See All</Link></h3>
            <div className="row mb-4">
                {courseData && courseData.map((course,index)=>

              
                <div className="col-md-3 mb-4">
                    <div className="card">
                        <Link to={`/detail/${course.id}`}><img src={course.featured_img} className="card-img-top" alt={course.title}/></Link>
                        <div className="card-body">
                            <h5 className="card-title"><Link to={`/detail/${course.id}`}>{course.title}</Link></h5>
                        </div>
                    </div>
                    </div>
                      )}
                </div>

        {/* end Latest Courses */}



  {/* Popular Courses */}
  <div className="container mt-4">
            <h3 className="pb-1 mb-2">Popular Courses <Link to="/popular-courses" class="float-end">See All</Link></h3>
            <div className="row mb-4">
                <div className="col-md-3">
                <div className="card">
                    <a href="#"><img src="django.png" className="card-img-top" alt="..."/></a>
                    <div className="card-body">
                    <h5 className="card-title"><a href="#">Course title</a></h5>
                    </div>
                    <div className='card-footer'>
                      <div className='title'>  
                      <span>Rating: 4.5/5 </span>
                      <span className='float-end'>Views: 10000 </span>
                      </div>
                    </div>
                </div>
                </div>
             <div className="col-md-3">
             <div className="card">
                 <a href="#"><img src="django.png" className="card-img-top" alt="..."/></a>
                 <div className="card-body">
                 <h5 className="card-title"><a href="#">Course title</a></h5>
                 </div>
                 <div className='card-footer'>
                      <div className='title'>  
                      <span>Rating: 4.5/5 </span>
                      <span className='float-end'>Views: 10000 </span>
                      </div>
                    </div>
             </div>
             </div>
          <div className="col-md-3">
          <div className="card">
              <a href="#"><img src="django.png" className="card-img-top" alt="..."/></a>
              <div className="card-body">
              <h5 className="card-title"><a href="#">Course title</a></h5>
              </div>
              <div className='card-footer'>
                      <div className='title'>  
                      <span>Rating: 4.5/5 </span>
                      <span className='float-end'>Views: 10000 </span>
                      </div>
                    </div>
          </div>
          </div>
    <div className="col-md-3">
    <div className="card">
        <a href="#"><img src="django.png" className="card-img-top" alt="..."/></a>
        <div className="card-body">
        <h5 className="card-title"><a href="#">Course title</a></h5>
        </div>
        <div className='card-footer'>
                      <div className='title'>  
                      <span>Rating: 4.5/5 </span>
                      <span className='float-end'>Views: 10000 </span>
                      </div>
                    </div>
    </div>
    </div>
    </div>
    </div>

{/* Start  Popular Teacher */}
  <div className="container mt-4">
            <h3 className="pb-1 mb-4 mt-5">Popular Teacher <Link to="/popular-teachers" class="float-end">See All</Link></h3>
            <div className="row mb-4">
                <div className="col-md-3">
                <div className="card">
                    <a href="#"><img src="teachers.png" className="card-img-top" alt="..."/></a>
                    <div className="card-body">
                    <h5 className="card-title"><Link to="/teacher-detail/1">Teacher Name</Link></h5>
                    </div>
                    <div className='card-footer'>
                      <div className='title'>  
                      <span>Rating: 4.5/5 </span>
                      </div>
                    </div>
                </div>
                </div>
             <div className="col-md-3">
             <div className="card">
                 <a href="#"><img src="teachers.png" className="card-img-top" alt="..."/></a>
                 <div className="card-body">
                 <h5 className="card-title"><Link to="/teacher-detail/1">Teacher Name</Link></h5>
                 </div>
                 <div className='card-footer'>
                      <div className='title'>  
                      <span>Rating: 4.5/5 </span>
                      </div>
                    </div>
             </div>
             </div>
          <div className="col-md-3">
          <div className="card">
              <a href="#"><img src="teachers.png" className="card-img-top" alt="..."/></a>
              <div className="card-body">
              <h5 className="card-title"><Link to="/teacher-detail/1">Teacher Name</Link></h5>
              </div>
              <div className='card-footer'>
                      <div className='title'>  
                      <span>Rating: 4.5/5 </span>
                      </div>
                    </div>
          </div>
          </div>
    <div className="col-md-3">
    <div className="card">
        <a href="#"><img src="teachers.png" className="card-img-top" alt="..."/></a>
        <div className="card-body">
        <h5 className="card-title"><Link to="/teacher-detail/1">Teacher Name</Link></h5>
        </div>
        <div className='card-footer'>
                      <div className='title'>  
                      <span>Rating: 4.5/5 </span>
                      </div>
                    </div>
    </div>
    </div>
    </div>
    </div>
{/* End  Popular Teacher */}


 {/* Student Testimonials */}
<h3 className="pb-1 mb-4 mt-5">Student Testimonials</h3>
<div id="carouselExampleIndicators" className="carousel slide bg-dark text-white py-5" data-bs-ride="carousel">
  <div className="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>

    <div className="carousel-inner">
        <div className="carousel-item active">
            <figure class="text-center">
                <blockquote class="blockquote">
                    <p>A well-known quote, contained in a blockquote element.</p>
                </blockquote>
                <figcaption class="blockquote-footer">
                    Someone famous in <cite title="Source Title">Source Title</cite>
                </figcaption>
                </figure>
            </div>
        <div class="carousel-item">
                <figure class="text-center">
                <blockquote class="blockquote">
                    <p>A well-known quote, contained in a blockquote element.</p>
                </blockquote>
                <figcaption class="blockquote-footer">
                    Someone famous in <cite title="Source Title">Source Title</cite>
                </figcaption>
                </figure>
        </div>
    </div>
    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
    </button>
    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
    </button>
    </div>          

{/* End Student Testimonials */}
</div>
</div>
       
    );
  }
  
  export default Home;
  