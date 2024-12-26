import React, { useEffect, useRef, useState } from "react";
import "./styles.scss";
import exportAsImage from "./exportAsImageold"; // Assuming export logic
import { Input, Spin } from "antd";
import FileUpload from "../FileUpload/Index";
import MY_Post from "../../asset/MY_Post.png";
import MY_Post_2 from "../../asset/MY_Post_2.png";
import downloadImg from "../../asset/download.png";
import { useParams } from "react-router-dom";
import NotFound from "../NotFound/NotFound";

const MediaViewer = () => {
  const { name: urlNameVal } = useParams();
  const urlName = urlNameVal === "welcome-relly" ? "CRPF" : urlNameVal;
  
  const [fileList, setFileList] = useState([]);
  const [name, setName] = useState("");
  const [trxSlot, setTrxSlot] = useState("");
  const [trx, setTrx] = useState("");  // For MY_Post_2
  const [salary, setSalary] = useState("");  // For MY_Post_2
  const [previewUser, setPreviewUser] = useState(null);
  
  const exportRef = useRef();
  const [isValidDownload, setIsValidDownload] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (previewUser && name && (trxSlot || trx) && (urlName === "MY_Post" ? trxSlot : true)) {
      setIsValidDownload(true);
    } else {
      setIsValidDownload(false);
    }
  }, [previewUser, name, trxSlot, trx, salary, urlName]);

  const isValid = () => {
    switch (true) {
      case urlName === "MY_Post":
      case urlName === "MY_Post_2":
        return true;
      default:
        return false;
    }
  };

  const handleDownload = async () => {
    if (isValidDownload) {
      setLoading(true);

      try {
        await exportAsImage(exportRef.current, `${name || "export"}.png`);
      } catch (error) {
        console.error("Error exporting image:", error);
      }

      setLoading(false);
      setName("");
      setTrxSlot("");
      setTrx("");
      setSalary("");
      setPreviewUser(null);
      setFileList([]);
    }
  };

  return isValid() ? (
    <div className="p-10">
      <div className="two-grid">
        {/* Background and User Image Section */}
        <div className="createBgScreen">
          <div className="position-relative border-div">
            <div ref={exportRef}>
              {previewUser && (
                <img
                  src={previewUser}
                  alt="previewUser"
                  className={`userImg ${urlName}-img`}
                />
              )}
              
              {/* Show Background Image Based on urlName */}
              {urlName === "MY_Post" && (
                <img src={MY_Post} alt="MY_Post" className="bgimage" />
              )}
              {urlName === "MY_Post_2" && (
                <img src={MY_Post_2} alt="MY_Post_2" className="bgimage" />
              )}

              {/* Show Name Field */}
              {name && (
                <div className={`userName ${urlName}-name`}>
                  <div style={{ wordBreak: "break-word" }}>{name}</div>
                </div>
              )}

              {/* Show TRX Slot or TRX Field */}
              {urlName === "MY_Post" && trxSlot && (
                <div className={`trxSlot ${urlName}-name`}>
                  <div style={{ wordBreak: "break-word" }}>{trxSlot}</div>
                </div>
              )}
              {urlName === "MY_Post_2" && trx && (
                <div className={`trxSlot ${urlName}-name`}>
                  <div style={{ wordBreak: "break-word" }}>{trx}</div>
                </div>
              )}

              {/* Show Salary Field for MY_Post_2 */}
              {urlName === "MY_Post_2" && salary && (
                <div className={`salaryField ${urlName}-name`}>
                  <div style={{ wordBreak: "break-word" }}><span className="salary-text-con">₹</span>{salary}</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* File Upload and Input Fields */}
        <div className="file-btn-wrapper">
          <div className="d-flex flex-direction-column justify-content-center w-100">
            <div className="mb-25">
              <FileUpload
                fileList={fileList}
                setFileList={setFileList}
                setPreviewUser={setPreviewUser}
              />
            </div>

            {/* Name Input */}
            <div className="mb-25 user-name file-upload-wrapper">
              <h2 className="text viewText">Enter Your Name Here</h2>
              <h3 className="text viewSubText">આપનું નામ અહીં લખો.</h3>
              <div className="pt-10">
                <Input
                  value={name}
                  onChange={({ target: { value } }) => {
                    setName(value);
                  }}
                  className="w-full"
                />
              </div>

              {/* TRX Slot Input for MY_Post */}
              {urlName === "MY_Post" && (
                <>
                  <br />
                  <h2 className="text viewText">Enter Your SLOT - TRX</h2>
                  <h3 className="text viewSubText">તમારો SLOT - TRX અહીં લખો.</h3>
                  <div className="pt-10">
                    <Input
                      value={trxSlot}
                      onChange={({ target: { value } }) => {
                        setTrxSlot(value);
                      }}
                      className="w-full"
                    />
                  </div>
                </>
              )}

              {/* TRX Input for MY_Post_2 */}
              {urlName === "MY_Post_2" && (
                <>
                  <br />
                  <h2 className="text viewText">Enter Your TRX</h2>
                  <h3 className="text viewSubText">તમારો TRX અહીં લખો.</h3>
                  <div className="pt-10">
                    <Input
                      value={trx}
                      onChange={({ target: { value } }) => {
                        setTrx(value);
                      }}
                      className="w-full"
                    />
                  </div>
                </>
              )}

              {/* Salary Input for MY_Post_2 */}
              {urlName === "MY_Post_2" && (
                <>
                  <br />
                  <h2 className="text viewText">Enter Your Salary</h2>
                  <h3 className="text viewSubText">તમારો Salary અહીં લખો.</h3>
                  <div className="pt-10">
                    <Input
                      value={salary}
                      onChange={({ target: { value } }) => {
                        setSalary(value);
                      }}
                      className="w-full"
                    />
                  </div>
                </>
              )}
            </div>

            {/* Download Button */}
            <div className="position-relative m-auto downloadWidth">
              <Spin spinning={loading}>
                <img
                  src={downloadImg}
                  alt="downloadImg"
                  className="downloadIcon pointer w-250px"
                  onClick={handleDownload}
                  style={{
                    filter: isValidDownload ? "" : "grayscale(100%)",
                    pointerEvents: isValidDownload ? "all" : "none",
                  }}
                />
              </Spin>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <NotFound />
  );
};

export default MediaViewer;






// import React, { useEffect, useRef, useState } from "react";
// import "./styles.scss";
// import exportAsImage from "./exportAsImageold";
// import { Input, Spin } from "antd";
// import FileUpload from "../FileUpload/Index";
// import MY_Post from "../../asset/MY_Post.png";
// import MY_Post_2 from "../../asset/madhuvan_kosad.png"; // Add the required asset for MY_Post_2
// import { useParams } from "react-router-dom";
// import NotFound from "../NotFound/NotFound";

// const MediaViewer = () => {
//   const { name: urlNameVal } = useParams();
//   const urlName = urlNameVal === "welcome-relly" ? "CRPF" : urlNameVal;
//   const [fileList, setFileList] = useState([]);
//   const [name, setName] = useState("");
//   const [trxSlot, setTrxSlot] = useState("");
//   const [salary, setSalary] = useState(""); // Added field for Salary
//   const [previewUser, setPreviewUser] = useState();
//   const exportRef = useRef();
//   const [isValidDownload, setIsValidDownload] = useState(false);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     // Enable download only if all inputs are filled
//     if (previewUser && name && trxSlot && salary) {
//       setIsValidDownload(true);
//     } else {
//       setIsValidDownload(false);
//     }
//   }, [previewUser, name, trxSlot, salary]);

//   const isValid = () => {
//     switch (urlName) {
//       case "MY_Post":
//       case "MY_Post_2":
//         return true;
//       default:
//         return false;
//     }
//   };

//   const handleDownload = async () => {
//     if (isValidDownload) {
//       setLoading(true);

//       try {
//         // Export the image with the PNG format
//         await exportAsImage(exportRef.current, `${name || "export"}.png`);
//       } catch (error) {
//         console.error("Error exporting image:", error);
//       }

//       setLoading(false);
//       setName("");
//       setPreviewUser(null);
//       setFileList([]);
//       setTrxSlot("");
//       setSalary("");
//     }
//   };

//   return isValid() ? (
//     <div className="p-10">
//       <div className="two-grid">
//         {/* Main Content Section */}
//         <div className="createBgScreen">
//           <div className="position-relative border-div">
//             <div ref={exportRef}>
//               {/* Display uploaded user image */}
//               {previewUser && (
//                 <img
//                   src={previewUser}
//                   alt="previewUser"
//                   className={`userImg ${urlName}-img`}
//                 />
//               )}

//               {/* Display different background images based on URL name */}
//               {urlName === "MY_Post" && (
//                 <img
//                   src={MY_Post}
//                   alt="MY_Post"
//                   className="bgimage"
//                 />
//               )}
//               {urlName === "MY_Post_2" && (
//                 <img
//                   src={MY_Post_2}
//                   alt="MY_Post_2"
//                   className="bgimage"
//                 />
//               )}

//               {/* User-entered name */}
//               {name && (
//                 <div className={`userName ${urlName}-name`}>
//                   <div style={{ wordBreak: "break-word" }}>{name}</div>
//                 </div>
//               )}

//               {/* User-entered TRX slot */}
//               {trxSlot && (
//                 <div className={`trxSlot ${urlName}-name`}>
//                   <div style={{ wordBreak: "break-word" }}>{trxSlot}</div>
//                 </div>
//               )}

//               {/* User-entered salary */}
//               {salary && (
//                 <div className={`salaryField ${urlName}-name`}>
//                   <div style={{ wordBreak: "break-word" }}>Salary: {salary}</div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* File Input and Details Section */}
//         <div className="file-btn-wrapper">
//           <div className="d-flex flex-direction-column justify-content-center w-100">
//             {/* File Upload */}
//             <div className="mb-25">
//               <FileUpload
//                 fileList={fileList}
//                 setFileList={setFileList}
//                 setPreviewUser={setPreviewUser}
//               />
//             </div>

//             {/* Name Input */}
//             <div className="mb-25 user-name file-upload-wrapper">
//               <h2 className="text viewText">Enter Your Name Here</h2>
//               <div className="pt-10">
//                 <Input
//                   value={name}
//                   onChange={({ target: { value } }) => {
//                     setName(value);
//                   }}
//                   className="w-full"
//                 />
//               </div>

//               {/* TRX Input */}
//               <br />
//               <h2 className="text viewText">Enter Your SLOT - TRX</h2>
//               <div className="pt-10">
//                 <Input
//                   value={trxSlot}
//                   onChange={({ target: { value } }) => {
//                     setTrxSlot(value);
//                   }}
//                   className="w-full"
//                 />
//               </div>

//               {/* Salary Input only for MY_Post_2 */}
//               {urlName === "MY_Post_2" && (
//                 <>
//                   <br />
//                   <h2 className="text viewText">Enter Your Salary</h2>
//                   <div className="pt-10">
//                     <Input
//                       value={salary}
//                       onChange={({ target: { value } }) => {
//                         setSalary(value);
//                       }}
//                       className="w-full"
//                     />
//                   </div>
//                 </>
//               )}
//             </div>

//             {/* Download Button */}
//             <div className="position-relative m-auto downloadWidth">
//               <Spin spinning={loading}>
//                 <img
//                   src={require("../../asset/download.png")}
//                   alt="downloadImg"
//                   className="downloadIcon pointer w-250px"
//                   onClick={handleDownload}
//                   style={{
//                     filter: isValidDownload ? "" : "grayscale(100%)",
//                     pointerEvents: isValidDownload ? "all" : "none",
//                   }}
//                 />
//               </Spin>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   ) : (
//     <NotFound />
//   );
// };

// export default MediaViewer;
