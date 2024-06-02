
import {useParams} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import {useState,useEffect} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
const baseUrl='http://127.0.0.1:8000/api';

function EditChapter(){
     
    const [chapterData,setChapterData]=useState({
        course:'',
        title:'',
        description:'',
        prev_video:'',
        video:'',
        remarks:'' 
    });
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

    const {chapter_id}=useParams();
    const formSubmit=()=>{
        const formData=new FormData();
        formData.append('course',chapterData.course);
        formData.append('title',chapterData.title);
        formData.append('description',chapterData.description);
        formData.append('video',chapterData.video,chapterData.video.name);
        formData.append('remarks',chapterData.remarks);
        try{
        axios.put(baseUrl+'/chapter/'+chapter_id,formData,{
            headers:{
                'Content-Type':'multipart/form-data'
            }
        })
       .then((res)=>{
        if(res.status===200){
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
    }catch(error){
        console.log(error);
       }
    };

    useEffect(()=>
        {
            try{
            axios.get(baseUrl+'/chapter/'+chapter_id).then((response)=>
            {
               
                setChapterData({
                    course:response.data.course,
                    title:response.data.title,
                    description:response.data.description,
                    prev_video:response.data.video,
                    video:response.data.video,
                    remarks:response.data.remarks
    });
            });
            }catch(error){
                console.log(error);
            }
            },[chapter_id]);
            
return(
    <div className='container mt-4'>
    <div className='row'>
        <aside className="col-md-3">
            <TeacherSidebar />
        </aside>
        <div className='col-9'>
        <div className='card'>
            <h3 className='card-header'>Update Chapter</h3>
            <div className='card-body'>
            <form>
            <div className="mb-3">
                <label for="title" className="form-label float-start">Title</label>
                <input type="text" value={chapterData.title} name='title' onChange={handleChange} id="title" className="form-control"  />
            </div>
            <div className="mb-3">
                <label for="description" className="form-label float-start">Description</label>
                <textarea name='description' value={chapterData.description} onChange={handleChange} className="form-control " id="description"  />
            </div>

            <div className="mb-3">
                <label for="video" className="form-label float-start">Video</label>
                <input type="file" name='video' onChange={handleFileChange} className="form-control" id="video" />
                {chapterData.prev_video &&
                <video controls width="100%" height="250"className='mt-2'>
                        <source src={chapterData.prev_video} type="video/mp4" />
                </video>
                }
            </div>
            <div className="mb-3">
                <label for="techs" className="form-label float-start">Remarks</label>
                <textarea className="form-control" value={chapterData.remarks} name='remarks' onChange={handleChange} placeholder="this video is focused on basic intro to python" id='techs'  />
            </div>
            <button type="submit" onClick={formSubmit} className="btn btn-primary float-start">Submit</button>
            </form>
            </div>
        </div>
    </div>
</div> 
</div>

);
}
export default EditChapter;