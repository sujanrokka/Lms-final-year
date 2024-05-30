import {Link} from 'react-router-dom';
function AddCourse()
{
    return (
        <div className='container mt-4'>
        <div className='row'>
            <div className='col-6 offset-3'>
            <div className='card'>
                <h3 className='card-header'>Add Course</h3>
                <div className='card-body'>
                <form>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Title</label>
                    <input type="text" className="form-control"  />
                </div>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Description</label>
                    <textarea className="form-control"  />
                </div>

                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Course Video</label>
                    <input type="file" className="form-control" id="exampleInputPassword1" />
                </div>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Technologies</label>
                    <textarea className="form-control"  />
                </div>
               
                
    
                <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                </div>
            </div>
        </div>
    </div> 
    </div>

);
}

export default AddCourse;