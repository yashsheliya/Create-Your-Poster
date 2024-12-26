import React from "react";
import { Upload } from "antd";
import ImgCrop from "antd-img-crop";

const FileUpload = ({ setPreviewUser, fileList, setFileList }) => {
  const onChange = ({ fileList: newFileList }) => {
    const data = newFileList.map((d) => {
      delete d.error;
      delete d.response;
      d.status = "success";
      return d;
    });
    if (data[0]?.originFileObj) {
      const objectUrl = URL.createObjectURL(data[0].originFileObj);
      setPreviewUser(objectUrl);
    } else {
      setPreviewUser(null);
    }

    setFileList(data);
  };
  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };
  return (
    <div className="file-upload-wrapper">
      <div className="d-flex align-center">
        <div className="mr-10">
          <h2 className="text viewText">Upload Profile Pic</h2>
          <p className="text">
            Click on the upload icon to upload profile pic.
          </p>
        </div>
        <div>
          <ImgCrop rotationSlider>
            <Upload
              listType="picture-card"
              fileList={fileList}
              onChange={onChange}
              onPreview={onPreview}
            >
              {fileList.length < 1 && (
                <img
                  src={require("../../asset/user.png")}
                  className="userImg"
                />
              )}
            </Upload>
          </ImgCrop>
        </div>
      </div>
      <p className="des text">
        (You can repeat this step to choose another profile pic).
      </p>
    </div>
  );
};

export default FileUpload;
