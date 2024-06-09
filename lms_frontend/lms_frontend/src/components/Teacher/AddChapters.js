// import {Link} from 'react-router-dom';
// import {useParams} from 'react-router-dom';
// import TeacherSidebar from './TeacherSidebar';
// import {useState,useEffect} from 'react';
// import Swal from 'sweetalert2';
// import axios from 'axios';
// const baseUrl='http://127.0.0.1:8000/api';

// function AddChapters()
// {
//     const [chapterData,setChapterData]=useState({
//         title:'',
//         description:'',
//         video:'',
//         remarks:'' 
//     });
// const [videoDuration,setvideoDuration]=useState();
    
//     const handleChange=(event)=>{
//         setChapterData({
//             ...chapterData,
//             [event.target.name]:event.target.value
//         });
//     }
    
//     const handleFileChange=(event)=>{
//            window.URL=window.URL || window.webkitURL
//            var video=document.createElement('video');
//            video.preload='metadata';
//            video.onloadedmetadata = function (){
//             window.URL.revokeObjectURL(video.src)
//             setvideoDuration(video.duration);
//            }
//            video.src=URL.createObjectURL(event.target.files[0]);

//            setChapterData({
//                ...chapterData,
//                video:event.target.files[0]
               
//            })
//         }
//     }

//     const {course_id}=useParams();
//     const formSubmit=()=>{
//         const formData=new FormData();
//         formData.append('course',course_id);
//         formData.append('title',chapterData.title);
//         formData.append('description',chapterData.description);
//         formData.append('video',chapterData.video,chapterData.video.name);
//         formData.append('remarks',chapterData.remarks);
//         try{
//         axios.post(baseUrl+'/course-chapters/'+course_id,formData,{
//             headers:{
//                 'Content-Type':'multipart/form-data'
//             }
//         })
//        .then((res)=>{
//         if(res.status===200||res.status===201){
//             Swal.fire({ 
//                 title:'Data has been added',
//                 toast:'success',
//                 timer:3000,
//                 position:'top-right',
//                 timerProgressBar:true,
//                 showConfirmButton:false
//             });
//              window.location.reload()
//         }
//         });
//     }catch(error){
//         console.log(error);
//        }
//     };

//     return (
        
//         <div className='container mt-4'>
//         <div className='row'>
//             <aside className="col-md-3">
//                 <TeacherSidebar />
//             </aside>
//         <div className='col-9'>
//             <div className='card'>
//                 <h3 className='card-header'>Add Chapter</h3>
//                 <div className='card-body'>
//                         <div className="mb-3">
//                             <label for="title" className="form-label float-start">Title</label>
//                             <input type="text" name='title' onChange={handleChange} id="title" className="form-control"  />
//                         </div>
//                         <div className="mb-3">
//                             <label for="description" className="form-label float-start">Description</label>
//                             <textarea name='description' onChange={handleChange} className="form-control " id="description"  />
//                         </div>

//                         <div className="mb-3">
//                             <label for="video" className="form-label float-start">Video</label>
//                             <input type="file" name='video' onChange={handleFileChange} className="form-control" id="video" />
//                         </div>
//                         <div className="mb-3">
//                             <label for="techs" className="form-label float-start">Remarks</label>
//                             <textarea className="form-control" name='remarks' onChange={handleChange} placeholder="this video is focused on basic intro to python" id='techs'  />
//                         </div>
//                         <button type="submit" onClick={formSubmit} className="btn btn-primary float-start">Submit</button>    
//                 </div>
//             </div>
//         </div>
//     </div> 
//     </div>

// );


// export default AddChapters;






import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/api';

function AddChapters() {
    const [chapterData, setChapterData] = useState({
        title: '',
        description: '',
        video: null,
        remarks: ''
    });
    const [videoDuration, setVideoDuration] = useState(null);
    
    const handleChange = (event) => {
        setChapterData({
            ...chapterData,
            [event.target.name]: event.target.value
        });
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const video = document.createElement('video');
            video.preload = 'metadata';

            video.onloadedmetadata = function () {
                window.URL.revokeObjectURL(video.src);
                setVideoDuration(video.duration);
            };

            video.src = URL.createObjectURL(file);

            setChapterData({
                ...chapterData,
                video: file
            });
        }
    };

    const { course_id } = useParams();

    const formSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('course', course_id);
        formData.append('title', chapterData.title);
        formData.append('description', chapterData.description);
        formData.append('video', chapterData.video, chapterData.video.name);
        formData.append('remarks', chapterData.remarks);

        try {
            const response = await axios.post(`${baseUrl}/course-chapters/${course_id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status === 200 || response.status === 201) {
                Swal.fire({
                    title: 'Data has been added',
                    toast: 'success',
                    timer: 3000,
                    position: 'top-right',
                    timerProgressBar: true,
                    showConfirmButton: false
                });
                window.location.reload();
            }
        } catch (error) {
            console.error(error);
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
                        <h3 className="card-header">Add Chapter</h3>
                        <div className="card-body">
                            <form onSubmit={formSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label float-start">Title</label>
                                    <input type="text" name="title" onChange={handleChange} id="title" className="form-control" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label float-start">Description</label>
                                    <textarea name="description" onChange={handleChange} className="form-control" id="description" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="video" className="form-label float-start">Video</label>
                                    <input type="file" name="video" onChange={handleFileChange} className="form-control" id="video" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="remarks" className="form-label float-start">Remarks</label>
                                    <textarea className="form-control" name="remarks" onChange={handleChange} placeholder="This video is focused on basic intro to Python" id="remarks" />
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
