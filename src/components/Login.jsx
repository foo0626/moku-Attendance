//ユーザー登録（アカウント作成）
import React, { useState } from 'react';
import { supabase } from '../services/supabase_api';
import { Box, Input, Button, FormControl, FormLabel, Heading } from '@chakra-ui/react';
import { validateEmail, validatePassword } from '../utils/validation';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateSession } from '../Actions';


const homeUrl = process.env.PUBLIC_URL;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const dispatch = useDispatch()
  const navigate = useNavigate()


  const handleSubmit = async (event) => {
    event.preventDefault(); //デフォルトの動作を抑制する

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password: password,
    });
    if (error) {
      setMessage('メールアドレス、またはパスワードが間違っています');
    }else{
      navigate(`${homeUrl}/`)
      dispatch(updateSession(data));
    }
  };

  // 入力値(メールアドレス、パスワード)の検証
  const validate = () => {
    return validateEmail(email) && validatePassword(password);
  };


  return (
    <Box maxW="sm" mx="auto" mt={8} p={4}>
      <Heading mb={4}>ログイン</Heading>
      <form onSubmit={handleSubmit}>
        <FormControl id="email" mb={4}>
          <FormLabel>メールアドレス</FormLabel>
          <Input
            type="email"
            placeholder="メールアドレス"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </FormControl>

        <FormControl id="password" mb={4}>
          <FormLabel>パスワード</FormLabel>
          <Input
            type="password"
            placeholder="パスワード"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </FormControl>

        <Button colorScheme="blue" type="submit" disabled={!validate()}>ログイン</Button>
      </form>
      <div>
        <Link to={`${homeUrl}/userregistration`}>アカウント作成</Link>
      </div>
    </Box>
  );
};

export default Login;
