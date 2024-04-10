import { LightningElement } from 'lwc';
import laboratoryAndPharmacySystem from '@salesforce/apex/laboratoryAndPharmacySystem.laboratoryAndPharmacySystem'; 

export default class LaboratoryAndPharmacySystem extends LightningElement {
    //TestName
    TestName='';
    changeTestNameHandler(event){
        this.TestName=event.target.value;
        console.log('TestName: ' + this.TestName);
    }

    //OrderDate
    OrderDate='';
    changeOrderDateHandler(event){
        this.OrderDate=event.target.value;
        console.log('OrderDate: ' + this.OrderDate);
    }

    //Status
    Status = '';
    get statusOptions() {
        return [
            { label: 'pending', value: 'pending' },
            { label: 'completed', value: 'completed' },
        ];
    }

    handleStatusChange(event) {
        this.Status = event.detail.value;
        console.log('Status:' + this.Status);
    }

    //MedicationName
    MedicationName='';
    changeMedicationNameHandler(event){
        this.MedicationName=event.target.value;
        console.log('MedicationName: ' + this.MedicationName);
    }

    //Dosage
    Dosage='';
    changeDosageHandler(event){
        this.Dosage=event.target.value;
        console.log('Dosage: ' + this.Dosage);
    }

    //Frequency
    Frequency='';
    changeFrequencyHandler(event){
        this.Frequency=event.target.value;
        console.log('Frequency: ' + this.Frequency);
    }

    //Prescription
    Prescription='';
    changePrescriptionHandler(event){
        this.Prescription=event.target.value;
        console.log('Prescription: ' + this.Prescription);
    }

    //cancel
    closeModal() {
        window.history.back();
    }

    empty(){
        this.TestName='';
        this.OrderDate='';
        this.Status='';
        this.MedicationName='';
        this.Dosage='';
        this.Frequency='';
        this.Prescription='';
        
    }
    //Save
    handleSubmit(event){
        laboratoryAndPharmacySystem({
            TestName: this.TestName,
            OrderDate: this.OrderDate,
            Status: this.Status,
            MedicationName: this.MedicationName,
            Dosage: this.Dosage,
            Frequency: this.Frequency,
            Prescription: this.Prescription

        })
        .then(result => {
            console.log('laboratory created with Id: ' + result);
            window.history.back();
        })
        .catch(error => {
            console.error('laboratory occurred while creating appointment: ' + error);
        });
    }

    //Save and New
    SaveandopenNew(event){
        laboratoryAndPharmacySystem({
            TestName: this.TestName,
            OrderDate: this.OrderDate,
            Status: this.Status,
            MedicationName: this.MedicationName,
            Dosage: this.Dosage,
            Frequency: this.Frequency,
            Prescription: this.Prescription

        })
        .then(result => {
            console.log('laboratory created with Id: ' + result);
            this.empty();
        })
        .catch(error => {
            console.error('laboratory occurred while creating appointment: ' + error);
        });
    }
}