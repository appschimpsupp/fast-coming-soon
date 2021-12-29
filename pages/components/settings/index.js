import React, { useState, useCallback } from 'react';
import { Form, CalloutCard } from '@shopify/polaris';
import ContentSettings from './sections/content-settings';
import SeoSettings from './sections/seo-settings';
import SaveButton from './sections/save-button';
import TimeSettings from './sections/timer-settings';
import ImageSettings from './sections/images-settings';
import SocialIcons from './sections/social-icons';
import { checkUrlValidationHandler } from '../../../libs/form-validate';
import ToastHandler from '../toastHandler';
import { currentThemeData } from '../../../libs/default-vals';

const IndexSettings = (props) => {
    
    const { 
        activeSettingHandler, 
        appSettings, 
        shop, 
        axiosinstance, 
        activeTheme, 
        app,
        shopData
    } = props;
    
    let defaultData = currentThemeData(activeTheme);
    let storeName = shopData.data.data.body.shop.name ? shopData.data.data.body.shop.name : '';
    
    let contentTitleVal = appSettings.contentTitle ? appSettings.contentTitle : defaultData.contentTitle;
    let contentDescriptionVal = appSettings.contentDescription ? appSettings.contentDescription : defaultData.contentDescription;
    let seoTitleVal = appSettings.seoTitle ? appSettings.seoTitle : storeName;
    let seoDescriptionVal = appSettings.seoDescription ? appSettings.seoDescription : '';
    let seMetatagsVal = appSettings.seoMetatags ? appSettings.seoMetatags : '';
    let contentFooterVal = appSettings.contentFooter ? appSettings.contentFooter : defaultData.contentFooter;
    let timerStatusVal = appSettings.timerStatus ? appSettings.timerStatus : false;
    let timerDateVal = appSettings.timerDate ? new Date(appSettings.timerDate) : new Date();
    let logoUrlVal = appSettings.logoUrl ? appSettings.logoUrl : '';
    let backgroundUrlVal = appSettings.backgroundUrl ? appSettings.backgroundUrl : defaultData.backgroundUrl;
    let backgroundColorStatusVal = 
        appSettings.backgroundColorStatus ? appSettings.backgroundColorStatus : false;
    let backgroundColorVal = appSettings.backgroundColor ? appSettings.backgroundColor : defaultData.backgroundColor;

    let socialFacebookVal = appSettings.socialFacebook ? appSettings.socialFacebook : '';
    let socialTwitterVal = appSettings.socialTwitter ? appSettings.socialTwitter : '';
    let socialLinkedInVal = appSettings.socialLinkedIn ? appSettings.socialLinkedIn : '';
    let socialGooglePlusVal = appSettings.socialGooglePlus ? appSettings.socialGooglePlus : '';
    let socialYoutubeVal = appSettings.socialYoutube ? appSettings.socialYoutube : '';
    let socialPinterestVal = appSettings.socialPinterest ? appSettings.socialPinterest : '';
    let socialEmailVal = appSettings.socialEmail ? appSettings.socialEmail : '';
    let socialStatusVal = appSettings.socialStatus ? appSettings.socialStatus : defaultData.socialStatus;;

    const [saveSettings, setSaveSettings] = useState(0);
    const [toastMsg, setToastMsg] = useState(0);
    const [toastStatus, setToastStatus] = useState(false);
    const [toastType, setToastType] = useState(false); // false means simple. true means error.

    /* Settings Field states */
    const [contentTitle, setContentTitle] = useState(contentTitleVal);
    const [contentDescription, setContentDescription] = useState(contentDescriptionVal);
    const [contentFooter, setContentFooter] = useState(contentFooterVal);
    const [seoTitle, setSeoTitle] = useState(seoTitleVal);
    const [seoDescription, setSeoDescription] = useState(seoDescriptionVal);
    const [seoMetatags, setSeoMetatags] = useState(seMetatagsVal);
    const [timerStatus, setTimerStatus] = useState(timerStatusVal);
    const [timerDate, setTimerDate] = useState(timerDateVal);
    const [selectedDates, setSelectedDates] = useState({
        start: timerDateVal,
        end: timerDateVal
    });
    
    const [logoUrl, setLogoUrl] = useState(logoUrlVal);
    const [backgroundUrl, setBackgroundUrl] = useState(backgroundUrlVal);
    const [backgroundColorStatus, setBackgroundColorStatus] = useState(backgroundColorStatusVal);
    const [backgroundColor, setBackgroundColor] = useState({
        hue: backgroundColorVal.hue,
        brightness: backgroundColorVal.brightness,
        saturation: backgroundColorVal.saturation,
    });
    const [socialStatus, setSocialStatus]   = useState(socialStatusVal);
    const [socialFacebook, setSocialFacebook]   = useState(socialFacebookVal);
    const [socialTwitter, setSocialTwitter]    = useState(socialTwitterVal);
    const [socialLinkedIn, setSocialLinkedIn]   = useState(socialLinkedInVal);
    const [socialGooglePlus, setSocialGooglePlus] = useState(socialGooglePlusVal);
    const [socialYoutube, setSocialYoutube]    = useState(socialYoutubeVal);
    const [socialPinterest, setSocialPinterest]  = useState(socialPinterestVal);
    const [socialEmail, setSocialEmail]      = useState(socialEmailVal);
    /* Settings Field states Ends */

    const [emailError, setEmailError] = useState('');
    const [fbError, setFBError] = useState('');
    const [twError, setTwError] = useState('');
    const [lkError, setLKError] = useState('');
    const [ptError, setPTError] = useState('');
    const [ytError, setYTError] = useState('');
    const [gpError, setGPError] = useState('');

    // Save setting handler
    const saveSettingHandler = useCallback((_event) => {
        //console.log(lkError);
        if(
            emailError != '' ||
            fbError != '' ||
            twError != '' ||
            lkError != '' ||
            ptError != '' ||
            ytError != '' ||
            gpError != ''
        ) {
            setToastType(true);
            handleToastStatus(true);
            handleToastMsg('Settings Saved Failed');
            return false;
        }
        
        setSaveSettings(1);

        let formData = {
            contentTitle : contentTitle,
            contentDescription : contentDescription,
            seoTitle : seoTitle,
            seoDescription : seoDescription,
            contentFooter : contentFooter,
            timerStatus : timerStatus,
            timerDate : timerDate,
            logoUrl : logoUrl,
            backgroundUrl: backgroundUrl,
            backgroundColorStatus:backgroundColorStatus,
            backgroundColor: backgroundColor,
            seoMetatags: seoMetatags,
            socialStatus:socialStatus,
            socialEmail:socialEmail,
            socialTwitter:socialTwitter,
            socialLinkedIn:socialLinkedIn,
            socialGooglePlus:socialGooglePlus,
            socialYoutube:socialYoutube,
            socialPinterest:socialPinterest,
            socialFacebook:socialFacebook
        }

        //console.log(formData);

        axiosinstance.post('/saveSettings', {
            formData: formData,
            shop : shop
        })
        .then(function (response) {
            //console.log('response : ' + response);
            setSaveSettings(0);
            setToastType('');
            handleToastStatus(true);
            handleToastMsg('Settings Saved Successfully');
        })
        .catch(function (error) {
           // console.log('error : ' + error);
            setToastType('');
            setSaveSettings(0);
        })
    }, [
        contentTitle, 
        contentDescription, 
        seoTitle, 
        seoDescription, 
        contentFooter, 
        timerStatus,
        timerDate,
        logoUrl,
        backgroundUrl,
        backgroundColorStatus,
        backgroundColor,
        seoMetatags,
        socialFacebook,
        socialTwitter,
        socialGooglePlus,
        socialLinkedIn,
        socialPinterest,
        socialYoutube,
        socialEmail,
        socialStatus,
        emailError,
        fbError,
        twError,
        lkError,
        ptError,
        ytError,
        gpError
    ]);

    /**
     * Set content title.
     * @param {*} val 
     */
    const setContentTitleHandler = useCallback((val) => {
        setContentTitle(val);
    },[contentTitle]);

    /**
     * Set content description.
     * @param {*} val 
     */
    const setContentDescriptionHandler = useCallback((val) => {
        setContentDescription(val);
    },[contentDescription]);
    
    /**
     * Set SEO title.
     * @param {*} val 
     */
    const setSeoTitleHandler = useCallback((val) => {
        setSeoTitle(val);
    },[seoTitle]);

    /**
     * Set SEO description.
     * @param {*} val 
     */
    const setSeoDescriptionHandler = useCallback((val) => {
        setSeoDescription(val);
    },[seoDescription]);

    /**
     * Set SEO metatags.
     * @param {*} val 
     */
     const setSeoMetatagsHandler = useCallback((val) => {
        setSeoMetatags(val);
    },[seoMetatags]);

    /**
     * Set timer status.
     * @param {*} val 
     */
     const setTimerStatusHandler = useCallback((val) => {
        setTimerStatus(val);
    },[timerStatus]);

    /**
     * Set timer date value.
     * @param {*} val 
     */
     const setTimerDateHandler = useCallback((val) => {
         var selectedDate = val.start;
         var month = selectedDate.getMonth() + 1;
         var day = selectedDate.getDate();
         var year = selectedDate.getFullYear();
         let newDateFormat = year + "/" + month + "/" + day;
        // console.log(newDateFormat);
         setTimerDate(newDateFormat);
         setSelectedDates({
            start: new Date(newDateFormat),
            end: new Date(newDateFormat)
         });
    },[timerDate]);

    /**
     * Set logo handler.
     */
    const setLogoUrlHandler = useCallback((logoDetails) => {
        if(logoDetails !== 'empty') {
            setLogoUrl(logoDetails.originalUrl);
        } else {
            setLogoUrl('');
        }
    },[logoUrl]);

    /**
     * Set background handler.
     */
     const setBackgroundUrlHandler = useCallback((backgroundDetails) => {
        if(backgroundDetails !== 'empty') {
            setBackgroundUrl(backgroundDetails.originalUrl);
        } else {
            setBackgroundUrl('');
        }
    },[backgroundUrl]);

    /**
     * Set background color status.
     */
     const setBackgroundColorStatusHandler = useCallback((val) => {
        setBackgroundColorStatus(val);
    },[backgroundColorStatus]);

     /**
     * Set background color.
     */
      const setBackgroundColorHandler =  useCallback((val) => {
        setBackgroundColor({
            hue: val.hue,
            brightness: val.brightness,
            saturation: val.saturation
        });
    },[backgroundColor]);


    /**
     * Action to set Toast status state.
     */
     const handleToastStatus = useCallback((status) => {
        setToastStatus(status);
    }, [toastStatus]);

     /**
     * Action to set Toast message state.
     */
    const handleToastMsg = useCallback((msg) => {
        setToastMsg(msg);
    }, [toastMsg]);


    /**
     * Set Facebook social url.
     */
     const setSocialFacebookHandler = useCallback((val) => {
        setSocialFacebook(val)
    }, [socialFacebook]);

    /**
     * Set Twitter social url.
     */
     const setSocialTwitterHandler = useCallback((val) => {
        setSocialTwitter(val);
    }, [socialTwitter]);

    /**
     * Set LinkedIn social url.
     */
     const setSocialLinkedInHandler = useCallback((val) => {
        setSocialLinkedIn(val);
    }, [socialLinkedIn]);

    /**
     * Set Google Plus social url.
     */
     const setSocialGooglePlusHandler = useCallback((val) => {
        setSocialGooglePlus(val);
    }, [socialGooglePlus]);

    /**
     * Set Youtube social url.
     */
     const setSocialYoutubeHandler = useCallback((val) => {
        setSocialYoutube(val);
    }, [socialYoutube]);

    /**
     * Set Pinterest social url.
     */
     const setSocialPinterestHandler = useCallback((val) => {
        setSocialPinterest(val);
    }, [socialPinterest]);

     /**
     * Set Email address.
     */
      const setSocialEmailHandler = useCallback((val) => {
        setSocialEmail(val);
    }, [socialEmail]);


     /**
     * Set social icons status.
     */
      const setSocialStatusHandler = useCallback((val) => {
        setSocialStatus(val);
    }, [socialStatus]);

    /**
     * Set email validation.
     */
    const setMailValidationHandler = useCallback((val) => {
        //let response = checkMailValidationHandler(val);
        //setEmailError(response);
    }, [socialEmail]);
    

     /**
     * Set FB validation.
     */
      const setFBErrorHandler = useCallback((val) => {
        let response = checkUrlValidationHandler(val);
        //console.log(response);
        setFBError(response);
    }, [socialFacebook]);

    
     /**
     * Set twitter validation.
     */
      const setTwErrorHandler = useCallback((val) => {
        let response = checkUrlValidationHandler(val);
        setTwError(response);
    }, [socialTwitter]);

     /**
     * Set Linkedin validation.
     */
      const setLKErrorHandler = useCallback((val) => {
        let response = checkUrlValidationHandler(val);
       // console.log(response);
        setLKError(response);
    }, [socialLinkedIn]);

    /**
     * Set Pinterest validation.
     */
     const setPTErrorHandler = useCallback((val) => {
        let response = checkUrlValidationHandler(val);
        setPTError(response);
    }, [socialPinterest]);

   /**
     * Set Google Plus validation.
     */
    const setSocialGPlHandler = useCallback((val) => {
        let response = checkUrlValidationHandler(val);
        setGPError(response);
    }, [socialGooglePlus]);

    /**
     * Set Youtube validation.
     */
     const setYTErrorHandler = useCallback((val) => {
        let response = checkUrlValidationHandler(val);
        setYTError(response);
    }, [socialYoutube]);


    return (
        <React.Fragment>
            <CalloutCard
                title="Select Your Theme"
                illustration="https://cdn.shopify.com/s/assets/admin/checkout/settings-customizecart-705f57c725ac05be5a34ec20c05b94298cb8afd10aac7bd9c7ad02030f48cfa0.svg"
                primaryAction={{
                    content: 'Select Your Theme',
                    onAction: () => { activeSettingHandler(0) },
                }}
            >
                <p>Select your favourite theme by clicking the link below.</p>
            </CalloutCard>
            <br />
            { /* Settings Form start */ }
            <Form onSubmit={() => {saveSettingHandler()}}>  
                
                <ImageSettings 
                    setLogoUrl={setLogoUrlHandler}
                    logoUrl={logoUrl}
                    backgroundUrl={backgroundUrl}
                    setBackgroundUrl={setBackgroundUrlHandler}
                    backgroundColor={backgroundColor}
                    setBackgroundColor={setBackgroundColorHandler}
                    backgroundColorStatus={backgroundColorStatus}
                    setBackgroundColorStatus={setBackgroundColorStatusHandler}
                    activeTheme={activeTheme}
                />
                <ContentSettings 
                    contentTitle={contentTitle} 
                    contentDescription={contentDescription}
                    contentFooter={contentFooter}
                    setFooter={setContentFooter}
                    setTitle={setContentTitleHandler} 
                    setDescription={setContentDescriptionHandler}
                /> 
                <TimeSettings 
                    timerStatus={timerStatus}
                    setTimerStatus={setTimerStatusHandler}
                    timerDate={timerDate}
                    setTimerDateHandler={setTimerDateHandler}
                    selectedDates={selectedDates}
                />
                <SeoSettings 
                    seoTitle={seoTitle} 
                    seoDescription={seoDescription}
                    setSeoTitle={setSeoTitleHandler} 
                    setSeoDescription={setSeoDescriptionHandler}
                    seoMetatags={seoMetatags}
                    setSeoMetatags={setSeoMetatagsHandler}
                />
                <SocialIcons 
                    socialStatus={socialStatus}
                    setSocialStatus={setSocialStatusHandler}
                    socialEmail={socialEmail}
                    socialFacebook={socialFacebook}
                    socialGooglePlus={socialGooglePlus}
                    socialLinkedIn={socialLinkedIn}
                    socialPinterest={socialPinterest}
                    socialYoutube={socialYoutube}
                    socialTwitter={socialTwitter}
                    setSocialEmail={setSocialEmailHandler}
                    setSocialFacebook={setSocialFacebookHandler}
                    setSocialTwitter={setSocialTwitterHandler}
                    setSocialPinterest={setSocialPinterestHandler}
                    setSocialGooglePlus={setSocialGooglePlusHandler}
                    setSocialYoutube={setSocialYoutubeHandler}
                    setSocialLinkedIn={setSocialLinkedInHandler}
                    
                    emailError={emailError}
                    setMailValidation={setMailValidationHandler}

                    fbError={fbError}
                    twError={twError}
                    lkError={lkError}
                    ytError={ytError}
                    ptError={ptError}
                    gpError={gpError}

                    setFBErrorFunc={setFBErrorHandler}
                    setTwErrorFunc={setTwErrorHandler}
                    setLKErrorFunc={setLKErrorHandler}
                    setYTErrorFunc={setYTErrorHandler}
                    setPTErrorFunc={setPTErrorHandler}
                    setGPErrorFunc={setSocialGPlHandler}
                />
                <ToastHandler  
                    toastMsg={toastMsg} 
                    toastStatus={toastStatus} 
                    toastType={toastType}
                    handleToastStatus={handleToastStatus} 
                />
                <SaveButton 
                    saveSettings={saveSettings}
                    saveSettingHandle={saveSettingHandler}
                    app={app}
                    shop={shop}
                />
            </Form>
            { /* Settings Form endas */ }
        </React.Fragment>
    );
}
 
export default IndexSettings;