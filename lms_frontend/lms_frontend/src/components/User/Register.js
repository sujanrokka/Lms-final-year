import {Link} from 'react-router-dom';
import {useEffect,useState} from 'react';
import axios from 'axios';
const baseUrl='http://127.0.0.1:8000/api/student/';

function Register()
{
    const [studentData, setstudentData]=useState({
        full_name:'',
        email:'',
        password:'',
        username:'',
        interested_categories:'',
        status:''
    });

    const handleChange=(event)=>{
        setstudentData({
            ...studentData,
        [event.target.name]:event.target.value
        });
        console.log(studentData);
    }
        //form submit
        const submitForm=(e)=>{
            e.preventDefault()
            const studentFormData=new FormData();
            studentFormData.append('full_name',studentData.full_name);
            studentFormData.append('email',studentData.email);
            studentFormData.append('password',studentData.password);
            studentFormData.append('username',studentData.username);
            studentFormData.append('interested_categories',studentData.interested_categories);
    
            try{
            axios.post(baseUrl,studentFormData)
            .then((response)=>{
                setstudentData({
                'full_name':'',
                'email':'',
                'password':'',
                'username':'',
                'interested_categories':'',
                'status':'success'
            });
            });
            }catch(error){
            console.log(error);
            setstudentData({'status':'error'})
            }
        };
        //end
      useEffect(()=>{
            document.title='StudentRegister'
        });
    
    return (
        <div className='container mt-4'>
        <div className='row'>
            <div className='col-6 offset-3'>
              
            {studentData.status ==="success" && <p className="text-success">Registration Successful</p>}
             {studentData.status === "error" && <p className="text-danger">Registration Failed</p>}
            <div className='card'>
                <h3 className='card-header'>User Register</h3>
                <div className='card-body'>
               
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label float-start">Full Name</label>
                    <input type="text" value={studentData.full_name} onChange={handleChange} name="full_name" className="form-control "  />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label float-start">Email</label>
                    <input type="email" value={studentData.email} onChange={handleChange} name="email" className="form-control" id="exampleInputPassword1" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label float-start">Username</label>
                    <input type="text" value={studentData.username} onChange={handleChange} name="username" className="form-control"  />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label float-start">Password</label>
                    <input type="password" value={studentData.password}onChange={handleChange} name='password' className="form-control"  />
                </div>
               
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1"  className="form-label float-start">Interests</label>
                    <textarea name="interested_categories" onChange={handleChange} value={studentData.interested_categories}  className="form-control"  />
                </div>
    
                <button type="submit" onClick={submitForm} className="btn btn-primary float-start">Register</button>
                </div>
            </div>
        </div>
    </div> 
    </div>

);
}

export default Register;