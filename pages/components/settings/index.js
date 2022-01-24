import React, { useState, useCallback } from 'react';
import { Form, CalloutCard } from '@shopify/polaris';
import ContentSettings from './sections/content-settings';
import SeoSettings from './sections/seo-settings';
import SaveButton from './sections/save-button';
import SubscriptionSettings from './sections/subscription-settings';
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
    //console.log('appSettings' + JSON.stringify(appSettings));
    let contentDescriptionVal = appSettings.contentDescription ? appSettings.contentDescription : defaultData.contentDescription;
    let seoTitleVal = appSettings.seoTitle ? appSettings.seoTitle : storeName;
    let fbPixelVal = appSettings.seoTitle ? appSettings.fbPixel : '';
    let googleAnaVal = appSettings.googleAna ? appSettings.googleAna : '';
    let seoDescriptionVal = appSettings.seoDescription ? appSettings.seoDescription : '';
    let seMetatagsVal = appSettings.seoMetatags ? appSettings.seoMetatags : '';
    let contentFooterVal = appSettings.contentFooter ? appSettings.contentFooter : defaultData.contentFooter;
    let timerStatusVal = appSettings.timerStatus ? appSettings.timerStatus : false;
    let timerColorVal = appSettings.timerColor ? appSettings.timerColor : defaultData.timerColor;
    
    let timerDateVal = appSettings.timerDate ? new Date(appSettings.timerDate) : new Date();
    let logoUrlVal = appSettings.logoUrl ? appSettings.logoUrl : '';
    let favUrlVal = appSettings.favUrl ? appSettings.favUrl : '';
    let backgroundUrlVal = appSettings.backgroundUrl ? appSettings.backgroundUrl : defaultData.backgroundUrl;
    let backgroundColorStatusVal = 
        appSettings.backgroundColorStatus ? appSettings.backgroundColorStatus : false;
    let backgroundColorVal = appSettings.backgroundColor ? appSettings.backgroundColor : defaultData.backgroundColor;
 
    let selectedTimezoneVal = appSettings.selectedTimezone ? appSettings.selectedTimezone : defaultData.selectedTimezone;
    let selectedTimeVal = appSettings.selectedTime ? appSettings.selectedTime : defaultData.selectedTime;

    let socialFacebookVal = appSettings.socialFacebook ? appSettings.socialFacebook : '';
    let socialTwitterVal = appSettings.socialTwitter ? appSettings.socialTwitter : '';
    let socialLinkedInVal = appSettings.socialLinkedIn ? appSettings.socialLinkedIn : '';
    let socialGooglePlusVal = appSettings.socialGooglePlus ? appSettings.socialGooglePlus : '';
    let socialYoutubeVal = appSettings.socialYoutube ? appSettings.socialYoutube : '';
    let socialPinterestVal = appSettings.socialPinterest ? appSettings.socialPinterest : '';
    let socialEmailVal = appSettings.socialEmail ? appSettings.socialEmail : '';
    let socialStatusVal = appSettings.socialStatus ? appSettings.socialStatus : defaultData.socialStatus;
    let socialIconColorVal = appSettings.socialIconColor ? appSettings.socialIconColor : defaultData.socialIconColor;
    let socialIconBackColorVal = appSettings.socialIconBackColor ? appSettings.socialIconBackColor : defaultData.socialIconBackColor;
    let socialDefaultColorStatusVal = appSettings.socialDefaultColorStatus ? appSettings.socialDefaultColorStatus : defaultData.socialDefaultColorStatus;

    /* Mailchimp fields */
    let mcStatusVal = appSettings.mcStatus ? appSettings.mcStatus : false;
    let mcKeyVal = appSettings.mckey ? appSettings.mckey : '';
    let subscriptionStatusVal = appSettings.subscriptionStatus ? appSettings.subscriptionStatus : defaultData.subscriptionStatus;
    let mclistOptionVal = appSettings.mclistOption ? appSettings.mclistOption : '';
    let mcListVal = appSettings.mcList ? appSettings.mcList : [{label: 'Select from here', value: 'none'}];

    /* Klaviyo fields */
    let klStatusVal = appSettings.klStatus ? appSettings.klStatus : false;
    let klKeyVal = appSettings.klkey ? appSettings.klkey : '';
    let klistOptionVal = appSettings.kllistOption ? appSettings.kllistOption : '';
    let klListVal = appSettings.klList ? appSettings.klList : [{label: 'Select from here', value: 'none'}];

    /* Subscription settings */
    let emailBtnTxtVal = appSettings.emailBtnTxt ? appSettings.emailBtnTxt : defaultData.emailBtnTxt;
    let emailPlaceholderVal = appSettings.emailPlaceholder ? appSettings.emailPlaceholder : defaultData.emailPlaceholder;
    let emailBtnColorVal = appSettings.emailBtnColor ? appSettings.emailBtnColor : defaultData.emailBtnColor;
    let emailBtnBackColorVal = appSettings.emailBtnBackColor ? appSettings.emailBtnBackColor : defaultData.emailBtnBackColor;
    let inputTxtColorVal = appSettings.inputTxtColor ? appSettings.inputTxtColor : defaultData.inputTxtColor;
    let inputBackColorVal = appSettings.inputBackColor ? appSettings.inputBackColor : defaultData.inputBackColor;
    let successMsgVal = appSettings.successMsg ? appSettings.successMsg : defaultData.successMsg;
    let failMsgVal = appSettings.failMsg ? appSettings.failMsg : defaultData.failMsg;
    let nameFieldStatusVal = appSettings.nameFieldStatus ? appSettings.nameFieldStatus : defaultData.nameFieldStatus;
    let namePlaceholderVal = appSettings.namePlaceholder ? appSettings.namePlaceholder : defaultData.namePlaceholder;
    let saveShopifyCustStatusVal = appSettings.saveShopifyCustStatus ? appSettings.saveShopifyCustStatus : defaultData.saveShopifyCustStatus;
    
    let timerFontFamilyVal = appSettings.timerFontFamily ? appSettings.timerFontFamily : defaultData.timerFontFamily;
    let subscriberFontFamilyVal = appSettings.subscriberFontFamily ? appSettings.subscriberFontFamily : defaultData.subscriberFontFamily;
    let timerFontFamilyLabelVal = appSettings.timerFontFamilyLabel ? appSettings.timerFontFamilyLabel : defaultData.timerFontFamilyLabel;
    let subscriberFontFamilyLabelVal = appSettings.subscriberFontFamilyLabel ? appSettings.subscriberFontFamilyLabel : defaultData.subscriberFontFamilyLabel;

    const [saveSettings, setSaveSettings] = useState(0);
    const [toastMsg, setToastMsg] = useState(0);
    const [toastStatus, setToastStatus] = useState(false);
    const [toastType, setToastType] = useState(false); // false means simple. true means error.

    /* Settings Field states */
    const [contentTitle, setContentTitle] = useState(contentTitleVal);
    const [contentDescription, setContentDescription] = useState(contentDescriptionVal);
    const [contentFooter, setContentFooter] = useState(contentFooterVal);
    const [seoTitle, setSeoTitle] = useState(seoTitleVal);
    const [fbPixel, setFbPixel] = useState(fbPixelVal);
    const [googleAna, setGoogleAna] = useState(googleAnaVal);
    const [seoDescription, setSeoDescription] = useState(seoDescriptionVal);
    const [seoMetatags, setSeoMetatags] = useState(seMetatagsVal);
    const [timerStatus, setTimerStatus] = useState(timerStatusVal);
    const [timerDate, setTimerDate] = useState(timerDateVal);
    const [selectedDates, setSelectedDates] = useState({
        start: timerDateVal,
        end: timerDateVal
    });
    const [selectedTimezone, setSelectedTimezone] = useState(selectedTimezoneVal);
    const [selectedTime, setSelectedTime] = useState(selectedTimeVal);
    const [timerColor, setTimerColor] = useState(timerColorVal);
    
    const [logoUrl, setLogoUrl] = useState(logoUrlVal);
    const [ favUrl, setFavUrl] = useState(favUrlVal);
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
    const [socialIconColor, setSocialIconColor]      = useState(socialIconColorVal);
    const [socialIconBackColor, setSocialIconBackColor]      = useState(socialIconBackColorVal);
    const [socialDefaultColorStatus, setSocialDefaultColorStatus]      = useState(socialDefaultColorStatusVal);

    const [subscriptionStatus, setSubscriptionStatus] = useState(subscriptionStatusVal);
    const [mcStatus, setMCStatus] = useState(mcStatusVal);
    const [mckey, setMCkey] = useState(mcKeyVal);
    const [mclistOption, setMCListOption] = useState(mclistOptionVal);
    const [mcList, setMCList] = useState(mcListVal);

    const [klStatus, setKlStatus] = useState(klStatusVal);
    const [klkey, setKlkey] = useState(klKeyVal);
    const [kllistOption, setKlListOption] = useState(klistOptionVal);
    const [klList, setKlList] = useState(klListVal);

    const [emailBtnTxt, setEmailBtnTxt] = useState(emailBtnTxtVal);
    const [emailPlaceholder, setEmailPlaceholder] = useState(emailPlaceholderVal);
    const [emailBtnColor, setEmailBtnColor] = useState(emailBtnColorVal);
    const [emailBtnBackColor, setEmailBtnBackColor] = useState(emailBtnBackColorVal);
    const [inputTxtColor, setInputTxtColor] = useState(inputTxtColorVal);
    const [inputBackColor, setInputBackColor] = useState(inputBackColorVal);
    const [successMsg, setSuccessMsg] = useState(successMsgVal);
    const [failMsg, setFailMsg] = useState(failMsgVal);
    const [nameFieldStatus, setNameFieldStatus] = useState(nameFieldStatusVal);
    const [namePlaceholder, setNamePlaceholder] = useState(namePlaceholderVal);
    const [saveShopifyCustStatus, setSaveShopifyCustStatus] = useState(saveShopifyCustStatusVal);
    /* Settings Field states Ends */

    const [timerFontFamily, setTimerFontFamily] = useState(timerFontFamilyVal);
    const [subscriberFontFamily, setSubscriberFontFamily] = useState(subscriberFontFamilyVal);
    const [timerFontFamilyLabel, setTimerFontFamilyLabel] = useState(timerFontFamilyLabelVal);
    const [subscriberFontFamilyLabel, setSubscriberFontFamilyLabel] = useState(subscriberFontFamilyLabelVal);

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
            socialFacebook:socialFacebook,
            subscriptionStatus:subscriptionStatus,
            mcStatus:mcStatus,
            mckey:mckey,
            mclistOption:mclistOption,
            mcList:mcList,
            klStatus:klStatus,
            klkey:klkey,
            kllistOption:kllistOption,
            klList:klList,
            emailBtnTxt:emailBtnTxt,
            emailPlaceholder:emailPlaceholder,
            emailBtnColor:emailBtnColor,
            emailBtnBackColor:emailBtnBackColor,
            inputTxtColor:inputTxtColor,
            inputBackColor:inputBackColor,
            successMsg:successMsg,
            failMsg:failMsg,
            nameFieldStatus:nameFieldStatus,
            namePlaceholder:namePlaceholder,
            saveShopifyCustStatus:saveShopifyCustStatus,
            googleAna:googleAna,
            fbPixel:fbPixel,
            socialDefaultColorStatus:socialDefaultColorStatus,
            socialIconColor:socialIconColor,
            socialIconBackColor:socialIconBackColor,
            selectedTimezone:selectedTimezone,
            selectedTime:selectedTime,
            timerColor:timerColor,
            timerFontFamily:timerFontFamily,
            subscriberFontFamily:subscriberFontFamily,
            timerFontFamilyLabel:timerFontFamilyLabel,
            subscriberFontFamilyLabel:subscriberFontFamilyLabel,
            favUrl:favUrl
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
        gpError,
        subscriptionStatus,
        mcStatus,
        mckey,
        mclistOption,
        mcList,
        klStatus,
        klkey,
        kllistOption,
        klList,
        emailBtnTxt,
        emailPlaceholder,
        emailBtnColor,
        emailBtnBackColor,
        inputTxtColor,
        inputBackColor,
        successMsg,
        failMsg,
        nameFieldStatus,
        namePlaceholder,
        saveShopifyCustStatus,
        googleAna,
        fbPixel,
        socialDefaultColorStatus,
        socialIconColor,
        socialIconBackColor,
        selectedTimezone,
        selectedTime,
        timerColor,
        timerFontFamily,
        subscriberFontFamily,
        timerFontFamilyLabel,
        subscriberFontFamilyLabel,
        favUrl
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

    /**
     * Set subscription status.
     */
    const setSubscriptionStatusHandler = useCallback((val) => {
        setSubscriptionStatus(val);
    }, [subscriptionStatus]); 

    /**
     * Set Mailchimp API key.
     */
     const setMCkeyHandler = useCallback((val) => {
        setMCkey(val);
    }, [mckey]); 

     /**
     * Set mail chimp subscription status.
     */
    const setMCStatuHandler = useCallback((val) => {
        setMCStatus(val);
    }, [mcStatus]);

    /**
     * Set mail chimp audeience list.
     */
     const setMCListOptionHandler = useCallback((val) => {
        console.log(' setMCListOptionHandler : ' + val);
        setMCListOption(val);
    }, [mclistOption]);

    /**
     * Set mail chimp audeience list.
     */
     const setMCListHandler = useCallback((val) => {
        console.log(' setMCListHandler : ' + val);
        setMCList(val);
   }, [mcList]);


   /**
     * Set Klaviyo API key.
     */
    const setKlkeyHandler = useCallback((val) => {
        setKlkey(val);
    }, [klkey]); 

     /**
     * Set Klaviyo subscription status.
     */
    const setKlStatusHandler = useCallback((val) => {
        setKlStatus(val);
    }, [klStatus]);

    /**
     * Set Klaviyo audeience list.
     */
     const setKlListOptionHandler = useCallback((val) => {
        //console.log(' setKlaviyoListOptionHandler : ' + val);
        setKlListOption(val);
    }, [kllistOption]);

    /**
     * Set Klaviyo audeience list.
     */
     const setKlListHandler = useCallback((val) => {
        //console.log(' setKlaviyoListHandler : ' + val);
        setKlList(val);
   }, [klList]);


   /**
     * Set email button text.
     */
    const setEmailBtnTxtHandler = useCallback((val) => {
        //console.log(' setEmailBtnTxtHandler : ' + val);
        setEmailBtnTxt(val);
   }, [emailBtnTxt]);


    /**
     * Set email button text.
     */
     const setEmailPlaceholderHandler = useCallback((val) => {
        //console.log(' setEmailPlaceholder : ' + val);
        setEmailPlaceholder(val);
   }, [emailPlaceholder]);


    /**
     * Set email button color.
     */
     const setEmailBtnColorHandler = useCallback((val) => {
        //console.log(' setEmailBtnColor : ' + val);
        setEmailBtnColor({
            hue: val.hue,
            brightness: val.brightness,
            saturation: val.saturation
        });
   }, [emailBtnColor]);


    /**
     * Set email button background color.
     */
     const setEmailBtnBackColorHandler = useCallback((val) => {
        //console.log(' setEmailBtnBackColor : ' + val);
        setEmailBtnBackColor({
            hue: val.hue,
            brightness: val.brightness,
            saturation: val.saturation
        });
   }, [emailBtnBackColor]);


    /**
     * Set email input text color.
     */
     const setInputTxtColorHandler = useCallback((val) => {
       // console.log(' setInputTxtColor : ' + val);
        setInputTxtColor({
            hue: val.hue,
            brightness: val.brightness,
            saturation: val.saturation
        });
   }, [inputTxtColor]);


    /**
     * Set email input background color.
     */
     const setInputBackColorHandler = useCallback((val) => {
        //console.log(' setInputBackColor : ' + val);
        setInputBackColor({
            hue: val.hue,
            brightness: val.brightness,
            saturation: val.saturation
        });
   }, [inputBackColor]);


    /**
     * Set email success subscription message.
     */
     const setSuccessMsgHandler = useCallback((val) => {
        //console.log(' setSuccessMsg : ' + val);
        setSuccessMsg(val);
   }, [successMsg]);


    /**
     * Set email fail subscription message.
     */
     const setFailMsgHandler = useCallback((val) => {
        //console.log(' setFailMsg : ' + val);
        setFailMsg(val);
   }, [failMsg]);

    /**
     * Set name field status.
     */
     const setNameFieldStatusHandler = useCallback((val) => {
        //console.log(' setNameFieldStatus : ' + val);
        setNameFieldStatus(val);
   }, [nameFieldStatus]);

   /**
     * Set name field placeholder.
     */
    const setNamePlaceholderHandler = useCallback((val) => {
        //console.log(' setNamePlaceholder : ' + val);
        setNamePlaceholder(val);
   }, [namePlaceholder]);


    /**
     * Set Shopify customer save status.
     */
    const setSaveShopifyCustStatusHandler = useCallback((val) => {
        setSaveShopifyCustStatus(val);
    }, [saveShopifyCustStatus]);

    /**
     * Set facebook pixel.
     */
     const setFbPixelHandler = useCallback((val) => {
        setFbPixel(val);
    }, [fbPixel]);

     /**
     * Set google analytics pixel.
     */
      const setGoogleAnaHandler = useCallback((val) => {
        setGoogleAna(val);
    }, [googleAna]);

    /**
     * Set social icons color.
     */
     const setSocialIconColorHandler = useCallback((val) => {
        //console.log(' setInputBackColor : ' + val);
        setSocialIconColor({
            hue: val.hue,
            brightness: val.brightness,
            saturation: val.saturation
        });
    }, [socialIconColor]);

    /**
     * Set social icons background color.
     */
      const setSocialIconBackColorHandler = useCallback((val) => {
        setSocialIconBackColor({
            hue: val.hue,
            brightness: val.brightness,
            saturation: val.saturation
        });
    }, [socialIconBackColor]);

    /**
     * Set social icons default color status.
     */
     const setSocialDefaultColorStatusHandler = useCallback((val) => {
        setSocialDefaultColorStatus(val);
    }, [socialDefaultColorStatus]);

    /**
     * Set timezone.
     */
     const setSelectedTimezoneHandler = useCallback((val) => {
        setSelectedTimezone(val);
    }, [selectedTimezone]);

    /**
     * Set time.
     */
     const setSelectedTimeHandler = useCallback((val) => {
        setSelectedTime(val);
    }, [selectedTime]);

    /**
     * Set timer color.
     */
     const setTimerColorHandler = useCallback((val) => {
        setTimerColor({
            hue: val.hue,
            brightness: val.brightness,
            saturation: val.saturation
        });
    }, [timerColor]);

     /**
     * Set timer font.
     */
      const setTimerFontFamilyHandler = useCallback((val) => {
        let wordData = val.target.value.charAt(0).toUpperCase() + val.target.value.slice(1); 
        setTimerFontFamilyLabel(wordData.split(",")[0]);
        setTimerFontFamily(val.target.value);
    }, [timerFontFamily]);


     /**
     * Set subscriber font.
     */
     const setSubscriberFontFamilyHandler = useCallback((val) => {
        let wordData = val.target.value.charAt(0).toUpperCase() + val.target.value.slice(1);
        setSubscriberFontFamilyLabel(wordData.split(",")[0]);
        setSubscriberFontFamily(val.target.value);
    }, [subscriberFontFamily]);
 
    /** 
     * Set favicon url. 
     */ 
     const setFavUrlHandler = useCallback((favDetails) => { 
        if(favDetails !== 'empty') { 
            setFavUrl(favDetails.originalUrl);
        } else { 
            setFavUrl('');
        }
    }, [favUrl]);
    
    
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
                    favUrl={favUrl}
                    setFavUrl={setFavUrlHandler}
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
                    selectedTimezone={selectedTimezone}
                    setSelectedTimezone={setSelectedTimezoneHandler}
                    selectedTime={selectedTime}
                    setSelectedTime={setSelectedTimeHandler}
                    timerColor={timerColor}
                    setTimerColor={setTimerColorHandler}
                    timerFontFamily={timerFontFamily}
                    setTimerFontFamily={setTimerFontFamilyHandler}
                    timerFontFamilyLabel={timerFontFamilyLabel}
                />
                <SeoSettings 
                    seoTitle={seoTitle} 
                    seoDescription={seoDescription}
                    setSeoTitle={setSeoTitleHandler} 
                    setSeoDescription={setSeoDescriptionHandler}
                    seoMetatags={seoMetatags}
                    setSeoMetatags={setSeoMetatagsHandler}
                    setGoogleAna={setGoogleAnaHandler}
                    setFbPixel={setFbPixelHandler}
                    fbPixel={fbPixel}
                    googleAna={googleAna}
                />
                <SubscriptionSettings 
                    subscriptionStatus={subscriptionStatus}
                    setSubscriptionStatus={setSubscriptionStatusHandler}
                    mcStatus={mcStatus}
                    setMCStatus={setMCStatuHandler}
                    mckey={mckey}
                    mclistOption={mclistOption}
                    setMCListOption={setMCListOptionHandler}
                    setMCkey={setMCkeyHandler}
                    mcList={mcList}
                    setMCList={setMCListHandler}
                    klStatus={klStatus}
                    klkey={klkey}
                    kllistOption={kllistOption}
                    klList={klList}
                    setKlStatus={setKlStatusHandler}
                    setKlkey={setKlkeyHandler}
                    setKlListOption={setKlListOptionHandler}
                    setKlList={setKlListHandler}
                    axiosinstance={axiosinstance}
                    shop={shop}
                    app={app}
                    emailBtnTxt={emailBtnTxt}
                    emailPlaceholder={emailPlaceholder}
                    emailBtnColor={emailBtnColor}
                    emailBtnBackColor={emailBtnBackColor}
                    inputTxtColor={inputTxtColor}
                    inputBackColor={inputBackColor}
                    successMsg={successMsg}
                    failMsg={failMsg}
                    setEmailBtnTxt={setEmailBtnTxtHandler}
                    setEmailPlaceholder={setEmailPlaceholderHandler}
                    setEmailBtnColor={setEmailBtnColorHandler}
                    setEmailBtnBackColor={setEmailBtnBackColorHandler}
                    setInputTxtColor={setInputTxtColorHandler}
                    setInputBackColor={setInputBackColorHandler}
                    setSuccessMsg={setSuccessMsgHandler}
                    setFailMsg={setFailMsgHandler}
                    nameFieldStatus={nameFieldStatus}
                    namePlaceholder={namePlaceholder}
                    setNameFieldStatus={setNameFieldStatusHandler}
                    setNamePlaceholder={setNamePlaceholderHandler}
                    saveShopifyCustStatus={saveShopifyCustStatus}
                    setSaveShopifyCustStatus={setSaveShopifyCustStatusHandler}
                    subscriberFontFamily={subscriberFontFamily}
                    setSubscriberFontFamily={setSubscriberFontFamilyHandler}
                    subscriberFontFamilyLabel={subscriberFontFamilyLabel}
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
                    socialIconColor={socialIconColor}
                    socialIconBackColor={socialIconBackColor}
                    setSocialIconColor={setSocialIconColorHandler}
                    setSocialIconBackColor={setSocialIconBackColorHandler}
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
                    socialDefaultColorStatus={socialDefaultColorStatus}
                    setSocialDefaultColorStatus={setSocialDefaultColorStatusHandler}
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