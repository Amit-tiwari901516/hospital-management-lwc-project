import { LightningElement, wire } from 'lwc';
import fetchAppointmentScheduledRecords from "@salesforce/apex/RecordClass.fetchAppointmentScheduledRecords" 

export default class ScheduledAppointmentRecords extends LightningElement {

    pageSizeOptions = [5, 10, 25, 50, 75, 100]; //Page size options
    records = []; //All records available in the data table
    columns = []; //columns information available in the data table
    totalRecords = 0; //Total no.of records
    pageSize; //No.of records to be displayed per page
    totalPages; //Total no.of pages
    pageNumber = 1; //Page number    
    recordsToDisplay = []; //Records to be displayed on the page
    
    columns = [
        { label : 'Name', fieldName : 'appointmentLink', type:'url', typeAttributes: { label: { fieldName: 'Name' }, target: '_blank'}},
        { label : "Appointment Date and Time", fieldName : "Appointment_Date_and_Time__c"},
        { label : "Enter the Department", fieldName : "Department__c"}
    ];


    // fetch contact records from apex method 
    @wire(fetchAppointmentScheduledRecords)
    wireDoc({ error, data }) {
        if (data) {
            data = JSON.parse(JSON.stringify(data));
            data.forEach(res => {
                res.appointmentLink = '/' + res.Id;
            });
            this.recordsToDisplay = data;
            this.error = undefined;

            this.records = data;
                    this.totalRecords = data.length; // update total records count                 
                    this.pageSize = this.pageSizeOptions[0]; //set pageSize with default value as first option
                    this.paginationHelper(); // call helper menthod to update pagination logic 
        } else if (error) {
            this.error = error;
        }
    }
                

    get bDisableFirst() {
        return this.pageNumber == 1;
    }

    get bDisableLast() {
        return this.pageNumber == this.totalPages;
    }

    handleRecordsPerPage(event) {
        this.pageSize = event.target.value;
        this.paginationHelper();
    }
    previousPage() {
        this.pageNumber = this.pageNumber - 1;
        this.paginationHelper();
    }
    nextPage() {
        this.pageNumber = this.pageNumber + 1;
        this.paginationHelper();
    }
    firstPage() {
        this.pageNumber = 1;
        this.paginationHelper();
    }
    lastPage() {
        this.pageNumber = this.totalPages;
        this.paginationHelper();
    }
    // JS function to handel pagination logic 
    paginationHelper() {
        this.recordsToDisplay = [];
        // calculate total pages
        this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
        // set page number 
        if (this.pageNumber <= 1) {
            this.pageNumber = 1;
        } else if (this.pageNumber >= this.totalPages) {
            this.pageNumber = this.totalPages;
        }
        // set records to display on current page 
        for (let i = (this.pageNumber - 1) * this.pageSize; i < this.pageNumber * this.pageSize; i++) {
            if (i === this.totalRecords) {
                break;
            }
            this.recordsToDisplay.push(this.records[i]);
        }
    }


    
}