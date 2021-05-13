/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { Input } from '../Forms'
import Button from '../Button'
import styled from 'styled-components'

const FormSt = styled.div`
  display: flex;
  flex-direction: column;
  height: 80%;
  justify-content: center;
  vertical-align: center;

  h2 {
    font-size: 1.5em;
    color: ${({ color }) => color};
    margin: 10px auto;
  }
`;
const CustomForm = ({ close, status, message, onValidated, form }) => {
  const [email, setEmail] = useState('')
  const [currentCol, setColor] = useState('#8338ec')
  const [, setTimer] = useState({})
  const submit = () =>
    email &&
    email.indexOf("@") > -1 &&
    onValidated({
      EMAIL: email
    });
  
  const colors = [
    '#ffbe0b',
    '#fd8a09',
    '#fb5607',
    '#fd2b3b',
    '#ff006e',
    '#8338ec',
    '#e00e8e',
    '#8338ec',
    '#3a86ff'
  ]

  useEffect(() => {
    setTimer(setInterval(() => {
      const num = Math.floor(Math.random() * 9)
      setColor(colors[num])
    }, 500))
  }, [])
  
  useEffect(() => {
    return () => {
      setTimer({})
    }
  }, [])

  useEffect(() => {
    if (status === 'success') {
      setEmail('')
      setTimeout(() => {
        close()
      }, 2000)
    }
  }, [status])
  return (
    <FormSt color={currentCol} name={form} onSubmit={() => submit()}>
      <h2>{status === 'success' ? message : 'Join our waiting list'}</h2>
      {status === "sending" && <div style={{ color: "blue" }}>sending...</div>}
      {status === "error" && (
        <div
          style={{ color: "red" }}
          dangerouslySetInnerHTML={{ __html: message }}
        />
      )}
      <div style={{ width: '70%', margin: 'auto' }}>
        <Input
          style={{ margin: 'auto', fontSize: '1.4em' }}
          change={(value) => setEmail(value)}
          placeholder="email address"
          type="text"
        />
        
      </div>
      <Button
        style={{margin: 'auto'}}
        type='submit'
        onClick={() => submit()}
      >
        Subscribe
      </Button>
    </FormSt>
  );
};

export default CustomForm