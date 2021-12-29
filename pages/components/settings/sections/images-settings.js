import React, { useState, useCallback } from 'react';
import { Widget } from "@uploadcare/react-widget";
import { ColorPicker, Checkbox, Card, Layout, FormLayout, Spinner  } from '@shopify/polaris';
import styles from '../../../../styles/images.module.css'

const ImageSettings = (props) => {
    const { 
        setLogoUrl, 
        logoUrl,
        backgroundUrl,
        setBackgroundUrl,
        backgroundColorStatus,
        setBackgroundColorStatus,
        backgroundColor,
        setBackgroundColor,
        activeTheme
    } = props;

    const [loadImage, setLoadImage] = useState(0); // logo image loading.
    const [loadLogoImage, setLoadLogoImage] = useState(0); // background image loading.

    let uploadCarePublicKey = '348cba60a37606ff251a';

    let logoPreviewStatus = (logoUrl != "") ? 'block' : 'none';
    let backgroundPreviewStatus = (backgroundUrl != "") ? 'block' : 'none';

    let backgroundColorLabel =  activeTheme == 2 ? 'If you select this option it will only show Background Color and hide image. You can select Right Area Color also.' : 'If you select this option it will only show Background Color and hide image.';

    

    return (
            <Layout.AnnotatedSection
                id="imagesDetails"
                 title="Logo & Background Details"
                description="Set your coming soon logo and background."
            >
            <FormLayout> 
                <Card>
                    <Card.Section>
                            <p className={styles.yellowColor}>
                                <label htmlFor='logo'>Upload Logo:</label>{' '}
                                <Widget 
                                    clearable
                                    publicKey={uploadCarePublicKey} 
                                    id='logo' 
                                    name='logo'
                                    tabs='file url'
                                    previewStep='true'
                                    value={logoUrl}
                                    onFileSelect={(file) => {
                                        if (!file) {
                                            setLogoUrl('empty');
                                        }
                                        if (file) {
                                            file.progress(info => {
                                                //console.log('File progress: ', info.progress)
                                                setLoadLogoImage(1);
                                                if(info.progress == 1) {
                                                    setLoadLogoImage(0);
                                                }
                                            })
                                            file.done(info => {
                                                setLogoUrl(info);
                                                //console.log('File uploaded: ', info.originalUrl)
                                            })
                                          }
                                    }}
                                    onChange={
                                        (e) => { 
                                            setLogoUrl(e);
                                        }
                                    }
                                />
                                {loadLogoImage == 1 ? <span style={{textAlign:'left'}}><br /> <br /><Spinner size="small" /></span> : <img 
                                    src={logoUrl ? logoUrl+ '-/preview/300x300/' : ''}  
                                    className={styles.previewMargin}
                                    style={{display: logoPreviewStatus}} 
                                /> }
                                
                            </p>
                        </Card.Section>
                        <Card.Section>
                            <p>
                                <label htmlFor='background'>Upload Background:</label>{' '}
                                <Widget 
                                    clearable
                                    publicKey={uploadCarePublicKey}
                                    id='background' 
                                    name='background'
                                    tabs='file url'
                                    previewStep='true'
                                    value={backgroundUrl}
                                    onFileSelect={(file) => {
                                        if (!file) {
                                            setBackgroundUrl('empty');
                                        }
                                        if (file) {
                                            file.progress(info => {
                                                setLoadImage(1);
                                                //console.log('File progress: ', info.progress)
                                               // setLoadImage(1);
                                                if(info.progress == 1) {
                                                  setLoadImage(0);
                                                }
                                            })
                                            file.done(info => {
                                                setBackgroundUrl(info);
                                                //console.log('File uploaded: ', info)
                                            })
                                          }
                                    }}
                                    onChange={
                                        (e) => { 
                                           // console.log(e);
                                           // setBackgroundUrl(e);
                                        }
                                    }
                                />
                                { loadImage == 1 ? <span style={{textAlign:'left'}}><br /> <br /><Spinner size="small" /></span> : <img 
                                src={backgroundUrl ? backgroundUrl+ '-/preview/300x300/' : ''}  
                                className={styles.previewMargin}
                                style={{display: backgroundPreviewStatus}} 
                            /> }
                                
                                
                            </p>
                        </Card.Section>
                        <Card.Section>
                            <Checkbox
                                label='Enable Background Color Only'
                                checked={backgroundColorStatus}
                                onChange={setBackgroundColorStatus}
                                helpText={backgroundColorLabel}
                            />
                            <br />
                            <ColorPicker 
                                onChange={setBackgroundColor} 
                                color={backgroundColor}
                            />  
                        </Card.Section>
                    </Card>
                </FormLayout>
            </Layout.AnnotatedSection>
    );  
}
 
export default ImageSettings;