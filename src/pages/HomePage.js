// import React, { useEffect, useState } from 'react';
// import { getJobs, deleteJob } from '../services/auth';
// import JobList from '../components/JobList';
// import JobForm from '../components/JobForm';
// import {
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   Typography,
//   Button
// } from '@mui/material';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// const HomePage = () => {
//   const [jobs, setJobs] = useState([]);
//   const [editingJob, setEditingJob] = useState(null);
//   const token = localStorage.getItem('token');

//   useEffect(() => {
//     const fetchJobs = async () => {
//       if (token) {
//         const response = await getJobs(token);
//         setJobs(response.data.jobs);
//       }
//     };
//     fetchJobs();
//   }, [token]);

//   const handleDelete = async (jobId) => {
//     try {
//       await deleteJob(jobId, token);
//       setJobs(jobs.filter(job => job.id !== jobId));
//     } catch (error) {
//       console.error('Error deleting job', error);
//     }
//   };

//   const handleSave = () => {
//     setEditingJob(null);
//     const fetchJobs = async () => {
//       if (token) {
//         const response = await getJobs(token);
//         setJobs(response.data.jobs);
//       }
//     };
//     fetchJobs();
//   };

//   return (
//     <div style={{ padding: '20px' }}>
//       <Typography variant="h4" align="center" gutterBottom>
//         Browse Open Positions by Category
//       </Typography>
//       <Typography variant="subtitle1" align="center" gutterBottom>
//         We are always on the lookout for talented people
//       </Typography>
//       <Accordion>
//         <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//           <Typography>Sales & Marketing</Typography>
//         </AccordionSummary>
//         <AccordionDetails>
//           <JobList
//             jobs={jobs.filter(job => job.category === 'Sales & Marketing')}
//             onEdit={setEditingJob}
//             onDelete={handleDelete}
//           />
//         </AccordionDetails>
//       </Accordion>
//       <Accordion>
//         <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//           <Typography>Creative</Typography>
//         </AccordionSummary>
//         <AccordionDetails>
//           <JobList
//             jobs={jobs.filter(job => job.category === 'Creative')}
//             onEdit={setEditingJob}
//             onDelete={handleDelete}
//           />
//         </AccordionDetails>
//       </Accordion>
//       {/* Repeat Accordion components for other categories... */}
//       <JobForm job={editingJob} token={token} onSave={handleSave} />
//     </div>
//   );
// };

// export default HomePage;


import React, { useEffect, useState } from 'react';
import JobList from '../components/JobList';
import JobForm from '../components/JobForm';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const HomePage = () => {
  const [jobs, setJobs] = useState([]);
  const [editingJob, setEditingJob] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const storedJobs = JSON.parse(localStorage.getItem('jobs')) || [];
    setJobs(storedJobs);
  }, []);

  const saveJobsToLocalStorage = (jobs) => {
    localStorage.setItem('jobs', JSON.stringify(jobs));
  };

  const handleDelete = (jobId) => {
    if (window.confirm('Are you sure to delete this job?')) {
      const updatedJobs = jobs.filter(job => job.id !== jobId);
      setJobs(updatedJobs);
      saveJobsToLocalStorage(updatedJobs);
    }
  };

  const handleSave = (newJob) => {
    let updatedJobs;
    if (editingJob) {
      updatedJobs = jobs.map(job => job.id === editingJob.id ? newJob : job);
    } else {
      newJob.id = Date.now();
      updatedJobs = [...jobs, newJob];
    }
    setJobs(updatedJobs);
    saveJobsToLocalStorage(updatedJobs);
    setEditingJob(null);
    setSelectedCategory(null);
  };

  const handleEdit = (job) => {
    setEditingJob(job);
    setSelectedCategory(job.category);
  };

  const categories = [
    'Sales & Marketing',
    'Creative',
    'Human Resource',
    'Administration',
    'Digital Marketing',
    'Development',
    'Engineering'
  ];

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Browse Open Positions by Category
      </Typography>
      <Typography variant="subtitle1" align="center" gutterBottom>
        We are always on the lookout for talented people
      </Typography>
      {categories.map(category => (
        <Accordion key={category}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{category}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <JobList
              jobs={jobs.filter(job => job.category === category)}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
            <Button variant="contained" color="primary" onClick={() => { setSelectedCategory(category); setEditingJob(null); }}>
              + Add Job
            </Button>
          </AccordionDetails>
        </Accordion>
      ))}
      {(selectedCategory || editingJob) && (
        <JobForm
          job={editingJob}
          category={selectedCategory}
          onSave={handleSave}
          onClose={() => { setSelectedCategory(null); setEditingJob(null); }}
        />
      )}
    </div>
  );
};

export default HomePage;

