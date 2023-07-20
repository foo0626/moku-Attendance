import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabase_api';
import { Button, Checkbox,  useToast } from '@chakra-ui/react';

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

    console.log('成功しました')
    navigate(`${homeUrl}/`);

  };//日付をsupabaseに登録できるようにした

  return (
    <div>
      <h1>{`${year}年${month}月${day}日の練習日設定`}</h1>
      <Checkbox isChecked={practiceday} onChange={(event) => setPracticeday(event.target.checked)}>
        練習日
      </Checkbox>
      <Button onClick={handleRegister}>登録</Button>
    </div>
  );
}

export default PracticeDetail;
