import React from 'react'
import styled from "styled-components";
import { auth, provider } from "../firebase";
import RubberBand from "react-reveal/RubberBand";
import emoji from "react-easy-emoji";
import "./login.css";
import Bounce from 'react-reveal/Bounce';

import rocket from "../assets/lottie/rocket4.json";
import DisplayLottie from "./DisplayLottie";


function Login(props) {


    const signIn = () => {
        auth.signInWithPopup(provider)
            .then((result) => {
                const newUser = {
                    name: result.user.displayName,
                    photo: result.user.photoURL
                }
                localStorage.setItem('user', JSON.stringify(newUser));
                props.setUser(newUser);

            })
            .catch((error) => {
                alert(error.message)
            })
    }


    return (





        <Container>


            <Content>
            <Animation>
                    <DisplayLottie animationData={rocket}/>
                    </Animation>
                <RubberBand>
                    <h1>Lets Chat <span className="wave-emoji">{emoji("👋")}</span> !</h1>
                </RubberBand>
                <Bounce>
                <SignInButton onClick={() => signIn()}>
                    <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Open+Sans" />

                    <div class="google-btn">
                        <div class="google-icon-wrapper">
                            <img class="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Space"/>
                        </div>
                        <p class="btn-text"><b>Sign in with google</b></p>
                    </div>
                </SignInButton>
                </Bounce>
               
                    
               
            </Content>




        </Container>




    )
}

export default Login;





const Container = styled.div`
background-image:url("https://images.unsplash.com/photo-1445905595283-21f8ae8a33d2?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1052&q=80");
width:100%;
height:100vh;
display:flex;
justify-content:center;
align-items:center;

`

const Content = styled.div`

padding:100px;
border-radius:5px;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;



`


const SignInButton = styled.button`
${'' /* margin-top:50px;

color:white;
border:none;
height:40px;
border-radius:4px;
cursor: pointer;
font-size:15px; */}
background:transparent;
outline:none;
border:none;
`

const Animation = styled.div`
height:200px;
background:transparent;
width:250px;
border:none;
`

