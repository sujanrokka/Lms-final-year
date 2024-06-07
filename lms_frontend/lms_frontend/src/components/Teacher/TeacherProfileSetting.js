import {Link} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import Swal from 'sweetalert2';
import {useState,useEffect} from 'react';
import axios from 'axios';
const baseUrl='http://127.0.0.1:8000/api';

function TeacherProfileSetting()
{
    
    const [teacherData, setteacherData]=useState({
        'full_name':'',
        'email':'',
        'qualification':'',
        'mobile_no':'',
        'skills':'',
        'status':'',
        'profile_img':'',
        'p_img':'',
    });
    const teacherId=localStorage.getItem('teacherId');

    useEffect(()=>{
        try{
            axios.get(baseUrl+'/teacher/'+teacherId+'/')
             .then((response)=>{
                setteacherData({
                full_name:response.data.full_name,
                email:response.data.email,
                qualification:response.data.description,
                mobile_no:response.data.mobile_no,
                skills:response.data.skills,
                profile_img:response.data.profile_img,
                p_img:'',
               
            });
           
        });
    }catch(error){
        console.log(error);
    }
    },[]);
    const handleChange=(event)=>{
        setteacherData({
        ...teacherData,
        [event.target.name]:event.target.value
        });
    }
    const handleFileChange=(event)=>{
        setteacherData({
           ...teacherData,
            [event.target.name]:event.target.files[0]
        });
    }

    const submitForm=(e)=>{
        e.preventDefault()
        const teacherFormData=new FormData();
        teacherFormData.append('full_name',teacherData.full_name);
        teacherFormData.append('email',teacherData.email);
        teacherFormData.append('qualification',teacherData.qualification);
        teacherFormData.append('mobile_no',teacherData.mobile_no);
        teacherFormData.append('skills',teacherData.skills);

        if(teacherData.p_img!==''){
            teacherFormData.append('profile_img',teacherData.p_img,teacherData.p_img.name);
        }

        try{
        axios.put(baseUrl+'/teacher/'+teacherId+'/',teacherFormData,{
            headers:{
                'Content-Type':'multipart/form-data'
            }
        })
        .then((response)=>{
            Swal.fire({
                title: 'Data has been updated',
                icon: 'success',
                toast:true,
                timer:3000,
                position:'top-right',
                timerProgressBar:true,
                showConfirmButton:false
                });
        });
        }catch(error){
        console.log(error);
        setteacherData({'status':'error'})
        }
    };
    useEffect(()=>{
        document.title='Teacher Profile'
    });

    const teacherLoginStatus=localStorage.getItem('teacherLoginStatus')
    if(teacherLoginStatus!=='true'){
    window.location.href="/teacher-login";
}

    return (
<div className='container mt-4'>
    <div className='row'>
       <aside className="col-md-3">
            <TeacherSidebar />
       </aside>

       <section className='col-md-9'>
                <div className='card'>
                    <h5 className='card-header'>Profile Setting</h5>
                    <div className='card-body'>
            <div className="mb-3 row">
            <label for="staticEmail" className="col-sm-2 col-form-label">Full Name</label>
            <div className="col-sm-10">
            <input type="text" name='full_name'  value={teacherData.full_name} onChange={handleChange}  className="form-control" id="staticEmail" />
            </div>
        </div>
        <div className="mb-3 row">
            <label for="staticEmail" className="col-sm-2 col-form-label">Email</label>
            <div className="col-sm-10">
            <input type="email" name='email'  value={teacherData.email} onChange={handleChange}  className="form-control" id="staticEmail" />
            </div>
        </div>
        <div className="mb-3 row">
                    <label htmlFor="video" className="form-label float-start">Profile Image</label>
                    <input name='p_img'  onChange={handleFileChange} type="file" className="form-control" id="video" />
                    {teacherData.profile_img &&
                   <p className='mt-3'><img src={teacherData.profile_img} width="300" alt={teacherData.full_name} /></p>
                    }
                </div>
        
        <div className="mb-3 row">
            <label for="staticEmail" className="col-sm-2 col-form-label">Skills</label>
            <div className="col-sm-10">
            <input type="text" name='skills'  value={teacherData.skills} onChange={handleChange}  className="form-control" id="staticEmail" />
            </div>
        </div>
        <div className="mb-3 row">
            <label for="staticEmail" className="col-sm-2 col-form-label">Qualification</label>
            <div className="col-sm-10">
            <input type="text" name='qualification' value={teacherData.qualification} onChange={handleChange} className="form-control" id="staticEmail" />
            </div>
        </div>
        <hr />
           <button onChange={submitForm} className='btn btn-primary'>Update</button>
        
        </div>
        </div>
</section>    
</div> 
</div>

);
}

export default TeacherProfileSetting;