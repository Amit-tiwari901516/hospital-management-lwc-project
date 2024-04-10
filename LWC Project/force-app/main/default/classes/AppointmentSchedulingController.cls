public with sharing class AppointmentSchedulingController {
    @AuraEnabled
    public Static Id CreateAppointment( 
        String fName, 
        String lName, 
        Date DOB, 
        String Phone, 
        String Gender, 
        String email, 
        String StreetAddress, 
        String City, 
        String State, 
        String Country, 
        String PostalCode, 
        String HospitalVisit, 
        String department, 
        String reason, 
        DateTime appointmentDate,
        ID TreatingDoctor
        
    ) {
        System.debug('Creating Appointment...');
        Appointment_Scheduling__c appointment = new Appointment_Scheduling__c();
        appointment.Name = fName +  lName;
        appointment.First_Name__c = fName;
        appointment.Last_Name__c = lName;
        appointment.Date_of_Birth__c = DOB;
        appointment.Phone__c = Phone;
        appointment.Gender__c = Gender;
        appointment.Email__c = email;
        appointment.Street_Address__c = StreetAddress;
        appointment.City__c = City;
        appointment.State__c = State;
        appointment.Country__c = Country;
        appointment.Postal_Zip_Code__c = PostalCode;
        appointment.HospitalVisit__c = HospitalVisit;
        appointment.Department__c = department;
        appointment.Reason_Of_Appointment__c = reason;
        appointment.Appointment_Date_and_Time__c = appointmentDate;
        appointment.Doctor_Name__c = TreatingDoctor;
        
        System.debug('Inserting Appointment...');
        insert appointment;

        System.debug('Appointment ID: ' + appointment.Id);
        return appointment.id;

    }

    
    @AuraEnabled
    public Static Id medicalRecord( 
        String DiagnosisCode, 
        String Description, 
        Id TreatingDoctor,
        Id Patient,
        String TreatmentPlanName,
        string TreatmentPlanDescription,
        Date DateDiagnosed,
        Date StartDate,
        Date EndDate
        
    ) {
        System.debug('Creating Medical Record...');
        Medical_Record_Management__c medicalRecord = new Medical_Record_Management__c();
        medicalRecord.Diagnosis_Code__c = DiagnosisCode;
        medicalRecord.Description__c = Description;
        medicalRecord.Treating_Doctor__c = TreatingDoctor;
        medicalRecord.Treatment_Plan_Name__c = TreatmentPlanName;
        medicalRecord.Treatment_Plan_Description__c = TreatmentPlanDescription;
        medicalRecord.Date_Diagnosed__c = DateDiagnosed;
        medicalRecord.Start_Date__c = StartDate;
        medicalRecord.End_Date__c = EndDate;
        medicalRecord.Patient__c = Patient;

        
        System.debug('Inserting Medical Record...');
        insert medicalRecord;

        System.debug('Medical Record ID: ' + medicalRecord.Id);
        return medicalRecord.id;
        
        
    }




    /*checkin save
    @AuraEnabled
    public Static  String PaitentCheckIn(Patient_Check_in__c patient){
        System.debug('Checking in Patient...');
        insert patient;
        System.debug('Patient Checked In: ' + patient.Id);
        return 'inserted successfully';
    }*/

    //save and new checkIn
    @AuraEnabled
    public Static Id checkIn(
        DateTime checkInDate,
        string statusValue,
        string reasonValue,
        String Patient

    ) {
        System.debug('Checking in Patient...');
        Patient_Check_in__c checkIn = new Patient_Check_in__c();
        checkIn.Date__c = checkInDate;
        checkIn.Status__c = statusValue;
        checkIn.Reason_of_Visit__c = reasonValue;
        checkIn.Patient__c = Patient;

        System.debug('Inserting Check-in...');
        insert checkIn;

        System.debug('Check-in ID: ' + checkIn.Id);
        return checkIn.id;
    }

    //Patient register

    @AuraEnabled
    public Static String PatientRegister(Patient_Registration__c Register){
        System.debug('Registering Patient...');
        insert Register;

        System.debug('Patient Registered: ' + Register.Id);
        return 'inserted successfully';
    }

    //Doctor Registeration

    @AuraEnabled
    public Static Id CreateDoctorRegisteration(
        Date DOB,
        string FullName,
        string email,
        string phone,
        string address,
        string specialisationValue,
        string otheValue

    ) {
        System.debug('Doctor register...');
        Doctor_Registeration__c register = new Doctor_Registeration__c();
        register.Name = FullName;
        register.Date_of_Birth__c = DOB;
        register.Full_Name__c = FullName;
        register.Email__c = email;
        register.Phone__c = phone;
        register.Address__c = address;
        register.specialisation__c = specialisationValue;
        register.Member_of_Other_Medical_Association__c = otheValue;

        System.debug('Inserting register...');
        insert register;

        System.debug('register ID: ' + register.Id);
        return register.id;
    }
    
}
