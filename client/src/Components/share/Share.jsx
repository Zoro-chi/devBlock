import { useState, useEffect, useContext, useRef } from "react";

import "./share.scss";
import { images } from "../../constants";
import { PermMedia, Label, Room, EmojiEmotions } from "@mui/icons-material";
import { AuthContext } from "../../context/authContext";
import { createPost } from "../../Api/postRequest";

const Share = () => {
  const [file, setFile] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const { user } = useContext(AuthContext);
  const desc = useRef();

  // const submitHandler = async (e) => {
  //   e.preventDefault();
  //   const newPost = {
  //     userId: user._id,
  //     desc: desc.current.value,
  //     image: file,
  //   };
  //   try {
  //     await createPost(newPost);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!file) return;
    uploadImage(previewSource);
  };

  const uploadImage = async (base64EncodedImage) => {
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
      image: base64EncodedImage,
    };
    try {
      const { data } = await createPost(newPost);
      if (data) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const imageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      setFile(img);
      previewImg(img);
    }
  };

  const previewImg = (img) => {
    const reader = new FileReader();
    reader.readAsDataURL(img);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  // const upload = async (e, files) => {
  //   e.preventDefault();
  //   const formData = new FormData();
  //   formData.append("file", file);
  //   formData.append("upload_preset", "ua8jqffh");
  //   const upload = await uploadImage(formData);
  //   console.log(upload);
  // };

  return (
    <div className="share">
      <div className="share-wrapper">
        <div className="share-top">
          <img
            className="share-pfp"
            src={user.profilePicture ? user.profilePicture : images.defaultPfp}
            alt=""
          />
          <input
            className="share-input"
            placeholder={`What it do ${user.username}?`}
            ref={desc}
          />
        </div>
        <hr className="share-hr" />
        <form className="share-bottom" onSubmit={submitHandler}>
          <div className="share-options">
            <label htmlFor="file" className="share-option">
              <PermMedia htmlColor="tomato" className="share-icon" />
              <span className="share-option-text">Photo or Video</span>
              <input
                type="file"
                id="file"
                accept=".png, .jpeg, .jpg"
                onChange={imageChange}
                style={{ display: "none" }}
              />
            </label>

            <div className="share-option">
              <Label htmlColor="aquamarine" className="share-icon" />
              <span className="share-option-text"> Tag </span>
            </div>

            <div className="share-option">
              <Room htmlColor="midnightblue" className="share-icon" />
              <span className="share-option-text"> Location </span>
            </div>

            <div className="share-option">
              <EmojiEmotions htmlColor="goldenrod" className="share-icon" />
              <span className="share-option-text"> Feelings </span>
            </div>
          </div>
          <button className="share-button" type="submit">
            Share
          </button>
        </form>
      </div>
      {previewSource && (
        <div className="preview-image-container">
          <div className="preview-image-wrapper">
            <img src={previewSource} alt="" className="preview-image" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Share;
