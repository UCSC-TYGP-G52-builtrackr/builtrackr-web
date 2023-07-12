import React from 'react'
import Icon1 from '../../assets/images/feature1.png'
import Icon2 from '../../assets/images/feature2.png'
import Icon3 from '../../assets/images/feature3.png'
import Icon4 from '../../assets/images/feature4.png'
import { ServicesContainer, ServicesH1, ServicesWrapper, ServicesCard, ServicesIcon, ServicesH2, ServicesP } from './ServicesElements'
// import '../CSS/landingpage.css';

const Services = () => {
  return (
    <ServicesContainer id="services">
    <ServicesH1>Our Services</ServicesH1>
    <ServicesWrapper>
        <ServicesCard>
            <ServicesIcon src={Icon1}/>
            <ServicesH2 className='hTopics'>Task Scheduling</ServicesH2>
            <ServicesP>With our web app, you can easily create and update task schedules, assign resources and responsibilities, track progress and performance, and communicate with your team and stakeholders.Our web app will help you streamline your workflow and achieve your goals.</ServicesP>
        </ServicesCard>
        <ServicesCard>
            <ServicesIcon src={Icon2}/>
            <ServicesH2>Allocate Manpower</ServicesH2>
            <ServicesP>Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum</ServicesP>
        </ServicesCard>
        <ServicesCard>
            <ServicesIcon src={Icon3 }/>
            <ServicesH2>Inventory Management</ServicesH2>
            <ServicesP>Can easily access and monitor your inventory levels, place orders, receive alerts, and generate reports.</ServicesP>
        </ServicesCard>
        <ServicesCard>
            <ServicesIcon src={Icon4 }/>
            <ServicesH2>Progress and Analytics Reports</ServicesH2>
            <ServicesP>Helps to monitor the performance, quality, and efficiency of your projects with analytical reports</ServicesP>
        </ServicesCard>
       
    </ServicesWrapper>
  
</ServicesContainer>
  )
}

export default Services
