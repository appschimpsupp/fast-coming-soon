import React, {useState, useCallback} from 'react';
import { TextStyle, Checkbox, Card, Layout, FormLayout, DatePicker } from '@shopify/polaris';

const TimeSettings = (props) => {
    const { 
        timerStatus, 
        setTimerStatus, 
        selectedDates, 
        timerDate, 
        setTimerDateHandler 
    } = props;
    
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
                <Card sectioned>
                    <FormLayout>
                        <Checkbox
                            label="Enable Timer"
                            checked={timerStatus}
                            onChange={setTimerStatus}
                        />
                        <TextStyle variation="strong">Select Date To Launch Site</TextStyle>
                        <DatePicker
                            month={month}
                            year={year}
                            onChange={setTimerDateHandler}
                            onMonthChange={handleMonthChange}
                            selected={selectedDates}
                            disableDatesBefore={todayDate} 
                        />
                    </FormLayout>
                </Card>
           </Layout.AnnotatedSection>
           
    );
}
 
export default TimeSettings;