export type IComment = {
  id: string;
  text: string;
  createdAt: Date;
  createdByEmployee: IEmployee;
  createdById: number;
  employeeTask: IEmployeeTask;
  employeeTaskId: string;
};

export type IEmployee = {
  id: number;
  firstName: string;
  lastName: string;
  title?: string;
  email: string;
  birthDate: Date;
  dateOfEmployment?: Date;
  terminationDate?: Date;
  imageUrl?: string;
  profession: IProfession;
  professionId?: string;
  hrManager: IEmployee;
  hrManagerId?: number;
  employees: IEmployee[];
  employeeSettings: IEmployeeSettings;
  employeeTask: IEmployeeTask[];
  notifications?: INotification[];
};

export type IEmployeeSettings = {
  employeeId?: number;
  slack?: boolean;
  notificationSettings: ('DELEGATE' | 'DEADLINE' | 'WEEK_BEFORE_DEADLINE' | 'TERMINATION' | 'HIRED')[];
};

export enum NotificationType {
  DELEGATE = 'jeg blir delegert en oppgave',
  DEADLINE = 'en fase utløper',
  WEEK_BEFORE_DEADLINE = 'en fase utløper om en uke',
  TERMINATION = 'en av mine ansatte skal slutte',
  HIRED = 'jeg får ansvaret for en ny ansatt',
}

export enum NotificationTypeEnum {
  DELEGATE = 'DELEGATE',
  DEADLINE = 'DEADLINE',
  WEEK_BEFORE_DEADLINE = 'WEEK_BEFORE_DEADLINE',
  TERMINATION = 'TERMINATION',
  HIRED = 'HIRED',
}

export type IEmployeeTask = {
  id: string;
  completed: boolean;
  task?: ITask;
  taskId?: string;
  employee?: IEmployee;
  responsible?: IEmployee;
  employeeId?: number;
  responsibleId?: number;
  dueDate: Date;
  completedBy?: IEmployee;
  completedById?: number;
  completedDate?: Date;
  comment: IComment[];
};

export type INotification = {
  id: string;
  employeeId: number;
  createdAt: Date;
  read: boolean;
  description: string;
  employee: IEmployee;
};

export type IPhase = {
  id: string;
  title: string;
  processTemplateId: string;
  processTemplate?: IProcessTemplate;
  tasks?: ITask[];
  dueDate?: Date;
  dueDateDayOffset?: number;
};

export type IProcessTemplate = {
  title: string;
  slug: string;
  phases?: IPhase[];
};

export type IProfession = {
  id: string;
  title: string;
  tasks?: ITask[];
};

export type ITag = {
  id: string;
  title: string;
  tasks?: ITask[];
};

export type ITask = {
  id: string;
  title: string;
  description: string;
  link?: string;
  global: boolean;
  phaseId: string;
  phase: IPhase;
  responsibleType: ResponsibleType;
  professions?: IProfession[];
  tags?: ITag[];
  employeeTask: IEmployeeTask[];
  responsible?: IEmployee;
  responsibleId?: number;
  dueDateDayOffset?: number;
  dueDate?: Date;
};

export enum Offset {
  Before = 'before',
  After = 'after',
}

export enum Actions {
  UpdateDueDate = 'updateDueDate',
}

export enum Process {
  ONBOARDING = 'onboarding',
  LOPENDE = 'lopende',
  OFFBOARDING = 'offboarding',
}

export type IEmployeeExtended = IEmployee & { tasksFinished: number; totalTasks: number };

export type IPhaseWithEmployees = {
  id: string;
  title: string;
  employees: IEmployeeExtended[];
};

export enum ColorMode {
  DARK = 'dark',
  LIGHT = 'light',
}

export enum ResponsibleType {
  HR_MANAGER = 'HR_MANAGER',
  PROJECT_MANAGER = 'PROJECT_MANAGER',
  OTHER = 'OTHER',
}
