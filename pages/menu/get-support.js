import React from 'react';
import {Banner, Page} from '@shopify/polaris';

const Support = (props) => {
    const {setCurrPageHandler} = props;

    return (
        <Page
            breadcrumbs={[{
                onAction: () => setCurrPageHandler('dashboard'),
            }]}
            title="Get Support"
            subtitle=""
        >
            <Banner
                title="Email Us"
                status="info"
            >
                <p>If you are facing any issue, you can send us an email at <strong>appschimpsupp@gmail.com</strong></p>
            </Banner>
        </Page>
    );
}
 
export default Support;