
import React from 'react'
import styled from "styled-components";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { sidebarItemsData } from "../data/SidebarData";
import AddIcon from '@material-ui/icons/Add';
import db from "../firebase";
import {useHistory} from "react-router-dom";
import Roll from "react-reveal";



function Sidebar(props) {
    
    var coded = "< /> by Dev Parmar";
    const history = useHistory();

    const goToChannel= (id)=>{
        if(id){
            console.log(id);
            history.push( `/room/${id}` )
        }
    }

    const addChannel = () => {
        const promptName = prompt("Enter Channel Name");
        if(promptName){
            db.collection("rooms").add({
                name: promptName
            })
        }
    }
    
    return (
       
        <Container>
            <WorkspaceContainer>
                <Name>
                   <div>
                   {coded}
                   </div>
               </Name>
                <NewMessage>
                    <AddCircleOutlineIcon />
                </NewMessage>
            </WorkspaceContainer>
            <MainChannels>
                {
                    sidebarItemsData.map(item => {
                        return (<MainChannelItem>
                            {item.icon}
                            {item.text}
                        </MainChannelItem>);
                    })
                }

            </MainChannels>

            <ChannelsContainer>

                <NewChannelContainer>
                    <div>
                        Channels
                    </div>
                    <Add>
                    <AddIcon onClick={addChannel}/>
                    </Add>
                   
                </NewChannelContainer>
                <Roll left>
                <ChannelsList>
                   {/* {ChannelData.map(channel=>{
                    return(<Channel>
                   {channel.name}
                    </Channel>);
                   })} */}
                    
                    {
                        props.rooms.map(item => {
                            return(<Channel onClick={()=>goToChannel(item.id)}>
                                # {item.name}
                            </Channel>);
                        })
                    }
                    
                </ChannelsList>
                </Roll>
                
            </ChannelsContainer>
        </Container>
    )
}

export default Sidebar


const Container = styled.div`
background-color: #0010c4;
background-image: url("https://www.transparenttextures.com/patterns/carbon-fibre.png");
/* This is mostly intended for prototyping; please download the pattern and re-host for production environments. Thank you! */
width:auto;
height:auto;

`

const WorkspaceContainer = styled.div`
color:white;
height:64px;
display:flex;
align-items:center;
padding-left:19px;
justify-content: space-between;
border-bottom: 1px solid  #532753;

`

const Name = styled.div`


`

const NewMessage = styled.div`
width:36px;
height:36px;
background:white;
color:#a7c5eb;
fill:red;
display:flex;
justify-content:center;
align-items:center;
border-radius:50%;
margin-right:20px;
cursor:pointer;

`

const MainChannels = styled.div`
padding-top:20px;

`
const MainChannelItem = styled.div`
        color: #a7c5eb;
        display:grid;
        grid-template-columns: 15% auto;
        height:28px;
        align-items:center;
        padding-left:19px;
        cursor:pointer;
`

const ChannelsContainer = styled.div`
color:#64dfdf;
margin-top:10px;
`

const NewChannelContainer = styled.div`
display:flex;
justify-content:space-between;
height:20px;
padding-left:19px;
padding-right:12px;


`
const Add=styled.button`
cursor:pointer;
border:none;
background:transparent;
color:#f9f3f3;

`



const ChannelsList=styled.div`

`

const Channel=styled.div`
height:28px;
display:flex;
align-items:center;
padding-left: 19px;
cursor:pointer;
:hover{
    background: #1687a7;
}
`
