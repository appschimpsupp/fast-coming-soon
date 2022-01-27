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
          imgPreviewUrl : 'https://ucarecdn.com/147f6dc8-7035-499f-8df3-2a87f71186f6/theme1prev.png'
        },
        {
          id : '2',
          name: 'Color Theme',
          desc: 'Start your business with eye-catching theme.',
          imgPreviewUrl : 'https://ucarecdn.com/472a2b08-3719-4d80-8fa1-e76643a46f35/theme2prev.png'
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
