
import {useEffect,useState} from 'react';
import axios from 'axios';
const baseUrl='http://127.0.0.1:8000/api';
function TeacherLogin()
{
    const [teacherLoginData,setteacherLoginData]=useState({
        email:'',
        password:'',

    });

    const [errorMsg,seterrorMsg]=useState('');

    const handleChange=(event)=>{
        setteacherLoginData({
           ...teacherLoginData,
            [event.target.name]:event.target.value
        });
    }

    const submitForm=()=>{
        const teacherFormData=new FormData();
        teacherFormData.append('email',teacherLoginData.email);
        teacherFormData.append('password',teacherLoginData.password);
        try{
                axios.post(baseUrl+'/teacher-login',teacherFormData)
                .then((res)=>{
                if(res.data.bool==true){
                    localStorage.setItem('teacherLoginStatus',true);
                    localStorage.setItem('teacherId',res.data.teacher_id);
                    window.location.href='/teacher-dashboard';

        }
        else{
            seterrorMsg('Invalid email or Password')
        }
       });
    }catch(error){
        console.log(error);
    }
}
const teacherLoginStatus=localStorage.getItem('teacherLoginStatus');
if(teacherLoginStatus==='true'){
    window.location.href='/teacher-dashboard';
}
    useEffect(()=>{
        document.title='TeacherLogin'
    });

 return (
<div className='container mt-4'>
    <div className='row'>
        <div className='col-6 offset-3'>
        <div className='card'>
            <h3 className='card-header'>Teacher Login</h3>
            <div className='card-body'>
                {errorMsg && <p className='text-danger'>{errorMsg}</p>}
            {/* <form> */}
            <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label float-start">Email</label>
                <input value={teacherLoginData.email} name="email" type="email" className="form-control"  onChange={handleChange} id="email"  />
            
            </div>
            <div className="mb-3">
                <label for="exampleInputPassword1" className="form-label float-start">Password</label>
                <input value={teacherLoginData.password} name="password" type="password" onChange={handleChange} className="form-control"
                id="Password1" />
            </div>
            {/* <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input float-start" id="exampleCheck1" />
                <label className="form-control float-start" for="exampleCheck1">Remember Me</label>
            </div> */}
            <button type="submit" onClick={submitForm} className="btn btn-primary float-start">Login</button>
            {/* </form> */}
            </div>
        </div>
    </div>
</div> 
</div>

);
}


export default TeacherLogin;





