import styled from 'styled-components'

export const ServicesContainer = styled.div`
height: 1180px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
background: #fff;
margin-bottom:50px;

@media screen and (max-width: 768px){
    height: 1980px;
}

@media screen and (max-width: 480px){
    height: 2180px;
}
`;


export const ServicesWrapper = styled.div`
max-width: 1250px;
margin: 0 auto;
display: grid;
grid-template-columns: 1fr 1fr;
align-items: center;
grid-gap: 16px 26PX;
padding: 0 50px;

@media screen and (max-width: 1250px){
    grid-template-columns: 1fr 1fr; 
}

@media screen and (max-width: 600px){
    grid-template-columns: 1fr; 
    padding: 0 20px;
}
`;

export const ServicesCard = styled.div`
background: #fff;
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: center;
border: none;
max-height: 450px;
padding: 30px;

transition: all 0.2s ease-in-out;

&:hover{
transform: scale(1.02);
transition: all 0.2s ease-in-out;
cursor: pointer; 

}
`;


export const ServicesIcon =styled.img`
height: 350px;
width: 300px;
margin-bottom: 10px;

`;


export const ServicesH1 = styled.h1`
font-size: 2.5rem;
color: #000;
margin-bottom: 64px;
font-weight: bold;

@media screen and (max-width: 480px){
font-size: 2rem;
}

`;

export const ServicesH2 = styled.h2`
font-size: 1rem;
margin-bottom: 10px;
font-weight: bold;

`;

export const ServicesP = styled.p`
font-size: 1rem;
text-align: center;

`;
 








