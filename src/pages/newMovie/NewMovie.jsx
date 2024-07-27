import { useContext, useState } from "react";
import "./newMovie.css";
import storage from "../../firebase";
import { createMovie } from "../../context/movieContext/apiCalls";
import { MovieContext } from "../../context/movieContext/MovieContext";

export default function NewMovie() {
  // State for movie details and file uploads
  const [movie, setMovie] = useState({});
  const [img, setImg] = useState(null);
  const [imgTitle, setImgTitle] = useState(null);
  const [imgSm, setImgSm] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [video, setVideo] = useState(null);
  
  // State to track the upload status of each file
  const [uploadedFiles, setUploadedFiles] = useState({
    img: false,
    imgTitle: false,
    imgSm: false,
    trailer: false,
    video: false,
  });
  
  // State to track overall upload progress
  const [uploadProgress, setUploadProgress] = useState(0);

  const { dispatch } = useContext(MovieContext);

  // Handle changes in text input fields and update movie state
  const handleChange = (e) => {
    const value = e.target.value;
    setMovie({ ...movie, [e.target.name]: value });
  };

  // Upload files to Firebase and update movie state with URLs
  const upload = (items) => {
    items.forEach((item) => {
      if (!item.file) return; // Skip if no file is selected

      // Construct a unique filename for each file
      const fileName = new Date().getTime() + item.label + item.file.name;
      const uploadTask = storage.ref(`/items/${fileName}`).put(item.file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress); // Update the progress bar
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          console.log(error); // Handle upload errors
        },
        () => {
          // On successful upload, get the download URL and update movie state
          uploadTask.snapshot.ref.getDownloadURL().then((url) => {
            setMovie((prev) => ({
              ...prev,
              [item.label]: url,
            }));
            setUploadedFiles((prev) => ({ ...prev, [item.label]: true }));
          });
        }
      );
    });
  };

  // Handle file upload button click
  const handleUpload = (e) => {
    e.preventDefault();
    upload([
      { file: img, label: "img" },
      { file: imgTitle, label: "imgTitle" },
      { file: imgSm, label: "imgSm" },
      { file: trailer, label: "trailer" },
      { file: video, label: "video" },
    ]);
  };

  // Handle form submission to create a new movie
  const handleSubmit = (e) => {
    e.preventDefault();
    createMovie(movie, dispatch);
  };

  // Check if all files have been uploaded
  const allFilesUploaded = Object.values(uploadedFiles).every(Boolean);

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Movie</h1>
      <form className="addProductForm">
        {/* File inputs */}
        <div className="addProductItem">
          <label>Image</label>
          <input
            type="file"
            id="img"
            name="img"
            onChange={(e) => setImg(e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label>Title image</label>
          <input
            type="file"
            id="imgTitle"
            name="imgTitle"
            onChange={(e) => setImgTitle(e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label>Thumbnail image</label>
          <input
            type="file"
            id="imgSm"
            name="imgSm"
            onChange={(e) => setImgSm(e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input
            type="text"
            placeholder="John Wick"
            name="title"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input
            type="text"
            placeholder="description"
            name="desc"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Year</label>
          <input
            type="text"
            placeholder="Year"
            name="year"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Genre</label>
          <input
            type="text"
            placeholder="Genre"
            name="genre"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Duration</label>
          <input
            type="text"
            placeholder="Duration"
            name="duration"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Limit</label>
          <input
            type="text"
            placeholder="limit"
            name="limit"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Is Series?</label>
          <select name="isSeries" id="isSeries" onChange={handleChange}>
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>
        <div className="addProductItem">
          <label>Trailer</label>
          <input
            type="file"
            name="trailer"
            onChange={(e) => setTrailer(e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label>Video</label>
          <input
            type="file"
            name="video"
            onChange={(e) => setVideo(e.target.files[0])}
          />
        </div>
        
        {/* Progress bar */}
        <div className="uploadProgress">
          <div className="progressBar" style={{ width: `${uploadProgress}%` }}></div>
        </div>
        
        {/* Conditional button rendering based on file upload status */}
        {allFilesUploaded ? (
          <button className="addProductButton" onClick={handleSubmit}>
            Create
          </button>
        ) : (
          <button className="addProductButton" onClick={handleUpload}>
            Upload
          </button>
        )}
      </form>
    </div>
  );
}
