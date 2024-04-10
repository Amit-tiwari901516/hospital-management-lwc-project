import { LightningElement } from 'lwc';
import medicalRecord from '@salesforce/apex/AppointmentSchedulingController.medicalRecord';

export default class MedicalRecordManagement extends LightningElement {

    errorMessage = '';
    //Paitent Diagnosis
    //patient 
    Patient='';
    changePatientHandler(event){
        this.Patient = event.detail.recordId; 
        console.log('Patient: ' + this.Patient);
    }
    PatientMatchingInfo ={
        primaryField: { fieldPath: 'Name'}
    };

    //DiagnosisCode
    DiagnosisCode='';
    changeDiagnosisCodeHandler(event){
        this.DiagnosisCode=event.target.value;
        console.log('Diagnosis Code: ' + this.DiagnosisCode);
    }

    //Description
    Description='';
    changeDescriptionHandler(event){
        this.Description=event.target.value;
        console.log('Description: ' + this.Description);
    }

    //DateDiagnosed
    DateDiagnosed='';
    ChangeDateDiagnosedHandler(event){
        this.DateDiagnosed=event.target.value;
        console.log('DateDiagnosed: ' + this.DateDiagnosed);
    }

    //Treating Doctor
    /* TreatingDoctor='';
    changeTreatingDoctorHandler(event){
        this.TreatingDoctor=event.target.value;
        console.log('TreatingDoctor: ' + this.TreatingDoctor);
    }*/
    TreatingDoctor='';
    changeTreatingDoctorHandler(event){
        this.TreatingDoctor = event.detail.recordId; 
        console.log('TreatingDoctor: ' + this.TreatingDoctor);
    }

    MatchingInfo ={
        primaryField: { fieldPath: 'Name'}
    };

    //Treatment Plan
    //TreatmentPlanName
    TreatmentPlanName='';
    changeTreatmentPlanNameHandler(event){
        this.TreatmentPlanName=event.target.value;
        console.log('TreatmentPlanName: ' + this.TreatmentPlanName);
    }

    //TreatmentPlanDescription
    TreatmentPlanDescription='';
    changeTreatmentPlanDescriptionHandler(event){
        this.TreatmentPlanDescription=event.target.value;
        console.log('TreatmentPlanDescription: ' + this.TreatmentPlanDescription);
    }

    //StartDate
    StartDate='';
    changeStartDateHandler(event){
        this.StartDate=event.target.value;
        console.log('StartDate: ' + this.StartDate);
    }

    //EndDate
    EndDate='';
    changeEndDateHandler(event){
        this.EndDate=event.target.value;
        console.log('EndDate: ' + this.EndDate);
    }

    //cancel
    closeModal(){
        window.history.back();
    }

    //empty
    empty(){
        this.Description='';
        this.DiagnosisCode='';
        this.DateDiagnosed='';
        this.TreatingDoctor='';
        this.TreatmentPlanName='';
        this.TreatmentPlanDescription='';
        this.StartDate='';
        this.EndDate='';
        this.Patient='';
        
    }

    //save

    handleSubmit(){
        // Call the Apex method to save the data
        
            medicalRecord({ // Calling the correct method
                DiagnosisCode: this.DiagnosisCode,
                Description: this.Description,
                DateDiagnosed: this.DateDiagnosed,
                TreatingDoctor: this.TreatingDoctor,
                TreatmentPlanName: this.TreatmentPlanName,
                TreatmentPlanDescription: this.TreatmentPlanDescription,
                StartDate: this.StartDate,
                EndDate: this.EndDate,
                Patient: this.Patient
               
            })
            .then(result => {
                console.log('medicalRecord created with Id: ' + result);
                window.history.back();
               
                // Optionally, you can perform any post-save actions here
            })
            .catch(error => {
                console.log('Error occurred while creating medicalRecord: ' , error);
                // Optionally, handle errors gracefully and inform the user
            });
        
       
    }


    //save and new
    SaveandopenNew(){
       // Call the Apex method to save the data
       medicalRecord({ // Calling the correct method
            DiagnosisCode: this.DiagnosisCode,
            Description: this.Description,
            DateDiagnosed: this.DateDiagnosed,
            TreatingDoctor: this.TreatingDoctor,
            TreatmentPlanName: this.TreatmentPlanName,
            TreatmentPlanDescription: this.TreatmentPlanDescription,
            StartDate: this.StartDate,
            EndDate: this.EndDate,
            Patient: this.Patient
       
        })
        .then(result => {
            console.log('medicalRecord created with Id: ' + result);
            this.empty();
            // Optionally, you can perform any post-save actions here
        })
            .catch(error => {
            console.log('Error occurred while creating medicalRecord: ' , error);
            // Optionally, handle errors gracefully and inform the user
        });
    }



}