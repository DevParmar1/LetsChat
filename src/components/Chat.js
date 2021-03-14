import React,{useEffect, useState, useRef} from 'react'
import styled from "styled-components";

import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import db from "../firebase";
import {useParams} from "react-router-dom";
import firebase from "firebase";


function Chat({user}) {


    const messagesEndRef = useRef(null)
    let {channelId} = useParams();
    const [channel,setChannel]=useState("");
    const [messages, setMessages] = useState([]);

    const getMessages = ()=>{
        db.collection("rooms")
        .doc(channelId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot)=>{
           let messages=snapshot.docs.map((doc)=>doc.data());
            console.log(messages);
            setMessages(messages);
            
        })
    }


    const sendMessage= (text) => {
        if(channelId){
            let payload = {
                text: text,
                timestamp: firebase.firestore.Timestamp.now(),
                user: user.name,
                userImage: user.photo
            }

            console.log(payload);
            db.collection("rooms").doc(channelId).collection("messages").add(payload);
        }

    
    }


    const getChannel= () => {
        db.collection("rooms")
        .doc(channelId)
        .onSnapshot((snapshot)=>{
            setChannel(snapshot.data());
        })
    }

      
    
    
  
  
    useEffect(()=>{
        getChannel();
        getMessages();
       
    }, [channelId])

    return (
        <Container>
            <ChatHeader>

                <Channel>

                    <ChannelName>
                        # {channel.name ? channel.name : " "}
                    </ChannelName>
                    <ChannelInfo>
                        Modified Channel bro whats up!!!!! and how are you doing!
                    </ChannelInfo>

                </Channel>

                <ChannelDetails>
                    <div>
                        Details
                </div>

                    <Info />

                </ChannelDetails>

            </ChatHeader>

            
            <MessageContainer>
            
                {
                    messages.length > 0 &&
                    messages.map((data,index)=>{
                       return (<ChatMessage 
                            text={data.text}
                            name={data.user}
                            image={data.userImage}
                            timestamp={data.timestamp}

                        />);
                    })
                }
           
            </MessageContainer>
           

            <ChatInput sendMessage={sendMessage}></ChatInput>


        </Container>


    );
}

export default Chat;


const Container = styled.div`
background-color: #1b0029;
background-image: url("https://www.transparenttextures.com/patterns/bo-play.png");
/* This is mostly intended for prototyping; please download the pattern and re-host for production environments. Thank you! */
color:white;
display:grid;
grid-template-rows:64px auto min-content;
min-height:0;
`

const ChatHeader = styled.div`
padding-left:20px;
padding-right:20px;
display:flex;
align-items:center;
border-bottom:1px solid rgba(83, 39, 83, .13);
justify-content:space-between;

`

const Channel = styled.div`


`

const ChannelName = styled.div`
font-weight:700;

`

const ChannelInfo = styled.div`
font-weight:400;
color:#606060;
font-size:13px;
margin-top:8px;

`

const Info = styled(InfoOutlinedIcon)`
margin-left:10px;
`

const ChannelDetails = styled.div`
display:flex;
align-items:center;
color:#606060;


`

const MessageContainer = styled.div`
display:flex;
flex-direction:column;
overflow-y:scroll;

`

