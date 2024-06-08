import {Link} from 'react-router-dom';
import {useParams} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import {useState,useEffect} from 'react';
import axios from 'axios';
const baseUrl='http://127.0.0.1:8000/api';

function ShowAssignment(){
    const [assignmentData,setassignmentData]=useState([]);
    const [totalResult,settotalResult]=useState([0]);
    const {teacher_id}=useParams();
    const {student_id}=useParams();
   
    useEffect(()=>
    {
        try{
        axios.get(baseUrl+'/student-assignment/'+teacher_id+"/"+student_id)
        .then((response)=>
        {
            console.log(response.data);
            settotalResult(response.data.length);
            setassignmentData(response.data);
        });
        }catch(error){
            console.log(error);
        }
        },[]);
        


    return(
        <div className='container mt-4'>
        <div className='row'>
            <aside className='col-md-3'>
                <TeacherSidebar />
            </aside>
    <section className="col-md-9">
        <div className='card'>
       <h5> <Link className='card-header'>All Assignments ({totalResult})</Link> <Link className='btn btn-success btn-sm float-end' to ={`/add-assignment/${student_id}/${teacher_id}`}>Add Chapter </Link> </h5>
        <div className='card-body'>
        <table className='table table-bordered'>
                    <thead>
                        <tr>
                        <th>Title</th>
        
                        </tr>
                    </thead>
                    <tbody>
                        {assignmentData.map((chapter,index)=>
                        <tr>
                            <td>{chapter.title}</td>
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


export default ShowAssignment;