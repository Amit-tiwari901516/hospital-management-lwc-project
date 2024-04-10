import { LightningElement, wire } from 'lwc';
import fetchTodayAppointmentScheduledRecords from '@salesforce/apex/RecordClass.fetchTodayAppointmentScheduledRecords'; 

export default class DoctorDashboard extends LightningElement {
    recordsToDisplay = [];
    treatingDoctorId = '';

    // Doctor Name change handler
    changeTreatingDoctorHandler(event){
        this.treatingDoctorId = event.detail.recordId; 
    }

    // Columns for datatable
    columns = [
        { label: 'Name', fieldName: 'appointmentLink', type: 'url', typeAttributes: { label: { fieldName: 'Name' }, target: '_blank'}},
        { label: 'Date and Time', fieldName: 'Appointment_Date_and_Time__c'},
        { label: 'Department', fieldName: 'Department__c'}
    ];

    // Fetch appointment records based on selected doctor
    @wire(fetchTodayAppointmentScheduledRecords, { doctorId: '$treatingDoctorId' })
    wireDoc({ error, data }) {
        if (data) {
            data = JSON.parse(JSON.stringify(data));
            data.forEach(res => {
                res.appointmentLink = '/' + res.Id;
            });
            this.recordsToDisplay = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
        }
    }



    clickHandler() {
        let downloadRecords = [];
        downloadRecords = [...this.recordsToDisplay];

        let csvFile = this.convertArrayToCsv(downloadRecords);
        this.createLinkForDownload(csvFile)
    }

    

    convertArrayToCsv(downloadRecords) {
        let csvHeader = Object.keys(downloadRecords[0]).toString();
        let csvBody = downloadRecords.map((currItem) => 
            Object.values(currItem).toString()
        );
        let csvfile = csvHeader + "\n" + csvBody.join("\n");
        return csvfile;
    }

    createLinkForDownload(csvFile){
        const downLink = document.createElement("a");
        downLink.href = "data:text/csv;charset = utf-8," + encodeURI(csvFile);
        downLink.target = "_blank";
        downLink.download = "Account_Data.csv";
        downLink.click();
    }
}


