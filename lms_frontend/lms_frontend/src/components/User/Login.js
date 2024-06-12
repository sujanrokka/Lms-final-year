import {Link} from 'react-router-dom';
import {useEffect,useState} from 'react';
import axios from 'axios';
const baseUrl='http://127.0.0.1:8000/api';
function Login()
{
    const [studentLoginData,setstudentLoginData]=useState({
        email:'',
        password:'',

    });
    const [errorMsg,seterrorMsg]=useState('');

    const handleChange=(event)=>{
        setstudentLoginData({
           ...studentLoginData,
            [event.target.name]:event.target.value
        });
    }
    const submitForm=()=>{
        const StudentFormData=new FormData();
        StudentFormData.append('email',studentLoginData.email);
        StudentFormData.append('password',studentLoginData.password);
        try{
                axios.post(baseUrl+'/student-login/',StudentFormData)
                .then((res)=>{
                if(res.data.bool===true){
                    localStorage.setItem('studentLoginStatus',true);
                    localStorage.setItem('studentId',res.data.student_id);
                    window.location.href='/user-dashboard';

        }
        else{
            seterrorMsg('Invalid email or Password')
        }
       });
    }catch(error){
        console.log(error);
    }
}
const studentLoginStatus=localStorage.getItem('studentLoginStatus');
if(studentLoginStatus==='true'){
    window.location.href='/user-dashboard';
}
    useEffect(()=>{
        document.title='StudentLogin'
    });



    return (
<div className='container mt-4'>
    <div className='row'>
        <div className='col-6 offset-3'>
        <div className='card'>
            <h3 className='card-header'>User Login</h3>
            <div className='card-body'>
            {errorMsg && <p className='text-danger'>{errorMsg}</p>}
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label float-start">Username</label>
                <input type="email" value={studentLoginData.username} name="email" onChange={handleChange}className="form-control"  />
            
            </div>
            <div className="mb-3">
                <label  htmlFor="exampleInputPassword1" className="form-label float-start">Password</label>
                <input type="password" value={studentLoginData.password} name="password" onChange={handleChange}className="form-control" id="exampleInputPassword1" />
            </div>
            {/* <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                <label className="form-control"onChange={handleChange} for="exampleCheck1">Remember Me</label>
            </div> */}
            <button type="submit" onClick={submitForm} className="btn btn-primary">Login</button>

            </div>
        </div>
    </div>
</div> 
</div>

);
}

export default Login;