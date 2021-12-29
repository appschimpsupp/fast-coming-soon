import React, { useCallback, useState } from 'react';
import { Checkbox, Card, Layout, FormLayout, TextField } from '@shopify/polaris';

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
   } = props;

    return (
        <Layout.AnnotatedSection
        id="socialDetails"
        title="Social Icons"
        description="Set your coming soon page social icons."
    >
        <Card sectioned>
            <FormLayout>
                <Checkbox
                    label="Enable Social Icons"
                    checked={socialStatus}
                    onChange={setSocialStatus}
                />
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
        </Card>
    </Layout.AnnotatedSection>
    );
}
 
export default SocialIcons;