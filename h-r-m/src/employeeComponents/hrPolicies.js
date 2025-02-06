import React from 'react';
import { Card, Typography, Tag, Button } from 'antd';
import { FileProtectOutlined, DownloadOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const HRPolicyDocuments = () => {
  const policyDocuments = [
    {
      id: 1,
      title: 'Company Attendance Policy',
      description: 'Comprehensive guide to attendance rules and regulations',
      fileType: 'PDF',
      size: '2.5 MB',
      lastUpdated: '2024-01-15'
    },
    {
      id: 2,
      title: 'Leave and Vacation Policy',
      description: 'Detailed explanation of leave types and procedures',
      fileType: 'PDF',
      size: '3.2 MB',
      lastUpdated: '2024-01-10'
    },
    {
      id: 3,
      title: 'Employee Conduct Guidelines',
      description: 'Code of conduct and professional behavior expectations',
      fileType: 'PDF',
      size: '1.8 MB',
      lastUpdated: '2024-01-20'
    }
  ];

  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f2f5' }}>
      <Title level={2} style={{ marginBottom: '20px' }}>
        <FileProtectOutlined /> HR Policy Documents
      </Title>

      <div style={{ display: 'grid', gap: '16px' }}>
        {policyDocuments.map((doc) => (
          <Card 
            key={doc.id}
            hoverable
            style={{ 
              borderRadius: '8px', 
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)' 
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <Title level={4} style={{ margin: 0 }}>{doc.title}</Title>
                <Paragraph type="secondary" style={{ margin: '8px 0' }}>
                  {doc.description}
                </Paragraph>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <Tag color="blue">{doc.fileType}</Tag>
                  <Tag color="green">{doc.size}</Tag>
                  <Tag color="purple">Updated: {doc.lastUpdated}</Tag>
                </div>
              </div>
              <Button 
                type="primary" 
                icon={<DownloadOutlined />}
                // Placeholder for download functionality
                onClick={() => console.log(`Downloading ${doc.title}`)}
              >
                Download
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HRPolicyDocuments;