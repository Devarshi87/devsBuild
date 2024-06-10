# Date Range Selector Lightning Web Component

## Overview
This repository contains a Lightning Web Component (LWC) for a Date Range Selector that allows users to select multiple predefined date filters as well as a custom date range. This component is designed to be easily integrated into Salesforce applications, providing a flexible and user-friendly date selection interface.

## Features
- **Predefined Date Filters**: Users can quickly select from a list of predefined date ranges such as Today, Yesterday, Last 7 Days, Last 30 Days, This Month, Last Month, and Year to Date.
- **Custom Date Range Selector**: Users can select a custom date range using a calendar interface.
- **User-Friendly Interface**: Clean and intuitive design for easy date selection.
- **Set the button Label**: The button label can be set in the component and can be made an attribute using the @api notation and exposed to parent components


## Usage

1. **Add the component to your Lightning page**:
    - Open the Lightning App Builder in Salesforce.
    - Drag and drop the `dateRangeSelector` component onto your page.

2. **Customize Predefined Filters (Optional)**:
    - Modify the predefined date ranges by editing the component’s JavaScript file. Adjust the predefined filters array to suit your requirements.

3. **Handle Selected Date Range in Apex Controller**:
    - The component will emit events with the selected date range. Listen for these events in your parent component or controller to handle the selected date range.



- Some predefined date ranges are present, this can be updated as needed. Example:
    ```javascript
    [
        { label: 'Custom Range', value: 'CUSTOM' },
            { label: 'This Week', value: 'THIS_WEEK' },
            { label: 'This Month', value: 'THIS_MONTH' },
            { label: 'Last Week', value: 'LAST_WEEK' },
            { label: 'Last Month', value: 'LAST_MONTH' },
            { label: 'Last 10 Days', value: 'LAST_N_DAYS:10' },
            { label: 'Last 30 Days', value: 'LAST_N_DAYS:30' },
            { label: 'Last 60 Days', value: 'LAST_N_DAYS:60' },
            { label: 'Last 90 Days', value: 'LAST_N_DAYS:90' },
            { label: 'Last 120 Days', value: 'LAST_N_DAYS:120' },
            { label: 'Last 180 Days', value: 'LAST_N_DAYS:180' },
    ]
    ```

## Events

- **`rangeselect`**: Fired when a date range is selected. The event detail includes:
    - `name`: The name of the selected filter.
    - `startDate`: The start date of the selected range.
    - `endDate`: The end date of the selected range.

## Example

### HTML
```html
<template>
    <lightning-card title="Date Range Selector">
        <c-date-range-selector
            predefined-filters={filters}
            onrangeselect={handleDateRangeSelected}>
        </c-date-range-selector>
    </lightning-card>
</template>

```
### JS
```
    handleDateRangeSelected(event) {
        const startDate = event.detail.startDate;
        const endDate = event.detail.endDate;
        console.log(`Selected range: ${startDate} to ${endDate}`);
    }
```

