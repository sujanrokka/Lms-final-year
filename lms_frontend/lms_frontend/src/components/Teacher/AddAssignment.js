
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/api';

function AddAssignment() {
    const [assignmentData, setassignmentData] = useState({
        title: '',
        detail: '',

    });

    
    const handleChange = (event) => {
        setassignmentData({
            ...assignmentData,
            [event.target.name]: event.target.value
        });
    };


    const { student_id } = useParams();
    const { teacher_id } = useParams();

    const formSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('teacher', teacher_id);
        formData.append('student', student_id);
        formData.append('detail',assignmentData.detail);
        formData.append('title', assignmentData.title);

        try {
            axios.post(baseUrl+'/student-assignment/'+teacher_id+"/"+student_id, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
.then((response)=>{
    if(response.status===200||response.status===201){
        Swal.fire({
            title: 'Assignment has been added',
            toast: 'success',
            timer: 3000,
            position: 'top-right',
            timerProgressBar: true,
            showConfirmButton: false
        });
   
    //save notifications
    const notifData=new FormData();
    notifData.append('teacher',teacher_id);
    notifData.append('notif_subject','assignment');
    notifData.append('notif_for','student');
    notifData.append('student','student_id');

    axios.post(baseUrl+'/save-notification/',notifData,{
        headers:{
            'Content-Type':'multipart/form-data'
        }
    })
        .then((res)=>{
            console.log('Notification Added');
        })
        //end notification
        window.location.reload();
    }
    });
}catch(error){
    console.log(error);

}
};


    return (
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <TeacherSidebar />
                </aside>
                <div className="col-9">
                    <div className="card">
                        <h3 className="card-header">Add Assignment</h3>
                        <div className="card-body">
                            <form >
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label float-start">Title</label>
                                    <input type="text" name="title" onChange={handleChange} id="title" className="form-control" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="detail" className="form-label float-start">Detail</label>
                                    <textarea name="detail" onChange={handleChange} className="form-control" id="detail" />
                                </div>
                                <button onClick={formSubmit} type="button" className="btn btn-primary float-start">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default AddAssignment;