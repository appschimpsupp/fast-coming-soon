import React, {useState, useCallback} from 'react';
import { Select, TextStyle, ColorPicker, Checkbox, Card, Layout, FormLayout, DatePicker } from '@shopify/polaris';
import TimezoneSelect from "react-timezone-select"

const TimeSettings = (props) => {
    const { 
        timerStatus, 
        setTimerStatus, 
        selectedDates, 
        timerDate, 
        setTimerDateHandler,
        selectedTimezone,
        setSelectedTimezone,
        selectedTime,
        setSelectedTime,
        timerColor,
        setTimerColor,
        setTimerFontFamily,
        timerFontFamily,
        timerFontFamilyLabel
    } = props;


    let timerOptions = [
        {label: '12:00', value: '12:00'},
        {label: '13:00', value: '13:00'},
        {label: '14:00', value: '14:00'},
        {label: '15:00', value: '15:00'},
        {label: '16:00', value: '16:00'},
        {label: '17:00', value: '17:00'},
        {label: '18:00', value: '18:00'},
        {label: '19:00', value: '19:00'},
        {label: '20:00', value: '20:00'},
        {label: '21:00', value: '21:00'},
        {label: '22:00', value: '22:00'},
        {label: '23:00', value: '23:00'},
        {label: '00:00', value: '00:00'},
        {label: '01:00', value: '01:00'},
        {label: '02:00', value: '02:00'},
        {label: '03:00', value: '03:00'},
        {label: '04:00', value: '04:00'},
        {label: '05:00', value: '05:00'},
        {label: '06:00', value: '06:00'},
        {label: '07:00', value: '07:00'},
        {label: '08:00', value: '08:00'},
        {label: '09:00', value: '09:00'},
        {label: '10:00', value: '10:00'},
        {label: '11:00', value: '11:00'},
    ];
    
    let timerFonts = [
        {label: 'Arial', value: 'arial,helvetica,sans-serif'},
        {label: 'Raleway', value: 'raleway,sans-serif'},
        {label: 'Roboto', value: 'roboto,sans-serif'},
        {label: 'Righteous', value: 'righteous'},
        {label: 'Poppins', value: 'poppins,sans-serif,helvetica'},
        {label: 'Permanent Marker', value: 'permanent marker,sans-serif'},
        {label: 'Montserrat', value: 'montserrat,sans-serif'},
        {label: 'Comfortaa', value: 'comfortaa'},
        {label: 'Dosis', value: 'dosis'},
        {label: 'Orbitron', value: 'orbitron,sans-serif,helvetica'},
        {label: 'Dancing Script', value: 'Dancing Script,sans-serif,helvetica'},
        {label: 'Lato', value: 'Lato,sans-serif,helvetica'},
        {label: 'Pacifico', value: 'Pacifico,sans-serif'},
        {label: 'Baloo Bhaijaan', value: 'Baloo+Bhaijaan,sans-serif'},
        {label: 'Oswald', value: 'Oswald,sans-serif'},
        {label: 'Arial Black', value: 'arial black,avant garde'},
        {label: 'Book Antiqua', value: 'book antiqua,palatino04:00'},
        {label: 'Comic Sans MS', value: 'comic sans ms,sans-serif'},
        {label: 'Courier New', value: 'courier new,courier'},
        {label: 'Georgia', value: 'georgia,palatino'},
        {label: 'Helvetica', value: 'helvetica'},
        {label: 'Impact', value: 'impact,chicago'},
        {label: 'Symbol', value: 'symbol'},
        {label: 'Tahoma', value: 'tahoma,arial,helvetica,sans-serif'},
        {label: 'Terminal', value: 'terminal,monaco'},
        {label: 'Times New Roman', value: 'times new roman,times'},
        {label: 'Trebuchet', value: 'trebuchet ms,geneva'},
        {label: 'Verdana', value: 'verdana,geneva'},
    ];

    let dateSelected = new Date(timerDate);

    const date = new Date();
    const cyear = date.getFullYear();
    const cmonth = date.getMonth();
    const cday = date.getDate();
    let todayDate = new Date(cyear, cmonth, cday);
    
    let monthVal = dateSelected.getMonth();
    let yearVal  = dateSelected.getFullYear(); 
    // console.log('monthVal : ' + monthVal);
    // console.log('yearVal : ' + yearVal);
    const [{month, year}, setDate] = useState({month: monthVal, year: yearVal});
    
    const handleMonthChange = useCallback(
      (month, year) => setDate({month, year}),
      [],
    );

    return (
            <Layout.AnnotatedSection
                id="timerDetails"
                title="Timer Settings"
                description="Set your coming soon launch timer."
            >
                <FormLayout>
                    <Card>
                        <Card.Section>
                            <Checkbox
                                label="Enable Timer"
                                checked={timerStatus}
                                onChange={setTimerStatus}
                            />
                        </Card.Section>
                        <Card.Section>
                            <FormLayout>
                                <label className="Polaris-Label__Text" style={{marginBottom:-10}}>Select Date To Launch Site</label>
                                <DatePicker
                                    month={month}
                                    year={year}
                                    onChange={setTimerDateHandler}
                                    onMonthChange={handleMonthChange}
                                    selected={selectedDates}
                                    disableDatesBefore={todayDate} 
                                />
                                </FormLayout>
                            </Card.Section>
                            <Card.Section>
                                <FormLayout>
                                    <Select
                                        label="Select Time"
                                        options={timerOptions}
                                        onChange={setSelectedTime}
                                        value={selectedTime}
                                    />
                                </FormLayout>
                            </Card.Section>
                            <Card.Section>
                                <FormLayout>
                                    <label className="Polaris-Label__Text" style={{marginBottom:-10}}>Select Time Zone</label>
                                    <TimezoneSelect
                                    className='time-zone-selector'
                                    value={selectedTimezone}
                                    onChange={setSelectedTimezone}
                                    />
                                </FormLayout>
                            </Card.Section>
                        <Card.Section>
                        <FormLayout>
                            <TextStyle variation="strong">Choose Timer Text Settings</TextStyle>
                            <FormLayout.Group>
                                <div>
                                    <label className="Polaris-Label__Text" style={{marginBottom:5}}>
                                        Select Timer Color
                                    </label>
                                    <ColorPicker 
                                        onChange={setTimerColor} 
                                        color={timerColor} 
                                    />
                                </div>
                                
                                <div className="">
                                    <div className="Polaris-Labelled__LabelWrapper">
                                    <div className="Polaris-Label"><label id="PolarisSelect8Label"  className="Polaris-Label__Text">Select Timer Font</label></div>
                                    </div>
                                    <div className="Polaris-Select">
                                    <select id="PolarisSelect8" className="Polaris-Select__Input" aria-invalid="false" onChange={setTimerFontFamily} >
                                        <option style={{fontFamily:"arial,helvetica,sans-serif"}} value="arial,helvetica,sans-serif">Arial</option>
                                        <option style={{fontFamily:"raleway,sans-serif"}} value="raleway,sans-serif">Raleway</option>
                                        <option style={{fontFamily:"roboto,sans-serif"}} value="roboto,sans-serif">Roboto</option>
                                        <option style={{fontFamily:"righteous"}} value="righteous,sans-serif">Righteous</option>
                                        <option style={{fontFamily:"poppins,sans-serif,helvetica"}} value="poppins,sans-serif,helvetica">Poppins</option>
                                        <option style={{fontFamily:"permanent marker,sans-serif"}} value="permanent marker,sans-serif">Permanent Marker</option>
                                        <option style={{fontFamily:"montserrat,sans-serif"}} value="montserrat,sans-serif">Montserrat</option>
                                        <option style={{fontFamily:"comfortaa"}} value="comfortaa,sans-serif">Comfortaa</option>
                                        <option style={{fontFamily:"dosis"}} value="dosis,sans-serif">Dosis</option>
                                        <option style={{fontFamily:"orbitron,sans-serif,helvetica"}} value="orbitron,sans-serif,helvetica">Orbitron</option>
                                        <option style={{fontFamily:"Open Sans,sans-serif"}} value="Open Sans,sans-serif">Open Sans</option>
                                        <option style={{fontFamily:"Dancing Script,sans-serif,helvetica"}} value="Dancing Script,sans-serif,helvetica">Dancing Script</option>
                                        <option style={{fontFamily:"Lato,sans-serif,helvetica"}} value="Lato,sans-serif,helvetica">Lato</option>
                                        <option style={{fontFamily:"Pacifico,sans-serif"}} value="Pacifico,sans-serif">Pacifico</option>
                                        <option style={{fontFamily:"Baloo+Bhaijaan,sans-serif"}} value="Baloo+Bhaijaan,sans-serif">Baloo Bhaijaan</option>
                                        <option style={{fontFamily:"Oswald,sans-serif"}} value="Oswald,sans-serif">Oswald</option>
                                        <option style={{fontFamily:"arial black,avant garde"}} value="arial black,avant garde">Arial Black</option>
                                        <option style={{fontFamily:"book antiqua,palatino"}} value="book antiqua,palatino">Book Antiqua</option>
                                        <option style={{fontFamily:"comic sans ms,sans-serif"}} value="comic sans ms,sans-serif">Comic Sans MS</option>
                                        <option style={{fontFamily:"courier new,courier"}} value="courier new,courier">Courier New</option>
                                        <option style={{fontFamily:"georgia,palatino"}} value="georgia,palatino">Georgia</option>
                                        <option style={{fontFamily:"helvetica"}} value="helvetica,sans-serif">Helvetica</option> 
                                        <option style={{fontFamily:"impact,chicago"}} value="impact,chicago">Impact</option>
                                        <option style={{fontFamily:"symbol"}} value="symbol">Symbol</option>
                                        <option style={{fontFamily:"tahoma,arial,helvetica,sans-serif"}} value="tahoma,arial,helvetica,sans-serif">Tahoma</option>
                                        <option style={{fontFamily:"terminal,monaco"}} value="terminal,monaco">Terminal</option>
                                        <option style={{fontFamily:"times new roman,times"}} value="times new roman,times">Times New Roman</option>
                                        <option style={{fontFamily:"trebuchet ms,geneva"}} value="trebuchet ms,geneva">Trebuchet MS</option>
                                        <option style={{fontFamily:"verdana,geneva"}} value="verdana,geneva">Verdana</option>
                                        
                                    </select>
                                    <div className="Polaris-Select__Content" aria-hidden="true"><span className="Polaris-Select__SelectedOption">{timerFontFamilyLabel}</span><span className="Polaris-Select__Icon"><span className="Polaris-Icon"><span className="Polaris-VisuallyHidden"></span><svg viewBox="0 0 20 20" className="Polaris-Icon__Svg" focusable="false" aria-hidden="true">
                                            <path d="M7.676 9h4.648c.563 0 .879-.603.53-1.014L10.531 5.24a.708.708 0 0 0-1.062 0L7.145 7.986C6.798 8.397 7.113 9 7.676 9zm4.648 2H7.676c-.563 0-.878.603-.53 1.014l2.323 2.746c.27.32.792.32 1.062 0l2.323-2.746c.349-.411.033-1.014-.53-1.014z"></path>
                                            </svg></span></span></div>
                                    <div className="Polaris-Select__Backdrop"></div>
                                    </div>
                                </div>
                                <div id="PolarisPortalsContainer"></div>
                            </FormLayout.Group>
                            </FormLayout>
                        </Card.Section>
                    </Card>
                </FormLayout>
           </Layout.AnnotatedSection>
           
    );
}
 
export default TimeSettings;