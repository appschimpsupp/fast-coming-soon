import React, { useRef } from "react";
import { Card, Layout, FormLayout } from '@shopify/polaris';
import { Editor } from '@tinymce/tinymce-react';

const ContentSettings = (props) => {
    const { 
        contentTitle, 
        contentDescription, 
        contentFooter, 
        setTitle, 
        setDescription,
        setFooter
    } = props;
    
    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
        console.log(editorRef.current.getContent());
        }
    };

    return (
           
                    <Layout.AnnotatedSection
                        id="contentDetails"
                        title="Content details"
                        description="Set your Shopify content."
                    >
                        <Card sectioned >
                            <FormLayout>
                                <label>Title</label>
                                <Editor
                                    
                                    initialValue={contentTitle}
                                    id='title'    
                                    apiKey='9uqss8w1z9wfu4dzfapbrxa0sqk3s2rehx73slllze5suxzw'
                                    init={{
                                        height: 150,
                                        menubar: false,
                                        plugins: [
                                            'advlist autolink lists link image charmap print preview anchor emoticons',
                                            'searchreplace visualblocks code fullscreen',
                                            'insertdatetime media table paste code help wordcount'
                                        ],
                                        toolbar: 'formatselect fontsizeselect fontselect | forecolor backcolor |' +
                                        'bold italic | alignleft aligncenter ' + 'alignright alignjustify | bullist numlist outdent indent | emoticons  ' +
                                        'removeformat | help',
                                        content_style: "['https://fonts.googleapis.com/css?family=Raleway', 'https://fonts.googleapis.com/css?family=Baloo+Bhaijaan','https://fonts.googleapis.com/css?family=Oswald','https://fonts.googleapis.com/css2?family=Dosis','https://fonts.googleapis.com/css2?family=Comfortaa','https://fonts.googleapis.com/css?family=Poppins', 'https://fonts.googleapis.com/css?family=Roboto','https://fonts.googleapis.com/css?family=Acme','https://fonts.googleapis.com/css2?family=Righteous','https://fonts.googleapis.com/css?family=Permanent+Marker','https://fonts.googleapis.com/css?family=Open+Sans','https://fonts.googleapis.com/css?family=Montserrat','https://fonts.googleapis.com/css?family=Lato'] body { font-family:Helvetica,Arial,sans-serif; font-size:14px; }",
                                        font_formats: 'Arial=arial,helvetica,sans-serif;Lato=Lato,sans-serif,helvetica;Raleway=raleway,sans-serif;Sans Serif=sans-serif,sans-serif;Open Sans=Open Sans,sans-serif;Roboto=roboto,sans-serif;Righteous=righteous, cursive;Montserrat=montserrat,sans-serif;Comfortaa=comfortaa;Dosis=dosis;Baloo+Bhaijaan=Baloo+Bhaijaan,sans-serif;Oswald=Oswald,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier;Poppins=poppins,sans-serif,helvetica;Georgia=georgia,palatino;Helvetica=helvetica;Acme=acme, sans-serif;Impact=impact,chicago;Symbol=symbol;Tahoma=tahoma,arial,helvetica,sans-serif;Terminal=terminal,monaco;Times New Roman=times new roman,times;Trebuchet MS=trebuchet ms,geneva;Permanent Marker=permanent marker,sans-serif;Verdana=verdana,geneva;Webdings=webdings;Wingdings=wingdings,zapf dingbats',
                                        fontsize_formats: "2px 4px 6px 8px 10px 12px 14px 16px 18px 20px 22px 24px 36px 38px 40px",
                                        branding: false
                                    }}
                                    onEditorChange={(newValue, editor) => {
                                        setTitle(newValue);
                                    }}  
                                />  
                                <label>Description</label>
                                <Editor
                                    initialValue={contentDescription}
                                    id='description'    
                                    apiKey='9uqss8w1z9wfu4dzfapbrxa0sqk3s2rehx73slllze5suxzw'
                                    init={{
                                        height: 200,
                                        menubar: true,
                                        plugins: [
                                            'advlist autolink lists link image charmap print preview anchor',
                                            'searchreplace visualblocks code fullscreen emoticons',
                                            'insertdatetime media table paste code help wordcount'
                                        ],
                                        toolbar: 'formatselect fontsizeselect fontselect | forecolor backcolor |' +
                                        'bold italic | alignleft aligncenter ' + 'alignright alignjustify | bullist numlist outdent indent | emoticons  ' +
                                        'removeformat | help',
                                        content_style: "['https://fonts.googleapis.com/css?family=Raleway', 'https://fonts.googleapis.com/css?family=Baloo+Bhaijaan','https://fonts.googleapis.com/css?family=Oswald','https://fonts.googleapis.com/css2?family=Dosis','https://fonts.googleapis.com/css2?family=Comfortaa','https://fonts.googleapis.com/css?family=Poppins', 'https://fonts.googleapis.com/css?family=Roboto','https://fonts.googleapis.com/css?family=Acme','https://fonts.googleapis.com/css2?family=Righteous','https://fonts.googleapis.com/css?family=Permanent+Marker','https://fonts.googleapis.com/css?family=Open+Sans','https://fonts.googleapis.com/css?family=Montserrat','https://fonts.googleapis.com/css?family=Lato'] body { font-family:Helvetica,Arial,sans-serif; font-size:14px; }",
                                        font_formats: 'Arial=arial,helvetica,sans-serif;Lato=Lato,sans-serif,helvetica;Raleway=raleway,sans-serif;Sans Serif=sans-serif,sans-serif;Open Sans=Open Sans,sans-serif;Roboto=roboto,sans-serif;Righteous=righteous, cursive;Montserrat=montserrat,sans-serif;Comfortaa=comfortaa;Dosis=dosis;Baloo+Bhaijaan=Baloo+Bhaijaan,sans-serif;Oswald=Oswald,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier;Poppins=poppins,sans-serif,helvetica;Georgia=georgia,palatino;Helvetica=helvetica;Acme=acme, sans-serif;Impact=impact,chicago;Symbol=symbol;Tahoma=tahoma,arial,helvetica,sans-serif;Terminal=terminal,monaco;Times New Roman=times new roman,times;Trebuchet MS=trebuchet ms,geneva;Permanent Marker=permanent marker,sans-serif;Verdana=verdana,geneva;Webdings=webdings;Wingdings=wingdings,zapf dingbats',
                                        branding: false,
                                        fontsize_formats: "2px 4px 6px 8px 10px 12px 14px 16px 18px 20px 22px 24px 36px 38px 40px",
                                    }}
                                    onEditorChange={(newValue, editor) => {
                                        setDescription(newValue);
                                    }}  
                                />  
                                <label>Footer</label>
                                <Editor
                                        initialValue={contentFooter}
                                        id='footer'    
                                        apiKey='9uqss8w1z9wfu4dzfapbrxa0sqk3s2rehx73slllze5suxzw'
                                        init={{
                                            height: 150,
                                            menubar: false,
                                            plugins: [
                                                'advlist autolink lists link image charmap print preview anchor',
                                                'emoticons searchreplace visualblocks code fullscreen',
                                                'insertdatetime media table paste code help wordcount'
                                            ],
                                            toolbar: 'formatselect fontsizeselect fontselect | forecolor backcolor |' + 'bold italic | alignleft aligncenter ' + 'alignright alignjustify | bullist numlist outdent indent | emoticons  ' +
                                            'removeformat | help',
                                            content_style: "['https://fonts.googleapis.com/css?family=Raleway', 'https://fonts.googleapis.com/css?family=Baloo+Bhaijaan','https://fonts.googleapis.com/css?family=Oswald','https://fonts.googleapis.com/css2?family=Dosis','https://fonts.googleapis.com/css2?family=Comfortaa','https://fonts.googleapis.com/css?family=Poppins', 'https://fonts.googleapis.com/css?family=Roboto','https://fonts.googleapis.com/css?family=Acme','https://fonts.googleapis.com/css2?family=Righteous','https://fonts.googleapis.com/css?family=Permanent+Marker','https://fonts.googleapis.com/css?family=Open+Sans','https://fonts.googleapis.com/css?family=Montserrat','https://fonts.googleapis.com/css?family=Lato'] body { font-family:Helvetica,Arial,sans-serif; font-size:14px; }",
                                            font_formats: 'Arial=arial,helvetica,sans-serif;Lato=Lato,sans-serif,helvetica;Raleway=raleway,sans-serif;Sans Serif=sans-serif,sans-serif;Open Sans=Open Sans,sans-serif;Roboto=roboto,sans-serif;Righteous=righteous, cursive;Montserrat=montserrat,sans-serif;Comfortaa=comfortaa;Dosis=dosis;Baloo+Bhaijaan=Baloo+Bhaijaan,sans-serif;Oswald=Oswald,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier;Poppins=poppins,sans-serif,helvetica;Georgia=georgia,palatino;Helvetica=helvetica;Acme=acme, sans-serif;Impact=impact,chicago;Symbol=symbol;Tahoma=tahoma,arial,helvetica,sans-serif;Terminal=terminal,monaco;Times New Roman=times new roman,times;Trebuchet MS=trebuchet ms,geneva;Permanent Marker=permanent marker,sans-serif;Verdana=verdana,geneva;Webdings=webdings;Wingdings=wingdings,zapf dingbats',
                                            fontsize_formats: "2px 4px 6px 8px 10px 12px 14px 16px 18px 20px 22px 24px 36px 38px 40px",
                                            branding: false
                                        }}
                                        onEditorChange={(newValue, editor) => {
                                            setFooter(newValue);
                                        }}  
                                    />  
                            </FormLayout>
                        </Card>
                    </Layout.AnnotatedSection>
        
    );
}
 
export default ContentSettings;
