//ユーザー登録（アカウント作成）
import React, { useState } from 'react';
import { supabase } from '../services/supabase_api';
import { Box, Input, Button, FormControl, FormLabel, Heading, Radio, RadioGroup } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { updateSession } from '../Actions';
import { useNavigate } from 'react-router-dom';

const homeUrl = process.env.PUBLIC_URL;


const UserRegistration = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [gender, setGender] = useState('');
  const [message, setMessage] = useState('');

  const dispatch = useDispatch()
  const navigate = useNavigate()


  const handleSubmit = async (event) => {
    setMessage('アカウント作成の処理中です');
    event.preventDefault(); // デフォルトの動作を抑制する
    const { data,error } = await supabase.auth.signUp(
        {
          email: email,
          password: password,
          options: {
            data: {
              username: username,
              gender: gender,
              admin: false,
            }
          }
        }
      )

      dispatch(updateSession(data));
      navigate(`${homeUrl}/`)


    if (error) {
      console.error(error.message);
      setMessage('アカウントを作成できません');
    } 
  };

  



  return (
    <Box maxW="sm" mx="auto" mt={8} p={4}>
      <Heading mb={4}>ユーザー登録フォーム</Heading>
      <form onSubmit={handleSubmit}>
        <FormControl id="email" mb={4}>
          <FormLabel>Email</FormLabel>
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

        <FormControl id="username" mb={4}>
          <FormLabel>ユーザー名</FormLabel>
          <Input
            type="text"
            placeholder="ユーザー名"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </FormControl>

        <FormControl id="gender" mb={4}>
          <FormLabel>性別</FormLabel>
          <RadioGroup value={gender} onChange={(value) => setGender(value)}>
            <Radio value="男性">男性</Radio>
            <Radio value="女性">女性</Radio>
          </RadioGroup>
        </FormControl>

        <Button colorScheme="blue" type="submit">登録</Button>
      </form>
    </Box>
  );
};

export default UserRegistration;
