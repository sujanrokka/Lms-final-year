import {Link} from 'react-router-dom';
import {useParams} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import {useState,useEffect} from 'react';
import axios from 'axios';
const baseUrl='http://127.0.0.1:8000/api';



function CourseChapters(){
    const [chapterData,setChapterData]=useState([]);
    const [totalResult,settotalResult]=useState([0]);
    const {course_id}=useParams();
   
    console.log(course_id);
    useEffect(()=>
    {
        try{
        axios.get(baseUrl+'/course-chapters/'+course_id).then((response)=>
        {
            console.log(response.data);
            settotalResult(response.data.length);
            setChapterData(response.data);
        });
        }catch(error){
            console.log(error);
        }
        },[course_id]);
        console.log(chapterData)


        //delete data
        const Swal = require('sweetalert2')
        const handleDeleteClick=()=>{
            Swal.fire({
                title: 'Confirm',
                text: 'Are you sure you want to delete?',
                icon: 'info',
                confirmButtonText: 'Continue',
                showCancelButton:true
              });

        }
    return(
        <div className='container mt-4'>
        <div className='row'>
            <aside className='col-md-3'>
                <TeacherSidebar />
            </aside>
    <section className="col-md-9">
        <div className='card'>
        <h5 className='card-header'>All Chapters ({totalResult})</h5>
        <div className='card-body'>
        <table className='table table-bordered'>
                    <thead>
                        <tr>
                        <th>Title</th>
                        <th>Video</th>
                        <th>Remarks</th>
                        <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {chapterData.map((chapter,index)=>
                        
                        <tr>
                            <td><Link to={'/edit-chapter/+chapter.id'}> {chapter.title} </Link> </td>
                            <td><video controls width="250">
                                <source src={chapter.video.url} type="video/webm" />
                                <source src={chapter.video.url} type="video/mp4" />
                                </video>
                                </td>
                            <td>{chapter.remarks} </td>
                            <td>
                            <Link to={'/edit-chapter/'+chapter.id}  className='btn btn-sm text-white btn-info '><i class="bi bi-pencil-square"></i></Link>
                            <button onClick={handleDeleteClick} to={'/delete-chapter/'+chapter.id} className='btn btn-sm btn-danger '><i class="bi bi-trash"></i></button>
            
                            </td>
                        </tr>
                        )}
                    </tbody>
                </table>
       
        
    </div>
    </div>
</section>
</div>
</div>
);
}


export default CourseChapters;