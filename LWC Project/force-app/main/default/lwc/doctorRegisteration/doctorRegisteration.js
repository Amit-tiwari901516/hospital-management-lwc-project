import { LightningElement } from 'lwc';
import CreateDoctorRegisteration from '@salesforce/apex/AppointmentSchedulingController.CreateDoctorRegisteration'; 

export default class DoctorRegisteration extends LightningElement {

    FullName;
    DOB;
    email;
    phone;
    address;
    specialisationValue;
    otheValue;


    //full name
    ChangeFUllNameHandler(event){
        this.FullName = event.target.value;
        console.log('FullName: ' + this.FullName);
    }

    //DOB
    ChangeDOBHandler(event){
        this.DOB = event.target.value;
        console.log('DOB: ' + this.DOB);
    }

    //email
    ChangeEmailHandler(event){
        this.email = event.target.value;
        console.log('email: ' + this.email);
    }

    //phone
    ChangePhoneHandler(event){
        this.phone = event.target.value;
        console.log('phone: ' + this.phone);
    }

    //address
    ChangeAddressHandler(event){
        this.address = event.target.value;
        console.log('address: ' + this.address);
    }

    //specialisationValue

    get specialisationOptions() {
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

    handleSpecialisationChange(event){
        this.specialisationValue = event.target.value;
        console.log('specialisationValue: ' + this.specialisationValue);
    }

    //otheValue

    get otherOptions() {
        return [
            { label: 'Yes', value: 'Yes' },
            { label: 'No', value: 'No' },
            
       ];
    }

    handleMemberChange(event){
        this.otheValue = event.target.value;
        console.log('otheValue: ' + this.otheValue);
    }

    //close or cancel
    closeModal(){
        window.history.back();
    }

    //empty
    empty(){
        this.FullName = '';
        this.DOB = '';
        this.email = '';
        this.phone = '';
        this.address = '';
        this.specialisationValue = '';
        this.otheValue = '';
        
    }

    

    //save
    handleSubmit(){
        CreateDoctorRegisteration({
            FullName: this.FullName,
            email: this.email,
            DOB : this.DOB,
            phone: this.phone,
            address: this.address,
            specialisationValue: this.specialisationValue,
            otheValue: this.otheValue
        })
        .then(result => {
            console.log('Doctor Registration created with Id: ' + result);
            window.history.back();
            // Optionally, you can perform any post-save actions here
        })
        .catch(error => {
            console.log("Error occurred while creating Doctor regiteration:", error);
            // Optionally, handle errors gracefully and inform the user
        });
    }

    //save And new
    SaveandopenNew(){
        CreateDoctorRegisteration({
            FullName: this.FullName,
            email: this.email,
            DOB : this.DOB,
            phone: this.phone,
            address: this.address,
            specialisationValue: this.specialisationValue,
            otheValue: this.otheValue
        })
        .then(result => {
            console.log('Doctor Registration created with Id: ' + result);
            this.empty();
            // Optionally, you can perform any post-save actions here
        })
        .catch(error => {
            console.log("Error occurred while creating Doctor regiteration:", error);
            // Optionally, handle errors gracefully and inform the user
        });
        
    }
    
}