import { useEffect, useState } from "react";
import axios from "axios";
// Create user Service

export const createuser = async (name, username, email, password) => {
  const response = await fetch(
    `http://localhost:47000/api/v3/auth/createuser`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        username: username,
        email: email,
        password: password,
      }),
    }
  );
  const json = await response.json();
  return json;
};
// User Login Service
export const login = async (username, password) => {
  const response = await fetch(`http://localhost:47000/api/v3/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  });
  const json = await response.json();
  return json;
};
// Get Photo Service
export const getphotos = async () => {
  try {
    const response = await fetch(
      `http://localhost:47000/api/v3/gallery/getphoto`,
      {
        method: "POST",
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    const json = await response.json();
    return json;
  } catch (error) {
    return false;
  }
};
// Trash image Service

export const trash = async (imgId, imgName) => {
  try {
    const response = await fetch(
      `http://localhost:47000/api/v3/gallery/remove/${imgId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({
          filepath: imgName,
        }),
      }
    );
    const json = await response.json();
    return json;
  } catch (error) {
    return false;
  }
};
// download image Service

export const download = (url, fileName) => {
  fetch(url, {
    method: "get",
    mode: "no-cors",
    referrerPolicy: "no-referrer",
  })
    .then((res) => res.blob())
    .then((res) => {
      const aElement = document.createElement("a");
      aElement.setAttribute("download", fileName);
      const href = URL.createObjectURL(res);
      aElement.href = href;
      // aElement.setAttribute('href', href);
      aElement.setAttribute("target", "_blank");
      aElement.click();
      URL.revokeObjectURL(href);
    });
};
// Custom Hook To change Title
const defaultTitle = document.title;
export const useTitle = (title = defaultTitle, prevailOnUnmount = false) => {
  useEffect(() => {
    document.title = title;
  }, [title]);
  useEffect(
    () => () => {
      if (!prevailOnUnmount) {
        document.title = defaultTitle.current;
      }
    },
    []
  );
};

// Upload Image Service
export const upload = async (image) => {
  const url = `http://localhost:47000/api/v3/gallery/add`;
  const formData = new FormData();
  formData.append("avatar", image);
  const config = {
    method: "POST",
    body:formData,
    headers: {
      // "content-type": "multipart/form-data",
      "auth-token": localStorage.getItem("token"),
    },
  };
  const response = await fetch(url,config)
  const json = await response.json()
  console.log(json)
  return json
};
