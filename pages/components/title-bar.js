import React from 'react';
import { TitleBar, Button, Redirect } from '@shopify/app-bridge/actions';

const TitleBarApp = (props) => {
    const { app, cssPlanCheck } = props;

    //const dashboardButton = Button.create(app, { label: 'Dashboard' });
    const faqButton = Button.create(app, { label: 'FAQ' });
    const uninstallButton = Button.create(app, { label: 'Uninstall Instructions' });
    //const installButton = Button.create(app, { label: 'Install Instructions' });
    const support = Button.create(app, { label: 'Get Support' });
    
    const redirect = Redirect.create(app);

    // FAQ link.
    faqButton.subscribe('click', () => {
        redirect.dispatch(Redirect.Action.REMOTE, {
        url: 'https://appschimp.com/faq',
        newContext: true,
        });
    });

    // Uninstall link.
    uninstallButton.subscribe('click', () => {
        redirect.dispatch(Redirect.Action.REMOTE, {
        url: 'https://appschimp.com/uninstall-instructions/',
        newContext: true,
        });
    });

    // Support link.
    support.subscribe('click', () => {
        redirect.dispatch(Redirect.Action.REMOTE, {
        url: 'https://appschimp.com/support/',
        newContext: true,
        });
    });


    // Create titlebar.
    const titleBarOptions = {
        title: '',
        buttons: {
        secondary: [ faqButton, uninstallButton, support ],
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