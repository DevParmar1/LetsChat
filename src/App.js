
import './App.css';
import {useEffect, useState} from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Chat from "./components/Chat";
import Login from "./components/Login";
import styled from "styled-components";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import db from "./firebase";
import {auth,provider} from ".//firebase";
import Flash from 'react-reveal/Flash';

function App() {

  const [rooms, setRooms] = useState([])
  const [ user, setUser ] = useState(JSON.parse(localStorage.getItem("user")));


  
  const getChannels = () => {
    db.collection("rooms").onSnapshot((snapshot) => {
      setRooms(snapshot.docs.map((doc)=>{
        return { id: doc.id, name: doc.data().name}
      }))
    })
 }  


 const signOut= ()=>{
auth.signOut().then(()=>{
  localStorage.removeItem("user");
  setUser(null);
})
 }

 useEffect(()=>{
  getChannels();
 }, [])

console.log("user in app", user);
 
  
  return (
    <div className="App">
      <Router>

      {
        !user ? 
        <Login setUser={setUser}/>
        :
        <Container>
          <Header signOut={signOut} user={user}/>



          <Main>

            <Sidebar rooms={rooms}/>

              <Switch>

                <Route path="/room/:channelId" >
                  <Chat user={user}/>
                </Route>


                {/* always has to be last for root route */}
                <Route path="/">
                
                <LandingPage>
                
                <SelectChannel>
                  <Flash>
                  Please Select Or Add Channel!
                  </Flash>
                  
                </SelectChannel>
                
                
                </LandingPage>
               
                

                </Route>

              </Switch>

            

          </Main>



        </Container>
      }
      </Router>
    </div>
  );
}

export default App;

const Container = styled.div`
  width: 100%;
  ${'' /* vh=view height */}
  height:100vh;
  
  display: grid;
  grid-template-rows: 38px minmax(0, 1fr);
`

const Main = styled.div`
background:white;
display:grid;
grid-template-columns: 260px auto;
`
const LandingPage = styled.div`
background-color: #181a00;
background-image: url("https://www.transparenttextures.com/patterns/hixs-evolution.png");
/* This is mostly intended for prototyping; please download the pattern and re-host for production environments. Thank you! */
display:flex;
width:100%;
height:100vh;
align-items:center;
justify-content:center;
`

const SelectChannel = styled.div`
background-color: #d1faff;
background-image: url("https://www.transparenttextures.com/patterns/robots.png");
/* This is mostly intended for prototyping; please download the pattern and re-host for production environments. Thank you! */
font-weight:bold;
display:flex;
flex-direction:row;
align-items:center;
justify-content:center;
padding:100px;
box-shadow:0 1px 3px rgb(0 0 0 / 12%), 0 1px 2px rgb(0 0 0 / 24%);
border-radius:4px;

`
