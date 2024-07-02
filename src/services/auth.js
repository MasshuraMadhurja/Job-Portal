// import axios from 'axios';

// const API_URL = 'http://localhost:5000';

// export const register = async (userData) => {
//   try {
//     console.log('Registering user:', userData);
//     const response = await axios.post(`${API_URL}/users`, userData);
//     console.log('Registration response:', response.data);
//     return response;
//   } catch (error) {
//     console.error('Registration error:', error);
//     if (error.response && error.response.status === 400) {
//       throw new Error('User already exists');
//     }
//     throw error;
//   }import axios from 'axios';

//   const API_URL = 'http://localhost:5000';
  
//   export const register = async (userData) => {
//     try {
//       console.log('Registering user:', userData);
//       const response = await axios.post(`${API_URL}/users`, userData);
//       console.log('Registration response:', response.data);
//       return response;
//     } catch (error) {
//       console.error('Registration error:', error);
//       if (error.response && error.response.status === 400) {
//         throw new Error('User already exists');
//       }
//       throw error;
//     }
//   };
  
//   export const login = async (userData) => {
//     try {
//       console.log('Logging in user:', userData);
//       const response = await axios.get(`${API_URL}/users`, {
//         params: {
//           email: userData.email,
//           password: userData.password,
//         },
//       });
//       console.log('Login response:', response.data);
//       if (response.data.length) {
//         return { data: { token: 'mock-jwt-token', user: response.data[0] } };
//       } else {
//         throw new Error('Invalid email or password');
//       }
//     } catch (error) {
//       console.error('Login error:', error);
//       throw error;
//     }
//   };
  
//   export const createJob = async (jobData, token) => {
//     const response = await axios.post(`${API_URL}/jobs`, jobData, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     return response;
//   };
  
//   export const getJobs = async (token) => {
//     const response = await axios.get(`${API_URL}/jobs`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     return response;
//   };
  
//   export const updateJob = async (jobId, jobData, token) => {
//     const response = await axios.put(`${API_URL}/jobs/${jobId}`, jobData, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     return response;
//   };
  
//   export const deleteJob = async (jobId, token) => {
//     const response = await axios.delete(`${API_URL}/jobs/${jobId}`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     return response;
//   };
import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const register = async (userData) => {
  try {
    // Check if user with the same email already exists
    const existingUsers = await axios.get(`${API_URL}/users`, {
      params: { email: userData.email }
    });

    if (existingUsers.data.length > 0) {
      throw new Error('User already exists');
    }

    // If no existing user, proceed with registration
    const response = await axios.post(`${API_URL}/users`, userData);
    return response;
  } catch (error) {
    if (error.message === 'User already exists') {
      throw new Error('User already exists');
    }
    throw error;
  }
};

export const login = async (userData) => {
  try {
    const response = await axios.get(`${API_URL}/users`, {
      params: { email: userData.email }
    });

    if (response.data.length > 0) {
      const user = response.data[0];
      if (user.password === userData.password) {
        return { data: { token: 'mock-jwt-token', user: user } };
      } else {
        throw new Error('Invalid password');
      }
    } else {
      throw new Error('Invalid email or password');
    }
  } catch (error) {
    throw error;
  }
};

export const createJob = async (jobData, token) => {
  const response = await axios.post(`${API_URL}/jobs`, jobData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response;
};

export const getJobs = async (token) => {
  const response = await axios.get(`${API_URL}/jobs`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response;
};

export const updateJob = async (jobId, jobData, token) => {
  const response = await axios.put(`${API_URL}/jobs/${jobId}`, jobData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response;
};

export const deleteJob = async (jobId, token) => {
  const response = await axios.delete(`${API_URL}/jobs/${jobId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response;
};


  