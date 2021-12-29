import React from 'react';
import { Card, Layout, FormLayout, TextField } from '@shopify/polaris';

const ContentSettings = (props) => {
    const { 
        contentTitle, 
        contentDescription, 
        contentFooter, 
        setTitle, 
        setDescription,
        setFooter
    } = props;

    return (
           
                    <Layout.AnnotatedSection
                        id="contentDetails"
                        title="Content details"
                        description="Set your Shopify content."
                    >
                        <Card sectioned>
                            <FormLayout>
                                <TextField 
                                    label="Title" 
                                    value={contentTitle}
                                    onChange={setTitle}
                                />
                                <TextField 
                                    label="Description" 
                                    value={contentDescription}  
                                    multiline={4} 
                                    onChange={setDescription}
                                />
                                <TextField 
                                    label="Footer" 
                                    value={contentFooter}  
                                    onChange={setFooter}
                                />
                            </FormLayout>
                        </Card>
                    </Layout.AnnotatedSection>
        
    );
}
 
export default ContentSettings;
