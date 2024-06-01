import {Link} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import {useState,useEffect} from 'react';
import axios from 'axios';
const baseUrl='http://127.0.0.1:8000/api';
function AddChapters()
{
    
  
    const [ChapterData,setChapterData]=useState({
        category:'',
        title:'',
        description:'',
        f_img:'',
        techs:'' 
    });

    //fetch category when page load
    useEffect(()=>{
        try{
            axios.get(baseUrl+'/category')
            .then((res)=>{
             setCats(res.data);
            
        });
    }catch(error){
        console.log(error);
    }
    },[]);
    
    const handleChange=(event)=>{
        setChapterData({
            ...chapterData,
            [event.target.name]:event.target.value
        });
    }
    
    const handleFileChange=(event)=>{
        setChapterData({
           ...chapterData,
            [event.target.name]:event.target.files[0]
        });
    }

    const formSubmit=()=>{
        const formData=new FormData();
        formData.append('category',chapterData.category);
        formData.append('teacher',1);
        formData.append('title',courseData.title);
        formData.append('description',courseData.description);
        formData.append('featured_img',courseData.f_img,courseData.f_img.name);
        formData.append('techs',courseData.techs);
        try{
        axios.post(baseUrl+'/course/',formData,{
            headers:{
                'Content-Type':'multipart/form-data'
            }
        })
       .then((res)=>{
        window.location.href='/add-course';
        });
    }catch(error){
        console.log(error);
       }
    };

    return (
        <div className='container mt-4'>
        <div className='row'>
            <aside className="col-md-3">
                <TeacherSidebar />
            </aside>
            <div className='col-9'>
            <div className='card'>
                <h3 className='card-header'>Add Chapter</h3>
                <div className='card-body'>
                <form>
                <div className="mb-3">
                    <label for="title" className="form-label float-start">Title</label>
                    <input type="text" id="title" className="form-control"  />
                </div>
                <div className="mb-3">
                    <label for="description" className="form-label float-start">Description</label>
                    <textarea className="form-control " id="description"  />
                </div>

                <div className="mb-3">
                    <label for="video" className="form-label float-start">Video</label>
                    <input type="file" className="form-control" id="video" />
                </div>
                <div className="mb-3">
                    <label for="techs" className="form-label float-start">Remarks</label>
                    <textarea className="form-control" placeholder="this video is focused on basic intro to python" id='techs'  />
                </div>
                <button type="submit" className="btn btn-primary float-start">Submit</button>
                </form>
                </div>
            </div>
        </div>
    </div> 
    </div>

);
}

export default AddChapters;