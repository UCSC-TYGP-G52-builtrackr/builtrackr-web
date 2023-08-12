import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Video from '../../assets/videos/video.mov';
import { Button } from '../ButtonElements';
import { HeroContainer, HeroBg, VideoBg, HeroContent, HeroH1, HeroP, HeroBtnWrapper, ArrowForward, ArrowRight } from './HeroElements';

const HeroSection = () => {
  const [hover, setHover] = useState(false);
  const navigate = useNavigate();

  const onHover = () => {
    setHover(!hover);
  };

  const handleGetStarted = () => {
    navigate('/Register');
  };

  return (
    <HeroContainer>
      <HeroBg>
        <VideoBg autoPlay loop muted src={Video} type='video/mov' />
      </HeroBg>
      <HeroContent>
        <HeroH1>BuilTrackr Made You Easy</HeroH1>
        <HeroP>
          Sign Up for a new account and experience our unique features
        </HeroP>
        <HeroBtnWrapper>
          <Button to='/Register' onMouseEnter={onHover} onMouseLeave={onHover} primary='true' dark='true' onClick={handleGetStarted}>
            Get Started {hover ? <ArrowForward /> : <ArrowRight />}
          </Button>
        </HeroBtnWrapper>
      </HeroContent>
    </HeroContainer>
  );
};

export default HeroSection;
