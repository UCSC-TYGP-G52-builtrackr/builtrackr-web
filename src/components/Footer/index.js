import React from 'react'
import { FooterContainer, FooterWrap, FooterLinksContainer, FooterLinksWrapper, FooterLinksItems, FooterLinkTitle, FooterLink, SocialMedia, SocialMediaWrap, WebsiteRights, SocialLogo, SocialIcons, SocialIconLink } from './FooterElements'
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaYoutube } from 'react-icons/fa'

const Footer = () => {
  return (
    <FooterContainer id="footer">
        <FooterWrap>
            <FooterLinksContainer>
                <FooterLinksWrapper>
                    <FooterLinksItems>
                        <FooterLinkTitle>About Us</FooterLinkTitle> 
                            <FooterLink to="/signin">How It Works</FooterLink>
                            <FooterLink to="/signin">Testimonials</FooterLink>
                            <FooterLink to="/signin">Careers</FooterLink>
                            <FooterLink to="/signin">Investors</FooterLink>
                        
                    </FooterLinksItems>

                    <FooterLinksItems>
                        <FooterLinkTitle>Contact Us</FooterLinkTitle> 
                            <FooterLink to="/signin">Contact</FooterLink>
                            <FooterLink to="/signin">Support</FooterLink>
                            <FooterLink to="/signin">Destinations</FooterLink>
                            <FooterLink to="/signin">Sponsorships</FooterLink>
                        
                    </FooterLinksItems>

                </FooterLinksWrapper>

                <FooterLinksWrapper>
                    <FooterLinksItems>
                        <FooterLinkTitle>Privacy Policy</FooterLinkTitle> 
                            <FooterLink to="/signin">Terms of Services</FooterLink>
                            <FooterLink to="/signin">Cookie Policy</FooterLink>
                            <FooterLink to="/signin">Data Collection</FooterLink>
                            <FooterLink to="/signin">Policy Updates</FooterLink>
                            
                        
                    </FooterLinksItems>

                    <FooterLinksItems>
                        <FooterLinkTitle>Social Medias</FooterLinkTitle> 
                            <FooterLink to="/signin">Facebook</FooterLink>
                            <FooterLink to="/signin">Instagram</FooterLink>
                            <FooterLink to="/signin">Twitter</FooterLink>
                            <FooterLink to="/signin">Youtube</FooterLink>
                        
                    </FooterLinksItems>
                    
                </FooterLinksWrapper>
            </FooterLinksContainer>

            <SocialMedia>
                <SocialMediaWrap>
                    <SocialLogo to='/home'>
                        BuilTrackr

                    </SocialLogo>
                    <WebsiteRights>BuilTrackr © {new Date().getFullYear()} All rights reserved.</WebsiteRights>
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
