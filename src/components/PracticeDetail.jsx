import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabase_api';
import {
  Button,
  Text,
  Checkbox,
  useToast,
  Stack,
  HStack,
} from '@chakra-ui/react'

const homeUrl = process.env.PUBLIC_URL;

function PracticeDetail() {
  const navigate = useNavigate();
  const toast = useToast()

  const [searchParams] = useSearchParams();
  const year = searchParams.get('year');
  const month = searchParams.get('month');
  const day = searchParams.get('day');

  const [practiceday, setPracticeday] = useState(false);

  const handleRegister = async () => {
    const { data, error } = await supabase
      .from('events')
      .insert([
        {
          date: `${year}-${month}-${day}`,
        },
      ]);


    if (error) {
      toast({
        title: '練習日登録',
        description: "練習日の登録に失敗しました",
        status: 'failure',
        duration: 4000,
        isClosable: true,
      })
      return
    }
    
    navigate(`${homeUrl}/`);

  };

  return (
    <Stack spacing={20} direction="column" align="center" mt={10}>
        <Text fontSize="xl" fontWeight="bold" textAlign="center">
          {`${year}年${month}月${day}日の練習日設定`}
        </Text>
        <Checkbox isChecked={practiceday} onChange={(event) => setPracticeday(event.target.checked)} size="lg" colorScheme="purple">
          練習日
        </Checkbox>
        <HStack spacing={10}>
          <Button onClick={() => navigate(`${homeUrl}/practicecalender`)}>キャンセル</Button>
          <Button onClick={handleRegister}  bg="purple.200">登録</Button>
        </HStack>
      </Stack>
  );
}

export default PracticeDetail;
