import React, { useEffect, useState } from "react";
import { upload } from "../services";

const Uploads = (props) => {
  const [image, setImage] = useState({});

  useEffect(() => {
    const dropArea = document.querySelector(".drag-area");
    const dragText = document.querySelector(".header");

    let button = dropArea.querySelector(".button");
    let input = dropArea.querySelector("input");

    let file;

    button.onclick = () => {
      input.click();
    };

    // when browse
    input.addEventListener("change", function () {
      file = this.files[0];
      dropArea.classList.add("active");
      displayFile();
    });

    // when file is inside drag area
    dropArea.addEventListener("dragover", (event) => {
      event.preventDefault();
      dropArea.classList.add("active");
      dragText.textContent = "Release to Upload";
      // console.log('File is inside the drag area');
    });

    // when file leave the drag area
    dropArea.addEventListener("dragleave", () => {
      dropArea.classList.remove("active");
      // console.log('File left the drag area');
      dragText.textContent = "Drag & Drop";
    });

    // when file is dropped
    dropArea.addEventListener("drop", (event) => {
      event.preventDefault();
      // console.log('File is dropped in drag area');

      file = event.dataTransfer.files[0]; // grab single file even of user selects multiple files
      // console.log(file);
      displayFile();
    });

    function displayFile() {
      let fileType = file.type;
      // console.log(fileType);

      let validExtensions = ["image/jpeg", "image/jpg", "image/png"];

      if (validExtensions.includes(fileType)) {
        // console.log('This is an image file');
        let fileReader = new FileReader();

        fileReader.onload = () => {
          let fileURL = fileReader.result;
          // console.log(fileURL);
          let imgTag = `<img src="${fileURL}" alt="">`;
          dropArea.innerHTML = imgTag;
        };
        fileReader.readAsDataURL(file);
      } else {
        alert("This is not an Image File");
        dropArea.classList.remove("active");
      }
    }
  });

  // Uploading photo start
  const HandleSubmit = async (event) => {
    event.preventDefault();
    if (!localStorage.getItem("token")) {
      alert("You are not login?");
    }
    if (!image.name) {
    }
    const json = await upload(image);
    console.log(json, 84);
    if (json) {
      props.data.current.click();
    }
  };
  const ChangeValidation = (event) => {
    if (event.target.value !== "") {
      setImage(event.target.files[0]);
    }
  };

  return (
    <>
      <div className="container">
        {/* <h3>Upload your File :</h3> */}
        <div className="drag-area">
          <div className="icon">
            <i className="bi bi-images" style={{ color: "#13a365" }}></i>
          </div>

          <span className="header">Drag & Drop</span>
          <span className="header">
            or <span className="button">browse</span>
          </span>
          <input type="file" name="avatar" onChange={ChangeValidation} hidden />
          <span className="support">Supports: JPEG, JPG, PNG</span>
        </div>
        <div className="modal-footer">
          <button className="btn btn-danger">Reset</button>
          <button onClick={HandleSubmit} className="download btn">
            Upload
          </button>
        </div>
      </div>
    </>
  );
};
export default Uploads;
