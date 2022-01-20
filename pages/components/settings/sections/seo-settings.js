import React from 'react';
import { Card, Layout, FormLayout, TextField } from '@shopify/polaris';

const SeoSettings = (props) => {
    const { 
        seoTitle, 
        seoDescription, 
        setSeoTitle, 
        setSeoDescription,
        seoMetatags,
        setSeoMetatags,
        fbPixel,
        setFbPixel,
        googleAna,
        setGoogleAna
    } = props;

    return (
           
                    <Layout.AnnotatedSection
                        id="seoDetails"
                        title="SEO details"
                        description="Set your coming soon page SEO."
                    >
                        <Card sectioned>
                            <FormLayout>
                                <TextField 
                                    value={seoTitle}
                                    label="Site Title" 
                                    onChange={setSeoTitle} 
                                />
                                <FormLayout.Group>
                                    <TextField 
                                        label="Facebook Pixel" 
                                        onChange={setFbPixel} 
                                        autoComplete="off"
                                        value={fbPixel}
                                    />
                                    <TextField 
                                        label="Google Analytics" 
                                        onChange={setGoogleAna} 
                                        value={googleAna}
                                        autoComplete="off" 
                                    />
                                </FormLayout.Group>
                                <TextField 
                                    value={seoMetatags}
                                    label="Meta Tags" 
                                    onChange={setSeoMetatags} 
                                />
                                <TextField 
                                    value={seoDescription}
                                    label="Meta Description" 
                                    multiline={4} 
                                    onChange={setSeoDescription} 
                                />
                            </FormLayout>
                        </Card>
                    </Layout.AnnotatedSection>
           
    );
}
 
export default SeoSettings;