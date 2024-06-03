import {Link} from 'react-router-dom';
import {useState,useEffect} from 'react';
import axios from 'axios';
const baseUrl='http://127.0.0.1:8000/api';
function AllCourses(){
    const [courseData,setCourseData]=useState([]);
    useEffect(()=>
    {
        try{
        axios.get(baseUrl+'/course/').then((response)=>
        {
            console.log(response.data);
            setCourseData(response.data);
        });
        }catch(error){
            console.log(error);
        }
        },[]);
        console.log(courseData)
    return(
        
      
        <div className="container mt-3">
              {/* Latest Courses */}
            <h3 className="pb-1 mb-2">Latest Courses </h3>
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
    
    {/* pagination starts */}
    <nav aria-label="Page navigation example mt-5">
    <ul className="pagination justify-content-center">
    <li className="page-item"><a class="page-link" href="#">Previous</a></li>
    <li className="page-item"><a class="page-link" href="#">1</a></li>
    <li className="page-item"><a class="page-link" href="#">2</a></li>
    <li className="page-item"><a class="page-link" href="#">3</a></li>
    <li className="page-item"><a class="page-link" href="#">Next</a></li>
    </ul>
    </nav>
    {/* end pagination */}
    </div>


    );
}

export default AllCourses;