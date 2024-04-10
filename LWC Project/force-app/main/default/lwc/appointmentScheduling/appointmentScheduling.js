import { LightningElement } from 'lwc';
import CreateAppointment from '@salesforce/apex/AppointmentSchedulingController.CreateAppointment'; 

export default class AppointmentScheduling extends LightningElement {
    // Variable declarations...
    DOBerror=false;
    appointmentDateError=false;
    fName='';
    lName='';
    DOB='';
    Phone='';
    Gender = '';
    email='';
    StreetAddress='';
    City='';
    State='';
    Country='';
    PostalCode='';
    HospitalVisit='';
    Department='';
    Reason = '';
    appointmentDate = '';

        
    // First Name change handler
    changeFNameHandler(event){
        this.fName = event.target.value;
        console.log('First Name: ' + this.fName);
    }

    // Last Name change handler
    changeLNameHandler(event){
        this.lName = event.target.value;
        console.log('Last Name: ' + this.lName);
    }

    // DOB change handler
    changeDOBHandler(event){
        this.DOB = event.target.value;
        console.log('DOB: ' + this.DOB);
    }

    // Phone change handler
    changePhoneHandler(event){
        this.Phone = event.target.value;
        console.log('Phone: ' + this.Phone);
    }

    //Gender
    Gender = '';
    get genderOptions() {
        return [
            { label: 'Male', value: 'Male' },
            { label: 'Female', value: 'Female' },
            { label: 'Others', value: 'Others' },
       ];
    }
   
    handleGenderChange(event) {
         this.Gender = event.detail.value;
         console.log('Gender: ' + this.Gender);
    }

    

    // Email change handler
    handleEmailChange(event) {
        this.email = event.target.value;
        console.log('Email: ' + this.email);
    }

    // Street Address change handler
    handleStreetAddressChange(event) {
        this.StreetAddress = event.target.value;
        console.log('StreetAddress: ' + this.StreetAddress);
    }

    // City change handler
    handleCityChange(event) {
        this.City = event.target.value;
        console.log('City: ' + this.City);
    }

    // State change handler
    handleStateChange(event) {
        this.State = event.target.value;
        console.log('State: ' + this.State);
    }

    // Country change handler
    handleCountryChange(event){
        this.Country = event.target.value;
        console.log('Country: ' + this.Country);
    }

    // PostalCode change handler
    handlePostalCodeChange(event){
        this.PostalCode = event.target.value;
        console.log('PostalCode: ' + this.PostalCode);
    }
    
    // Hospital Visit change handler
     
    HospitalVisit = '';
    get HospitalVisitOptions() {
        return [
            { label: 'Yes', value: 'Yes' },
            { label: 'No', value: 'No' },
        ];
    }
    handleHospitalVisitChange(event){
        this.HospitalVisit = event.detail.value;
        console.log('HospitalVisit: ' + this.HospitalVisit);
    }

    //Department
    get DepartmentOptions() {
        return [
            { label: 'Neurologist', value: 'Neurologist' },
            { label: 'Dentist', value: 'Dentist' },
            { label: 'ENT', value: 'ENT' },
            { label: 'Cardiologist', value: 'Cardiologist'},
            { label: 'Eye Specialist', value: 'Eye Specialist'},
            { label: 'Oncologist', value: 'Oncologist'},
            { label: 'Orthopedic', value: 'Orthopedic'},
            { label: 'Gynecologist', value: 'Gynecologist'},
            { label: 'Dermatologist', value: 'Dermatologist'},
            { label: 'other', value: 'other'},
       ];
    }

    handleDepartmentChange(event){
        this.Department = event.target.value;
        console.log('Department: ' + this.Department);
    }

     // Reason picklist
     Reason = '';
     get reasonOptions() {
         return [
             { label: 'Medical Examination', value: 'Medical Examination' },
             { label: 'Check-up', value: 'Check-up' },
             { label: 'Doctor Check', value: 'Doctor Check' },
             { label: 'Result Analysis', value: 'Result Analysis' },
         ];
     }
 
     handleReasonChange(event) {
         this.Reason = event.detail.value;
         console.log('Reason: ' + this.Reason);
     }

    // Appointment Date change handler
    changeAppointmentDateHandler(event){
        this.appointmentDate = event.target.value;
        console.log('appointmentDate: ' + this.appointmentDate);
    }

    //c/doctorRegisterationTreatingDoctor='';
    TreatingDoctor='';
    changeTreatingDoctorHandler(event){
        this.TreatingDoctor = event.detail.recordId; 
        console.log('TreatingDoctor: ' + this.TreatingDoctor);
    }

    MatchingInfo ={
        primaryField: { fieldPath: 'Name'}
    };

    // Cancel method
    closeModal(event){
        // Resetting all fields to empty string
        window.history.back();
    }

    //empty
    empty(){
        this.fName='';
        this.lName='';
        this.DOB='';
        this.Phone='';
        this.Gender = '';
        this.email='';
        this.StreetAddress='';
        this.City='';
        this.State='';
        this.Country='';
        this.PostalCode='';
        this.HospitalVisit='';
        this.Department='';
        this.Reason = '';
        this.appointmentDate='';

        
    }

    // Save method
    handleSubmit(event){

        // Reset error flags
        this.DOBerror = false;
        this.appointmentDateError = false;

        let today = new Date().toISOString().slice(0,10);

        // Validate Date of Birth
        if(this.DOB > today){
            this.DOBerror = true;
        }

        // Validate Appointment Date
        let selectedAppointmentDateTime = new Date(this.appointmentDate);
        let currentDateTime = new Date();

        if(selectedAppointmentDateTime < currentDateTime){
            this.appointmentDateError = true;
        }

        // If any validation error is present, return early without creating the record
        if (this.DOBerror || this.appointmentDateError) {
            return;
        }


        // Call the Apex method to save the data
        CreateAppointment({ // Calling the correct method
            fName: this.fName,
            lName: this.lName,
            DOB: this.DOB,
            Phone: this.Phone,
            Gender: this.Gender,
            email: this.email,
            StreetAddress: this.StreetAddress,
            City: this.City,
            State: this.State,
            Country: this.Country,
            PostalCode: this.PostalCode,
            HospitalVisit: this.HospitalVisit,
            department: this.Department,
            reason: this.Reason,
            appointmentDate: this.appointmentDate,
            TreatingDoctor: this.TreatingDoctor
        })
        .then(result => {
            console.log('Appointment created with Id: ' + result);
            window.history.back();
            // Optionally, you can perform any post-save actions here
        })
        .catch(error => {
            console.log("Error occurred while creating creating Appointment:", error);
            // Optionally, handle errors gracefully and inform the user
        });
    }

    
    //save and New

    SaveandopenNew(event){
        // Call the Apex method to save the data
        CreateAppointment({ // Calling the correct method
            fName: this.fName,
            lName: this.lName,
            DOB: this.DOB,
            Phone: this.Phone,
            Gender: this.Gender,
            email: this.email,
            StreetAddress: this.StreetAddress,
            City: this.City,
            State: this.State, 
            Country: this.Country,
            PostalCode: this.PostalCode,
            HospitalVisit: this.HospitalVisit,
            department: this.Department,
            reason: this.Reason,
            appointmentDate: this.appointmentDate,
            TreatingDoctor: this.TreatingDoctor
        })
        .then(result => {
            console.log('Appointment created with Id: ' + result);
            this.empty();
            // Optionally, you can perform any post-save actions here
        })
        .catch(error => {
            console.error('Error occurred while creating appointment: ' + error);
            // Optionally, handle errors gracefully and inform the user
        });
    }
    
}
