export type IComment = {
  id: string;
  text: string;
  created_at: Date;
  created_by: IEmployee;
  created_by_id: number;
  employee_task: IEmployeeTask;
  employee_task_id: string;
};

export type IEmployee = {
  id: number;
  first_name: string;
  last_name: string;
  title?: string;
  email: string;
  birth_date: Date;
  date_of_employment?: Date;
  termination_date?: Date;
  image_url?: string;
  profession: IProfession;
  profession_id?: string;
  hr_manager: IEmployee;
  hr_manager_id?: number;
  employees: IEmployee[];
  employee_settings: IEmployeeSettings;
  employee_task: IEmployeeTask[];
  notifications?: INotification[];
};

export type IEmployeeSettings = {
  employee_id?: number;
  slack: boolean;
  delegate: boolean;
  deadline: boolean;
  week_before_deadline: boolean;
  termination: boolean;
  hired: boolean;
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
  task_id?: string;
  employee?: IEmployee;
  responsible?: IEmployee;
  employee_id?: number;
  responsible_id?: number;
  due_date: Date;
  completed_by?: IEmployee;
  completed_by_id?: number;
  completed_date?: Date;
  comment: IComment[];
};

export type INotification = {
  id: string;
  employee_id: number;
  created_at: Date;
  read: boolean;
  description: string;
  employee: IEmployee;
  created_by_employee: IEmployee;
};

export type IPhase = {
  id: string;
  title: string;
  process_template_id: string;
  process_template?: IProcessTemplate;
  tasks?: ITask[];
  due_date?: Date;
  due_date_day_offset?: number;
};

export type IProcessTemplate = {
  title: string;
  slug: string;
  phases?: IPhase[];
};

export type IProfession = {
  slug: string;
  title: string;
  tasks?: ITask[];
};

export type ITask = {
  id: string;
  title: string;
  description: string;
  link?: string;
  global: boolean;
  phase_id: string;
  phase: IPhase;
  responsible_type: ResponsibleType;
  professions?: IProfession[];
  employee_task: IEmployeeTask[];
  responsible?: IEmployee;
  responsible_id?: number;
  due_date_day_offset?: number;
  due_date?: Date;
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
