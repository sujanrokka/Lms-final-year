import {Link} from 'react-router-dom';
import Sidebar from './Sidebar';
import Swal from 'sweetalert2';
import {useState,useEffect} from 'react';
import axios from 'axios';
const baseUrl='http://127.0.0.1:8000/api';

function ChangePassword()
{
    const [studentData,setstudentData]=useState({
        'password':'',
    });

    const studentId=localStorage.getItem('studentId');
    const handleChange=(event)=>{
        setstudentData({
        ...studentData,
        [event.target.name]:event.target.value
        });
    }
    
        const submitForm=(e)=>{
            e.preventDefault()
            const studentFormData=new FormData();
            studentFormData.append('password',studentData.password);

            try{
            axios.post(baseUrl+'/student/change-password/'+studentId+'/',studentFormData)
            .then((response)=>{
                if(response.status==200){
                window.location.href="/user-logout";
                Swal.fire({
                    title: 'Data has been updated',
                    icon: 'success',
                    toast:true,
                    timer:3000,
                    position:'top-right',
                    timerProgressBar:true,
                    showConfirmButton:false
                    });
                }
            });
        }
           catch(error){
            console.log(error);
            setstudentData({'status':'error'})
            }
        };
    
        useEffect(()=>{
            document.title='Teacher Change Password'
        });
    
        const studentLoginStatus=localStorage.getItem('studentLoginStatus')
        if(studentLoginStatus!=='true'){
        window.location.href="/teacher-login";
    }
    return (
<div className='container mt-4'>
    <div className='row'>
       <aside className="col-md-3">
            <Sidebar />
       </aside>

       <section className='col-md-9'>
                <div className='card'>
                    <h5 className='card-header'>ChangePassword</h5>
                    <div className='card-body'>
        <div class="mb-3 row">
            <label for="inputPassword" className="col-sm-2 col-form-label">New Password</label>
            <div className="col-sm-10">
            <input type="text" name='password'  onChange={handleChange} className="form-control" id="inputPassword"/>
            </div>
        </div>
        <hr />
           <button type="submit" onClick={submitForm} className='btn btn-primary'>ChangePassword</button>
        
        </div>
        </div>
</section>    
</div> 
</div>

);
}



export default ChangePassword;