import React, {useCallback, useState, useEffect} from 'react';
import { Page, Layout, Frame, Banner } from '@shopify/polaris';
import Password from './components/password';
import ToastHandler from './components/toastHandler';
import Themes from './components/themes/themes';
import IndexSettings from './components/settings/index';
import CustomizePageCallout from './components/cusomize-page-callout';
import styles from '../styles/main.module.css';
import AuthenticateRequest from './components/authenticate-request';
import { useRouter } from "next/router";
import { useAppBridge } from '@shopify/app-bridge-react';
import TitleBarApp from './components/title-bar';
import Faqs from './menu/faq';
import Support from './menu/get-support';
import InstallInstruction from './menu/install-instructions';
import { Redirect } from '@shopify/app-bridge/actions';

export default function Index() {
  // NextJS Router.
  const router = useRouter();

  let appExtUID = '680f0474-fab5-46c4-8a22-4be281855d7f';

  // App bridge actions.
  const app = useAppBridge();
  //const redirect = Redirect.create(app);

  let redirectPlan = (urlR) => {
    const redirect = Redirect.create(app);
    redirect.dispatch(Redirect.Action.REMOTE, {
      url: urlR,
      newContext: false,
    });
  }

  const [currPage, setCurrPage] = useState('dashboard');
  const [planCheck, setPlanCheck] = useState(false);
  const [shop, setShop] = useState(router.query.shop);
  const [activeTheme, setActiveTheme] = useState(0);
  const [activeSettings, setActiveSettings] = useState(0); // If settings section active or not.
  const [appSettings, setAppSettings] = useState('');
  const [activationStatusBtn, setActivationStatusBtn] = useState(false);
  const [activationTxt, setActivationTxt] = useState('Activate Coming Soon');
  const [toastMsg, setToastMsg] = useState(0);
  const [toastStatus, setToastStatus] = useState(0);
  const [shopData, setShopData] = useState('');
  const [pageCss, setPageCss] = useState(styles.PolarisPageNoTopPadding);

  // Axios Instance to authenticate session token.
  const axiosinstance = AuthenticateRequest();
  
  /**
   * Get Plan Check.
   */
   let getPlanData = useCallback((_event) => {
    axiosinstance({ 
      method: 'get',
      url: '/planCheck',
      params: {
        shop: router.query.shop
      }
    }).then(function (settingsData) {
      //console.log('plan check front :- '+ settingsData.data.confirmation_url);
      
      if(settingsData.data.confirmation_url == 'active') {
        setPlanCheck(true);
      } else {
        //console.log('redirecting...');
        redirectPlan(settingsData.data.confirmation_url);
      }

   });

  }, []);

  //console.log('Front Shop : ' + router.query.shop);
  /**
   * Get app settings.
   */
  let getAppData = useCallback((_event) => {
    axiosinstance({
      method: 'get',
      url: '/getSettings',
      params: {
        shop: router.query.shop
      }
    }).then(function (settingsData) {
      //console.log('settingsData :- '+ settingsData);
      if(settingsData.data.data !== 'none') {
        let formData = JSON.parse(settingsData.data.data.settings);
        setAppSettings(formData);
      }

   });

  }, [activeSettings, appSettings]);

  /**
   * Get selected theme only.
   */
  let getSelectedTheme = useCallback((_event) => {

    axiosinstance({
      method: 'get',
      url: '/activeTheme',
      params: {
        shop: router.query.shop
      }
    }).then(function (activeTheme) {
      //console.log('activeTheme :- '+ activeTheme);
      
      if(activeTheme.data.data !== 'none') {
        setActiveTheme(activeTheme.data.data.theme_id);
      } else {
        setActiveTheme(1); // Set default theme.
      }

   });

  }, [activeTheme]); 
  
   /**
   * Get activation status only.
   */
    let getActivationStatus = useCallback((_event) => {

      axiosinstance({
        method: 'get',
        url: '/getActivationStatus',
        params: {
          shop: router.query.shop
        }
      }).then(function (activationData) {
        //console.log('activationData :- '+ activationData);
  
        if(activationData.data.data.status == 'activate') {
          setActivationTxt('Deactivate Coming Soon');
        } else if(activationData.data.data.status == 'deactivate'){
          setActivationTxt('Activate Coming Soon');
        }
  
     });
  
    }, [activationTxt]); 

  /**
   * Get shop data.
   */
   let getShopData = useCallback((_event) => {
    axiosinstance({
      method: 'get',
      url: '/getShopData',
      params: {
        shop: router.query.shop
      }
    }).then(function (shopData) {
      //console.log('shopData  :- '+ shopData);
      
      if(shopData.data.data) {
        setShopData(shopData);
      }
   });

  }, []); 

      // Set app data.
  useEffect(() => {
    getPlanData();
   },[])
    // Plan check output
  
      // Set app data.
      useEffect(() => {
        getAppData();
      },[activeSettings])
      
      //  // Set active theme.
      useEffect(() => {
        getSelectedTheme();
      },[activeTheme]);

      // // Set activation status.
      useEffect(() => {
        getActivationStatus();
      },[activationTxt]);

      // // Set shop data.
      useEffect(() => {
        getShopData();
      },[]);
    

   /**
    * Action to set active theme.
   */
  const handleActiveTheme = useCallback((selectedTheme) => {
      setActiveTheme(selectedTheme);
  }, [activeTheme, pageCss]);

   /**
    * Action to set settings.
   */
  const activeSettingHandler = useCallback((val) => {
    setActiveSettings(val);
    if(val == 1) { // if settings are active
      setPageCss(styles.PolarisPage60TopPadding);
    } else {
      setPageCss(styles.PolarisPageNoTopPadding);
    }
    
  }, [activeSettings, pageCss]);


  /**
   * Activate/Deactivate coming soon page.
   */
   const activationStatusHandler = useCallback((_event) => {
    
    setActivationStatusBtn(true);
    let status = 'deactivate';

    if(activationTxt == 'Activate Coming Soon') {
      status = 'activate';
    }

    axiosinstance.post('/activationStatus', {
      action: status,
      shop : router.query.shop
    })
    .then(function (response) {
        //console.log('response : ' + JSON.stringify(response.data.data.body));
        
        if(activationTxt == 'Activate Coming Soon') {
          setActivationTxt('Deactivate Coming Soon');
          setToastMsg('Activated Coming Soon Successfully');
          setToastStatus(1);
          //console.log('activationTxt1 : ' + activationTxt);
        } else {
          setActivationTxt('Activate Coming Soon');
          setToastMsg('Deactivated Coming Soon Successfully');
          setToastStatus(1);
          //console.log('activationTxt2 : ' + activationTxt);
        }
        
        setActivationStatusBtn(false);
    })
    .catch(function (error) {
        //console.log('error : ' + error);
        setActivationStatusBtn(false);
    })
   },[toastStatus, activationTxt]);

   /**
     * Action to set Toast status state.
     */
    const handleToastStatus = useCallback((status) => {
      setToastStatus(status);
     }, [toastStatus]);

  const customContent = <CustomizePageCallout activeTheme={activeTheme} activeSettingHandler={activeSettingHandler}  />;

  const customSettings = activeSettings > 0 ?
    <IndexSettings 
      activeTheme={activeTheme}
      activeSettingHandler={activeSettingHandler}
      activeSettings={activeSettings} 
      appSettings={appSettings} // App settings from DB.
      shop={shop}
      axiosinstance={axiosinstance}
      app={app}
      shopData={shopData}
    />
  : <div>
        {customContent}
        <br />
        <Themes 
          activeTheme={activeTheme} 
          handleActiveTheme={handleActiveTheme}
          axiosinstance={axiosinstance}
          shop={shop}
          app={app}
        />
    </div>;

     // Prepare Skeleton Loader.

     let cssPlanCheck = 'none';

    if(planCheck == true) {
       cssPlanCheck = 'block';
    } 

    const infoBanner = activeSettings == 0 ? 
      <div>
        <Banner
        title="To enable Fast Coming Soon click button (Click Here To Activate Or Deactivate Coming Soon Page) ☝"
        action={
          {
            content: 'Check Screenshot Here', 
            url: 'https://ucarecdn.com/8337d3a2-7073-409d-ba68-54e4bb4d7217/',
            target: '_blank'
          }
        }
        status="info"
      >
        <p>It will redirect you to theme editor and auto enable the Fast Coming Soon page block, <strong>you must click Save to publish theme editor settings.</strong></p>
      </Banner>
      <br />
    </div> : '';

    // Update current page.
    const setCurrPageHandler = (page) => {
      setCurrPage(page);
    }

    var pageOutput = '';
    
    // Decide page.
    if(currPage == 'dashboard') {
      pageOutput = 
        <Page
            narrowWidth={false}
            divider={true}
            title="Enable/Disable Fast Coming Soon"
            primaryAction={
              {
                content: 'Click Here To Enable Or Disable Coming Soon Page', 
                loading: activationStatusBtn,
                onAction: () => { 
                  //activationStatusHandler()
                  const redirect = Redirect.create(app);
                  redirect.dispatch(Redirect.Action.REMOTE, {
                    url: "https://"+shop+"/admin/themes/current/editor?context=apps&activateAppId="+appExtUID+"/fast-coming-soon",
                    newContext: true,
                  });
                }
              }
            }
          >
          {infoBanner}
            <Frame> 
              <Layout>
                {/* Password enabled notification component */}
                <Layout.Section> 
                  <Password shopData={shopData} shop={shop} /> 
                </Layout.Section>
                {/* Callout component to show 'Customize Your Coming Soon Page' */}
                <Layout.Section>
                  {customSettings}
                </Layout.Section>
              </Layout>
              <ToastHandler toastMsg={toastMsg} toastStatus={toastStatus} handleToastStatus={handleToastStatus} />
            </Frame>
        </Page>;
    } else if(currPage == 'faq') {
      pageOutput = <Faqs setCurrPageHandler={setCurrPageHandler} />;
    } else if(currPage == 'install') {
      pageOutput = <InstallInstruction setCurrPageHandler={setCurrPageHandler} />;
    } else if(currPage == 'support') {
      pageOutput = <Support setCurrPageHandler={setCurrPageHandler} />;
    }
    
  return (
    <div className={pageCss} style={{'display': cssPlanCheck }}> 
      <TitleBarApp app={app} cssPlanCheck={cssPlanCheck} setCurrPageHandler={setCurrPageHandler} />
      {pageOutput}
  </div>
  );
}
