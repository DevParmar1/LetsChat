import React from 'react'
import styled from "styled-components";

import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

function Chat() {
    return (
        <Container>
            <ChatHeader>

                <ChatContent>
                <ChatHeaderTitle>
                    #title
                </ChatHeaderTitle>
                <ChatHeaderDesc>
                    Hey welcome to the Chat!
                </ChatHeaderDesc>
                </ChatContent>
                
                  <ChatHeaderDetails>
                  Details
            <Info>
<InfoOutlinedIcon />
            </Info>
            
                  </ChatHeaderDetails>
                  

            </ChatHeader>
        </Container>
    );
}

export default Chat;


const Container = styled.div`
background:white;
display:grid;
grid-template-rows:50px auto;

`

const ChatHeader = styled.div`
display:flex;
align-items:center;
justify-content:space-between;
border-bottom: 1px   #532753;
`

const ChatContent=styled.div`
display:grid;
grid-template-rows:18px auto;
padding-left:10px;
padding-top:10px;

`


const ChatHeaderTitle = styled.div`
font-weight:bold;
display:grid;
grid-template-rows:18px 18px 0;


`

const ChatHeaderDesc = styled.div`

`

const ChatHeaderDetails = styled.div`
padding-right:20px;
padding-left:20px;
display:flex;
`
const Info=styled.div`
padding-right:10px;
padding-left:10px;

`