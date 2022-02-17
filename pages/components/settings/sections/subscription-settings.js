import React, { useState } from 'react';
import { Select, TextStyle, Link, Banner, ColorPicker, Checkbox, Card, Layout, FormLayout, Button, TextField } from '@shopify/polaris';
import { showToast } from '../../../../libs/toast-handler';

const SubscriptionSettings = (props) => {
    const {
        subscriptionStatus,
        setSubscriptionStatus,
        mcStatus,
        setMCStatus,
        mckey, 
        setMCkey, 
        mclistOption,
        mcList,
        setMCList,
        setMCListOption,
        klStatus,
        klkey,
        kllistOption,
        klList,
        setKlkey,
        setKlStatus,
        setKlListOption,
        setKlList,
        axiosinstance,
        shop,
        app,
        emailBtnTxt,
        setEmailBtnTxt,
        emailPlaceholder,
        setEmailPlaceholder,
        emailBtnColor,
        setEmailBtnColor,
        emailBtnBackColor,
        setEmailBtnBackColor,
        inputTxtColor,
        setInputTxtColor,
        inputBackColor,
        setInputBackColor,
        successMsg,
        setSuccessMsg,
        failMsg,
        setFailMsg,
        nameFieldStatus,
        setNameFieldStatus,
        namePlaceholder,
        setNamePlaceholder,
        saveShopifyCustStatus,
        setSaveShopifyCustStatus,
        subscriberFontFamily,
        setSubscriberFontFamily,
        subscriberFontFamilyLabel
    } = props;

    const [loadMCBtn, setLoadMCBtn] = useState(false);
    const [loadKlBtn, setLoadKlBtn] = useState(false);
    
    /**
     * Set Klaviyo subscription status.
     */
     const getKlaviyoList = () => {
        //console.log('Get Klaviyo lists');
        setLoadKlBtn(true);
        if(mckey == '') {
            showToast(app, true, 'Invalid API Key');
            setLoadKlBtn(false);
        } else {
            // Send request to Klaviyo.
            axiosinstance({ 
                method: 'get', 
                url: '/getKlaviyoLists',
                params: {
                  shop: shop, 
                  klkey : klkey
                }
            }).then(function (response) {
                //console.log('klaviyo response : ' + JSON.stringify(response));
                if(response.data.data) {
                    //console.log('Mailchimp :- '+ JSON.stringify(response.data.data.lists));
                    let klAudLists = [{label: 'Select from here', value: 'none'}];
                    let roots = response.data.data.map(function(num) {
                        //console.log('num :- '+ num.id);
                        klAudLists.push({
                            value: num.list_id, 
                            label: num.list_name
                        }); 
                        return true;
                    });
                    //console.log('mcAudLists :- '+ JSON.stringify(mcAudLists));
                    setKlList(klAudLists);
                    showToast(app, false, 'Klaviyo List Loaded Successfully');
                }
                
                setLoadKlBtn(false);
            }).catch(error => {
               setLoadKlBtn(false);
               //console.log('klaviyo error : ' + error);
               showToast(app, true, 'Please input valid API Key');
            }); 
        }
     }

     /**
     * Set mail chimp subscription status.
     */
    const getAudienceList = () => {
        //('Get Mailchimp lists'); 

        setLoadMCBtn(true);
        if(mckey == '') {
            showToast(app, true, 'Invalid API Key');
            setLoadMCBtn(false);
        } else {
            // Send request to Mailchimp.
            axiosinstance({ 
                method: 'get', 
                url: '/getSubscriptionLists',
                params: {
                  shop: shop, 
                  mckey : mckey
                }
              }).then(function (response) {
                //console.log('Mailchimp :- '+ JSON.stringify(response));
                if(response.data.data.lists && response.status == 200) {
                    
                    let mcAudLists = [{label: 'Select from here', value: 'none'}];
                    let roots = response.data.data.lists.map(function(num) {
                        //console.log('num :- '+ num.id);
                        mcAudLists.push({
                            value: num.id, 
                            label: num.name
                        }); 
                        return true;
                    });
                    //console.log('mcAudLists :- '+ JSON.stringify(mcAudLists));
                    setMCList(mcAudLists);
                    showToast(app, false, 'Mailchimp Audience List Loaded Successfully');
                } else {
                    showToast(app, true, 'Please input valid API Key');
                }
                
                setLoadMCBtn(false);
             })
             .catch(error => {
                showToast(app, true, 'Please input valid API Key');
                //console.log('Mailchimp error : ' + error);
                setLoadMCBtn(false);
             }); 
        }
    }

    // const options = [
    //     {label: 'Select from here', value: 'none'}
    //   ];

    // Show Mailchimp content if selected.
    let mcContent = mcStatus == true ? 
    <React.Fragment>
        <TextField
            label="Mailchimp API Key"
            value={mckey}
            onChange={setMCkey}
            autoComplete="off"
        /> 
        <br />
        <Select
            label="Select your audenice list"
            options={mcList}
            onChange={setMCListOption}
            value={mclistOption}
        />
        <br />
        <Button primary fullWidth onClick={() => getAudienceList()} loading={loadMCBtn}>
            Click here to get Mailchimp audience list
        </Button>
    </React.Fragment>: '';

    // Show Mailchimp content if selected.
    let mcKlaviyo = klStatus == true ? 
    <React.Fragment>
        <TextField
            label="Klaviyo API Key"
            value={klkey}
            onChange={setKlkey}
            autoComplete="off"
        /> 
        <br />
      
        <Select
            label="Select your list"
            options={klList}
            onChange={setKlListOption}
            value={kllistOption}
        />
        <br />
        <Button primary fullWidth onClick={() => getKlaviyoList()} loading={loadKlBtn}>
                Click here to get Klaviyo list
        </Button>
    </React.Fragment>: '';
    
    return (
        
            <Layout.AnnotatedSection
                id="subscriptionDetails"
                title="Email Subscription Settings"
                description="Set your coming soon page email subscription settings."
            >
            <FormLayout>
                    <Card>
                        <Card.Section>
                            <Checkbox
                                    label="Enable Email Subscription Form"
                                    checked={subscriptionStatus}
                                    onChange={setSubscriptionStatus}
                            />
                        </Card.Section>
                        <Card.Section>
                            {/* Button settings */}
                            <FormLayout>
                                <TextStyle variation="strong">Choose Button Settings</TextStyle>
                                <FormLayout.Group>
                                    <TextField 
                                        label="Button Text" 
                                        onChange={setEmailBtnTxt} 
                                        autoComplete="off"
                                        value={emailBtnTxt}
                                    />
                                    <TextField 
                                        label="Email Placeholder " 
                                        onChange={setEmailPlaceholder} 
                                        value={emailPlaceholder}
                                        autoComplete="off" 
                                    />
                                </FormLayout.Group>
                                <FormLayout.Group>
                                    <div>
                                        <label className="Polaris-Label__Text" style={{marginBottom:5}}>Select Button Background Color</label>
                                        <ColorPicker onChange={setEmailBtnBackColor} color={emailBtnBackColor} />
                                    </div>
                                    <div>
                                        <label className="Polaris-Label__Text" style={{marginBottom:5}}>Select Button Text Color</label>
                                        <ColorPicker onChange={setEmailBtnColor} color={emailBtnColor} />
                                    </div>
                                </FormLayout.Group> 
                        </FormLayout>
                        <br />
                        <div className="">
                                    <div className="Polaris-Labelled__LabelWrapper">
                                    <div className="Polaris-Label"><label id="PolarisSelect8Label"  className="Polaris-Label__Text">Select Email Font</label></div>
                                    </div>
                                    <div className="Polaris-Select">
                                    <select id="PolarisSelect8" className="Polaris-Select__Input" aria-invalid="false" onChange={setSubscriberFontFamily} >
                                        <option style={{fontFamily:"arial,helvetica,sans-serif"}} value="arial,helvetica,sans-serif">Arial</option>
                                        <option style={{fontFamily:"raleway,sans-serif"}} value="raleway,sans-serif">Raleway</option>
                                        <option style={{fontFamily:"roboto,sans-serif"}} value="roboto,sans-serif">Roboto</option>
                                        <option style={{fontFamily:"righteous"}} value="righteous,sans-serif">Righteous</option>
                                        <option style={{fontFamily:"poppins,sans-serif,helvetica"}} value="poppins,sans-serif,helvetica">Poppins</option>
                                        <option style={{fontFamily:"permanent marker,sans-serif"}} value="permanent marker,sans-serif">Permanent Marker</option>
                                        <option style={{fontFamily:"montserrat,sans-serif"}} value="montserrat,sans-serif">Montserrat</option>
                                        <option style={{fontFamily:"comfortaa"}} value="comfortaa,sans-serif">Comfortaa</option>
                                        <option style={{fontFamily:"dosis"}} value="dosis,sans-serif">Dosis</option>
                                        <option style={{fontFamily:"orbitron,sans-serif,helvetica"}} value="orbitron,sans-serif,helvetica">Orbitron</option>
                                        <option style={{fontFamily:"Open Sans,sans-serif"}} value="Open Sans,sans-serif">Open Sans</option>
                                        <option style={{fontFamily:"Dancing Script,sans-serif,helvetica"}} value="Dancing Script,sans-serif,helvetica">Dancing Script</option>
                                        <option style={{fontFamily:"Lato,sans-serif,helvetica"}} value="Lato,sans-serif,helvetica">Lato</option>
                                        <option style={{fontFamily:"Pacifico,sans-serif"}} value="Pacifico,sans-serif">Pacifico</option>
                                        <option style={{fontFamily:"Baloo+Bhaijaan,sans-serif"}} value="Baloo+Bhaijaan,sans-serif">Baloo Bhaijaan</option>
                                        <option style={{fontFamily:"Oswald,sans-serif"}} value="Oswald,sans-serif">Oswald</option>
                                        <option style={{fontFamily:"arial black,avant garde"}} value="arial black,avant garde">Arial Black</option>
                                        <option style={{fontFamily:"book antiqua,palatino"}} value="book antiqua,palatino">Book Antiqua</option>
                                        <option style={{fontFamily:"comic sans ms,sans-serif"}} value="comic sans ms,sans-serif">Comic Sans MS</option>
                                        <option style={{fontFamily:"courier new,courier"}} value="courier new,courier">Courier New</option>
                                        <option style={{fontFamily:"georgia,palatino"}} value="georgia,palatino">Georgia</option>
                                        <option style={{fontFamily:"helvetica"}} value="helvetica,sans-serif">Helvetica</option> 
                                        <option style={{fontFamily:"impact,chicago"}} value="impact,chicago">Impact</option>
                                        <option style={{fontFamily:"symbol"}} value="symbol">Symbol</option>
                                        <option style={{fontFamily:"tahoma,arial,helvetica,sans-serif"}} value="tahoma,arial,helvetica,sans-serif">Tahoma</option>
                                        <option style={{fontFamily:"terminal,monaco"}} value="terminal,monaco">Terminal</option>
                                        <option style={{fontFamily:"times new roman,times"}} value="times new roman,times">Times New Roman</option>
                                        <option style={{fontFamily:"trebuchet ms,geneva"}} value="trebuchet ms,geneva">Trebuchet MS</option>
                                        <option style={{fontFamily:"verdana,geneva"}} value="verdana,geneva">Verdana</option>
                                        <option style={{fontFamily:"Lexend Deca,geneva"}} value="Lexend Deca,geneva">Lexend Deca</option>
                                    </select>
                                    <div className="Polaris-Select__Content" aria-hidden="true"><span className="Polaris-Select__SelectedOption">{subscriberFontFamilyLabel}</span><span className="Polaris-Select__Icon"><span className="Polaris-Icon"><span className="Polaris-VisuallyHidden"></span><svg viewBox="0 0 20 20" className="Polaris-Icon__Svg" focusable="false" aria-hidden="true">
                                            <path d="M7.676 9h4.648c.563 0 .879-.603.53-1.014L10.531 5.24a.708.708 0 0 0-1.062 0L7.145 7.986C6.798 8.397 7.113 9 7.676 9zm4.648 2H7.676c-.563 0-.878.603-.53 1.014l2.323 2.746c.27.32.792.32 1.062 0l2.323-2.746c.349-.411.033-1.014-.53-1.014z"></path>
                                            </svg></span></span></div>
                                    <div className="Polaris-Select__Backdrop"></div>
                                    </div>
                                </div>
                        {/* Button settings ends */}
                        </Card.Section>
                        <Card.Section>
                        {/* Input field settings */}
                            <FormLayout>
                                <TextStyle variation="strong">Choose Input Field Settings</TextStyle>
                                <FormLayout.Group>
                                    <div>
                                        <label className="Polaris-Label__Text" style={{marginBottom:5}}>Select Input Fields Text Color</label>
                                        <ColorPicker onChange={setInputTxtColor} color={inputTxtColor} />
                                    </div>
                                    <div>
                                        <label className="Polaris-Label__Text" style={{marginBottom:5}}>Select Input Fields Background Color</label>
                                        <ColorPicker onChange={setInputBackColor} color={inputBackColor} />
                                    </div>
                                </FormLayout.Group>
                            </FormLayout>
                        </Card.Section>
                        {/* Input field settings ends */}

                        <Card.Section>
                        {/* Message settings */}
                            <FormLayout>
                            <TextStyle variation="strong">Choose Message Settings</TextStyle>
                                <FormLayout.Group>
                                    <TextField fullWidth 
                                        label="Success Email Subscription Message " 
                                        onChange={setSuccessMsg} 
                                        autoComplete="off" 
                                        value={successMsg}
                                    />
                                    <TextField fullWidth 
                                        label="Fail Email Subscription Message" 
                                        onChange={setFailMsg} 
                                        autoComplete="off" 
                                        value={failMsg}
                                    />
                                </FormLayout.Group>
                            </FormLayout>
                        </Card.Section>
                        {/* Message settings ends */}
                        {/* Name field settings */}
                        <Card.Section>
                            <FormLayout>
                                <TextStyle variation="strong">Name Field Settings</TextStyle>
                                <Checkbox
                                    label="Enable Subscription Name Field"
                                    checked={nameFieldStatus}
                                    onChange={setNameFieldStatus}
                                />
                                <TextField fullWidth 
                                    label="Name Field Placeholder" 
                                    onChange={setNamePlaceholder} 
                                    autoComplete="off" 
                                    value={namePlaceholder}
                                />
                            </FormLayout>
                        </Card.Section>
                        {/* Name field settings ends */}
                        <Card.Section>
                            <FormLayout> 
                                {/* Shopify customer settings */}
                                <TextStyle variation="strong">Shopify Customer Marketing Settings</TextStyle>
                                <Checkbox
                                    label="Disable saving customer subscription email to store admin customers"
                                    checked={saveShopifyCustStatus}
                                    onChange={setSaveShopifyCustStatus}
                                />
                            </FormLayout>
                        </Card.Section>
                        <Card.Section>
                        {/* Mailchimp settings */}
                            <FormLayout>
                                <p>{saveShopifyCustStatus}</p>
                                <Checkbox
                                    label="Enable Mailchimp"
                                    checked={mcStatus}
                                    onChange={setMCStatus}
                                />
                                {mcContent}
                            </FormLayout>
                        </Card.Section>
                        {/* Klaviyo settings */}
                        <Card.Section>
                            <FormLayout> 
                                <Checkbox
                                    label="Enable Klaviyo"
                                    checked={klStatus}
                                    onChange={setKlStatus}
                                />
                                {mcKlaviyo}
                            </FormLayout>
                        </Card.Section>
                        <Card.Section>
                            <Banner
                                title="How subscription works"
                                status="info" 
                            >
                            <p>By default, all emails will be saved to the Shopify admin area customer list (<Link url={"https://"+shop+"/admin/customers"} external={true}>Click here to check subscribers in shopify</Link>). You can disable it by checking <TextStyle variation="strong">Disable saving customer subscription email to store admin customers</TextStyle>. You can also enable <TextStyle>Mailchimp and Klaviyo</TextStyle>.</p>
                            </Banner>
                        </Card.Section>
                </Card>
                </FormLayout>
            </Layout.AnnotatedSection>
        
    );
}
 
export default SubscriptionSettings;