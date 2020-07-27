import axios from 'axios';
import { useState } from 'react';
export default ({ url, method, body }) => {
  const [errors, setErrors] = useState([]);
  const doRequest = async () => {
    try {
      setErrors(null);
      const response = await axios[method](url, body);
      return response.data;
    } catch (error) {
      setErrors(
        <div className='alert alert-danger'>
          <ul className='my-0'>
            {error.response.data.errors.map((err) => {
              return <li key={err.message}>{err.message}</li>;
            })}
          </ul>
        </div>
      );
    }
  };
  return { doRequest, errors };
};
