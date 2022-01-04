import React from 'react';
import { TitleBar, Button, Redirect } from '@shopify/app-bridge/actions';

const TitleBarApp = (props) => {
    const { app, cssPlanCheck, setCurrPageHandler } = props;

    const dashboardButton = Button.create(app, { label: 'Dashboard' });
    const faqButton = Button.create(app, { label: 'FAQ' });
    const uninstallButton = Button.create(app, { label: 'Install Instructions' });
    //const installButton = Button.create(app, { label: 'Install Instructions' });
    const support = Button.create(app, { label: 'Get Support' });
    
    const redirect = Redirect.create(app);
    
    // Dashboard link.
    dashboardButton.subscribe('click', () => {
        setCurrPageHandler('dashboard');
    });

    // FAQ link.
    faqButton.subscribe('click', () => {
        setCurrPageHandler('faq');
    });

    // Uninstall link.
    uninstallButton.subscribe('click', () => {
        setCurrPageHandler('install');
    });

    // Support link.
    support.subscribe('click', () => {
        setCurrPageHandler('support');
    });


    // Create titlebar.
    const titleBarOptions = {
        title: '',
        buttons: {
        secondary: [ dashboardButton, faqButton, uninstallButton, support ],
        },
    };

    if(cssPlanCheck == 'block') {
        TitleBar.create(app, titleBarOptions);
    }

    return (
        <React.Fragment>

        </React.Fragment>
    );
}
 
export default TitleBarApp;