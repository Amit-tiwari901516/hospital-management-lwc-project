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
    return [Select Id, Name, Phone__c FROM Doctor_Registeration__c ];
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
  
}