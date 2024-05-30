import {Link} from 'react-router-dom';
function PopularTeachers(){
    return(
        
      
        <div className="container mt-3">
              {/* Popular Teachers */}
            <h3 className="pb-1 mb-2">Popular Teachers </h3>
            <div className="row mb-4">
                <div className="col-md-3 mb-4">
                    <div className="card">
                        <Link to="/detail/1"><img src="teachers.png" className="card-img-top" alt="..."/></Link>
                        <div className="card-body">
                            <h5 className="card-title"><Link to="/teacher-detail/1">Teacher Name</Link></h5>
                        </div>
                        <div className='card-footer'>
                      <div className='title'>  
                      <span>Rating: 4.5/5 </span>
                      
                      </div>
                    </div>
                    </div>
                </div>
                <div className="col-md-3 mb-4">
                    <div className="card">
                    <Link to="/detail/1"><img src="teachers.png" className="card-img-top" alt="..."/></Link>
                        <div className="card-body">
                            <h5 className="card-title"><Link to="/teacher-detail/1">Teacher Name</Link></h5>
                        </div>
                        <div className='card-footer'>
                      <div className='title'>  
                      <span>Rating: 4.5/5 </span>
                     
                      </div>
                    </div>
                    </div>
                </div>
                <div className="col-md-3 mb-4">
                    <div className="card">
                    <Link to="/detail/1"><img src="teachers.png" className="card-img-top" alt="..."/></Link>
                            <div className="card-body">
                                <h5 className="card-title"><Link to="/teacher-detail/1">Teacher Name</Link></h5>
                            </div>
                            <div className='card-footer'>
                      <div className='title'>  
                      <span>Rating: 4.5/5 </span>
               
                      </div>
                    </div>
                        </div>
                </div>
                
              
    <div className="col-md-3 mb-4">
    <div className="card">
        <Link to="/detail/1"><img src="teachers.png" className="card-img-top" alt="..."/></Link>
        <div className="card-body">
        <h5 className="card-title"><Link to="/teacher-detail/1">Teacher Name</Link></h5>
        </div>
        <div className='card-footer'>
                      <div className='title'>  
                      <span>Rating: 4.5/5 </span>
                     
                      </div>
                    </div>
    </div>
    </div>
    

    <div className="card">
        <Link to="/detail/1"><img src="teachers.png" className="card-img-top" alt="..."/></Link>
        <div className="card-body">
        <h5 className="card-title"><Link to="/teacher-detail/1">Teacher Name</Link></h5>
        </div>
        <div className='card-footer'>
                      <div className='title'>  
                      <span>Rating: 4.5/5 </span>
                  
                      </div>
                    </div>
    </div>
    </div>
    <div className="card">
        <Link to="/detail/1"><img src="teachers.png" className="card-img-top" alt="..."/></Link>
        <div className="card-body">
        <h5 className="card-title"><Link to="/teacher-detail/1">Teacher Name</Link></h5>
        </div>
        <div className='card-footer'>
                      <div className='title'>  
                      <span>Rating: 4.5/5 </span>
                      
                      </div>
                    </div>
    </div>
    <div className="card">
        <Link to="/detail/1"><img src="teachers.png" className="card-img-top" alt="..."/></Link>
        <div className="card-body">
        <h5 className="card-title"><Link to="/teacher-detail/1">Teacher Name</Link></h5>
        </div>
        <div className='card-footer'>
                      <div className='title'>  
                      <span>Rating: 4.5/5 </span>
                     
                      </div>
                    </div>
    </div>
    <div className="card">
        <Link to="/detail/1"><img src="teachers.png" className="card-img-top" alt="..."/></Link>
        <div className="card-body">
        <h5 className="card-title"><Link to="/teacher-detail/1">Teacher Name</Link></h5>
        </div>
        <div className='card-footer'>
                      <div className='title'>  
                      <span>Rating: 4.5/5 </span>
                  
                      </div>
                    </div>
    </div>
    {/* end Popular Teachers */}
    {/* pagination starts */}
    <nav aria-label="Page navigation example mt-5">
    <ul className="pagination justify-content-center">
    <li className="page-item"><a class="page-link" href="#">Previous</a></li>
    <li className="page-item"><a class="page-link" href="#">1</a></li>
    <li className="page-item"><a class="page-link" href="#">2</a></li>
    <li className="page-item"><a class="page-link" href="#">3</a></li>
    <li className="page-item"><a class="page-link" href="#">Next</a></li>
    </ul>
    </nav>
    {/* end pagination */}
    </div>


    );
}

export default PopularTeachers;