
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/api';

function QuizQuestions() {
    const [questionData, setquestionData] = useState({
        quiz: '',
        question: '',
        ans1: '',
        ans2: '',
        ans3: '',
        ans4: '',
        right_ans: '',
        
    });
  
    
    const handleChange = (event) => {
        setquestionData({
            ...questionData,
            [event.target.name]: event.target.value
        });
    };


    const { quiz_id } = useParams();

    const formSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('quiz', quiz_id);
        formData.append('question', questionData.title);
        formData.append('ans1', questionData.ans1);
        formData.append('ans2', questionData.ans2);
        formData.append('ans3', questionData.ans3);
        formData.append('ans4', questionData.ans4);
        formData.append('right_ans', questionData.right_ans);

        try {
            axios.post(baseUrl+'/quiz-questions/'+quiz_id, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then((res)=>{
                if (res.status === 200 || res.status === 201) {
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
            });
            }catch (error) {
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
                        <h3 className="card-header">Add Quiz</h3>
                        <div className="card-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label float-start">Title</label>
                                    <input type="text" name="title" onChange={handleChange} id="title" className="form-control" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label float-start">Ans 1</label>
                                    <input type="text" name="ans1" onChange={handleChange} id="title" className="form-control" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label float-start">Ans 2</label>
                                    <input type="text" name="ans2" onChange={handleChange} id="title" className="form-control" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label float-start">Ans 3</label>
                                    <input type="text" name="ans3" onChange={handleChange} id="title" className="form-control" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label float-start">Ans 4</label>
                                    <input type="text" name="ans4" onChange={handleChange} id="title" className="form-control" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label float-start">Right Ans</label>
                                    <input type="text" name="right_ans" onChange={handleChange} id="title" className="form-control" />
                                </div>
                                <button type="button" onClick={formSubmit} className="btn btn-primary float-start">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default QuizQuestions;
