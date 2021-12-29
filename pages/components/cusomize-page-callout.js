import React from 'react';
import Link from 'next/link'
import { CalloutCard, SkeletonBodyText } from '@shopify/polaris';

const CustomizePageCallout = (props) => {

    const { activeSettingHandler, activeTheme } = props;
    //console.log('activeTheme : ' + activeTheme);
    let title = activeTheme > 0  ? "Custosmize the style of your Coming Soon page" : '';
    let description  = activeTheme > 0  ? <p>Upload your coming soon page logo, background and more.</p> : <SkeletonBodyText />;

    let loading = activeTheme > 0  ? false : true;

    return (
        <React.Fragment>
            <CalloutCard
                title={title}
                illustration="https://cdn.shopify.com/s/assets/admin/checkout/settings-customizecart-705f57c725ac05be5a34ec20c05b94298cb8afd10aac7bd9c7ad02030f48cfa0.svg"
                primaryAction={{
                    content: 'Customize Your Coming Soon Page',
                    onAction: () => { activeSettingHandler(1) },
                    loading : loading
                }}
            >
            {description}
            </CalloutCard>
        </React.Fragment>
    );
}
 
export default CustomizePageCallout;