import React, { useState } from 'react';
import { Table, Button, Upload, message, Modal, Input, Space } from 'antd';
import { UploadOutlined, DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';

const HrPolicies = () => {
  const [documents, setDocuments] = useState([
    { id: 1, title: 'Employee Handbook', fileUrl: '/path/to/handbook.pdf' },
    { id: 2, title: 'Attendance Policy', fileUrl: '/path/to/attendance-policy.pdf' },
    { id: 3, title: 'Leave Policy', fileUrl: '/path/to/leave-policy.pdf' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle document upload
  const handleUpload = ({ file, onSuccess, onError }) => {
    setLoading(true);
    // Simulate file upload process
    setTimeout(() => {
      const newDoc = { id: documents.length + 1, title: file.name, fileUrl: '/path/to/' + file.name };
      setDocuments([...documents, newDoc]);
      setLoading(false);
      message.success('File uploaded successfully');
      onSuccess();
    }, 1000);
  };

  // Handle document delete
  const handleDelete = (docId) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this document?',
      content: 'This action cannot be undone.',
      okText: 'Yes',
      cancelText: 'No',
      onOk: () => {
        setDocuments(documents.filter(doc => doc.id !== docId));
        message.success('Document deleted successfully');
      },
    });
  };

  // Handle document edit/update (simple filename change for demo)
  const handleEdit = (docId) => {
    const newTitle = prompt('Enter the new document title');
    if (newTitle) {
      const updatedDocuments = documents.map(doc =>
        doc.id === docId ? { ...doc, title: newTitle } : doc
      );
      setDocuments(updatedDocuments);
      message.success('Document updated successfully');
    }
  };

  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredDocuments = documents.filter(doc =>
    doc.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      title: 'Document Title',
      dataIndex: 'title',
      key: 'title',
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record.id)}
            style={{ marginRight: 8 }}
          >
            Edit
          </Button>
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
            type="danger"
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <h2 style={{ marginBottom: 20 }}> HR Policy Documents</h2>

      {/* Search Bar */}
      <Input
        placeholder="Search by document title"
        value={searchTerm}
        onChange={handleSearch}
        style={{ width: 300, marginBottom: 20 }}
        prefix={<SearchOutlined />}
      />

      {/* Upload Document */}
      <Upload
        customRequest={handleUpload}
        showUploadList={false}
        accept=".pdf, .doc, .docx"
      >
        <Button
          icon={<UploadOutlined />}
          type="primary"
          style={{ marginBottom: 20 }}
          loading={loading}
        >
          {loading ? 'Uploading...' : 'Upload Document'}
        </Button>
      </Upload>

      {/* Table of Documents */}
      <Table
        columns={columns}
        dataSource={filteredDocuments}
        rowKey="id"
        pagination={false}
      />
    </div>
  );
};

export default HrPolicies;
