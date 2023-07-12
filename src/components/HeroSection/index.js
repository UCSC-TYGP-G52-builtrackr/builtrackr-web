import React, {useState} from 'react'
import Video from '../../assets/videos/video.mp4'
import {Button} from '../ButtonElements'
import { HeroContainer, HeroBg, VideoBg, HeroContent, HeroH1, HeroP, HeroBtnWrapper, ArrowForward, ArrowRight } from './HeroElements'

const HeroSection = () => {

const [hover, setHover] = useState(false)

const onHover = () => {
  setHover(!hover)
}

    return (
        <HeroContainer>
          <HeroBg>
            <VideoBg autoPlay loop muted src={Video} type='video/mov' />
          </HeroBg>
          <HeroContent>
            <HeroH1>builTrackr Made You Easy</HeroH1>
            <HeroP>
              Sign Up for a new account and experience our unique features
            </HeroP>
            <HeroBtnWrapper>
              <Button to='signup' onMouseEnter={onHover} onMouseLeave={onHover} primary='true' dark='true'> 
                Get Started {hover ? <ArrowForward /> : <ArrowRight />}
              </Button>
            </HeroBtnWrapper>
          </HeroContent>
        </HeroContainer>
      );
      
}

export default HeroSection
