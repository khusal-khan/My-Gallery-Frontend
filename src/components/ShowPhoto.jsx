import React, { useEffect, useState } from "react";
import { NoImage } from "./NoImage";
import { getphotos, trash, download } from "../services";

export const ShowPhoto = () => {
  const [photos, setPhotos] = useState([]);
  const getPhotos = async () => {
    // API Call
    const json = await getphotos();
    if (!json) {
      setPhotos([]);
    }
    setPhotos(json);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getPhotos();
    }
  }, [photos]);

  const [imgtemsrc, setImgtemsrc] = useState("");
  const [PopUpWindow, setPopUpWindow] = useState(false);

  const PopUpImage = (tempsrc) => {
    setImgtemsrc(tempsrc);
    setPopUpWindow(true);
  };

  // Trash Image by user
  const [temptrashId, setTemptrashId] = useState("");
  const [TempImgPath, setTempImgPath] = useState("");

  const trashImage = async () => {
    if (localStorage.getItem("token") || temptrashId) {
      const response = await trash(
        temptrashId,
        TempImgPath.replace("http://localhost:47000/", "")
      );
      if (response) {
        // if image is deleted
        setPopUpWindow(false);
      } else {
        // if image is not delete
        setPopUpWindow(true);
      }
    }
  };

  const downloadFile = () => {
    if (imgtemsrc) {
      download(imgtemsrc, temptrashId);
    }
  };

  return (
    <>
      <div
        className={PopUpWindow ? "popupimagewindow open" : "popupimagewindow"}
      >
        <img src={imgtemsrc} alt={imgtemsrc} />
        <div className="ImgIcon">
          <div style={{ cursor: "pointer" }}>
            <i className="bi bi-download" onClick={downloadFile}></i>
          </div>
          <div style={{ cursor: "pointer" }}>
            <i className="bi bi-trash" onClick={trashImage}></i>
          </div>
          <div style={{ cursor: "pointer" }}>
            <i
              className="bi bi-x-square"
              onClick={() => {
                setPopUpWindow(false);
              }}
            ></i>
          </div>
        </div>
      </div>
      <div className={photos.length > 0 ? "containeref" : "container"}>
        <ul className="image-gallery">
          {photos.length > 0 ? (
            photos.map((elemt) => {
              return (
                <>
                  <li key={elemt._id}>
                    <img
                      src={elemt.imageURL}
                      alt=""
                      
                    />
                    <div className="overlay" onClick={() => {
                        PopUpImage(elemt.imageURL);
                        setTemptrashId(elemt._id);
                        setTempImgPath(elemt.imageURL);
                      }}>
                      <span>{elemt.date}</span>
                    </div>
                  </li>
                </>
              );
            })
          ) : (
            <NoImage />
          )}
        </ul>
      </div>
    </>
  );
};
