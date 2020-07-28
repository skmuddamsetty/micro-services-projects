import axios from 'axios';
import buildClient from '../api/build-client';

const LandingPage = ({ currentUser }) => {
  console.log(currentUser);
  return <h1>Hello From Next!</h1>;
};

LandingPage.getInitialProps = async (context) => {
  const client = buildClient(context);
  const { data } = await client.get('/api/users/currentuser');
  return data;
};

export default LandingPage;
