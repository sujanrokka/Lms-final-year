import {Link} from 'react-router-dom';
import {useEffect,useState} from 'react';
import axios from 'axios';
const baseUrl='http://127.0.0.1:8000/api/teacher/';
function TeacherRegister()
{
    const [teacherData, setteacherData]=useState({
        full_name:'',
        email:'',
        password:'',
        qualification:'',
        mobile_no:'',
        skills:'',
        status:''
    });
    //change element values
     const handleChange=(event)=>{
        setteacherData({
        ...teacherData,
        [event.target.name]:event.target.value
        });
    }
    console.log(teacherData);
    //end

    //submit form
    const submitForm=()=>{
        const teacherFormData=new FormData();
        teacherFormData.append('full_name',teacherData.full_name);
        teacherFormData.append('email',teacherData.email);
        teacherFormData.append('password',teacherData.password);
        teacherFormData.append('qualification',teacherData.qualification);
        teacherFormData.append('mobile_no',teacherData.mobile_no);
        teacherFormData.append('skills',teacherData.skills);

        try{
        axios.post(baseUrl,teacherFormData).then((response)=>{
            setteacherData({
            'full_name':'',
            'email':'',
            'password':'',
            'qualification':'',
            'mobile_no':'',
            'skills':'',
            'status':'success'
        });
        });
        }catch(error){
        console.log(error);
        setteacherData({'status':'error'})
        }
    };
    //end 

    useEffect(()=>{
        document.title='TeacherRegister'
    });

    const teacherLoginStatus=localStorage.getItem('teacherLoginStatus')
    if(teacherLoginStatus=='true'){
    window.location.href="/teacher-dashboard";
}

    return (
        <div className='container mt-4'>
        <div className='row'>
            <div className='col-6 offset-3'>
                {teacherData.status ==="success" && <p className="text-success">Registration Successful</p>}
                {teacherData.status === 'error' && <p className="text-danger">Registration Failed</p>}
            <div className='card'>
                <h3 className='card-header'>Teacher Register</h3>
                <div className='card-body'>
                <form>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label float-start">Full Name</label>
                    <input value={teacherData.full_name} onChange={handleChange} name="full_name" type="text" className="form-control"  />
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label float-start">Email</label>
                    <input value={teacherData.email} onChange={handleChange} name="email" type="email" className="form-control" id="exampleInputPassword1" />
                </div>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label float-start">Password</label>
                    <input value={teacherData.password} onChange={handleChange} name="password" type="password" className="form-control"  />
                </div>
               
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label float-start">Qualification</label>
                    <input value={teacherData.qualification} onChange={handleChange} name="qualification" type="text" className="form-control"  />
                </div>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label float-start">Mobile No.</label>
                    <input value={teacherData.mobile_no} onChange={handleChange} name='mobile_no' type="number" className="form-control"  />
                </div>
                
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label float-start">Skills</label>
                    <textarea value={teacherData.skills} onChange={handleChange} name="skills" className="form-control"  />
                </div>
    
                <button onClick={submitForm} type="submit" className="btn btn-primary float-start">Register</button>
                </form>
                </div>
            </div>
        </div>
    </div> 
    </div>

);
}

export default TeacherRegister

