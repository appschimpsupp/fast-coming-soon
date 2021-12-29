import React from 'react';
import {Heading, Layout} from '@shopify/polaris';
import ThemeList from './themes-list';
import ToastHandler from '../toastHandler';
import {useCallback, useState, useEffect, useMemo} from 'react';

const Themes = (props) => {
    const { activeTheme, handleActiveTheme, axiosinstance, shop, app } = props;
    const [toastMsg, setToastMsg] = useState(0);
    const [toastStatus, setToastStatus] = useState(0);

    const themesListData = [
        {
          id : '1',
          name: 'Active Theme',
          desc: 'Start your business with eye-catching theme.',
          imgPreviewUrl : 'https://ucarecdn.com/32706879-73fa-4bd4-b20f-3d67951693b1/theme1preview.png'
        },
        {
          id : '2',
          name: 'Color Theme',
          desc: 'Start your business with eye-catching theme.',
          imgPreviewUrl : 'https://ucarecdn.com/23109233-3aad-4d18-8033-470b03c8d8c8/theme2preview.png'
        }
    ]
    
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

    return (
        <React.Fragment> 
            <Heading element="h1">Select Your Theme</Heading>
            <br />
            {/* Callout component to show 'Customize Your Coming Soon Page' */}
            <Layout>
            {
                themesListData.map( theme => {
                    return <ThemeList 
                                key={theme.id} 
                                themeData={theme} 
                                handleToastStatus={handleToastStatus} 
                                handleToastMsg={handleToastMsg}
                                activeThemeHandler={handleActiveTheme}
                                activeTheme={activeTheme}
                                axiosinstance={axiosinstance}
                                shop={shop}
                                app={app}
                            />
                })
            }
            </Layout>
            <ToastHandler toastMsg={toastMsg} toastStatus={toastStatus} handleToastStatus={handleToastStatus} />
        </React.Fragment>
    );
}
 
export default Themes;
