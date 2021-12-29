
export const currentThemeData = (activeTheme) => {
    let themeOneData = {
        id : 'theme-1',
        contentTitle: 'Coming Soon',
        contentFooter : 'Copyright © 2021. All Rights Reserved.',
        contentDescription : 'Our website is under construction. Stay tuned for something amazing!',
        seoTitle: '',
        backgroundUrl : 'https://ucarecdn.com/9e6aa7c2-1c9e-45dd-8d3f-020c4bf339ed/',
        socialStatus : true,
        backgroundColor: {
            hue: 40,
            brightness: 0.04,
            saturation: 0.78,
        }
    }

    let themeTwoData = {
        id : 'theme-2',
        contentTitle: 'Under Construction',
        contentFooter : 'Copyright © 2021. All Rights Reserved.',
        contentDescription : 'Our website is currently undergoing scheduled maintenance. We Should be back shortly. Thank you for your patience.',
        seoTitle: '',
        backgroundUrl : 'https://ucarecdn.com/72307673-024a-47cc-a670-e87b89bb173d/',
        socialStatus : true,
        backgroundColor: {
            hue: 0,
            brightness: 0,
            saturation: 0,
        }
    }

    // Return active Theme default data.
    if(activeTheme == 1) {
        return themeOneData;
    } else if(activeTheme == 2) {
        return themeTwoData;
    }
}
