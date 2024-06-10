# devsBuild
Date Range Picker Lightning Web Component
Overview
This repository contains a Lightning Web Component (LWC) for a Date Range Picker that allows users to select multiple predefined date filters as well as a custom date range. This component is designed to be easily integrated into Salesforce applications, providing a flexible and user-friendly date selection interface.

Features
Predefined Date Filters: Users can quickly select from a list of predefined date ranges such as Today, Yesterday, Last 7 Days, Last 30 Days, This Month, Last Month, and Year to Date.
Custom Date Range Selector: Users can select a custom date range using a calendar interface.
User-Friendly Interface: Clean and intuitive design for easy date selection.

Installation
Clone the repository:

bash
Copy code
git clone https://github.com/your-username/date-range-picker-lwc.git
cd date-range-picker-lwc
Deploy to Salesforce:

Authorize your Salesforce org:
bash
Copy code
sfdx force:auth:web:login -a my-org
Deploy the component:
bash
Copy code
sfdx force:source:deploy -p force-app/main/default
Usage
Add the component to your Lightning page:

Open the Lightning App Builder in Salesforce.
Drag and drop the dateRangePicker component onto your page.
Customize Predefined Filters (Optional):

Modify the predefined date ranges by editing the component’s JavaScript file. Adjust the predefined filters array to suit your requirements.
Handle Selected Date Range in Apex Controller:

The component will emit events with the selected date range. Listen for these events in your parent component or controller to handle the selected date range.
Component Attributes
predefinedFilters: An array of predefined date ranges. Example:
javascript
Copy code
[
    { label: 'Today', value: 'today' },
    { label: 'Yesterday', value: 'yesterday' },
    { label: 'Last 7 Days', value: 'last_7_days' },
    { label: 'Last 30 Days', value: 'last_30_days' },
    { label: 'This Month', value: 'this_month' },
    { label: 'Last Month', value: 'last_month' },
    { label: 'Year to Date', value: 'year_to_date' }
]
Events
dateRangeSelected: Fired when a date range is selected. The event detail includes:
startDate: The start date of the selected range.
endDate: The end date of the selected range.
Example
HTML
html
Copy code
<template>
    <lightning-card title="Date Range Picker">
        <c-date-range-selector
            predefined-filters={filters}
            ondaterangeselected={handleDateRangeSelected}>
        </c-date-range-picker>
    </lightning-card>
</template>
JavaScript
javascript
Copy code
import { LightningElement, track } from 'lwc';

export default class DateRangePickerExample extends LightningElement {
    @track filters = [
        { label: 'Today', value: 'today' },
        { label: 'Yesterday', value: 'yesterday' },
        { label: 'Last 7 Days', value: 'last_7_days' },
        { label: 'Last 30 Days', value: 'last_30_days' },
        { label: 'This Month', value: 'this_month' },
        { label: 'Last Month', value: 'last_month' },
        { label: 'Year to Date', value: 'year_to_date' }
    ];

    handleDateRangeSelected(event) {
        const startDate = event.detail.startDate;
        const endDate = event.detail.endDate;
        console.log(`Selected range: ${startDate} to ${endDate}`);
    }
}
