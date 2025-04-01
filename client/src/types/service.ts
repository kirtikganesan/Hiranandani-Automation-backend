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

export interface ServiceFormData {
  ServiceMainCategory: string;
  ServiceName: string;
  GSTBillingCategory: string;
  DueDate: string;
  UDIN: string;
  financialYear: string;
}
