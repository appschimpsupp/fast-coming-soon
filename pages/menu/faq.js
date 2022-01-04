import React, { useEffect, useState } from "react";
import {List,Page} from '@shopify/polaris';
import Faq from "react-faq-component";

const data = {
    title: "",
    rows: [
        {
            title: "How can I enable Coming Soon page?",
            content: <div>
            <p>Goto app admin settings page and follow screenshot below:</p> <br />
            <img src="https://ucarecdn.com/d8b5c0ce-161c-49f6-ab4b-cb98f5aa1eea/enabledisablebutton.png" />
            <br />
            <p>Check the screenshot below:</p>
            <img src="https://ucarecdn.com/8337d3a2-7073-409d-ba68-54e4bb4d7217/enablecomingsoon.png" />
            </div>,
        },
        {
            title: "How can I disable Coming Soon page?",
            content:
                <div>
                <p>Goto app admin settings page and follow screenshot below:</p>
                <br />
                <img src="https://ucarecdn.com/d8b5c0ce-161c-49f6-ab4b-cb98f5aa1eea/enabledisablebutton.png" />
                <p>Check the screenshot below:</p>
                <img src="https://ucarecdn.com/0aa69f52-5023-42c9-bb4d-fea899a057b5/disablecomingsoon.png" />
                </div>,
        },
        {
            title: "How can I enbale or disable Coming Soon page from theme editor?",
            content: <div>
            <p>Follow screenshots below:</p>
            <br />
            <img src="https://ucarecdn.com/6e7343fb-667a-4cb1-910d-af70c4ab8460/enabledisableone.png" />
            <br />
            <img src="https://ucarecdn.com/c51ddef6-1af2-4c89-9d71-7ac8cfd94226/enabledisabletwo.png" />
            <br />
            <img src="https://ucarecdn.com/4df5f78f-1619-4d17-a0c3-8bf57dc66194/enabledisablethree.png" />
            </div>,
        },
        {
            title: "Coming Soon is not showing. How can I fix that?",
            content: <div>
                <p>Please check following points :</p>
                <ul>
                    <li>
                        <p>
                            Make sure that Password protection is unchecked in Online Store => Preferences. 
                        </p> 
                        <br />
                        <img src="https://ucarecdn.com/79cd6892-98ba-4555-a23b-0f15aad0b3c2/passwordpage.png" />
                    </li>
                    <li>
                        <p>
                            Make sure that Coming Soon page setting is enabled from theme editor. Check above FAQ or follow screenshots below:
                        </p>
                        <br />
                        <img src="https://ucarecdn.com/384a861a-f92b-4efb-bd77-0aef728bd48e/apppage.png" />
                        <br />
                        <img src="https://ucarecdn.com/d8b5c0ce-161c-49f6-ab4b-cb98f5aa1eea/enabledisablebutton.png" />
                        <br />
                        <img src="https://ucarecdn.com/4df5f78f-1619-4d17-a0c3-8bf57dc66194/enabledisablethree.png" />
                    </li>
                    <li>
                        <p>
                            If issue not resolved, then you can check your site in a separate browser or in incognito mode to verify if coming soon is working. Because anyone who is logged on to your store from your as a admin will be able to access the website to make changes. Everyone else will be able to see Coming Soon.
                        </p>
                    </li>
                </ul>
            </div>,
        },
        {
            title: "How can I select theme?",
            content: <div>
            <p>You can publish from app settings page. Check the screenshot below:</p>
            <br />
            <img src="https://ucarecdn.com/d5144387-410b-456e-b1c5-4eaaa80d760e/selecttheme.png" />
            <br />
            <img src="https://ucarecdn.com/c51ddef6-1af2-4c89-9d71-7ac8cfd94226/enabledisabletwo.png" />
            <br />
            <img src="https://ucarecdn.com/4df5f78f-1619-4d17-a0c3-8bf57dc66194/enabledisablethree.png" />
            </div>,
        },
        {
            title: "How can I customize my Coming Soon theme?",
            content: <div>
            <p>You can select option "Customize Your Coming Soon Page" from app Dashboard page. Check the screenshot below:</p>
            <br />
            <img src="https://ucarecdn.com/d5144387-410b-456e-b1c5-4eaaa80d760e/selecttheme.png" />
            </div>,
        },
    ],
};

const styles = {
    bgColor: '#F4F6F8',
    titleTextColor: "black",
    rowTitleColor: "black",
    // rowContentColor: 'grey',
    // arrowColor: "red",
};

const config = {
    // animate: true,
    // arrowIcon: "V",
    // tabFocus: true
};


const Faqs = (props) => {
    const {setCurrPageHandler} = props;

    return (
        <Page
        breadcrumbs={[{
            onAction: () => setCurrPageHandler('dashboard'),
          }]}
        title="Frequently Asked Questions"
        subtitle="Check the questions below:"
        >
            <Faq
                data={data}
                styles={styles}
                config={config}
            />
            <br />
            <p>If you still aren’t able to resolve the issue, you can send us an email at appschimpsupp@gmail.com</p>
        </Page>
    );
}
 
export default Faqs;