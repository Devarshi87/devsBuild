import {  LightningElement, track, api  } from 'lwc';

export default class DateRangeSelector extends LightningElement {
    today = new Date();
    @track start_date;
    @track end_date;
    @track range;

    showDateRange = false;

    buttonLabel= 'Filter Button'

    dateFilter = 'THIS_MONTH';

    rangeFilterString ='';

    //rangeObj;

    get startDateLoc(){
        return new Date(this.start_date).toLocaleDateString('en-US');
    }

    get endDateLoc(){
        return new Date(this.end_date).toLocaleDateString('en-US');
    }

    get dateOptions() {
        return [
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
            
        ];
    }

   

    addDays = (sd,days) => {
        const d = new Date(Number(sd));
        d.setDate(sd.getDate() + days);
        return d;
    }

    diff = (sdate,edate) => {
        let diffTime = Math.abs(new Date(edate).getTime() - new Date(sdate).getTime());
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }

    valid_date = (sdate,edate) => {
        return new Date(edate) >= new Date(sdate);
    }

    getThisMonth(){
        let curr = new Date();
        return {
          startDate : new Date(curr.getFullYear(),curr.getMonth(), 1),
          endDate :new Date(curr.getFullYear(), curr.getMonth()+1, 0),
        }
      }

    getLastMonth(){
        let curr = new Date();
        return {
          startDate : new Date(curr.getFullYear(),curr.getMonth()-1, 1),
          endDate : new Date(curr.getFullYear(), curr.getMonth(), 0),
        }
      }

    getThisWeek(){

        let curr = new Date();
        return {
          startDate : new Date(curr.setDate(curr.getDate() - curr.getDay())),
          endDate :new Date(curr.setDate(curr.getDate() - curr.getDay()+6)),
        }
      }
    
    getLastWeek(){
        let curr = new Date();
        
        return {
            startDate : new Date(curr.setDate((curr.getDate() - curr.getDay())-7)),
            endDate :new Date(curr.setDate(curr.getDate() - curr.getDay()+6)),
        }
    }

    getLastNdays(n){
        let curr = new Date();
        return {
            startDate : new Date(curr.setDate(curr.getDate() - n)),
            endDate : new Date(),
        }
    }

    handleDateChange = (event) => {
        let fieldName = event.target.name;
        
        let dtObj ;
        if(fieldName === 'dateFilter'){
            this.dateFilter = event.detail.value;
            if(this.dateFilter === 'CUSTOM'){
                console.log('date filter val=>',this.dateFilter);
                this.showDateRange = true;
                
                this.start_date =  this.today.toJSON().slice(0,10);
                this.end_date = this.addDays(this.today,1).toJSON().slice(0,10);
                this.buttonLabel = 'Get Readings'
            }
            else{
                this.showDateRange = false;
                this.buttonLabel = 'Refresh Readings'
                // dtObj = this.fetchFilterDates(this.dateFilter);
                
                // console.log('date filter val=>',dtObj);
                // this.start_date = dtObj.startDate;
                // this.end_date = dtObj.endDate;
                this.handleFilterByDate();
            }
            
        }
        else if(fieldName === 'startdate'){
            this.start_date = event.target.value
            console.log('starteDate==>',new Date(Date.parse(this.start_date)));
        }
            

        else if(fieldName === 'enddate'){
             this.end_date = event.target.value
             console.log('endDate==>',this.end_date);
        }

           

        if(this.start_date && this.end_date){
            if(this.valid_date(this.start_date,this.end_date) === true){
                this.range = this.diff(this.start_date,this.end_date);
            }else{
                let inputfield = this.template.querySelector("."+fieldName);
                inputfield.setCustomValidity('End date must be greater than the Start date'); 
                inputfield.reportValidity();
            }
        }
      
      
    }

    fetchFilterDates(rangeName){
        let rObj;
        if(rangeName === 'THIS_WEEK'){
            rObj = this.getThisWeek();                   
       }
       else if(rangeName  ===  'LAST_WEEK'){
            rObj = this.getLastWeek();
       }                
       else if(rangeName  ===  'THIS_MONTH'){
            rObj = this.getThisMonth();                   
       }
       else if(rangeName  ===  'LAST_MONTH'){
            rObj = this.getLastMonth();                  
       }
       else{
           var lastNdays = Number(this.dateFilter.split(":")[1]);
           rObj = this.getLastNdays(lastNdays);                   
       }

       return rObj;

    }

    handleFilterByDate(){
        if(this.dateFilter != 'CUSTOM'){
            let dtObj = this.fetchFilterDates(this.dateFilter);
            console.log('dtObj==>',dtObj);
            this.start_date = (dtObj.startDate) ? dtObj.startDate.toLocaleDateString('en-US') : this.today.toLocaleDateString('en-US');
            this.end_date = (dtObj.endDate) ? dtObj.endDate.toLocaleDateString('en-US') : this.addDays(this.today,1).toLocaleDateString('en-US');
        }
        else{
            // this.start_date = new Date(this.start_date).toJSON().slice(0,10);
            // this.end_date = new Date(this.end_date).toJSON().slice(0,10);

        }
      
        console.log('start==>',this.start_date);
        console.log('endDate==>',this.end_date);
        let rangeObj ={
            name : this.dateFilter,
            startDate : new Date(this.start_date).toLocaleDateString('en-US'),
            endDate : new Date(this.end_date).toLocaleDateString('en-US')
        }

        this.rangeFilterString = JSON.stringify(rangeObj)
        console.log('date filter val=>', JSON.parse(this.rangeFilterString));
        let rangeSelect = new CustomEvent('rangeselect',{
            detail: JSON.stringify(rangeObj)
        });

        this.dispatchEvent(rangeSelect);
    }

    

    connectedCallback(){
        this.handleFilterByDate();

       
       
    }

    
}