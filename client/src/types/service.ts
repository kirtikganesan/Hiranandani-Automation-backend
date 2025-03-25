export interface Service {
    id: string;
    ServiceMainCategory: string;
    ServiceName: string;
    financialYear: string;
    GSTBillingCategory: string;
    DueDate: string;
    UDIN: string;
    NoOfClients: number;
    NoOfTasks: number;
  }
  
  export interface Task {
    id: string;
    taskName: string;
    days: number;
    hours: number;
    minutes: number;
  }
  
  export interface ServiceFormData {
    ServiceMainCategory: string;
    ServiceName: string;
    GSTBillingCategory: string;
    DueDate: string;
    UDIN: string;
    tasks: Task[];
    financialYear: string;
    periodicity: string;
    ratePerPeriodicity: string;
  }