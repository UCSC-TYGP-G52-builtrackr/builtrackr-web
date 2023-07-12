import React from 'react'
import { FooterContainer, FooterWrap, FooterLinksContainer, FooterLinksWrapper, FooterLinksItems, FooterLinkTitle, FooterLink, SocialMedia, SocialMediaWrap, WebsiteRights, SocialLogo, SocialIcons, SocialIconLink } from './FooterElements'
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaYoutube } from 'react-icons/fa'

const Footer = () => {
  return (
    <FooterContainer>
        <FooterWrap>
            <FooterLinksContainer>
                <FooterLinksWrapper>
                    <FooterLinksItems>
                        <FooterLinkTitle>About Us</FooterLinkTitle> 
                            <FooterLink to="/signin">How It Works</FooterLink>
                            <FooterLink to="/signin">Testimonials</FooterLink>
                            <FooterLink to="/signin">Careers</FooterLink>
                            <FooterLink to="/signin">Investors</FooterLink>
                            <FooterLink to="/signin">Terms of Services</FooterLink>
                        
                    </FooterLinksItems>

                    <FooterLinksItems>
                        <FooterLinkTitle>About Us</FooterLinkTitle> 
                            <FooterLink to="/signin">How It Works</FooterLink>
                            <FooterLink to="/signin">Testimonials</FooterLink>
                            <FooterLink to="/signin">Careers</FooterLink>
                            <FooterLink to="/signin">Investors</FooterLink>
                            <FooterLink to="/signin">Terms of Services</FooterLink>
                        
                    </FooterLinksItems>

                </FooterLinksWrapper>

                <FooterLinksWrapper>
                    <FooterLinksItems>
                        <FooterLinkTitle>About Us</FooterLinkTitle> 
                            <FooterLink to="/signin">How It Works</FooterLink>
                            <FooterLink to="/signin">Testimonials</FooterLink>
                            <FooterLink to="/signin">Careers</FooterLink>
                            <FooterLink to="/signin">Investors</FooterLink>
                            <FooterLink to="/signin">Terms of Services</FooterLink>
                        
                    </FooterLinksItems>

                    <FooterLinksItems>
                        <FooterLinkTitle>About Us</FooterLinkTitle> 
                            <FooterLink to="/signin">How It Works</FooterLink>
                            <FooterLink to="/signin">Testimonials</FooterLink>
                            <FooterLink to="/signin">Careers</FooterLink>
                            <FooterLink to="/signin">Investors</FooterLink>
                            <FooterLink to="/signin">Terms of Services</FooterLink>
                        
                    </FooterLinksItems>
                    
                </FooterLinksWrapper>
            </FooterLinksContainer>

            <SocialMedia>
                <SocialMediaWrap>
                    <SocialLogo to='/home'>
                        builTrackr

                    </SocialLogo>
                    <WebsiteRights>builTracker © {new Date().getFullYear()} All rights reserved.</WebsiteRights>
                <SocialIcons>
                    <SocialIconLink href="/" target="_blank" area-label="Facebook">
                    <FaFacebook />
                    </SocialIconLink>

                    <SocialIconLink href="/" target="_blank" area-label="Instagram">
                    <FaInstagram />
                    </SocialIconLink>

                    <SocialIconLink href="//www.youtube.com/" target="_blank" area-label="Youtube">
                    <FaYoutube />
                    </SocialIconLink>

                    <SocialIconLink href="/" target="_blank" area-label="Twitter">
                    <FaTwitter />
                    </SocialIconLink>

                    <SocialIconLink href="/" target="_blank" area-label="Linkedin">
                    <FaLinkedin />
                    </SocialIconLink>
                
                </SocialIcons>
                </SocialMediaWrap>
            </SocialMedia>

        </FooterWrap>

    </FooterContainer>

  )
}

export default Footer
