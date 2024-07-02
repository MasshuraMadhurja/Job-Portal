// import React from 'react';
// import { List, ListItem, ListItemText, IconButton } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';

// const JobList = ({ jobs, onEdit, onDelete }) => {
//   return (
//     <List>
//       {jobs.map((job) => (
//         <ListItem key={job.id}>
//           <ListItemText
//             primary={job.title}
//             secondary={job.description}
//           />
//           <IconButton edge="end" aria-label="edit" onClick={() => onEdit(job)}>
//             <EditIcon />
//           </IconButton>
//           <IconButton edge="end" aria-label="delete" onClick={() => onDelete(job.id)}>
//             <DeleteIcon />
//           </IconButton>
//         </ListItem>
//       ))}
//     </List>
//   );
// };

// export default JobList;

import React from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const JobList = ({ jobs, onEdit, onDelete }) => {
  return (
    <List>
      {jobs.map(job => (
        <ListItem key={job.id} divider>
          <ListItemText
            primary={job.title}
            secondary={job.description}
          />
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="edit" onClick={() => onEdit(job)}>
              <EditIcon />
            </IconButton>
            <IconButton edge="end" aria-label="delete" onClick={() => onDelete(job.id)}>
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
};

export default JobList;

