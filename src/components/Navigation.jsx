import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateSession } from '../Actions';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabase_api';
import { Button, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { fetchMember } from '../services/memberService';

const homeUrl = process.env.PUBLIC_URL;

const Navigation = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const member = useSelector((state) => state.member)

  const [admin, setAdmin] = useState(false)

  useEffect( () => {
    const fetch = async () => {
      if(member){
        setAdmin(member.admin)
      }
    }

    fetch()
  },[member])


  
  const handleLogout = async (event) => {
    const { data,error } = await supabase.auth.signOut(
      dispatch(updateSession(null)),
      navigate(`${homeUrl}/login`),
    );
    if (error) {
      console.error(error.message);
    }
  };


  return (
  <>
    {admin && (
        <Menu>
          <MenuButton as={Button} rightIcon={<HamburgerIcon />} variant="outline">
            メニュー
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => navigate(`${homeUrl}/`)}>
              ホーム画面
            </MenuItem>
            <MenuItem onClick={() => navigate(`${homeUrl}/usersetting`)}>
              ユーザー管理
            </MenuItem>
            <MenuItem onClick={() => navigate(`${homeUrl}/practicecalender`)}>
              練習日登録
            </MenuItem>
          </MenuList>
        </Menu>
      )}
    <div>{member && <Button onClick={handleLogout}>ログアウト</Button>}</div>
  </>
  )
}

export default Navigation