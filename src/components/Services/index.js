import React from 'react'
import Icon1 from '../../assets/images/feature1.png'
import Icon2 from '../../assets/images/feature2.png'
import Icon3 from '../../assets/images/feature3.png'
import Icon4 from '../../assets/images/feature4.png'
import { ServicesContainer, ServicesH1, ServicesWrapper, ServicesCard, ServicesIcon, ServicesH2, ServicesP } from './ServicesElements'

const Services = () => {
  return (
    <ServicesContainer id="services">
    <ServicesH1>Our Services</ServicesH1>
    <ServicesWrapper>
        <ServicesCard>
            <ServicesIcon src={Icon1}/>
            <ServicesH2>Task Scheduling</ServicesH2>
            <ServicesP>Can easily create and update task schedules, assign resources and responsibilities, track progress and performance</ServicesP>
        </ServicesCard>
        <ServicesCard>
            <ServicesIcon src={Icon2}/>
            <ServicesH2>Allocate Manpower</ServicesH2>
            <ServicesP>Enhance workforce efficiency with our "Allocate Manpower" feature, placing the right people in the right roles at the right times.</ServicesP>
        </ServicesCard>
        <ServicesCard>
            <ServicesIcon src={Icon3 }/>
            <ServicesH2>Inventory Management</ServicesH2>
            <ServicesP>Can easily access and monitor your inventory levels, place orders, receive alerts and generate reports.</ServicesP>
        </ServicesCard>
        <ServicesCard>
            <ServicesIcon src={Icon4 }/>
            <ServicesH2>Progress and Analytics Reports</ServicesH2>
            <ServicesP>Helps to monitor the performance, quality and efficiency of your projects with analytical reports.</ServicesP>
        </ServicesCard>
       
    </ServicesWrapper>
  
</ServicesContainer>
  )
}

export default Services
