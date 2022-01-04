import React from 'react';
import styles from '../../styles/install.module.css';
import {List, Page} from '@shopify/polaris';


const InstallInstruction = (props) => {
    const {setCurrPageHandler} = props;

    return (
        <Page
        breadcrumbs={[{
            onAction: () => setCurrPageHandler('dashboard'),
          }]}
        title="Installation Instructions"
        subtitle="Check the points below:"
        >
        <List type="bullet">
            <List.Item>
                <p className={styles.bigFont}>How can I enable Coming Soon page?</p>
                <br />
                <p>Goto app admin settings page and follow screenshot below:</p>
                <img className={styles.fullImg} src="https://ucarecdn.com/12ab5a55-c3a9-4072-adbd-fc0ffbcfc322/enabledisablebtn.png" />
                <p>Check the screenshot below:</p>
                <img className={styles.fullImg} src="https://ucarecdn.com/8337d3a2-7073-409d-ba68-54e4bb4d7217/enablecomingsoon.png" />
            </List.Item>
            <List.Item>
                <p className={styles.bigFont}>How can I enbale or disable Coming Soon page from theme editor?</p>
                <br />
                <p>Goto app admin settings page and follow screenshot below:</p>
                <img className={styles.fullImg} src="https://ucarecdn.com/12ab5a55-c3a9-4072-adbd-fc0ffbcfc322/enabledisablebtn.png" />
                <img className={styles.fullImg} src="https://ucarecdn.com/c51ddef6-1af2-4c89-9d71-7ac8cfd94226/enabledisabletwo.png" />
                <img className={styles.fullImg} src="https://ucarecdn.com/4df5f78f-1619-4d17-a0c3-8bf57dc66194/enabledisablethree.png" />
            </List.Item>
        </List>
        <br />
        <strong>If you still aren’t able to resolve the issue, you can send us an email at appschimpsupp@gmail.com</strong>
        </Page>
    );
}
 
export default InstallInstruction;