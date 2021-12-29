import {Banner, SkeletonBodyText} from '@shopify/polaris';

const Password = (props) => {
    const { shopData, shop } = props;
    let showStatus = false;
    let storePrefrUrl = 'https://' + shop + '/admin/online_store/preferences';
    
    if(shopData.data) {
        showStatus = shopData.data.data.body.shop.password_enabled == true ? true : false;
    }

    let skeletonOutput = shopData == '' ? <Banner title="" >
        <SkeletonBodyText /> 
  </Banner> : '';

    let output = <Banner title="Disable Password Protection" status="warning" >
    <p>Please deactivate Password Protection from your store preferences. <a target="_blank" href={storePrefrUrl}>Click here to visit your store preferences settings.</a></p>
    </Banner>;
    
    return (
        <React.Fragment>
            { showStatus == true ? output : skeletonOutput }
        </React.Fragment>
    );
}
 
export default Password;