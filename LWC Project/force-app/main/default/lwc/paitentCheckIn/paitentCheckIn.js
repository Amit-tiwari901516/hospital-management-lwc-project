import { LightningElement } from 'lwc';

import checkIn from '@salesforce/apex/AppointmentSchedulingController.checkIn';

export default class PatientCheckIn extends LightningElement {
    
    //patient 
    Patient='';
    changePatientHandler(event){
        this.Patient = event.detail.recordId; 
        console.log('Patient: ' + this.Patient);
    }
    PatientMatchingInfo ={
        primaryField: { fieldPath: 'Name'}
    };
    
    //date and Time
    checkInDate = '';
    changeDateHandler(event) {
        this.checkInDate = event.target.value;
        console.log('Check In Date : ' +  this.checkInDate);
    }

    // Status
    statusValue = '';
    get statusOptions() {
        return [

            { label: 'Check-in', value: 'Check-in' },
            { label: 'Check-Out', value: 'Check-Out' },
        ];
    }

    handleStatusChange(event) {
        this.statusValue = event.detail.value;
        console.log('status : ' + this.statusValue);
    }

    // Reason of visit
    reasonValue = '';
    get reasonOptions() {
        return [
           
            { label: 'Chief Complaint', value: 'Chief Complaint' },
            { label: 'Diagnosis', value: 'Diagnosis' },
            { label: 'Treatment Plan', value: 'Treatment Plan' },
        ];
    }

    handleReasonChange(event) {
        this.reasonValue = event.detail.value;
        console.log('Reason : ' + this.reasonValue);
    }

    //save
    handleSubmit(){
        checkIn({
            checkInDate: this.checkInDate,
            checkImTime: this.checkInTime,
            statusValue: this.statusValue,
            reasonValue: this.reasonValue,
            Patient: this.Patient

        })
        .then(result => {
            console.log('Patient Check in successfully Id: ' + result);
            window.history.back();
        })
        .catch(error => {
        
            console.log('Error occurred while creating checkIn: ', error);

        });

    }


    //cancel
    closeModal() {
        window.history.back();
    }

    //empty
    empty(){
        this.checkInDate = '';
        this.checkInTime = '';
        this.statusValue = '';
        this.reasonValue = '';
        this.Patient = '';
    }

    //save and new
    SaveandopenNew(){
        checkIn({
            checkInDate: this.checkInDate,
            checkImTime: this.checkInTime,
            statusValue: this.statusValue,
            reasonValue: this.reasonValue,
            Patient: this.Patient

        })
        .then(result => {
            console.log('Patient Check in successfully Id: ' + result);
            this.empty();
        })
        .catch(error => {
        
            console.error('Error occurred while creating checkIn: ' + error);

        });

    }
}
