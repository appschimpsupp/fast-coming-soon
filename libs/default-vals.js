
export const currentThemeData = (activeTheme) => {
    let themeOneData = {
        id : 'theme-1',
        contentTitle: '<h1 style="font-family:Open Sans,sans-serif;">Coming Soon</h1>',
        contentFooter : '<p style="font-family:Open Sans,sans-serif;">Copyright © 2021. All Rights Reserved.</p>',
        contentDescription : '<h2 style="font-family:Open Sans,sans-serif;">Our website is under construction. Stay tuned for something amazing!</h2>',
        seoTitle: '',
        backgroundUrl : 'https://ucarecdn.com/f633f2b8-3ed0-47aa-81cc-a2ce605a3fee/',
        socialStatus : true,
        backgroundColor: {
            hue: 40,
            brightness: 0.4,
            saturation: 0.78,
        },
        subscriptionStatus: true,
        emailBtnTxt: 'Subscribe', 
        emailPlaceholder: 'Enter your email address',
        emailBtnColor: {
            hue: 0,
            brightness: 100,
            saturation: 0,
        },
        emailBtnBackColor: {
            hue: 19,
            brightness: 0.44,
            saturation: 0.92,
        },
        inputTxtColor: {
            hue: 0,
            brightness: 0,
            saturation: 1,
        },
        inputBackColor: {
            hue: 0,
            brightness: 100,
            saturation: 0,
        },
        successMsg: 'Subscribed Successfully',
        failMsg: 'Subscription failed! Please make sure your provided API keys are valid from admin settings.',
        nameFieldStatus: true,
        namePlaceholder: 'Enter your name',
        saveShopifyCustStatus: false,
        socialDefaultColorStatus: true,
        socialIconColor:{
            hue: 0,
            brightness: 0.9,
            saturation: 0,
        },
        socialIconBackColor:{
            hue: 19,
            brightness: 0.44,
            saturation: 0.92,
        },
        selectedTimezone : {value: 'Etc/GMT', label: '(GMT+0:00) UTC', offset: 0, abbrev: 'GMT', altName: 'ETC/GMT'},
        selectedTime:'00:00',
        timerColor: {
            hue: 19,
            brightness: 0.44,
            saturation: 0.92,
        },
        timerFontFamily:"Open Sans,sans-serif",
        timerFontFamilyLabel: "Open Sans",
        subscriberFontFamily:"Open Sans,sans-serif",
        subscriberFontFamilyLabel:"Open Sans"
    }
  
    let themeTwoData = { 
        id : 'theme-2',
        contentTitle: '<h1 style="font-family:poppins,sans-serif,helvetica;">Under Construction</h1>',
        contentFooter : '<p style="font-family:poppins,sans-serif,helvetica;">Copyright © 2021. All Rights Reserved.</p>',
        contentDescription : '<p class="desc" style="font-family:poppins,sans-serif,helvetica;">Our website is currently undergoing scheduled maintenance. We Should be back shortly. Thank you for your patience.</p>',
        seoTitle: '',
        backgroundUrl : 'https://ucarecdn.com/304cf8d2-cc23-4af7-ab1e-d2a386c14ea1/',
        socialStatus : true,
        backgroundColor: {
            hue: 0,
            brightness: 0,
            saturation: 0,
        },
        subscriptionStatus: true,
        emailBtnTxt: 'Subscribe', 
        emailPlaceholder: 'Enter your email address',
        emailBtnColor: {   // black color
            hue: 0,
            brightness: 0,
            saturation: 0,
        },
        emailBtnBackColor: { // white color
            hue: 0,
            brightness: 0.9,
            saturation: 0,
        },
        inputTxtColor: {
            hue: 0,
            brightness: 0,
            saturation: 0,
        },
        inputBackColor: {
            hue: 0,
            brightness: 100,
            saturation: 0,
        },
        successMsg: 'Subscribed Successfully',
        failMsg: 'Subscription failed! Please make sure your provided API keys are valid from admin settings.',
        nameFieldStatus: true,
        namePlaceholder: 'Enter your name',
        saveShopifyCustStatus: false,
        socialDefaultColorStatus: true,
        socialIconColor:{
            hue: 0,
            brightness: 0,
            saturation: 0,
        },
        socialIconBackColor:{
            hue: 0,
            brightness: 0.9,
            saturation: 0,
        },
        selectedTimezone : {value: 'Etc/GMT', label: '(GMT+0:00) UTC', offset: 0, abbrev: 'GMT', altName: 'ETC/GMT'},
        selectedTime:'00:00',
        timerColor: {
            hue: 0,
            brightness: 0.9,
            saturation: 0,
        },
        timerFontFamily:"poppins,sans-serif,helvetica",
        timerFontFamilyLabel: "Poppins",
        subscriberFontFamily:"poppins,sans-serif,helvetica",
        subscriberFontFamilyLabel:"Poppins"
    }

    // Return active Theme default data.
    if(activeTheme == 1) {
        return themeOneData;
    } else if(activeTheme == 2) {
        return themeTwoData;
    }
}
