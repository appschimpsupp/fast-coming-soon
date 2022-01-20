import React from 'react';
import { Checkbox, TextStyle, Card, Layout, Banner, ColorPicker, FormLayout, TextField } from '@shopify/polaris';

const SocialIcons = (props) => {
    const { 
        socialEmail,
        socialFacebook,
        socialGooglePlus,
        socialLinkedIn,
        socialPinterest,
        socialYoutube,
        socialTwitter,
        setSocialPinterest,
        setSocialGooglePlus,
        setSocialFacebook,
        setSocialYoutube,
        setSocialLinkedIn,
        setSocialTwitter,
        setSocialEmail,
        socialStatus,
        setSocialStatus,
        setMailValidation,
        emailError,
        ptError,
        fbError,
        twError,
        lkError,
        ytError,
        gpError,
        setFBErrorFunc,
        setTwErrorFunc,
        setLKErrorFunc,
        setYTErrorFunc,
        setPTErrorFunc,
        setGPErrorFunc,
        socialIconColor,
        socialIconBackColor,
        setSocialIconColor,
        setSocialIconBackColor,
        socialDefaultColorStatus,
        setSocialDefaultColorStatus
   } = props;

    return ( 
        <Layout.AnnotatedSection
        id="socialDetails"
        title="Social Icons"
        description="Set your coming soon page social icons."
    >
    <FormLayout>
            <Card>
                        <Card.Section>
                            <Checkbox
                                label="Enable Social Icons"
                                checked={socialStatus}
                                onChange={setSocialStatus}
                            />
                        </Card.Section>
               <Card.Section>
                    <FormLayout>
                        <TextField 
                            label="Facebook" 
                            value={socialFacebook}
                            onChange={setSocialFacebook}
                            onBlur={(val) => setFBErrorFunc(val)}
                            error={fbError}
                        />
                        <TextField 
                            label="Twitter" 
                            value={socialTwitter}  
                            onChange={setSocialTwitter}
                            onBlur={(val) => setTwErrorFunc(val)}
                            error={twError}
                        />
                        <TextField 
                            label="LinkedIn" 
                            value={socialLinkedIn}  
                            onChange={setSocialLinkedIn}
                            onBlur={(val) => setLKErrorFunc(val)}
                            error={lkError}
                        />
                        <TextField 
                            label="Google Plus" 
                            value={socialGooglePlus}  
                            onChange={setSocialGooglePlus}
                            onBlur={(val) => setGPErrorFunc(val)}
                            error={gpError}
                        />
                        <TextField 
                            label="Youtube" 
                            value={socialYoutube}  
                            onChange={setSocialYoutube}
                            onBlur={(val) => setYTErrorFunc(val)}
                            error={ytError}
                        />
                        <TextField 
                            label="Pinterest" 
                            value={socialPinterest}  
                            onChange={setSocialPinterest}
                            onBlur={(val) => setPTErrorFunc(val)}
                            error={ptError}
                        />
                        <TextField 
                            label="Email"
                            type="email"
                            value={socialEmail}  
                            onChange={setSocialEmail}
                            onBlur={(val) => setMailValidation(val)}
                            error={emailError}
                        />
                    </FormLayout>
                </Card.Section>
                <Card.Section>
                {/* Social color options */}
                    <FormLayout>
                        <TextStyle variation="strong">Social Icons Color Settings</TextStyle>
                        <Checkbox
                            label="Enable default icon colors"
                            checked={socialDefaultColorStatus}
                            onChange={setSocialDefaultColorStatus}
                        />
                        <FormLayout.Group>
                            <div>
                                <label className="Polaris-Label__Text" style={{marginBottom:5}}>Social Icons Color</label>
                                <ColorPicker 
                                    onChange={setSocialIconColor} 
                                    color={socialIconColor} 
                                />
                            </div>
                            <div>
                                <label className="Polaris-Label__Text" style={{marginBottom:5}}>Social Icons Background Color</label>
                                <ColorPicker 
                                    onChange={setSocialIconBackColor} 
                                    color={socialIconBackColor} 
                                />
                            </div>
                        </FormLayout.Group>
                    </FormLayout>
                </Card.Section>
                <Card.Section> 
                    <Banner
                        title="How to apply custom colors"
                        status="info"
                    >
                    <p>To use custom colors make sure to uncheck <TextStyle variation="strong">Enable default icon colors</TextStyle>.</p>
                    </Banner>
                </Card.Section>
           </Card>
        </FormLayout>
    </Layout.AnnotatedSection>
    );
}
 
export default SocialIcons;