import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button
} from '@mui/material';

const JobForm = ({ job, category, onSave, onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (job) {
      setTitle(job.title);
      setDescription(job.description);
    } else {
      setTitle('');
      setDescription('');
    }
  }, [job]);

  const handleSubmit = () => {
    const newJob = { title, description, category: job ? job.category : category, id: job ? job.id : Date.now() };
    onSave(newJob);
  };

  return (
    <Dialog open={Boolean(category || job)} onClose={onClose}>
      <DialogTitle>{job ? 'Edit Job' : 'Add Job'}</DialogTitle>
      <DialogContent>
        <TextField
          label="Job Title"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Description"
          fullWidth
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          {job ? 'Update' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default JobForm;
