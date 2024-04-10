import { LightningElement } from 'lwc';
import PatientRegister from '@salesforce/apex/AppointmentSchedulingController.PatientRegister';
import PatientRegisterNew from '@salesforce/apex/laboratoryAndPharmacySystem.PatientRegisterNew';

export default class PatientRegistration extends LightningElement {
    //personal information
    //first name
    DOBerror=false;
    ExpDateerror = false;

    firstName = "";
    changeFNameHandler(event){
        this.firstName= event.target.value;
        console.log('first name: ' + this.firstName);
    }
    
    //last Name
    lastName = "";
    changeLNameHandler(event){
        this.lastName=event.target.value;
        console.log('last name: ' + this.lastName);
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

    //Date of birth
    DOB='';
    handleDOBChange(event){
        this.DOB = event.target.value;
        console.log('DOB: ' + this.DOB);
    }
    
    //Marital Status
    MaritalStatus = '';
    get maritalOptions() {
        return [
            { label: 'Marid', value: 'Marid' },
            { label: 'Unmarid', value: 'Unmarid' },
        ];
    }

    handleMaritalChange(event) {
        this.MaritalStatus = event.detail.value;
        console.log('Marital Status: ' + this.MaritalStatus);
    }

    //Occupation
    Occupation='';
    handleOccupationChange(event){
        this.Occupation= event.target.value;
        console.log('Occupation: ' + this.Occupation);
    }
    //Contact Detail
    //Phone
    phone='';
    handlePhoneChange(event){
        this.phone=event.target.value;
        console.log('phone: ' + this.phone);
    }

    //email
    email='';
    handleEmailChange(event){
        this.email=event.target.value;
        console.log('email: ' + this.email);
    }

    //Address
    //streetAddress
    StreetAddress = '';
    handleStreetAddressChange(event) {
        this.StreetAddress = event.target.value;
        console.log('StreetAddress: ' + this.StreetAddress);
    }

    // City change handler
    City='';
    handleCityChange(event) {
        this.City = event.target.value;
        console.log('City: ' + this.City);
    }
 
    // State change handler
    State='';
    handleStateChange(event) {
        this.State = event.target.value;
        console.log('State: ' + this.State);
    }

    // Country change handler
    Country='';
    handleCountryChange(event){
        this.Country = event.target.value;
        console.log('Country: ' + this.Country);
    }

    // PostalCode change handler
    PostalCode='';
    handlePostalCodeChange(event){
        this.PostalCode = event.target.value;
        console.log('PostalCode: ' + this.PostalCode);
    }
    

    //Medical History
    //Allergies
    Allergies = '';
    handleAllergiesChange(event){
        this.Allergies=event.target.value;
        console.log('Allergies: ' + this.Allergies);
    }

    //chronicCondition
    chronicCondition='';
    handleChronicConditionChange(event){
        this.chronicCondition=event.target.value;
        console.log('chronicCondition: ' + this.chronicCondition);
    }

    //previousSurgeries
    previousSurgeries='';
    handlePreviousSurgeriesChange(event){
        this.previousSurgeries=event.target.value;
        console.log('previousSurgeries: ' + this.previousSurgeries);
    }

    //FamilyMedicalHistory
    FamilyMedicalHistory='';
    handleFamilyMedicalHistoryChange(event) {
        this.FamilyMedicalHistory=event.target.value;
        console.log('Family Medical History: ' + this.FamilyMedicalHistory);
    }

    //Insurance detail
    //InsuranceProvider
    InsuranceProvider='';
    handleInsuranceProviderChange(event){
        this.InsuranceProvider = event.target.value;
        console.log('InsuranceProvider: ' +this.InsuranceProvider);
    }

    //PolicyNumber
    PolicyNumber='';
    handlePolicyNumberChange(event){
        this.PolicyNumber = event.target.value;
        console.log('PolicyNumber: ' + this.PolicyNumber);
    }

    //GroupNumber
    GroupNumber='';
    handleGroupNumberChange(event){
        this.GroupNumber = event.target.value;
        console.log('GroupNumber: ' +this.GroupNumber);
    }

    //PrimaryCarePhysican
    PrimaryCarePhysican='';
    handlePrimaryCarePhysicanChange(event){
        this.PrimaryCarePhysican = event.target.value;
        console.log('PrimaryCarePhysican: ' + this.PrimaryCarePhysican)
    }

    //InsuranceExpiryDate
    InsuranceExpiryDate='';
    handleInsuranceExpiryDateChange(event){
        this.InsuranceExpiryDate = event.target.value;
        console.log('InsuranceExpiryDate: ' + this.InsuranceExpiryDate);
    }

    //cancel 
    resetForm() {
        // Clear all fields after successful submission
        Object.keys(this).forEach(key => {
            if (typeof this[key] === 'string') {
                this[key] = '';
            }
        });
    }

    closedModal() {
        window.history.back();
    }

    empty(){
        this.lastName = "";
        this.firstName = "";
        this.Gender = '';
        this.DOB = '';
        this.MaritalStatus = '';
        this.Occupation='';
        this.phone='';
        this.email='';
        this.Allergies = '';
        this.chronicCondition='';
        this.previousSurgeries='';
        this.FamilyMedicalHistory='';
        this.PolicyNumber='';
        this.InsuranceProvider='';
        this.InsuranceExpiryDate='';
        this.PrimaryCarePhysican='';
        this.GroupNumber='';
        this.StreetAddress = '';
        this.City = '';
        this.State='';
        this.Country='';
        this.PostalCode='';

    }

    //save
    /*PatientRegister={'sObjectType' : 'Patient_Registration__c'}
    handleSubmit(){

        this.PatientRegister = this.template.querySelector('lightning-input[data-formfield="firstName"]').value;
        this.PatientRegister = this.template.querySelector('lightning-input[data-formfield="lastName"]').value;
        this.PatientRegister = this.template.querySelector('lightning-input[data-formfield="DOB"]').value;
        this.PatientRegister = this.template.querySelector('lightning-input[data-formfield="Occupation"]').value;
        this.PatientRegister = this.template.querySelector('lightning-input[data-formfield="phone"]').value;
        this.PatientRegister = this.template.querySelector('lightning-input[data-formfield="email"]').value;
        this.PatientRegister = this.template.querySelector('lightning-input[data-formfield="StreetAddress"]').value;
        this.PatientRegister = this.template.querySelector('lightning-input[data-formfield="City"]').value;
        this.PatientRegister = this.template.querySelector('lightning-input[data-formfield="State"]').value;
        this.PatientRegister = this.template.querySelector('lightning-input[data-formfield="Country"]').value;
        this.PatientRegister = this.template.querySelector('lightning-input[data-formfield="PostalCode"]').value;
        this.PatientRegister = this.template.querySelector('lightning-input[data-formfield="chronicCondition"]').value;
        this.PatientRegister = this.template.querySelector('lightning-input[data-formfield="previousSurgeries"]').value;
        this.PatientRegister = this.template.querySelector('lightning-input[data-formfield="FamilyMedicalHistory"]').value;
        this.PatientRegister = this.template.querySelector('lightning-input[data-formfield="Allergies"]').value;
        this.PatientRegister = this.template.querySelector('lightning-input[data-formfield="InsuranceProvider"]').value;
        this.PatientRegister = this.template.querySelector('lightning-input[data-formfield="PolicyNumber"]').value;
        this.PatientRegister = this.template.querySelector('lightning-input[data-formfield="GroupNumber"]').value;
        this.PatientRegister = this.template.querySelector('lightning-input[data-formfield="PrimaryCarePhysican"]').value;
        this.PatientRegister = this.template.querySelector('lightning-input[data-formfield="InsuranceExpiryDate"]').value;




        PatientRegister({ Register: this.PatientRegister })
        .then((result)=>{
            console.log(JSON.stringify(result));
            this.closedModel();
        })
        .catch((error)=>{
            console.log(JSON.stringify(errors));
        });
    }*/

    //Save
    handleSubmit(){
        // Reset error flags
        this.DOBerror = false;
        this.ExpDateerror = false;
    
        // Validate date of birth
        let today = new Date().toISOString().slice(0,10);
        if (this.DOB > today) {
            this.DOBerror = true;
        }
    
        // Validate insurance expiry date
        if (this.InsuranceExpiryDate < today){
            this.ExpDateerror = true;
        }
    
        // If any validation error is present, return early without creating the record
        if (this.DOBerror || this.ExpDateerror) {
            return;
        }
    
        // Call the Apex method to save the data
        PatientRegisterNew({
            lastName: this.lastName,
            firstName: this.firstName,
            Gender: this.Gender,
            DOB:this.DOB,
            MaritalStatus:this.MaritalStatus,
            Occupation: this.Occupation,
            phone: this.phone,
            email: this.email,
            Allergies: this.Allergies,
            chronicCondition: this.chronicCondition,
            previousSurgeries:this.previousSurgeries,
            FamilyMedicalHistory:this.FamilyMedicalHistory,
            PolicyNumber:this.PolicyNumber,
            InsuranceProvider:this.InsuranceProvider,
            InsuranceExpiryDate: this.InsuranceExpiryDate,
            PrimaryCarePhysican: this.PrimaryCarePhysican,
            GroupNumber:this.GroupNumber,
            StreetAddress:this.StreetAddress,
            City:this.City,
            State:this.State,
            Country:this.Country,
            PostalCode:this.PostalCode
        })
        .then(result => {
            // Record creation success
            console.log('Patient Registration created with Id: ' + result);
            this.closedModal(); 
                
            // Optionally, you can perform any post-save actions here
        })
        .catch(error => {
            // Record creation error
            console.log("Error occurred while creating Patient Registration:", error);
            // Optionally, handle errors gracefully and inform the user
        });
    }

    //save and new


    SaveandopenNew(){

        this.DOBerror = false;
        this.ExpDateerror = false;
    
        // Validate date of birth
        let today = new Date().toISOString().slice(0,10);
        if (this.DOB > today) {
            this.DOBerror = true;
        }
    
        // Validate insurance expiry date
        if (this.InsuranceExpiryDate < today){
            this.ExpDateerror = true;
        }
    
        // If any validation error is present, return early without creating the record
        if (this.DOBerror || this.ExpDateerror) {
            return;
        }
        // Call the Apex method to save the data
        PatientRegisterNew({ // Calling the correct method
            lastName: this.lastName,
            firstName: this.firstName,
            Gender: this.Gender,
            DOB:this.DOB,
            MaritalStatus:this.MaritalStatus,
            Occupation: this.Occupation,
            phone: this.phone,
            email: this.email,
            Allergies: this.Allergies,
            chronicCondition: this.chronicCondition,
            previousSurgeries:this.previousSurgeries,
            FamilyMedicalHistory:this.FamilyMedicalHistory,
            PolicyNumber:this.PolicyNumber,
            InsuranceProvider:this.InsuranceProvider,
            InsuranceExpiryDate: this.InsuranceExpiryDate,
            PrimaryCarePhysican: this.PrimaryCarePhysican,
            GroupNumber:this.GroupNumber,
            StreetAddress:this.StreetAddress,
            City:this.City,
            State:this.State,
            Country:this.Country,
            PostalCode:this.PostalCode
           
        })
        .then(result => {
            console.log('Patient Registration created with Id: ' + result);
            this.closedModal(); 
            
            // Optionally, you can perform any post-save actions here
        })
        .catch(error => {
           
            console.log("Error occurred while creating Patient Registreation:", error);
            // Optionally, handle errors gracefully and inform the user
        });
    }


}