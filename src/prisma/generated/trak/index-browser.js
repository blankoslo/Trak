
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal
} = require('./runtime/index-browser')


const Prisma = {}

exports.Prisma = Prisma

/**
 * Prisma Client JS version: 2.21.2
 * Query Engine version: b8c35d44de987a9691890b3ddf3e2e7effb9bf20
 */
Prisma.prismaVersion = {
  client: "2.21.2",
  engine: "b8c35d44de987a9691890b3ddf3e2e7effb9bf20"
}

Prisma.PrismaClientKnownRequestError = () => {
  throw new Error(`PrismaClientKnownRequestError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  throw new Error(`PrismaClientUnknownRequestError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientRustPanicError = () => {
  throw new Error(`PrismaClientRustPanicError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientInitializationError = () => {
  throw new Error(`PrismaClientInitializationError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientValidationError = () => {
  throw new Error(`PrismaClientValidationError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */

Prisma.sql = () => {
  throw new Error(`sqltag is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.empty = () => {
  throw new Error(`empty is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.join = () => {
  throw new Error(`join is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.raw = () => {
  throw new Error(`raw is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.validator = () => (val) => val

/**
 * Enums
 */
// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275
function makeEnum(x) { return x; }

exports.Prisma.EmployeeScalarFieldEnum = makeEnum({
  id: 'id',
  title: 'title',
  email: 'email',
  professionId: 'professionId',
  firstName: 'firstName',
  lastName: 'lastName',
  birthDate: 'birthDate',
  dateOfEmployment: 'dateOfEmployment',
  terminationDate: 'terminationDate',
  imageUrl: 'imageUrl',
  hrManagerId: 'hrManagerId'
});

exports.Prisma.EmployeeSettingsScalarFieldEnum = makeEnum({
  employeeId: 'employeeId',
  slack: 'slack',
  notificationSettings: 'notificationSettings'
});

exports.Prisma.EmployeeTaskScalarFieldEnum = makeEnum({
  id: 'id',
  taskId: 'taskId',
  completed: 'completed',
  employeeId: 'employeeId',
  responsibleId: 'responsibleId',
  dueDate: 'dueDate',
  completedDate: 'completedDate',
  completedById: 'completedById'
});

exports.Prisma.NotificationScalarFieldEnum = makeEnum({
  id: 'id',
  employeeId: 'employeeId',
  createdAt: 'createdAt',
  read: 'read',
  description: 'description'
});

exports.Prisma.PhaseScalarFieldEnum = makeEnum({
  id: 'id',
  title: 'title',
  processTemplateId: 'processTemplateId',
  createdAt: 'createdAt',
  dueDateDayOffset: 'dueDateDayOffset',
  dueDate: 'dueDate',
  active: 'active'
});

exports.Prisma.ProcessTemplateScalarFieldEnum = makeEnum({
  id: 'id',
  title: 'title',
  slug: 'slug'
});

exports.Prisma.ProfessionScalarFieldEnum = makeEnum({
  id: 'id',
  title: 'title'
});

exports.Prisma.TagScalarFieldEnum = makeEnum({
  id: 'id',
  title: 'title'
});

exports.Prisma.TaskScalarFieldEnum = makeEnum({
  id: 'id',
  title: 'title',
  description: 'description',
  link: 'link',
  global: 'global',
  phaseId: 'phaseId',
  responsibleId: 'responsibleId',
  createdAt: 'createdAt',
  active: 'active'
});

exports.Prisma.SortOrder = makeEnum({
  asc: 'asc',
  desc: 'desc'
});

exports.Prisma.QueryMode = makeEnum({
  default: 'default',
  insensitive: 'insensitive'
});
exports.NotificationType = makeEnum({
  DELEGATE: 'DELEGATE',
  DEADLINE: 'DEADLINE',
  WEEK_BEFORE_DEADLINE: 'WEEK_BEFORE_DEADLINE',
  TERMINATION: 'TERMINATION',
  HIRED: 'HIRED'
});

exports.Prisma.ModelName = makeEnum({
  Employee: 'Employee',
  EmployeeSettings: 'EmployeeSettings',
  EmployeeTask: 'EmployeeTask',
  Notification: 'Notification',
  Phase: 'Phase',
  ProcessTemplate: 'ProcessTemplate',
  Profession: 'Profession',
  Tag: 'Tag',
  Task: 'Task'
});

/**
 * Create the Client
 */
class PrismaClient {
  constructor() {
    throw new Error(
      `PrismaClient is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
    )
  }
}
exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
