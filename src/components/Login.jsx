//ユーザー登録（アカウント作成）
import React, { useState } from 'react';
import { supabase } from '../services/supabase_api';
import { validateEmail, validatePassword } from '../utils/validation';
import { useNavigate, Link as ReactRouterLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateSession } from '../Actions';
import { fetchMember } from '../services/memberService';
import {
  Box,
  Button,
  Container,
  Text,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Divider,
  Link as ChakraLink,
  Center,
} from '@chakra-ui/react'


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
      const user_id = data.user.id;
      const member = await fetchMember(user_id)
      dispatch(updateSession(member));
      navigate(`${homeUrl}/`)
    }
  };

  // 入力値(メールアドレス、パスワード)の検証
  const validate = () => {
    return validateEmail(email) && validatePassword(password);
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
              <Stack spacing="6">
                <Button colorScheme="blue" type="submit" disabled={!validate()}>ログイン</Button>
                <Divider borderColor={'black'}/>
                <Text>
                  アカウントをお持ちでない方はこちらから登録できます
                </Text>
                <Center>
                  <ChakraLink as={ReactRouterLink} to={`${homeUrl}/userregistration`} color={'blue'}>
                    アカウント作成
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

export default Login;

// //ユーザー登録（アカウント作成）
// import React, { useState } from 'react';
// import { supabase } from '../services/supabase_api';
// import { Box, Input, Button, FormControl, FormLabel, Heading } from '@chakra-ui/react';
// import { validateEmail, validatePassword } from '../utils/validation';
// import { useNavigate, Link } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { updateSession } from '../Actions';
// import { fetchMember } from '../services/memberService';


// const homeUrl = process.env.PUBLIC_URL;

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');

//   const dispatch = useDispatch()
//   const navigate = useNavigate()


//   const handleSubmit = async (event) => {
//     event.preventDefault(); //デフォルトの動作を抑制する

//     const { data, error } = await supabase.auth.signInWithPassword({
//       email: email.trim(),
//       password: password,
//     });
//     if (error) {
//       setMessage('メールアドレス、またはパスワードが間違っています');
//     }else{
//       const user_id = data.user.id;
//       const member = await fetchMember(user_id)
//       dispatch(updateSession(member));
//       navigate(`${homeUrl}/`)
//     }
//   };

//   // 入力値(メールアドレス、パスワード)の検証
//   const validate = () => {
//     return validateEmail(email) && validatePassword(password);
//   };


//   return (
//     <Box maxW="sm" mx="auto" mt={8} p={4}>
//       <Heading mb={4}>ログイン</Heading>
//       <form onSubmit={handleSubmit}>
//         <FormControl id="email" mb={4}>
//           <FormLabel>メールアドレス</FormLabel>
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

//         <Button colorScheme="blue" type="submit" disabled={!validate()}>ログイン</Button>
//       </form>
//       <div>
//         <Link to={`${homeUrl}/userregistration`}>アカウント作成</Link>
//       </div>
//     </Box>
//   );
// };

// export default Login;
