//ユーザー登録（アカウント作成）
import React, { useState } from 'react';
import { supabase } from '../services/supabase_api';
import { useDispatch } from 'react-redux';
import { updateSession } from '../Actions';
import { useNavigate, Link as ReactRouterLink  } from 'react-router-dom';
import { fetchMember } from '../services/memberService';
import {
  Box,
  Button,
  Center,
  Container,
  Divider,
  Text,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Link as ChakraLink,
} from '@chakra-ui/react'

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
        }
      )
      
      if (error) {
        console.error(error.message);
        setMessage('アカウントを作成できません');
      }else{
        const { error } = await supabase
          .from('members')
          .insert({user_id: data.user.id, gender, username, admin:false})
        if(error){
          throw error;
        }
        const user_id = data.user.id;
        const member = await fetchMember(user_id)
        dispatch(updateSession(member))
        navigate(`${homeUrl}/`)
      }
  };

  



  return (
    < Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
      <Stack spacing="8">
      <Box
        py={{ base: '0', sm: '8' }}
        px={{ base: '4', sm: '10' }}
        bg={{ base: 'transparent', sm: 'bg.surface' }}
        boxShadow={{ base: 'none', sm: 'md' }}
        borderRadius={{ base: 'none', sm: 'xl' }}
      >
          <Stack spacing="6">
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
                <Center>
                  <FormLabel>性別</FormLabel>
                </Center>
                <Center>
                  <RadioGroup value={gender} onChange={(value) => setGender(value)}>
                    <Stack spacing={9} direction={'row'}>
                      <Radio size='lg' value="男性">男性</Radio>
                      <Radio size='lg' value="女性">女性</Radio>
                    </Stack>
                  </RadioGroup>
                </Center>
              </FormControl>

              <Stack>
                <Button colorScheme="blue" type="submit">登録</Button>
                <Divider borderColor={'black'}/>
                <Text>
                  すでにアカウントをお持ちであればこちらからログインしてください
                </Text>
                <Center>
                  <ChakraLink as={ReactRouterLink} to={`${homeUrl}/login`} color={'blue'}>
                      ログインする
                  </ChakraLink>
                </Center>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};

export default UserRegistration;


// //ユーザー登録（アカウント作成）
// import React, { useState } from 'react';
// import { supabase } from '../services/supabase_api';
// import { Box, Input, Button, FormControl, FormLabel, Heading, Radio, RadioGroup } from '@chakra-ui/react';
// import { useDispatch } from 'react-redux';
// import { updateSession } from '../Actions';
// import { useNavigate } from 'react-router-dom';
// import { fetchMember } from '../services/memberService';

// const homeUrl = process.env.PUBLIC_URL;


// const UserRegistration = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [username, setUsername] = useState('');
//   const [gender, setGender] = useState('');
//   const [message, setMessage] = useState('');

//   const dispatch = useDispatch()
//   const navigate = useNavigate()


//   const handleSubmit = async (event) => {
//     setMessage('アカウント作成の処理中です');
//     event.preventDefault(); // デフォルトの動作を抑制する
//     const { data,error } = await supabase.auth.signUp(
//         {
//           email: email,
//           password: password,
//         }
//       )
      
//       if (error) {
//         console.error(error.message);
//         setMessage('アカウントを作成できません');
//       }else{
//         const { error } = await supabase
//           .from('members')
//           .insert({user_id: data.user.id, gender, username, admin:false})
//         if(error){
//           throw error;
//         }
//         const user_id = data.user.id;
//         const member = await fetchMember(user_id)
//         dispatch(updateSession(member))
//         navigate(`${homeUrl}/`)
//       }
//   };

  



//   return (
//     <Box maxW="sm" mx="auto" mt={8} p={4}>
//       <Heading mb={4}>ユーザー登録フォーム</Heading>
//       <form onSubmit={handleSubmit}>
//         <FormControl id="email" mb={4}>
//           <FormLabel>Email</FormLabel>
//           <Input
//             type="email"
//             placeholder="メールアドレス"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </FormControl>

//         <FormControl id="password" mb={4}>
//           <FormLabel>パスワード</FormLabel>
//           <Input
//             type="password"
//             placeholder="パスワード"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </FormControl>

//         <FormControl id="username" mb={4}>
//           <FormLabel>ユーザー名</FormLabel>
//           <Input
//             type="text"
//             placeholder="ユーザー名"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//           />
//         </FormControl>

//         <FormControl id="gender" mb={4}>
//           <FormLabel>性別</FormLabel>
//           <RadioGroup value={gender} onChange={(value) => setGender(value)}>
//             <Radio value="男性">男性</Radio>
//             <Radio value="女性">女性</Radio>
//           </RadioGroup>
//         </FormControl>

//         <Button colorScheme="blue" type="submit">登録</Button>
//       </form>
//     </Box>
//   );
// };

// export default UserRegistration;
