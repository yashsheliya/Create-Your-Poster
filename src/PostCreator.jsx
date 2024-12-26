import React, { useState } from "react";
import { Input, Button, Spin } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useRef } from "react";
import html2canvas from "html2canvas";

const PostCreator = () => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const postRef = useRef();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleDownload = () => {
    setLoading(true);
    html2canvas(postRef.current).then((canvas) => {
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = "custom-post.png";
      link.click();
      setLoading(false);
    });
  };

  return (
    <div className="post-creator">
      <h2>Create Your Post</h2>
      <div>
        <Input
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-20"
        />
      </div>

      <div>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
      </div>

      {image && (
        <div
          className="post-preview"
          ref={postRef}
          style={{
            position: "relative",
            width: "300px",
            height: "400px",
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            textAlign: "center",
            color: "white",
            paddingTop: "50%",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontSize: "24px",
              fontWeight: "bold",
            }}
          >
            {name}
          </div>
        </div>
      )}

      <div className="actions">
        <Button
          icon={<UploadOutlined />}
          type="primary"
          disabled={!name || !image}
          onClick={handleDownload}
        >
          {loading ? <Spin /> : "Download Post"}
        </Button>
      </div>
    </div>
  );
};

export default PostCreator;
