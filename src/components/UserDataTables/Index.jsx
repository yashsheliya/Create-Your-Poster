import React, { useEffect, useState } from "react";
import { Avatar, Button, Table } from "antd";
import "./styles.scss";
import { onValue, ref } from "firebase/database";
import { database } from "../../firebaseConfig";
import { DownloadOutlined, EyeFilled } from "@ant-design/icons";
import exportFromJSON from "export-from-json";

const UserDataTable = () => {
  const [loading, setLoading] = useState(false);
  const columns = [
    {
      title: "Image",
      dataIndex: "url",
      key: "url",
      render: (_, record) => (
        <a
          download={`${record.name}.jpg`}
          href={record.url}
          title={`${record.name}.jpg`}
          target='_blank'>
          <Avatar shape='square' size={50} src={record.url} />
        </a>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      filters: [
        { text: "Joe", value: "Joe" },
        { text: "Jim", value: "Jim" },
      ],
      sorter: (a, b) => a.name.length - b.name.length,
      ellipsis: true,
    },
    {
      title: "Phone No",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Domain",
      dataIndex: "domain",
      key: "domain",
      onFilter: (value, record) => record.domain.indexOf(value) === 0,
    },
    {
      title: "View",
      dataIndex: "view",
      key: "view",
      render: (_, record) => (
        <a href={`/${record.domain}?userId=${record.id}`} target='_blank'>
          <EyeFilled style={{ color: "#000000", fontSize: 22 }} />
        </a>
      ),
    },
  ];

  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);
    const query = ref(database);
    return onValue(query, (snapshot) => {
      const data = snapshot.val();
      console.log("project", data);
  
      // Initialize an empty array to store transformed data
      const array = [];
  
      if (data) {  // Ensure 'data' is not null or undefined
        Object.keys(data).forEach((domainVal) => {
          const domainData = data[domainVal];
  
          // Ensure domainData is an object and not null or undefined
          if (domainData && typeof domainData === 'object') {
            Object.keys(domainData).forEach((userInfo) => {
              array.push({
                domain: domainVal,
                ...domainData[userInfo], // Spread user data into the array object
                id: userInfo,
              });
            });
          } else {
            console.warn(`No valid data found for domain: ${domainVal}`);
          }
        });
      } else {
        console.warn("No data found in the Firebase snapshot.");
      }
  
      // Set the transformed data into the state
      setData(array);
      setLoading(false);
    });
  };
  

  return (
    <div className='table-wrappers'>
      <h2 className='mb-20'>
        <center>User Info</center>
      </h2>
      <div className='container mx-auto'>
        <div className='download-btn'>
          <Button
            icon={<DownloadOutlined />}
            onClick={() => {
              const fileName = "download";
              const exportType = exportFromJSON.types.csv;
              exportFromJSON({ data, fileName, exportType });
            }}>
            Export
          </Button>
        </div>
        <Table
          loading={loading}
          columns={columns}
          dataSource={data}
          pagination={false}
        />
      </div>
    </div>
  );
};

export default UserDataTable;
