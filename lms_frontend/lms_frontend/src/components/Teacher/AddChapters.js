import {Link} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar'
function AddChapters()
{
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