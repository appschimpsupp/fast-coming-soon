import {useCallback, useState} from 'react';
import {MediaCard, Layout, SkeletonBodyText, Card} from '@shopify/polaris';
import { Redirect } from '@shopify/app-bridge/actions';

const ThemeList = (props) => {
    const { 
        themeData, 
        handleToastStatus, 
        handleToastMsg, 
        activeTheme, 
        activeThemeHandler,
        axiosinstance,
        shop,
        app
    } = props;
    const [activeLoading, setActiveLoading] = useState(false);
    
    /**
     * Demo click handler.
     */
    function themeDemoHandler(themeID) {
        const redirect = Redirect.create(app);
        redirect.dispatch(Redirect.Action.REMOTE, {
            url: 'https://appschimp.com/demo/theme-' + themeID,
            newContext: true,
        });
    }

    /**
     * Action to apply selected theme.
     */
    const handlePostTheme = useCallback((themeData) => {
        setActiveLoading(true);
        axiosinstance.post('/saveTheme', {
            id: themeData.id,
            shop:shop
        })
        .then(function (response) {
            //console.log(response);
            handleToastStatus(true);
            handleToastMsg('Theme Applied Successfully');
            setActiveLoading(false);
            activeThemeHandler(themeData.id);
        })
        .catch(function (error) {
            //console.log(error);
            setActiveLoading(false);
        });
    }, [themeData]);

    let outputTheme = activeTheme == 0  ? <Card sectioned>
            <SkeletonBodyText size="large" lines={18} />
        </Card>  : 
            <MediaCard
            title={themeData.name}
            primaryAction={{
                content : activeTheme == themeData.id ? 'Published' : 'Publish',
                onAction: () => { handlePostTheme(themeData) },
                loading : activeLoading,
                disabled: activeTheme == themeData.id ? true : false,
            }}
            secondaryAction={{
                content: 'Check Demo',
                onAction: () => { themeDemoHandler(themeData.id) },
            }}
            portrait={true}
            description={themeData.desc}
        >
        <img
            alt=""
            width="100%"
            height="100%"
            style={{objectFit: 'cover', objectPosition: 'center'}}
            src={themeData.imgPreviewUrl}
        />
        </MediaCard>;
    
    return (
        <Layout.Section oneThird>
            {outputTheme}
        </Layout.Section>
    );
}
 
export default ThemeList;