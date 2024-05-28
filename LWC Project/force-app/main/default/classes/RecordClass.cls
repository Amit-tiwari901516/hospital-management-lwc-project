public with sharing class RecordClass {
    
  //fetch patient registration Record
  @AuraEnabled(cacheable=true)
  public static List<Patient_Registration__c> fetchRegisteredPatientRecords() {
    return [Select Id, Name,Phone__c,Email__c From Patient_Registration__c];
  } 


  //fetch Appointment Scheduled Record
  @AuraEnabled(cacheable=true)
  public static List<Appointment_Scheduling__c> fetchAppointmentScheduledRecords(){
    return [Select Id, Name, Appointment_Date_and_Time__c, Department__c FROM Appointment_Scheduling__c];
  }


  //fetch doctor records
  @AuraEnabled(Cacheable = true)
  public static List<Doctor_Registeration__c> fetchDoctorRecord(){
    return [Select Id, Name, Phone__c, Email__c FROM Doctor_Registeration__c ];
  }

  // update doctor Records inside datatable
  @AuraEnabled
  public static string updateDoctorRecord(Object data){
    List<Doctor_Registeration__c> updateDoctorRecord =(List<Doctor_Registeration__c>) JSON.deserialize(JSON.serialize(data), List<Doctor_Registeration__c>.class );
    
    try {
      update updateDoctorRecord;
      return 'Success : Record updated successfully';
    } catch (Exception e) {
      return 'the following error  has occured :' + e.getMessage();
    }
  }


  // Fetch scheduled appointments for a given doctor
  @AuraEnabled(cacheable=true)
  public static List<Appointment_Scheduling__c> fetchTodayAppointmentScheduledRecords(Id doctorId){
    Date today = Date.today();
    DateTime startOfDay = Datetime.newInstance(today.year(), today.month(), today.day());
    DateTime endOfDay = startOfDay.addDays(1);
 
    return [
      SELECT Id, Name, Appointment_Date_and_Time__c, Department__c 
      FROM Appointment_Scheduling__c 
      WHERE Appointment_Date_and_Time__c >= :startOfDay 
      AND Appointment_Date_and_Time__c < :endOfDay
      AND Doctor_Name__c = :doctorId
    ];
  } 
   
  
  // fetch Data source record
  @AuraEnabled(cacheable=true)
  public static List<Data_Sources__c> getRelatedDataSources(List<Id> researchInitiativesIds) {
    return [SELECT Id, Name, Status__c FROM Data_Sources__c WHERE Initiative_Name__c IN :researchInitiativesIds];
  }

  //Google maps
  @AuraEnabled(cacheable=true)
    public static Patient_Registration__c getLocationById(Id recordId){
        return [SELECT Id, Name, City__c, Postal_Zip_Code__c, Country__c, State__c, Street_Address__c FROM Patient_Registration__c  WHERE Id = :recordId LIMIT 1];
    }


   
}



