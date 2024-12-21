import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { userTypeContext } from '../context/context';
import { Link } from 'react-router-dom';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { userType, setUserType } = useContext(userTypeContext);

  useEffect(() => {
    if (userType) {
      navigate('/dashboard');
    }
    else if (localStorage.getItem('userId')) {
      setUserType("attendee");
      navigate('/dashboard');
    }
  }, [])

  const admin_username = process.env.REACT_APP_ADMIN_USERNAME;
  const admin_password = process.env.REACT_APP_ADMIN_PASSWORD;

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (admin_username === username && admin_password === password) {
      setUserType('admin');
      navigate('/dashboard');
    } else {
      setError('Login failed. Please try again.');
    }
    setLoading(false);
  };

  return (
    <Container>
      <Card>
        <Header>Admin Login</Header>
        <Form onSubmit={handleLogin}>
          <InputContainer>
            <Input
              type="text"
              placeholder="Email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </InputContainer>
          <InputContainer>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </InputContainer>
          {error && <Error>{error}</Error>}
          <Button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </Form>
        <p>Are you a attendee? <Link to="/login">Click Here</Link></p>
      </Card>
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg,rgba(47, 72, 106, 0.76),rgb(51, 54, 37));
`;

const Card = styled.div`
  background: #fff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 400px;
  animation: slideIn 0.5s ease-out;

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Header = styled.h1`
  font-size: 1.8rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 1rem;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const InputContainer = styled.div`
  margin-bottom: 1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;

  &:focus {
    border-color:rgb(52, 57, 61);
    outline: none;
  }
`;

const Button = styled.button`
  background: linear-gradient(135deg,rgb(16, 17, 17),rgb(45, 80, 81));
  color: #fff;
  border: none;
  padding: 0.8rem;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: linear-gradient(135deg,rgb(42, 59, 60),rgb(46, 49, 51));
  }

  &:disabled {
    background: #ddd;
    cursor: not-allowed;
  }
`;

const Error = styled.p`
  color: #ff4d4d;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

export default AdminLogin;
