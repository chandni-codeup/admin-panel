import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from './BaseUrl';

function NoticeBoard() {
  const [notices, setNotices]=useState([])
  const initialFormData = {
    title: '',
    description: '',
    // timestamp: '',
    expiry: '',
    createdBy: '',
    noticeImage: null,
    newsImage: null,
    eventImage: null
  };

  const [formData, setFormData] = useState(initialFormData);
  const navigate=useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e, fileType) => {
    setFormData({ ...formData, [fileType]: e.target.files[0] });
  };

  const resetForm = () => {
    setFormData(initialFormData);
  };

  const handleSubmitNews = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    // data.append('timestamp', formData.timestamp);
    data.append('expiry', formData.expiry);
    data.append('createdBy', formData.createdBy);
    data.append('newsImage', formData.newsImage);

    try {
      await axios.post(`${baseUrl}api/addNews`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('News added successfully!');
      resetForm();  
      navigate('/news')
      window.location.reload();
    } catch (error) {
      toast.error('Failed to add news: ' + error.message);
    }
  };

  const handleSubmitEvents = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    // data.append('timestamp', formData.timestamp);
    data.append('expiry', formData.expiry);
    data.append('createdBy', formData.createdBy);
    data.append('eventImage', formData.eventImage);

    try {
      await axios.post(`${baseUrl}api/addEvents`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Event added successfully!');
      resetForm();  
      navigate('/events')
      window.location.reload();
    } catch (error) {
      toast.error('Failed to add event: ' + error.message);
    }
  };

  const handleSubmitNotice = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    // data.append('timestamp', formData.timestamp);
    data.append('expiry', formData.expiry);
    data.append('createdBy', formData.createdBy);
    data.append('noticeImage', formData.noticeImage);

    try {
      await axios.post(`${baseUrl}api/addNotice`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Notice added successfully!');
      resetForm();  
      navigate('/notice')
      window.location.reload();
    } catch (error) {
      toast.error('Failed to add notice: ' + error.message);
    }
  };

  useEffect(() => {
    const fetchNotices = async () => {
      const response = await axios(`${baseUrl}api/getNotice`);
      const data = await response.data;
      setNotices(data);
    };
    fetchNotices();
  }, []);

  const deleteNotice= async(noticeId)=>{
    try {
      await axios.delete(`${baseUrl}api/deleteNotice/${noticeId}`)
      setNotices(prevData=>prevData.filter(notice=>notice._id !== noticeId))
      toast.success('Successfully deleted')
    } catch (error) {
      toast.error('Cannot delete notice!')
    } 
  }

const deleteExpiredNotice = async () => {
  try {
      const response = await axios.delete(`${baseUrl}api/delExpiredNotices`);

      if (response.status === 200) {
          console.log(response.data.message);  
      }
  } catch (error) {
      console.error('Error while deleting expired notices:', error.response?.data?.message || error.message);
  }
};
  window.onload = deleteExpiredNotice

return (
    <>
    <ToastContainer />
     <div className="applicantsPage d-flex flex-column mx-1 mb-3 " style={{ marginTop: "75px" }}>

    <h1 className='text-center text-primary'>NoticeBoard</h1>
    <br />
    <br />
   

<div className="list-group">
  {notices.length>0 ?
  (notices.map((notice) => (
    <div key={notice._id} className="mx-1 mb-4" aria-current="true">
      <div className="d-flex">

      <div className="mentorID d-flex align-items-center mb-2">
        <div className='d-flex justify-content-center align-items-center'>
          <span className="badge text-bg-light shadow text-success rounded-circle d-flex justify-content-center align-items-center fs-5" style={{ height: "40px", width: "40px" }}>
            {notice.createdBy.split(' ').map(name => name[0]).join('')}
          </span>
        </div>
        <div className="ms-3">
          <div className="fw-bold">{notice.createdBy}</div>
          <small> {new Date(notice.createdAt).toLocaleString('en-US', {
      year: '2-digit',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    })}
        </small>
        </div>
      </div>
      <div className="options ms-auto">
  <div className="dropdown">
    <button
      className="btn"
      type="button"
      data-bs-toggle="dropdown"
      aria-expanded="false"
      style={{ backgroundColor: 'transparent', border: 'none', padding: '0' }} 
    >
      <i className="bi bi-three-dots-vertical fs-3 text-secondary" ></i> 
    </button>
    <ul className="dropdown-menu">
      {/* <li><a className="dropdown-item">Edit</a></li> */}
      <li><a className="dropdown-item" onClick={()=> deleteNotice(notice._id)}>Delete</a></li>
    </ul>
  </div>

      </div>
      </div>
      <div className="d-flex justify-content-center align-items-center mb-2">
        <img src={notice.noticeImage} className='w-100' height={200} alt="image" />
      </div>
      <div className="accordion shadow rounded-3" id={`accordion${notice._id}`}>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#collapse${notice._id}`}
              aria-expanded="false"
              aria-controls={`collapse${notice._id}`}
            >
              <strong>{notice.title}</strong>
            </button>
          </h2>
          <div
            id={`collapse${notice._id}`}
            className="accordion-collapse collapse"
            data-bs-parent={`#accordion${notice._id}`}
          >
            <div className="accordion-body">
              {notice.description}
            </div>
          </div>
        </div>
      </div>
    </div>
  )))
  :
  (
    <div className='d-flex justify-content-center align-items-center '>
      <h5>No notices available.</h5>
    </div>
  )
  }
</div>

{/* add button */}

{/* <div className=' d-flex justify-content-center align-items-center '>
    <span className="badge text-bg-light text-success shadow rounded-circle d-flex justify-content-center align-items-center fs-1" data-bs-toggle="modal" data-bs-target="#staticBackdrop" style={{position:"fixed", bottom:"50px", right:"30px", cursor:"pointer", fontSize:"", zIndex:"90", height:"65px", width:"65px"}}><i className="fa-solid fa-plus text-success"></i></span>
</div> */}

{/* <i className="bi bi-plus-circle-fill text-success  shadow   " data-bs-toggle="modal" data-bs-target="#staticBackdrop" style={{position:"fixed", bottom:"50px", right:"30px", cursor:"pointer", fontSize:"60px", zIndex:"90"}}></i> */}
      
      {/* Add Button */}
      <div className='d-flex justify-content-center align-items-center'>
        <span
          className="badge text-bg-light text-success shadow rounded-circle d-flex justify-content-center align-items-center fs-1"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
          style={{
            position: "fixed",
            bottom: "50px",
            right: "30px",
            cursor: "pointer",
            zIndex: "90",
            height: "65px",
            width: "65px"
          }}
        >
          <i className="fa-solid fa-plus text-success"></i>
        </span>
      </div>

      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="staticBackdropLabel">ADD</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <ol className="list-group text-center">
        <div className=""> 
          <button type="button" className="btn btn-outline-success w-100 mb-2 fw-bold" data-bs-toggle="modal" data-bs-target="#staticBackdroper" >Add News</button>
        </div>
        <div className=""> 
          <button type="button" className="btn btn-outline-success w-100 mb-2 fw-bold" data-bs-toggle="modal" data-bs-target="#staticBackdrops" >Add Event</button>
        </div>
        <div className=""> 
          <button type="button" className="btn btn-outline-success w-100 fw-bold" data-bs-toggle="modal" data-bs-target="#staticBackdropp" >Add Notice</button>
        </div>
      </ol>
      </div>
      
    </div>
  </div>
</div>

{/* for news */}
<div className="modal fade" id="staticBackdroper" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="staticBackdropLabel">New News</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
              <form onSubmit={handleSubmitNews}>
                <div className="form-floating">
                  <input type="text" className="form-control mb-3" id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    placeholder="Title" />
                  <label htmlFor="floatingTitle"> <i className="bi bi-chevron-right me-1"></i> Title</label>
                </div>

                <div className="form-floating mb-3">
                  <textarea className="form-control" placeholder="Description" id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    style={{ height: "100px" }}></textarea>
                  <label htmlFor="floatingTextarea2"><i className="bi bi-text-indent-left me-1"></i> Description</label>
                </div>

                {/* <div className="form-floating">
                  <input type="datetime-local" className="form-control mb-3" id="timestamp"
                    name="timestamp"
                    value={formData.timestamp}
                    onChange={handleInputChange}
                    required
                    placeholder="Timestamp" />
                  <label htmlFor="floatingTime"><i className="bi bi-clock-fill me-1"></i> Timestamp</label>
                </div> */}

                <div className="form-floating">
                  <input type="datetime-local" className="form-control mb-3" placeholder="Expiry" id="expiry"
                    name="expiry"
                    value={formData.expiry}
                    onChange={handleInputChange}
                    required />
                  <label htmlFor="floatingExpiryTime"><i className="bi bi-clock-fill me-1"></i> Expiry</label>
                </div>

                <div className="form mb-3">
                  <input type="file" className="form-control" id="newsImage"
                    name="newsImage"
                    onChange={(e)=>handleFileChange(e, 'newsImage')}
                    required />
                </div>

                <div className="form-floating">
                  <input type="text" className="form-control mb-3" id="createdBy"
                    name="createdBy"
                    value={formData.createdBy}
                    onChange={handleInputChange}
                    required
                    placeholder="Created By" />
                  <label htmlFor="floatingCreatedBy"> <i className="bi bi-chevron-right me-1"></i> Created By</label>
                </div>

                <div className="buttons d-flex mt-4">
                <button type="submit" className="btn btn-outline-success me-2" style={{width:"180px"}}>Add</button>
                <button type="reset" className="btn btn-outline-secondary " style={{width:"180px"}} onClick={resetForm}>Reset</button>
                </div>
              </form>
            </div>
    </div>
  </div>
</div>

{/* for events */}
<div className="modal fade" id="staticBackdrops" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="staticBackdropLabel">New Event</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
              <form onSubmit={handleSubmitEvents}>
                <div className="form-floating">
                  <input type="text" className="form-control mb-3" id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    placeholder="Title" />
                  <label htmlFor="floatingTitle"> <i className="bi bi-chevron-right me-1"></i> Title</label>
                </div>

                <div className="form-floating mb-3">
                  <textarea className="form-control" placeholder="Description" id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    style={{ height: "100px" }}></textarea>
                  <label htmlFor="floatingTextarea2"><i className="bi bi-text-indent-left me-1"></i> Description</label>
                </div>

                {/* <div className="form-floating">
                  <input type="datetime-local" className="form-control mb-3" id="timestamp"
                    name="timestamp"
                    value={formData.timestamp}
                    onChange={handleInputChange}
                    required
                    placeholder="Timestamp" />
                  <label htmlFor="floatingTime"><i className="bi bi-clock-fill me-1"></i> Timestamp</label>
                </div> */}

                <div className="form-floating">
                  <input type="datetime-local" className="form-control mb-3" placeholder="Expiry" id="expiry"
                    name="expiry"
                    value={formData.expiry}
                    onChange={handleInputChange}
                    required />
                  <label htmlFor="floatingExpiryTime"><i className="bi bi-clock-fill me-1"></i> Expiry</label>
                </div>

                <div className="form mb-3">
                  <input type="file" className="form-control" id="eventImage"
                    name="eventImage"
                    onChange={(e)=>handleFileChange(e, 'eventImage')}
                    required />
                </div>

                <div className="form-floating">
                  <input type="text" className="form-control mb-3" id="createdBy"
                    name="createdBy"
                    value={formData.createdBy}
                    onChange={handleInputChange}
                    required
                    placeholder="Created By" />
                  <label htmlFor="floatingCreatedBy"> <i className="bi bi-chevron-right me-1"></i> Created By</label>
                </div>

                <div className="buttons d-flex mt-4">
                <button type="submit" className="btn btn-outline-success me-2" style={{width:"180px"}}>Add</button>
                <button type="reset" className="btn btn-outline-secondary " style={{width:"180px"}} onClick={resetForm}>Reset</button>
                </div>
              </form>
            </div>
    </div>
  </div>
</div>


{/* for notice */}
<div className="modal fade" id="staticBackdropp" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">New Notice</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmitNotice}>
                <div className="form-floating">
                  <input type="text" className="form-control mb-3" id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    placeholder="Title" />
                  <label htmlFor="floatingTitle"> <i className="bi bi-chevron-right me-1"></i> Title</label>
                </div>

                <div className="form-floating mb-3">
                  <textarea className="form-control" placeholder="Description" id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    style={{ height: "100px" }}></textarea>
                  <label htmlFor="floatingTextarea2"><i className="bi bi-text-indent-left me-1"></i> Description</label>
                </div>
                <div className="form-floating">
                  <input type="datetime-local" className="form-control mb-3" placeholder="Expiry" id="expiry"
                    name="expiry"
                    value={formData.expiry}
                    onChange={handleInputChange}
                    required />
                  <label htmlFor="floatingExpiryTime"><i className="bi bi-clock-fill me-1"></i> Expiry</label>
                </div>

                <div className="form mb-3">
                  <input type="file" className="form-control" id="noticeImage"
                    name="noticeImage"
                    onChange={(e)=>handleFileChange(e, "noticeImage")}
                    required />
                </div>

                <div className="form-floating">
                  <input type="text" className="form-control mb-3" id="createdBy"
                    name="createdBy"
                    value={formData.createdBy}
                    onChange={handleInputChange}
                    required
                    placeholder="Created By" />
                  <label htmlFor="floatingCreatedBy"> <i className="bi bi-chevron-right me-1"></i> Created By</label>
                </div>

                <div className="buttons d-flex mt-4">
                <button type="submit" className="btn btn-outline-success me-2" style={{width:"180px"}}>Add</button>
                <button type="reset" className="btn btn-outline-secondary " style={{width:"180px"}} onClick={resetForm}>Reset</button>
                </div>
              </form>
            </div>
            
          </div>
        </div>
      </div>


    </div>
    </>
  )
}

export default NoticeBoard