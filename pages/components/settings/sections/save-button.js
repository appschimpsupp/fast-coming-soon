import React from 'react';
import { ContextualSaveBar, FormLayout, AppProvider, Frame } from '@shopify/polaris';
import {Redirect} from '@shopify/app-bridge/actions';

const SaveButton = (props) => {
    const { saveSettings, saveSettingHandle, app, shop } = props;
    const loadingShowData =  saveSettings == 1 ? true : false;
    const redirect = Redirect.create(app);

    return (
       <div style={{height: '10px'}}>
        <AppProvider
            i18n={{
            Polaris: {
                ContextualSaveBar: {
                    save: 'Save Settings',
                    discard: 'Live Preview',
                },
            },
            }}
        >
            <Frame style={{minHeight: '10px'}}><div style={{height: '10px'}}>
                        <ContextualSaveBar
                            fullWidth
                            saveAction={{
                                onAction: () => saveSettingHandle(),
                                loading:loadingShowData
                            }}
                            discardAction={{
                                onAction: () => {
                                    redirect.dispatch(Redirect.Action.REMOTE, {
                                        url: 'https://' + shop + '/apps/fast-coming-soon',
                                        newContext: true,
                                    });
                                },
                            }}
                           
                        /></div>
            </Frame>
            
        </AppProvider>
        </div>
    );
}
 
export default SaveButton;