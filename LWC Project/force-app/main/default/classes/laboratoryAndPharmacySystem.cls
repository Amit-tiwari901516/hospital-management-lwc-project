public with sharing class laboratoryAndPharmacySystem {


    @AuraEnabled
    public Static Id laboratoryAndPharmacySystem( 
        String TestName, 
        Date OrderDate,
        String Status,
        String MedicationName,
        String Dosage,
        String Frequency,
        String Prescription

    ) {
        Laboratory_and_Pharmacy_System__c lab = new Laboratory_and_Pharmacy_System__c();
        lab.Test_Name__c = TestName;
        lab.Order_Date__c = OrderDate;
        lab.Status__c = Status;
        lab.Medication_Name__c = MedicationName;
        lab.Dosage__c = Dosage;
        lab.Frequency__c = Frequency;
        lab.Prescription__c = Prescription;
        
        insert lab;

        return lab.id;
    }

    @AuraEnabled
    public Static Id PatientRegisterNew( 
        String lastName,
        String firstName,
        String Gender,
        Date DOB,
        String MaritalStatus,
        String Occupation,
        String phone,
        String email,
        String Allergies,
        String chronicCondition,
        String previousSurgeries,
        String FamilyMedicalHistory,
        Decimal PolicyNumber,
        String InsuranceProvider,
        date InsuranceExpiryDate,
        String PrimaryCarePhysican,
        String GroupNumber,
        String StreetAddress,
        String City,
        String State,
        String Country,
        String PostalCode

    ) {
        Patient_Registration__c newRegister = new Patient_Registration__c();
        newRegister.Name = firstName + lastName;
        newRegister.Last_Name__c = lastName;
        newRegister.First_Name__c = firstName;
        newRegister.Gender__c = Gender;
        newRegister.Date_of_Birth__c = DOB;
        newRegister.Marital_Status__c = MaritalStatus;
        newRegister.Occupation__c = Occupation;
        newRegister.Phone__c = phone;
        newRegister.Email__c = email;
        newRegister.Allergies__c = Allergies;
        newRegister.Chronic_Condition__c = chronicCondition;
        newRegister.Previous_Surgeries__c = previousSurgeries;
        newRegister.Family_Medical_History__c = FamilyMedicalHistory;
        newRegister.Policy_Number__c = PolicyNumber;
        newRegister.Insurance_Provider__c = InsuranceProvider;
        newRegister.Insurance_Expiry_Date__c = InsuranceExpiryDate;
        newRegister.Primary_Care_Physican__c = PrimaryCarePhysican;
        newRegister.Group_Number__c = GroupNumber;
        newRegister.City__c	 = City;
        newRegister.Country__c = Country;
        newRegister.Street_Address__c = StreetAddress;
        newRegister.State__c = State;
        newRegister.Postal_Zip_Code__c = PostalCode;

        
        insert newRegister;

        return newRegister.id;
    }

}