import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { BASE_URL } from "../utils/contant";

function VideoUpload() {
  const [formData, setFormData] = useState({
    uploadedFiles: [],
  });

  const [files, setFiles] = useState([]);

  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    handleFiles(files);
  };

  const handleFileSelect = (event) => {
    const files = event.target.files;
    const newFile = event.target.files[0];
    const id = uuidv4();
    const fileTypeWithoutDot = files[0]?.name.split(".").pop();
    files[0].id = `${id}.${fileTypeWithoutDot}`;
    newFile.id = `${id}.${fileTypeWithoutDot}`;
    handleFiles(files);
    console.log(fileTypeWithoutDot, newFile, "look at here");
    setFiles((prevFiles) => [...prevFiles, newFile]);
  };

  const handleFiles = async (files) => {
    console.log("twis........");
    console.log(files);
    const newFiles = Array.from(files).map((file) => ({
      name: file.name,
      size: file.size,
      fileId: file.id,
      type: file.type,
    }));
    setUploadedFiles([...uploadedFiles, ...newFiles]);
    setFormData({
      ...formData,
      uploadedFiles: [...uploadedFiles, ...newFiles],
    });
  };

  const handleRemoveFile = (index) => {
    const updatedFiles = [...uploadedFiles];
    updatedFiles.splice(index, 1);
    setFormData({ ...formData, uploadedFiles: [updatedFiles] });
    setUploadedFiles(updatedFiles);
  };

  const handleSubmit = async () => {
    const formData = new FormData();

    console.log("my.... files");
    console.log(files);
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
      formData.append("id", files[i].id);
    }

    await axios
      .post(`${BASE_URL}/api/videos`, formData)
      .then((response) => {
        console.log(response);
        setUploadedFiles([]);
      })
      .catch((error) => {
        setUploadedFiles([]);
      });
  };

  // questine part

  const [questine, setQuestine] = useState("");
  const [answer, setAnswer] = useState("");
  const [wrongOne, setWrongOne] = useState("");
  const [wrongTwo, setWrongTwo] = useState("");

  const handleQuestineChange = (e) => {
    setQuestine(e.target.value);
  };
  const handleAnswerChange = (e) => {
    setAnswer(e.target.value);
  };
  const handleWrongOneChange = (e) => {
    setWrongOne(e.target.value);
  };
  const handleWrongTwoChange = (e) => {
    setWrongTwo(e.target.value);
  };

  const handleQuestineSubmit = async () => {
    let obj = {
      questine: questine,
      answer: answer,
      wrongOne: wrongOne,
      wrongTwo: wrongTwo,
    };
    await axios
      .post(`${BASE_URL}/api/questine`, obj)
      .then((response) => {
        setQuestine("");
        setWrongOne("");
        setWrongTwo("");
        setAnswer("");
      })
      .catch((error) => {});
  };

  return (
    <>
      <div className="d-flex flex-column ">
        <div className="d-flex flex-column" style={{ width: "300px" }}>
          <label htmlFor="">Questine</label>
          <input type="text" value={questine} onChange={handleQuestineChange} />
        </div>
        <div className="d-flex flex-column" style={{ width: "300px" }}>
          <label htmlFor="">correct</label>
          <input type="text" value={answer} onChange={handleAnswerChange} />
        </div>
        <div className="d-flex flex-column" style={{ width: "300px" }}>
          <label htmlFor="">wrong</label>
          <input type="text" value={wrongOne} onChange={handleWrongOneChange} />
        </div>
        <div className="d-flex flex-column" style={{ width: "300px" }}>
          <label htmlFor="">wrong</label>
          <input type="text" value={wrongTwo} onChange={handleWrongTwoChange} />
        </div>
        <button className="cn-btn-upload" onClick={handleQuestineSubmit}>
          Submit
        </button>
      </div>

      <div children="d-flex flex-colomn" style={{ marginTop: "100px" }}>
        <div className="cn-outer w-100">
          <div>
            <div className="formbold-main-wrapper">
              <div className="formbold-form-wrapper">
                <div>
                  <div className="formbold-mb-5">
                    <button className="cn-btn-upload" onClick={handleSubmit}>
                      Upload{" "}
                    </button>
                  </div>
                  <div className="cn-padding-border">
                    <div className="d-flex flex-column justify-content-center cn-border-dashed cn-border-dashed-2">
                      <div className="d-flex justify-content-center">
                        <img
                          src="https://res.cloudinary.com/dwbijsru5/image/upload/v1700560361/Upload_icon_pxxjvo.svg"
                          alt=""
                        />
                      </div>
                      <div
                        className="formbold-mb-5 formbold-file-input d-flex justify-content-center"
                        onDrop={handleDrop}
                        onDragOver={(e) => e.preventDefault()}
                      >
                        <input
                          type="file"
                          name="file"
                          id="file"
                          hidden
                          onChange={handleFileSelect}
                        />
                        <label for="file">
                          <div>
                            <span className="formbold-drop-file cn-drag-text">
                              Drag & drop files or
                            </span>
                            <span className="formbold-browse cn-browse-text">
                              {" "}
                              Browse{" "}
                            </span>
                          </div>
                        </label>
                      </div>
                      <div className="d-flex justify-content-center">
                        <span className="cn-support-text">
                          Supported formats: video format
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {uploadedFiles.length !== 0 ? (
          <div className="mt-3 cn-outer w-100 " id="uploaded-files">
            <h4 className="cn-uploades-files d-flex justify-content-end ">
              Uploaded Files: {uploadedFiles.length}/{uploadedFiles.length}{" "}
            </h4>
            <div className="d-flex flex-column align-items-end flex-wrap gap-3 justify-content-end ">
              {uploadedFiles.map((file, index) => (
                <>
                  {/* <div className="d-flex flex-column w-45">.                             
                  </div> */}
                  <div
                    className="d-flex flex-column justify-content-end  form-three-w-45 file-size-tooltip cursor-pointer"
                    title={`${file.size} bytes`}
                    key={index}
                  >
                    <div className="file-added d-flex justify-content-between w-100 ">
                      <div className="">{file.name} </div>
                      <div className="">
                        <img
                          onClick={() => handleRemoveFile(index)}
                          src="https://res.cloudinary.com/dwbijsru5/image/upload/v1700564778/Vector_10_of5chq.png"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default VideoUpload;
