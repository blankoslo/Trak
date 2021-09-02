
/**
 * Client
**/

import * as runtime from './runtime';
declare const prisma: unique symbol
export type PrismaPromise<A> = Promise<A> & {[prisma]: true}
type UnwrapPromise<P extends any> = P extends Promise<infer R> ? R : P
type UnwrapTuple<Tuple extends readonly unknown[]> = {
  [K in keyof Tuple]: K extends `${number}` ? Tuple[K] extends PrismaPromise<infer X> ? X : UnwrapPromise<Tuple[K]> : UnwrapPromise<Tuple[K]>
};


/**
 * Model Employee
 */

export type Employee = {
  id: number
  title: string | null
  email: string
  professionId: string
  firstName: string
  lastName: string
  birthDate: Date
  dateOfEmployment: Date | null
  terminationDate: Date | null
  imageUrl: string | null
  hrManagerId: number | null
}

/**
 * Model EmployeeSettings
 */

export type EmployeeSettings = {
  employeeId: number
  slack: boolean
  notificationSettings: NotificationType[]
}

/**
 * Model EmployeeTask
 */

export type EmployeeTask = {
  id: string
  taskId: string
  completed: boolean
  employeeId: number
  responsibleId: number
  dueDate: Date
  completedDate: Date | null
  completedById: number | null
}

/**
 * Model Notification
 */

export type Notification = {
  id: string
  employeeId: number
  createdAt: Date
  read: boolean
  description: string
}

/**
 * Model Phase
 */

export type Phase = {
  id: string
  title: string
  processTemplateId: string
  createdAt: Date
  dueDateDayOffset: number | null
  dueDate: Date | null
  active: boolean
}

/**
 * Model ProcessTemplate
 */

export type ProcessTemplate = {
  id: string
  title: string
  slug: string
}

/**
 * Model Profession
 */

export type Profession = {
  id: string
  title: string
}

/**
 * Model Tag
 */

export type Tag = {
  id: string
  title: string
}

/**
 * Model Task
 */

export type Task = {
  id: string
  title: string
  description: string | null
  link: string | null
  global: boolean
  phaseId: string | null
  responsibleId: number | null
  createdAt: Date
  active: boolean
}


/**
 * Enums
 */

// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

export const NotificationType: {
  DELEGATE: 'DELEGATE',
  DEADLINE: 'DEADLINE',
  WEEK_BEFORE_DEADLINE: 'WEEK_BEFORE_DEADLINE',
  TERMINATION: 'TERMINATION',
  HIRED: 'HIRED'
};

export type NotificationType = (typeof NotificationType)[keyof typeof NotificationType]


/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js (ORM replacement)
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Employees
 * const employees = await prisma.employee.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<T['log']> : never : never,
  GlobalReject = 'rejectOnNotFound' extends keyof T
    ? T['rejectOnNotFound']
    : false
      > {
      /**
       * @private
       */
      private fetcher;
      /**
       * @private
       */
      private readonly dmmf;
      /**
       * @private
       */
      private connectionPromise?;
      /**
       * @private
       */
      private disconnectionPromise?;
      /**
       * @private
       */
      private readonly engineConfig;
      /**
       * @private
       */
      private readonly measurePerformance;

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js (ORM replacement)
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Employees
   * const employees = await prisma.employee.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<T, Prisma.PrismaClientOptions>);
  $on<V extends (U | 'beforeExit')>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : V extends 'beforeExit' ? () => Promise<void> : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<any>;

  /**
   * Add a middleware
   */
  $use(cb: Prisma.Middleware): void

  /**
   * Executes a raw query and returns the number of affected rows
   * @example
   * ```
   * // With parameters use prisma.executeRaw``, values will be escaped automatically
   * const result = await prisma.executeRaw`UPDATE User SET cool = ${true} WHERE id = ${1};`
   * // Or
   * const result = await prisma.executeRaw('UPDATE User SET cool = $1 WHERE id = $2 ;', true, 1)
  * ```
  * 
  * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
  */
  $executeRaw < T = any > (query: string | TemplateStringsArray | Prisma.Sql, ...values: any[]): PrismaPromise<number>;

  /**
   * Performs a raw query and returns the SELECT data
   * @example
   * ```
   * // With parameters use prisma.queryRaw``, values will be escaped automatically
   * const result = await prisma.queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'ema.il'};`
   * // Or
   * const result = await prisma.queryRaw('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'ema.il')
  * ```
  * 
  * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
  */
  $queryRaw < T = any > (query: string | TemplateStringsArray | Prisma.Sql, ...values: any[]): PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends PrismaPromise<any>[]>(arg: [...P]): Promise<UnwrapTuple<P>>

      /**
   * `prisma.employee`: Exposes CRUD operations for the **Employee** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Employees
    * const employees = await prisma.employee.findMany()
    * ```
    */
  get employee(): Prisma.EmployeeDelegate<GlobalReject>;

  /**
   * `prisma.employeeSettings`: Exposes CRUD operations for the **EmployeeSettings** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EmployeeSettings
    * const employeeSettings = await prisma.employeeSettings.findMany()
    * ```
    */
  get employeeSettings(): Prisma.EmployeeSettingsDelegate<GlobalReject>;

  /**
   * `prisma.employeeTask`: Exposes CRUD operations for the **EmployeeTask** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EmployeeTasks
    * const employeeTasks = await prisma.employeeTask.findMany()
    * ```
    */
  get employeeTask(): Prisma.EmployeeTaskDelegate<GlobalReject>;

  /**
   * `prisma.notification`: Exposes CRUD operations for the **Notification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Notifications
    * const notifications = await prisma.notification.findMany()
    * ```
    */
  get notification(): Prisma.NotificationDelegate<GlobalReject>;

  /**
   * `prisma.phase`: Exposes CRUD operations for the **Phase** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Phases
    * const phases = await prisma.phase.findMany()
    * ```
    */
  get phase(): Prisma.PhaseDelegate<GlobalReject>;

  /**
   * `prisma.processTemplate`: Exposes CRUD operations for the **ProcessTemplate** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProcessTemplates
    * const processTemplates = await prisma.processTemplate.findMany()
    * ```
    */
  get processTemplate(): Prisma.ProcessTemplateDelegate<GlobalReject>;

  /**
   * `prisma.profession`: Exposes CRUD operations for the **Profession** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Professions
    * const professions = await prisma.profession.findMany()
    * ```
    */
  get profession(): Prisma.ProfessionDelegate<GlobalReject>;

  /**
   * `prisma.tag`: Exposes CRUD operations for the **Tag** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tags
    * const tags = await prisma.tag.findMany()
    * ```
    */
  get tag(): Prisma.TagDelegate<GlobalReject>;

  /**
   * `prisma.task`: Exposes CRUD operations for the **Task** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tasks
    * const tasks = await prisma.task.findMany()
    * ```
    */
  get task(): Prisma.TaskDelegate<GlobalReject>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  /**
   * Prisma Client JS version: 2.21.2
   * Query Engine version: b8c35d44de987a9691890b3ddf3e2e7effb9bf20
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}
 
  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}
 
  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | null | JsonObject | JsonArray

  /**
   * Same as JsonObject, but allows undefined
   */
  export type InputJsonObject = {[Key in string]?: JsonValue}
 
  export interface InputJsonArray extends Array<JsonValue> {}
 
  export type InputJsonValue = undefined |  string | number | boolean | null | InputJsonObject | InputJsonArray
   type SelectAndInclude = {
    select: any
    include: any
  }
  type HasSelect = {
    select: any
  }
  type HasInclude = {
    include: any
  }
  type CheckSelect<T, S, U> = T extends SelectAndInclude
    ? 'Please either choose `select` or `include`'
    : T extends HasSelect
    ? U
    : T extends HasInclude
    ? U
    : S

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = {
    [key in keyof T]: T[key] extends false | undefined | null ? never : key
  }[keyof T]

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> = (T | U) extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U;


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Buffer
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  export type Union = any

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Exact<A, W = unknown> = 
  W extends unknown ? A extends Narrowable ? Cast<A, W> : Cast<
  {[K in keyof A]: K extends keyof W ? Exact<A[K], W[K]> : never},
  {[K in keyof W]: K extends keyof A ? Exact<A[K], W[K]> : W[K]}>
  : never;

  type Narrowable = string | number | boolean | bigint;

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;

  export function validator<V>(): <S>(select: Exact<S, V>) => S;

  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, 'avg' | 'sum' | 'count' | 'min' | 'max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but with an array
   */
  type PickArray<T, K extends Array<keyof T>> = Prisma__Pick<T, TupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T

  class PrismaClientFetcher {
    private readonly prisma;
    private readonly debug;
    private readonly hooks?;
    constructor(prisma: PrismaClient<any, any>, debug?: boolean, hooks?: Hooks | undefined);
    request<T>(document: any, dataPath?: string[], rootField?: string, typeName?: string, isList?: boolean, callsite?: string): Promise<T>;
    sanitizeMessage(message: string): string;
    protected unpack(document: any, data: any, path: string[], rootField?: string, isList?: boolean): any;
  }

  export const ModelName: {
    Employee: 'Employee',
    EmployeeSettings: 'EmployeeSettings',
    EmployeeTask: 'EmployeeTask',
    Notification: 'Notification',
    Phase: 'Phase',
    ProcessTemplate: 'ProcessTemplate',
    Profession: 'Profession',
    Tag: 'Tag',
    Task: 'Task'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  export type RejectOnNotFound = boolean | ((error: Error) => Error)
  export type RejectPerModel = { [P in ModelName]?: RejectOnNotFound }
  export type RejectPerOperation =  { [P in "findUnique" | "findFirst"]?: RejectPerModel | RejectOnNotFound } 
  type IsReject<T> = T extends true ? True : T extends (err: Error) => Error ? True : False
  export type HasReject<
    GlobalRejectSettings extends Prisma.PrismaClientOptions['rejectOnNotFound'],
    LocalRejectSettings,
    Action extends PrismaAction,
    Model extends ModelName
  > = LocalRejectSettings extends RejectOnNotFound
    ? IsReject<LocalRejectSettings>
    : GlobalRejectSettings extends RejectPerOperation
    ? Action extends keyof GlobalRejectSettings
      ? GlobalRejectSettings[Action] extends boolean
        ? IsReject<GlobalRejectSettings[Action]>
        : GlobalRejectSettings[Action] extends RejectPerModel
        ? Model extends keyof GlobalRejectSettings[Action]
          ? IsReject<GlobalRejectSettings[Action][Model]>
          : False
        : False
      : False
    : IsReject<GlobalRejectSettings>
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

  export interface PrismaClientOptions {
    /**
     * Configure findUnique/findFirst to throw an error if the query returns null. 
     *  * @example
     * ```
     * // Reject on both findUnique/findFirst
     * rejectOnNotFound: true
     * // Reject only on findFirst with a custom error
     * rejectOnNotFound: { findFirst: (err) => new Error("Custom Error")}
     * // Reject on user.findUnique with a custom error
     * rejectOnNotFound: { findUnique: {User: (err) => new Error("User not found")}}
     * ```
     */
    rejectOnNotFound?: RejectOnNotFound | RejectPerOperation
    /**
     * Overwrites the datasource url from your prisma.schema file
     */
    datasources?: Datasources

    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat

    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: Array<LogLevel | LogDefinition>
  }

  export type Hooks = {
    beforeRequest?: (options: { query: string, path: string[], rootField?: string, typeName?: string, document: any }) => any
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findMany'
    | 'findFirst'
    | 'create'
    | 'createMany'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'

  /**
   * These options are being passed in to the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => Promise<T>,
  ) => Promise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined; 
  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model Employee
   */


  export type AggregateEmployee = {
    count: EmployeeCountAggregateOutputType | null
    avg: EmployeeAvgAggregateOutputType | null
    sum: EmployeeSumAggregateOutputType | null
    min: EmployeeMinAggregateOutputType | null
    max: EmployeeMaxAggregateOutputType | null
  }

  export type EmployeeAvgAggregateOutputType = {
    id: number | null
    hrManagerId: number | null
  }

  export type EmployeeSumAggregateOutputType = {
    id: number | null
    hrManagerId: number | null
  }

  export type EmployeeMinAggregateOutputType = {
    id: number | null
    title: string | null
    email: string | null
    professionId: string | null
    firstName: string | null
    lastName: string | null
    birthDate: Date | null
    dateOfEmployment: Date | null
    terminationDate: Date | null
    imageUrl: string | null
    hrManagerId: number | null
  }

  export type EmployeeMaxAggregateOutputType = {
    id: number | null
    title: string | null
    email: string | null
    professionId: string | null
    firstName: string | null
    lastName: string | null
    birthDate: Date | null
    dateOfEmployment: Date | null
    terminationDate: Date | null
    imageUrl: string | null
    hrManagerId: number | null
  }

  export type EmployeeCountAggregateOutputType = {
    id: number
    title: number
    email: number
    professionId: number
    firstName: number
    lastName: number
    birthDate: number
    dateOfEmployment: number
    terminationDate: number
    imageUrl: number
    hrManagerId: number
    _all: number
  }


  export type EmployeeAvgAggregateInputType = {
    id?: true
    hrManagerId?: true
  }

  export type EmployeeSumAggregateInputType = {
    id?: true
    hrManagerId?: true
  }

  export type EmployeeMinAggregateInputType = {
    id?: true
    title?: true
    email?: true
    professionId?: true
    firstName?: true
    lastName?: true
    birthDate?: true
    dateOfEmployment?: true
    terminationDate?: true
    imageUrl?: true
    hrManagerId?: true
  }

  export type EmployeeMaxAggregateInputType = {
    id?: true
    title?: true
    email?: true
    professionId?: true
    firstName?: true
    lastName?: true
    birthDate?: true
    dateOfEmployment?: true
    terminationDate?: true
    imageUrl?: true
    hrManagerId?: true
  }

  export type EmployeeCountAggregateInputType = {
    id?: true
    title?: true
    email?: true
    professionId?: true
    firstName?: true
    lastName?: true
    birthDate?: true
    dateOfEmployment?: true
    terminationDate?: true
    imageUrl?: true
    hrManagerId?: true
    _all?: true
  }

  export type EmployeeAggregateArgs = {
    /**
     * Filter which Employee to aggregate.
    **/
    where?: EmployeeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Employees to fetch.
    **/
    orderBy?: Enumerable<EmployeeOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
    **/
    cursor?: EmployeeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Employees from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Employees.
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Employees
    **/
    count?: true | EmployeeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    avg?: EmployeeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    sum?: EmployeeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    min?: EmployeeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    max?: EmployeeMaxAggregateInputType
  }

  export type GetEmployeeAggregateType<T extends EmployeeAggregateArgs> = {
    [P in keyof T & keyof AggregateEmployee]: P extends 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEmployee[P]>
      : GetScalarType<T[P], AggregateEmployee[P]>
  }


    
    
  export type EmployeeGroupByArgs = {
    where?: EmployeeWhereInput
    orderBy?: Enumerable<EmployeeOrderByInput>
    by: Array<EmployeeScalarFieldEnum>
    having?: EmployeeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    count?: EmployeeCountAggregateInputType | true
    avg?: EmployeeAvgAggregateInputType
    sum?: EmployeeSumAggregateInputType
    min?: EmployeeMinAggregateInputType
    max?: EmployeeMaxAggregateInputType
  }


  export type EmployeeGroupByOutputType = {
    id: number
    title: string | null
    email: string
    professionId: string
    firstName: string
    lastName: string
    birthDate: Date
    dateOfEmployment: Date | null
    terminationDate: Date | null
    imageUrl: string | null
    hrManagerId: number | null
    count: EmployeeCountAggregateOutputType | null
    avg: EmployeeAvgAggregateOutputType | null
    sum: EmployeeSumAggregateOutputType | null
    min: EmployeeMinAggregateOutputType | null
    max: EmployeeMaxAggregateOutputType | null
  }

  type GetEmployeeGroupByPayload<T extends EmployeeGroupByArgs> = Promise<Array<
    PickArray<EmployeeGroupByOutputType, T['by']> & {
      [P in ((keyof T) & (keyof EmployeeGroupByOutputType))]: GetScalarType<T[P], EmployeeGroupByOutputType[P]>
    }
  >>
    

  export type EmployeeSelect = {
    id?: boolean
    title?: boolean
    email?: boolean
    professionId?: boolean
    firstName?: boolean
    lastName?: boolean
    birthDate?: boolean
    dateOfEmployment?: boolean
    terminationDate?: boolean
    imageUrl?: boolean
    hrManagerId?: boolean
    Employee?: boolean | EmployeeArgs
    Profession?: boolean | ProfessionArgs
    other_Employee?: boolean | EmployeeFindManyArgs
    EmployeeSettings?: boolean | EmployeeSettingsArgs
    EmployeeTask_EmployeeToEmployeeTask_completedById?: boolean | EmployeeTaskFindManyArgs
    EmployeeTask_EmployeeToEmployeeTask_employeeId?: boolean | EmployeeTaskFindManyArgs
    EmployeeTask_EmployeeToEmployeeTask_responsibleId?: boolean | EmployeeTaskFindManyArgs
    Notification?: boolean | NotificationFindManyArgs
    Task?: boolean | TaskFindManyArgs
  }

  export type EmployeeInclude = {
    Employee?: boolean | EmployeeArgs
    Profession?: boolean | ProfessionArgs
    other_Employee?: boolean | EmployeeFindManyArgs
    EmployeeSettings?: boolean | EmployeeSettingsArgs
    EmployeeTask_EmployeeToEmployeeTask_completedById?: boolean | EmployeeTaskFindManyArgs
    EmployeeTask_EmployeeToEmployeeTask_employeeId?: boolean | EmployeeTaskFindManyArgs
    EmployeeTask_EmployeeToEmployeeTask_responsibleId?: boolean | EmployeeTaskFindManyArgs
    Notification?: boolean | NotificationFindManyArgs
    Task?: boolean | TaskFindManyArgs
  }

  export type EmployeeGetPayload<
    S extends boolean | null | undefined | EmployeeArgs,
    U = keyof S
      > = S extends true
        ? Employee
    : S extends undefined
    ? never
    : S extends EmployeeArgs | EmployeeFindManyArgs
    ?'include' extends U
    ? Employee  & {
    [P in TrueKeys<S['include']>]: 
          P extends 'Employee'
        ? EmployeeGetPayload<S['include'][P]> | null :
        P extends 'Profession'
        ? ProfessionGetPayload<S['include'][P]> :
        P extends 'other_Employee'
        ? Array < EmployeeGetPayload<S['include'][P]>>  :
        P extends 'EmployeeSettings'
        ? EmployeeSettingsGetPayload<S['include'][P]> | null :
        P extends 'EmployeeTask_EmployeeToEmployeeTask_completedById'
        ? Array < EmployeeTaskGetPayload<S['include'][P]>>  :
        P extends 'EmployeeTask_EmployeeToEmployeeTask_employeeId'
        ? Array < EmployeeTaskGetPayload<S['include'][P]>>  :
        P extends 'EmployeeTask_EmployeeToEmployeeTask_responsibleId'
        ? Array < EmployeeTaskGetPayload<S['include'][P]>>  :
        P extends 'Notification'
        ? Array < NotificationGetPayload<S['include'][P]>>  :
        P extends 'Task'
        ? Array < TaskGetPayload<S['include'][P]>>  : never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof Employee ?Employee [P]
  : 
          P extends 'Employee'
        ? EmployeeGetPayload<S['select'][P]> | null :
        P extends 'Profession'
        ? ProfessionGetPayload<S['select'][P]> :
        P extends 'other_Employee'
        ? Array < EmployeeGetPayload<S['select'][P]>>  :
        P extends 'EmployeeSettings'
        ? EmployeeSettingsGetPayload<S['select'][P]> | null :
        P extends 'EmployeeTask_EmployeeToEmployeeTask_completedById'
        ? Array < EmployeeTaskGetPayload<S['select'][P]>>  :
        P extends 'EmployeeTask_EmployeeToEmployeeTask_employeeId'
        ? Array < EmployeeTaskGetPayload<S['select'][P]>>  :
        P extends 'EmployeeTask_EmployeeToEmployeeTask_responsibleId'
        ? Array < EmployeeTaskGetPayload<S['select'][P]>>  :
        P extends 'Notification'
        ? Array < NotificationGetPayload<S['select'][P]>>  :
        P extends 'Task'
        ? Array < TaskGetPayload<S['select'][P]>>  : never
  } 
    : Employee
  : Employee


  type EmployeeCountArgs = Merge<
    Omit<EmployeeFindManyArgs, 'select' | 'include'> & {
      select?: EmployeeCountAggregateInputType | true
    }
  >

  export interface EmployeeDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Employee that matches the filter.
     * @param {EmployeeFindUniqueArgs} args - Arguments to find a Employee
     * @example
     * // Get one Employee
     * const employee = await prisma.employee.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends EmployeeFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, EmployeeFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Employee'> extends True ? CheckSelect<T, Prisma__EmployeeClient<Employee>, Prisma__EmployeeClient<EmployeeGetPayload<T>>> : CheckSelect<T, Prisma__EmployeeClient<Employee | null >, Prisma__EmployeeClient<EmployeeGetPayload<T> | null >>

    /**
     * Find the first Employee that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeFindFirstArgs} args - Arguments to find a Employee
     * @example
     * // Get one Employee
     * const employee = await prisma.employee.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends EmployeeFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, EmployeeFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Employee'> extends True ? CheckSelect<T, Prisma__EmployeeClient<Employee>, Prisma__EmployeeClient<EmployeeGetPayload<T>>> : CheckSelect<T, Prisma__EmployeeClient<Employee | null >, Prisma__EmployeeClient<EmployeeGetPayload<T> | null >>

    /**
     * Find zero or more Employees that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Employees
     * const employees = await prisma.employee.findMany()
     * 
     * // Get first 10 Employees
     * const employees = await prisma.employee.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const employeeWithIdOnly = await prisma.employee.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends EmployeeFindManyArgs>(
      args?: SelectSubset<T, EmployeeFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Employee>>, PrismaPromise<Array<EmployeeGetPayload<T>>>>

    /**
     * Create a Employee.
     * @param {EmployeeCreateArgs} args - Arguments to create a Employee.
     * @example
     * // Create one Employee
     * const Employee = await prisma.employee.create({
     *   data: {
     *     // ... data to create a Employee
     *   }
     * })
     * 
    **/
    create<T extends EmployeeCreateArgs>(
      args: SelectSubset<T, EmployeeCreateArgs>
    ): CheckSelect<T, Prisma__EmployeeClient<Employee>, Prisma__EmployeeClient<EmployeeGetPayload<T>>>

    /**
     * Create many Employees.
     *     @param {EmployeeCreateManyArgs} args - Arguments to create many Employees.
     *     @example
     *     // Create many Employees
     *     const employee = await prisma.employee.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends EmployeeCreateManyArgs>(
      args?: SelectSubset<T, EmployeeCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Employee.
     * @param {EmployeeDeleteArgs} args - Arguments to delete one Employee.
     * @example
     * // Delete one Employee
     * const Employee = await prisma.employee.delete({
     *   where: {
     *     // ... filter to delete one Employee
     *   }
     * })
     * 
    **/
    delete<T extends EmployeeDeleteArgs>(
      args: SelectSubset<T, EmployeeDeleteArgs>
    ): CheckSelect<T, Prisma__EmployeeClient<Employee>, Prisma__EmployeeClient<EmployeeGetPayload<T>>>

    /**
     * Update one Employee.
     * @param {EmployeeUpdateArgs} args - Arguments to update one Employee.
     * @example
     * // Update one Employee
     * const employee = await prisma.employee.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends EmployeeUpdateArgs>(
      args: SelectSubset<T, EmployeeUpdateArgs>
    ): CheckSelect<T, Prisma__EmployeeClient<Employee>, Prisma__EmployeeClient<EmployeeGetPayload<T>>>

    /**
     * Delete zero or more Employees.
     * @param {EmployeeDeleteManyArgs} args - Arguments to filter Employees to delete.
     * @example
     * // Delete a few Employees
     * const { count } = await prisma.employee.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends EmployeeDeleteManyArgs>(
      args?: SelectSubset<T, EmployeeDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Employees.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Employees
     * const employee = await prisma.employee.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends EmployeeUpdateManyArgs>(
      args: SelectSubset<T, EmployeeUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Employee.
     * @param {EmployeeUpsertArgs} args - Arguments to update or create a Employee.
     * @example
     * // Update or create a Employee
     * const employee = await prisma.employee.upsert({
     *   create: {
     *     // ... data to create a Employee
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Employee we want to update
     *   }
     * })
    **/
    upsert<T extends EmployeeUpsertArgs>(
      args: SelectSubset<T, EmployeeUpsertArgs>
    ): CheckSelect<T, Prisma__EmployeeClient<Employee>, Prisma__EmployeeClient<EmployeeGetPayload<T>>>

    /**
     * Count the number of Employees.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeCountArgs} args - Arguments to filter Employees to count.
     * @example
     * // Count the number of Employees
     * const count = await prisma.employee.count({
     *   where: {
     *     // ... the filter for the Employees we want to count
     *   }
     * })
    **/
    count<T extends EmployeeCountArgs>(
      args?: Subset<T, EmployeeCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EmployeeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Employee.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EmployeeAggregateArgs>(args: Subset<T, EmployeeAggregateArgs>): PrismaPromise<GetEmployeeAggregateType<T>>

    /**
     * Group by Employee.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EmployeeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EmployeeGroupByArgs['orderBy'] }
        : { orderBy?: EmployeeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EmployeeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEmployeeGroupByPayload<T> : Promise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for Employee.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in 
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__EmployeeClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    Employee<T extends EmployeeArgs = {}>(args?: Subset<T, EmployeeArgs>): CheckSelect<T, Prisma__EmployeeClient<Employee | null >, Prisma__EmployeeClient<EmployeeGetPayload<T> | null >>;

    Profession<T extends ProfessionArgs = {}>(args?: Subset<T, ProfessionArgs>): CheckSelect<T, Prisma__ProfessionClient<Profession | null >, Prisma__ProfessionClient<ProfessionGetPayload<T> | null >>;

    other_Employee<T extends EmployeeFindManyArgs = {}>(args?: Subset<T, EmployeeFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Employee>>, PrismaPromise<Array<EmployeeGetPayload<T>>>>;

    EmployeeSettings<T extends EmployeeSettingsArgs = {}>(args?: Subset<T, EmployeeSettingsArgs>): CheckSelect<T, Prisma__EmployeeSettingsClient<EmployeeSettings | null >, Prisma__EmployeeSettingsClient<EmployeeSettingsGetPayload<T> | null >>;

    EmployeeTask_EmployeeToEmployeeTask_completedById<T extends EmployeeTaskFindManyArgs = {}>(args?: Subset<T, EmployeeTaskFindManyArgs>): CheckSelect<T, PrismaPromise<Array<EmployeeTask>>, PrismaPromise<Array<EmployeeTaskGetPayload<T>>>>;

    EmployeeTask_EmployeeToEmployeeTask_employeeId<T extends EmployeeTaskFindManyArgs = {}>(args?: Subset<T, EmployeeTaskFindManyArgs>): CheckSelect<T, PrismaPromise<Array<EmployeeTask>>, PrismaPromise<Array<EmployeeTaskGetPayload<T>>>>;

    EmployeeTask_EmployeeToEmployeeTask_responsibleId<T extends EmployeeTaskFindManyArgs = {}>(args?: Subset<T, EmployeeTaskFindManyArgs>): CheckSelect<T, PrismaPromise<Array<EmployeeTask>>, PrismaPromise<Array<EmployeeTaskGetPayload<T>>>>;

    Notification<T extends NotificationFindManyArgs = {}>(args?: Subset<T, NotificationFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Notification>>, PrismaPromise<Array<NotificationGetPayload<T>>>>;

    Task<T extends TaskFindManyArgs = {}>(args?: Subset<T, TaskFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Task>>, PrismaPromise<Array<TaskGetPayload<T>>>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * Employee findUnique
   */
  export type EmployeeFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the Employee
    **/
    select?: EmployeeSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: EmployeeInclude | null
    /**
     * Throw an Error if a Employee can't be found
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Employee to fetch.
    **/
    where: EmployeeWhereUniqueInput
  }


  /**
   * Employee findFirst
   */
  export type EmployeeFindFirstArgs = {
    /**
     * Select specific fields to fetch from the Employee
    **/
    select?: EmployeeSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: EmployeeInclude | null
    /**
     * Throw an Error if a Employee can't be found
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Employee to fetch.
    **/
    where?: EmployeeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Employees to fetch.
    **/
    orderBy?: Enumerable<EmployeeOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Employees.
    **/
    cursor?: EmployeeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Employees from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Employees.
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Employees.
    **/
    distinct?: Enumerable<EmployeeScalarFieldEnum>
  }


  /**
   * Employee findMany
   */
  export type EmployeeFindManyArgs = {
    /**
     * Select specific fields to fetch from the Employee
    **/
    select?: EmployeeSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: EmployeeInclude | null
    /**
     * Filter, which Employees to fetch.
    **/
    where?: EmployeeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Employees to fetch.
    **/
    orderBy?: Enumerable<EmployeeOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Employees.
    **/
    cursor?: EmployeeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Employees from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Employees.
    **/
    skip?: number
    distinct?: Enumerable<EmployeeScalarFieldEnum>
  }


  /**
   * Employee create
   */
  export type EmployeeCreateArgs = {
    /**
     * Select specific fields to fetch from the Employee
    **/
    select?: EmployeeSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: EmployeeInclude | null
    /**
     * The data needed to create a Employee.
    **/
    data: XOR<EmployeeCreateInput, EmployeeUncheckedCreateInput>
  }


  /**
   * Employee createMany
   */
  export type EmployeeCreateManyArgs = {
    data: Enumerable<EmployeeCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Employee update
   */
  export type EmployeeUpdateArgs = {
    /**
     * Select specific fields to fetch from the Employee
    **/
    select?: EmployeeSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: EmployeeInclude | null
    /**
     * The data needed to update a Employee.
    **/
    data: XOR<EmployeeUpdateInput, EmployeeUncheckedUpdateInput>
    /**
     * Choose, which Employee to update.
    **/
    where: EmployeeWhereUniqueInput
  }


  /**
   * Employee updateMany
   */
  export type EmployeeUpdateManyArgs = {
    data: XOR<EmployeeUpdateManyMutationInput, EmployeeUncheckedUpdateManyInput>
    where?: EmployeeWhereInput
  }


  /**
   * Employee upsert
   */
  export type EmployeeUpsertArgs = {
    /**
     * Select specific fields to fetch from the Employee
    **/
    select?: EmployeeSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: EmployeeInclude | null
    /**
     * The filter to search for the Employee to update in case it exists.
    **/
    where: EmployeeWhereUniqueInput
    /**
     * In case the Employee found by the `where` argument doesn't exist, create a new Employee with this data.
    **/
    create: XOR<EmployeeCreateInput, EmployeeUncheckedCreateInput>
    /**
     * In case the Employee was found with the provided `where` argument, update it with this data.
    **/
    update: XOR<EmployeeUpdateInput, EmployeeUncheckedUpdateInput>
  }


  /**
   * Employee delete
   */
  export type EmployeeDeleteArgs = {
    /**
     * Select specific fields to fetch from the Employee
    **/
    select?: EmployeeSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: EmployeeInclude | null
    /**
     * Filter which Employee to delete.
    **/
    where: EmployeeWhereUniqueInput
  }


  /**
   * Employee deleteMany
   */
  export type EmployeeDeleteManyArgs = {
    where?: EmployeeWhereInput
  }


  /**
   * Employee without action
   */
  export type EmployeeArgs = {
    /**
     * Select specific fields to fetch from the Employee
    **/
    select?: EmployeeSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: EmployeeInclude | null
  }



  /**
   * Model EmployeeSettings
   */


  export type AggregateEmployeeSettings = {
    count: EmployeeSettingsCountAggregateOutputType | null
    avg: EmployeeSettingsAvgAggregateOutputType | null
    sum: EmployeeSettingsSumAggregateOutputType | null
    min: EmployeeSettingsMinAggregateOutputType | null
    max: EmployeeSettingsMaxAggregateOutputType | null
  }

  export type EmployeeSettingsAvgAggregateOutputType = {
    employeeId: number | null
  }

  export type EmployeeSettingsSumAggregateOutputType = {
    employeeId: number | null
  }

  export type EmployeeSettingsMinAggregateOutputType = {
    employeeId: number | null
    slack: boolean | null
  }

  export type EmployeeSettingsMaxAggregateOutputType = {
    employeeId: number | null
    slack: boolean | null
  }

  export type EmployeeSettingsCountAggregateOutputType = {
    employeeId: number
    slack: number
    notificationSettings: number
    _all: number
  }


  export type EmployeeSettingsAvgAggregateInputType = {
    employeeId?: true
  }

  export type EmployeeSettingsSumAggregateInputType = {
    employeeId?: true
  }

  export type EmployeeSettingsMinAggregateInputType = {
    employeeId?: true
    slack?: true
  }

  export type EmployeeSettingsMaxAggregateInputType = {
    employeeId?: true
    slack?: true
  }

  export type EmployeeSettingsCountAggregateInputType = {
    employeeId?: true
    slack?: true
    notificationSettings?: true
    _all?: true
  }

  export type EmployeeSettingsAggregateArgs = {
    /**
     * Filter which EmployeeSettings to aggregate.
    **/
    where?: EmployeeSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmployeeSettings to fetch.
    **/
    orderBy?: Enumerable<EmployeeSettingsOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
    **/
    cursor?: EmployeeSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmployeeSettings from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmployeeSettings.
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EmployeeSettings
    **/
    count?: true | EmployeeSettingsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    avg?: EmployeeSettingsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    sum?: EmployeeSettingsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    min?: EmployeeSettingsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    max?: EmployeeSettingsMaxAggregateInputType
  }

  export type GetEmployeeSettingsAggregateType<T extends EmployeeSettingsAggregateArgs> = {
    [P in keyof T & keyof AggregateEmployeeSettings]: P extends 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEmployeeSettings[P]>
      : GetScalarType<T[P], AggregateEmployeeSettings[P]>
  }


    
    
  export type EmployeeSettingsGroupByArgs = {
    where?: EmployeeSettingsWhereInput
    orderBy?: Enumerable<EmployeeSettingsOrderByInput>
    by: Array<EmployeeSettingsScalarFieldEnum>
    having?: EmployeeSettingsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    count?: EmployeeSettingsCountAggregateInputType | true
    avg?: EmployeeSettingsAvgAggregateInputType
    sum?: EmployeeSettingsSumAggregateInputType
    min?: EmployeeSettingsMinAggregateInputType
    max?: EmployeeSettingsMaxAggregateInputType
  }


  export type EmployeeSettingsGroupByOutputType = {
    employeeId: number
    slack: boolean
    notificationSettings: NotificationType[]
    count: EmployeeSettingsCountAggregateOutputType | null
    avg: EmployeeSettingsAvgAggregateOutputType | null
    sum: EmployeeSettingsSumAggregateOutputType | null
    min: EmployeeSettingsMinAggregateOutputType | null
    max: EmployeeSettingsMaxAggregateOutputType | null
  }

  type GetEmployeeSettingsGroupByPayload<T extends EmployeeSettingsGroupByArgs> = Promise<Array<
    PickArray<EmployeeSettingsGroupByOutputType, T['by']> & {
      [P in ((keyof T) & (keyof EmployeeSettingsGroupByOutputType))]: GetScalarType<T[P], EmployeeSettingsGroupByOutputType[P]>
    }
  >>
    

  export type EmployeeSettingsSelect = {
    employeeId?: boolean
    slack?: boolean
    notificationSettings?: boolean
    Employee?: boolean | EmployeeArgs
  }

  export type EmployeeSettingsInclude = {
    Employee?: boolean | EmployeeArgs
  }

  export type EmployeeSettingsGetPayload<
    S extends boolean | null | undefined | EmployeeSettingsArgs,
    U = keyof S
      > = S extends true
        ? EmployeeSettings
    : S extends undefined
    ? never
    : S extends EmployeeSettingsArgs | EmployeeSettingsFindManyArgs
    ?'include' extends U
    ? EmployeeSettings  & {
    [P in TrueKeys<S['include']>]: 
          P extends 'Employee'
        ? EmployeeGetPayload<S['include'][P]> : never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof EmployeeSettings ?EmployeeSettings [P]
  : 
          P extends 'Employee'
        ? EmployeeGetPayload<S['select'][P]> : never
  } 
    : EmployeeSettings
  : EmployeeSettings


  type EmployeeSettingsCountArgs = Merge<
    Omit<EmployeeSettingsFindManyArgs, 'select' | 'include'> & {
      select?: EmployeeSettingsCountAggregateInputType | true
    }
  >

  export interface EmployeeSettingsDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one EmployeeSettings that matches the filter.
     * @param {EmployeeSettingsFindUniqueArgs} args - Arguments to find a EmployeeSettings
     * @example
     * // Get one EmployeeSettings
     * const employeeSettings = await prisma.employeeSettings.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends EmployeeSettingsFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, EmployeeSettingsFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'EmployeeSettings'> extends True ? CheckSelect<T, Prisma__EmployeeSettingsClient<EmployeeSettings>, Prisma__EmployeeSettingsClient<EmployeeSettingsGetPayload<T>>> : CheckSelect<T, Prisma__EmployeeSettingsClient<EmployeeSettings | null >, Prisma__EmployeeSettingsClient<EmployeeSettingsGetPayload<T> | null >>

    /**
     * Find the first EmployeeSettings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeSettingsFindFirstArgs} args - Arguments to find a EmployeeSettings
     * @example
     * // Get one EmployeeSettings
     * const employeeSettings = await prisma.employeeSettings.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends EmployeeSettingsFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, EmployeeSettingsFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'EmployeeSettings'> extends True ? CheckSelect<T, Prisma__EmployeeSettingsClient<EmployeeSettings>, Prisma__EmployeeSettingsClient<EmployeeSettingsGetPayload<T>>> : CheckSelect<T, Prisma__EmployeeSettingsClient<EmployeeSettings | null >, Prisma__EmployeeSettingsClient<EmployeeSettingsGetPayload<T> | null >>

    /**
     * Find zero or more EmployeeSettings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeSettingsFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EmployeeSettings
     * const employeeSettings = await prisma.employeeSettings.findMany()
     * 
     * // Get first 10 EmployeeSettings
     * const employeeSettings = await prisma.employeeSettings.findMany({ take: 10 })
     * 
     * // Only select the `employeeId`
     * const employeeSettingsWithEmployeeIdOnly = await prisma.employeeSettings.findMany({ select: { employeeId: true } })
     * 
    **/
    findMany<T extends EmployeeSettingsFindManyArgs>(
      args?: SelectSubset<T, EmployeeSettingsFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<EmployeeSettings>>, PrismaPromise<Array<EmployeeSettingsGetPayload<T>>>>

    /**
     * Create a EmployeeSettings.
     * @param {EmployeeSettingsCreateArgs} args - Arguments to create a EmployeeSettings.
     * @example
     * // Create one EmployeeSettings
     * const EmployeeSettings = await prisma.employeeSettings.create({
     *   data: {
     *     // ... data to create a EmployeeSettings
     *   }
     * })
     * 
    **/
    create<T extends EmployeeSettingsCreateArgs>(
      args: SelectSubset<T, EmployeeSettingsCreateArgs>
    ): CheckSelect<T, Prisma__EmployeeSettingsClient<EmployeeSettings>, Prisma__EmployeeSettingsClient<EmployeeSettingsGetPayload<T>>>

    /**
     * Create many EmployeeSettings.
     *     @param {EmployeeSettingsCreateManyArgs} args - Arguments to create many EmployeeSettings.
     *     @example
     *     // Create many EmployeeSettings
     *     const employeeSettings = await prisma.employeeSettings.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends EmployeeSettingsCreateManyArgs>(
      args?: SelectSubset<T, EmployeeSettingsCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a EmployeeSettings.
     * @param {EmployeeSettingsDeleteArgs} args - Arguments to delete one EmployeeSettings.
     * @example
     * // Delete one EmployeeSettings
     * const EmployeeSettings = await prisma.employeeSettings.delete({
     *   where: {
     *     // ... filter to delete one EmployeeSettings
     *   }
     * })
     * 
    **/
    delete<T extends EmployeeSettingsDeleteArgs>(
      args: SelectSubset<T, EmployeeSettingsDeleteArgs>
    ): CheckSelect<T, Prisma__EmployeeSettingsClient<EmployeeSettings>, Prisma__EmployeeSettingsClient<EmployeeSettingsGetPayload<T>>>

    /**
     * Update one EmployeeSettings.
     * @param {EmployeeSettingsUpdateArgs} args - Arguments to update one EmployeeSettings.
     * @example
     * // Update one EmployeeSettings
     * const employeeSettings = await prisma.employeeSettings.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends EmployeeSettingsUpdateArgs>(
      args: SelectSubset<T, EmployeeSettingsUpdateArgs>
    ): CheckSelect<T, Prisma__EmployeeSettingsClient<EmployeeSettings>, Prisma__EmployeeSettingsClient<EmployeeSettingsGetPayload<T>>>

    /**
     * Delete zero or more EmployeeSettings.
     * @param {EmployeeSettingsDeleteManyArgs} args - Arguments to filter EmployeeSettings to delete.
     * @example
     * // Delete a few EmployeeSettings
     * const { count } = await prisma.employeeSettings.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends EmployeeSettingsDeleteManyArgs>(
      args?: SelectSubset<T, EmployeeSettingsDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more EmployeeSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeSettingsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EmployeeSettings
     * const employeeSettings = await prisma.employeeSettings.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends EmployeeSettingsUpdateManyArgs>(
      args: SelectSubset<T, EmployeeSettingsUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one EmployeeSettings.
     * @param {EmployeeSettingsUpsertArgs} args - Arguments to update or create a EmployeeSettings.
     * @example
     * // Update or create a EmployeeSettings
     * const employeeSettings = await prisma.employeeSettings.upsert({
     *   create: {
     *     // ... data to create a EmployeeSettings
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EmployeeSettings we want to update
     *   }
     * })
    **/
    upsert<T extends EmployeeSettingsUpsertArgs>(
      args: SelectSubset<T, EmployeeSettingsUpsertArgs>
    ): CheckSelect<T, Prisma__EmployeeSettingsClient<EmployeeSettings>, Prisma__EmployeeSettingsClient<EmployeeSettingsGetPayload<T>>>

    /**
     * Count the number of EmployeeSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeSettingsCountArgs} args - Arguments to filter EmployeeSettings to count.
     * @example
     * // Count the number of EmployeeSettings
     * const count = await prisma.employeeSettings.count({
     *   where: {
     *     // ... the filter for the EmployeeSettings we want to count
     *   }
     * })
    **/
    count<T extends EmployeeSettingsCountArgs>(
      args?: Subset<T, EmployeeSettingsCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EmployeeSettingsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EmployeeSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeSettingsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EmployeeSettingsAggregateArgs>(args: Subset<T, EmployeeSettingsAggregateArgs>): PrismaPromise<GetEmployeeSettingsAggregateType<T>>

    /**
     * Group by EmployeeSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeSettingsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EmployeeSettingsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EmployeeSettingsGroupByArgs['orderBy'] }
        : { orderBy?: EmployeeSettingsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EmployeeSettingsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEmployeeSettingsGroupByPayload<T> : Promise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for EmployeeSettings.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in 
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__EmployeeSettingsClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    Employee<T extends EmployeeArgs = {}>(args?: Subset<T, EmployeeArgs>): CheckSelect<T, Prisma__EmployeeClient<Employee | null >, Prisma__EmployeeClient<EmployeeGetPayload<T> | null >>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * EmployeeSettings findUnique
   */
  export type EmployeeSettingsFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the EmployeeSettings
    **/
    select?: EmployeeSettingsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: EmployeeSettingsInclude | null
    /**
     * Throw an Error if a EmployeeSettings can't be found
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which EmployeeSettings to fetch.
    **/
    where: EmployeeSettingsWhereUniqueInput
  }


  /**
   * EmployeeSettings findFirst
   */
  export type EmployeeSettingsFindFirstArgs = {
    /**
     * Select specific fields to fetch from the EmployeeSettings
    **/
    select?: EmployeeSettingsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: EmployeeSettingsInclude | null
    /**
     * Throw an Error if a EmployeeSettings can't be found
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which EmployeeSettings to fetch.
    **/
    where?: EmployeeSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmployeeSettings to fetch.
    **/
    orderBy?: Enumerable<EmployeeSettingsOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EmployeeSettings.
    **/
    cursor?: EmployeeSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmployeeSettings from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmployeeSettings.
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmployeeSettings.
    **/
    distinct?: Enumerable<EmployeeSettingsScalarFieldEnum>
  }


  /**
   * EmployeeSettings findMany
   */
  export type EmployeeSettingsFindManyArgs = {
    /**
     * Select specific fields to fetch from the EmployeeSettings
    **/
    select?: EmployeeSettingsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: EmployeeSettingsInclude | null
    /**
     * Filter, which EmployeeSettings to fetch.
    **/
    where?: EmployeeSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmployeeSettings to fetch.
    **/
    orderBy?: Enumerable<EmployeeSettingsOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EmployeeSettings.
    **/
    cursor?: EmployeeSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmployeeSettings from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmployeeSettings.
    **/
    skip?: number
    distinct?: Enumerable<EmployeeSettingsScalarFieldEnum>
  }


  /**
   * EmployeeSettings create
   */
  export type EmployeeSettingsCreateArgs = {
    /**
     * Select specific fields to fetch from the EmployeeSettings
    **/
    select?: EmployeeSettingsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: EmployeeSettingsInclude | null
    /**
     * The data needed to create a EmployeeSettings.
    **/
    data: XOR<EmployeeSettingsCreateInput, EmployeeSettingsUncheckedCreateInput>
  }


  /**
   * EmployeeSettings createMany
   */
  export type EmployeeSettingsCreateManyArgs = {
    data: Enumerable<EmployeeSettingsCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * EmployeeSettings update
   */
  export type EmployeeSettingsUpdateArgs = {
    /**
     * Select specific fields to fetch from the EmployeeSettings
    **/
    select?: EmployeeSettingsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: EmployeeSettingsInclude | null
    /**
     * The data needed to update a EmployeeSettings.
    **/
    data: XOR<EmployeeSettingsUpdateInput, EmployeeSettingsUncheckedUpdateInput>
    /**
     * Choose, which EmployeeSettings to update.
    **/
    where: EmployeeSettingsWhereUniqueInput
  }


  /**
   * EmployeeSettings updateMany
   */
  export type EmployeeSettingsUpdateManyArgs = {
    data: XOR<EmployeeSettingsUpdateManyMutationInput, EmployeeSettingsUncheckedUpdateManyInput>
    where?: EmployeeSettingsWhereInput
  }


  /**
   * EmployeeSettings upsert
   */
  export type EmployeeSettingsUpsertArgs = {
    /**
     * Select specific fields to fetch from the EmployeeSettings
    **/
    select?: EmployeeSettingsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: EmployeeSettingsInclude | null
    /**
     * The filter to search for the EmployeeSettings to update in case it exists.
    **/
    where: EmployeeSettingsWhereUniqueInput
    /**
     * In case the EmployeeSettings found by the `where` argument doesn't exist, create a new EmployeeSettings with this data.
    **/
    create: XOR<EmployeeSettingsCreateInput, EmployeeSettingsUncheckedCreateInput>
    /**
     * In case the EmployeeSettings was found with the provided `where` argument, update it with this data.
    **/
    update: XOR<EmployeeSettingsUpdateInput, EmployeeSettingsUncheckedUpdateInput>
  }


  /**
   * EmployeeSettings delete
   */
  export type EmployeeSettingsDeleteArgs = {
    /**
     * Select specific fields to fetch from the EmployeeSettings
    **/
    select?: EmployeeSettingsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: EmployeeSettingsInclude | null
    /**
     * Filter which EmployeeSettings to delete.
    **/
    where: EmployeeSettingsWhereUniqueInput
  }


  /**
   * EmployeeSettings deleteMany
   */
  export type EmployeeSettingsDeleteManyArgs = {
    where?: EmployeeSettingsWhereInput
  }


  /**
   * EmployeeSettings without action
   */
  export type EmployeeSettingsArgs = {
    /**
     * Select specific fields to fetch from the EmployeeSettings
    **/
    select?: EmployeeSettingsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: EmployeeSettingsInclude | null
  }



  /**
   * Model EmployeeTask
   */


  export type AggregateEmployeeTask = {
    count: EmployeeTaskCountAggregateOutputType | null
    avg: EmployeeTaskAvgAggregateOutputType | null
    sum: EmployeeTaskSumAggregateOutputType | null
    min: EmployeeTaskMinAggregateOutputType | null
    max: EmployeeTaskMaxAggregateOutputType | null
  }

  export type EmployeeTaskAvgAggregateOutputType = {
    employeeId: number | null
    responsibleId: number | null
    completedById: number | null
  }

  export type EmployeeTaskSumAggregateOutputType = {
    employeeId: number | null
    responsibleId: number | null
    completedById: number | null
  }

  export type EmployeeTaskMinAggregateOutputType = {
    id: string | null
    taskId: string | null
    completed: boolean | null
    employeeId: number | null
    responsibleId: number | null
    dueDate: Date | null
    completedDate: Date | null
    completedById: number | null
  }

  export type EmployeeTaskMaxAggregateOutputType = {
    id: string | null
    taskId: string | null
    completed: boolean | null
    employeeId: number | null
    responsibleId: number | null
    dueDate: Date | null
    completedDate: Date | null
    completedById: number | null
  }

  export type EmployeeTaskCountAggregateOutputType = {
    id: number
    taskId: number
    completed: number
    employeeId: number
    responsibleId: number
    dueDate: number
    completedDate: number
    completedById: number
    _all: number
  }


  export type EmployeeTaskAvgAggregateInputType = {
    employeeId?: true
    responsibleId?: true
    completedById?: true
  }

  export type EmployeeTaskSumAggregateInputType = {
    employeeId?: true
    responsibleId?: true
    completedById?: true
  }

  export type EmployeeTaskMinAggregateInputType = {
    id?: true
    taskId?: true
    completed?: true
    employeeId?: true
    responsibleId?: true
    dueDate?: true
    completedDate?: true
    completedById?: true
  }

  export type EmployeeTaskMaxAggregateInputType = {
    id?: true
    taskId?: true
    completed?: true
    employeeId?: true
    responsibleId?: true
    dueDate?: true
    completedDate?: true
    completedById?: true
  }

  export type EmployeeTaskCountAggregateInputType = {
    id?: true
    taskId?: true
    completed?: true
    employeeId?: true
    responsibleId?: true
    dueDate?: true
    completedDate?: true
    completedById?: true
    _all?: true
  }

  export type EmployeeTaskAggregateArgs = {
    /**
     * Filter which EmployeeTask to aggregate.
    **/
    where?: EmployeeTaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmployeeTasks to fetch.
    **/
    orderBy?: Enumerable<EmployeeTaskOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
    **/
    cursor?: EmployeeTaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmployeeTasks from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmployeeTasks.
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EmployeeTasks
    **/
    count?: true | EmployeeTaskCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    avg?: EmployeeTaskAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    sum?: EmployeeTaskSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    min?: EmployeeTaskMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    max?: EmployeeTaskMaxAggregateInputType
  }

  export type GetEmployeeTaskAggregateType<T extends EmployeeTaskAggregateArgs> = {
    [P in keyof T & keyof AggregateEmployeeTask]: P extends 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEmployeeTask[P]>
      : GetScalarType<T[P], AggregateEmployeeTask[P]>
  }


    
    
  export type EmployeeTaskGroupByArgs = {
    where?: EmployeeTaskWhereInput
    orderBy?: Enumerable<EmployeeTaskOrderByInput>
    by: Array<EmployeeTaskScalarFieldEnum>
    having?: EmployeeTaskScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    count?: EmployeeTaskCountAggregateInputType | true
    avg?: EmployeeTaskAvgAggregateInputType
    sum?: EmployeeTaskSumAggregateInputType
    min?: EmployeeTaskMinAggregateInputType
    max?: EmployeeTaskMaxAggregateInputType
  }


  export type EmployeeTaskGroupByOutputType = {
    id: string
    taskId: string
    completed: boolean
    employeeId: number
    responsibleId: number
    dueDate: Date
    completedDate: Date | null
    completedById: number | null
    count: EmployeeTaskCountAggregateOutputType | null
    avg: EmployeeTaskAvgAggregateOutputType | null
    sum: EmployeeTaskSumAggregateOutputType | null
    min: EmployeeTaskMinAggregateOutputType | null
    max: EmployeeTaskMaxAggregateOutputType | null
  }

  type GetEmployeeTaskGroupByPayload<T extends EmployeeTaskGroupByArgs> = Promise<Array<
    PickArray<EmployeeTaskGroupByOutputType, T['by']> & {
      [P in ((keyof T) & (keyof EmployeeTaskGroupByOutputType))]: GetScalarType<T[P], EmployeeTaskGroupByOutputType[P]>
    }
  >>
    

  export type EmployeeTaskSelect = {
    id?: boolean
    taskId?: boolean
    completed?: boolean
    employeeId?: boolean
    responsibleId?: boolean
    dueDate?: boolean
    completedDate?: boolean
    completedById?: boolean
    Employee_EmployeeToEmployeeTask_completedById?: boolean | EmployeeArgs
    Employee_EmployeeToEmployeeTask_employeeId?: boolean | EmployeeArgs
    Employee_EmployeeToEmployeeTask_responsibleId?: boolean | EmployeeArgs
    Task?: boolean | TaskArgs
  }

  export type EmployeeTaskInclude = {
    Employee_EmployeeToEmployeeTask_completedById?: boolean | EmployeeArgs
    Employee_EmployeeToEmployeeTask_employeeId?: boolean | EmployeeArgs
    Employee_EmployeeToEmployeeTask_responsibleId?: boolean | EmployeeArgs
    Task?: boolean | TaskArgs
  }

  export type EmployeeTaskGetPayload<
    S extends boolean | null | undefined | EmployeeTaskArgs,
    U = keyof S
      > = S extends true
        ? EmployeeTask
    : S extends undefined
    ? never
    : S extends EmployeeTaskArgs | EmployeeTaskFindManyArgs
    ?'include' extends U
    ? EmployeeTask  & {
    [P in TrueKeys<S['include']>]: 
          P extends 'Employee_EmployeeToEmployeeTask_completedById'
        ? EmployeeGetPayload<S['include'][P]> | null :
        P extends 'Employee_EmployeeToEmployeeTask_employeeId'
        ? EmployeeGetPayload<S['include'][P]> :
        P extends 'Employee_EmployeeToEmployeeTask_responsibleId'
        ? EmployeeGetPayload<S['include'][P]> :
        P extends 'Task'
        ? TaskGetPayload<S['include'][P]> : never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof EmployeeTask ?EmployeeTask [P]
  : 
          P extends 'Employee_EmployeeToEmployeeTask_completedById'
        ? EmployeeGetPayload<S['select'][P]> | null :
        P extends 'Employee_EmployeeToEmployeeTask_employeeId'
        ? EmployeeGetPayload<S['select'][P]> :
        P extends 'Employee_EmployeeToEmployeeTask_responsibleId'
        ? EmployeeGetPayload<S['select'][P]> :
        P extends 'Task'
        ? TaskGetPayload<S['select'][P]> : never
  } 
    : EmployeeTask
  : EmployeeTask


  type EmployeeTaskCountArgs = Merge<
    Omit<EmployeeTaskFindManyArgs, 'select' | 'include'> & {
      select?: EmployeeTaskCountAggregateInputType | true
    }
  >

  export interface EmployeeTaskDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one EmployeeTask that matches the filter.
     * @param {EmployeeTaskFindUniqueArgs} args - Arguments to find a EmployeeTask
     * @example
     * // Get one EmployeeTask
     * const employeeTask = await prisma.employeeTask.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends EmployeeTaskFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, EmployeeTaskFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'EmployeeTask'> extends True ? CheckSelect<T, Prisma__EmployeeTaskClient<EmployeeTask>, Prisma__EmployeeTaskClient<EmployeeTaskGetPayload<T>>> : CheckSelect<T, Prisma__EmployeeTaskClient<EmployeeTask | null >, Prisma__EmployeeTaskClient<EmployeeTaskGetPayload<T> | null >>

    /**
     * Find the first EmployeeTask that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeTaskFindFirstArgs} args - Arguments to find a EmployeeTask
     * @example
     * // Get one EmployeeTask
     * const employeeTask = await prisma.employeeTask.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends EmployeeTaskFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, EmployeeTaskFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'EmployeeTask'> extends True ? CheckSelect<T, Prisma__EmployeeTaskClient<EmployeeTask>, Prisma__EmployeeTaskClient<EmployeeTaskGetPayload<T>>> : CheckSelect<T, Prisma__EmployeeTaskClient<EmployeeTask | null >, Prisma__EmployeeTaskClient<EmployeeTaskGetPayload<T> | null >>

    /**
     * Find zero or more EmployeeTasks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeTaskFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EmployeeTasks
     * const employeeTasks = await prisma.employeeTask.findMany()
     * 
     * // Get first 10 EmployeeTasks
     * const employeeTasks = await prisma.employeeTask.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const employeeTaskWithIdOnly = await prisma.employeeTask.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends EmployeeTaskFindManyArgs>(
      args?: SelectSubset<T, EmployeeTaskFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<EmployeeTask>>, PrismaPromise<Array<EmployeeTaskGetPayload<T>>>>

    /**
     * Create a EmployeeTask.
     * @param {EmployeeTaskCreateArgs} args - Arguments to create a EmployeeTask.
     * @example
     * // Create one EmployeeTask
     * const EmployeeTask = await prisma.employeeTask.create({
     *   data: {
     *     // ... data to create a EmployeeTask
     *   }
     * })
     * 
    **/
    create<T extends EmployeeTaskCreateArgs>(
      args: SelectSubset<T, EmployeeTaskCreateArgs>
    ): CheckSelect<T, Prisma__EmployeeTaskClient<EmployeeTask>, Prisma__EmployeeTaskClient<EmployeeTaskGetPayload<T>>>

    /**
     * Create many EmployeeTasks.
     *     @param {EmployeeTaskCreateManyArgs} args - Arguments to create many EmployeeTasks.
     *     @example
     *     // Create many EmployeeTasks
     *     const employeeTask = await prisma.employeeTask.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends EmployeeTaskCreateManyArgs>(
      args?: SelectSubset<T, EmployeeTaskCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a EmployeeTask.
     * @param {EmployeeTaskDeleteArgs} args - Arguments to delete one EmployeeTask.
     * @example
     * // Delete one EmployeeTask
     * const EmployeeTask = await prisma.employeeTask.delete({
     *   where: {
     *     // ... filter to delete one EmployeeTask
     *   }
     * })
     * 
    **/
    delete<T extends EmployeeTaskDeleteArgs>(
      args: SelectSubset<T, EmployeeTaskDeleteArgs>
    ): CheckSelect<T, Prisma__EmployeeTaskClient<EmployeeTask>, Prisma__EmployeeTaskClient<EmployeeTaskGetPayload<T>>>

    /**
     * Update one EmployeeTask.
     * @param {EmployeeTaskUpdateArgs} args - Arguments to update one EmployeeTask.
     * @example
     * // Update one EmployeeTask
     * const employeeTask = await prisma.employeeTask.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends EmployeeTaskUpdateArgs>(
      args: SelectSubset<T, EmployeeTaskUpdateArgs>
    ): CheckSelect<T, Prisma__EmployeeTaskClient<EmployeeTask>, Prisma__EmployeeTaskClient<EmployeeTaskGetPayload<T>>>

    /**
     * Delete zero or more EmployeeTasks.
     * @param {EmployeeTaskDeleteManyArgs} args - Arguments to filter EmployeeTasks to delete.
     * @example
     * // Delete a few EmployeeTasks
     * const { count } = await prisma.employeeTask.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends EmployeeTaskDeleteManyArgs>(
      args?: SelectSubset<T, EmployeeTaskDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more EmployeeTasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeTaskUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EmployeeTasks
     * const employeeTask = await prisma.employeeTask.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends EmployeeTaskUpdateManyArgs>(
      args: SelectSubset<T, EmployeeTaskUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one EmployeeTask.
     * @param {EmployeeTaskUpsertArgs} args - Arguments to update or create a EmployeeTask.
     * @example
     * // Update or create a EmployeeTask
     * const employeeTask = await prisma.employeeTask.upsert({
     *   create: {
     *     // ... data to create a EmployeeTask
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EmployeeTask we want to update
     *   }
     * })
    **/
    upsert<T extends EmployeeTaskUpsertArgs>(
      args: SelectSubset<T, EmployeeTaskUpsertArgs>
    ): CheckSelect<T, Prisma__EmployeeTaskClient<EmployeeTask>, Prisma__EmployeeTaskClient<EmployeeTaskGetPayload<T>>>

    /**
     * Count the number of EmployeeTasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeTaskCountArgs} args - Arguments to filter EmployeeTasks to count.
     * @example
     * // Count the number of EmployeeTasks
     * const count = await prisma.employeeTask.count({
     *   where: {
     *     // ... the filter for the EmployeeTasks we want to count
     *   }
     * })
    **/
    count<T extends EmployeeTaskCountArgs>(
      args?: Subset<T, EmployeeTaskCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EmployeeTaskCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EmployeeTask.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeTaskAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EmployeeTaskAggregateArgs>(args: Subset<T, EmployeeTaskAggregateArgs>): PrismaPromise<GetEmployeeTaskAggregateType<T>>

    /**
     * Group by EmployeeTask.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeTaskGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EmployeeTaskGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EmployeeTaskGroupByArgs['orderBy'] }
        : { orderBy?: EmployeeTaskGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EmployeeTaskGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEmployeeTaskGroupByPayload<T> : Promise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for EmployeeTask.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in 
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__EmployeeTaskClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    Employee_EmployeeToEmployeeTask_completedById<T extends EmployeeArgs = {}>(args?: Subset<T, EmployeeArgs>): CheckSelect<T, Prisma__EmployeeClient<Employee | null >, Prisma__EmployeeClient<EmployeeGetPayload<T> | null >>;

    Employee_EmployeeToEmployeeTask_employeeId<T extends EmployeeArgs = {}>(args?: Subset<T, EmployeeArgs>): CheckSelect<T, Prisma__EmployeeClient<Employee | null >, Prisma__EmployeeClient<EmployeeGetPayload<T> | null >>;

    Employee_EmployeeToEmployeeTask_responsibleId<T extends EmployeeArgs = {}>(args?: Subset<T, EmployeeArgs>): CheckSelect<T, Prisma__EmployeeClient<Employee | null >, Prisma__EmployeeClient<EmployeeGetPayload<T> | null >>;

    Task<T extends TaskArgs = {}>(args?: Subset<T, TaskArgs>): CheckSelect<T, Prisma__TaskClient<Task | null >, Prisma__TaskClient<TaskGetPayload<T> | null >>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * EmployeeTask findUnique
   */
  export type EmployeeTaskFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the EmployeeTask
    **/
    select?: EmployeeTaskSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: EmployeeTaskInclude | null
    /**
     * Throw an Error if a EmployeeTask can't be found
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which EmployeeTask to fetch.
    **/
    where: EmployeeTaskWhereUniqueInput
  }


  /**
   * EmployeeTask findFirst
   */
  export type EmployeeTaskFindFirstArgs = {
    /**
     * Select specific fields to fetch from the EmployeeTask
    **/
    select?: EmployeeTaskSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: EmployeeTaskInclude | null
    /**
     * Throw an Error if a EmployeeTask can't be found
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which EmployeeTask to fetch.
    **/
    where?: EmployeeTaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmployeeTasks to fetch.
    **/
    orderBy?: Enumerable<EmployeeTaskOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EmployeeTasks.
    **/
    cursor?: EmployeeTaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmployeeTasks from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmployeeTasks.
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmployeeTasks.
    **/
    distinct?: Enumerable<EmployeeTaskScalarFieldEnum>
  }


  /**
   * EmployeeTask findMany
   */
  export type EmployeeTaskFindManyArgs = {
    /**
     * Select specific fields to fetch from the EmployeeTask
    **/
    select?: EmployeeTaskSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: EmployeeTaskInclude | null
    /**
     * Filter, which EmployeeTasks to fetch.
    **/
    where?: EmployeeTaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmployeeTasks to fetch.
    **/
    orderBy?: Enumerable<EmployeeTaskOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EmployeeTasks.
    **/
    cursor?: EmployeeTaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmployeeTasks from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmployeeTasks.
    **/
    skip?: number
    distinct?: Enumerable<EmployeeTaskScalarFieldEnum>
  }


  /**
   * EmployeeTask create
   */
  export type EmployeeTaskCreateArgs = {
    /**
     * Select specific fields to fetch from the EmployeeTask
    **/
    select?: EmployeeTaskSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: EmployeeTaskInclude | null
    /**
     * The data needed to create a EmployeeTask.
    **/
    data: XOR<EmployeeTaskCreateInput, EmployeeTaskUncheckedCreateInput>
  }


  /**
   * EmployeeTask createMany
   */
  export type EmployeeTaskCreateManyArgs = {
    data: Enumerable<EmployeeTaskCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * EmployeeTask update
   */
  export type EmployeeTaskUpdateArgs = {
    /**
     * Select specific fields to fetch from the EmployeeTask
    **/
    select?: EmployeeTaskSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: EmployeeTaskInclude | null
    /**
     * The data needed to update a EmployeeTask.
    **/
    data: XOR<EmployeeTaskUpdateInput, EmployeeTaskUncheckedUpdateInput>
    /**
     * Choose, which EmployeeTask to update.
    **/
    where: EmployeeTaskWhereUniqueInput
  }


  /**
   * EmployeeTask updateMany
   */
  export type EmployeeTaskUpdateManyArgs = {
    data: XOR<EmployeeTaskUpdateManyMutationInput, EmployeeTaskUncheckedUpdateManyInput>
    where?: EmployeeTaskWhereInput
  }


  /**
   * EmployeeTask upsert
   */
  export type EmployeeTaskUpsertArgs = {
    /**
     * Select specific fields to fetch from the EmployeeTask
    **/
    select?: EmployeeTaskSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: EmployeeTaskInclude | null
    /**
     * The filter to search for the EmployeeTask to update in case it exists.
    **/
    where: EmployeeTaskWhereUniqueInput
    /**
     * In case the EmployeeTask found by the `where` argument doesn't exist, create a new EmployeeTask with this data.
    **/
    create: XOR<EmployeeTaskCreateInput, EmployeeTaskUncheckedCreateInput>
    /**
     * In case the EmployeeTask was found with the provided `where` argument, update it with this data.
    **/
    update: XOR<EmployeeTaskUpdateInput, EmployeeTaskUncheckedUpdateInput>
  }


  /**
   * EmployeeTask delete
   */
  export type EmployeeTaskDeleteArgs = {
    /**
     * Select specific fields to fetch from the EmployeeTask
    **/
    select?: EmployeeTaskSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: EmployeeTaskInclude | null
    /**
     * Filter which EmployeeTask to delete.
    **/
    where: EmployeeTaskWhereUniqueInput
  }


  /**
   * EmployeeTask deleteMany
   */
  export type EmployeeTaskDeleteManyArgs = {
    where?: EmployeeTaskWhereInput
  }


  /**
   * EmployeeTask without action
   */
  export type EmployeeTaskArgs = {
    /**
     * Select specific fields to fetch from the EmployeeTask
    **/
    select?: EmployeeTaskSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: EmployeeTaskInclude | null
  }



  /**
   * Model Notification
   */


  export type AggregateNotification = {
    count: NotificationCountAggregateOutputType | null
    avg: NotificationAvgAggregateOutputType | null
    sum: NotificationSumAggregateOutputType | null
    min: NotificationMinAggregateOutputType | null
    max: NotificationMaxAggregateOutputType | null
  }

  export type NotificationAvgAggregateOutputType = {
    employeeId: number | null
  }

  export type NotificationSumAggregateOutputType = {
    employeeId: number | null
  }

  export type NotificationMinAggregateOutputType = {
    id: string | null
    employeeId: number | null
    createdAt: Date | null
    read: boolean | null
    description: string | null
  }

  export type NotificationMaxAggregateOutputType = {
    id: string | null
    employeeId: number | null
    createdAt: Date | null
    read: boolean | null
    description: string | null
  }

  export type NotificationCountAggregateOutputType = {
    id: number
    employeeId: number
    createdAt: number
    read: number
    description: number
    _all: number
  }


  export type NotificationAvgAggregateInputType = {
    employeeId?: true
  }

  export type NotificationSumAggregateInputType = {
    employeeId?: true
  }

  export type NotificationMinAggregateInputType = {
    id?: true
    employeeId?: true
    createdAt?: true
    read?: true
    description?: true
  }

  export type NotificationMaxAggregateInputType = {
    id?: true
    employeeId?: true
    createdAt?: true
    read?: true
    description?: true
  }

  export type NotificationCountAggregateInputType = {
    id?: true
    employeeId?: true
    createdAt?: true
    read?: true
    description?: true
    _all?: true
  }

  export type NotificationAggregateArgs = {
    /**
     * Filter which Notification to aggregate.
    **/
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
    **/
    orderBy?: Enumerable<NotificationOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
    **/
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Notifications
    **/
    count?: true | NotificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    avg?: NotificationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    sum?: NotificationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    min?: NotificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    max?: NotificationMaxAggregateInputType
  }

  export type GetNotificationAggregateType<T extends NotificationAggregateArgs> = {
    [P in keyof T & keyof AggregateNotification]: P extends 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNotification[P]>
      : GetScalarType<T[P], AggregateNotification[P]>
  }


    
    
  export type NotificationGroupByArgs = {
    where?: NotificationWhereInput
    orderBy?: Enumerable<NotificationOrderByInput>
    by: Array<NotificationScalarFieldEnum>
    having?: NotificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    count?: NotificationCountAggregateInputType | true
    avg?: NotificationAvgAggregateInputType
    sum?: NotificationSumAggregateInputType
    min?: NotificationMinAggregateInputType
    max?: NotificationMaxAggregateInputType
  }


  export type NotificationGroupByOutputType = {
    id: string
    employeeId: number
    createdAt: Date
    read: boolean
    description: string
    count: NotificationCountAggregateOutputType | null
    avg: NotificationAvgAggregateOutputType | null
    sum: NotificationSumAggregateOutputType | null
    min: NotificationMinAggregateOutputType | null
    max: NotificationMaxAggregateOutputType | null
  }

  type GetNotificationGroupByPayload<T extends NotificationGroupByArgs> = Promise<Array<
    PickArray<NotificationGroupByOutputType, T['by']> & {
      [P in ((keyof T) & (keyof NotificationGroupByOutputType))]: GetScalarType<T[P], NotificationGroupByOutputType[P]>
    }
  >>
    

  export type NotificationSelect = {
    id?: boolean
    employeeId?: boolean
    createdAt?: boolean
    read?: boolean
    description?: boolean
    Employee?: boolean | EmployeeArgs
  }

  export type NotificationInclude = {
    Employee?: boolean | EmployeeArgs
  }

  export type NotificationGetPayload<
    S extends boolean | null | undefined | NotificationArgs,
    U = keyof S
      > = S extends true
        ? Notification
    : S extends undefined
    ? never
    : S extends NotificationArgs | NotificationFindManyArgs
    ?'include' extends U
    ? Notification  & {
    [P in TrueKeys<S['include']>]: 
          P extends 'Employee'
        ? EmployeeGetPayload<S['include'][P]> : never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof Notification ?Notification [P]
  : 
          P extends 'Employee'
        ? EmployeeGetPayload<S['select'][P]> : never
  } 
    : Notification
  : Notification


  type NotificationCountArgs = Merge<
    Omit<NotificationFindManyArgs, 'select' | 'include'> & {
      select?: NotificationCountAggregateInputType | true
    }
  >

  export interface NotificationDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Notification that matches the filter.
     * @param {NotificationFindUniqueArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends NotificationFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, NotificationFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Notification'> extends True ? CheckSelect<T, Prisma__NotificationClient<Notification>, Prisma__NotificationClient<NotificationGetPayload<T>>> : CheckSelect<T, Prisma__NotificationClient<Notification | null >, Prisma__NotificationClient<NotificationGetPayload<T> | null >>

    /**
     * Find the first Notification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends NotificationFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, NotificationFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Notification'> extends True ? CheckSelect<T, Prisma__NotificationClient<Notification>, Prisma__NotificationClient<NotificationGetPayload<T>>> : CheckSelect<T, Prisma__NotificationClient<Notification | null >, Prisma__NotificationClient<NotificationGetPayload<T> | null >>

    /**
     * Find zero or more Notifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Notifications
     * const notifications = await prisma.notification.findMany()
     * 
     * // Get first 10 Notifications
     * const notifications = await prisma.notification.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const notificationWithIdOnly = await prisma.notification.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends NotificationFindManyArgs>(
      args?: SelectSubset<T, NotificationFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Notification>>, PrismaPromise<Array<NotificationGetPayload<T>>>>

    /**
     * Create a Notification.
     * @param {NotificationCreateArgs} args - Arguments to create a Notification.
     * @example
     * // Create one Notification
     * const Notification = await prisma.notification.create({
     *   data: {
     *     // ... data to create a Notification
     *   }
     * })
     * 
    **/
    create<T extends NotificationCreateArgs>(
      args: SelectSubset<T, NotificationCreateArgs>
    ): CheckSelect<T, Prisma__NotificationClient<Notification>, Prisma__NotificationClient<NotificationGetPayload<T>>>

    /**
     * Create many Notifications.
     *     @param {NotificationCreateManyArgs} args - Arguments to create many Notifications.
     *     @example
     *     // Create many Notifications
     *     const notification = await prisma.notification.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends NotificationCreateManyArgs>(
      args?: SelectSubset<T, NotificationCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Notification.
     * @param {NotificationDeleteArgs} args - Arguments to delete one Notification.
     * @example
     * // Delete one Notification
     * const Notification = await prisma.notification.delete({
     *   where: {
     *     // ... filter to delete one Notification
     *   }
     * })
     * 
    **/
    delete<T extends NotificationDeleteArgs>(
      args: SelectSubset<T, NotificationDeleteArgs>
    ): CheckSelect<T, Prisma__NotificationClient<Notification>, Prisma__NotificationClient<NotificationGetPayload<T>>>

    /**
     * Update one Notification.
     * @param {NotificationUpdateArgs} args - Arguments to update one Notification.
     * @example
     * // Update one Notification
     * const notification = await prisma.notification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends NotificationUpdateArgs>(
      args: SelectSubset<T, NotificationUpdateArgs>
    ): CheckSelect<T, Prisma__NotificationClient<Notification>, Prisma__NotificationClient<NotificationGetPayload<T>>>

    /**
     * Delete zero or more Notifications.
     * @param {NotificationDeleteManyArgs} args - Arguments to filter Notifications to delete.
     * @example
     * // Delete a few Notifications
     * const { count } = await prisma.notification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends NotificationDeleteManyArgs>(
      args?: SelectSubset<T, NotificationDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Notifications
     * const notification = await prisma.notification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends NotificationUpdateManyArgs>(
      args: SelectSubset<T, NotificationUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Notification.
     * @param {NotificationUpsertArgs} args - Arguments to update or create a Notification.
     * @example
     * // Update or create a Notification
     * const notification = await prisma.notification.upsert({
     *   create: {
     *     // ... data to create a Notification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Notification we want to update
     *   }
     * })
    **/
    upsert<T extends NotificationUpsertArgs>(
      args: SelectSubset<T, NotificationUpsertArgs>
    ): CheckSelect<T, Prisma__NotificationClient<Notification>, Prisma__NotificationClient<NotificationGetPayload<T>>>

    /**
     * Count the number of Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationCountArgs} args - Arguments to filter Notifications to count.
     * @example
     * // Count the number of Notifications
     * const count = await prisma.notification.count({
     *   where: {
     *     // ... the filter for the Notifications we want to count
     *   }
     * })
    **/
    count<T extends NotificationCountArgs>(
      args?: Subset<T, NotificationCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NotificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NotificationAggregateArgs>(args: Subset<T, NotificationAggregateArgs>): PrismaPromise<GetNotificationAggregateType<T>>

    /**
     * Group by Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NotificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NotificationGroupByArgs['orderBy'] }
        : { orderBy?: NotificationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NotificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNotificationGroupByPayload<T> : Promise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for Notification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in 
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__NotificationClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    Employee<T extends EmployeeArgs = {}>(args?: Subset<T, EmployeeArgs>): CheckSelect<T, Prisma__EmployeeClient<Employee | null >, Prisma__EmployeeClient<EmployeeGetPayload<T> | null >>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * Notification findUnique
   */
  export type NotificationFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the Notification
    **/
    select?: NotificationSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: NotificationInclude | null
    /**
     * Throw an Error if a Notification can't be found
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Notification to fetch.
    **/
    where: NotificationWhereUniqueInput
  }


  /**
   * Notification findFirst
   */
  export type NotificationFindFirstArgs = {
    /**
     * Select specific fields to fetch from the Notification
    **/
    select?: NotificationSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: NotificationInclude | null
    /**
     * Throw an Error if a Notification can't be found
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Notification to fetch.
    **/
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
    **/
    orderBy?: Enumerable<NotificationOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
    **/
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
    **/
    distinct?: Enumerable<NotificationScalarFieldEnum>
  }


  /**
   * Notification findMany
   */
  export type NotificationFindManyArgs = {
    /**
     * Select specific fields to fetch from the Notification
    **/
    select?: NotificationSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: NotificationInclude | null
    /**
     * Filter, which Notifications to fetch.
    **/
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
    **/
    orderBy?: Enumerable<NotificationOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Notifications.
    **/
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
    **/
    skip?: number
    distinct?: Enumerable<NotificationScalarFieldEnum>
  }


  /**
   * Notification create
   */
  export type NotificationCreateArgs = {
    /**
     * Select specific fields to fetch from the Notification
    **/
    select?: NotificationSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: NotificationInclude | null
    /**
     * The data needed to create a Notification.
    **/
    data: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
  }


  /**
   * Notification createMany
   */
  export type NotificationCreateManyArgs = {
    data: Enumerable<NotificationCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Notification update
   */
  export type NotificationUpdateArgs = {
    /**
     * Select specific fields to fetch from the Notification
    **/
    select?: NotificationSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: NotificationInclude | null
    /**
     * The data needed to update a Notification.
    **/
    data: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
    /**
     * Choose, which Notification to update.
    **/
    where: NotificationWhereUniqueInput
  }


  /**
   * Notification updateMany
   */
  export type NotificationUpdateManyArgs = {
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyInput>
    where?: NotificationWhereInput
  }


  /**
   * Notification upsert
   */
  export type NotificationUpsertArgs = {
    /**
     * Select specific fields to fetch from the Notification
    **/
    select?: NotificationSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: NotificationInclude | null
    /**
     * The filter to search for the Notification to update in case it exists.
    **/
    where: NotificationWhereUniqueInput
    /**
     * In case the Notification found by the `where` argument doesn't exist, create a new Notification with this data.
    **/
    create: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
    /**
     * In case the Notification was found with the provided `where` argument, update it with this data.
    **/
    update: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
  }


  /**
   * Notification delete
   */
  export type NotificationDeleteArgs = {
    /**
     * Select specific fields to fetch from the Notification
    **/
    select?: NotificationSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: NotificationInclude | null
    /**
     * Filter which Notification to delete.
    **/
    where: NotificationWhereUniqueInput
  }


  /**
   * Notification deleteMany
   */
  export type NotificationDeleteManyArgs = {
    where?: NotificationWhereInput
  }


  /**
   * Notification without action
   */
  export type NotificationArgs = {
    /**
     * Select specific fields to fetch from the Notification
    **/
    select?: NotificationSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: NotificationInclude | null
  }



  /**
   * Model Phase
   */


  export type AggregatePhase = {
    count: PhaseCountAggregateOutputType | null
    avg: PhaseAvgAggregateOutputType | null
    sum: PhaseSumAggregateOutputType | null
    min: PhaseMinAggregateOutputType | null
    max: PhaseMaxAggregateOutputType | null
  }

  export type PhaseAvgAggregateOutputType = {
    dueDateDayOffset: number | null
  }

  export type PhaseSumAggregateOutputType = {
    dueDateDayOffset: number | null
  }

  export type PhaseMinAggregateOutputType = {
    id: string | null
    title: string | null
    processTemplateId: string | null
    createdAt: Date | null
    dueDateDayOffset: number | null
    dueDate: Date | null
    active: boolean | null
  }

  export type PhaseMaxAggregateOutputType = {
    id: string | null
    title: string | null
    processTemplateId: string | null
    createdAt: Date | null
    dueDateDayOffset: number | null
    dueDate: Date | null
    active: boolean | null
  }

  export type PhaseCountAggregateOutputType = {
    id: number
    title: number
    processTemplateId: number
    createdAt: number
    dueDateDayOffset: number
    dueDate: number
    active: number
    _all: number
  }


  export type PhaseAvgAggregateInputType = {
    dueDateDayOffset?: true
  }

  export type PhaseSumAggregateInputType = {
    dueDateDayOffset?: true
  }

  export type PhaseMinAggregateInputType = {
    id?: true
    title?: true
    processTemplateId?: true
    createdAt?: true
    dueDateDayOffset?: true
    dueDate?: true
    active?: true
  }

  export type PhaseMaxAggregateInputType = {
    id?: true
    title?: true
    processTemplateId?: true
    createdAt?: true
    dueDateDayOffset?: true
    dueDate?: true
    active?: true
  }

  export type PhaseCountAggregateInputType = {
    id?: true
    title?: true
    processTemplateId?: true
    createdAt?: true
    dueDateDayOffset?: true
    dueDate?: true
    active?: true
    _all?: true
  }

  export type PhaseAggregateArgs = {
    /**
     * Filter which Phase to aggregate.
    **/
    where?: PhaseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Phases to fetch.
    **/
    orderBy?: Enumerable<PhaseOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
    **/
    cursor?: PhaseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Phases from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Phases.
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Phases
    **/
    count?: true | PhaseCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    avg?: PhaseAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    sum?: PhaseSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    min?: PhaseMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    max?: PhaseMaxAggregateInputType
  }

  export type GetPhaseAggregateType<T extends PhaseAggregateArgs> = {
    [P in keyof T & keyof AggregatePhase]: P extends 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePhase[P]>
      : GetScalarType<T[P], AggregatePhase[P]>
  }


    
    
  export type PhaseGroupByArgs = {
    where?: PhaseWhereInput
    orderBy?: Enumerable<PhaseOrderByInput>
    by: Array<PhaseScalarFieldEnum>
    having?: PhaseScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    count?: PhaseCountAggregateInputType | true
    avg?: PhaseAvgAggregateInputType
    sum?: PhaseSumAggregateInputType
    min?: PhaseMinAggregateInputType
    max?: PhaseMaxAggregateInputType
  }


  export type PhaseGroupByOutputType = {
    id: string
    title: string
    processTemplateId: string
    createdAt: Date
    dueDateDayOffset: number | null
    dueDate: Date | null
    active: boolean
    count: PhaseCountAggregateOutputType | null
    avg: PhaseAvgAggregateOutputType | null
    sum: PhaseSumAggregateOutputType | null
    min: PhaseMinAggregateOutputType | null
    max: PhaseMaxAggregateOutputType | null
  }

  type GetPhaseGroupByPayload<T extends PhaseGroupByArgs> = Promise<Array<
    PickArray<PhaseGroupByOutputType, T['by']> & {
      [P in ((keyof T) & (keyof PhaseGroupByOutputType))]: GetScalarType<T[P], PhaseGroupByOutputType[P]>
    }
  >>
    

  export type PhaseSelect = {
    id?: boolean
    title?: boolean
    processTemplateId?: boolean
    createdAt?: boolean
    dueDateDayOffset?: boolean
    dueDate?: boolean
    active?: boolean
    ProcessTemplate?: boolean | ProcessTemplateArgs
    Task?: boolean | TaskFindManyArgs
  }

  export type PhaseInclude = {
    ProcessTemplate?: boolean | ProcessTemplateArgs
    Task?: boolean | TaskFindManyArgs
  }

  export type PhaseGetPayload<
    S extends boolean | null | undefined | PhaseArgs,
    U = keyof S
      > = S extends true
        ? Phase
    : S extends undefined
    ? never
    : S extends PhaseArgs | PhaseFindManyArgs
    ?'include' extends U
    ? Phase  & {
    [P in TrueKeys<S['include']>]: 
          P extends 'ProcessTemplate'
        ? ProcessTemplateGetPayload<S['include'][P]> :
        P extends 'Task'
        ? Array < TaskGetPayload<S['include'][P]>>  : never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof Phase ?Phase [P]
  : 
          P extends 'ProcessTemplate'
        ? ProcessTemplateGetPayload<S['select'][P]> :
        P extends 'Task'
        ? Array < TaskGetPayload<S['select'][P]>>  : never
  } 
    : Phase
  : Phase


  type PhaseCountArgs = Merge<
    Omit<PhaseFindManyArgs, 'select' | 'include'> & {
      select?: PhaseCountAggregateInputType | true
    }
  >

  export interface PhaseDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Phase that matches the filter.
     * @param {PhaseFindUniqueArgs} args - Arguments to find a Phase
     * @example
     * // Get one Phase
     * const phase = await prisma.phase.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends PhaseFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, PhaseFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Phase'> extends True ? CheckSelect<T, Prisma__PhaseClient<Phase>, Prisma__PhaseClient<PhaseGetPayload<T>>> : CheckSelect<T, Prisma__PhaseClient<Phase | null >, Prisma__PhaseClient<PhaseGetPayload<T> | null >>

    /**
     * Find the first Phase that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PhaseFindFirstArgs} args - Arguments to find a Phase
     * @example
     * // Get one Phase
     * const phase = await prisma.phase.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends PhaseFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, PhaseFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Phase'> extends True ? CheckSelect<T, Prisma__PhaseClient<Phase>, Prisma__PhaseClient<PhaseGetPayload<T>>> : CheckSelect<T, Prisma__PhaseClient<Phase | null >, Prisma__PhaseClient<PhaseGetPayload<T> | null >>

    /**
     * Find zero or more Phases that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PhaseFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Phases
     * const phases = await prisma.phase.findMany()
     * 
     * // Get first 10 Phases
     * const phases = await prisma.phase.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const phaseWithIdOnly = await prisma.phase.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends PhaseFindManyArgs>(
      args?: SelectSubset<T, PhaseFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Phase>>, PrismaPromise<Array<PhaseGetPayload<T>>>>

    /**
     * Create a Phase.
     * @param {PhaseCreateArgs} args - Arguments to create a Phase.
     * @example
     * // Create one Phase
     * const Phase = await prisma.phase.create({
     *   data: {
     *     // ... data to create a Phase
     *   }
     * })
     * 
    **/
    create<T extends PhaseCreateArgs>(
      args: SelectSubset<T, PhaseCreateArgs>
    ): CheckSelect<T, Prisma__PhaseClient<Phase>, Prisma__PhaseClient<PhaseGetPayload<T>>>

    /**
     * Create many Phases.
     *     @param {PhaseCreateManyArgs} args - Arguments to create many Phases.
     *     @example
     *     // Create many Phases
     *     const phase = await prisma.phase.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends PhaseCreateManyArgs>(
      args?: SelectSubset<T, PhaseCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Phase.
     * @param {PhaseDeleteArgs} args - Arguments to delete one Phase.
     * @example
     * // Delete one Phase
     * const Phase = await prisma.phase.delete({
     *   where: {
     *     // ... filter to delete one Phase
     *   }
     * })
     * 
    **/
    delete<T extends PhaseDeleteArgs>(
      args: SelectSubset<T, PhaseDeleteArgs>
    ): CheckSelect<T, Prisma__PhaseClient<Phase>, Prisma__PhaseClient<PhaseGetPayload<T>>>

    /**
     * Update one Phase.
     * @param {PhaseUpdateArgs} args - Arguments to update one Phase.
     * @example
     * // Update one Phase
     * const phase = await prisma.phase.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends PhaseUpdateArgs>(
      args: SelectSubset<T, PhaseUpdateArgs>
    ): CheckSelect<T, Prisma__PhaseClient<Phase>, Prisma__PhaseClient<PhaseGetPayload<T>>>

    /**
     * Delete zero or more Phases.
     * @param {PhaseDeleteManyArgs} args - Arguments to filter Phases to delete.
     * @example
     * // Delete a few Phases
     * const { count } = await prisma.phase.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends PhaseDeleteManyArgs>(
      args?: SelectSubset<T, PhaseDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Phases.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PhaseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Phases
     * const phase = await prisma.phase.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends PhaseUpdateManyArgs>(
      args: SelectSubset<T, PhaseUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Phase.
     * @param {PhaseUpsertArgs} args - Arguments to update or create a Phase.
     * @example
     * // Update or create a Phase
     * const phase = await prisma.phase.upsert({
     *   create: {
     *     // ... data to create a Phase
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Phase we want to update
     *   }
     * })
    **/
    upsert<T extends PhaseUpsertArgs>(
      args: SelectSubset<T, PhaseUpsertArgs>
    ): CheckSelect<T, Prisma__PhaseClient<Phase>, Prisma__PhaseClient<PhaseGetPayload<T>>>

    /**
     * Count the number of Phases.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PhaseCountArgs} args - Arguments to filter Phases to count.
     * @example
     * // Count the number of Phases
     * const count = await prisma.phase.count({
     *   where: {
     *     // ... the filter for the Phases we want to count
     *   }
     * })
    **/
    count<T extends PhaseCountArgs>(
      args?: Subset<T, PhaseCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PhaseCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Phase.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PhaseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PhaseAggregateArgs>(args: Subset<T, PhaseAggregateArgs>): PrismaPromise<GetPhaseAggregateType<T>>

    /**
     * Group by Phase.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PhaseGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PhaseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PhaseGroupByArgs['orderBy'] }
        : { orderBy?: PhaseGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PhaseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPhaseGroupByPayload<T> : Promise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for Phase.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in 
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__PhaseClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    ProcessTemplate<T extends ProcessTemplateArgs = {}>(args?: Subset<T, ProcessTemplateArgs>): CheckSelect<T, Prisma__ProcessTemplateClient<ProcessTemplate | null >, Prisma__ProcessTemplateClient<ProcessTemplateGetPayload<T> | null >>;

    Task<T extends TaskFindManyArgs = {}>(args?: Subset<T, TaskFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Task>>, PrismaPromise<Array<TaskGetPayload<T>>>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * Phase findUnique
   */
  export type PhaseFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the Phase
    **/
    select?: PhaseSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: PhaseInclude | null
    /**
     * Throw an Error if a Phase can't be found
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Phase to fetch.
    **/
    where: PhaseWhereUniqueInput
  }


  /**
   * Phase findFirst
   */
  export type PhaseFindFirstArgs = {
    /**
     * Select specific fields to fetch from the Phase
    **/
    select?: PhaseSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: PhaseInclude | null
    /**
     * Throw an Error if a Phase can't be found
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Phase to fetch.
    **/
    where?: PhaseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Phases to fetch.
    **/
    orderBy?: Enumerable<PhaseOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Phases.
    **/
    cursor?: PhaseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Phases from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Phases.
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Phases.
    **/
    distinct?: Enumerable<PhaseScalarFieldEnum>
  }


  /**
   * Phase findMany
   */
  export type PhaseFindManyArgs = {
    /**
     * Select specific fields to fetch from the Phase
    **/
    select?: PhaseSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: PhaseInclude | null
    /**
     * Filter, which Phases to fetch.
    **/
    where?: PhaseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Phases to fetch.
    **/
    orderBy?: Enumerable<PhaseOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Phases.
    **/
    cursor?: PhaseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Phases from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Phases.
    **/
    skip?: number
    distinct?: Enumerable<PhaseScalarFieldEnum>
  }


  /**
   * Phase create
   */
  export type PhaseCreateArgs = {
    /**
     * Select specific fields to fetch from the Phase
    **/
    select?: PhaseSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: PhaseInclude | null
    /**
     * The data needed to create a Phase.
    **/
    data: XOR<PhaseCreateInput, PhaseUncheckedCreateInput>
  }


  /**
   * Phase createMany
   */
  export type PhaseCreateManyArgs = {
    data: Enumerable<PhaseCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Phase update
   */
  export type PhaseUpdateArgs = {
    /**
     * Select specific fields to fetch from the Phase
    **/
    select?: PhaseSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: PhaseInclude | null
    /**
     * The data needed to update a Phase.
    **/
    data: XOR<PhaseUpdateInput, PhaseUncheckedUpdateInput>
    /**
     * Choose, which Phase to update.
    **/
    where: PhaseWhereUniqueInput
  }


  /**
   * Phase updateMany
   */
  export type PhaseUpdateManyArgs = {
    data: XOR<PhaseUpdateManyMutationInput, PhaseUncheckedUpdateManyInput>
    where?: PhaseWhereInput
  }


  /**
   * Phase upsert
   */
  export type PhaseUpsertArgs = {
    /**
     * Select specific fields to fetch from the Phase
    **/
    select?: PhaseSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: PhaseInclude | null
    /**
     * The filter to search for the Phase to update in case it exists.
    **/
    where: PhaseWhereUniqueInput
    /**
     * In case the Phase found by the `where` argument doesn't exist, create a new Phase with this data.
    **/
    create: XOR<PhaseCreateInput, PhaseUncheckedCreateInput>
    /**
     * In case the Phase was found with the provided `where` argument, update it with this data.
    **/
    update: XOR<PhaseUpdateInput, PhaseUncheckedUpdateInput>
  }


  /**
   * Phase delete
   */
  export type PhaseDeleteArgs = {
    /**
     * Select specific fields to fetch from the Phase
    **/
    select?: PhaseSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: PhaseInclude | null
    /**
     * Filter which Phase to delete.
    **/
    where: PhaseWhereUniqueInput
  }


  /**
   * Phase deleteMany
   */
  export type PhaseDeleteManyArgs = {
    where?: PhaseWhereInput
  }


  /**
   * Phase without action
   */
  export type PhaseArgs = {
    /**
     * Select specific fields to fetch from the Phase
    **/
    select?: PhaseSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: PhaseInclude | null
  }



  /**
   * Model ProcessTemplate
   */


  export type AggregateProcessTemplate = {
    count: ProcessTemplateCountAggregateOutputType | null
    min: ProcessTemplateMinAggregateOutputType | null
    max: ProcessTemplateMaxAggregateOutputType | null
  }

  export type ProcessTemplateMinAggregateOutputType = {
    id: string | null
    title: string | null
    slug: string | null
  }

  export type ProcessTemplateMaxAggregateOutputType = {
    id: string | null
    title: string | null
    slug: string | null
  }

  export type ProcessTemplateCountAggregateOutputType = {
    id: number
    title: number
    slug: number
    _all: number
  }


  export type ProcessTemplateMinAggregateInputType = {
    id?: true
    title?: true
    slug?: true
  }

  export type ProcessTemplateMaxAggregateInputType = {
    id?: true
    title?: true
    slug?: true
  }

  export type ProcessTemplateCountAggregateInputType = {
    id?: true
    title?: true
    slug?: true
    _all?: true
  }

  export type ProcessTemplateAggregateArgs = {
    /**
     * Filter which ProcessTemplate to aggregate.
    **/
    where?: ProcessTemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProcessTemplates to fetch.
    **/
    orderBy?: Enumerable<ProcessTemplateOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
    **/
    cursor?: ProcessTemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProcessTemplates from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProcessTemplates.
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProcessTemplates
    **/
    count?: true | ProcessTemplateCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    min?: ProcessTemplateMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    max?: ProcessTemplateMaxAggregateInputType
  }

  export type GetProcessTemplateAggregateType<T extends ProcessTemplateAggregateArgs> = {
    [P in keyof T & keyof AggregateProcessTemplate]: P extends 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProcessTemplate[P]>
      : GetScalarType<T[P], AggregateProcessTemplate[P]>
  }


    
    
  export type ProcessTemplateGroupByArgs = {
    where?: ProcessTemplateWhereInput
    orderBy?: Enumerable<ProcessTemplateOrderByInput>
    by: Array<ProcessTemplateScalarFieldEnum>
    having?: ProcessTemplateScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    count?: ProcessTemplateCountAggregateInputType | true
    min?: ProcessTemplateMinAggregateInputType
    max?: ProcessTemplateMaxAggregateInputType
  }


  export type ProcessTemplateGroupByOutputType = {
    id: string
    title: string
    slug: string
    count: ProcessTemplateCountAggregateOutputType | null
    min: ProcessTemplateMinAggregateOutputType | null
    max: ProcessTemplateMaxAggregateOutputType | null
  }

  type GetProcessTemplateGroupByPayload<T extends ProcessTemplateGroupByArgs> = Promise<Array<
    PickArray<ProcessTemplateGroupByOutputType, T['by']> & {
      [P in ((keyof T) & (keyof ProcessTemplateGroupByOutputType))]: GetScalarType<T[P], ProcessTemplateGroupByOutputType[P]>
    }
  >>
    

  export type ProcessTemplateSelect = {
    id?: boolean
    title?: boolean
    slug?: boolean
    Phase?: boolean | PhaseFindManyArgs
  }

  export type ProcessTemplateInclude = {
    Phase?: boolean | PhaseFindManyArgs
  }

  export type ProcessTemplateGetPayload<
    S extends boolean | null | undefined | ProcessTemplateArgs,
    U = keyof S
      > = S extends true
        ? ProcessTemplate
    : S extends undefined
    ? never
    : S extends ProcessTemplateArgs | ProcessTemplateFindManyArgs
    ?'include' extends U
    ? ProcessTemplate  & {
    [P in TrueKeys<S['include']>]: 
          P extends 'Phase'
        ? Array < PhaseGetPayload<S['include'][P]>>  : never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof ProcessTemplate ?ProcessTemplate [P]
  : 
          P extends 'Phase'
        ? Array < PhaseGetPayload<S['select'][P]>>  : never
  } 
    : ProcessTemplate
  : ProcessTemplate


  type ProcessTemplateCountArgs = Merge<
    Omit<ProcessTemplateFindManyArgs, 'select' | 'include'> & {
      select?: ProcessTemplateCountAggregateInputType | true
    }
  >

  export interface ProcessTemplateDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one ProcessTemplate that matches the filter.
     * @param {ProcessTemplateFindUniqueArgs} args - Arguments to find a ProcessTemplate
     * @example
     * // Get one ProcessTemplate
     * const processTemplate = await prisma.processTemplate.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ProcessTemplateFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, ProcessTemplateFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'ProcessTemplate'> extends True ? CheckSelect<T, Prisma__ProcessTemplateClient<ProcessTemplate>, Prisma__ProcessTemplateClient<ProcessTemplateGetPayload<T>>> : CheckSelect<T, Prisma__ProcessTemplateClient<ProcessTemplate | null >, Prisma__ProcessTemplateClient<ProcessTemplateGetPayload<T> | null >>

    /**
     * Find the first ProcessTemplate that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcessTemplateFindFirstArgs} args - Arguments to find a ProcessTemplate
     * @example
     * // Get one ProcessTemplate
     * const processTemplate = await prisma.processTemplate.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ProcessTemplateFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, ProcessTemplateFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'ProcessTemplate'> extends True ? CheckSelect<T, Prisma__ProcessTemplateClient<ProcessTemplate>, Prisma__ProcessTemplateClient<ProcessTemplateGetPayload<T>>> : CheckSelect<T, Prisma__ProcessTemplateClient<ProcessTemplate | null >, Prisma__ProcessTemplateClient<ProcessTemplateGetPayload<T> | null >>

    /**
     * Find zero or more ProcessTemplates that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcessTemplateFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProcessTemplates
     * const processTemplates = await prisma.processTemplate.findMany()
     * 
     * // Get first 10 ProcessTemplates
     * const processTemplates = await prisma.processTemplate.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const processTemplateWithIdOnly = await prisma.processTemplate.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends ProcessTemplateFindManyArgs>(
      args?: SelectSubset<T, ProcessTemplateFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<ProcessTemplate>>, PrismaPromise<Array<ProcessTemplateGetPayload<T>>>>

    /**
     * Create a ProcessTemplate.
     * @param {ProcessTemplateCreateArgs} args - Arguments to create a ProcessTemplate.
     * @example
     * // Create one ProcessTemplate
     * const ProcessTemplate = await prisma.processTemplate.create({
     *   data: {
     *     // ... data to create a ProcessTemplate
     *   }
     * })
     * 
    **/
    create<T extends ProcessTemplateCreateArgs>(
      args: SelectSubset<T, ProcessTemplateCreateArgs>
    ): CheckSelect<T, Prisma__ProcessTemplateClient<ProcessTemplate>, Prisma__ProcessTemplateClient<ProcessTemplateGetPayload<T>>>

    /**
     * Create many ProcessTemplates.
     *     @param {ProcessTemplateCreateManyArgs} args - Arguments to create many ProcessTemplates.
     *     @example
     *     // Create many ProcessTemplates
     *     const processTemplate = await prisma.processTemplate.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends ProcessTemplateCreateManyArgs>(
      args?: SelectSubset<T, ProcessTemplateCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a ProcessTemplate.
     * @param {ProcessTemplateDeleteArgs} args - Arguments to delete one ProcessTemplate.
     * @example
     * // Delete one ProcessTemplate
     * const ProcessTemplate = await prisma.processTemplate.delete({
     *   where: {
     *     // ... filter to delete one ProcessTemplate
     *   }
     * })
     * 
    **/
    delete<T extends ProcessTemplateDeleteArgs>(
      args: SelectSubset<T, ProcessTemplateDeleteArgs>
    ): CheckSelect<T, Prisma__ProcessTemplateClient<ProcessTemplate>, Prisma__ProcessTemplateClient<ProcessTemplateGetPayload<T>>>

    /**
     * Update one ProcessTemplate.
     * @param {ProcessTemplateUpdateArgs} args - Arguments to update one ProcessTemplate.
     * @example
     * // Update one ProcessTemplate
     * const processTemplate = await prisma.processTemplate.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ProcessTemplateUpdateArgs>(
      args: SelectSubset<T, ProcessTemplateUpdateArgs>
    ): CheckSelect<T, Prisma__ProcessTemplateClient<ProcessTemplate>, Prisma__ProcessTemplateClient<ProcessTemplateGetPayload<T>>>

    /**
     * Delete zero or more ProcessTemplates.
     * @param {ProcessTemplateDeleteManyArgs} args - Arguments to filter ProcessTemplates to delete.
     * @example
     * // Delete a few ProcessTemplates
     * const { count } = await prisma.processTemplate.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ProcessTemplateDeleteManyArgs>(
      args?: SelectSubset<T, ProcessTemplateDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProcessTemplates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcessTemplateUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProcessTemplates
     * const processTemplate = await prisma.processTemplate.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ProcessTemplateUpdateManyArgs>(
      args: SelectSubset<T, ProcessTemplateUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one ProcessTemplate.
     * @param {ProcessTemplateUpsertArgs} args - Arguments to update or create a ProcessTemplate.
     * @example
     * // Update or create a ProcessTemplate
     * const processTemplate = await prisma.processTemplate.upsert({
     *   create: {
     *     // ... data to create a ProcessTemplate
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProcessTemplate we want to update
     *   }
     * })
    **/
    upsert<T extends ProcessTemplateUpsertArgs>(
      args: SelectSubset<T, ProcessTemplateUpsertArgs>
    ): CheckSelect<T, Prisma__ProcessTemplateClient<ProcessTemplate>, Prisma__ProcessTemplateClient<ProcessTemplateGetPayload<T>>>

    /**
     * Count the number of ProcessTemplates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcessTemplateCountArgs} args - Arguments to filter ProcessTemplates to count.
     * @example
     * // Count the number of ProcessTemplates
     * const count = await prisma.processTemplate.count({
     *   where: {
     *     // ... the filter for the ProcessTemplates we want to count
     *   }
     * })
    **/
    count<T extends ProcessTemplateCountArgs>(
      args?: Subset<T, ProcessTemplateCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProcessTemplateCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProcessTemplate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcessTemplateAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProcessTemplateAggregateArgs>(args: Subset<T, ProcessTemplateAggregateArgs>): PrismaPromise<GetProcessTemplateAggregateType<T>>

    /**
     * Group by ProcessTemplate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcessTemplateGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProcessTemplateGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProcessTemplateGroupByArgs['orderBy'] }
        : { orderBy?: ProcessTemplateGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProcessTemplateGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProcessTemplateGroupByPayload<T> : Promise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProcessTemplate.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in 
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__ProcessTemplateClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    Phase<T extends PhaseFindManyArgs = {}>(args?: Subset<T, PhaseFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Phase>>, PrismaPromise<Array<PhaseGetPayload<T>>>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * ProcessTemplate findUnique
   */
  export type ProcessTemplateFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the ProcessTemplate
    **/
    select?: ProcessTemplateSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: ProcessTemplateInclude | null
    /**
     * Throw an Error if a ProcessTemplate can't be found
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which ProcessTemplate to fetch.
    **/
    where: ProcessTemplateWhereUniqueInput
  }


  /**
   * ProcessTemplate findFirst
   */
  export type ProcessTemplateFindFirstArgs = {
    /**
     * Select specific fields to fetch from the ProcessTemplate
    **/
    select?: ProcessTemplateSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: ProcessTemplateInclude | null
    /**
     * Throw an Error if a ProcessTemplate can't be found
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which ProcessTemplate to fetch.
    **/
    where?: ProcessTemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProcessTemplates to fetch.
    **/
    orderBy?: Enumerable<ProcessTemplateOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProcessTemplates.
    **/
    cursor?: ProcessTemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProcessTemplates from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProcessTemplates.
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProcessTemplates.
    **/
    distinct?: Enumerable<ProcessTemplateScalarFieldEnum>
  }


  /**
   * ProcessTemplate findMany
   */
  export type ProcessTemplateFindManyArgs = {
    /**
     * Select specific fields to fetch from the ProcessTemplate
    **/
    select?: ProcessTemplateSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: ProcessTemplateInclude | null
    /**
     * Filter, which ProcessTemplates to fetch.
    **/
    where?: ProcessTemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProcessTemplates to fetch.
    **/
    orderBy?: Enumerable<ProcessTemplateOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProcessTemplates.
    **/
    cursor?: ProcessTemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProcessTemplates from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProcessTemplates.
    **/
    skip?: number
    distinct?: Enumerable<ProcessTemplateScalarFieldEnum>
  }


  /**
   * ProcessTemplate create
   */
  export type ProcessTemplateCreateArgs = {
    /**
     * Select specific fields to fetch from the ProcessTemplate
    **/
    select?: ProcessTemplateSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: ProcessTemplateInclude | null
    /**
     * The data needed to create a ProcessTemplate.
    **/
    data: XOR<ProcessTemplateCreateInput, ProcessTemplateUncheckedCreateInput>
  }


  /**
   * ProcessTemplate createMany
   */
  export type ProcessTemplateCreateManyArgs = {
    data: Enumerable<ProcessTemplateCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * ProcessTemplate update
   */
  export type ProcessTemplateUpdateArgs = {
    /**
     * Select specific fields to fetch from the ProcessTemplate
    **/
    select?: ProcessTemplateSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: ProcessTemplateInclude | null
    /**
     * The data needed to update a ProcessTemplate.
    **/
    data: XOR<ProcessTemplateUpdateInput, ProcessTemplateUncheckedUpdateInput>
    /**
     * Choose, which ProcessTemplate to update.
    **/
    where: ProcessTemplateWhereUniqueInput
  }


  /**
   * ProcessTemplate updateMany
   */
  export type ProcessTemplateUpdateManyArgs = {
    data: XOR<ProcessTemplateUpdateManyMutationInput, ProcessTemplateUncheckedUpdateManyInput>
    where?: ProcessTemplateWhereInput
  }


  /**
   * ProcessTemplate upsert
   */
  export type ProcessTemplateUpsertArgs = {
    /**
     * Select specific fields to fetch from the ProcessTemplate
    **/
    select?: ProcessTemplateSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: ProcessTemplateInclude | null
    /**
     * The filter to search for the ProcessTemplate to update in case it exists.
    **/
    where: ProcessTemplateWhereUniqueInput
    /**
     * In case the ProcessTemplate found by the `where` argument doesn't exist, create a new ProcessTemplate with this data.
    **/
    create: XOR<ProcessTemplateCreateInput, ProcessTemplateUncheckedCreateInput>
    /**
     * In case the ProcessTemplate was found with the provided `where` argument, update it with this data.
    **/
    update: XOR<ProcessTemplateUpdateInput, ProcessTemplateUncheckedUpdateInput>
  }


  /**
   * ProcessTemplate delete
   */
  export type ProcessTemplateDeleteArgs = {
    /**
     * Select specific fields to fetch from the ProcessTemplate
    **/
    select?: ProcessTemplateSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: ProcessTemplateInclude | null
    /**
     * Filter which ProcessTemplate to delete.
    **/
    where: ProcessTemplateWhereUniqueInput
  }


  /**
   * ProcessTemplate deleteMany
   */
  export type ProcessTemplateDeleteManyArgs = {
    where?: ProcessTemplateWhereInput
  }


  /**
   * ProcessTemplate without action
   */
  export type ProcessTemplateArgs = {
    /**
     * Select specific fields to fetch from the ProcessTemplate
    **/
    select?: ProcessTemplateSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: ProcessTemplateInclude | null
  }



  /**
   * Model Profession
   */


  export type AggregateProfession = {
    count: ProfessionCountAggregateOutputType | null
    min: ProfessionMinAggregateOutputType | null
    max: ProfessionMaxAggregateOutputType | null
  }

  export type ProfessionMinAggregateOutputType = {
    id: string | null
    title: string | null
  }

  export type ProfessionMaxAggregateOutputType = {
    id: string | null
    title: string | null
  }

  export type ProfessionCountAggregateOutputType = {
    id: number
    title: number
    _all: number
  }


  export type ProfessionMinAggregateInputType = {
    id?: true
    title?: true
  }

  export type ProfessionMaxAggregateInputType = {
    id?: true
    title?: true
  }

  export type ProfessionCountAggregateInputType = {
    id?: true
    title?: true
    _all?: true
  }

  export type ProfessionAggregateArgs = {
    /**
     * Filter which Profession to aggregate.
    **/
    where?: ProfessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Professions to fetch.
    **/
    orderBy?: Enumerable<ProfessionOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
    **/
    cursor?: ProfessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Professions from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Professions.
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Professions
    **/
    count?: true | ProfessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    min?: ProfessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    max?: ProfessionMaxAggregateInputType
  }

  export type GetProfessionAggregateType<T extends ProfessionAggregateArgs> = {
    [P in keyof T & keyof AggregateProfession]: P extends 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProfession[P]>
      : GetScalarType<T[P], AggregateProfession[P]>
  }


    
    
  export type ProfessionGroupByArgs = {
    where?: ProfessionWhereInput
    orderBy?: Enumerable<ProfessionOrderByInput>
    by: Array<ProfessionScalarFieldEnum>
    having?: ProfessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    count?: ProfessionCountAggregateInputType | true
    min?: ProfessionMinAggregateInputType
    max?: ProfessionMaxAggregateInputType
  }


  export type ProfessionGroupByOutputType = {
    id: string
    title: string
    count: ProfessionCountAggregateOutputType | null
    min: ProfessionMinAggregateOutputType | null
    max: ProfessionMaxAggregateOutputType | null
  }

  type GetProfessionGroupByPayload<T extends ProfessionGroupByArgs> = Promise<Array<
    PickArray<ProfessionGroupByOutputType, T['by']> & {
      [P in ((keyof T) & (keyof ProfessionGroupByOutputType))]: GetScalarType<T[P], ProfessionGroupByOutputType[P]>
    }
  >>
    

  export type ProfessionSelect = {
    id?: boolean
    title?: boolean
    Employee?: boolean | EmployeeFindManyArgs
    Task?: boolean | TaskFindManyArgs
  }

  export type ProfessionInclude = {
    Employee?: boolean | EmployeeFindManyArgs
    Task?: boolean | TaskFindManyArgs
  }

  export type ProfessionGetPayload<
    S extends boolean | null | undefined | ProfessionArgs,
    U = keyof S
      > = S extends true
        ? Profession
    : S extends undefined
    ? never
    : S extends ProfessionArgs | ProfessionFindManyArgs
    ?'include' extends U
    ? Profession  & {
    [P in TrueKeys<S['include']>]: 
          P extends 'Employee'
        ? Array < EmployeeGetPayload<S['include'][P]>>  :
        P extends 'Task'
        ? Array < TaskGetPayload<S['include'][P]>>  : never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof Profession ?Profession [P]
  : 
          P extends 'Employee'
        ? Array < EmployeeGetPayload<S['select'][P]>>  :
        P extends 'Task'
        ? Array < TaskGetPayload<S['select'][P]>>  : never
  } 
    : Profession
  : Profession


  type ProfessionCountArgs = Merge<
    Omit<ProfessionFindManyArgs, 'select' | 'include'> & {
      select?: ProfessionCountAggregateInputType | true
    }
  >

  export interface ProfessionDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Profession that matches the filter.
     * @param {ProfessionFindUniqueArgs} args - Arguments to find a Profession
     * @example
     * // Get one Profession
     * const profession = await prisma.profession.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ProfessionFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, ProfessionFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Profession'> extends True ? CheckSelect<T, Prisma__ProfessionClient<Profession>, Prisma__ProfessionClient<ProfessionGetPayload<T>>> : CheckSelect<T, Prisma__ProfessionClient<Profession | null >, Prisma__ProfessionClient<ProfessionGetPayload<T> | null >>

    /**
     * Find the first Profession that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionFindFirstArgs} args - Arguments to find a Profession
     * @example
     * // Get one Profession
     * const profession = await prisma.profession.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ProfessionFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, ProfessionFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Profession'> extends True ? CheckSelect<T, Prisma__ProfessionClient<Profession>, Prisma__ProfessionClient<ProfessionGetPayload<T>>> : CheckSelect<T, Prisma__ProfessionClient<Profession | null >, Prisma__ProfessionClient<ProfessionGetPayload<T> | null >>

    /**
     * Find zero or more Professions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Professions
     * const professions = await prisma.profession.findMany()
     * 
     * // Get first 10 Professions
     * const professions = await prisma.profession.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const professionWithIdOnly = await prisma.profession.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends ProfessionFindManyArgs>(
      args?: SelectSubset<T, ProfessionFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Profession>>, PrismaPromise<Array<ProfessionGetPayload<T>>>>

    /**
     * Create a Profession.
     * @param {ProfessionCreateArgs} args - Arguments to create a Profession.
     * @example
     * // Create one Profession
     * const Profession = await prisma.profession.create({
     *   data: {
     *     // ... data to create a Profession
     *   }
     * })
     * 
    **/
    create<T extends ProfessionCreateArgs>(
      args: SelectSubset<T, ProfessionCreateArgs>
    ): CheckSelect<T, Prisma__ProfessionClient<Profession>, Prisma__ProfessionClient<ProfessionGetPayload<T>>>

    /**
     * Create many Professions.
     *     @param {ProfessionCreateManyArgs} args - Arguments to create many Professions.
     *     @example
     *     // Create many Professions
     *     const profession = await prisma.profession.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends ProfessionCreateManyArgs>(
      args?: SelectSubset<T, ProfessionCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Profession.
     * @param {ProfessionDeleteArgs} args - Arguments to delete one Profession.
     * @example
     * // Delete one Profession
     * const Profession = await prisma.profession.delete({
     *   where: {
     *     // ... filter to delete one Profession
     *   }
     * })
     * 
    **/
    delete<T extends ProfessionDeleteArgs>(
      args: SelectSubset<T, ProfessionDeleteArgs>
    ): CheckSelect<T, Prisma__ProfessionClient<Profession>, Prisma__ProfessionClient<ProfessionGetPayload<T>>>

    /**
     * Update one Profession.
     * @param {ProfessionUpdateArgs} args - Arguments to update one Profession.
     * @example
     * // Update one Profession
     * const profession = await prisma.profession.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ProfessionUpdateArgs>(
      args: SelectSubset<T, ProfessionUpdateArgs>
    ): CheckSelect<T, Prisma__ProfessionClient<Profession>, Prisma__ProfessionClient<ProfessionGetPayload<T>>>

    /**
     * Delete zero or more Professions.
     * @param {ProfessionDeleteManyArgs} args - Arguments to filter Professions to delete.
     * @example
     * // Delete a few Professions
     * const { count } = await prisma.profession.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ProfessionDeleteManyArgs>(
      args?: SelectSubset<T, ProfessionDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Professions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Professions
     * const profession = await prisma.profession.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ProfessionUpdateManyArgs>(
      args: SelectSubset<T, ProfessionUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Profession.
     * @param {ProfessionUpsertArgs} args - Arguments to update or create a Profession.
     * @example
     * // Update or create a Profession
     * const profession = await prisma.profession.upsert({
     *   create: {
     *     // ... data to create a Profession
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Profession we want to update
     *   }
     * })
    **/
    upsert<T extends ProfessionUpsertArgs>(
      args: SelectSubset<T, ProfessionUpsertArgs>
    ): CheckSelect<T, Prisma__ProfessionClient<Profession>, Prisma__ProfessionClient<ProfessionGetPayload<T>>>

    /**
     * Count the number of Professions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionCountArgs} args - Arguments to filter Professions to count.
     * @example
     * // Count the number of Professions
     * const count = await prisma.profession.count({
     *   where: {
     *     // ... the filter for the Professions we want to count
     *   }
     * })
    **/
    count<T extends ProfessionCountArgs>(
      args?: Subset<T, ProfessionCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProfessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Profession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProfessionAggregateArgs>(args: Subset<T, ProfessionAggregateArgs>): PrismaPromise<GetProfessionAggregateType<T>>

    /**
     * Group by Profession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProfessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProfessionGroupByArgs['orderBy'] }
        : { orderBy?: ProfessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProfessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProfessionGroupByPayload<T> : Promise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for Profession.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in 
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__ProfessionClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    Employee<T extends EmployeeFindManyArgs = {}>(args?: Subset<T, EmployeeFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Employee>>, PrismaPromise<Array<EmployeeGetPayload<T>>>>;

    Task<T extends TaskFindManyArgs = {}>(args?: Subset<T, TaskFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Task>>, PrismaPromise<Array<TaskGetPayload<T>>>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * Profession findUnique
   */
  export type ProfessionFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the Profession
    **/
    select?: ProfessionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: ProfessionInclude | null
    /**
     * Throw an Error if a Profession can't be found
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Profession to fetch.
    **/
    where: ProfessionWhereUniqueInput
  }


  /**
   * Profession findFirst
   */
  export type ProfessionFindFirstArgs = {
    /**
     * Select specific fields to fetch from the Profession
    **/
    select?: ProfessionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: ProfessionInclude | null
    /**
     * Throw an Error if a Profession can't be found
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Profession to fetch.
    **/
    where?: ProfessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Professions to fetch.
    **/
    orderBy?: Enumerable<ProfessionOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Professions.
    **/
    cursor?: ProfessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Professions from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Professions.
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Professions.
    **/
    distinct?: Enumerable<ProfessionScalarFieldEnum>
  }


  /**
   * Profession findMany
   */
  export type ProfessionFindManyArgs = {
    /**
     * Select specific fields to fetch from the Profession
    **/
    select?: ProfessionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: ProfessionInclude | null
    /**
     * Filter, which Professions to fetch.
    **/
    where?: ProfessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Professions to fetch.
    **/
    orderBy?: Enumerable<ProfessionOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Professions.
    **/
    cursor?: ProfessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Professions from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Professions.
    **/
    skip?: number
    distinct?: Enumerable<ProfessionScalarFieldEnum>
  }


  /**
   * Profession create
   */
  export type ProfessionCreateArgs = {
    /**
     * Select specific fields to fetch from the Profession
    **/
    select?: ProfessionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: ProfessionInclude | null
    /**
     * The data needed to create a Profession.
    **/
    data: XOR<ProfessionCreateInput, ProfessionUncheckedCreateInput>
  }


  /**
   * Profession createMany
   */
  export type ProfessionCreateManyArgs = {
    data: Enumerable<ProfessionCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Profession update
   */
  export type ProfessionUpdateArgs = {
    /**
     * Select specific fields to fetch from the Profession
    **/
    select?: ProfessionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: ProfessionInclude | null
    /**
     * The data needed to update a Profession.
    **/
    data: XOR<ProfessionUpdateInput, ProfessionUncheckedUpdateInput>
    /**
     * Choose, which Profession to update.
    **/
    where: ProfessionWhereUniqueInput
  }


  /**
   * Profession updateMany
   */
  export type ProfessionUpdateManyArgs = {
    data: XOR<ProfessionUpdateManyMutationInput, ProfessionUncheckedUpdateManyInput>
    where?: ProfessionWhereInput
  }


  /**
   * Profession upsert
   */
  export type ProfessionUpsertArgs = {
    /**
     * Select specific fields to fetch from the Profession
    **/
    select?: ProfessionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: ProfessionInclude | null
    /**
     * The filter to search for the Profession to update in case it exists.
    **/
    where: ProfessionWhereUniqueInput
    /**
     * In case the Profession found by the `where` argument doesn't exist, create a new Profession with this data.
    **/
    create: XOR<ProfessionCreateInput, ProfessionUncheckedCreateInput>
    /**
     * In case the Profession was found with the provided `where` argument, update it with this data.
    **/
    update: XOR<ProfessionUpdateInput, ProfessionUncheckedUpdateInput>
  }


  /**
   * Profession delete
   */
  export type ProfessionDeleteArgs = {
    /**
     * Select specific fields to fetch from the Profession
    **/
    select?: ProfessionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: ProfessionInclude | null
    /**
     * Filter which Profession to delete.
    **/
    where: ProfessionWhereUniqueInput
  }


  /**
   * Profession deleteMany
   */
  export type ProfessionDeleteManyArgs = {
    where?: ProfessionWhereInput
  }


  /**
   * Profession without action
   */
  export type ProfessionArgs = {
    /**
     * Select specific fields to fetch from the Profession
    **/
    select?: ProfessionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: ProfessionInclude | null
  }



  /**
   * Model Tag
   */


  export type AggregateTag = {
    count: TagCountAggregateOutputType | null
    min: TagMinAggregateOutputType | null
    max: TagMaxAggregateOutputType | null
  }

  export type TagMinAggregateOutputType = {
    id: string | null
    title: string | null
  }

  export type TagMaxAggregateOutputType = {
    id: string | null
    title: string | null
  }

  export type TagCountAggregateOutputType = {
    id: number
    title: number
    _all: number
  }


  export type TagMinAggregateInputType = {
    id?: true
    title?: true
  }

  export type TagMaxAggregateInputType = {
    id?: true
    title?: true
  }

  export type TagCountAggregateInputType = {
    id?: true
    title?: true
    _all?: true
  }

  export type TagAggregateArgs = {
    /**
     * Filter which Tag to aggregate.
    **/
    where?: TagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tags to fetch.
    **/
    orderBy?: Enumerable<TagOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
    **/
    cursor?: TagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tags from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tags.
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tags
    **/
    count?: true | TagCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    min?: TagMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    max?: TagMaxAggregateInputType
  }

  export type GetTagAggregateType<T extends TagAggregateArgs> = {
    [P in keyof T & keyof AggregateTag]: P extends 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTag[P]>
      : GetScalarType<T[P], AggregateTag[P]>
  }


    
    
  export type TagGroupByArgs = {
    where?: TagWhereInput
    orderBy?: Enumerable<TagOrderByInput>
    by: Array<TagScalarFieldEnum>
    having?: TagScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    count?: TagCountAggregateInputType | true
    min?: TagMinAggregateInputType
    max?: TagMaxAggregateInputType
  }


  export type TagGroupByOutputType = {
    id: string
    title: string
    count: TagCountAggregateOutputType | null
    min: TagMinAggregateOutputType | null
    max: TagMaxAggregateOutputType | null
  }

  type GetTagGroupByPayload<T extends TagGroupByArgs> = Promise<Array<
    PickArray<TagGroupByOutputType, T['by']> & {
      [P in ((keyof T) & (keyof TagGroupByOutputType))]: GetScalarType<T[P], TagGroupByOutputType[P]>
    }
  >>
    

  export type TagSelect = {
    id?: boolean
    title?: boolean
    Task?: boolean | TaskFindManyArgs
  }

  export type TagInclude = {
    Task?: boolean | TaskFindManyArgs
  }

  export type TagGetPayload<
    S extends boolean | null | undefined | TagArgs,
    U = keyof S
      > = S extends true
        ? Tag
    : S extends undefined
    ? never
    : S extends TagArgs | TagFindManyArgs
    ?'include' extends U
    ? Tag  & {
    [P in TrueKeys<S['include']>]: 
          P extends 'Task'
        ? Array < TaskGetPayload<S['include'][P]>>  : never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof Tag ?Tag [P]
  : 
          P extends 'Task'
        ? Array < TaskGetPayload<S['select'][P]>>  : never
  } 
    : Tag
  : Tag


  type TagCountArgs = Merge<
    Omit<TagFindManyArgs, 'select' | 'include'> & {
      select?: TagCountAggregateInputType | true
    }
  >

  export interface TagDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Tag that matches the filter.
     * @param {TagFindUniqueArgs} args - Arguments to find a Tag
     * @example
     * // Get one Tag
     * const tag = await prisma.tag.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends TagFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, TagFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Tag'> extends True ? CheckSelect<T, Prisma__TagClient<Tag>, Prisma__TagClient<TagGetPayload<T>>> : CheckSelect<T, Prisma__TagClient<Tag | null >, Prisma__TagClient<TagGetPayload<T> | null >>

    /**
     * Find the first Tag that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagFindFirstArgs} args - Arguments to find a Tag
     * @example
     * // Get one Tag
     * const tag = await prisma.tag.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends TagFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, TagFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Tag'> extends True ? CheckSelect<T, Prisma__TagClient<Tag>, Prisma__TagClient<TagGetPayload<T>>> : CheckSelect<T, Prisma__TagClient<Tag | null >, Prisma__TagClient<TagGetPayload<T> | null >>

    /**
     * Find zero or more Tags that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tags
     * const tags = await prisma.tag.findMany()
     * 
     * // Get first 10 Tags
     * const tags = await prisma.tag.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tagWithIdOnly = await prisma.tag.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends TagFindManyArgs>(
      args?: SelectSubset<T, TagFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Tag>>, PrismaPromise<Array<TagGetPayload<T>>>>

    /**
     * Create a Tag.
     * @param {TagCreateArgs} args - Arguments to create a Tag.
     * @example
     * // Create one Tag
     * const Tag = await prisma.tag.create({
     *   data: {
     *     // ... data to create a Tag
     *   }
     * })
     * 
    **/
    create<T extends TagCreateArgs>(
      args: SelectSubset<T, TagCreateArgs>
    ): CheckSelect<T, Prisma__TagClient<Tag>, Prisma__TagClient<TagGetPayload<T>>>

    /**
     * Create many Tags.
     *     @param {TagCreateManyArgs} args - Arguments to create many Tags.
     *     @example
     *     // Create many Tags
     *     const tag = await prisma.tag.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends TagCreateManyArgs>(
      args?: SelectSubset<T, TagCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Tag.
     * @param {TagDeleteArgs} args - Arguments to delete one Tag.
     * @example
     * // Delete one Tag
     * const Tag = await prisma.tag.delete({
     *   where: {
     *     // ... filter to delete one Tag
     *   }
     * })
     * 
    **/
    delete<T extends TagDeleteArgs>(
      args: SelectSubset<T, TagDeleteArgs>
    ): CheckSelect<T, Prisma__TagClient<Tag>, Prisma__TagClient<TagGetPayload<T>>>

    /**
     * Update one Tag.
     * @param {TagUpdateArgs} args - Arguments to update one Tag.
     * @example
     * // Update one Tag
     * const tag = await prisma.tag.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends TagUpdateArgs>(
      args: SelectSubset<T, TagUpdateArgs>
    ): CheckSelect<T, Prisma__TagClient<Tag>, Prisma__TagClient<TagGetPayload<T>>>

    /**
     * Delete zero or more Tags.
     * @param {TagDeleteManyArgs} args - Arguments to filter Tags to delete.
     * @example
     * // Delete a few Tags
     * const { count } = await prisma.tag.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends TagDeleteManyArgs>(
      args?: SelectSubset<T, TagDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tags
     * const tag = await prisma.tag.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends TagUpdateManyArgs>(
      args: SelectSubset<T, TagUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Tag.
     * @param {TagUpsertArgs} args - Arguments to update or create a Tag.
     * @example
     * // Update or create a Tag
     * const tag = await prisma.tag.upsert({
     *   create: {
     *     // ... data to create a Tag
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Tag we want to update
     *   }
     * })
    **/
    upsert<T extends TagUpsertArgs>(
      args: SelectSubset<T, TagUpsertArgs>
    ): CheckSelect<T, Prisma__TagClient<Tag>, Prisma__TagClient<TagGetPayload<T>>>

    /**
     * Count the number of Tags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagCountArgs} args - Arguments to filter Tags to count.
     * @example
     * // Count the number of Tags
     * const count = await prisma.tag.count({
     *   where: {
     *     // ... the filter for the Tags we want to count
     *   }
     * })
    **/
    count<T extends TagCountArgs>(
      args?: Subset<T, TagCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TagCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Tag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TagAggregateArgs>(args: Subset<T, TagAggregateArgs>): PrismaPromise<GetTagAggregateType<T>>

    /**
     * Group by Tag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TagGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TagGroupByArgs['orderBy'] }
        : { orderBy?: TagGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TagGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTagGroupByPayload<T> : Promise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for Tag.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in 
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__TagClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    Task<T extends TaskFindManyArgs = {}>(args?: Subset<T, TaskFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Task>>, PrismaPromise<Array<TaskGetPayload<T>>>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * Tag findUnique
   */
  export type TagFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the Tag
    **/
    select?: TagSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: TagInclude | null
    /**
     * Throw an Error if a Tag can't be found
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Tag to fetch.
    **/
    where: TagWhereUniqueInput
  }


  /**
   * Tag findFirst
   */
  export type TagFindFirstArgs = {
    /**
     * Select specific fields to fetch from the Tag
    **/
    select?: TagSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: TagInclude | null
    /**
     * Throw an Error if a Tag can't be found
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Tag to fetch.
    **/
    where?: TagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tags to fetch.
    **/
    orderBy?: Enumerable<TagOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tags.
    **/
    cursor?: TagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tags from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tags.
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tags.
    **/
    distinct?: Enumerable<TagScalarFieldEnum>
  }


  /**
   * Tag findMany
   */
  export type TagFindManyArgs = {
    /**
     * Select specific fields to fetch from the Tag
    **/
    select?: TagSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: TagInclude | null
    /**
     * Filter, which Tags to fetch.
    **/
    where?: TagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tags to fetch.
    **/
    orderBy?: Enumerable<TagOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tags.
    **/
    cursor?: TagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tags from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tags.
    **/
    skip?: number
    distinct?: Enumerable<TagScalarFieldEnum>
  }


  /**
   * Tag create
   */
  export type TagCreateArgs = {
    /**
     * Select specific fields to fetch from the Tag
    **/
    select?: TagSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: TagInclude | null
    /**
     * The data needed to create a Tag.
    **/
    data: XOR<TagCreateInput, TagUncheckedCreateInput>
  }


  /**
   * Tag createMany
   */
  export type TagCreateManyArgs = {
    data: Enumerable<TagCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Tag update
   */
  export type TagUpdateArgs = {
    /**
     * Select specific fields to fetch from the Tag
    **/
    select?: TagSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: TagInclude | null
    /**
     * The data needed to update a Tag.
    **/
    data: XOR<TagUpdateInput, TagUncheckedUpdateInput>
    /**
     * Choose, which Tag to update.
    **/
    where: TagWhereUniqueInput
  }


  /**
   * Tag updateMany
   */
  export type TagUpdateManyArgs = {
    data: XOR<TagUpdateManyMutationInput, TagUncheckedUpdateManyInput>
    where?: TagWhereInput
  }


  /**
   * Tag upsert
   */
  export type TagUpsertArgs = {
    /**
     * Select specific fields to fetch from the Tag
    **/
    select?: TagSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: TagInclude | null
    /**
     * The filter to search for the Tag to update in case it exists.
    **/
    where: TagWhereUniqueInput
    /**
     * In case the Tag found by the `where` argument doesn't exist, create a new Tag with this data.
    **/
    create: XOR<TagCreateInput, TagUncheckedCreateInput>
    /**
     * In case the Tag was found with the provided `where` argument, update it with this data.
    **/
    update: XOR<TagUpdateInput, TagUncheckedUpdateInput>
  }


  /**
   * Tag delete
   */
  export type TagDeleteArgs = {
    /**
     * Select specific fields to fetch from the Tag
    **/
    select?: TagSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: TagInclude | null
    /**
     * Filter which Tag to delete.
    **/
    where: TagWhereUniqueInput
  }


  /**
   * Tag deleteMany
   */
  export type TagDeleteManyArgs = {
    where?: TagWhereInput
  }


  /**
   * Tag without action
   */
  export type TagArgs = {
    /**
     * Select specific fields to fetch from the Tag
    **/
    select?: TagSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: TagInclude | null
  }



  /**
   * Model Task
   */


  export type AggregateTask = {
    count: TaskCountAggregateOutputType | null
    avg: TaskAvgAggregateOutputType | null
    sum: TaskSumAggregateOutputType | null
    min: TaskMinAggregateOutputType | null
    max: TaskMaxAggregateOutputType | null
  }

  export type TaskAvgAggregateOutputType = {
    responsibleId: number | null
  }

  export type TaskSumAggregateOutputType = {
    responsibleId: number | null
  }

  export type TaskMinAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    link: string | null
    global: boolean | null
    phaseId: string | null
    responsibleId: number | null
    createdAt: Date | null
    active: boolean | null
  }

  export type TaskMaxAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    link: string | null
    global: boolean | null
    phaseId: string | null
    responsibleId: number | null
    createdAt: Date | null
    active: boolean | null
  }

  export type TaskCountAggregateOutputType = {
    id: number
    title: number
    description: number
    link: number
    global: number
    phaseId: number
    responsibleId: number
    createdAt: number
    active: number
    _all: number
  }


  export type TaskAvgAggregateInputType = {
    responsibleId?: true
  }

  export type TaskSumAggregateInputType = {
    responsibleId?: true
  }

  export type TaskMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    link?: true
    global?: true
    phaseId?: true
    responsibleId?: true
    createdAt?: true
    active?: true
  }

  export type TaskMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    link?: true
    global?: true
    phaseId?: true
    responsibleId?: true
    createdAt?: true
    active?: true
  }

  export type TaskCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    link?: true
    global?: true
    phaseId?: true
    responsibleId?: true
    createdAt?: true
    active?: true
    _all?: true
  }

  export type TaskAggregateArgs = {
    /**
     * Filter which Task to aggregate.
    **/
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
    **/
    orderBy?: Enumerable<TaskOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
    **/
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tasks
    **/
    count?: true | TaskCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    avg?: TaskAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    sum?: TaskSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    min?: TaskMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    max?: TaskMaxAggregateInputType
  }

  export type GetTaskAggregateType<T extends TaskAggregateArgs> = {
    [P in keyof T & keyof AggregateTask]: P extends 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTask[P]>
      : GetScalarType<T[P], AggregateTask[P]>
  }


    
    
  export type TaskGroupByArgs = {
    where?: TaskWhereInput
    orderBy?: Enumerable<TaskOrderByInput>
    by: Array<TaskScalarFieldEnum>
    having?: TaskScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    count?: TaskCountAggregateInputType | true
    avg?: TaskAvgAggregateInputType
    sum?: TaskSumAggregateInputType
    min?: TaskMinAggregateInputType
    max?: TaskMaxAggregateInputType
  }


  export type TaskGroupByOutputType = {
    id: string
    title: string
    description: string | null
    link: string | null
    global: boolean
    phaseId: string | null
    responsibleId: number | null
    createdAt: Date
    active: boolean
    count: TaskCountAggregateOutputType | null
    avg: TaskAvgAggregateOutputType | null
    sum: TaskSumAggregateOutputType | null
    min: TaskMinAggregateOutputType | null
    max: TaskMaxAggregateOutputType | null
  }

  type GetTaskGroupByPayload<T extends TaskGroupByArgs> = Promise<Array<
    PickArray<TaskGroupByOutputType, T['by']> & {
      [P in ((keyof T) & (keyof TaskGroupByOutputType))]: GetScalarType<T[P], TaskGroupByOutputType[P]>
    }
  >>
    

  export type TaskSelect = {
    id?: boolean
    title?: boolean
    description?: boolean
    link?: boolean
    global?: boolean
    phaseId?: boolean
    responsibleId?: boolean
    createdAt?: boolean
    active?: boolean
    Phase?: boolean | PhaseArgs
    Employee?: boolean | EmployeeArgs
    EmployeeTask?: boolean | EmployeeTaskFindManyArgs
    Profession?: boolean | ProfessionFindManyArgs
    Tag?: boolean | TagFindManyArgs
  }

  export type TaskInclude = {
    Phase?: boolean | PhaseArgs
    Employee?: boolean | EmployeeArgs
    EmployeeTask?: boolean | EmployeeTaskFindManyArgs
    Profession?: boolean | ProfessionFindManyArgs
    Tag?: boolean | TagFindManyArgs
  }

  export type TaskGetPayload<
    S extends boolean | null | undefined | TaskArgs,
    U = keyof S
      > = S extends true
        ? Task
    : S extends undefined
    ? never
    : S extends TaskArgs | TaskFindManyArgs
    ?'include' extends U
    ? Task  & {
    [P in TrueKeys<S['include']>]: 
          P extends 'Phase'
        ? PhaseGetPayload<S['include'][P]> | null :
        P extends 'Employee'
        ? EmployeeGetPayload<S['include'][P]> | null :
        P extends 'EmployeeTask'
        ? Array < EmployeeTaskGetPayload<S['include'][P]>>  :
        P extends 'Profession'
        ? Array < ProfessionGetPayload<S['include'][P]>>  :
        P extends 'Tag'
        ? Array < TagGetPayload<S['include'][P]>>  : never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof Task ?Task [P]
  : 
          P extends 'Phase'
        ? PhaseGetPayload<S['select'][P]> | null :
        P extends 'Employee'
        ? EmployeeGetPayload<S['select'][P]> | null :
        P extends 'EmployeeTask'
        ? Array < EmployeeTaskGetPayload<S['select'][P]>>  :
        P extends 'Profession'
        ? Array < ProfessionGetPayload<S['select'][P]>>  :
        P extends 'Tag'
        ? Array < TagGetPayload<S['select'][P]>>  : never
  } 
    : Task
  : Task


  type TaskCountArgs = Merge<
    Omit<TaskFindManyArgs, 'select' | 'include'> & {
      select?: TaskCountAggregateInputType | true
    }
  >

  export interface TaskDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Task that matches the filter.
     * @param {TaskFindUniqueArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends TaskFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, TaskFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Task'> extends True ? CheckSelect<T, Prisma__TaskClient<Task>, Prisma__TaskClient<TaskGetPayload<T>>> : CheckSelect<T, Prisma__TaskClient<Task | null >, Prisma__TaskClient<TaskGetPayload<T> | null >>

    /**
     * Find the first Task that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskFindFirstArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends TaskFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, TaskFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Task'> extends True ? CheckSelect<T, Prisma__TaskClient<Task>, Prisma__TaskClient<TaskGetPayload<T>>> : CheckSelect<T, Prisma__TaskClient<Task | null >, Prisma__TaskClient<TaskGetPayload<T> | null >>

    /**
     * Find zero or more Tasks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tasks
     * const tasks = await prisma.task.findMany()
     * 
     * // Get first 10 Tasks
     * const tasks = await prisma.task.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const taskWithIdOnly = await prisma.task.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends TaskFindManyArgs>(
      args?: SelectSubset<T, TaskFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Task>>, PrismaPromise<Array<TaskGetPayload<T>>>>

    /**
     * Create a Task.
     * @param {TaskCreateArgs} args - Arguments to create a Task.
     * @example
     * // Create one Task
     * const Task = await prisma.task.create({
     *   data: {
     *     // ... data to create a Task
     *   }
     * })
     * 
    **/
    create<T extends TaskCreateArgs>(
      args: SelectSubset<T, TaskCreateArgs>
    ): CheckSelect<T, Prisma__TaskClient<Task>, Prisma__TaskClient<TaskGetPayload<T>>>

    /**
     * Create many Tasks.
     *     @param {TaskCreateManyArgs} args - Arguments to create many Tasks.
     *     @example
     *     // Create many Tasks
     *     const task = await prisma.task.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends TaskCreateManyArgs>(
      args?: SelectSubset<T, TaskCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Task.
     * @param {TaskDeleteArgs} args - Arguments to delete one Task.
     * @example
     * // Delete one Task
     * const Task = await prisma.task.delete({
     *   where: {
     *     // ... filter to delete one Task
     *   }
     * })
     * 
    **/
    delete<T extends TaskDeleteArgs>(
      args: SelectSubset<T, TaskDeleteArgs>
    ): CheckSelect<T, Prisma__TaskClient<Task>, Prisma__TaskClient<TaskGetPayload<T>>>

    /**
     * Update one Task.
     * @param {TaskUpdateArgs} args - Arguments to update one Task.
     * @example
     * // Update one Task
     * const task = await prisma.task.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends TaskUpdateArgs>(
      args: SelectSubset<T, TaskUpdateArgs>
    ): CheckSelect<T, Prisma__TaskClient<Task>, Prisma__TaskClient<TaskGetPayload<T>>>

    /**
     * Delete zero or more Tasks.
     * @param {TaskDeleteManyArgs} args - Arguments to filter Tasks to delete.
     * @example
     * // Delete a few Tasks
     * const { count } = await prisma.task.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends TaskDeleteManyArgs>(
      args?: SelectSubset<T, TaskDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tasks
     * const task = await prisma.task.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends TaskUpdateManyArgs>(
      args: SelectSubset<T, TaskUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Task.
     * @param {TaskUpsertArgs} args - Arguments to update or create a Task.
     * @example
     * // Update or create a Task
     * const task = await prisma.task.upsert({
     *   create: {
     *     // ... data to create a Task
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Task we want to update
     *   }
     * })
    **/
    upsert<T extends TaskUpsertArgs>(
      args: SelectSubset<T, TaskUpsertArgs>
    ): CheckSelect<T, Prisma__TaskClient<Task>, Prisma__TaskClient<TaskGetPayload<T>>>

    /**
     * Count the number of Tasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskCountArgs} args - Arguments to filter Tasks to count.
     * @example
     * // Count the number of Tasks
     * const count = await prisma.task.count({
     *   where: {
     *     // ... the filter for the Tasks we want to count
     *   }
     * })
    **/
    count<T extends TaskCountArgs>(
      args?: Subset<T, TaskCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TaskCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Task.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TaskAggregateArgs>(args: Subset<T, TaskAggregateArgs>): PrismaPromise<GetTaskAggregateType<T>>

    /**
     * Group by Task.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TaskGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TaskGroupByArgs['orderBy'] }
        : { orderBy?: TaskGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TaskGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTaskGroupByPayload<T> : Promise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for Task.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in 
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__TaskClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    Phase<T extends PhaseArgs = {}>(args?: Subset<T, PhaseArgs>): CheckSelect<T, Prisma__PhaseClient<Phase | null >, Prisma__PhaseClient<PhaseGetPayload<T> | null >>;

    Employee<T extends EmployeeArgs = {}>(args?: Subset<T, EmployeeArgs>): CheckSelect<T, Prisma__EmployeeClient<Employee | null >, Prisma__EmployeeClient<EmployeeGetPayload<T> | null >>;

    EmployeeTask<T extends EmployeeTaskFindManyArgs = {}>(args?: Subset<T, EmployeeTaskFindManyArgs>): CheckSelect<T, PrismaPromise<Array<EmployeeTask>>, PrismaPromise<Array<EmployeeTaskGetPayload<T>>>>;

    Profession<T extends ProfessionFindManyArgs = {}>(args?: Subset<T, ProfessionFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Profession>>, PrismaPromise<Array<ProfessionGetPayload<T>>>>;

    Tag<T extends TagFindManyArgs = {}>(args?: Subset<T, TagFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Tag>>, PrismaPromise<Array<TagGetPayload<T>>>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * Task findUnique
   */
  export type TaskFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the Task
    **/
    select?: TaskSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: TaskInclude | null
    /**
     * Throw an Error if a Task can't be found
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Task to fetch.
    **/
    where: TaskWhereUniqueInput
  }


  /**
   * Task findFirst
   */
  export type TaskFindFirstArgs = {
    /**
     * Select specific fields to fetch from the Task
    **/
    select?: TaskSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: TaskInclude | null
    /**
     * Throw an Error if a Task can't be found
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Task to fetch.
    **/
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
    **/
    orderBy?: Enumerable<TaskOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tasks.
    **/
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tasks.
    **/
    distinct?: Enumerable<TaskScalarFieldEnum>
  }


  /**
   * Task findMany
   */
  export type TaskFindManyArgs = {
    /**
     * Select specific fields to fetch from the Task
    **/
    select?: TaskSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: TaskInclude | null
    /**
     * Filter, which Tasks to fetch.
    **/
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
    **/
    orderBy?: Enumerable<TaskOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tasks.
    **/
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
    **/
    skip?: number
    distinct?: Enumerable<TaskScalarFieldEnum>
  }


  /**
   * Task create
   */
  export type TaskCreateArgs = {
    /**
     * Select specific fields to fetch from the Task
    **/
    select?: TaskSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: TaskInclude | null
    /**
     * The data needed to create a Task.
    **/
    data: XOR<TaskCreateInput, TaskUncheckedCreateInput>
  }


  /**
   * Task createMany
   */
  export type TaskCreateManyArgs = {
    data: Enumerable<TaskCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Task update
   */
  export type TaskUpdateArgs = {
    /**
     * Select specific fields to fetch from the Task
    **/
    select?: TaskSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: TaskInclude | null
    /**
     * The data needed to update a Task.
    **/
    data: XOR<TaskUpdateInput, TaskUncheckedUpdateInput>
    /**
     * Choose, which Task to update.
    **/
    where: TaskWhereUniqueInput
  }


  /**
   * Task updateMany
   */
  export type TaskUpdateManyArgs = {
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyInput>
    where?: TaskWhereInput
  }


  /**
   * Task upsert
   */
  export type TaskUpsertArgs = {
    /**
     * Select specific fields to fetch from the Task
    **/
    select?: TaskSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: TaskInclude | null
    /**
     * The filter to search for the Task to update in case it exists.
    **/
    where: TaskWhereUniqueInput
    /**
     * In case the Task found by the `where` argument doesn't exist, create a new Task with this data.
    **/
    create: XOR<TaskCreateInput, TaskUncheckedCreateInput>
    /**
     * In case the Task was found with the provided `where` argument, update it with this data.
    **/
    update: XOR<TaskUpdateInput, TaskUncheckedUpdateInput>
  }


  /**
   * Task delete
   */
  export type TaskDeleteArgs = {
    /**
     * Select specific fields to fetch from the Task
    **/
    select?: TaskSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: TaskInclude | null
    /**
     * Filter which Task to delete.
    **/
    where: TaskWhereUniqueInput
  }


  /**
   * Task deleteMany
   */
  export type TaskDeleteManyArgs = {
    where?: TaskWhereInput
  }


  /**
   * Task without action
   */
  export type TaskArgs = {
    /**
     * Select specific fields to fetch from the Task
    **/
    select?: TaskSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: TaskInclude | null
  }



  /**
   * Enums
   */

  // Based on
  // https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

  export const EmployeeScalarFieldEnum: {
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
  };

  export type EmployeeScalarFieldEnum = (typeof EmployeeScalarFieldEnum)[keyof typeof EmployeeScalarFieldEnum]


  export const EmployeeSettingsScalarFieldEnum: {
    employeeId: 'employeeId',
    slack: 'slack',
    notificationSettings: 'notificationSettings'
  };

  export type EmployeeSettingsScalarFieldEnum = (typeof EmployeeSettingsScalarFieldEnum)[keyof typeof EmployeeSettingsScalarFieldEnum]


  export const EmployeeTaskScalarFieldEnum: {
    id: 'id',
    taskId: 'taskId',
    completed: 'completed',
    employeeId: 'employeeId',
    responsibleId: 'responsibleId',
    dueDate: 'dueDate',
    completedDate: 'completedDate',
    completedById: 'completedById'
  };

  export type EmployeeTaskScalarFieldEnum = (typeof EmployeeTaskScalarFieldEnum)[keyof typeof EmployeeTaskScalarFieldEnum]


  export const NotificationScalarFieldEnum: {
    id: 'id',
    employeeId: 'employeeId',
    createdAt: 'createdAt',
    read: 'read',
    description: 'description'
  };

  export type NotificationScalarFieldEnum = (typeof NotificationScalarFieldEnum)[keyof typeof NotificationScalarFieldEnum]


  export const PhaseScalarFieldEnum: {
    id: 'id',
    title: 'title',
    processTemplateId: 'processTemplateId',
    createdAt: 'createdAt',
    dueDateDayOffset: 'dueDateDayOffset',
    dueDate: 'dueDate',
    active: 'active'
  };

  export type PhaseScalarFieldEnum = (typeof PhaseScalarFieldEnum)[keyof typeof PhaseScalarFieldEnum]


  export const ProcessTemplateScalarFieldEnum: {
    id: 'id',
    title: 'title',
    slug: 'slug'
  };

  export type ProcessTemplateScalarFieldEnum = (typeof ProcessTemplateScalarFieldEnum)[keyof typeof ProcessTemplateScalarFieldEnum]


  export const ProfessionScalarFieldEnum: {
    id: 'id',
    title: 'title'
  };

  export type ProfessionScalarFieldEnum = (typeof ProfessionScalarFieldEnum)[keyof typeof ProfessionScalarFieldEnum]


  export const TagScalarFieldEnum: {
    id: 'id',
    title: 'title'
  };

  export type TagScalarFieldEnum = (typeof TagScalarFieldEnum)[keyof typeof TagScalarFieldEnum]


  export const TaskScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    link: 'link',
    global: 'global',
    phaseId: 'phaseId',
    responsibleId: 'responsibleId',
    createdAt: 'createdAt',
    active: 'active'
  };

  export type TaskScalarFieldEnum = (typeof TaskScalarFieldEnum)[keyof typeof TaskScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Deep Input Types
   */


  export type EmployeeWhereInput = {
    AND?: Enumerable<EmployeeWhereInput>
    OR?: Enumerable<EmployeeWhereInput>
    NOT?: Enumerable<EmployeeWhereInput>
    id?: IntFilter | number
    title?: StringNullableFilter | string | null
    email?: StringFilter | string
    professionId?: StringFilter | string
    firstName?: StringFilter | string
    lastName?: StringFilter | string
    birthDate?: DateTimeFilter | Date | string
    dateOfEmployment?: DateTimeNullableFilter | Date | string | null
    terminationDate?: DateTimeNullableFilter | Date | string | null
    imageUrl?: StringNullableFilter | string | null
    hrManagerId?: IntNullableFilter | number | null
    Employee?: XOR<EmployeeRelationFilter, EmployeeWhereInput> | null
    Profession?: XOR<ProfessionRelationFilter, ProfessionWhereInput>
    other_Employee?: EmployeeListRelationFilter
    EmployeeSettings?: XOR<EmployeeSettingsRelationFilter, EmployeeSettingsWhereInput> | null
    EmployeeTask_EmployeeToEmployeeTask_completedById?: EmployeeTaskListRelationFilter
    EmployeeTask_EmployeeToEmployeeTask_employeeId?: EmployeeTaskListRelationFilter
    EmployeeTask_EmployeeToEmployeeTask_responsibleId?: EmployeeTaskListRelationFilter
    Notification?: NotificationListRelationFilter
    Task?: TaskListRelationFilter
  }

  export type EmployeeOrderByInput = {
    id?: SortOrder
    title?: SortOrder
    email?: SortOrder
    professionId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    birthDate?: SortOrder
    dateOfEmployment?: SortOrder
    terminationDate?: SortOrder
    imageUrl?: SortOrder
    hrManagerId?: SortOrder
  }

  export type EmployeeWhereUniqueInput = {
    id?: number
    email?: string
  }

  export type EmployeeScalarWhereWithAggregatesInput = {
    AND?: Enumerable<EmployeeScalarWhereWithAggregatesInput>
    OR?: Enumerable<EmployeeScalarWhereWithAggregatesInput>
    NOT?: Enumerable<EmployeeScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    title?: StringNullableWithAggregatesFilter | string | null
    email?: StringWithAggregatesFilter | string
    professionId?: StringWithAggregatesFilter | string
    firstName?: StringWithAggregatesFilter | string
    lastName?: StringWithAggregatesFilter | string
    birthDate?: DateTimeWithAggregatesFilter | Date | string
    dateOfEmployment?: DateTimeNullableWithAggregatesFilter | Date | string | null
    terminationDate?: DateTimeNullableWithAggregatesFilter | Date | string | null
    imageUrl?: StringNullableWithAggregatesFilter | string | null
    hrManagerId?: IntNullableWithAggregatesFilter | number | null
  }

  export type EmployeeSettingsWhereInput = {
    AND?: Enumerable<EmployeeSettingsWhereInput>
    OR?: Enumerable<EmployeeSettingsWhereInput>
    NOT?: Enumerable<EmployeeSettingsWhereInput>
    employeeId?: IntFilter | number
    slack?: BoolFilter | boolean
    notificationSettings?: EnumNotificationTypeNullableListFilter
    Employee?: XOR<EmployeeRelationFilter, EmployeeWhereInput>
  }

  export type EmployeeSettingsOrderByInput = {
    employeeId?: SortOrder
    slack?: SortOrder
    notificationSettings?: SortOrder
  }

  export type EmployeeSettingsWhereUniqueInput = {
    employeeId?: number
  }

  export type EmployeeSettingsScalarWhereWithAggregatesInput = {
    AND?: Enumerable<EmployeeSettingsScalarWhereWithAggregatesInput>
    OR?: Enumerable<EmployeeSettingsScalarWhereWithAggregatesInput>
    NOT?: Enumerable<EmployeeSettingsScalarWhereWithAggregatesInput>
    employeeId?: IntWithAggregatesFilter | number
    slack?: BoolWithAggregatesFilter | boolean
    notificationSettings?: EnumNotificationTypeNullableListFilter
  }

  export type EmployeeTaskWhereInput = {
    AND?: Enumerable<EmployeeTaskWhereInput>
    OR?: Enumerable<EmployeeTaskWhereInput>
    NOT?: Enumerable<EmployeeTaskWhereInput>
    id?: StringFilter | string
    taskId?: StringFilter | string
    completed?: BoolFilter | boolean
    employeeId?: IntFilter | number
    responsibleId?: IntFilter | number
    dueDate?: DateTimeFilter | Date | string
    completedDate?: DateTimeNullableFilter | Date | string | null
    completedById?: IntNullableFilter | number | null
    Employee_EmployeeToEmployeeTask_completedById?: XOR<EmployeeRelationFilter, EmployeeWhereInput> | null
    Employee_EmployeeToEmployeeTask_employeeId?: XOR<EmployeeRelationFilter, EmployeeWhereInput>
    Employee_EmployeeToEmployeeTask_responsibleId?: XOR<EmployeeRelationFilter, EmployeeWhereInput>
    Task?: XOR<TaskRelationFilter, TaskWhereInput>
  }

  export type EmployeeTaskOrderByInput = {
    id?: SortOrder
    taskId?: SortOrder
    completed?: SortOrder
    employeeId?: SortOrder
    responsibleId?: SortOrder
    dueDate?: SortOrder
    completedDate?: SortOrder
    completedById?: SortOrder
  }

  export type EmployeeTaskWhereUniqueInput = {
    id?: string
  }

  export type EmployeeTaskScalarWhereWithAggregatesInput = {
    AND?: Enumerable<EmployeeTaskScalarWhereWithAggregatesInput>
    OR?: Enumerable<EmployeeTaskScalarWhereWithAggregatesInput>
    NOT?: Enumerable<EmployeeTaskScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    taskId?: StringWithAggregatesFilter | string
    completed?: BoolWithAggregatesFilter | boolean
    employeeId?: IntWithAggregatesFilter | number
    responsibleId?: IntWithAggregatesFilter | number
    dueDate?: DateTimeWithAggregatesFilter | Date | string
    completedDate?: DateTimeNullableWithAggregatesFilter | Date | string | null
    completedById?: IntNullableWithAggregatesFilter | number | null
  }

  export type NotificationWhereInput = {
    AND?: Enumerable<NotificationWhereInput>
    OR?: Enumerable<NotificationWhereInput>
    NOT?: Enumerable<NotificationWhereInput>
    id?: StringFilter | string
    employeeId?: IntFilter | number
    createdAt?: DateTimeFilter | Date | string
    read?: BoolFilter | boolean
    description?: StringFilter | string
    Employee?: XOR<EmployeeRelationFilter, EmployeeWhereInput>
  }

  export type NotificationOrderByInput = {
    id?: SortOrder
    employeeId?: SortOrder
    createdAt?: SortOrder
    read?: SortOrder
    description?: SortOrder
  }

  export type NotificationWhereUniqueInput = {
    id?: string
  }

  export type NotificationScalarWhereWithAggregatesInput = {
    AND?: Enumerable<NotificationScalarWhereWithAggregatesInput>
    OR?: Enumerable<NotificationScalarWhereWithAggregatesInput>
    NOT?: Enumerable<NotificationScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    employeeId?: IntWithAggregatesFilter | number
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    read?: BoolWithAggregatesFilter | boolean
    description?: StringWithAggregatesFilter | string
  }

  export type PhaseWhereInput = {
    AND?: Enumerable<PhaseWhereInput>
    OR?: Enumerable<PhaseWhereInput>
    NOT?: Enumerable<PhaseWhereInput>
    id?: StringFilter | string
    title?: StringFilter | string
    processTemplateId?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    dueDateDayOffset?: IntNullableFilter | number | null
    dueDate?: DateTimeNullableFilter | Date | string | null
    active?: BoolFilter | boolean
    ProcessTemplate?: XOR<ProcessTemplateRelationFilter, ProcessTemplateWhereInput>
    Task?: TaskListRelationFilter
  }

  export type PhaseOrderByInput = {
    id?: SortOrder
    title?: SortOrder
    processTemplateId?: SortOrder
    createdAt?: SortOrder
    dueDateDayOffset?: SortOrder
    dueDate?: SortOrder
    active?: SortOrder
  }

  export type PhaseWhereUniqueInput = {
    id?: string
  }

  export type PhaseScalarWhereWithAggregatesInput = {
    AND?: Enumerable<PhaseScalarWhereWithAggregatesInput>
    OR?: Enumerable<PhaseScalarWhereWithAggregatesInput>
    NOT?: Enumerable<PhaseScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    title?: StringWithAggregatesFilter | string
    processTemplateId?: StringWithAggregatesFilter | string
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    dueDateDayOffset?: IntNullableWithAggregatesFilter | number | null
    dueDate?: DateTimeNullableWithAggregatesFilter | Date | string | null
    active?: BoolWithAggregatesFilter | boolean
  }

  export type ProcessTemplateWhereInput = {
    AND?: Enumerable<ProcessTemplateWhereInput>
    OR?: Enumerable<ProcessTemplateWhereInput>
    NOT?: Enumerable<ProcessTemplateWhereInput>
    id?: StringFilter | string
    title?: StringFilter | string
    slug?: StringFilter | string
    Phase?: PhaseListRelationFilter
  }

  export type ProcessTemplateOrderByInput = {
    id?: SortOrder
    title?: SortOrder
    slug?: SortOrder
  }

  export type ProcessTemplateWhereUniqueInput = {
    id?: string
    slug?: string
  }

  export type ProcessTemplateScalarWhereWithAggregatesInput = {
    AND?: Enumerable<ProcessTemplateScalarWhereWithAggregatesInput>
    OR?: Enumerable<ProcessTemplateScalarWhereWithAggregatesInput>
    NOT?: Enumerable<ProcessTemplateScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    title?: StringWithAggregatesFilter | string
    slug?: StringWithAggregatesFilter | string
  }

  export type ProfessionWhereInput = {
    AND?: Enumerable<ProfessionWhereInput>
    OR?: Enumerable<ProfessionWhereInput>
    NOT?: Enumerable<ProfessionWhereInput>
    id?: StringFilter | string
    title?: StringFilter | string
    Employee?: EmployeeListRelationFilter
    Task?: TaskListRelationFilter
  }

  export type ProfessionOrderByInput = {
    id?: SortOrder
    title?: SortOrder
  }

  export type ProfessionWhereUniqueInput = {
    id?: string
    title?: string
  }

  export type ProfessionScalarWhereWithAggregatesInput = {
    AND?: Enumerable<ProfessionScalarWhereWithAggregatesInput>
    OR?: Enumerable<ProfessionScalarWhereWithAggregatesInput>
    NOT?: Enumerable<ProfessionScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    title?: StringWithAggregatesFilter | string
  }

  export type TagWhereInput = {
    AND?: Enumerable<TagWhereInput>
    OR?: Enumerable<TagWhereInput>
    NOT?: Enumerable<TagWhereInput>
    id?: StringFilter | string
    title?: StringFilter | string
    Task?: TaskListRelationFilter
  }

  export type TagOrderByInput = {
    id?: SortOrder
    title?: SortOrder
  }

  export type TagWhereUniqueInput = {
    id?: string
    title?: string
  }

  export type TagScalarWhereWithAggregatesInput = {
    AND?: Enumerable<TagScalarWhereWithAggregatesInput>
    OR?: Enumerable<TagScalarWhereWithAggregatesInput>
    NOT?: Enumerable<TagScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    title?: StringWithAggregatesFilter | string
  }

  export type TaskWhereInput = {
    AND?: Enumerable<TaskWhereInput>
    OR?: Enumerable<TaskWhereInput>
    NOT?: Enumerable<TaskWhereInput>
    id?: StringFilter | string
    title?: StringFilter | string
    description?: StringNullableFilter | string | null
    link?: StringNullableFilter | string | null
    global?: BoolFilter | boolean
    phaseId?: StringNullableFilter | string | null
    responsibleId?: IntNullableFilter | number | null
    createdAt?: DateTimeFilter | Date | string
    active?: BoolFilter | boolean
    Phase?: XOR<PhaseRelationFilter, PhaseWhereInput> | null
    Employee?: XOR<EmployeeRelationFilter, EmployeeWhereInput> | null
    EmployeeTask?: EmployeeTaskListRelationFilter
    Profession?: ProfessionListRelationFilter
    Tag?: TagListRelationFilter
  }

  export type TaskOrderByInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    link?: SortOrder
    global?: SortOrder
    phaseId?: SortOrder
    responsibleId?: SortOrder
    createdAt?: SortOrder
    active?: SortOrder
  }

  export type TaskWhereUniqueInput = {
    id?: string
  }

  export type TaskScalarWhereWithAggregatesInput = {
    AND?: Enumerable<TaskScalarWhereWithAggregatesInput>
    OR?: Enumerable<TaskScalarWhereWithAggregatesInput>
    NOT?: Enumerable<TaskScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    title?: StringWithAggregatesFilter | string
    description?: StringNullableWithAggregatesFilter | string | null
    link?: StringNullableWithAggregatesFilter | string | null
    global?: BoolWithAggregatesFilter | boolean
    phaseId?: StringNullableWithAggregatesFilter | string | null
    responsibleId?: IntNullableWithAggregatesFilter | number | null
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    active?: BoolWithAggregatesFilter | boolean
  }

  export type EmployeeCreateInput = {
    title?: string | null
    email: string
    firstName: string
    lastName: string
    birthDate: Date | string
    dateOfEmployment?: Date | string | null
    terminationDate?: Date | string | null
    imageUrl?: string | null
    Employee?: EmployeeCreateNestedOneWithoutOther_EmployeeInput
    Profession: ProfessionCreateNestedOneWithoutEmployeeInput
    other_Employee?: EmployeeCreateNestedManyWithoutEmployeeInput
    EmployeeSettings?: EmployeeSettingsCreateNestedOneWithoutEmployeeInput
    EmployeeTask_EmployeeToEmployeeTask_completedById?: EmployeeTaskCreateNestedManyWithoutEmployee_EmployeeToEmployeeTask_completedByIdInput
    EmployeeTask_EmployeeToEmployeeTask_employeeId?: EmployeeTaskCreateNestedManyWithoutEmployee_EmployeeToEmployeeTask_employeeIdInput
    EmployeeTask_EmployeeToEmployeeTask_responsibleId?: EmployeeTaskCreateNestedManyWithoutEmployee_EmployeeToEmployeeTask_responsibleIdInput
    Notification?: NotificationCreateNestedManyWithoutEmployeeInput
    Task?: TaskCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeUncheckedCreateInput = {
    id?: number
    title?: string | null
    email: string
    professionId: string
    firstName: string
    lastName: string
    birthDate: Date | string
    dateOfEmployment?: Date | string | null
    terminationDate?: Date | string | null
    imageUrl?: string | null
    hrManagerId?: number | null
    other_Employee?: EmployeeUncheckedCreateNestedManyWithoutEmployeeInput
    EmployeeSettings?: EmployeeSettingsUncheckedCreateNestedOneWithoutEmployeeInput
    EmployeeTask_EmployeeToEmployeeTask_completedById?: EmployeeTaskUncheckedCreateNestedManyWithoutEmployee_EmployeeToEmployeeTask_completedByIdInput
    EmployeeTask_EmployeeToEmployeeTask_employeeId?: EmployeeTaskUncheckedCreateNestedManyWithoutEmployee_EmployeeToEmployeeTask_employeeIdInput
    EmployeeTask_EmployeeToEmployeeTask_responsibleId?: EmployeeTaskUncheckedCreateNestedManyWithoutEmployee_EmployeeToEmployeeTask_responsibleIdInput
    Notification?: NotificationUncheckedCreateNestedManyWithoutEmployeeInput
    Task?: TaskUncheckedCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeUpdateInput = {
    title?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    dateOfEmployment?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    terminationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    Employee?: EmployeeUpdateOneWithoutOther_EmployeeInput
    Profession?: ProfessionUpdateOneRequiredWithoutEmployeeInput
    other_Employee?: EmployeeUpdateManyWithoutEmployeeInput
    EmployeeSettings?: EmployeeSettingsUpdateOneWithoutEmployeeInput
    EmployeeTask_EmployeeToEmployeeTask_completedById?: EmployeeTaskUpdateManyWithoutEmployee_EmployeeToEmployeeTask_completedByIdInput
    EmployeeTask_EmployeeToEmployeeTask_employeeId?: EmployeeTaskUpdateManyWithoutEmployee_EmployeeToEmployeeTask_employeeIdInput
    EmployeeTask_EmployeeToEmployeeTask_responsibleId?: EmployeeTaskUpdateManyWithoutEmployee_EmployeeToEmployeeTask_responsibleIdInput
    Notification?: NotificationUpdateManyWithoutEmployeeInput
    Task?: TaskUpdateManyWithoutEmployeeInput
  }

  export type EmployeeUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    professionId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    dateOfEmployment?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    terminationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    hrManagerId?: NullableIntFieldUpdateOperationsInput | number | null
    other_Employee?: EmployeeUncheckedUpdateManyWithoutEmployeeInput
    EmployeeSettings?: EmployeeSettingsUncheckedUpdateOneWithoutEmployeeInput
    EmployeeTask_EmployeeToEmployeeTask_completedById?: EmployeeTaskUncheckedUpdateManyWithoutEmployee_EmployeeToEmployeeTask_completedByIdInput
    EmployeeTask_EmployeeToEmployeeTask_employeeId?: EmployeeTaskUncheckedUpdateManyWithoutEmployee_EmployeeToEmployeeTask_employeeIdInput
    EmployeeTask_EmployeeToEmployeeTask_responsibleId?: EmployeeTaskUncheckedUpdateManyWithoutEmployee_EmployeeToEmployeeTask_responsibleIdInput
    Notification?: NotificationUncheckedUpdateManyWithoutEmployeeInput
    Task?: TaskUncheckedUpdateManyWithoutEmployeeInput
  }

  export type EmployeeCreateManyInput = {
    id?: number
    title?: string | null
    email: string
    professionId: string
    firstName: string
    lastName: string
    birthDate: Date | string
    dateOfEmployment?: Date | string | null
    terminationDate?: Date | string | null
    imageUrl?: string | null
    hrManagerId?: number | null
  }

  export type EmployeeUpdateManyMutationInput = {
    title?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    dateOfEmployment?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    terminationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EmployeeUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    professionId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    dateOfEmployment?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    terminationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    hrManagerId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type EmployeeSettingsCreateInput = {
    slack?: boolean
    notificationSettings?: EmployeeSettingsCreatenotificationSettingsInput | Enumerable<NotificationType>
    Employee: EmployeeCreateNestedOneWithoutEmployeeSettingsInput
  }

  export type EmployeeSettingsUncheckedCreateInput = {
    employeeId: number
    slack?: boolean
    notificationSettings?: EmployeeSettingsCreatenotificationSettingsInput | Enumerable<NotificationType>
  }

  export type EmployeeSettingsUpdateInput = {
    slack?: BoolFieldUpdateOperationsInput | boolean
    notificationSettings?: EmployeeSettingsUpdatenotificationSettingsInput | Enumerable<NotificationType>
    Employee?: EmployeeUpdateOneRequiredWithoutEmployeeSettingsInput
  }

  export type EmployeeSettingsUncheckedUpdateInput = {
    employeeId?: IntFieldUpdateOperationsInput | number
    slack?: BoolFieldUpdateOperationsInput | boolean
    notificationSettings?: EmployeeSettingsUpdatenotificationSettingsInput | Enumerable<NotificationType>
  }

  export type EmployeeSettingsCreateManyInput = {
    employeeId: number
    slack?: boolean
    notificationSettings?: EmployeeSettingsCreateManynotificationSettingsInput | Enumerable<NotificationType>
  }

  export type EmployeeSettingsUpdateManyMutationInput = {
    slack?: BoolFieldUpdateOperationsInput | boolean
    notificationSettings?: EmployeeSettingsUpdatenotificationSettingsInput | Enumerable<NotificationType>
  }

  export type EmployeeSettingsUncheckedUpdateManyInput = {
    employeeId?: IntFieldUpdateOperationsInput | number
    slack?: BoolFieldUpdateOperationsInput | boolean
    notificationSettings?: EmployeeSettingsUpdatenotificationSettingsInput | Enumerable<NotificationType>
  }

  export type EmployeeTaskCreateInput = {
    id: string
    completed?: boolean
    dueDate: Date | string
    completedDate?: Date | string | null
    Employee_EmployeeToEmployeeTask_completedById?: EmployeeCreateNestedOneWithoutEmployeeTask_EmployeeToEmployeeTask_completedByIdInput
    Employee_EmployeeToEmployeeTask_employeeId: EmployeeCreateNestedOneWithoutEmployeeTask_EmployeeToEmployeeTask_employeeIdInput
    Employee_EmployeeToEmployeeTask_responsibleId: EmployeeCreateNestedOneWithoutEmployeeTask_EmployeeToEmployeeTask_responsibleIdInput
    Task: TaskCreateNestedOneWithoutEmployeeTaskInput
  }

  export type EmployeeTaskUncheckedCreateInput = {
    id: string
    taskId: string
    completed?: boolean
    employeeId: number
    responsibleId: number
    dueDate: Date | string
    completedDate?: Date | string | null
    completedById?: number | null
  }

  export type EmployeeTaskUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    completedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Employee_EmployeeToEmployeeTask_completedById?: EmployeeUpdateOneWithoutEmployeeTask_EmployeeToEmployeeTask_completedByIdInput
    Employee_EmployeeToEmployeeTask_employeeId?: EmployeeUpdateOneRequiredWithoutEmployeeTask_EmployeeToEmployeeTask_employeeIdInput
    Employee_EmployeeToEmployeeTask_responsibleId?: EmployeeUpdateOneRequiredWithoutEmployeeTask_EmployeeToEmployeeTask_responsibleIdInput
    Task?: TaskUpdateOneRequiredWithoutEmployeeTaskInput
  }

  export type EmployeeTaskUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    taskId?: StringFieldUpdateOperationsInput | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    employeeId?: IntFieldUpdateOperationsInput | number
    responsibleId?: IntFieldUpdateOperationsInput | number
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    completedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedById?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type EmployeeTaskCreateManyInput = {
    id: string
    taskId: string
    completed?: boolean
    employeeId: number
    responsibleId: number
    dueDate: Date | string
    completedDate?: Date | string | null
    completedById?: number | null
  }

  export type EmployeeTaskUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    completedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type EmployeeTaskUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    taskId?: StringFieldUpdateOperationsInput | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    employeeId?: IntFieldUpdateOperationsInput | number
    responsibleId?: IntFieldUpdateOperationsInput | number
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    completedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedById?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type NotificationCreateInput = {
    id: string
    createdAt?: Date | string
    read?: boolean
    description: string
    Employee: EmployeeCreateNestedOneWithoutNotificationInput
  }

  export type NotificationUncheckedCreateInput = {
    id: string
    employeeId: number
    createdAt?: Date | string
    read?: boolean
    description: string
  }

  export type NotificationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    read?: BoolFieldUpdateOperationsInput | boolean
    description?: StringFieldUpdateOperationsInput | string
    Employee?: EmployeeUpdateOneRequiredWithoutNotificationInput
  }

  export type NotificationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    employeeId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    read?: BoolFieldUpdateOperationsInput | boolean
    description?: StringFieldUpdateOperationsInput | string
  }

  export type NotificationCreateManyInput = {
    id: string
    employeeId: number
    createdAt?: Date | string
    read?: boolean
    description: string
  }

  export type NotificationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    read?: BoolFieldUpdateOperationsInput | boolean
    description?: StringFieldUpdateOperationsInput | string
  }

  export type NotificationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    employeeId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    read?: BoolFieldUpdateOperationsInput | boolean
    description?: StringFieldUpdateOperationsInput | string
  }

  export type PhaseCreateInput = {
    id: string
    title: string
    createdAt?: Date | string
    dueDateDayOffset?: number | null
    dueDate?: Date | string | null
    active?: boolean
    ProcessTemplate: ProcessTemplateCreateNestedOneWithoutPhaseInput
    Task?: TaskCreateNestedManyWithoutPhaseInput
  }

  export type PhaseUncheckedCreateInput = {
    id: string
    title: string
    processTemplateId: string
    createdAt?: Date | string
    dueDateDayOffset?: number | null
    dueDate?: Date | string | null
    active?: boolean
    Task?: TaskUncheckedCreateNestedManyWithoutPhaseInput
  }

  export type PhaseUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dueDateDayOffset?: NullableIntFieldUpdateOperationsInput | number | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    ProcessTemplate?: ProcessTemplateUpdateOneRequiredWithoutPhaseInput
    Task?: TaskUpdateManyWithoutPhaseInput
  }

  export type PhaseUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    processTemplateId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dueDateDayOffset?: NullableIntFieldUpdateOperationsInput | number | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    Task?: TaskUncheckedUpdateManyWithoutPhaseInput
  }

  export type PhaseCreateManyInput = {
    id: string
    title: string
    processTemplateId: string
    createdAt?: Date | string
    dueDateDayOffset?: number | null
    dueDate?: Date | string | null
    active?: boolean
  }

  export type PhaseUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dueDateDayOffset?: NullableIntFieldUpdateOperationsInput | number | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
  }

  export type PhaseUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    processTemplateId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dueDateDayOffset?: NullableIntFieldUpdateOperationsInput | number | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ProcessTemplateCreateInput = {
    id: string
    title: string
    slug: string
    Phase?: PhaseCreateNestedManyWithoutProcessTemplateInput
  }

  export type ProcessTemplateUncheckedCreateInput = {
    id: string
    title: string
    slug: string
    Phase?: PhaseUncheckedCreateNestedManyWithoutProcessTemplateInput
  }

  export type ProcessTemplateUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    Phase?: PhaseUpdateManyWithoutProcessTemplateInput
  }

  export type ProcessTemplateUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    Phase?: PhaseUncheckedUpdateManyWithoutProcessTemplateInput
  }

  export type ProcessTemplateCreateManyInput = {
    id: string
    title: string
    slug: string
  }

  export type ProcessTemplateUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
  }

  export type ProcessTemplateUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
  }

  export type ProfessionCreateInput = {
    id: string
    title: string
    Employee?: EmployeeCreateNestedManyWithoutProfessionInput
    Task?: TaskCreateNestedManyWithoutProfessionInput
  }

  export type ProfessionUncheckedCreateInput = {
    id: string
    title: string
    Employee?: EmployeeUncheckedCreateNestedManyWithoutProfessionInput
  }

  export type ProfessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    Employee?: EmployeeUpdateManyWithoutProfessionInput
    Task?: TaskUpdateManyWithoutProfessionInput
  }

  export type ProfessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    Employee?: EmployeeUncheckedUpdateManyWithoutProfessionInput
  }

  export type ProfessionCreateManyInput = {
    id: string
    title: string
  }

  export type ProfessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
  }

  export type ProfessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
  }

  export type TagCreateInput = {
    id: string
    title: string
    Task?: TaskCreateNestedManyWithoutTagInput
  }

  export type TagUncheckedCreateInput = {
    id: string
    title: string
  }

  export type TagUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    Task?: TaskUpdateManyWithoutTagInput
  }

  export type TagUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
  }

  export type TagCreateManyInput = {
    id: string
    title: string
  }

  export type TagUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
  }

  export type TagUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
  }

  export type TaskCreateInput = {
    id: string
    title: string
    description?: string | null
    link?: string | null
    global?: boolean
    createdAt?: Date | string
    active?: boolean
    Phase?: PhaseCreateNestedOneWithoutTaskInput
    Employee?: EmployeeCreateNestedOneWithoutTaskInput
    EmployeeTask?: EmployeeTaskCreateNestedManyWithoutTaskInput
    Profession?: ProfessionCreateNestedManyWithoutTaskInput
    Tag?: TagCreateNestedManyWithoutTaskInput
  }

  export type TaskUncheckedCreateInput = {
    id: string
    title: string
    description?: string | null
    link?: string | null
    global?: boolean
    phaseId?: string | null
    responsibleId?: number | null
    createdAt?: Date | string
    active?: boolean
    EmployeeTask?: EmployeeTaskUncheckedCreateNestedManyWithoutTaskInput
  }

  export type TaskUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    link?: NullableStringFieldUpdateOperationsInput | string | null
    global?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    active?: BoolFieldUpdateOperationsInput | boolean
    Phase?: PhaseUpdateOneWithoutTaskInput
    Employee?: EmployeeUpdateOneWithoutTaskInput
    EmployeeTask?: EmployeeTaskUpdateManyWithoutTaskInput
    Profession?: ProfessionUpdateManyWithoutTaskInput
    Tag?: TagUpdateManyWithoutTaskInput
  }

  export type TaskUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    link?: NullableStringFieldUpdateOperationsInput | string | null
    global?: BoolFieldUpdateOperationsInput | boolean
    phaseId?: NullableStringFieldUpdateOperationsInput | string | null
    responsibleId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    active?: BoolFieldUpdateOperationsInput | boolean
    EmployeeTask?: EmployeeTaskUncheckedUpdateManyWithoutTaskInput
  }

  export type TaskCreateManyInput = {
    id: string
    title: string
    description?: string | null
    link?: string | null
    global?: boolean
    phaseId?: string | null
    responsibleId?: number | null
    createdAt?: Date | string
    active?: boolean
  }

  export type TaskUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    link?: NullableStringFieldUpdateOperationsInput | string | null
    global?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    active?: BoolFieldUpdateOperationsInput | boolean
  }

  export type TaskUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    link?: NullableStringFieldUpdateOperationsInput | string | null
    global?: BoolFieldUpdateOperationsInput | boolean
    phaseId?: NullableStringFieldUpdateOperationsInput | string | null
    responsibleId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    active?: BoolFieldUpdateOperationsInput | boolean
  }

  export type IntFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type StringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringNullableFilter | string | null
  }

  export type StringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringFilter | string
  }

  export type DateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type DateTimeNullableFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | null
    notIn?: Enumerable<Date> | Enumerable<string> | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableFilter | Date | string | null
  }

  export type IntNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableFilter | number | null
  }

  export type EmployeeRelationFilter = {
    is?: EmployeeWhereInput | null
    isNot?: EmployeeWhereInput | null
  }

  export type ProfessionRelationFilter = {
    is?: ProfessionWhereInput
    isNot?: ProfessionWhereInput
  }

  export type EmployeeListRelationFilter = {
    every?: EmployeeWhereInput
    some?: EmployeeWhereInput
    none?: EmployeeWhereInput
  }

  export type EmployeeSettingsRelationFilter = {
    is?: EmployeeSettingsWhereInput | null
    isNot?: EmployeeSettingsWhereInput | null
  }

  export type EmployeeTaskListRelationFilter = {
    every?: EmployeeTaskWhereInput
    some?: EmployeeTaskWhereInput
    none?: EmployeeTaskWhereInput
  }

  export type NotificationListRelationFilter = {
    every?: NotificationWhereInput
    some?: NotificationWhereInput
    none?: NotificationWhereInput
  }

  export type TaskListRelationFilter = {
    every?: TaskWhereInput
    some?: TaskWhereInput
    none?: TaskWhereInput
  }

  export type IntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    count?: NestedIntFilter
    avg?: NestedFloatFilter
    sum?: NestedIntFilter
    min?: NestedIntFilter
    max?: NestedIntFilter
  }

  export type StringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter | string | null
    count?: NestedIntNullableFilter
    min?: NestedStringNullableFilter
    max?: NestedStringNullableFilter
  }

  export type StringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter | string
    count?: NestedIntFilter
    min?: NestedStringFilter
    max?: NestedStringFilter
  }

  export type DateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    count?: NestedIntFilter
    min?: NestedDateTimeFilter
    max?: NestedDateTimeFilter
  }

  export type DateTimeNullableWithAggregatesFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | null
    notIn?: Enumerable<Date> | Enumerable<string> | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableWithAggregatesFilter | Date | string | null
    count?: NestedIntNullableFilter
    min?: NestedDateTimeNullableFilter
    max?: NestedDateTimeNullableFilter
  }

  export type IntNullableWithAggregatesFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableWithAggregatesFilter | number | null
    count?: NestedIntNullableFilter
    avg?: NestedFloatNullableFilter
    sum?: NestedIntNullableFilter
    min?: NestedIntNullableFilter
    max?: NestedIntNullableFilter
  }

  export type BoolFilter = {
    equals?: boolean
    not?: NestedBoolFilter | boolean
  }

  export type EnumNotificationTypeNullableListFilter = {
    equals?: Enumerable<NotificationType> | null
    has?: NotificationType | null
    hasEvery?: Enumerable<NotificationType>
    hasSome?: Enumerable<NotificationType>
    isEmpty?: boolean
  }

  export type BoolWithAggregatesFilter = {
    equals?: boolean
    not?: NestedBoolWithAggregatesFilter | boolean
    count?: NestedIntFilter
    min?: NestedBoolFilter
    max?: NestedBoolFilter
  }

  export type TaskRelationFilter = {
    is?: TaskWhereInput
    isNot?: TaskWhereInput
  }

  export type ProcessTemplateRelationFilter = {
    is?: ProcessTemplateWhereInput
    isNot?: ProcessTemplateWhereInput
  }

  export type PhaseListRelationFilter = {
    every?: PhaseWhereInput
    some?: PhaseWhereInput
    none?: PhaseWhereInput
  }

  export type PhaseRelationFilter = {
    is?: PhaseWhereInput | null
    isNot?: PhaseWhereInput | null
  }

  export type ProfessionListRelationFilter = {
    every?: ProfessionWhereInput
    some?: ProfessionWhereInput
    none?: ProfessionWhereInput
  }

  export type TagListRelationFilter = {
    every?: TagWhereInput
    some?: TagWhereInput
    none?: TagWhereInput
  }

  export type EmployeeCreateNestedOneWithoutOther_EmployeeInput = {
    create?: XOR<EmployeeCreateWithoutOther_EmployeeInput, EmployeeUncheckedCreateWithoutOther_EmployeeInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutOther_EmployeeInput
    connect?: EmployeeWhereUniqueInput
  }

  export type ProfessionCreateNestedOneWithoutEmployeeInput = {
    create?: XOR<ProfessionCreateWithoutEmployeeInput, ProfessionUncheckedCreateWithoutEmployeeInput>
    connectOrCreate?: ProfessionCreateOrConnectWithoutEmployeeInput
    connect?: ProfessionWhereUniqueInput
  }

  export type EmployeeCreateNestedManyWithoutEmployeeInput = {
    create?: XOR<Enumerable<EmployeeCreateWithoutEmployeeInput>, Enumerable<EmployeeUncheckedCreateWithoutEmployeeInput>>
    connectOrCreate?: Enumerable<EmployeeCreateOrConnectWithoutEmployeeInput>
    createMany?: EmployeeCreateManyEmployeeInputEnvelope
    connect?: Enumerable<EmployeeWhereUniqueInput>
  }

  export type EmployeeSettingsCreateNestedOneWithoutEmployeeInput = {
    create?: XOR<EmployeeSettingsCreateWithoutEmployeeInput, EmployeeSettingsUncheckedCreateWithoutEmployeeInput>
    connectOrCreate?: EmployeeSettingsCreateOrConnectWithoutEmployeeInput
    connect?: EmployeeSettingsWhereUniqueInput
  }

  export type EmployeeTaskCreateNestedManyWithoutEmployee_EmployeeToEmployeeTask_completedByIdInput = {
    create?: XOR<Enumerable<EmployeeTaskCreateWithoutEmployee_EmployeeToEmployeeTask_completedByIdInput>, Enumerable<EmployeeTaskUncheckedCreateWithoutEmployee_EmployeeToEmployeeTask_completedByIdInput>>
    connectOrCreate?: Enumerable<EmployeeTaskCreateOrConnectWithoutEmployee_EmployeeToEmployeeTask_completedByIdInput>
    createMany?: EmployeeTaskCreateManyEmployee_EmployeeToEmployeeTask_completedByIdInputEnvelope
    connect?: Enumerable<EmployeeTaskWhereUniqueInput>
  }

  export type EmployeeTaskCreateNestedManyWithoutEmployee_EmployeeToEmployeeTask_employeeIdInput = {
    create?: XOR<Enumerable<EmployeeTaskCreateWithoutEmployee_EmployeeToEmployeeTask_employeeIdInput>, Enumerable<EmployeeTaskUncheckedCreateWithoutEmployee_EmployeeToEmployeeTask_employeeIdInput>>
    connectOrCreate?: Enumerable<EmployeeTaskCreateOrConnectWithoutEmployee_EmployeeToEmployeeTask_employeeIdInput>
    createMany?: EmployeeTaskCreateManyEmployee_EmployeeToEmployeeTask_employeeIdInputEnvelope
    connect?: Enumerable<EmployeeTaskWhereUniqueInput>
  }

  export type EmployeeTaskCreateNestedManyWithoutEmployee_EmployeeToEmployeeTask_responsibleIdInput = {
    create?: XOR<Enumerable<EmployeeTaskCreateWithoutEmployee_EmployeeToEmployeeTask_responsibleIdInput>, Enumerable<EmployeeTaskUncheckedCreateWithoutEmployee_EmployeeToEmployeeTask_responsibleIdInput>>
    connectOrCreate?: Enumerable<EmployeeTaskCreateOrConnectWithoutEmployee_EmployeeToEmployeeTask_responsibleIdInput>
    createMany?: EmployeeTaskCreateManyEmployee_EmployeeToEmployeeTask_responsibleIdInputEnvelope
    connect?: Enumerable<EmployeeTaskWhereUniqueInput>
  }

  export type NotificationCreateNestedManyWithoutEmployeeInput = {
    create?: XOR<Enumerable<NotificationCreateWithoutEmployeeInput>, Enumerable<NotificationUncheckedCreateWithoutEmployeeInput>>
    connectOrCreate?: Enumerable<NotificationCreateOrConnectWithoutEmployeeInput>
    createMany?: NotificationCreateManyEmployeeInputEnvelope
    connect?: Enumerable<NotificationWhereUniqueInput>
  }

  export type TaskCreateNestedManyWithoutEmployeeInput = {
    create?: XOR<Enumerable<TaskCreateWithoutEmployeeInput>, Enumerable<TaskUncheckedCreateWithoutEmployeeInput>>
    connectOrCreate?: Enumerable<TaskCreateOrConnectWithoutEmployeeInput>
    createMany?: TaskCreateManyEmployeeInputEnvelope
    connect?: Enumerable<TaskWhereUniqueInput>
  }

  export type EmployeeUncheckedCreateNestedManyWithoutEmployeeInput = {
    create?: XOR<Enumerable<EmployeeCreateWithoutEmployeeInput>, Enumerable<EmployeeUncheckedCreateWithoutEmployeeInput>>
    connectOrCreate?: Enumerable<EmployeeCreateOrConnectWithoutEmployeeInput>
    createMany?: EmployeeCreateManyEmployeeInputEnvelope
    connect?: Enumerable<EmployeeWhereUniqueInput>
  }

  export type EmployeeSettingsUncheckedCreateNestedOneWithoutEmployeeInput = {
    create?: XOR<EmployeeSettingsCreateWithoutEmployeeInput, EmployeeSettingsUncheckedCreateWithoutEmployeeInput>
    connectOrCreate?: EmployeeSettingsCreateOrConnectWithoutEmployeeInput
    connect?: EmployeeSettingsWhereUniqueInput
  }

  export type EmployeeTaskUncheckedCreateNestedManyWithoutEmployee_EmployeeToEmployeeTask_completedByIdInput = {
    create?: XOR<Enumerable<EmployeeTaskCreateWithoutEmployee_EmployeeToEmployeeTask_completedByIdInput>, Enumerable<EmployeeTaskUncheckedCreateWithoutEmployee_EmployeeToEmployeeTask_completedByIdInput>>
    connectOrCreate?: Enumerable<EmployeeTaskCreateOrConnectWithoutEmployee_EmployeeToEmployeeTask_completedByIdInput>
    createMany?: EmployeeTaskCreateManyEmployee_EmployeeToEmployeeTask_completedByIdInputEnvelope
    connect?: Enumerable<EmployeeTaskWhereUniqueInput>
  }

  export type EmployeeTaskUncheckedCreateNestedManyWithoutEmployee_EmployeeToEmployeeTask_employeeIdInput = {
    create?: XOR<Enumerable<EmployeeTaskCreateWithoutEmployee_EmployeeToEmployeeTask_employeeIdInput>, Enumerable<EmployeeTaskUncheckedCreateWithoutEmployee_EmployeeToEmployeeTask_employeeIdInput>>
    connectOrCreate?: Enumerable<EmployeeTaskCreateOrConnectWithoutEmployee_EmployeeToEmployeeTask_employeeIdInput>
    createMany?: EmployeeTaskCreateManyEmployee_EmployeeToEmployeeTask_employeeIdInputEnvelope
    connect?: Enumerable<EmployeeTaskWhereUniqueInput>
  }

  export type EmployeeTaskUncheckedCreateNestedManyWithoutEmployee_EmployeeToEmployeeTask_responsibleIdInput = {
    create?: XOR<Enumerable<EmployeeTaskCreateWithoutEmployee_EmployeeToEmployeeTask_responsibleIdInput>, Enumerable<EmployeeTaskUncheckedCreateWithoutEmployee_EmployeeToEmployeeTask_responsibleIdInput>>
    connectOrCreate?: Enumerable<EmployeeTaskCreateOrConnectWithoutEmployee_EmployeeToEmployeeTask_responsibleIdInput>
    createMany?: EmployeeTaskCreateManyEmployee_EmployeeToEmployeeTask_responsibleIdInputEnvelope
    connect?: Enumerable<EmployeeTaskWhereUniqueInput>
  }

  export type NotificationUncheckedCreateNestedManyWithoutEmployeeInput = {
    create?: XOR<Enumerable<NotificationCreateWithoutEmployeeInput>, Enumerable<NotificationUncheckedCreateWithoutEmployeeInput>>
    connectOrCreate?: Enumerable<NotificationCreateOrConnectWithoutEmployeeInput>
    createMany?: NotificationCreateManyEmployeeInputEnvelope
    connect?: Enumerable<NotificationWhereUniqueInput>
  }

  export type TaskUncheckedCreateNestedManyWithoutEmployeeInput = {
    create?: XOR<Enumerable<TaskCreateWithoutEmployeeInput>, Enumerable<TaskUncheckedCreateWithoutEmployeeInput>>
    connectOrCreate?: Enumerable<TaskCreateOrConnectWithoutEmployeeInput>
    createMany?: TaskCreateManyEmployeeInputEnvelope
    connect?: Enumerable<TaskWhereUniqueInput>
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type EmployeeUpdateOneWithoutOther_EmployeeInput = {
    create?: XOR<EmployeeCreateWithoutOther_EmployeeInput, EmployeeUncheckedCreateWithoutOther_EmployeeInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutOther_EmployeeInput
    upsert?: EmployeeUpsertWithoutOther_EmployeeInput
    connect?: EmployeeWhereUniqueInput
    disconnect?: boolean
    delete?: boolean
    update?: XOR<EmployeeUpdateWithoutOther_EmployeeInput, EmployeeUncheckedUpdateWithoutOther_EmployeeInput>
  }

  export type ProfessionUpdateOneRequiredWithoutEmployeeInput = {
    create?: XOR<ProfessionCreateWithoutEmployeeInput, ProfessionUncheckedCreateWithoutEmployeeInput>
    connectOrCreate?: ProfessionCreateOrConnectWithoutEmployeeInput
    upsert?: ProfessionUpsertWithoutEmployeeInput
    connect?: ProfessionWhereUniqueInput
    update?: XOR<ProfessionUpdateWithoutEmployeeInput, ProfessionUncheckedUpdateWithoutEmployeeInput>
  }

  export type EmployeeUpdateManyWithoutEmployeeInput = {
    create?: XOR<Enumerable<EmployeeCreateWithoutEmployeeInput>, Enumerable<EmployeeUncheckedCreateWithoutEmployeeInput>>
    connectOrCreate?: Enumerable<EmployeeCreateOrConnectWithoutEmployeeInput>
    upsert?: Enumerable<EmployeeUpsertWithWhereUniqueWithoutEmployeeInput>
    createMany?: EmployeeCreateManyEmployeeInputEnvelope
    connect?: Enumerable<EmployeeWhereUniqueInput>
    set?: Enumerable<EmployeeWhereUniqueInput>
    disconnect?: Enumerable<EmployeeWhereUniqueInput>
    delete?: Enumerable<EmployeeWhereUniqueInput>
    update?: Enumerable<EmployeeUpdateWithWhereUniqueWithoutEmployeeInput>
    updateMany?: Enumerable<EmployeeUpdateManyWithWhereWithoutEmployeeInput>
    deleteMany?: Enumerable<EmployeeScalarWhereInput>
  }

  export type EmployeeSettingsUpdateOneWithoutEmployeeInput = {
    create?: XOR<EmployeeSettingsCreateWithoutEmployeeInput, EmployeeSettingsUncheckedCreateWithoutEmployeeInput>
    connectOrCreate?: EmployeeSettingsCreateOrConnectWithoutEmployeeInput
    upsert?: EmployeeSettingsUpsertWithoutEmployeeInput
    connect?: EmployeeSettingsWhereUniqueInput
    disconnect?: boolean
    delete?: boolean
    update?: XOR<EmployeeSettingsUpdateWithoutEmployeeInput, EmployeeSettingsUncheckedUpdateWithoutEmployeeInput>
  }

  export type EmployeeTaskUpdateManyWithoutEmployee_EmployeeToEmployeeTask_completedByIdInput = {
    create?: XOR<Enumerable<EmployeeTaskCreateWithoutEmployee_EmployeeToEmployeeTask_completedByIdInput>, Enumerable<EmployeeTaskUncheckedCreateWithoutEmployee_EmployeeToEmployeeTask_completedByIdInput>>
    connectOrCreate?: Enumerable<EmployeeTaskCreateOrConnectWithoutEmployee_EmployeeToEmployeeTask_completedByIdInput>
    upsert?: Enumerable<EmployeeTaskUpsertWithWhereUniqueWithoutEmployee_EmployeeToEmployeeTask_completedByIdInput>
    createMany?: EmployeeTaskCreateManyEmployee_EmployeeToEmployeeTask_completedByIdInputEnvelope
    connect?: Enumerable<EmployeeTaskWhereUniqueInput>
    set?: Enumerable<EmployeeTaskWhereUniqueInput>
    disconnect?: Enumerable<EmployeeTaskWhereUniqueInput>
    delete?: Enumerable<EmployeeTaskWhereUniqueInput>
    update?: Enumerable<EmployeeTaskUpdateWithWhereUniqueWithoutEmployee_EmployeeToEmployeeTask_completedByIdInput>
    updateMany?: Enumerable<EmployeeTaskUpdateManyWithWhereWithoutEmployee_EmployeeToEmployeeTask_completedByIdInput>
    deleteMany?: Enumerable<EmployeeTaskScalarWhereInput>
  }

  export type EmployeeTaskUpdateManyWithoutEmployee_EmployeeToEmployeeTask_employeeIdInput = {
    create?: XOR<Enumerable<EmployeeTaskCreateWithoutEmployee_EmployeeToEmployeeTask_employeeIdInput>, Enumerable<EmployeeTaskUncheckedCreateWithoutEmployee_EmployeeToEmployeeTask_employeeIdInput>>
    connectOrCreate?: Enumerable<EmployeeTaskCreateOrConnectWithoutEmployee_EmployeeToEmployeeTask_employeeIdInput>
    upsert?: Enumerable<EmployeeTaskUpsertWithWhereUniqueWithoutEmployee_EmployeeToEmployeeTask_employeeIdInput>
    createMany?: EmployeeTaskCreateManyEmployee_EmployeeToEmployeeTask_employeeIdInputEnvelope
    connect?: Enumerable<EmployeeTaskWhereUniqueInput>
    set?: Enumerable<EmployeeTaskWhereUniqueInput>
    disconnect?: Enumerable<EmployeeTaskWhereUniqueInput>
    delete?: Enumerable<EmployeeTaskWhereUniqueInput>
    update?: Enumerable<EmployeeTaskUpdateWithWhereUniqueWithoutEmployee_EmployeeToEmployeeTask_employeeIdInput>
    updateMany?: Enumerable<EmployeeTaskUpdateManyWithWhereWithoutEmployee_EmployeeToEmployeeTask_employeeIdInput>
    deleteMany?: Enumerable<EmployeeTaskScalarWhereInput>
  }

  export type EmployeeTaskUpdateManyWithoutEmployee_EmployeeToEmployeeTask_responsibleIdInput = {
    create?: XOR<Enumerable<EmployeeTaskCreateWithoutEmployee_EmployeeToEmployeeTask_responsibleIdInput>, Enumerable<EmployeeTaskUncheckedCreateWithoutEmployee_EmployeeToEmployeeTask_responsibleIdInput>>
    connectOrCreate?: Enumerable<EmployeeTaskCreateOrConnectWithoutEmployee_EmployeeToEmployeeTask_responsibleIdInput>
    upsert?: Enumerable<EmployeeTaskUpsertWithWhereUniqueWithoutEmployee_EmployeeToEmployeeTask_responsibleIdInput>
    createMany?: EmployeeTaskCreateManyEmployee_EmployeeToEmployeeTask_responsibleIdInputEnvelope
    connect?: Enumerable<EmployeeTaskWhereUniqueInput>
    set?: Enumerable<EmployeeTaskWhereUniqueInput>
    disconnect?: Enumerable<EmployeeTaskWhereUniqueInput>
    delete?: Enumerable<EmployeeTaskWhereUniqueInput>
    update?: Enumerable<EmployeeTaskUpdateWithWhereUniqueWithoutEmployee_EmployeeToEmployeeTask_responsibleIdInput>
    updateMany?: Enumerable<EmployeeTaskUpdateManyWithWhereWithoutEmployee_EmployeeToEmployeeTask_responsibleIdInput>
    deleteMany?: Enumerable<EmployeeTaskScalarWhereInput>
  }

  export type NotificationUpdateManyWithoutEmployeeInput = {
    create?: XOR<Enumerable<NotificationCreateWithoutEmployeeInput>, Enumerable<NotificationUncheckedCreateWithoutEmployeeInput>>
    connectOrCreate?: Enumerable<NotificationCreateOrConnectWithoutEmployeeInput>
    upsert?: Enumerable<NotificationUpsertWithWhereUniqueWithoutEmployeeInput>
    createMany?: NotificationCreateManyEmployeeInputEnvelope
    connect?: Enumerable<NotificationWhereUniqueInput>
    set?: Enumerable<NotificationWhereUniqueInput>
    disconnect?: Enumerable<NotificationWhereUniqueInput>
    delete?: Enumerable<NotificationWhereUniqueInput>
    update?: Enumerable<NotificationUpdateWithWhereUniqueWithoutEmployeeInput>
    updateMany?: Enumerable<NotificationUpdateManyWithWhereWithoutEmployeeInput>
    deleteMany?: Enumerable<NotificationScalarWhereInput>
  }

  export type TaskUpdateManyWithoutEmployeeInput = {
    create?: XOR<Enumerable<TaskCreateWithoutEmployeeInput>, Enumerable<TaskUncheckedCreateWithoutEmployeeInput>>
    connectOrCreate?: Enumerable<TaskCreateOrConnectWithoutEmployeeInput>
    upsert?: Enumerable<TaskUpsertWithWhereUniqueWithoutEmployeeInput>
    createMany?: TaskCreateManyEmployeeInputEnvelope
    connect?: Enumerable<TaskWhereUniqueInput>
    set?: Enumerable<TaskWhereUniqueInput>
    disconnect?: Enumerable<TaskWhereUniqueInput>
    delete?: Enumerable<TaskWhereUniqueInput>
    update?: Enumerable<TaskUpdateWithWhereUniqueWithoutEmployeeInput>
    updateMany?: Enumerable<TaskUpdateManyWithWhereWithoutEmployeeInput>
    deleteMany?: Enumerable<TaskScalarWhereInput>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EmployeeUncheckedUpdateManyWithoutEmployeeInput = {
    create?: XOR<Enumerable<EmployeeCreateWithoutEmployeeInput>, Enumerable<EmployeeUncheckedCreateWithoutEmployeeInput>>
    connectOrCreate?: Enumerable<EmployeeCreateOrConnectWithoutEmployeeInput>
    upsert?: Enumerable<EmployeeUpsertWithWhereUniqueWithoutEmployeeInput>
    createMany?: EmployeeCreateManyEmployeeInputEnvelope
    connect?: Enumerable<EmployeeWhereUniqueInput>
    set?: Enumerable<EmployeeWhereUniqueInput>
    disconnect?: Enumerable<EmployeeWhereUniqueInput>
    delete?: Enumerable<EmployeeWhereUniqueInput>
    update?: Enumerable<EmployeeUpdateWithWhereUniqueWithoutEmployeeInput>
    updateMany?: Enumerable<EmployeeUpdateManyWithWhereWithoutEmployeeInput>
    deleteMany?: Enumerable<EmployeeScalarWhereInput>
  }

  export type EmployeeSettingsUncheckedUpdateOneWithoutEmployeeInput = {
    create?: XOR<EmployeeSettingsCreateWithoutEmployeeInput, EmployeeSettingsUncheckedCreateWithoutEmployeeInput>
    connectOrCreate?: EmployeeSettingsCreateOrConnectWithoutEmployeeInput
    upsert?: EmployeeSettingsUpsertWithoutEmployeeInput
    connect?: EmployeeSettingsWhereUniqueInput
    disconnect?: boolean
    delete?: boolean
    update?: XOR<EmployeeSettingsUpdateWithoutEmployeeInput, EmployeeSettingsUncheckedUpdateWithoutEmployeeInput>
  }

  export type EmployeeTaskUncheckedUpdateManyWithoutEmployee_EmployeeToEmployeeTask_completedByIdInput = {
    create?: XOR<Enumerable<EmployeeTaskCreateWithoutEmployee_EmployeeToEmployeeTask_completedByIdInput>, Enumerable<EmployeeTaskUncheckedCreateWithoutEmployee_EmployeeToEmployeeTask_completedByIdInput>>
    connectOrCreate?: Enumerable<EmployeeTaskCreateOrConnectWithoutEmployee_EmployeeToEmployeeTask_completedByIdInput>
    upsert?: Enumerable<EmployeeTaskUpsertWithWhereUniqueWithoutEmployee_EmployeeToEmployeeTask_completedByIdInput>
    createMany?: EmployeeTaskCreateManyEmployee_EmployeeToEmployeeTask_completedByIdInputEnvelope
    connect?: Enumerable<EmployeeTaskWhereUniqueInput>
    set?: Enumerable<EmployeeTaskWhereUniqueInput>
    disconnect?: Enumerable<EmployeeTaskWhereUniqueInput>
    delete?: Enumerable<EmployeeTaskWhereUniqueInput>
    update?: Enumerable<EmployeeTaskUpdateWithWhereUniqueWithoutEmployee_EmployeeToEmployeeTask_completedByIdInput>
    updateMany?: Enumerable<EmployeeTaskUpdateManyWithWhereWithoutEmployee_EmployeeToEmployeeTask_completedByIdInput>
    deleteMany?: Enumerable<EmployeeTaskScalarWhereInput>
  }

  export type EmployeeTaskUncheckedUpdateManyWithoutEmployee_EmployeeToEmployeeTask_employeeIdInput = {
    create?: XOR<Enumerable<EmployeeTaskCreateWithoutEmployee_EmployeeToEmployeeTask_employeeIdInput>, Enumerable<EmployeeTaskUncheckedCreateWithoutEmployee_EmployeeToEmployeeTask_employeeIdInput>>
    connectOrCreate?: Enumerable<EmployeeTaskCreateOrConnectWithoutEmployee_EmployeeToEmployeeTask_employeeIdInput>
    upsert?: Enumerable<EmployeeTaskUpsertWithWhereUniqueWithoutEmployee_EmployeeToEmployeeTask_employeeIdInput>
    createMany?: EmployeeTaskCreateManyEmployee_EmployeeToEmployeeTask_employeeIdInputEnvelope
    connect?: Enumerable<EmployeeTaskWhereUniqueInput>
    set?: Enumerable<EmployeeTaskWhereUniqueInput>
    disconnect?: Enumerable<EmployeeTaskWhereUniqueInput>
    delete?: Enumerable<EmployeeTaskWhereUniqueInput>
    update?: Enumerable<EmployeeTaskUpdateWithWhereUniqueWithoutEmployee_EmployeeToEmployeeTask_employeeIdInput>
    updateMany?: Enumerable<EmployeeTaskUpdateManyWithWhereWithoutEmployee_EmployeeToEmployeeTask_employeeIdInput>
    deleteMany?: Enumerable<EmployeeTaskScalarWhereInput>
  }

  export type EmployeeTaskUncheckedUpdateManyWithoutEmployee_EmployeeToEmployeeTask_responsibleIdInput = {
    create?: XOR<Enumerable<EmployeeTaskCreateWithoutEmployee_EmployeeToEmployeeTask_responsibleIdInput>, Enumerable<EmployeeTaskUncheckedCreateWithoutEmployee_EmployeeToEmployeeTask_responsibleIdInput>>
    connectOrCreate?: Enumerable<EmployeeTaskCreateOrConnectWithoutEmployee_EmployeeToEmployeeTask_responsibleIdInput>
    upsert?: Enumerable<EmployeeTaskUpsertWithWhereUniqueWithoutEmployee_EmployeeToEmployeeTask_responsibleIdInput>
    createMany?: EmployeeTaskCreateManyEmployee_EmployeeToEmployeeTask_responsibleIdInputEnvelope
    connect?: Enumerable<EmployeeTaskWhereUniqueInput>
    set?: Enumerable<EmployeeTaskWhereUniqueInput>
    disconnect?: Enumerable<EmployeeTaskWhereUniqueInput>
    delete?: Enumerable<EmployeeTaskWhereUniqueInput>
    update?: Enumerable<EmployeeTaskUpdateWithWhereUniqueWithoutEmployee_EmployeeToEmployeeTask_responsibleIdInput>
    updateMany?: Enumerable<EmployeeTaskUpdateManyWithWhereWithoutEmployee_EmployeeToEmployeeTask_responsibleIdInput>
    deleteMany?: Enumerable<EmployeeTaskScalarWhereInput>
  }

  export type NotificationUncheckedUpdateManyWithoutEmployeeInput = {
    create?: XOR<Enumerable<NotificationCreateWithoutEmployeeInput>, Enumerable<NotificationUncheckedCreateWithoutEmployeeInput>>
    connectOrCreate?: Enumerable<NotificationCreateOrConnectWithoutEmployeeInput>
    upsert?: Enumerable<NotificationUpsertWithWhereUniqueWithoutEmployeeInput>
    createMany?: NotificationCreateManyEmployeeInputEnvelope
    connect?: Enumerable<NotificationWhereUniqueInput>
    set?: Enumerable<NotificationWhereUniqueInput>
    disconnect?: Enumerable<NotificationWhereUniqueInput>
    delete?: Enumerable<NotificationWhereUniqueInput>
    update?: Enumerable<NotificationUpdateWithWhereUniqueWithoutEmployeeInput>
    updateMany?: Enumerable<NotificationUpdateManyWithWhereWithoutEmployeeInput>
    deleteMany?: Enumerable<NotificationScalarWhereInput>
  }

  export type TaskUncheckedUpdateManyWithoutEmployeeInput = {
    create?: XOR<Enumerable<TaskCreateWithoutEmployeeInput>, Enumerable<TaskUncheckedCreateWithoutEmployeeInput>>
    connectOrCreate?: Enumerable<TaskCreateOrConnectWithoutEmployeeInput>
    upsert?: Enumerable<TaskUpsertWithWhereUniqueWithoutEmployeeInput>
    createMany?: TaskCreateManyEmployeeInputEnvelope
    connect?: Enumerable<TaskWhereUniqueInput>
    set?: Enumerable<TaskWhereUniqueInput>
    disconnect?: Enumerable<TaskWhereUniqueInput>
    delete?: Enumerable<TaskWhereUniqueInput>
    update?: Enumerable<TaskUpdateWithWhereUniqueWithoutEmployeeInput>
    updateMany?: Enumerable<TaskUpdateManyWithWhereWithoutEmployeeInput>
    deleteMany?: Enumerable<TaskScalarWhereInput>
  }

  export type EmployeeSettingsCreatenotificationSettingsInput = {
    set: Enumerable<NotificationType>
  }

  export type EmployeeCreateNestedOneWithoutEmployeeSettingsInput = {
    create?: XOR<EmployeeCreateWithoutEmployeeSettingsInput, EmployeeUncheckedCreateWithoutEmployeeSettingsInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutEmployeeSettingsInput
    connect?: EmployeeWhereUniqueInput
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type EmployeeSettingsUpdatenotificationSettingsInput = {
    set?: Enumerable<NotificationType>
    push?: NotificationType
  }

  export type EmployeeUpdateOneRequiredWithoutEmployeeSettingsInput = {
    create?: XOR<EmployeeCreateWithoutEmployeeSettingsInput, EmployeeUncheckedCreateWithoutEmployeeSettingsInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutEmployeeSettingsInput
    upsert?: EmployeeUpsertWithoutEmployeeSettingsInput
    connect?: EmployeeWhereUniqueInput
    update?: XOR<EmployeeUpdateWithoutEmployeeSettingsInput, EmployeeUncheckedUpdateWithoutEmployeeSettingsInput>
  }

  export type EmployeeSettingsCreateManynotificationSettingsInput = {
    set: Enumerable<NotificationType>
  }

  export type EmployeeCreateNestedOneWithoutEmployeeTask_EmployeeToEmployeeTask_completedByIdInput = {
    create?: XOR<EmployeeCreateWithoutEmployeeTask_EmployeeToEmployeeTask_completedByIdInput, EmployeeUncheckedCreateWithoutEmployeeTask_EmployeeToEmployeeTask_completedByIdInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutEmployeeTask_EmployeeToEmployeeTask_completedByIdInput
    connect?: EmployeeWhereUniqueInput
  }

  export type EmployeeCreateNestedOneWithoutEmployeeTask_EmployeeToEmployeeTask_employeeIdInput = {
    create?: XOR<EmployeeCreateWithoutEmployeeTask_EmployeeToEmployeeTask_employeeIdInput, EmployeeUncheckedCreateWithoutEmployeeTask_EmployeeToEmployeeTask_employeeIdInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutEmployeeTask_EmployeeToEmployeeTask_employeeIdInput
    connect?: EmployeeWhereUniqueInput
  }

  export type EmployeeCreateNestedOneWithoutEmployeeTask_EmployeeToEmployeeTask_responsibleIdInput = {
    create?: XOR<EmployeeCreateWithoutEmployeeTask_EmployeeToEmployeeTask_responsibleIdInput, EmployeeUncheckedCreateWithoutEmployeeTask_EmployeeToEmployeeTask_responsibleIdInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutEmployeeTask_EmployeeToEmployeeTask_responsibleIdInput
    connect?: EmployeeWhereUniqueInput
  }

  export type TaskCreateNestedOneWithoutEmployeeTaskInput = {
    create?: XOR<TaskCreateWithoutEmployeeTaskInput, TaskUncheckedCreateWithoutEmployeeTaskInput>
    connectOrCreate?: TaskCreateOrConnectWithoutEmployeeTaskInput
    connect?: TaskWhereUniqueInput
  }

  export type EmployeeUpdateOneWithoutEmployeeTask_EmployeeToEmployeeTask_completedByIdInput = {
    create?: XOR<EmployeeCreateWithoutEmployeeTask_EmployeeToEmployeeTask_completedByIdInput, EmployeeUncheckedCreateWithoutEmployeeTask_EmployeeToEmployeeTask_completedByIdInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutEmployeeTask_EmployeeToEmployeeTask_completedByIdInput
    upsert?: EmployeeUpsertWithoutEmployeeTask_EmployeeToEmployeeTask_completedByIdInput
    connect?: EmployeeWhereUniqueInput
    disconnect?: boolean
    delete?: boolean
    update?: XOR<EmployeeUpdateWithoutEmployeeTask_EmployeeToEmployeeTask_completedByIdInput, EmployeeUncheckedUpdateWithoutEmployeeTask_EmployeeToEmployeeTask_completedByIdInput>
  }

  export type EmployeeUpdateOneRequiredWithoutEmployeeTask_EmployeeToEmployeeTask_employeeIdInput = {
    create?: XOR<EmployeeCreateWithoutEmployeeTask_EmployeeToEmployeeTask_employeeIdInput, EmployeeUncheckedCreateWithoutEmployeeTask_EmployeeToEmployeeTask_employeeIdInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutEmployeeTask_EmployeeToEmployeeTask_employeeIdInput
    upsert?: EmployeeUpsertWithoutEmployeeTask_EmployeeToEmployeeTask_employeeIdInput
    connect?: EmployeeWhereUniqueInput
    update?: XOR<EmployeeUpdateWithoutEmployeeTask_EmployeeToEmployeeTask_employeeIdInput, EmployeeUncheckedUpdateWithoutEmployeeTask_EmployeeToEmployeeTask_employeeIdInput>
  }

  export type EmployeeUpdateOneRequiredWithoutEmployeeTask_EmployeeToEmployeeTask_responsibleIdInput = {
    create?: XOR<EmployeeCreateWithoutEmployeeTask_EmployeeToEmployeeTask_responsibleIdInput, EmployeeUncheckedCreateWithoutEmployeeTask_EmployeeToEmployeeTask_responsibleIdInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutEmployeeTask_EmployeeToEmployeeTask_responsibleIdInput
    upsert?: EmployeeUpsertWithoutEmployeeTask_EmployeeToEmployeeTask_responsibleIdInput
    connect?: EmployeeWhereUniqueInput
    update?: XOR<EmployeeUpdateWithoutEmployeeTask_EmployeeToEmployeeTask_responsibleIdInput, EmployeeUncheckedUpdateWithoutEmployeeTask_EmployeeToEmployeeTask_responsibleIdInput>
  }

  export type TaskUpdateOneRequiredWithoutEmployeeTaskInput = {
    create?: XOR<TaskCreateWithoutEmployeeTaskInput, TaskUncheckedCreateWithoutEmployeeTaskInput>
    connectOrCreate?: TaskCreateOrConnectWithoutEmployeeTaskInput
    upsert?: TaskUpsertWithoutEmployeeTaskInput
    connect?: TaskWhereUniqueInput
    update?: XOR<TaskUpdateWithoutEmployeeTaskInput, TaskUncheckedUpdateWithoutEmployeeTaskInput>
  }

  export type EmployeeCreateNestedOneWithoutNotificationInput = {
    create?: XOR<EmployeeCreateWithoutNotificationInput, EmployeeUncheckedCreateWithoutNotificationInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutNotificationInput
    connect?: EmployeeWhereUniqueInput
  }

  export type EmployeeUpdateOneRequiredWithoutNotificationInput = {
    create?: XOR<EmployeeCreateWithoutNotificationInput, EmployeeUncheckedCreateWithoutNotificationInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutNotificationInput
    upsert?: EmployeeUpsertWithoutNotificationInput
    connect?: EmployeeWhereUniqueInput
    update?: XOR<EmployeeUpdateWithoutNotificationInput, EmployeeUncheckedUpdateWithoutNotificationInput>
  }

  export type ProcessTemplateCreateNestedOneWithoutPhaseInput = {
    create?: XOR<ProcessTemplateCreateWithoutPhaseInput, ProcessTemplateUncheckedCreateWithoutPhaseInput>
    connectOrCreate?: ProcessTemplateCreateOrConnectWithoutPhaseInput
    connect?: ProcessTemplateWhereUniqueInput
  }

  export type TaskCreateNestedManyWithoutPhaseInput = {
    create?: XOR<Enumerable<TaskCreateWithoutPhaseInput>, Enumerable<TaskUncheckedCreateWithoutPhaseInput>>
    connectOrCreate?: Enumerable<TaskCreateOrConnectWithoutPhaseInput>
    createMany?: TaskCreateManyPhaseInputEnvelope
    connect?: Enumerable<TaskWhereUniqueInput>
  }

  export type TaskUncheckedCreateNestedManyWithoutPhaseInput = {
    create?: XOR<Enumerable<TaskCreateWithoutPhaseInput>, Enumerable<TaskUncheckedCreateWithoutPhaseInput>>
    connectOrCreate?: Enumerable<TaskCreateOrConnectWithoutPhaseInput>
    createMany?: TaskCreateManyPhaseInputEnvelope
    connect?: Enumerable<TaskWhereUniqueInput>
  }

  export type ProcessTemplateUpdateOneRequiredWithoutPhaseInput = {
    create?: XOR<ProcessTemplateCreateWithoutPhaseInput, ProcessTemplateUncheckedCreateWithoutPhaseInput>
    connectOrCreate?: ProcessTemplateCreateOrConnectWithoutPhaseInput
    upsert?: ProcessTemplateUpsertWithoutPhaseInput
    connect?: ProcessTemplateWhereUniqueInput
    update?: XOR<ProcessTemplateUpdateWithoutPhaseInput, ProcessTemplateUncheckedUpdateWithoutPhaseInput>
  }

  export type TaskUpdateManyWithoutPhaseInput = {
    create?: XOR<Enumerable<TaskCreateWithoutPhaseInput>, Enumerable<TaskUncheckedCreateWithoutPhaseInput>>
    connectOrCreate?: Enumerable<TaskCreateOrConnectWithoutPhaseInput>
    upsert?: Enumerable<TaskUpsertWithWhereUniqueWithoutPhaseInput>
    createMany?: TaskCreateManyPhaseInputEnvelope
    connect?: Enumerable<TaskWhereUniqueInput>
    set?: Enumerable<TaskWhereUniqueInput>
    disconnect?: Enumerable<TaskWhereUniqueInput>
    delete?: Enumerable<TaskWhereUniqueInput>
    update?: Enumerable<TaskUpdateWithWhereUniqueWithoutPhaseInput>
    updateMany?: Enumerable<TaskUpdateManyWithWhereWithoutPhaseInput>
    deleteMany?: Enumerable<TaskScalarWhereInput>
  }

  export type TaskUncheckedUpdateManyWithoutPhaseInput = {
    create?: XOR<Enumerable<TaskCreateWithoutPhaseInput>, Enumerable<TaskUncheckedCreateWithoutPhaseInput>>
    connectOrCreate?: Enumerable<TaskCreateOrConnectWithoutPhaseInput>
    upsert?: Enumerable<TaskUpsertWithWhereUniqueWithoutPhaseInput>
    createMany?: TaskCreateManyPhaseInputEnvelope
    connect?: Enumerable<TaskWhereUniqueInput>
    set?: Enumerable<TaskWhereUniqueInput>
    disconnect?: Enumerable<TaskWhereUniqueInput>
    delete?: Enumerable<TaskWhereUniqueInput>
    update?: Enumerable<TaskUpdateWithWhereUniqueWithoutPhaseInput>
    updateMany?: Enumerable<TaskUpdateManyWithWhereWithoutPhaseInput>
    deleteMany?: Enumerable<TaskScalarWhereInput>
  }

  export type PhaseCreateNestedManyWithoutProcessTemplateInput = {
    create?: XOR<Enumerable<PhaseCreateWithoutProcessTemplateInput>, Enumerable<PhaseUncheckedCreateWithoutProcessTemplateInput>>
    connectOrCreate?: Enumerable<PhaseCreateOrConnectWithoutProcessTemplateInput>
    createMany?: PhaseCreateManyProcessTemplateInputEnvelope
    connect?: Enumerable<PhaseWhereUniqueInput>
  }

  export type PhaseUncheckedCreateNestedManyWithoutProcessTemplateInput = {
    create?: XOR<Enumerable<PhaseCreateWithoutProcessTemplateInput>, Enumerable<PhaseUncheckedCreateWithoutProcessTemplateInput>>
    connectOrCreate?: Enumerable<PhaseCreateOrConnectWithoutProcessTemplateInput>
    createMany?: PhaseCreateManyProcessTemplateInputEnvelope
    connect?: Enumerable<PhaseWhereUniqueInput>
  }

  export type PhaseUpdateManyWithoutProcessTemplateInput = {
    create?: XOR<Enumerable<PhaseCreateWithoutProcessTemplateInput>, Enumerable<PhaseUncheckedCreateWithoutProcessTemplateInput>>
    connectOrCreate?: Enumerable<PhaseCreateOrConnectWithoutProcessTemplateInput>
    upsert?: Enumerable<PhaseUpsertWithWhereUniqueWithoutProcessTemplateInput>
    createMany?: PhaseCreateManyProcessTemplateInputEnvelope
    connect?: Enumerable<PhaseWhereUniqueInput>
    set?: Enumerable<PhaseWhereUniqueInput>
    disconnect?: Enumerable<PhaseWhereUniqueInput>
    delete?: Enumerable<PhaseWhereUniqueInput>
    update?: Enumerable<PhaseUpdateWithWhereUniqueWithoutProcessTemplateInput>
    updateMany?: Enumerable<PhaseUpdateManyWithWhereWithoutProcessTemplateInput>
    deleteMany?: Enumerable<PhaseScalarWhereInput>
  }

  export type PhaseUncheckedUpdateManyWithoutProcessTemplateInput = {
    create?: XOR<Enumerable<PhaseCreateWithoutProcessTemplateInput>, Enumerable<PhaseUncheckedCreateWithoutProcessTemplateInput>>
    connectOrCreate?: Enumerable<PhaseCreateOrConnectWithoutProcessTemplateInput>
    upsert?: Enumerable<PhaseUpsertWithWhereUniqueWithoutProcessTemplateInput>
    createMany?: PhaseCreateManyProcessTemplateInputEnvelope
    connect?: Enumerable<PhaseWhereUniqueInput>
    set?: Enumerable<PhaseWhereUniqueInput>
    disconnect?: Enumerable<PhaseWhereUniqueInput>
    delete?: Enumerable<PhaseWhereUniqueInput>
    update?: Enumerable<PhaseUpdateWithWhereUniqueWithoutProcessTemplateInput>
    updateMany?: Enumerable<PhaseUpdateManyWithWhereWithoutProcessTemplateInput>
    deleteMany?: Enumerable<PhaseScalarWhereInput>
  }

  export type EmployeeCreateNestedManyWithoutProfessionInput = {
    create?: XOR<Enumerable<EmployeeCreateWithoutProfessionInput>, Enumerable<EmployeeUncheckedCreateWithoutProfessionInput>>
    connectOrCreate?: Enumerable<EmployeeCreateOrConnectWithoutProfessionInput>
    createMany?: EmployeeCreateManyProfessionInputEnvelope
    connect?: Enumerable<EmployeeWhereUniqueInput>
  }

  export type TaskCreateNestedManyWithoutProfessionInput = {
    create?: XOR<Enumerable<TaskCreateWithoutProfessionInput>, Enumerable<TaskUncheckedCreateWithoutProfessionInput>>
    connectOrCreate?: Enumerable<TaskCreateOrConnectWithoutProfessionInput>
    connect?: Enumerable<TaskWhereUniqueInput>
  }

  export type EmployeeUncheckedCreateNestedManyWithoutProfessionInput = {
    create?: XOR<Enumerable<EmployeeCreateWithoutProfessionInput>, Enumerable<EmployeeUncheckedCreateWithoutProfessionInput>>
    connectOrCreate?: Enumerable<EmployeeCreateOrConnectWithoutProfessionInput>
    createMany?: EmployeeCreateManyProfessionInputEnvelope
    connect?: Enumerable<EmployeeWhereUniqueInput>
  }

  export type EmployeeUpdateManyWithoutProfessionInput = {
    create?: XOR<Enumerable<EmployeeCreateWithoutProfessionInput>, Enumerable<EmployeeUncheckedCreateWithoutProfessionInput>>
    connectOrCreate?: Enumerable<EmployeeCreateOrConnectWithoutProfessionInput>
    upsert?: Enumerable<EmployeeUpsertWithWhereUniqueWithoutProfessionInput>
    createMany?: EmployeeCreateManyProfessionInputEnvelope
    connect?: Enumerable<EmployeeWhereUniqueInput>
    set?: Enumerable<EmployeeWhereUniqueInput>
    disconnect?: Enumerable<EmployeeWhereUniqueInput>
    delete?: Enumerable<EmployeeWhereUniqueInput>
    update?: Enumerable<EmployeeUpdateWithWhereUniqueWithoutProfessionInput>
    updateMany?: Enumerable<EmployeeUpdateManyWithWhereWithoutProfessionInput>
    deleteMany?: Enumerable<EmployeeScalarWhereInput>
  }

  export type TaskUpdateManyWithoutProfessionInput = {
    create?: XOR<Enumerable<TaskCreateWithoutProfessionInput>, Enumerable<TaskUncheckedCreateWithoutProfessionInput>>
    connectOrCreate?: Enumerable<TaskCreateOrConnectWithoutProfessionInput>
    upsert?: Enumerable<TaskUpsertWithWhereUniqueWithoutProfessionInput>
    connect?: Enumerable<TaskWhereUniqueInput>
    set?: Enumerable<TaskWhereUniqueInput>
    disconnect?: Enumerable<TaskWhereUniqueInput>
    delete?: Enumerable<TaskWhereUniqueInput>
    update?: Enumerable<TaskUpdateWithWhereUniqueWithoutProfessionInput>
    updateMany?: Enumerable<TaskUpdateManyWithWhereWithoutProfessionInput>
    deleteMany?: Enumerable<TaskScalarWhereInput>
  }

  export type EmployeeUncheckedUpdateManyWithoutProfessionInput = {
    create?: XOR<Enumerable<EmployeeCreateWithoutProfessionInput>, Enumerable<EmployeeUncheckedCreateWithoutProfessionInput>>
    connectOrCreate?: Enumerable<EmployeeCreateOrConnectWithoutProfessionInput>
    upsert?: Enumerable<EmployeeUpsertWithWhereUniqueWithoutProfessionInput>
    createMany?: EmployeeCreateManyProfessionInputEnvelope
    connect?: Enumerable<EmployeeWhereUniqueInput>
    set?: Enumerable<EmployeeWhereUniqueInput>
    disconnect?: Enumerable<EmployeeWhereUniqueInput>
    delete?: Enumerable<EmployeeWhereUniqueInput>
    update?: Enumerable<EmployeeUpdateWithWhereUniqueWithoutProfessionInput>
    updateMany?: Enumerable<EmployeeUpdateManyWithWhereWithoutProfessionInput>
    deleteMany?: Enumerable<EmployeeScalarWhereInput>
  }

  export type TaskCreateNestedManyWithoutTagInput = {
    create?: XOR<Enumerable<TaskCreateWithoutTagInput>, Enumerable<TaskUncheckedCreateWithoutTagInput>>
    connectOrCreate?: Enumerable<TaskCreateOrConnectWithoutTagInput>
    connect?: Enumerable<TaskWhereUniqueInput>
  }

  export type TaskUpdateManyWithoutTagInput = {
    create?: XOR<Enumerable<TaskCreateWithoutTagInput>, Enumerable<TaskUncheckedCreateWithoutTagInput>>
    connectOrCreate?: Enumerable<TaskCreateOrConnectWithoutTagInput>
    upsert?: Enumerable<TaskUpsertWithWhereUniqueWithoutTagInput>
    connect?: Enumerable<TaskWhereUniqueInput>
    set?: Enumerable<TaskWhereUniqueInput>
    disconnect?: Enumerable<TaskWhereUniqueInput>
    delete?: Enumerable<TaskWhereUniqueInput>
    update?: Enumerable<TaskUpdateWithWhereUniqueWithoutTagInput>
    updateMany?: Enumerable<TaskUpdateManyWithWhereWithoutTagInput>
    deleteMany?: Enumerable<TaskScalarWhereInput>
  }

  export type PhaseCreateNestedOneWithoutTaskInput = {
    create?: XOR<PhaseCreateWithoutTaskInput, PhaseUncheckedCreateWithoutTaskInput>
    connectOrCreate?: PhaseCreateOrConnectWithoutTaskInput
    connect?: PhaseWhereUniqueInput
  }

  export type EmployeeCreateNestedOneWithoutTaskInput = {
    create?: XOR<EmployeeCreateWithoutTaskInput, EmployeeUncheckedCreateWithoutTaskInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutTaskInput
    connect?: EmployeeWhereUniqueInput
  }

  export type EmployeeTaskCreateNestedManyWithoutTaskInput = {
    create?: XOR<Enumerable<EmployeeTaskCreateWithoutTaskInput>, Enumerable<EmployeeTaskUncheckedCreateWithoutTaskInput>>
    connectOrCreate?: Enumerable<EmployeeTaskCreateOrConnectWithoutTaskInput>
    createMany?: EmployeeTaskCreateManyTaskInputEnvelope
    connect?: Enumerable<EmployeeTaskWhereUniqueInput>
  }

  export type ProfessionCreateNestedManyWithoutTaskInput = {
    create?: XOR<Enumerable<ProfessionCreateWithoutTaskInput>, Enumerable<ProfessionUncheckedCreateWithoutTaskInput>>
    connectOrCreate?: Enumerable<ProfessionCreateOrConnectWithoutTaskInput>
    connect?: Enumerable<ProfessionWhereUniqueInput>
  }

  export type TagCreateNestedManyWithoutTaskInput = {
    create?: XOR<Enumerable<TagCreateWithoutTaskInput>, Enumerable<TagUncheckedCreateWithoutTaskInput>>
    connectOrCreate?: Enumerable<TagCreateOrConnectWithoutTaskInput>
    connect?: Enumerable<TagWhereUniqueInput>
  }

  export type EmployeeTaskUncheckedCreateNestedManyWithoutTaskInput = {
    create?: XOR<Enumerable<EmployeeTaskCreateWithoutTaskInput>, Enumerable<EmployeeTaskUncheckedCreateWithoutTaskInput>>
    connectOrCreate?: Enumerable<EmployeeTaskCreateOrConnectWithoutTaskInput>
    createMany?: EmployeeTaskCreateManyTaskInputEnvelope
    connect?: Enumerable<EmployeeTaskWhereUniqueInput>
  }

  export type PhaseUpdateOneWithoutTaskInput = {
    create?: XOR<PhaseCreateWithoutTaskInput, PhaseUncheckedCreateWithoutTaskInput>
    connectOrCreate?: PhaseCreateOrConnectWithoutTaskInput
    upsert?: PhaseUpsertWithoutTaskInput
    connect?: PhaseWhereUniqueInput
    disconnect?: boolean
    delete?: boolean
    update?: XOR<PhaseUpdateWithoutTaskInput, PhaseUncheckedUpdateWithoutTaskInput>
  }

  export type EmployeeUpdateOneWithoutTaskInput = {
    create?: XOR<EmployeeCreateWithoutTaskInput, EmployeeUncheckedCreateWithoutTaskInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutTaskInput
    upsert?: EmployeeUpsertWithoutTaskInput
    connect?: EmployeeWhereUniqueInput
    disconnect?: boolean
    delete?: boolean
    update?: XOR<EmployeeUpdateWithoutTaskInput, EmployeeUncheckedUpdateWithoutTaskInput>
  }

  export type EmployeeTaskUpdateManyWithoutTaskInput = {
    create?: XOR<Enumerable<EmployeeTaskCreateWithoutTaskInput>, Enumerable<EmployeeTaskUncheckedCreateWithoutTaskInput>>
    connectOrCreate?: Enumerable<EmployeeTaskCreateOrConnectWithoutTaskInput>
    upsert?: Enumerable<EmployeeTaskUpsertWithWhereUniqueWithoutTaskInput>
    createMany?: EmployeeTaskCreateManyTaskInputEnvelope
    connect?: Enumerable<EmployeeTaskWhereUniqueInput>
    set?: Enumerable<EmployeeTaskWhereUniqueInput>
    disconnect?: Enumerable<EmployeeTaskWhereUniqueInput>
    delete?: Enumerable<EmployeeTaskWhereUniqueInput>
    update?: Enumerable<EmployeeTaskUpdateWithWhereUniqueWithoutTaskInput>
    updateMany?: Enumerable<EmployeeTaskUpdateManyWithWhereWithoutTaskInput>
    deleteMany?: Enumerable<EmployeeTaskScalarWhereInput>
  }

  export type ProfessionUpdateManyWithoutTaskInput = {
    create?: XOR<Enumerable<ProfessionCreateWithoutTaskInput>, Enumerable<ProfessionUncheckedCreateWithoutTaskInput>>
    connectOrCreate?: Enumerable<ProfessionCreateOrConnectWithoutTaskInput>
    upsert?: Enumerable<ProfessionUpsertWithWhereUniqueWithoutTaskInput>
    connect?: Enumerable<ProfessionWhereUniqueInput>
    set?: Enumerable<ProfessionWhereUniqueInput>
    disconnect?: Enumerable<ProfessionWhereUniqueInput>
    delete?: Enumerable<ProfessionWhereUniqueInput>
    update?: Enumerable<ProfessionUpdateWithWhereUniqueWithoutTaskInput>
    updateMany?: Enumerable<ProfessionUpdateManyWithWhereWithoutTaskInput>
    deleteMany?: Enumerable<ProfessionScalarWhereInput>
  }

  export type TagUpdateManyWithoutTaskInput = {
    create?: XOR<Enumerable<TagCreateWithoutTaskInput>, Enumerable<TagUncheckedCreateWithoutTaskInput>>
    connectOrCreate?: Enumerable<TagCreateOrConnectWithoutTaskInput>
    upsert?: Enumerable<TagUpsertWithWhereUniqueWithoutTaskInput>
    connect?: Enumerable<TagWhereUniqueInput>
    set?: Enumerable<TagWhereUniqueInput>
    disconnect?: Enumerable<TagWhereUniqueInput>
    delete?: Enumerable<TagWhereUniqueInput>
    update?: Enumerable<TagUpdateWithWhereUniqueWithoutTaskInput>
    updateMany?: Enumerable<TagUpdateManyWithWhereWithoutTaskInput>
    deleteMany?: Enumerable<TagScalarWhereInput>
  }

  export type EmployeeTaskUncheckedUpdateManyWithoutTaskInput = {
    create?: XOR<Enumerable<EmployeeTaskCreateWithoutTaskInput>, Enumerable<EmployeeTaskUncheckedCreateWithoutTaskInput>>
    connectOrCreate?: Enumerable<EmployeeTaskCreateOrConnectWithoutTaskInput>
    upsert?: Enumerable<EmployeeTaskUpsertWithWhereUniqueWithoutTaskInput>
    createMany?: EmployeeTaskCreateManyTaskInputEnvelope
    connect?: Enumerable<EmployeeTaskWhereUniqueInput>
    set?: Enumerable<EmployeeTaskWhereUniqueInput>
    disconnect?: Enumerable<EmployeeTaskWhereUniqueInput>
    delete?: Enumerable<EmployeeTaskWhereUniqueInput>
    update?: Enumerable<EmployeeTaskUpdateWithWhereUniqueWithoutTaskInput>
    updateMany?: Enumerable<EmployeeTaskUpdateManyWithWhereWithoutTaskInput>
    deleteMany?: Enumerable<EmployeeTaskScalarWhereInput>
  }

  export type NestedIntFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type NestedStringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableFilter | string | null
  }

  export type NestedStringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringFilter | string
  }

  export type NestedDateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type NestedDateTimeNullableFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | null
    notIn?: Enumerable<Date> | Enumerable<string> | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableFilter | Date | string | null
  }

  export type NestedIntNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableFilter | number | null
  }

  export type NestedIntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    count?: NestedIntFilter
    avg?: NestedFloatFilter
    sum?: NestedIntFilter
    min?: NestedIntFilter
    max?: NestedIntFilter
  }

  export type NestedFloatFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatFilter | number
  }

  export type NestedStringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableWithAggregatesFilter | string | null
    count?: NestedIntNullableFilter
    min?: NestedStringNullableFilter
    max?: NestedStringNullableFilter
  }

  export type NestedStringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringWithAggregatesFilter | string
    count?: NestedIntFilter
    min?: NestedStringFilter
    max?: NestedStringFilter
  }

  export type NestedDateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    count?: NestedIntFilter
    min?: NestedDateTimeFilter
    max?: NestedDateTimeFilter
  }

  export type NestedDateTimeNullableWithAggregatesFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | null
    notIn?: Enumerable<Date> | Enumerable<string> | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableWithAggregatesFilter | Date | string | null
    count?: NestedIntNullableFilter
    min?: NestedDateTimeNullableFilter
    max?: NestedDateTimeNullableFilter
  }

  export type NestedIntNullableWithAggregatesFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableWithAggregatesFilter | number | null
    count?: NestedIntNullableFilter
    avg?: NestedFloatNullableFilter
    sum?: NestedIntNullableFilter
    min?: NestedIntNullableFilter
    max?: NestedIntNullableFilter
  }

  export type NestedFloatNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatNullableFilter | number | null
  }

  export type NestedBoolFilter = {
    equals?: boolean
    not?: NestedBoolFilter | boolean
  }

  export type NestedBoolWithAggregatesFilter = {
    equals?: boolean
    not?: NestedBoolWithAggregatesFilter | boolean
    count?: NestedIntFilter
    min?: NestedBoolFilter
    max?: NestedBoolFilter
  }

  export type EmployeeCreateWithoutOther_EmployeeInput = {
    title?: string | null
    email: string
    firstName: string
    lastName: string
    birthDate: Date | string
    dateOfEmployment?: Date | string | null
    terminationDate?: Date | string | null
    imageUrl?: string | null
    Employee?: EmployeeCreateNestedOneWithoutOther_EmployeeInput
    Profession: ProfessionCreateNestedOneWithoutEmployeeInput
    EmployeeSettings?: EmployeeSettingsCreateNestedOneWithoutEmployeeInput
    EmployeeTask_EmployeeToEmployeeTask_completedById?: EmployeeTaskCreateNestedManyWithoutEmployee_EmployeeToEmployeeTask_completedByIdInput
    EmployeeTask_EmployeeToEmployeeTask_employeeId?: EmployeeTaskCreateNestedManyWithoutEmployee_EmployeeToEmployeeTask_employeeIdInput
    EmployeeTask_EmployeeToEmployeeTask_responsibleId?: EmployeeTaskCreateNestedManyWithoutEmployee_EmployeeToEmployeeTask_responsibleIdInput
    Notification?: NotificationCreateNestedManyWithoutEmployeeInput
    Task?: TaskCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeUncheckedCreateWithoutOther_EmployeeInput = {
    id?: number
    title?: string | null
    email: string
    professionId: string
    firstName: string
    lastName: string
    birthDate: Date | string
    dateOfEmployment?: Date | string | null
    terminationDate?: Date | string | null
    imageUrl?: string | null
    hrManagerId?: number | null
    EmployeeSettings?: EmployeeSettingsUncheckedCreateNestedOneWithoutEmployeeInput
    EmployeeTask_EmployeeToEmployeeTask_completedById?: EmployeeTaskUncheckedCreateNestedManyWithoutEmployee_EmployeeToEmployeeTask_completedByIdInput
    EmployeeTask_EmployeeToEmployeeTask_employeeId?: EmployeeTaskUncheckedCreateNestedManyWithoutEmployee_EmployeeToEmployeeTask_employeeIdInput
    EmployeeTask_EmployeeToEmployeeTask_responsibleId?: EmployeeTaskUncheckedCreateNestedManyWithoutEmployee_EmployeeToEmployeeTask_responsibleIdInput
    Notification?: NotificationUncheckedCreateNestedManyWithoutEmployeeInput
    Task?: TaskUncheckedCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeCreateOrConnectWithoutOther_EmployeeInput = {
    where: EmployeeWhereUniqueInput
    create: XOR<EmployeeCreateWithoutOther_EmployeeInput, EmployeeUncheckedCreateWithoutOther_EmployeeInput>
  }

  export type ProfessionCreateWithoutEmployeeInput = {
    id: string
    title: string
    Task?: TaskCreateNestedManyWithoutProfessionInput
  }

  export type ProfessionUncheckedCreateWithoutEmployeeInput = {
    id: string
    title: string
  }

  export type ProfessionCreateOrConnectWithoutEmployeeInput = {
    where: ProfessionWhereUniqueInput
    create: XOR<ProfessionCreateWithoutEmployeeInput, ProfessionUncheckedCreateWithoutEmployeeInput>
  }

  export type EmployeeCreateWithoutEmployeeInput = {
    title?: string | null
    email: string
    firstName: string
    lastName: string
    birthDate: Date | string
    dateOfEmployment?: Date | string | null
    terminationDate?: Date | string | null
    imageUrl?: string | null
    Profession: ProfessionCreateNestedOneWithoutEmployeeInput
    other_Employee?: EmployeeCreateNestedManyWithoutEmployeeInput
    EmployeeSettings?: EmployeeSettingsCreateNestedOneWithoutEmployeeInput
    EmployeeTask_EmployeeToEmployeeTask_completedById?: EmployeeTaskCreateNestedManyWithoutEmployee_EmployeeToEmployeeTask_completedByIdInput
    EmployeeTask_EmployeeToEmployeeTask_employeeId?: EmployeeTaskCreateNestedManyWithoutEmployee_EmployeeToEmployeeTask_employeeIdInput
    EmployeeTask_EmployeeToEmployeeTask_responsibleId?: EmployeeTaskCreateNestedManyWithoutEmployee_EmployeeToEmployeeTask_responsibleIdInput
    Notification?: NotificationCreateNestedManyWithoutEmployeeInput
    Task?: TaskCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeUncheckedCreateWithoutEmployeeInput = {
    id?: number
    title?: string | null
    email: string
    professionId: string
    firstName: string
    lastName: string
    birthDate: Date | string
    dateOfEmployment?: Date | string | null
    terminationDate?: Date | string | null
    imageUrl?: string | null
    other_Employee?: EmployeeUncheckedCreateNestedManyWithoutEmployeeInput
    EmployeeSettings?: EmployeeSettingsUncheckedCreateNestedOneWithoutEmployeeInput
    EmployeeTask_EmployeeToEmployeeTask_completedById?: EmployeeTaskUncheckedCreateNestedManyWithoutEmployee_EmployeeToEmployeeTask_completedByIdInput
    EmployeeTask_EmployeeToEmployeeTask_employeeId?: EmployeeTaskUncheckedCreateNestedManyWithoutEmployee_EmployeeToEmployeeTask_employeeIdInput
    EmployeeTask_EmployeeToEmployeeTask_responsibleId?: EmployeeTaskUncheckedCreateNestedManyWithoutEmployee_EmployeeToEmployeeTask_responsibleIdInput
    Notification?: NotificationUncheckedCreateNestedManyWithoutEmployeeInput
    Task?: TaskUncheckedCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeCreateOrConnectWithoutEmployeeInput = {
    where: EmployeeWhereUniqueInput
    create: XOR<EmployeeCreateWithoutEmployeeInput, EmployeeUncheckedCreateWithoutEmployeeInput>
  }

  export type EmployeeCreateManyEmployeeInputEnvelope = {
    data: Enumerable<EmployeeCreateManyEmployeeInput>
    skipDuplicates?: boolean
  }

  export type EmployeeSettingsCreateWithoutEmployeeInput = {
    slack?: boolean
    notificationSettings?: EmployeeSettingsCreatenotificationSettingsInput | Enumerable<NotificationType>
  }

  export type EmployeeSettingsUncheckedCreateWithoutEmployeeInput = {
    slack?: boolean
    notificationSettings?: EmployeeSettingsCreatenotificationSettingsInput | Enumerable<NotificationType>
  }

  export type EmployeeSettingsCreateOrConnectWithoutEmployeeInput = {
    where: EmployeeSettingsWhereUniqueInput
    create: XOR<EmployeeSettingsCreateWithoutEmployeeInput, EmployeeSettingsUncheckedCreateWithoutEmployeeInput>
  }

  export type EmployeeTaskCreateWithoutEmployee_EmployeeToEmployeeTask_completedByIdInput = {
    id: string
    completed?: boolean
    dueDate: Date | string
    completedDate?: Date | string | null
    Employee_EmployeeToEmployeeTask_employeeId: EmployeeCreateNestedOneWithoutEmployeeTask_EmployeeToEmployeeTask_employeeIdInput
    Employee_EmployeeToEmployeeTask_responsibleId: EmployeeCreateNestedOneWithoutEmployeeTask_EmployeeToEmployeeTask_responsibleIdInput
    Task: TaskCreateNestedOneWithoutEmployeeTaskInput
  }

  export type EmployeeTaskUncheckedCreateWithoutEmployee_EmployeeToEmployeeTask_completedByIdInput = {
    id: string
    taskId: string
    completed?: boolean
    employeeId: number
    responsibleId: number
    dueDate: Date | string
    completedDate?: Date | string | null
  }

  export type EmployeeTaskCreateOrConnectWithoutEmployee_EmployeeToEmployeeTask_completedByIdInput = {
    where: EmployeeTaskWhereUniqueInput
    create: XOR<EmployeeTaskCreateWithoutEmployee_EmployeeToEmployeeTask_completedByIdInput, EmployeeTaskUncheckedCreateWithoutEmployee_EmployeeToEmployeeTask_completedByIdInput>
  }

  export type EmployeeTaskCreateManyEmployee_EmployeeToEmployeeTask_completedByIdInputEnvelope = {
    data: Enumerable<EmployeeTaskCreateManyEmployee_EmployeeToEmployeeTask_completedByIdInput>
    skipDuplicates?: boolean
  }

  export type EmployeeTaskCreateWithoutEmployee_EmployeeToEmployeeTask_employeeIdInput = {
    id: string
    completed?: boolean
    dueDate: Date | string
    completedDate?: Date | string | null
    Employee_EmployeeToEmployeeTask_completedById?: EmployeeCreateNestedOneWithoutEmployeeTask_EmployeeToEmployeeTask_completedByIdInput
    Employee_EmployeeToEmployeeTask_responsibleId: EmployeeCreateNestedOneWithoutEmployeeTask_EmployeeToEmployeeTask_responsibleIdInput
    Task: TaskCreateNestedOneWithoutEmployeeTaskInput
  }

  export type EmployeeTaskUncheckedCreateWithoutEmployee_EmployeeToEmployeeTask_employeeIdInput = {
    id: string
    taskId: string
    completed?: boolean
    responsibleId: number
    dueDate: Date | string
    completedDate?: Date | string | null
    completedById?: number | null
  }

  export type EmployeeTaskCreateOrConnectWithoutEmployee_EmployeeToEmployeeTask_employeeIdInput = {
    where: EmployeeTaskWhereUniqueInput
    create: XOR<EmployeeTaskCreateWithoutEmployee_EmployeeToEmployeeTask_employeeIdInput, EmployeeTaskUncheckedCreateWithoutEmployee_EmployeeToEmployeeTask_employeeIdInput>
  }

  export type EmployeeTaskCreateManyEmployee_EmployeeToEmployeeTask_employeeIdInputEnvelope = {
    data: Enumerable<EmployeeTaskCreateManyEmployee_EmployeeToEmployeeTask_employeeIdInput>
    skipDuplicates?: boolean
  }

  export type EmployeeTaskCreateWithoutEmployee_EmployeeToEmployeeTask_responsibleIdInput = {
    id: string
    completed?: boolean
    dueDate: Date | string
    completedDate?: Date | string | null
    Employee_EmployeeToEmployeeTask_completedById?: EmployeeCreateNestedOneWithoutEmployeeTask_EmployeeToEmployeeTask_completedByIdInput
    Employee_EmployeeToEmployeeTask_employeeId: EmployeeCreateNestedOneWithoutEmployeeTask_EmployeeToEmployeeTask_employeeIdInput
    Task: TaskCreateNestedOneWithoutEmployeeTaskInput
  }

  export type EmployeeTaskUncheckedCreateWithoutEmployee_EmployeeToEmployeeTask_responsibleIdInput = {
    id: string
    taskId: string
    completed?: boolean
    employeeId: number
    dueDate: Date | string
    completedDate?: Date | string | null
    completedById?: number | null
  }

  export type EmployeeTaskCreateOrConnectWithoutEmployee_EmployeeToEmployeeTask_responsibleIdInput = {
    where: EmployeeTaskWhereUniqueInput
    create: XOR<EmployeeTaskCreateWithoutEmployee_EmployeeToEmployeeTask_responsibleIdInput, EmployeeTaskUncheckedCreateWithoutEmployee_EmployeeToEmployeeTask_responsibleIdInput>
  }

  export type EmployeeTaskCreateManyEmployee_EmployeeToEmployeeTask_responsibleIdInputEnvelope = {
    data: Enumerable<EmployeeTaskCreateManyEmployee_EmployeeToEmployeeTask_responsibleIdInput>
    skipDuplicates?: boolean
  }

  export type NotificationCreateWithoutEmployeeInput = {
    id: string
    createdAt?: Date | string
    read?: boolean
    description: string
  }

  export type NotificationUncheckedCreateWithoutEmployeeInput = {
    id: string
    createdAt?: Date | string
    read?: boolean
    description: string
  }

  export type NotificationCreateOrConnectWithoutEmployeeInput = {
    where: NotificationWhereUniqueInput
    create: XOR<NotificationCreateWithoutEmployeeInput, NotificationUncheckedCreateWithoutEmployeeInput>
  }

  export type NotificationCreateManyEmployeeInputEnvelope = {
    data: Enumerable<NotificationCreateManyEmployeeInput>
    skipDuplicates?: boolean
  }

  export type TaskCreateWithoutEmployeeInput = {
    id: string
    title: string
    description?: string | null
    link?: string | null
    global?: boolean
    createdAt?: Date | string
    active?: boolean
    Phase?: PhaseCreateNestedOneWithoutTaskInput
    EmployeeTask?: EmployeeTaskCreateNestedManyWithoutTaskInput
    Profession?: ProfessionCreateNestedManyWithoutTaskInput
    Tag?: TagCreateNestedManyWithoutTaskInput
  }

  export type TaskUncheckedCreateWithoutEmployeeInput = {
    id: string
    title: string
    description?: string | null
    link?: string | null
    global?: boolean
    phaseId?: string | null
    createdAt?: Date | string
    active?: boolean
    EmployeeTask?: EmployeeTaskUncheckedCreateNestedManyWithoutTaskInput
  }

  export type TaskCreateOrConnectWithoutEmployeeInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutEmployeeInput, TaskUncheckedCreateWithoutEmployeeInput>
  }

  export type TaskCreateManyEmployeeInputEnvelope = {
    data: Enumerable<TaskCreateManyEmployeeInput>
    skipDuplicates?: boolean
  }

  export type EmployeeUpsertWithoutOther_EmployeeInput = {
    update: XOR<EmployeeUpdateWithoutOther_EmployeeInput, EmployeeUncheckedUpdateWithoutOther_EmployeeInput>
    create: XOR<EmployeeCreateWithoutOther_EmployeeInput, EmployeeUncheckedCreateWithoutOther_EmployeeInput>
  }

  export type EmployeeUpdateWithoutOther_EmployeeInput = {
    title?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    dateOfEmployment?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    terminationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    Employee?: EmployeeUpdateOneWithoutOther_EmployeeInput
    Profession?: ProfessionUpdateOneRequiredWithoutEmployeeInput
    EmployeeSettings?: EmployeeSettingsUpdateOneWithoutEmployeeInput
    EmployeeTask_EmployeeToEmployeeTask_completedById?: EmployeeTaskUpdateManyWithoutEmployee_EmployeeToEmployeeTask_completedByIdInput
    EmployeeTask_EmployeeToEmployeeTask_employeeId?: EmployeeTaskUpdateManyWithoutEmployee_EmployeeToEmployeeTask_employeeIdInput
    EmployeeTask_EmployeeToEmployeeTask_responsibleId?: EmployeeTaskUpdateManyWithoutEmployee_EmployeeToEmployeeTask_responsibleIdInput
    Notification?: NotificationUpdateManyWithoutEmployeeInput
    Task?: TaskUpdateManyWithoutEmployeeInput
  }

  export type EmployeeUncheckedUpdateWithoutOther_EmployeeInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    professionId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    dateOfEmployment?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    terminationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    hrManagerId?: NullableIntFieldUpdateOperationsInput | number | null
    EmployeeSettings?: EmployeeSettingsUncheckedUpdateOneWithoutEmployeeInput
    EmployeeTask_EmployeeToEmployeeTask_completedById?: EmployeeTaskUncheckedUpdateManyWithoutEmployee_EmployeeToEmployeeTask_completedByIdInput
    EmployeeTask_EmployeeToEmployeeTask_employeeId?: EmployeeTaskUncheckedUpdateManyWithoutEmployee_EmployeeToEmployeeTask_employeeIdInput
    EmployeeTask_EmployeeToEmployeeTask_responsibleId?: EmployeeTaskUncheckedUpdateManyWithoutEmployee_EmployeeToEmployeeTask_responsibleIdInput
    Notification?: NotificationUncheckedUpdateManyWithoutEmployeeInput
    Task?: TaskUncheckedUpdateManyWithoutEmployeeInput
  }

  export type ProfessionUpsertWithoutEmployeeInput = {
    update: XOR<ProfessionUpdateWithoutEmployeeInput, ProfessionUncheckedUpdateWithoutEmployeeInput>
    create: XOR<ProfessionCreateWithoutEmployeeInput, ProfessionUncheckedCreateWithoutEmployeeInput>
  }

  export type ProfessionUpdateWithoutEmployeeInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    Task?: TaskUpdateManyWithoutProfessionInput
  }

  export type ProfessionUncheckedUpdateWithoutEmployeeInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
  }

  export type EmployeeUpsertWithWhereUniqueWithoutEmployeeInput = {
    where: EmployeeWhereUniqueInput
    update: XOR<EmployeeUpdateWithoutEmployeeInput, EmployeeUncheckedUpdateWithoutEmployeeInput>
    create: XOR<EmployeeCreateWithoutEmployeeInput, EmployeeUncheckedCreateWithoutEmployeeInput>
  }

  export type EmployeeUpdateWithWhereUniqueWithoutEmployeeInput = {
    where: EmployeeWhereUniqueInput
    data: XOR<EmployeeUpdateWithoutEmployeeInput, EmployeeUncheckedUpdateWithoutEmployeeInput>
  }

  export type EmployeeUpdateManyWithWhereWithoutEmployeeInput = {
    where: EmployeeScalarWhereInput
    data: XOR<EmployeeUpdateManyMutationInput, EmployeeUncheckedUpdateManyWithoutOther_EmployeeInput>
  }

  export type EmployeeScalarWhereInput = {
    AND?: Enumerable<EmployeeScalarWhereInput>
    OR?: Enumerable<EmployeeScalarWhereInput>
    NOT?: Enumerable<EmployeeScalarWhereInput>
    id?: IntFilter | number
    title?: StringNullableFilter | string | null
    email?: StringFilter | string
    professionId?: StringFilter | string
    firstName?: StringFilter | string
    lastName?: StringFilter | string
    birthDate?: DateTimeFilter | Date | string
    dateOfEmployment?: DateTimeNullableFilter | Date | string | null
    terminationDate?: DateTimeNullableFilter | Date | string | null
    imageUrl?: StringNullableFilter | string | null
    hrManagerId?: IntNullableFilter | number | null
  }

  export type EmployeeSettingsUpsertWithoutEmployeeInput = {
    update: XOR<EmployeeSettingsUpdateWithoutEmployeeInput, EmployeeSettingsUncheckedUpdateWithoutEmployeeInput>
    create: XOR<EmployeeSettingsCreateWithoutEmployeeInput, EmployeeSettingsUncheckedCreateWithoutEmployeeInput>
  }

  export type EmployeeSettingsUpdateWithoutEmployeeInput = {
    slack?: BoolFieldUpdateOperationsInput | boolean
    notificationSettings?: EmployeeSettingsUpdatenotificationSettingsInput | Enumerable<NotificationType>
  }

  export type EmployeeSettingsUncheckedUpdateWithoutEmployeeInput = {
    slack?: BoolFieldUpdateOperationsInput | boolean
    notificationSettings?: EmployeeSettingsUpdatenotificationSettingsInput | Enumerable<NotificationType>
  }

  export type EmployeeTaskUpsertWithWhereUniqueWithoutEmployee_EmployeeToEmployeeTask_completedByIdInput = {
    where: EmployeeTaskWhereUniqueInput
    update: XOR<EmployeeTaskUpdateWithoutEmployee_EmployeeToEmployeeTask_completedByIdInput, EmployeeTaskUncheckedUpdateWithoutEmployee_EmployeeToEmployeeTask_completedByIdInput>
    create: XOR<EmployeeTaskCreateWithoutEmployee_EmployeeToEmployeeTask_completedByIdInput, EmployeeTaskUncheckedCreateWithoutEmployee_EmployeeToEmployeeTask_completedByIdInput>
  }

  export type EmployeeTaskUpdateWithWhereUniqueWithoutEmployee_EmployeeToEmployeeTask_completedByIdInput = {
    where: EmployeeTaskWhereUniqueInput
    data: XOR<EmployeeTaskUpdateWithoutEmployee_EmployeeToEmployeeTask_completedByIdInput, EmployeeTaskUncheckedUpdateWithoutEmployee_EmployeeToEmployeeTask_completedByIdInput>
  }

  export type EmployeeTaskUpdateManyWithWhereWithoutEmployee_EmployeeToEmployeeTask_completedByIdInput = {
    where: EmployeeTaskScalarWhereInput
    data: XOR<EmployeeTaskUpdateManyMutationInput, EmployeeTaskUncheckedUpdateManyWithoutEmployeeTask_EmployeeToEmployeeTask_completedByIdInput>
  }

  export type EmployeeTaskScalarWhereInput = {
    AND?: Enumerable<EmployeeTaskScalarWhereInput>
    OR?: Enumerable<EmployeeTaskScalarWhereInput>
    NOT?: Enumerable<EmployeeTaskScalarWhereInput>
    id?: StringFilter | string
    taskId?: StringFilter | string
    completed?: BoolFilter | boolean
    employeeId?: IntFilter | number
    responsibleId?: IntFilter | number
    dueDate?: DateTimeFilter | Date | string
    completedDate?: DateTimeNullableFilter | Date | string | null
    completedById?: IntNullableFilter | number | null
  }

  export type EmployeeTaskUpsertWithWhereUniqueWithoutEmployee_EmployeeToEmployeeTask_employeeIdInput = {
    where: EmployeeTaskWhereUniqueInput
    update: XOR<EmployeeTaskUpdateWithoutEmployee_EmployeeToEmployeeTask_employeeIdInput, EmployeeTaskUncheckedUpdateWithoutEmployee_EmployeeToEmployeeTask_employeeIdInput>
    create: XOR<EmployeeTaskCreateWithoutEmployee_EmployeeToEmployeeTask_employeeIdInput, EmployeeTaskUncheckedCreateWithoutEmployee_EmployeeToEmployeeTask_employeeIdInput>
  }

  export type EmployeeTaskUpdateWithWhereUniqueWithoutEmployee_EmployeeToEmployeeTask_employeeIdInput = {
    where: EmployeeTaskWhereUniqueInput
    data: XOR<EmployeeTaskUpdateWithoutEmployee_EmployeeToEmployeeTask_employeeIdInput, EmployeeTaskUncheckedUpdateWithoutEmployee_EmployeeToEmployeeTask_employeeIdInput>
  }

  export type EmployeeTaskUpdateManyWithWhereWithoutEmployee_EmployeeToEmployeeTask_employeeIdInput = {
    where: EmployeeTaskScalarWhereInput
    data: XOR<EmployeeTaskUpdateManyMutationInput, EmployeeTaskUncheckedUpdateManyWithoutEmployeeTask_EmployeeToEmployeeTask_employeeIdInput>
  }

  export type EmployeeTaskUpsertWithWhereUniqueWithoutEmployee_EmployeeToEmployeeTask_responsibleIdInput = {
    where: EmployeeTaskWhereUniqueInput
    update: XOR<EmployeeTaskUpdateWithoutEmployee_EmployeeToEmployeeTask_responsibleIdInput, EmployeeTaskUncheckedUpdateWithoutEmployee_EmployeeToEmployeeTask_responsibleIdInput>
    create: XOR<EmployeeTaskCreateWithoutEmployee_EmployeeToEmployeeTask_responsibleIdInput, EmployeeTaskUncheckedCreateWithoutEmployee_EmployeeToEmployeeTask_responsibleIdInput>
  }

  export type EmployeeTaskUpdateWithWhereUniqueWithoutEmployee_EmployeeToEmployeeTask_responsibleIdInput = {
    where: EmployeeTaskWhereUniqueInput
    data: XOR<EmployeeTaskUpdateWithoutEmployee_EmployeeToEmployeeTask_responsibleIdInput, EmployeeTaskUncheckedUpdateWithoutEmployee_EmployeeToEmployeeTask_responsibleIdInput>
  }

  export type EmployeeTaskUpdateManyWithWhereWithoutEmployee_EmployeeToEmployeeTask_responsibleIdInput = {
    where: EmployeeTaskScalarWhereInput
    data: XOR<EmployeeTaskUpdateManyMutationInput, EmployeeTaskUncheckedUpdateManyWithoutEmployeeTask_EmployeeToEmployeeTask_responsibleIdInput>
  }

  export type NotificationUpsertWithWhereUniqueWithoutEmployeeInput = {
    where: NotificationWhereUniqueInput
    update: XOR<NotificationUpdateWithoutEmployeeInput, NotificationUncheckedUpdateWithoutEmployeeInput>
    create: XOR<NotificationCreateWithoutEmployeeInput, NotificationUncheckedCreateWithoutEmployeeInput>
  }

  export type NotificationUpdateWithWhereUniqueWithoutEmployeeInput = {
    where: NotificationWhereUniqueInput
    data: XOR<NotificationUpdateWithoutEmployeeInput, NotificationUncheckedUpdateWithoutEmployeeInput>
  }

  export type NotificationUpdateManyWithWhereWithoutEmployeeInput = {
    where: NotificationScalarWhereInput
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyWithoutNotificationInput>
  }

  export type NotificationScalarWhereInput = {
    AND?: Enumerable<NotificationScalarWhereInput>
    OR?: Enumerable<NotificationScalarWhereInput>
    NOT?: Enumerable<NotificationScalarWhereInput>
    id?: StringFilter | string
    employeeId?: IntFilter | number
    createdAt?: DateTimeFilter | Date | string
    read?: BoolFilter | boolean
    description?: StringFilter | string
  }

  export type TaskUpsertWithWhereUniqueWithoutEmployeeInput = {
    where: TaskWhereUniqueInput
    update: XOR<TaskUpdateWithoutEmployeeInput, TaskUncheckedUpdateWithoutEmployeeInput>
    create: XOR<TaskCreateWithoutEmployeeInput, TaskUncheckedCreateWithoutEmployeeInput>
  }

  export type TaskUpdateWithWhereUniqueWithoutEmployeeInput = {
    where: TaskWhereUniqueInput
    data: XOR<TaskUpdateWithoutEmployeeInput, TaskUncheckedUpdateWithoutEmployeeInput>
  }

  export type TaskUpdateManyWithWhereWithoutEmployeeInput = {
    where: TaskScalarWhereInput
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyWithoutTaskInput>
  }

  export type TaskScalarWhereInput = {
    AND?: Enumerable<TaskScalarWhereInput>
    OR?: Enumerable<TaskScalarWhereInput>
    NOT?: Enumerable<TaskScalarWhereInput>
    id?: StringFilter | string
    title?: StringFilter | string
    description?: StringNullableFilter | string | null
    link?: StringNullableFilter | string | null
    global?: BoolFilter | boolean
    phaseId?: StringNullableFilter | string | null
    responsibleId?: IntNullableFilter | number | null
    createdAt?: DateTimeFilter | Date | string
    active?: BoolFilter | boolean
  }

  export type EmployeeCreateWithoutEmployeeSettingsInput = {
    title?: string | null
    email: string
    firstName: string
    lastName: string
    birthDate: Date | string
    dateOfEmployment?: Date | string | null
    terminationDate?: Date | string | null
    imageUrl?: string | null
    Employee?: EmployeeCreateNestedOneWithoutOther_EmployeeInput
    Profession: ProfessionCreateNestedOneWithoutEmployeeInput
    other_Employee?: EmployeeCreateNestedManyWithoutEmployeeInput
    EmployeeTask_EmployeeToEmployeeTask_completedById?: EmployeeTaskCreateNestedManyWithoutEmployee_EmployeeToEmployeeTask_completedByIdInput
    EmployeeTask_EmployeeToEmployeeTask_employeeId?: EmployeeTaskCreateNestedManyWithoutEmployee_EmployeeToEmployeeTask_employeeIdInput
    EmployeeTask_EmployeeToEmployeeTask_responsibleId?: EmployeeTaskCreateNestedManyWithoutEmployee_EmployeeToEmployeeTask_responsibleIdInput
    Notification?: NotificationCreateNestedManyWithoutEmployeeInput
    Task?: TaskCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeUncheckedCreateWithoutEmployeeSettingsInput = {
    id?: number
    title?: string | null
    email: string
    professionId: string
    firstName: string
    lastName: string
    birthDate: Date | string
    dateOfEmployment?: Date | string | null
    terminationDate?: Date | string | null
    imageUrl?: string | null
    hrManagerId?: number | null
    other_Employee?: EmployeeUncheckedCreateNestedManyWithoutEmployeeInput
    EmployeeTask_EmployeeToEmployeeTask_completedById?: EmployeeTaskUncheckedCreateNestedManyWithoutEmployee_EmployeeToEmployeeTask_completedByIdInput
    EmployeeTask_EmployeeToEmployeeTask_employeeId?: EmployeeTaskUncheckedCreateNestedManyWithoutEmployee_EmployeeToEmployeeTask_employeeIdInput
    EmployeeTask_EmployeeToEmployeeTask_responsibleId?: EmployeeTaskUncheckedCreateNestedManyWithoutEmployee_EmployeeToEmployeeTask_responsibleIdInput
    Notification?: NotificationUncheckedCreateNestedManyWithoutEmployeeInput
    Task?: TaskUncheckedCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeCreateOrConnectWithoutEmployeeSettingsInput = {
    where: EmployeeWhereUniqueInput
    create: XOR<EmployeeCreateWithoutEmployeeSettingsInput, EmployeeUncheckedCreateWithoutEmployeeSettingsInput>
  }

  export type EmployeeUpsertWithoutEmployeeSettingsInput = {
    update: XOR<EmployeeUpdateWithoutEmployeeSettingsInput, EmployeeUncheckedUpdateWithoutEmployeeSettingsInput>
    create: XOR<EmployeeCreateWithoutEmployeeSettingsInput, EmployeeUncheckedCreateWithoutEmployeeSettingsInput>
  }

  export type EmployeeUpdateWithoutEmployeeSettingsInput = {
    title?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    dateOfEmployment?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    terminationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    Employee?: EmployeeUpdateOneWithoutOther_EmployeeInput
    Profession?: ProfessionUpdateOneRequiredWithoutEmployeeInput
    other_Employee?: EmployeeUpdateManyWithoutEmployeeInput
    EmployeeTask_EmployeeToEmployeeTask_completedById?: EmployeeTaskUpdateManyWithoutEmployee_EmployeeToEmployeeTask_completedByIdInput
    EmployeeTask_EmployeeToEmployeeTask_employeeId?: EmployeeTaskUpdateManyWithoutEmployee_EmployeeToEmployeeTask_employeeIdInput
    EmployeeTask_EmployeeToEmployeeTask_responsibleId?: EmployeeTaskUpdateManyWithoutEmployee_EmployeeToEmployeeTask_responsibleIdInput
    Notification?: NotificationUpdateManyWithoutEmployeeInput
    Task?: TaskUpdateManyWithoutEmployeeInput
  }

  export type EmployeeUncheckedUpdateWithoutEmployeeSettingsInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    professionId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    dateOfEmployment?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    terminationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    hrManagerId?: NullableIntFieldUpdateOperationsInput | number | null
    other_Employee?: EmployeeUncheckedUpdateManyWithoutEmployeeInput
    EmployeeTask_EmployeeToEmployeeTask_completedById?: EmployeeTaskUncheckedUpdateManyWithoutEmployee_EmployeeToEmployeeTask_completedByIdInput
    EmployeeTask_EmployeeToEmployeeTask_employeeId?: EmployeeTaskUncheckedUpdateManyWithoutEmployee_EmployeeToEmployeeTask_employeeIdInput
    EmployeeTask_EmployeeToEmployeeTask_responsibleId?: EmployeeTaskUncheckedUpdateManyWithoutEmployee_EmployeeToEmployeeTask_responsibleIdInput
    Notification?: NotificationUncheckedUpdateManyWithoutEmployeeInput
    Task?: TaskUncheckedUpdateManyWithoutEmployeeInput
  }

  export type EmployeeCreateWithoutEmployeeTask_EmployeeToEmployeeTask_completedByIdInput = {
    title?: string | null
    email: string
    firstName: string
    lastName: string
    birthDate: Date | string
    dateOfEmployment?: Date | string | null
    terminationDate?: Date | string | null
    imageUrl?: string | null
    Employee?: EmployeeCreateNestedOneWithoutOther_EmployeeInput
    Profession: ProfessionCreateNestedOneWithoutEmployeeInput
    other_Employee?: EmployeeCreateNestedManyWithoutEmployeeInput
    EmployeeSettings?: EmployeeSettingsCreateNestedOneWithoutEmployeeInput
    EmployeeTask_EmployeeToEmployeeTask_employeeId?: EmployeeTaskCreateNestedManyWithoutEmployee_EmployeeToEmployeeTask_employeeIdInput
    EmployeeTask_EmployeeToEmployeeTask_responsibleId?: EmployeeTaskCreateNestedManyWithoutEmployee_EmployeeToEmployeeTask_responsibleIdInput
    Notification?: NotificationCreateNestedManyWithoutEmployeeInput
    Task?: TaskCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeUncheckedCreateWithoutEmployeeTask_EmployeeToEmployeeTask_completedByIdInput = {
    id?: number
    title?: string | null
    email: string
    professionId: string
    firstName: string
    lastName: string
    birthDate: Date | string
    dateOfEmployment?: Date | string | null
    terminationDate?: Date | string | null
    imageUrl?: string | null
    hrManagerId?: number | null
    other_Employee?: EmployeeUncheckedCreateNestedManyWithoutEmployeeInput
    EmployeeSettings?: EmployeeSettingsUncheckedCreateNestedOneWithoutEmployeeInput
    EmployeeTask_EmployeeToEmployeeTask_employeeId?: EmployeeTaskUncheckedCreateNestedManyWithoutEmployee_EmployeeToEmployeeTask_employeeIdInput
    EmployeeTask_EmployeeToEmployeeTask_responsibleId?: EmployeeTaskUncheckedCreateNestedManyWithoutEmployee_EmployeeToEmployeeTask_responsibleIdInput
    Notification?: NotificationUncheckedCreateNestedManyWithoutEmployeeInput
    Task?: TaskUncheckedCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeCreateOrConnectWithoutEmployeeTask_EmployeeToEmployeeTask_completedByIdInput = {
    where: EmployeeWhereUniqueInput
    create: XOR<EmployeeCreateWithoutEmployeeTask_EmployeeToEmployeeTask_completedByIdInput, EmployeeUncheckedCreateWithoutEmployeeTask_EmployeeToEmployeeTask_completedByIdInput>
  }

  export type EmployeeCreateWithoutEmployeeTask_EmployeeToEmployeeTask_employeeIdInput = {
    title?: string | null
    email: string
    firstName: string
    lastName: string
    birthDate: Date | string
    dateOfEmployment?: Date | string | null
    terminationDate?: Date | string | null
    imageUrl?: string | null
    Employee?: EmployeeCreateNestedOneWithoutOther_EmployeeInput
    Profession: ProfessionCreateNestedOneWithoutEmployeeInput
    other_Employee?: EmployeeCreateNestedManyWithoutEmployeeInput
    EmployeeSettings?: EmployeeSettingsCreateNestedOneWithoutEmployeeInput
    EmployeeTask_EmployeeToEmployeeTask_completedById?: EmployeeTaskCreateNestedManyWithoutEmployee_EmployeeToEmployeeTask_completedByIdInput
    EmployeeTask_EmployeeToEmployeeTask_responsibleId?: EmployeeTaskCreateNestedManyWithoutEmployee_EmployeeToEmployeeTask_responsibleIdInput
    Notification?: NotificationCreateNestedManyWithoutEmployeeInput
    Task?: TaskCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeUncheckedCreateWithoutEmployeeTask_EmployeeToEmployeeTask_employeeIdInput = {
    id?: number
    title?: string | null
    email: string
    professionId: string
    firstName: string
    lastName: string
    birthDate: Date | string
    dateOfEmployment?: Date | string | null
    terminationDate?: Date | string | null
    imageUrl?: string | null
    hrManagerId?: number | null
    other_Employee?: EmployeeUncheckedCreateNestedManyWithoutEmployeeInput
    EmployeeSettings?: EmployeeSettingsUncheckedCreateNestedOneWithoutEmployeeInput
    EmployeeTask_EmployeeToEmployeeTask_completedById?: EmployeeTaskUncheckedCreateNestedManyWithoutEmployee_EmployeeToEmployeeTask_completedByIdInput
    EmployeeTask_EmployeeToEmployeeTask_responsibleId?: EmployeeTaskUncheckedCreateNestedManyWithoutEmployee_EmployeeToEmployeeTask_responsibleIdInput
    Notification?: NotificationUncheckedCreateNestedManyWithoutEmployeeInput
    Task?: TaskUncheckedCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeCreateOrConnectWithoutEmployeeTask_EmployeeToEmployeeTask_employeeIdInput = {
    where: EmployeeWhereUniqueInput
    create: XOR<EmployeeCreateWithoutEmployeeTask_EmployeeToEmployeeTask_employeeIdInput, EmployeeUncheckedCreateWithoutEmployeeTask_EmployeeToEmployeeTask_employeeIdInput>
  }

  export type EmployeeCreateWithoutEmployeeTask_EmployeeToEmployeeTask_responsibleIdInput = {
    title?: string | null
    email: string
    firstName: string
    lastName: string
    birthDate: Date | string
    dateOfEmployment?: Date | string | null
    terminationDate?: Date | string | null
    imageUrl?: string | null
    Employee?: EmployeeCreateNestedOneWithoutOther_EmployeeInput
    Profession: ProfessionCreateNestedOneWithoutEmployeeInput
    other_Employee?: EmployeeCreateNestedManyWithoutEmployeeInput
    EmployeeSettings?: EmployeeSettingsCreateNestedOneWithoutEmployeeInput
    EmployeeTask_EmployeeToEmployeeTask_completedById?: EmployeeTaskCreateNestedManyWithoutEmployee_EmployeeToEmployeeTask_completedByIdInput
    EmployeeTask_EmployeeToEmployeeTask_employeeId?: EmployeeTaskCreateNestedManyWithoutEmployee_EmployeeToEmployeeTask_employeeIdInput
    Notification?: NotificationCreateNestedManyWithoutEmployeeInput
    Task?: TaskCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeUncheckedCreateWithoutEmployeeTask_EmployeeToEmployeeTask_responsibleIdInput = {
    id?: number
    title?: string | null
    email: string
    professionId: string
    firstName: string
    lastName: string
    birthDate: Date | string
    dateOfEmployment?: Date | string | null
    terminationDate?: Date | string | null
    imageUrl?: string | null
    hrManagerId?: number | null
    other_Employee?: EmployeeUncheckedCreateNestedManyWithoutEmployeeInput
    EmployeeSettings?: EmployeeSettingsUncheckedCreateNestedOneWithoutEmployeeInput
    EmployeeTask_EmployeeToEmployeeTask_completedById?: EmployeeTaskUncheckedCreateNestedManyWithoutEmployee_EmployeeToEmployeeTask_completedByIdInput
    EmployeeTask_EmployeeToEmployeeTask_employeeId?: EmployeeTaskUncheckedCreateNestedManyWithoutEmployee_EmployeeToEmployeeTask_employeeIdInput
    Notification?: NotificationUncheckedCreateNestedManyWithoutEmployeeInput
    Task?: TaskUncheckedCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeCreateOrConnectWithoutEmployeeTask_EmployeeToEmployeeTask_responsibleIdInput = {
    where: EmployeeWhereUniqueInput
    create: XOR<EmployeeCreateWithoutEmployeeTask_EmployeeToEmployeeTask_responsibleIdInput, EmployeeUncheckedCreateWithoutEmployeeTask_EmployeeToEmployeeTask_responsibleIdInput>
  }

  export type TaskCreateWithoutEmployeeTaskInput = {
    id: string
    title: string
    description?: string | null
    link?: string | null
    global?: boolean
    createdAt?: Date | string
    active?: boolean
    Phase?: PhaseCreateNestedOneWithoutTaskInput
    Employee?: EmployeeCreateNestedOneWithoutTaskInput
    Profession?: ProfessionCreateNestedManyWithoutTaskInput
    Tag?: TagCreateNestedManyWithoutTaskInput
  }

  export type TaskUncheckedCreateWithoutEmployeeTaskInput = {
    id: string
    title: string
    description?: string | null
    link?: string | null
    global?: boolean
    phaseId?: string | null
    responsibleId?: number | null
    createdAt?: Date | string
    active?: boolean
  }

  export type TaskCreateOrConnectWithoutEmployeeTaskInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutEmployeeTaskInput, TaskUncheckedCreateWithoutEmployeeTaskInput>
  }

  export type EmployeeUpsertWithoutEmployeeTask_EmployeeToEmployeeTask_completedByIdInput = {
    update: XOR<EmployeeUpdateWithoutEmployeeTask_EmployeeToEmployeeTask_completedByIdInput, EmployeeUncheckedUpdateWithoutEmployeeTask_EmployeeToEmployeeTask_completedByIdInput>
    create: XOR<EmployeeCreateWithoutEmployeeTask_EmployeeToEmployeeTask_completedByIdInput, EmployeeUncheckedCreateWithoutEmployeeTask_EmployeeToEmployeeTask_completedByIdInput>
  }

  export type EmployeeUpdateWithoutEmployeeTask_EmployeeToEmployeeTask_completedByIdInput = {
    title?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    dateOfEmployment?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    terminationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    Employee?: EmployeeUpdateOneWithoutOther_EmployeeInput
    Profession?: ProfessionUpdateOneRequiredWithoutEmployeeInput
    other_Employee?: EmployeeUpdateManyWithoutEmployeeInput
    EmployeeSettings?: EmployeeSettingsUpdateOneWithoutEmployeeInput
    EmployeeTask_EmployeeToEmployeeTask_employeeId?: EmployeeTaskUpdateManyWithoutEmployee_EmployeeToEmployeeTask_employeeIdInput
    EmployeeTask_EmployeeToEmployeeTask_responsibleId?: EmployeeTaskUpdateManyWithoutEmployee_EmployeeToEmployeeTask_responsibleIdInput
    Notification?: NotificationUpdateManyWithoutEmployeeInput
    Task?: TaskUpdateManyWithoutEmployeeInput
  }

  export type EmployeeUncheckedUpdateWithoutEmployeeTask_EmployeeToEmployeeTask_completedByIdInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    professionId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    dateOfEmployment?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    terminationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    hrManagerId?: NullableIntFieldUpdateOperationsInput | number | null
    other_Employee?: EmployeeUncheckedUpdateManyWithoutEmployeeInput
    EmployeeSettings?: EmployeeSettingsUncheckedUpdateOneWithoutEmployeeInput
    EmployeeTask_EmployeeToEmployeeTask_employeeId?: EmployeeTaskUncheckedUpdateManyWithoutEmployee_EmployeeToEmployeeTask_employeeIdInput
    EmployeeTask_EmployeeToEmployeeTask_responsibleId?: EmployeeTaskUncheckedUpdateManyWithoutEmployee_EmployeeToEmployeeTask_responsibleIdInput
    Notification?: NotificationUncheckedUpdateManyWithoutEmployeeInput
    Task?: TaskUncheckedUpdateManyWithoutEmployeeInput
  }

  export type EmployeeUpsertWithoutEmployeeTask_EmployeeToEmployeeTask_employeeIdInput = {
    update: XOR<EmployeeUpdateWithoutEmployeeTask_EmployeeToEmployeeTask_employeeIdInput, EmployeeUncheckedUpdateWithoutEmployeeTask_EmployeeToEmployeeTask_employeeIdInput>
    create: XOR<EmployeeCreateWithoutEmployeeTask_EmployeeToEmployeeTask_employeeIdInput, EmployeeUncheckedCreateWithoutEmployeeTask_EmployeeToEmployeeTask_employeeIdInput>
  }

  export type EmployeeUpdateWithoutEmployeeTask_EmployeeToEmployeeTask_employeeIdInput = {
    title?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    dateOfEmployment?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    terminationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    Employee?: EmployeeUpdateOneWithoutOther_EmployeeInput
    Profession?: ProfessionUpdateOneRequiredWithoutEmployeeInput
    other_Employee?: EmployeeUpdateManyWithoutEmployeeInput
    EmployeeSettings?: EmployeeSettingsUpdateOneWithoutEmployeeInput
    EmployeeTask_EmployeeToEmployeeTask_completedById?: EmployeeTaskUpdateManyWithoutEmployee_EmployeeToEmployeeTask_completedByIdInput
    EmployeeTask_EmployeeToEmployeeTask_responsibleId?: EmployeeTaskUpdateManyWithoutEmployee_EmployeeToEmployeeTask_responsibleIdInput
    Notification?: NotificationUpdateManyWithoutEmployeeInput
    Task?: TaskUpdateManyWithoutEmployeeInput
  }

  export type EmployeeUncheckedUpdateWithoutEmployeeTask_EmployeeToEmployeeTask_employeeIdInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    professionId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    dateOfEmployment?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    terminationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    hrManagerId?: NullableIntFieldUpdateOperationsInput | number | null
    other_Employee?: EmployeeUncheckedUpdateManyWithoutEmployeeInput
    EmployeeSettings?: EmployeeSettingsUncheckedUpdateOneWithoutEmployeeInput
    EmployeeTask_EmployeeToEmployeeTask_completedById?: EmployeeTaskUncheckedUpdateManyWithoutEmployee_EmployeeToEmployeeTask_completedByIdInput
    EmployeeTask_EmployeeToEmployeeTask_responsibleId?: EmployeeTaskUncheckedUpdateManyWithoutEmployee_EmployeeToEmployeeTask_responsibleIdInput
    Notification?: NotificationUncheckedUpdateManyWithoutEmployeeInput
    Task?: TaskUncheckedUpdateManyWithoutEmployeeInput
  }

  export type EmployeeUpsertWithoutEmployeeTask_EmployeeToEmployeeTask_responsibleIdInput = {
    update: XOR<EmployeeUpdateWithoutEmployeeTask_EmployeeToEmployeeTask_responsibleIdInput, EmployeeUncheckedUpdateWithoutEmployeeTask_EmployeeToEmployeeTask_responsibleIdInput>
    create: XOR<EmployeeCreateWithoutEmployeeTask_EmployeeToEmployeeTask_responsibleIdInput, EmployeeUncheckedCreateWithoutEmployeeTask_EmployeeToEmployeeTask_responsibleIdInput>
  }

  export type EmployeeUpdateWithoutEmployeeTask_EmployeeToEmployeeTask_responsibleIdInput = {
    title?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    dateOfEmployment?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    terminationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    Employee?: EmployeeUpdateOneWithoutOther_EmployeeInput
    Profession?: ProfessionUpdateOneRequiredWithoutEmployeeInput
    other_Employee?: EmployeeUpdateManyWithoutEmployeeInput
    EmployeeSettings?: EmployeeSettingsUpdateOneWithoutEmployeeInput
    EmployeeTask_EmployeeToEmployeeTask_completedById?: EmployeeTaskUpdateManyWithoutEmployee_EmployeeToEmployeeTask_completedByIdInput
    EmployeeTask_EmployeeToEmployeeTask_employeeId?: EmployeeTaskUpdateManyWithoutEmployee_EmployeeToEmployeeTask_employeeIdInput
    Notification?: NotificationUpdateManyWithoutEmployeeInput
    Task?: TaskUpdateManyWithoutEmployeeInput
  }

  export type EmployeeUncheckedUpdateWithoutEmployeeTask_EmployeeToEmployeeTask_responsibleIdInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    professionId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    dateOfEmployment?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    terminationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    hrManagerId?: NullableIntFieldUpdateOperationsInput | number | null
    other_Employee?: EmployeeUncheckedUpdateManyWithoutEmployeeInput
    EmployeeSettings?: EmployeeSettingsUncheckedUpdateOneWithoutEmployeeInput
    EmployeeTask_EmployeeToEmployeeTask_completedById?: EmployeeTaskUncheckedUpdateManyWithoutEmployee_EmployeeToEmployeeTask_completedByIdInput
    EmployeeTask_EmployeeToEmployeeTask_employeeId?: EmployeeTaskUncheckedUpdateManyWithoutEmployee_EmployeeToEmployeeTask_employeeIdInput
    Notification?: NotificationUncheckedUpdateManyWithoutEmployeeInput
    Task?: TaskUncheckedUpdateManyWithoutEmployeeInput
  }

  export type TaskUpsertWithoutEmployeeTaskInput = {
    update: XOR<TaskUpdateWithoutEmployeeTaskInput, TaskUncheckedUpdateWithoutEmployeeTaskInput>
    create: XOR<TaskCreateWithoutEmployeeTaskInput, TaskUncheckedCreateWithoutEmployeeTaskInput>
  }

  export type TaskUpdateWithoutEmployeeTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    link?: NullableStringFieldUpdateOperationsInput | string | null
    global?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    active?: BoolFieldUpdateOperationsInput | boolean
    Phase?: PhaseUpdateOneWithoutTaskInput
    Employee?: EmployeeUpdateOneWithoutTaskInput
    Profession?: ProfessionUpdateManyWithoutTaskInput
    Tag?: TagUpdateManyWithoutTaskInput
  }

  export type TaskUncheckedUpdateWithoutEmployeeTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    link?: NullableStringFieldUpdateOperationsInput | string | null
    global?: BoolFieldUpdateOperationsInput | boolean
    phaseId?: NullableStringFieldUpdateOperationsInput | string | null
    responsibleId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    active?: BoolFieldUpdateOperationsInput | boolean
  }

  export type EmployeeCreateWithoutNotificationInput = {
    title?: string | null
    email: string
    firstName: string
    lastName: string
    birthDate: Date | string
    dateOfEmployment?: Date | string | null
    terminationDate?: Date | string | null
    imageUrl?: string | null
    Employee?: EmployeeCreateNestedOneWithoutOther_EmployeeInput
    Profession: ProfessionCreateNestedOneWithoutEmployeeInput
    other_Employee?: EmployeeCreateNestedManyWithoutEmployeeInput
    EmployeeSettings?: EmployeeSettingsCreateNestedOneWithoutEmployeeInput
    EmployeeTask_EmployeeToEmployeeTask_completedById?: EmployeeTaskCreateNestedManyWithoutEmployee_EmployeeToEmployeeTask_completedByIdInput
    EmployeeTask_EmployeeToEmployeeTask_employeeId?: EmployeeTaskCreateNestedManyWithoutEmployee_EmployeeToEmployeeTask_employeeIdInput
    EmployeeTask_EmployeeToEmployeeTask_responsibleId?: EmployeeTaskCreateNestedManyWithoutEmployee_EmployeeToEmployeeTask_responsibleIdInput
    Task?: TaskCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeUncheckedCreateWithoutNotificationInput = {
    id?: number
    title?: string | null
    email: string
    professionId: string
    firstName: string
    lastName: string
    birthDate: Date | string
    dateOfEmployment?: Date | string | null
    terminationDate?: Date | string | null
    imageUrl?: string | null
    hrManagerId?: number | null
    other_Employee?: EmployeeUncheckedCreateNestedManyWithoutEmployeeInput
    EmployeeSettings?: EmployeeSettingsUncheckedCreateNestedOneWithoutEmployeeInput
    EmployeeTask_EmployeeToEmployeeTask_completedById?: EmployeeTaskUncheckedCreateNestedManyWithoutEmployee_EmployeeToEmployeeTask_completedByIdInput
    EmployeeTask_EmployeeToEmployeeTask_employeeId?: EmployeeTaskUncheckedCreateNestedManyWithoutEmployee_EmployeeToEmployeeTask_employeeIdInput
    EmployeeTask_EmployeeToEmployeeTask_responsibleId?: EmployeeTaskUncheckedCreateNestedManyWithoutEmployee_EmployeeToEmployeeTask_responsibleIdInput
    Task?: TaskUncheckedCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeCreateOrConnectWithoutNotificationInput = {
    where: EmployeeWhereUniqueInput
    create: XOR<EmployeeCreateWithoutNotificationInput, EmployeeUncheckedCreateWithoutNotificationInput>
  }

  export type EmployeeUpsertWithoutNotificationInput = {
    update: XOR<EmployeeUpdateWithoutNotificationInput, EmployeeUncheckedUpdateWithoutNotificationInput>
    create: XOR<EmployeeCreateWithoutNotificationInput, EmployeeUncheckedCreateWithoutNotificationInput>
  }

  export type EmployeeUpdateWithoutNotificationInput = {
    title?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    dateOfEmployment?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    terminationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    Employee?: EmployeeUpdateOneWithoutOther_EmployeeInput
    Profession?: ProfessionUpdateOneRequiredWithoutEmployeeInput
    other_Employee?: EmployeeUpdateManyWithoutEmployeeInput
    EmployeeSettings?: EmployeeSettingsUpdateOneWithoutEmployeeInput
    EmployeeTask_EmployeeToEmployeeTask_completedById?: EmployeeTaskUpdateManyWithoutEmployee_EmployeeToEmployeeTask_completedByIdInput
    EmployeeTask_EmployeeToEmployeeTask_employeeId?: EmployeeTaskUpdateManyWithoutEmployee_EmployeeToEmployeeTask_employeeIdInput
    EmployeeTask_EmployeeToEmployeeTask_responsibleId?: EmployeeTaskUpdateManyWithoutEmployee_EmployeeToEmployeeTask_responsibleIdInput
    Task?: TaskUpdateManyWithoutEmployeeInput
  }

  export type EmployeeUncheckedUpdateWithoutNotificationInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    professionId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    dateOfEmployment?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    terminationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    hrManagerId?: NullableIntFieldUpdateOperationsInput | number | null
    other_Employee?: EmployeeUncheckedUpdateManyWithoutEmployeeInput
    EmployeeSettings?: EmployeeSettingsUncheckedUpdateOneWithoutEmployeeInput
    EmployeeTask_EmployeeToEmployeeTask_completedById?: EmployeeTaskUncheckedUpdateManyWithoutEmployee_EmployeeToEmployeeTask_completedByIdInput
    EmployeeTask_EmployeeToEmployeeTask_employeeId?: EmployeeTaskUncheckedUpdateManyWithoutEmployee_EmployeeToEmployeeTask_employeeIdInput
    EmployeeTask_EmployeeToEmployeeTask_responsibleId?: EmployeeTaskUncheckedUpdateManyWithoutEmployee_EmployeeToEmployeeTask_responsibleIdInput
    Task?: TaskUncheckedUpdateManyWithoutEmployeeInput
  }

  export type ProcessTemplateCreateWithoutPhaseInput = {
    id: string
    title: string
    slug: string
  }

  export type ProcessTemplateUncheckedCreateWithoutPhaseInput = {
    id: string
    title: string
    slug: string
  }

  export type ProcessTemplateCreateOrConnectWithoutPhaseInput = {
    where: ProcessTemplateWhereUniqueInput
    create: XOR<ProcessTemplateCreateWithoutPhaseInput, ProcessTemplateUncheckedCreateWithoutPhaseInput>
  }

  export type TaskCreateWithoutPhaseInput = {
    id: string
    title: string
    description?: string | null
    link?: string | null
    global?: boolean
    createdAt?: Date | string
    active?: boolean
    Employee?: EmployeeCreateNestedOneWithoutTaskInput
    EmployeeTask?: EmployeeTaskCreateNestedManyWithoutTaskInput
    Profession?: ProfessionCreateNestedManyWithoutTaskInput
    Tag?: TagCreateNestedManyWithoutTaskInput
  }

  export type TaskUncheckedCreateWithoutPhaseInput = {
    id: string
    title: string
    description?: string | null
    link?: string | null
    global?: boolean
    responsibleId?: number | null
    createdAt?: Date | string
    active?: boolean
    EmployeeTask?: EmployeeTaskUncheckedCreateNestedManyWithoutTaskInput
  }

  export type TaskCreateOrConnectWithoutPhaseInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutPhaseInput, TaskUncheckedCreateWithoutPhaseInput>
  }

  export type TaskCreateManyPhaseInputEnvelope = {
    data: Enumerable<TaskCreateManyPhaseInput>
    skipDuplicates?: boolean
  }

  export type ProcessTemplateUpsertWithoutPhaseInput = {
    update: XOR<ProcessTemplateUpdateWithoutPhaseInput, ProcessTemplateUncheckedUpdateWithoutPhaseInput>
    create: XOR<ProcessTemplateCreateWithoutPhaseInput, ProcessTemplateUncheckedCreateWithoutPhaseInput>
  }

  export type ProcessTemplateUpdateWithoutPhaseInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
  }

  export type ProcessTemplateUncheckedUpdateWithoutPhaseInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
  }

  export type TaskUpsertWithWhereUniqueWithoutPhaseInput = {
    where: TaskWhereUniqueInput
    update: XOR<TaskUpdateWithoutPhaseInput, TaskUncheckedUpdateWithoutPhaseInput>
    create: XOR<TaskCreateWithoutPhaseInput, TaskUncheckedCreateWithoutPhaseInput>
  }

  export type TaskUpdateWithWhereUniqueWithoutPhaseInput = {
    where: TaskWhereUniqueInput
    data: XOR<TaskUpdateWithoutPhaseInput, TaskUncheckedUpdateWithoutPhaseInput>
  }

  export type TaskUpdateManyWithWhereWithoutPhaseInput = {
    where: TaskScalarWhereInput
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyWithoutTaskInput>
  }

  export type PhaseCreateWithoutProcessTemplateInput = {
    id: string
    title: string
    createdAt?: Date | string
    dueDateDayOffset?: number | null
    dueDate?: Date | string | null
    active?: boolean
    Task?: TaskCreateNestedManyWithoutPhaseInput
  }

  export type PhaseUncheckedCreateWithoutProcessTemplateInput = {
    id: string
    title: string
    createdAt?: Date | string
    dueDateDayOffset?: number | null
    dueDate?: Date | string | null
    active?: boolean
    Task?: TaskUncheckedCreateNestedManyWithoutPhaseInput
  }

  export type PhaseCreateOrConnectWithoutProcessTemplateInput = {
    where: PhaseWhereUniqueInput
    create: XOR<PhaseCreateWithoutProcessTemplateInput, PhaseUncheckedCreateWithoutProcessTemplateInput>
  }

  export type PhaseCreateManyProcessTemplateInputEnvelope = {
    data: Enumerable<PhaseCreateManyProcessTemplateInput>
    skipDuplicates?: boolean
  }

  export type PhaseUpsertWithWhereUniqueWithoutProcessTemplateInput = {
    where: PhaseWhereUniqueInput
    update: XOR<PhaseUpdateWithoutProcessTemplateInput, PhaseUncheckedUpdateWithoutProcessTemplateInput>
    create: XOR<PhaseCreateWithoutProcessTemplateInput, PhaseUncheckedCreateWithoutProcessTemplateInput>
  }

  export type PhaseUpdateWithWhereUniqueWithoutProcessTemplateInput = {
    where: PhaseWhereUniqueInput
    data: XOR<PhaseUpdateWithoutProcessTemplateInput, PhaseUncheckedUpdateWithoutProcessTemplateInput>
  }

  export type PhaseUpdateManyWithWhereWithoutProcessTemplateInput = {
    where: PhaseScalarWhereInput
    data: XOR<PhaseUpdateManyMutationInput, PhaseUncheckedUpdateManyWithoutPhaseInput>
  }

  export type PhaseScalarWhereInput = {
    AND?: Enumerable<PhaseScalarWhereInput>
    OR?: Enumerable<PhaseScalarWhereInput>
    NOT?: Enumerable<PhaseScalarWhereInput>
    id?: StringFilter | string
    title?: StringFilter | string
    processTemplateId?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    dueDateDayOffset?: IntNullableFilter | number | null
    dueDate?: DateTimeNullableFilter | Date | string | null
    active?: BoolFilter | boolean
  }

  export type EmployeeCreateWithoutProfessionInput = {
    title?: string | null
    email: string
    firstName: string
    lastName: string
    birthDate: Date | string
    dateOfEmployment?: Date | string | null
    terminationDate?: Date | string | null
    imageUrl?: string | null
    Employee?: EmployeeCreateNestedOneWithoutOther_EmployeeInput
    other_Employee?: EmployeeCreateNestedManyWithoutEmployeeInput
    EmployeeSettings?: EmployeeSettingsCreateNestedOneWithoutEmployeeInput
    EmployeeTask_EmployeeToEmployeeTask_completedById?: EmployeeTaskCreateNestedManyWithoutEmployee_EmployeeToEmployeeTask_completedByIdInput
    EmployeeTask_EmployeeToEmployeeTask_employeeId?: EmployeeTaskCreateNestedManyWithoutEmployee_EmployeeToEmployeeTask_employeeIdInput
    EmployeeTask_EmployeeToEmployeeTask_responsibleId?: EmployeeTaskCreateNestedManyWithoutEmployee_EmployeeToEmployeeTask_responsibleIdInput
    Notification?: NotificationCreateNestedManyWithoutEmployeeInput
    Task?: TaskCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeUncheckedCreateWithoutProfessionInput = {
    id?: number
    title?: string | null
    email: string
    firstName: string
    lastName: string
    birthDate: Date | string
    dateOfEmployment?: Date | string | null
    terminationDate?: Date | string | null
    imageUrl?: string | null
    hrManagerId?: number | null
    other_Employee?: EmployeeUncheckedCreateNestedManyWithoutEmployeeInput
    EmployeeSettings?: EmployeeSettingsUncheckedCreateNestedOneWithoutEmployeeInput
    EmployeeTask_EmployeeToEmployeeTask_completedById?: EmployeeTaskUncheckedCreateNestedManyWithoutEmployee_EmployeeToEmployeeTask_completedByIdInput
    EmployeeTask_EmployeeToEmployeeTask_employeeId?: EmployeeTaskUncheckedCreateNestedManyWithoutEmployee_EmployeeToEmployeeTask_employeeIdInput
    EmployeeTask_EmployeeToEmployeeTask_responsibleId?: EmployeeTaskUncheckedCreateNestedManyWithoutEmployee_EmployeeToEmployeeTask_responsibleIdInput
    Notification?: NotificationUncheckedCreateNestedManyWithoutEmployeeInput
    Task?: TaskUncheckedCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeCreateOrConnectWithoutProfessionInput = {
    where: EmployeeWhereUniqueInput
    create: XOR<EmployeeCreateWithoutProfessionInput, EmployeeUncheckedCreateWithoutProfessionInput>
  }

  export type EmployeeCreateManyProfessionInputEnvelope = {
    data: Enumerable<EmployeeCreateManyProfessionInput>
    skipDuplicates?: boolean
  }

  export type TaskCreateWithoutProfessionInput = {
    id: string
    title: string
    description?: string | null
    link?: string | null
    global?: boolean
    createdAt?: Date | string
    active?: boolean
    Phase?: PhaseCreateNestedOneWithoutTaskInput
    Employee?: EmployeeCreateNestedOneWithoutTaskInput
    EmployeeTask?: EmployeeTaskCreateNestedManyWithoutTaskInput
    Tag?: TagCreateNestedManyWithoutTaskInput
  }

  export type TaskUncheckedCreateWithoutProfessionInput = {
    id: string
    title: string
    description?: string | null
    link?: string | null
    global?: boolean
    phaseId?: string | null
    responsibleId?: number | null
    createdAt?: Date | string
    active?: boolean
    EmployeeTask?: EmployeeTaskUncheckedCreateNestedManyWithoutTaskInput
  }

  export type TaskCreateOrConnectWithoutProfessionInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutProfessionInput, TaskUncheckedCreateWithoutProfessionInput>
  }

  export type EmployeeUpsertWithWhereUniqueWithoutProfessionInput = {
    where: EmployeeWhereUniqueInput
    update: XOR<EmployeeUpdateWithoutProfessionInput, EmployeeUncheckedUpdateWithoutProfessionInput>
    create: XOR<EmployeeCreateWithoutProfessionInput, EmployeeUncheckedCreateWithoutProfessionInput>
  }

  export type EmployeeUpdateWithWhereUniqueWithoutProfessionInput = {
    where: EmployeeWhereUniqueInput
    data: XOR<EmployeeUpdateWithoutProfessionInput, EmployeeUncheckedUpdateWithoutProfessionInput>
  }

  export type EmployeeUpdateManyWithWhereWithoutProfessionInput = {
    where: EmployeeScalarWhereInput
    data: XOR<EmployeeUpdateManyMutationInput, EmployeeUncheckedUpdateManyWithoutEmployeeInput>
  }

  export type TaskUpsertWithWhereUniqueWithoutProfessionInput = {
    where: TaskWhereUniqueInput
    update: XOR<TaskUpdateWithoutProfessionInput, TaskUncheckedUpdateWithoutProfessionInput>
    create: XOR<TaskCreateWithoutProfessionInput, TaskUncheckedCreateWithoutProfessionInput>
  }

  export type TaskUpdateWithWhereUniqueWithoutProfessionInput = {
    where: TaskWhereUniqueInput
    data: XOR<TaskUpdateWithoutProfessionInput, TaskUncheckedUpdateWithoutProfessionInput>
  }

  export type TaskUpdateManyWithWhereWithoutProfessionInput = {
    where: TaskScalarWhereInput
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyWithoutTaskInput>
  }

  export type TaskCreateWithoutTagInput = {
    id: string
    title: string
    description?: string | null
    link?: string | null
    global?: boolean
    createdAt?: Date | string
    active?: boolean
    Phase?: PhaseCreateNestedOneWithoutTaskInput
    Employee?: EmployeeCreateNestedOneWithoutTaskInput
    EmployeeTask?: EmployeeTaskCreateNestedManyWithoutTaskInput
    Profession?: ProfessionCreateNestedManyWithoutTaskInput
  }

  export type TaskUncheckedCreateWithoutTagInput = {
    id: string
    title: string
    description?: string | null
    link?: string | null
    global?: boolean
    phaseId?: string | null
    responsibleId?: number | null
    createdAt?: Date | string
    active?: boolean
    EmployeeTask?: EmployeeTaskUncheckedCreateNestedManyWithoutTaskInput
  }

  export type TaskCreateOrConnectWithoutTagInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutTagInput, TaskUncheckedCreateWithoutTagInput>
  }

  export type TaskUpsertWithWhereUniqueWithoutTagInput = {
    where: TaskWhereUniqueInput
    update: XOR<TaskUpdateWithoutTagInput, TaskUncheckedUpdateWithoutTagInput>
    create: XOR<TaskCreateWithoutTagInput, TaskUncheckedCreateWithoutTagInput>
  }

  export type TaskUpdateWithWhereUniqueWithoutTagInput = {
    where: TaskWhereUniqueInput
    data: XOR<TaskUpdateWithoutTagInput, TaskUncheckedUpdateWithoutTagInput>
  }

  export type TaskUpdateManyWithWhereWithoutTagInput = {
    where: TaskScalarWhereInput
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyWithoutTaskInput>
  }

  export type PhaseCreateWithoutTaskInput = {
    id: string
    title: string
    createdAt?: Date | string
    dueDateDayOffset?: number | null
    dueDate?: Date | string | null
    active?: boolean
    ProcessTemplate: ProcessTemplateCreateNestedOneWithoutPhaseInput
  }

  export type PhaseUncheckedCreateWithoutTaskInput = {
    id: string
    title: string
    processTemplateId: string
    createdAt?: Date | string
    dueDateDayOffset?: number | null
    dueDate?: Date | string | null
    active?: boolean
  }

  export type PhaseCreateOrConnectWithoutTaskInput = {
    where: PhaseWhereUniqueInput
    create: XOR<PhaseCreateWithoutTaskInput, PhaseUncheckedCreateWithoutTaskInput>
  }

  export type EmployeeCreateWithoutTaskInput = {
    title?: string | null
    email: string
    firstName: string
    lastName: string
    birthDate: Date | string
    dateOfEmployment?: Date | string | null
    terminationDate?: Date | string | null
    imageUrl?: string | null
    Employee?: EmployeeCreateNestedOneWithoutOther_EmployeeInput
    Profession: ProfessionCreateNestedOneWithoutEmployeeInput
    other_Employee?: EmployeeCreateNestedManyWithoutEmployeeInput
    EmployeeSettings?: EmployeeSettingsCreateNestedOneWithoutEmployeeInput
    EmployeeTask_EmployeeToEmployeeTask_completedById?: EmployeeTaskCreateNestedManyWithoutEmployee_EmployeeToEmployeeTask_completedByIdInput
    EmployeeTask_EmployeeToEmployeeTask_employeeId?: EmployeeTaskCreateNestedManyWithoutEmployee_EmployeeToEmployeeTask_employeeIdInput
    EmployeeTask_EmployeeToEmployeeTask_responsibleId?: EmployeeTaskCreateNestedManyWithoutEmployee_EmployeeToEmployeeTask_responsibleIdInput
    Notification?: NotificationCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeUncheckedCreateWithoutTaskInput = {
    id?: number
    title?: string | null
    email: string
    professionId: string
    firstName: string
    lastName: string
    birthDate: Date | string
    dateOfEmployment?: Date | string | null
    terminationDate?: Date | string | null
    imageUrl?: string | null
    hrManagerId?: number | null
    other_Employee?: EmployeeUncheckedCreateNestedManyWithoutEmployeeInput
    EmployeeSettings?: EmployeeSettingsUncheckedCreateNestedOneWithoutEmployeeInput
    EmployeeTask_EmployeeToEmployeeTask_completedById?: EmployeeTaskUncheckedCreateNestedManyWithoutEmployee_EmployeeToEmployeeTask_completedByIdInput
    EmployeeTask_EmployeeToEmployeeTask_employeeId?: EmployeeTaskUncheckedCreateNestedManyWithoutEmployee_EmployeeToEmployeeTask_employeeIdInput
    EmployeeTask_EmployeeToEmployeeTask_responsibleId?: EmployeeTaskUncheckedCreateNestedManyWithoutEmployee_EmployeeToEmployeeTask_responsibleIdInput
    Notification?: NotificationUncheckedCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeCreateOrConnectWithoutTaskInput = {
    where: EmployeeWhereUniqueInput
    create: XOR<EmployeeCreateWithoutTaskInput, EmployeeUncheckedCreateWithoutTaskInput>
  }

  export type EmployeeTaskCreateWithoutTaskInput = {
    id: string
    completed?: boolean
    dueDate: Date | string
    completedDate?: Date | string | null
    Employee_EmployeeToEmployeeTask_completedById?: EmployeeCreateNestedOneWithoutEmployeeTask_EmployeeToEmployeeTask_completedByIdInput
    Employee_EmployeeToEmployeeTask_employeeId: EmployeeCreateNestedOneWithoutEmployeeTask_EmployeeToEmployeeTask_employeeIdInput
    Employee_EmployeeToEmployeeTask_responsibleId: EmployeeCreateNestedOneWithoutEmployeeTask_EmployeeToEmployeeTask_responsibleIdInput
  }

  export type EmployeeTaskUncheckedCreateWithoutTaskInput = {
    id: string
    completed?: boolean
    employeeId: number
    responsibleId: number
    dueDate: Date | string
    completedDate?: Date | string | null
    completedById?: number | null
  }

  export type EmployeeTaskCreateOrConnectWithoutTaskInput = {
    where: EmployeeTaskWhereUniqueInput
    create: XOR<EmployeeTaskCreateWithoutTaskInput, EmployeeTaskUncheckedCreateWithoutTaskInput>
  }

  export type EmployeeTaskCreateManyTaskInputEnvelope = {
    data: Enumerable<EmployeeTaskCreateManyTaskInput>
    skipDuplicates?: boolean
  }

  export type ProfessionCreateWithoutTaskInput = {
    id: string
    title: string
    Employee?: EmployeeCreateNestedManyWithoutProfessionInput
  }

  export type ProfessionUncheckedCreateWithoutTaskInput = {
    id: string
    title: string
    Employee?: EmployeeUncheckedCreateNestedManyWithoutProfessionInput
  }

  export type ProfessionCreateOrConnectWithoutTaskInput = {
    where: ProfessionWhereUniqueInput
    create: XOR<ProfessionCreateWithoutTaskInput, ProfessionUncheckedCreateWithoutTaskInput>
  }

  export type TagCreateWithoutTaskInput = {
    id: string
    title: string
  }

  export type TagUncheckedCreateWithoutTaskInput = {
    id: string
    title: string
  }

  export type TagCreateOrConnectWithoutTaskInput = {
    where: TagWhereUniqueInput
    create: XOR<TagCreateWithoutTaskInput, TagUncheckedCreateWithoutTaskInput>
  }

  export type PhaseUpsertWithoutTaskInput = {
    update: XOR<PhaseUpdateWithoutTaskInput, PhaseUncheckedUpdateWithoutTaskInput>
    create: XOR<PhaseCreateWithoutTaskInput, PhaseUncheckedCreateWithoutTaskInput>
  }

  export type PhaseUpdateWithoutTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dueDateDayOffset?: NullableIntFieldUpdateOperationsInput | number | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    ProcessTemplate?: ProcessTemplateUpdateOneRequiredWithoutPhaseInput
  }

  export type PhaseUncheckedUpdateWithoutTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    processTemplateId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dueDateDayOffset?: NullableIntFieldUpdateOperationsInput | number | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
  }

  export type EmployeeUpsertWithoutTaskInput = {
    update: XOR<EmployeeUpdateWithoutTaskInput, EmployeeUncheckedUpdateWithoutTaskInput>
    create: XOR<EmployeeCreateWithoutTaskInput, EmployeeUncheckedCreateWithoutTaskInput>
  }

  export type EmployeeUpdateWithoutTaskInput = {
    title?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    dateOfEmployment?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    terminationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    Employee?: EmployeeUpdateOneWithoutOther_EmployeeInput
    Profession?: ProfessionUpdateOneRequiredWithoutEmployeeInput
    other_Employee?: EmployeeUpdateManyWithoutEmployeeInput
    EmployeeSettings?: EmployeeSettingsUpdateOneWithoutEmployeeInput
    EmployeeTask_EmployeeToEmployeeTask_completedById?: EmployeeTaskUpdateManyWithoutEmployee_EmployeeToEmployeeTask_completedByIdInput
    EmployeeTask_EmployeeToEmployeeTask_employeeId?: EmployeeTaskUpdateManyWithoutEmployee_EmployeeToEmployeeTask_employeeIdInput
    EmployeeTask_EmployeeToEmployeeTask_responsibleId?: EmployeeTaskUpdateManyWithoutEmployee_EmployeeToEmployeeTask_responsibleIdInput
    Notification?: NotificationUpdateManyWithoutEmployeeInput
  }

  export type EmployeeUncheckedUpdateWithoutTaskInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    professionId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    dateOfEmployment?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    terminationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    hrManagerId?: NullableIntFieldUpdateOperationsInput | number | null
    other_Employee?: EmployeeUncheckedUpdateManyWithoutEmployeeInput
    EmployeeSettings?: EmployeeSettingsUncheckedUpdateOneWithoutEmployeeInput
    EmployeeTask_EmployeeToEmployeeTask_completedById?: EmployeeTaskUncheckedUpdateManyWithoutEmployee_EmployeeToEmployeeTask_completedByIdInput
    EmployeeTask_EmployeeToEmployeeTask_employeeId?: EmployeeTaskUncheckedUpdateManyWithoutEmployee_EmployeeToEmployeeTask_employeeIdInput
    EmployeeTask_EmployeeToEmployeeTask_responsibleId?: EmployeeTaskUncheckedUpdateManyWithoutEmployee_EmployeeToEmployeeTask_responsibleIdInput
    Notification?: NotificationUncheckedUpdateManyWithoutEmployeeInput
  }

  export type EmployeeTaskUpsertWithWhereUniqueWithoutTaskInput = {
    where: EmployeeTaskWhereUniqueInput
    update: XOR<EmployeeTaskUpdateWithoutTaskInput, EmployeeTaskUncheckedUpdateWithoutTaskInput>
    create: XOR<EmployeeTaskCreateWithoutTaskInput, EmployeeTaskUncheckedCreateWithoutTaskInput>
  }

  export type EmployeeTaskUpdateWithWhereUniqueWithoutTaskInput = {
    where: EmployeeTaskWhereUniqueInput
    data: XOR<EmployeeTaskUpdateWithoutTaskInput, EmployeeTaskUncheckedUpdateWithoutTaskInput>
  }

  export type EmployeeTaskUpdateManyWithWhereWithoutTaskInput = {
    where: EmployeeTaskScalarWhereInput
    data: XOR<EmployeeTaskUpdateManyMutationInput, EmployeeTaskUncheckedUpdateManyWithoutEmployeeTaskInput>
  }

  export type ProfessionUpsertWithWhereUniqueWithoutTaskInput = {
    where: ProfessionWhereUniqueInput
    update: XOR<ProfessionUpdateWithoutTaskInput, ProfessionUncheckedUpdateWithoutTaskInput>
    create: XOR<ProfessionCreateWithoutTaskInput, ProfessionUncheckedCreateWithoutTaskInput>
  }

  export type ProfessionUpdateWithWhereUniqueWithoutTaskInput = {
    where: ProfessionWhereUniqueInput
    data: XOR<ProfessionUpdateWithoutTaskInput, ProfessionUncheckedUpdateWithoutTaskInput>
  }

  export type ProfessionUpdateManyWithWhereWithoutTaskInput = {
    where: ProfessionScalarWhereInput
    data: XOR<ProfessionUpdateManyMutationInput, ProfessionUncheckedUpdateManyWithoutProfessionInput>
  }

  export type ProfessionScalarWhereInput = {
    AND?: Enumerable<ProfessionScalarWhereInput>
    OR?: Enumerable<ProfessionScalarWhereInput>
    NOT?: Enumerable<ProfessionScalarWhereInput>
    id?: StringFilter | string
    title?: StringFilter | string
  }

  export type TagUpsertWithWhereUniqueWithoutTaskInput = {
    where: TagWhereUniqueInput
    update: XOR<TagUpdateWithoutTaskInput, TagUncheckedUpdateWithoutTaskInput>
    create: XOR<TagCreateWithoutTaskInput, TagUncheckedCreateWithoutTaskInput>
  }

  export type TagUpdateWithWhereUniqueWithoutTaskInput = {
    where: TagWhereUniqueInput
    data: XOR<TagUpdateWithoutTaskInput, TagUncheckedUpdateWithoutTaskInput>
  }

  export type TagUpdateManyWithWhereWithoutTaskInput = {
    where: TagScalarWhereInput
    data: XOR<TagUpdateManyMutationInput, TagUncheckedUpdateManyWithoutTagInput>
  }

  export type TagScalarWhereInput = {
    AND?: Enumerable<TagScalarWhereInput>
    OR?: Enumerable<TagScalarWhereInput>
    NOT?: Enumerable<TagScalarWhereInput>
    id?: StringFilter | string
    title?: StringFilter | string
  }

  export type EmployeeCreateManyEmployeeInput = {
    id?: number
    title?: string | null
    email: string
    professionId: string
    firstName: string
    lastName: string
    birthDate: Date | string
    dateOfEmployment?: Date | string | null
    terminationDate?: Date | string | null
    imageUrl?: string | null
  }

  export type EmployeeTaskCreateManyEmployee_EmployeeToEmployeeTask_completedByIdInput = {
    id: string
    taskId: string
    completed?: boolean
    employeeId: number
    responsibleId: number
    dueDate: Date | string
    completedDate?: Date | string | null
  }

  export type EmployeeTaskCreateManyEmployee_EmployeeToEmployeeTask_employeeIdInput = {
    id: string
    taskId: string
    completed?: boolean
    responsibleId: number
    dueDate: Date | string
    completedDate?: Date | string | null
    completedById?: number | null
  }

  export type EmployeeTaskCreateManyEmployee_EmployeeToEmployeeTask_responsibleIdInput = {
    id: string
    taskId: string
    completed?: boolean
    employeeId: number
    dueDate: Date | string
    completedDate?: Date | string | null
    completedById?: number | null
  }

  export type NotificationCreateManyEmployeeInput = {
    id: string
    createdAt?: Date | string
    read?: boolean
    description: string
  }

  export type TaskCreateManyEmployeeInput = {
    id: string
    title: string
    description?: string | null
    link?: string | null
    global?: boolean
    phaseId?: string | null
    createdAt?: Date | string
    active?: boolean
  }

  export type EmployeeUpdateWithoutEmployeeInput = {
    title?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    dateOfEmployment?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    terminationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    Profession?: ProfessionUpdateOneRequiredWithoutEmployeeInput
    other_Employee?: EmployeeUpdateManyWithoutEmployeeInput
    EmployeeSettings?: EmployeeSettingsUpdateOneWithoutEmployeeInput
    EmployeeTask_EmployeeToEmployeeTask_completedById?: EmployeeTaskUpdateManyWithoutEmployee_EmployeeToEmployeeTask_completedByIdInput
    EmployeeTask_EmployeeToEmployeeTask_employeeId?: EmployeeTaskUpdateManyWithoutEmployee_EmployeeToEmployeeTask_employeeIdInput
    EmployeeTask_EmployeeToEmployeeTask_responsibleId?: EmployeeTaskUpdateManyWithoutEmployee_EmployeeToEmployeeTask_responsibleIdInput
    Notification?: NotificationUpdateManyWithoutEmployeeInput
    Task?: TaskUpdateManyWithoutEmployeeInput
  }

  export type EmployeeUncheckedUpdateWithoutEmployeeInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    professionId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    dateOfEmployment?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    terminationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    other_Employee?: EmployeeUncheckedUpdateManyWithoutEmployeeInput
    EmployeeSettings?: EmployeeSettingsUncheckedUpdateOneWithoutEmployeeInput
    EmployeeTask_EmployeeToEmployeeTask_completedById?: EmployeeTaskUncheckedUpdateManyWithoutEmployee_EmployeeToEmployeeTask_completedByIdInput
    EmployeeTask_EmployeeToEmployeeTask_employeeId?: EmployeeTaskUncheckedUpdateManyWithoutEmployee_EmployeeToEmployeeTask_employeeIdInput
    EmployeeTask_EmployeeToEmployeeTask_responsibleId?: EmployeeTaskUncheckedUpdateManyWithoutEmployee_EmployeeToEmployeeTask_responsibleIdInput
    Notification?: NotificationUncheckedUpdateManyWithoutEmployeeInput
    Task?: TaskUncheckedUpdateManyWithoutEmployeeInput
  }

  export type EmployeeUncheckedUpdateManyWithoutOther_EmployeeInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    professionId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    dateOfEmployment?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    terminationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EmployeeTaskUpdateWithoutEmployee_EmployeeToEmployeeTask_completedByIdInput = {
    id?: StringFieldUpdateOperationsInput | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    completedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Employee_EmployeeToEmployeeTask_employeeId?: EmployeeUpdateOneRequiredWithoutEmployeeTask_EmployeeToEmployeeTask_employeeIdInput
    Employee_EmployeeToEmployeeTask_responsibleId?: EmployeeUpdateOneRequiredWithoutEmployeeTask_EmployeeToEmployeeTask_responsibleIdInput
    Task?: TaskUpdateOneRequiredWithoutEmployeeTaskInput
  }

  export type EmployeeTaskUncheckedUpdateWithoutEmployee_EmployeeToEmployeeTask_completedByIdInput = {
    id?: StringFieldUpdateOperationsInput | string
    taskId?: StringFieldUpdateOperationsInput | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    employeeId?: IntFieldUpdateOperationsInput | number
    responsibleId?: IntFieldUpdateOperationsInput | number
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    completedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type EmployeeTaskUncheckedUpdateManyWithoutEmployeeTask_EmployeeToEmployeeTask_completedByIdInput = {
    id?: StringFieldUpdateOperationsInput | string
    taskId?: StringFieldUpdateOperationsInput | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    employeeId?: IntFieldUpdateOperationsInput | number
    responsibleId?: IntFieldUpdateOperationsInput | number
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    completedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type EmployeeTaskUpdateWithoutEmployee_EmployeeToEmployeeTask_employeeIdInput = {
    id?: StringFieldUpdateOperationsInput | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    completedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Employee_EmployeeToEmployeeTask_completedById?: EmployeeUpdateOneWithoutEmployeeTask_EmployeeToEmployeeTask_completedByIdInput
    Employee_EmployeeToEmployeeTask_responsibleId?: EmployeeUpdateOneRequiredWithoutEmployeeTask_EmployeeToEmployeeTask_responsibleIdInput
    Task?: TaskUpdateOneRequiredWithoutEmployeeTaskInput
  }

  export type EmployeeTaskUncheckedUpdateWithoutEmployee_EmployeeToEmployeeTask_employeeIdInput = {
    id?: StringFieldUpdateOperationsInput | string
    taskId?: StringFieldUpdateOperationsInput | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    responsibleId?: IntFieldUpdateOperationsInput | number
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    completedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedById?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type EmployeeTaskUncheckedUpdateManyWithoutEmployeeTask_EmployeeToEmployeeTask_employeeIdInput = {
    id?: StringFieldUpdateOperationsInput | string
    taskId?: StringFieldUpdateOperationsInput | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    responsibleId?: IntFieldUpdateOperationsInput | number
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    completedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedById?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type EmployeeTaskUpdateWithoutEmployee_EmployeeToEmployeeTask_responsibleIdInput = {
    id?: StringFieldUpdateOperationsInput | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    completedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Employee_EmployeeToEmployeeTask_completedById?: EmployeeUpdateOneWithoutEmployeeTask_EmployeeToEmployeeTask_completedByIdInput
    Employee_EmployeeToEmployeeTask_employeeId?: EmployeeUpdateOneRequiredWithoutEmployeeTask_EmployeeToEmployeeTask_employeeIdInput
    Task?: TaskUpdateOneRequiredWithoutEmployeeTaskInput
  }

  export type EmployeeTaskUncheckedUpdateWithoutEmployee_EmployeeToEmployeeTask_responsibleIdInput = {
    id?: StringFieldUpdateOperationsInput | string
    taskId?: StringFieldUpdateOperationsInput | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    employeeId?: IntFieldUpdateOperationsInput | number
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    completedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedById?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type EmployeeTaskUncheckedUpdateManyWithoutEmployeeTask_EmployeeToEmployeeTask_responsibleIdInput = {
    id?: StringFieldUpdateOperationsInput | string
    taskId?: StringFieldUpdateOperationsInput | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    employeeId?: IntFieldUpdateOperationsInput | number
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    completedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedById?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type NotificationUpdateWithoutEmployeeInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    read?: BoolFieldUpdateOperationsInput | boolean
    description?: StringFieldUpdateOperationsInput | string
  }

  export type NotificationUncheckedUpdateWithoutEmployeeInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    read?: BoolFieldUpdateOperationsInput | boolean
    description?: StringFieldUpdateOperationsInput | string
  }

  export type NotificationUncheckedUpdateManyWithoutNotificationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    read?: BoolFieldUpdateOperationsInput | boolean
    description?: StringFieldUpdateOperationsInput | string
  }

  export type TaskUpdateWithoutEmployeeInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    link?: NullableStringFieldUpdateOperationsInput | string | null
    global?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    active?: BoolFieldUpdateOperationsInput | boolean
    Phase?: PhaseUpdateOneWithoutTaskInput
    EmployeeTask?: EmployeeTaskUpdateManyWithoutTaskInput
    Profession?: ProfessionUpdateManyWithoutTaskInput
    Tag?: TagUpdateManyWithoutTaskInput
  }

  export type TaskUncheckedUpdateWithoutEmployeeInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    link?: NullableStringFieldUpdateOperationsInput | string | null
    global?: BoolFieldUpdateOperationsInput | boolean
    phaseId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    active?: BoolFieldUpdateOperationsInput | boolean
    EmployeeTask?: EmployeeTaskUncheckedUpdateManyWithoutTaskInput
  }

  export type TaskUncheckedUpdateManyWithoutTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    link?: NullableStringFieldUpdateOperationsInput | string | null
    global?: BoolFieldUpdateOperationsInput | boolean
    phaseId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    active?: BoolFieldUpdateOperationsInput | boolean
  }

  export type TaskCreateManyPhaseInput = {
    id: string
    title: string
    description?: string | null
    link?: string | null
    global?: boolean
    responsibleId?: number | null
    createdAt?: Date | string
    active?: boolean
  }

  export type TaskUpdateWithoutPhaseInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    link?: NullableStringFieldUpdateOperationsInput | string | null
    global?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    active?: BoolFieldUpdateOperationsInput | boolean
    Employee?: EmployeeUpdateOneWithoutTaskInput
    EmployeeTask?: EmployeeTaskUpdateManyWithoutTaskInput
    Profession?: ProfessionUpdateManyWithoutTaskInput
    Tag?: TagUpdateManyWithoutTaskInput
  }

  export type TaskUncheckedUpdateWithoutPhaseInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    link?: NullableStringFieldUpdateOperationsInput | string | null
    global?: BoolFieldUpdateOperationsInput | boolean
    responsibleId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    active?: BoolFieldUpdateOperationsInput | boolean
    EmployeeTask?: EmployeeTaskUncheckedUpdateManyWithoutTaskInput
  }

  export type PhaseCreateManyProcessTemplateInput = {
    id: string
    title: string
    createdAt?: Date | string
    dueDateDayOffset?: number | null
    dueDate?: Date | string | null
    active?: boolean
  }

  export type PhaseUpdateWithoutProcessTemplateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dueDateDayOffset?: NullableIntFieldUpdateOperationsInput | number | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    Task?: TaskUpdateManyWithoutPhaseInput
  }

  export type PhaseUncheckedUpdateWithoutProcessTemplateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dueDateDayOffset?: NullableIntFieldUpdateOperationsInput | number | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    Task?: TaskUncheckedUpdateManyWithoutPhaseInput
  }

  export type PhaseUncheckedUpdateManyWithoutPhaseInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dueDateDayOffset?: NullableIntFieldUpdateOperationsInput | number | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
  }

  export type EmployeeCreateManyProfessionInput = {
    id?: number
    title?: string | null
    email: string
    firstName: string
    lastName: string
    birthDate: Date | string
    dateOfEmployment?: Date | string | null
    terminationDate?: Date | string | null
    imageUrl?: string | null
    hrManagerId?: number | null
  }

  export type EmployeeUpdateWithoutProfessionInput = {
    title?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    dateOfEmployment?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    terminationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    Employee?: EmployeeUpdateOneWithoutOther_EmployeeInput
    other_Employee?: EmployeeUpdateManyWithoutEmployeeInput
    EmployeeSettings?: EmployeeSettingsUpdateOneWithoutEmployeeInput
    EmployeeTask_EmployeeToEmployeeTask_completedById?: EmployeeTaskUpdateManyWithoutEmployee_EmployeeToEmployeeTask_completedByIdInput
    EmployeeTask_EmployeeToEmployeeTask_employeeId?: EmployeeTaskUpdateManyWithoutEmployee_EmployeeToEmployeeTask_employeeIdInput
    EmployeeTask_EmployeeToEmployeeTask_responsibleId?: EmployeeTaskUpdateManyWithoutEmployee_EmployeeToEmployeeTask_responsibleIdInput
    Notification?: NotificationUpdateManyWithoutEmployeeInput
    Task?: TaskUpdateManyWithoutEmployeeInput
  }

  export type EmployeeUncheckedUpdateWithoutProfessionInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    dateOfEmployment?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    terminationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    hrManagerId?: NullableIntFieldUpdateOperationsInput | number | null
    other_Employee?: EmployeeUncheckedUpdateManyWithoutEmployeeInput
    EmployeeSettings?: EmployeeSettingsUncheckedUpdateOneWithoutEmployeeInput
    EmployeeTask_EmployeeToEmployeeTask_completedById?: EmployeeTaskUncheckedUpdateManyWithoutEmployee_EmployeeToEmployeeTask_completedByIdInput
    EmployeeTask_EmployeeToEmployeeTask_employeeId?: EmployeeTaskUncheckedUpdateManyWithoutEmployee_EmployeeToEmployeeTask_employeeIdInput
    EmployeeTask_EmployeeToEmployeeTask_responsibleId?: EmployeeTaskUncheckedUpdateManyWithoutEmployee_EmployeeToEmployeeTask_responsibleIdInput
    Notification?: NotificationUncheckedUpdateManyWithoutEmployeeInput
    Task?: TaskUncheckedUpdateManyWithoutEmployeeInput
  }

  export type TaskUpdateWithoutProfessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    link?: NullableStringFieldUpdateOperationsInput | string | null
    global?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    active?: BoolFieldUpdateOperationsInput | boolean
    Phase?: PhaseUpdateOneWithoutTaskInput
    Employee?: EmployeeUpdateOneWithoutTaskInput
    EmployeeTask?: EmployeeTaskUpdateManyWithoutTaskInput
    Tag?: TagUpdateManyWithoutTaskInput
  }

  export type TaskUncheckedUpdateWithoutProfessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    link?: NullableStringFieldUpdateOperationsInput | string | null
    global?: BoolFieldUpdateOperationsInput | boolean
    phaseId?: NullableStringFieldUpdateOperationsInput | string | null
    responsibleId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    active?: BoolFieldUpdateOperationsInput | boolean
    EmployeeTask?: EmployeeTaskUncheckedUpdateManyWithoutTaskInput
  }

  export type TaskUpdateWithoutTagInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    link?: NullableStringFieldUpdateOperationsInput | string | null
    global?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    active?: BoolFieldUpdateOperationsInput | boolean
    Phase?: PhaseUpdateOneWithoutTaskInput
    Employee?: EmployeeUpdateOneWithoutTaskInput
    EmployeeTask?: EmployeeTaskUpdateManyWithoutTaskInput
    Profession?: ProfessionUpdateManyWithoutTaskInput
  }

  export type TaskUncheckedUpdateWithoutTagInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    link?: NullableStringFieldUpdateOperationsInput | string | null
    global?: BoolFieldUpdateOperationsInput | boolean
    phaseId?: NullableStringFieldUpdateOperationsInput | string | null
    responsibleId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    active?: BoolFieldUpdateOperationsInput | boolean
    EmployeeTask?: EmployeeTaskUncheckedUpdateManyWithoutTaskInput
  }

  export type EmployeeTaskCreateManyTaskInput = {
    id: string
    completed?: boolean
    employeeId: number
    responsibleId: number
    dueDate: Date | string
    completedDate?: Date | string | null
    completedById?: number | null
  }

  export type EmployeeTaskUpdateWithoutTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    completedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Employee_EmployeeToEmployeeTask_completedById?: EmployeeUpdateOneWithoutEmployeeTask_EmployeeToEmployeeTask_completedByIdInput
    Employee_EmployeeToEmployeeTask_employeeId?: EmployeeUpdateOneRequiredWithoutEmployeeTask_EmployeeToEmployeeTask_employeeIdInput
    Employee_EmployeeToEmployeeTask_responsibleId?: EmployeeUpdateOneRequiredWithoutEmployeeTask_EmployeeToEmployeeTask_responsibleIdInput
  }

  export type EmployeeTaskUncheckedUpdateWithoutTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    employeeId?: IntFieldUpdateOperationsInput | number
    responsibleId?: IntFieldUpdateOperationsInput | number
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    completedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedById?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type EmployeeTaskUncheckedUpdateManyWithoutEmployeeTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    employeeId?: IntFieldUpdateOperationsInput | number
    responsibleId?: IntFieldUpdateOperationsInput | number
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    completedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedById?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type ProfessionUpdateWithoutTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    Employee?: EmployeeUpdateManyWithoutProfessionInput
  }

  export type ProfessionUncheckedUpdateWithoutTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    Employee?: EmployeeUncheckedUpdateManyWithoutProfessionInput
  }

  export type ProfessionUncheckedUpdateManyWithoutProfessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
  }

  export type TagUpdateWithoutTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
  }

  export type TagUncheckedUpdateWithoutTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
  }

  export type TagUncheckedUpdateManyWithoutTagInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.DMMF.Document;
}