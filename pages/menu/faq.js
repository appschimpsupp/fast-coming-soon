import React from "react";
import {Page} from '@shopify/polaris';
import styles from '../../styles/faq.module.css';
import Faq from "react-faq-component";

const data = {
    title: "",
    rows: [
        {
            title: "How can I enable Coming Soon page?",
            content: 
            <div>
                <p>Goto app admin settings page and follow screenshot below:</p>
                <img src="https://ucarecdn.com/12ab5a55-c3a9-4072-adbd-fc0ffbcfc322/enabledisablebtn.png" />
                <p>Check the screenshot below:</p>
                <img src="https://ucarecdn.com/8337d3a2-7073-409d-ba68-54e4bb4d7217/enablecomingsoon.png" />
            </div>,
        },
        {
            title: "How can I disable Coming Soon page?",
            content:
                <div>
                    <p>Goto app admin settings page and follow screenshot below:</p>
                    <img src="https://ucarecdn.com/12ab5a55-c3a9-4072-adbd-fc0ffbcfc322/enabledisablebtn.png" />
                    <p>Check the screenshot below:</p>
                    <img src="https://ucarecdn.com/0aa69f52-5023-42c9-bb4d-fea899a057b5/disablecomingsoon.png" />
                </div>,
        },
        {
            title: "How can I enbale or disable Coming Soon page from theme editor?",
            content: 
            <div>
                <p>Follow screenshots below:</p>
                <img src="https://ucarecdn.com/6e7343fb-667a-4cb1-910d-af70c4ab8460/enabledisableone.png" />
                <img src="https://ucarecdn.com/c51ddef6-1af2-4c89-9d71-7ac8cfd94226/enabledisabletwo.png" />
                <img src="https://ucarecdn.com/4df5f78f-1619-4d17-a0c3-8bf57dc66194/enabledisablethree.png" />
            </div>,
        },
        {
            title: "Coming Soon is not showing. How can I fix that?",
            content: 
            <div>
                <p>Please check following points :</p>
                <ul>
                    <li>
                        <p>
                            Make sure that Password protection is unchecked in Online Store => Preferences. 
                        </p> 
                        <img src="https://ucarecdn.com/79cd6892-98ba-4555-a23b-0f15aad0b3c2/passwordpage.png" />
                    </li>
                    <li>
                        <p>
                            Make sure that Coming Soon page setting is enabled from theme editor. Check above FAQ or follow screenshots below:
                        </p>
                        <img src="https://ucarecdn.com/384a861a-f92b-4efb-bd77-0aef728bd48e/apppage.png" />
                        <img src="https://ucarecdn.com/12ab5a55-c3a9-4072-adbd-fc0ffbcfc322/enabledisablebtn.png" />
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
            content: 
            <div>
                <p>You can publish from from app Dashboard page. Check the screenshot below:</p>
                <img src="https://ucarecdn.com/e11fa0d2-d3e7-420d-a821-c7e7ee9a2f2a/selecttheme.png" />
            </div>,
        },
        {
            title: "How can I customize my Coming Soon theme?",
            content: 
            <div>
                <p>You can select option "Customize Your Coming Soon Page" from app Dashboard page. Check the screenshot below:</p>
                <img src="https://ucarecdn.com/187b4f13-52b6-4faf-982f-a2a055882d61/customizecomingsoon.png" />
            </div>,
        },
    ],
};

const styles2 = {
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
            <div className={styles.fullImg}>
                <Faq
                    data={data}
                    styles={styles2}
                    config={config}
                />
                <br />
                <strong>If you still aren't able to resolve the issue, you can send us an email at appschimpsupp@gmail.com</strong>
            </div>
        </Page>
    );
}
 
export default Faqs;