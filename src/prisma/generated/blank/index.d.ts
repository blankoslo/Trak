
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
 * Model employee_role
 */

export type employee_role = {
  id: string
  employee_id: number
  role_type: employee_role_type
  created: Date | null
}

/**
 * Model employees
 */

export type employees = {
  id: number
  first_name: string
  last_name: string
  title: string | null
  phone: string
  email: string
  gender: gender
  birth_date: Date
  date_of_employment: Date | null
  termination_date: Date | null
  emergency_contact_name: string | null
  emergency_contact_phone: string | null
  emergency_contact_relation: string | null
  address: string | null
  postal_code: string | null
  city: string | null
  image_url: string | null
  has_permanent_position: boolean | null
  emoji: string | null
  role: string | null
  bio: string | null
}


/**
 * Enums
 */

// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

export const employee_role_type: {
  admin: 'admin'
};

export type employee_role_type = (typeof employee_role_type)[keyof typeof employee_role_type]


export const gender: {
  male: 'male',
  female: 'female',
  other: 'other'
};

export type gender = (typeof gender)[keyof typeof gender]


/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js (ORM replacement)
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Employee_roles
 * const employee_roles = await prisma.employee_role.findMany()
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
   * // Fetch zero or more Employee_roles
   * const employee_roles = await prisma.employee_role.findMany()
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
   * `prisma.employee_role`: Exposes CRUD operations for the **employee_role** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Employee_roles
    * const employee_roles = await prisma.employee_role.findMany()
    * ```
    */
  get employee_role(): Prisma.employee_roleDelegate<GlobalReject>;

  /**
   * `prisma.employees`: Exposes CRUD operations for the **employees** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Employees
    * const employees = await prisma.employees.findMany()
    * ```
    */
  get employees(): Prisma.employeesDelegate<GlobalReject>;
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
    employee_role: 'employee_role',
    employees: 'employees'
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
   * Model employee_role
   */


  export type AggregateEmployee_role = {
    count: Employee_roleCountAggregateOutputType | null
    avg: Employee_roleAvgAggregateOutputType | null
    sum: Employee_roleSumAggregateOutputType | null
    min: Employee_roleMinAggregateOutputType | null
    max: Employee_roleMaxAggregateOutputType | null
  }

  export type Employee_roleAvgAggregateOutputType = {
    employee_id: number | null
  }

  export type Employee_roleSumAggregateOutputType = {
    employee_id: number | null
  }

  export type Employee_roleMinAggregateOutputType = {
    id: string | null
    employee_id: number | null
    role_type: employee_role_type | null
    created: Date | null
  }

  export type Employee_roleMaxAggregateOutputType = {
    id: string | null
    employee_id: number | null
    role_type: employee_role_type | null
    created: Date | null
  }

  export type Employee_roleCountAggregateOutputType = {
    id: number
    employee_id: number
    role_type: number
    created: number
    _all: number
  }


  export type Employee_roleAvgAggregateInputType = {
    employee_id?: true
  }

  export type Employee_roleSumAggregateInputType = {
    employee_id?: true
  }

  export type Employee_roleMinAggregateInputType = {
    id?: true
    employee_id?: true
    role_type?: true
    created?: true
  }

  export type Employee_roleMaxAggregateInputType = {
    id?: true
    employee_id?: true
    role_type?: true
    created?: true
  }

  export type Employee_roleCountAggregateInputType = {
    id?: true
    employee_id?: true
    role_type?: true
    created?: true
    _all?: true
  }

  export type Employee_roleAggregateArgs = {
    /**
     * Filter which employee_role to aggregate.
    **/
    where?: employee_roleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of employee_roles to fetch.
    **/
    orderBy?: Enumerable<employee_roleOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
    **/
    cursor?: employee_roleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` employee_roles from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` employee_roles.
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned employee_roles
    **/
    count?: true | Employee_roleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    avg?: Employee_roleAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    sum?: Employee_roleSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    min?: Employee_roleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    max?: Employee_roleMaxAggregateInputType
  }

  export type GetEmployee_roleAggregateType<T extends Employee_roleAggregateArgs> = {
    [P in keyof T & keyof AggregateEmployee_role]: P extends 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEmployee_role[P]>
      : GetScalarType<T[P], AggregateEmployee_role[P]>
  }


    
    
  export type Employee_roleGroupByArgs = {
    where?: employee_roleWhereInput
    orderBy?: Enumerable<employee_roleOrderByInput>
    by: Array<Employee_roleScalarFieldEnum>
    having?: employee_roleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    count?: Employee_roleCountAggregateInputType | true
    avg?: Employee_roleAvgAggregateInputType
    sum?: Employee_roleSumAggregateInputType
    min?: Employee_roleMinAggregateInputType
    max?: Employee_roleMaxAggregateInputType
  }


  export type Employee_roleGroupByOutputType = {
    id: string
    employee_id: number
    role_type: employee_role_type
    created: Date | null
    count: Employee_roleCountAggregateOutputType | null
    avg: Employee_roleAvgAggregateOutputType | null
    sum: Employee_roleSumAggregateOutputType | null
    min: Employee_roleMinAggregateOutputType | null
    max: Employee_roleMaxAggregateOutputType | null
  }

  type GetEmployee_roleGroupByPayload<T extends Employee_roleGroupByArgs> = Promise<Array<
    PickArray<Employee_roleGroupByOutputType, T['by']> & {
      [P in ((keyof T) & (keyof Employee_roleGroupByOutputType))]: GetScalarType<T[P], Employee_roleGroupByOutputType[P]>
    }
  >>
    

  export type employee_roleSelect = {
    id?: boolean
    employee_id?: boolean
    role_type?: boolean
    created?: boolean
    employees?: boolean | employeesArgs
  }

  export type employee_roleInclude = {
    employees?: boolean | employeesArgs
  }

  export type employee_roleGetPayload<
    S extends boolean | null | undefined | employee_roleArgs,
    U = keyof S
      > = S extends true
        ? employee_role
    : S extends undefined
    ? never
    : S extends employee_roleArgs | employee_roleFindManyArgs
    ?'include' extends U
    ? employee_role  & {
    [P in TrueKeys<S['include']>]: 
          P extends 'employees'
        ? employeesGetPayload<S['include'][P]> : never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof employee_role ?employee_role [P]
  : 
          P extends 'employees'
        ? employeesGetPayload<S['select'][P]> : never
  } 
    : employee_role
  : employee_role


  type employee_roleCountArgs = Merge<
    Omit<employee_roleFindManyArgs, 'select' | 'include'> & {
      select?: Employee_roleCountAggregateInputType | true
    }
  >

  export interface employee_roleDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Employee_role that matches the filter.
     * @param {employee_roleFindUniqueArgs} args - Arguments to find a Employee_role
     * @example
     * // Get one Employee_role
     * const employee_role = await prisma.employee_role.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends employee_roleFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, employee_roleFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'employee_role'> extends True ? CheckSelect<T, Prisma__employee_roleClient<employee_role>, Prisma__employee_roleClient<employee_roleGetPayload<T>>> : CheckSelect<T, Prisma__employee_roleClient<employee_role | null >, Prisma__employee_roleClient<employee_roleGetPayload<T> | null >>

    /**
     * Find the first Employee_role that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {employee_roleFindFirstArgs} args - Arguments to find a Employee_role
     * @example
     * // Get one Employee_role
     * const employee_role = await prisma.employee_role.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends employee_roleFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, employee_roleFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'employee_role'> extends True ? CheckSelect<T, Prisma__employee_roleClient<employee_role>, Prisma__employee_roleClient<employee_roleGetPayload<T>>> : CheckSelect<T, Prisma__employee_roleClient<employee_role | null >, Prisma__employee_roleClient<employee_roleGetPayload<T> | null >>

    /**
     * Find zero or more Employee_roles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {employee_roleFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Employee_roles
     * const employee_roles = await prisma.employee_role.findMany()
     * 
     * // Get first 10 Employee_roles
     * const employee_roles = await prisma.employee_role.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const employee_roleWithIdOnly = await prisma.employee_role.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends employee_roleFindManyArgs>(
      args?: SelectSubset<T, employee_roleFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<employee_role>>, PrismaPromise<Array<employee_roleGetPayload<T>>>>

    /**
     * Create a Employee_role.
     * @param {employee_roleCreateArgs} args - Arguments to create a Employee_role.
     * @example
     * // Create one Employee_role
     * const Employee_role = await prisma.employee_role.create({
     *   data: {
     *     // ... data to create a Employee_role
     *   }
     * })
     * 
    **/
    create<T extends employee_roleCreateArgs>(
      args: SelectSubset<T, employee_roleCreateArgs>
    ): CheckSelect<T, Prisma__employee_roleClient<employee_role>, Prisma__employee_roleClient<employee_roleGetPayload<T>>>

    /**
     * Create many Employee_roles.
     *     @param {employee_roleCreateManyArgs} args - Arguments to create many Employee_roles.
     *     @example
     *     // Create many Employee_roles
     *     const employee_role = await prisma.employee_role.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends employee_roleCreateManyArgs>(
      args?: SelectSubset<T, employee_roleCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Employee_role.
     * @param {employee_roleDeleteArgs} args - Arguments to delete one Employee_role.
     * @example
     * // Delete one Employee_role
     * const Employee_role = await prisma.employee_role.delete({
     *   where: {
     *     // ... filter to delete one Employee_role
     *   }
     * })
     * 
    **/
    delete<T extends employee_roleDeleteArgs>(
      args: SelectSubset<T, employee_roleDeleteArgs>
    ): CheckSelect<T, Prisma__employee_roleClient<employee_role>, Prisma__employee_roleClient<employee_roleGetPayload<T>>>

    /**
     * Update one Employee_role.
     * @param {employee_roleUpdateArgs} args - Arguments to update one Employee_role.
     * @example
     * // Update one Employee_role
     * const employee_role = await prisma.employee_role.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends employee_roleUpdateArgs>(
      args: SelectSubset<T, employee_roleUpdateArgs>
    ): CheckSelect<T, Prisma__employee_roleClient<employee_role>, Prisma__employee_roleClient<employee_roleGetPayload<T>>>

    /**
     * Delete zero or more Employee_roles.
     * @param {employee_roleDeleteManyArgs} args - Arguments to filter Employee_roles to delete.
     * @example
     * // Delete a few Employee_roles
     * const { count } = await prisma.employee_role.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends employee_roleDeleteManyArgs>(
      args?: SelectSubset<T, employee_roleDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Employee_roles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {employee_roleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Employee_roles
     * const employee_role = await prisma.employee_role.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends employee_roleUpdateManyArgs>(
      args: SelectSubset<T, employee_roleUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Employee_role.
     * @param {employee_roleUpsertArgs} args - Arguments to update or create a Employee_role.
     * @example
     * // Update or create a Employee_role
     * const employee_role = await prisma.employee_role.upsert({
     *   create: {
     *     // ... data to create a Employee_role
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Employee_role we want to update
     *   }
     * })
    **/
    upsert<T extends employee_roleUpsertArgs>(
      args: SelectSubset<T, employee_roleUpsertArgs>
    ): CheckSelect<T, Prisma__employee_roleClient<employee_role>, Prisma__employee_roleClient<employee_roleGetPayload<T>>>

    /**
     * Count the number of Employee_roles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {employee_roleCountArgs} args - Arguments to filter Employee_roles to count.
     * @example
     * // Count the number of Employee_roles
     * const count = await prisma.employee_role.count({
     *   where: {
     *     // ... the filter for the Employee_roles we want to count
     *   }
     * })
    **/
    count<T extends employee_roleCountArgs>(
      args?: Subset<T, employee_roleCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Employee_roleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Employee_role.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Employee_roleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Employee_roleAggregateArgs>(args: Subset<T, Employee_roleAggregateArgs>): PrismaPromise<GetEmployee_roleAggregateType<T>>

    /**
     * Group by Employee_role.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Employee_roleGroupByArgs} args - Group by arguments.
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
      T extends Employee_roleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: Employee_roleGroupByArgs['orderBy'] }
        : { orderBy?: Employee_roleGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, Employee_roleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEmployee_roleGroupByPayload<T> : Promise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for employee_role.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in 
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__employee_roleClient<T> implements PrismaPromise<T> {
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

    employees<T extends employeesArgs = {}>(args?: Subset<T, employeesArgs>): CheckSelect<T, Prisma__employeesClient<employees | null >, Prisma__employeesClient<employeesGetPayload<T> | null >>;

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
   * employee_role findUnique
   */
  export type employee_roleFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the employee_role
    **/
    select?: employee_roleSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: employee_roleInclude | null
    /**
     * Throw an Error if a employee_role can't be found
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which employee_role to fetch.
    **/
    where: employee_roleWhereUniqueInput
  }


  /**
   * employee_role findFirst
   */
  export type employee_roleFindFirstArgs = {
    /**
     * Select specific fields to fetch from the employee_role
    **/
    select?: employee_roleSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: employee_roleInclude | null
    /**
     * Throw an Error if a employee_role can't be found
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which employee_role to fetch.
    **/
    where?: employee_roleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of employee_roles to fetch.
    **/
    orderBy?: Enumerable<employee_roleOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for employee_roles.
    **/
    cursor?: employee_roleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` employee_roles from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` employee_roles.
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of employee_roles.
    **/
    distinct?: Enumerable<Employee_roleScalarFieldEnum>
  }


  /**
   * employee_role findMany
   */
  export type employee_roleFindManyArgs = {
    /**
     * Select specific fields to fetch from the employee_role
    **/
    select?: employee_roleSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: employee_roleInclude | null
    /**
     * Filter, which employee_roles to fetch.
    **/
    where?: employee_roleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of employee_roles to fetch.
    **/
    orderBy?: Enumerable<employee_roleOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing employee_roles.
    **/
    cursor?: employee_roleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` employee_roles from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` employee_roles.
    **/
    skip?: number
    distinct?: Enumerable<Employee_roleScalarFieldEnum>
  }


  /**
   * employee_role create
   */
  export type employee_roleCreateArgs = {
    /**
     * Select specific fields to fetch from the employee_role
    **/
    select?: employee_roleSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: employee_roleInclude | null
    /**
     * The data needed to create a employee_role.
    **/
    data: XOR<employee_roleCreateInput, employee_roleUncheckedCreateInput>
  }


  /**
   * employee_role createMany
   */
  export type employee_roleCreateManyArgs = {
    data: Enumerable<employee_roleCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * employee_role update
   */
  export type employee_roleUpdateArgs = {
    /**
     * Select specific fields to fetch from the employee_role
    **/
    select?: employee_roleSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: employee_roleInclude | null
    /**
     * The data needed to update a employee_role.
    **/
    data: XOR<employee_roleUpdateInput, employee_roleUncheckedUpdateInput>
    /**
     * Choose, which employee_role to update.
    **/
    where: employee_roleWhereUniqueInput
  }


  /**
   * employee_role updateMany
   */
  export type employee_roleUpdateManyArgs = {
    data: XOR<employee_roleUpdateManyMutationInput, employee_roleUncheckedUpdateManyInput>
    where?: employee_roleWhereInput
  }


  /**
   * employee_role upsert
   */
  export type employee_roleUpsertArgs = {
    /**
     * Select specific fields to fetch from the employee_role
    **/
    select?: employee_roleSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: employee_roleInclude | null
    /**
     * The filter to search for the employee_role to update in case it exists.
    **/
    where: employee_roleWhereUniqueInput
    /**
     * In case the employee_role found by the `where` argument doesn't exist, create a new employee_role with this data.
    **/
    create: XOR<employee_roleCreateInput, employee_roleUncheckedCreateInput>
    /**
     * In case the employee_role was found with the provided `where` argument, update it with this data.
    **/
    update: XOR<employee_roleUpdateInput, employee_roleUncheckedUpdateInput>
  }


  /**
   * employee_role delete
   */
  export type employee_roleDeleteArgs = {
    /**
     * Select specific fields to fetch from the employee_role
    **/
    select?: employee_roleSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: employee_roleInclude | null
    /**
     * Filter which employee_role to delete.
    **/
    where: employee_roleWhereUniqueInput
  }


  /**
   * employee_role deleteMany
   */
  export type employee_roleDeleteManyArgs = {
    where?: employee_roleWhereInput
  }


  /**
   * employee_role without action
   */
  export type employee_roleArgs = {
    /**
     * Select specific fields to fetch from the employee_role
    **/
    select?: employee_roleSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: employee_roleInclude | null
  }



  /**
   * Model employees
   */


  export type AggregateEmployees = {
    count: EmployeesCountAggregateOutputType | null
    avg: EmployeesAvgAggregateOutputType | null
    sum: EmployeesSumAggregateOutputType | null
    min: EmployeesMinAggregateOutputType | null
    max: EmployeesMaxAggregateOutputType | null
  }

  export type EmployeesAvgAggregateOutputType = {
    id: number | null
  }

  export type EmployeesSumAggregateOutputType = {
    id: number | null
  }

  export type EmployeesMinAggregateOutputType = {
    id: number | null
    first_name: string | null
    last_name: string | null
    title: string | null
    phone: string | null
    email: string | null
    gender: gender | null
    birth_date: Date | null
    date_of_employment: Date | null
    termination_date: Date | null
    emergency_contact_name: string | null
    emergency_contact_phone: string | null
    emergency_contact_relation: string | null
    address: string | null
    postal_code: string | null
    city: string | null
    image_url: string | null
    has_permanent_position: boolean | null
    emoji: string | null
    role: string | null
    bio: string | null
  }

  export type EmployeesMaxAggregateOutputType = {
    id: number | null
    first_name: string | null
    last_name: string | null
    title: string | null
    phone: string | null
    email: string | null
    gender: gender | null
    birth_date: Date | null
    date_of_employment: Date | null
    termination_date: Date | null
    emergency_contact_name: string | null
    emergency_contact_phone: string | null
    emergency_contact_relation: string | null
    address: string | null
    postal_code: string | null
    city: string | null
    image_url: string | null
    has_permanent_position: boolean | null
    emoji: string | null
    role: string | null
    bio: string | null
  }

  export type EmployeesCountAggregateOutputType = {
    id: number
    first_name: number
    last_name: number
    title: number
    phone: number
    email: number
    gender: number
    birth_date: number
    date_of_employment: number
    termination_date: number
    emergency_contact_name: number
    emergency_contact_phone: number
    emergency_contact_relation: number
    address: number
    postal_code: number
    city: number
    image_url: number
    has_permanent_position: number
    emoji: number
    role: number
    bio: number
    _all: number
  }


  export type EmployeesAvgAggregateInputType = {
    id?: true
  }

  export type EmployeesSumAggregateInputType = {
    id?: true
  }

  export type EmployeesMinAggregateInputType = {
    id?: true
    first_name?: true
    last_name?: true
    title?: true
    phone?: true
    email?: true
    gender?: true
    birth_date?: true
    date_of_employment?: true
    termination_date?: true
    emergency_contact_name?: true
    emergency_contact_phone?: true
    emergency_contact_relation?: true
    address?: true
    postal_code?: true
    city?: true
    image_url?: true
    has_permanent_position?: true
    emoji?: true
    role?: true
    bio?: true
  }

  export type EmployeesMaxAggregateInputType = {
    id?: true
    first_name?: true
    last_name?: true
    title?: true
    phone?: true
    email?: true
    gender?: true
    birth_date?: true
    date_of_employment?: true
    termination_date?: true
    emergency_contact_name?: true
    emergency_contact_phone?: true
    emergency_contact_relation?: true
    address?: true
    postal_code?: true
    city?: true
    image_url?: true
    has_permanent_position?: true
    emoji?: true
    role?: true
    bio?: true
  }

  export type EmployeesCountAggregateInputType = {
    id?: true
    first_name?: true
    last_name?: true
    title?: true
    phone?: true
    email?: true
    gender?: true
    birth_date?: true
    date_of_employment?: true
    termination_date?: true
    emergency_contact_name?: true
    emergency_contact_phone?: true
    emergency_contact_relation?: true
    address?: true
    postal_code?: true
    city?: true
    image_url?: true
    has_permanent_position?: true
    emoji?: true
    role?: true
    bio?: true
    _all?: true
  }

  export type EmployeesAggregateArgs = {
    /**
     * Filter which employees to aggregate.
    **/
    where?: employeesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of employees to fetch.
    **/
    orderBy?: Enumerable<employeesOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
    **/
    cursor?: employeesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` employees from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` employees.
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned employees
    **/
    count?: true | EmployeesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    avg?: EmployeesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    sum?: EmployeesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    min?: EmployeesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    max?: EmployeesMaxAggregateInputType
  }

  export type GetEmployeesAggregateType<T extends EmployeesAggregateArgs> = {
    [P in keyof T & keyof AggregateEmployees]: P extends 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEmployees[P]>
      : GetScalarType<T[P], AggregateEmployees[P]>
  }


    
    
  export type EmployeesGroupByArgs = {
    where?: employeesWhereInput
    orderBy?: Enumerable<employeesOrderByInput>
    by: Array<EmployeesScalarFieldEnum>
    having?: employeesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    count?: EmployeesCountAggregateInputType | true
    avg?: EmployeesAvgAggregateInputType
    sum?: EmployeesSumAggregateInputType
    min?: EmployeesMinAggregateInputType
    max?: EmployeesMaxAggregateInputType
  }


  export type EmployeesGroupByOutputType = {
    id: number
    first_name: string
    last_name: string
    title: string | null
    phone: string
    email: string
    gender: gender
    birth_date: Date
    date_of_employment: Date | null
    termination_date: Date | null
    emergency_contact_name: string | null
    emergency_contact_phone: string | null
    emergency_contact_relation: string | null
    address: string | null
    postal_code: string | null
    city: string | null
    image_url: string | null
    has_permanent_position: boolean | null
    emoji: string | null
    role: string | null
    bio: string | null
    count: EmployeesCountAggregateOutputType | null
    avg: EmployeesAvgAggregateOutputType | null
    sum: EmployeesSumAggregateOutputType | null
    min: EmployeesMinAggregateOutputType | null
    max: EmployeesMaxAggregateOutputType | null
  }

  type GetEmployeesGroupByPayload<T extends EmployeesGroupByArgs> = Promise<Array<
    PickArray<EmployeesGroupByOutputType, T['by']> & {
      [P in ((keyof T) & (keyof EmployeesGroupByOutputType))]: GetScalarType<T[P], EmployeesGroupByOutputType[P]>
    }
  >>
    

  export type employeesSelect = {
    id?: boolean
    first_name?: boolean
    last_name?: boolean
    title?: boolean
    phone?: boolean
    email?: boolean
    gender?: boolean
    birth_date?: boolean
    date_of_employment?: boolean
    termination_date?: boolean
    emergency_contact_name?: boolean
    emergency_contact_phone?: boolean
    emergency_contact_relation?: boolean
    address?: boolean
    postal_code?: boolean
    city?: boolean
    image_url?: boolean
    has_permanent_position?: boolean
    emoji?: boolean
    role?: boolean
    bio?: boolean
    employee_role?: boolean | employee_roleFindManyArgs
  }

  export type employeesInclude = {
    employee_role?: boolean | employee_roleFindManyArgs
  }

  export type employeesGetPayload<
    S extends boolean | null | undefined | employeesArgs,
    U = keyof S
      > = S extends true
        ? employees
    : S extends undefined
    ? never
    : S extends employeesArgs | employeesFindManyArgs
    ?'include' extends U
    ? employees  & {
    [P in TrueKeys<S['include']>]: 
          P extends 'employee_role'
        ? Array < employee_roleGetPayload<S['include'][P]>>  : never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof employees ?employees [P]
  : 
          P extends 'employee_role'
        ? Array < employee_roleGetPayload<S['select'][P]>>  : never
  } 
    : employees
  : employees


  type employeesCountArgs = Merge<
    Omit<employeesFindManyArgs, 'select' | 'include'> & {
      select?: EmployeesCountAggregateInputType | true
    }
  >

  export interface employeesDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Employees that matches the filter.
     * @param {employeesFindUniqueArgs} args - Arguments to find a Employees
     * @example
     * // Get one Employees
     * const employees = await prisma.employees.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends employeesFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, employeesFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'employees'> extends True ? CheckSelect<T, Prisma__employeesClient<employees>, Prisma__employeesClient<employeesGetPayload<T>>> : CheckSelect<T, Prisma__employeesClient<employees | null >, Prisma__employeesClient<employeesGetPayload<T> | null >>

    /**
     * Find the first Employees that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {employeesFindFirstArgs} args - Arguments to find a Employees
     * @example
     * // Get one Employees
     * const employees = await prisma.employees.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends employeesFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, employeesFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'employees'> extends True ? CheckSelect<T, Prisma__employeesClient<employees>, Prisma__employeesClient<employeesGetPayload<T>>> : CheckSelect<T, Prisma__employeesClient<employees | null >, Prisma__employeesClient<employeesGetPayload<T> | null >>

    /**
     * Find zero or more Employees that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {employeesFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Employees
     * const employees = await prisma.employees.findMany()
     * 
     * // Get first 10 Employees
     * const employees = await prisma.employees.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const employeesWithIdOnly = await prisma.employees.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends employeesFindManyArgs>(
      args?: SelectSubset<T, employeesFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<employees>>, PrismaPromise<Array<employeesGetPayload<T>>>>

    /**
     * Create a Employees.
     * @param {employeesCreateArgs} args - Arguments to create a Employees.
     * @example
     * // Create one Employees
     * const Employees = await prisma.employees.create({
     *   data: {
     *     // ... data to create a Employees
     *   }
     * })
     * 
    **/
    create<T extends employeesCreateArgs>(
      args: SelectSubset<T, employeesCreateArgs>
    ): CheckSelect<T, Prisma__employeesClient<employees>, Prisma__employeesClient<employeesGetPayload<T>>>

    /**
     * Create many Employees.
     *     @param {employeesCreateManyArgs} args - Arguments to create many Employees.
     *     @example
     *     // Create many Employees
     *     const employees = await prisma.employees.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends employeesCreateManyArgs>(
      args?: SelectSubset<T, employeesCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Employees.
     * @param {employeesDeleteArgs} args - Arguments to delete one Employees.
     * @example
     * // Delete one Employees
     * const Employees = await prisma.employees.delete({
     *   where: {
     *     // ... filter to delete one Employees
     *   }
     * })
     * 
    **/
    delete<T extends employeesDeleteArgs>(
      args: SelectSubset<T, employeesDeleteArgs>
    ): CheckSelect<T, Prisma__employeesClient<employees>, Prisma__employeesClient<employeesGetPayload<T>>>

    /**
     * Update one Employees.
     * @param {employeesUpdateArgs} args - Arguments to update one Employees.
     * @example
     * // Update one Employees
     * const employees = await prisma.employees.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends employeesUpdateArgs>(
      args: SelectSubset<T, employeesUpdateArgs>
    ): CheckSelect<T, Prisma__employeesClient<employees>, Prisma__employeesClient<employeesGetPayload<T>>>

    /**
     * Delete zero or more Employees.
     * @param {employeesDeleteManyArgs} args - Arguments to filter Employees to delete.
     * @example
     * // Delete a few Employees
     * const { count } = await prisma.employees.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends employeesDeleteManyArgs>(
      args?: SelectSubset<T, employeesDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Employees.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {employeesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Employees
     * const employees = await prisma.employees.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends employeesUpdateManyArgs>(
      args: SelectSubset<T, employeesUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Employees.
     * @param {employeesUpsertArgs} args - Arguments to update or create a Employees.
     * @example
     * // Update or create a Employees
     * const employees = await prisma.employees.upsert({
     *   create: {
     *     // ... data to create a Employees
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Employees we want to update
     *   }
     * })
    **/
    upsert<T extends employeesUpsertArgs>(
      args: SelectSubset<T, employeesUpsertArgs>
    ): CheckSelect<T, Prisma__employeesClient<employees>, Prisma__employeesClient<employeesGetPayload<T>>>

    /**
     * Count the number of Employees.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {employeesCountArgs} args - Arguments to filter Employees to count.
     * @example
     * // Count the number of Employees
     * const count = await prisma.employees.count({
     *   where: {
     *     // ... the filter for the Employees we want to count
     *   }
     * })
    **/
    count<T extends employeesCountArgs>(
      args?: Subset<T, employeesCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EmployeesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Employees.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends EmployeesAggregateArgs>(args: Subset<T, EmployeesAggregateArgs>): PrismaPromise<GetEmployeesAggregateType<T>>

    /**
     * Group by Employees.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeesGroupByArgs} args - Group by arguments.
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
      T extends EmployeesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EmployeesGroupByArgs['orderBy'] }
        : { orderBy?: EmployeesGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, EmployeesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEmployeesGroupByPayload<T> : Promise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for employees.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in 
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__employeesClient<T> implements PrismaPromise<T> {
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

    employee_role<T extends employee_roleFindManyArgs = {}>(args?: Subset<T, employee_roleFindManyArgs>): CheckSelect<T, PrismaPromise<Array<employee_role>>, PrismaPromise<Array<employee_roleGetPayload<T>>>>;

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
   * employees findUnique
   */
  export type employeesFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the employees
    **/
    select?: employeesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: employeesInclude | null
    /**
     * Throw an Error if a employees can't be found
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which employees to fetch.
    **/
    where: employeesWhereUniqueInput
  }


  /**
   * employees findFirst
   */
  export type employeesFindFirstArgs = {
    /**
     * Select specific fields to fetch from the employees
    **/
    select?: employeesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: employeesInclude | null
    /**
     * Throw an Error if a employees can't be found
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which employees to fetch.
    **/
    where?: employeesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of employees to fetch.
    **/
    orderBy?: Enumerable<employeesOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for employees.
    **/
    cursor?: employeesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` employees from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` employees.
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of employees.
    **/
    distinct?: Enumerable<EmployeesScalarFieldEnum>
  }


  /**
   * employees findMany
   */
  export type employeesFindManyArgs = {
    /**
     * Select specific fields to fetch from the employees
    **/
    select?: employeesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: employeesInclude | null
    /**
     * Filter, which employees to fetch.
    **/
    where?: employeesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of employees to fetch.
    **/
    orderBy?: Enumerable<employeesOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing employees.
    **/
    cursor?: employeesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` employees from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` employees.
    **/
    skip?: number
    distinct?: Enumerable<EmployeesScalarFieldEnum>
  }


  /**
   * employees create
   */
  export type employeesCreateArgs = {
    /**
     * Select specific fields to fetch from the employees
    **/
    select?: employeesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: employeesInclude | null
    /**
     * The data needed to create a employees.
    **/
    data: XOR<employeesCreateInput, employeesUncheckedCreateInput>
  }


  /**
   * employees createMany
   */
  export type employeesCreateManyArgs = {
    data: Enumerable<employeesCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * employees update
   */
  export type employeesUpdateArgs = {
    /**
     * Select specific fields to fetch from the employees
    **/
    select?: employeesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: employeesInclude | null
    /**
     * The data needed to update a employees.
    **/
    data: XOR<employeesUpdateInput, employeesUncheckedUpdateInput>
    /**
     * Choose, which employees to update.
    **/
    where: employeesWhereUniqueInput
  }


  /**
   * employees updateMany
   */
  export type employeesUpdateManyArgs = {
    data: XOR<employeesUpdateManyMutationInput, employeesUncheckedUpdateManyInput>
    where?: employeesWhereInput
  }


  /**
   * employees upsert
   */
  export type employeesUpsertArgs = {
    /**
     * Select specific fields to fetch from the employees
    **/
    select?: employeesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: employeesInclude | null
    /**
     * The filter to search for the employees to update in case it exists.
    **/
    where: employeesWhereUniqueInput
    /**
     * In case the employees found by the `where` argument doesn't exist, create a new employees with this data.
    **/
    create: XOR<employeesCreateInput, employeesUncheckedCreateInput>
    /**
     * In case the employees was found with the provided `where` argument, update it with this data.
    **/
    update: XOR<employeesUpdateInput, employeesUncheckedUpdateInput>
  }


  /**
   * employees delete
   */
  export type employeesDeleteArgs = {
    /**
     * Select specific fields to fetch from the employees
    **/
    select?: employeesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: employeesInclude | null
    /**
     * Filter which employees to delete.
    **/
    where: employeesWhereUniqueInput
  }


  /**
   * employees deleteMany
   */
  export type employeesDeleteManyArgs = {
    where?: employeesWhereInput
  }


  /**
   * employees without action
   */
  export type employeesArgs = {
    /**
     * Select specific fields to fetch from the employees
    **/
    select?: employeesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: employeesInclude | null
  }



  /**
   * Enums
   */

  // Based on
  // https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

  export const Employee_roleScalarFieldEnum: {
    id: 'id',
    employee_id: 'employee_id',
    role_type: 'role_type',
    created: 'created'
  };

  export type Employee_roleScalarFieldEnum = (typeof Employee_roleScalarFieldEnum)[keyof typeof Employee_roleScalarFieldEnum]


  export const EmployeesScalarFieldEnum: {
    id: 'id',
    first_name: 'first_name',
    last_name: 'last_name',
    title: 'title',
    phone: 'phone',
    email: 'email',
    gender: 'gender',
    birth_date: 'birth_date',
    date_of_employment: 'date_of_employment',
    termination_date: 'termination_date',
    emergency_contact_name: 'emergency_contact_name',
    emergency_contact_phone: 'emergency_contact_phone',
    emergency_contact_relation: 'emergency_contact_relation',
    address: 'address',
    postal_code: 'postal_code',
    city: 'city',
    image_url: 'image_url',
    has_permanent_position: 'has_permanent_position',
    emoji: 'emoji',
    role: 'role',
    bio: 'bio'
  };

  export type EmployeesScalarFieldEnum = (typeof EmployeesScalarFieldEnum)[keyof typeof EmployeesScalarFieldEnum]


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


  export type employee_roleWhereInput = {
    AND?: Enumerable<employee_roleWhereInput>
    OR?: Enumerable<employee_roleWhereInput>
    NOT?: Enumerable<employee_roleWhereInput>
    id?: StringFilter | string
    employee_id?: IntFilter | number
    role_type?: Enumemployee_role_typeFilter | employee_role_type
    created?: DateTimeNullableFilter | Date | string | null
    employees?: XOR<EmployeesRelationFilter, employeesWhereInput>
  }

  export type employee_roleOrderByInput = {
    id?: SortOrder
    employee_id?: SortOrder
    role_type?: SortOrder
    created?: SortOrder
  }

  export type employee_roleWhereUniqueInput = {
    id?: string
  }

  export type employee_roleScalarWhereWithAggregatesInput = {
    AND?: Enumerable<employee_roleScalarWhereWithAggregatesInput>
    OR?: Enumerable<employee_roleScalarWhereWithAggregatesInput>
    NOT?: Enumerable<employee_roleScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    employee_id?: IntWithAggregatesFilter | number
    role_type?: Enumemployee_role_typeWithAggregatesFilter | employee_role_type
    created?: DateTimeNullableWithAggregatesFilter | Date | string | null
  }

  export type employeesWhereInput = {
    AND?: Enumerable<employeesWhereInput>
    OR?: Enumerable<employeesWhereInput>
    NOT?: Enumerable<employeesWhereInput>
    id?: IntFilter | number
    first_name?: StringFilter | string
    last_name?: StringFilter | string
    title?: StringNullableFilter | string | null
    phone?: StringFilter | string
    email?: StringFilter | string
    gender?: EnumgenderFilter | gender
    birth_date?: DateTimeFilter | Date | string
    date_of_employment?: DateTimeNullableFilter | Date | string | null
    termination_date?: DateTimeNullableFilter | Date | string | null
    emergency_contact_name?: StringNullableFilter | string | null
    emergency_contact_phone?: StringNullableFilter | string | null
    emergency_contact_relation?: StringNullableFilter | string | null
    address?: StringNullableFilter | string | null
    postal_code?: StringNullableFilter | string | null
    city?: StringNullableFilter | string | null
    image_url?: StringNullableFilter | string | null
    has_permanent_position?: BoolNullableFilter | boolean | null
    emoji?: StringNullableFilter | string | null
    role?: StringNullableFilter | string | null
    bio?: StringNullableFilter | string | null
    employee_role?: Employee_roleListRelationFilter
  }

  export type employeesOrderByInput = {
    id?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    title?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    gender?: SortOrder
    birth_date?: SortOrder
    date_of_employment?: SortOrder
    termination_date?: SortOrder
    emergency_contact_name?: SortOrder
    emergency_contact_phone?: SortOrder
    emergency_contact_relation?: SortOrder
    address?: SortOrder
    postal_code?: SortOrder
    city?: SortOrder
    image_url?: SortOrder
    has_permanent_position?: SortOrder
    emoji?: SortOrder
    role?: SortOrder
    bio?: SortOrder
  }

  export type employeesWhereUniqueInput = {
    id?: number
    email?: string
  }

  export type employeesScalarWhereWithAggregatesInput = {
    AND?: Enumerable<employeesScalarWhereWithAggregatesInput>
    OR?: Enumerable<employeesScalarWhereWithAggregatesInput>
    NOT?: Enumerable<employeesScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    first_name?: StringWithAggregatesFilter | string
    last_name?: StringWithAggregatesFilter | string
    title?: StringNullableWithAggregatesFilter | string | null
    phone?: StringWithAggregatesFilter | string
    email?: StringWithAggregatesFilter | string
    gender?: EnumgenderWithAggregatesFilter | gender
    birth_date?: DateTimeWithAggregatesFilter | Date | string
    date_of_employment?: DateTimeNullableWithAggregatesFilter | Date | string | null
    termination_date?: DateTimeNullableWithAggregatesFilter | Date | string | null
    emergency_contact_name?: StringNullableWithAggregatesFilter | string | null
    emergency_contact_phone?: StringNullableWithAggregatesFilter | string | null
    emergency_contact_relation?: StringNullableWithAggregatesFilter | string | null
    address?: StringNullableWithAggregatesFilter | string | null
    postal_code?: StringNullableWithAggregatesFilter | string | null
    city?: StringNullableWithAggregatesFilter | string | null
    image_url?: StringNullableWithAggregatesFilter | string | null
    has_permanent_position?: BoolNullableWithAggregatesFilter | boolean | null
    emoji?: StringNullableWithAggregatesFilter | string | null
    role?: StringNullableWithAggregatesFilter | string | null
    bio?: StringNullableWithAggregatesFilter | string | null
  }

  export type employee_roleCreateInput = {
    id?: string
    role_type: employee_role_type
    created?: Date | string | null
    employees: employeesCreateNestedOneWithoutEmployee_roleInput
  }

  export type employee_roleUncheckedCreateInput = {
    id?: string
    employee_id: number
    role_type: employee_role_type
    created?: Date | string | null
  }

  export type employee_roleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    role_type?: Enumemployee_role_typeFieldUpdateOperationsInput | employee_role_type
    created?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    employees?: employeesUpdateOneRequiredWithoutEmployee_roleInput
  }

  export type employee_roleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: IntFieldUpdateOperationsInput | number
    role_type?: Enumemployee_role_typeFieldUpdateOperationsInput | employee_role_type
    created?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type employee_roleCreateManyInput = {
    id?: string
    employee_id: number
    role_type: employee_role_type
    created?: Date | string | null
  }

  export type employee_roleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    role_type?: Enumemployee_role_typeFieldUpdateOperationsInput | employee_role_type
    created?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type employee_roleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: IntFieldUpdateOperationsInput | number
    role_type?: Enumemployee_role_typeFieldUpdateOperationsInput | employee_role_type
    created?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type employeesCreateInput = {
    first_name: string
    last_name: string
    title?: string | null
    phone: string
    email: string
    gender: gender
    birth_date: Date | string
    date_of_employment?: Date | string | null
    termination_date?: Date | string | null
    emergency_contact_name?: string | null
    emergency_contact_phone?: string | null
    emergency_contact_relation?: string | null
    address?: string | null
    postal_code?: string | null
    city?: string | null
    image_url?: string | null
    has_permanent_position?: boolean | null
    emoji?: string | null
    role?: string | null
    bio?: string | null
    employee_role?: employee_roleCreateNestedManyWithoutEmployeesInput
  }

  export type employeesUncheckedCreateInput = {
    id?: number
    first_name: string
    last_name: string
    title?: string | null
    phone: string
    email: string
    gender: gender
    birth_date: Date | string
    date_of_employment?: Date | string | null
    termination_date?: Date | string | null
    emergency_contact_name?: string | null
    emergency_contact_phone?: string | null
    emergency_contact_relation?: string | null
    address?: string | null
    postal_code?: string | null
    city?: string | null
    image_url?: string | null
    has_permanent_position?: boolean | null
    emoji?: string | null
    role?: string | null
    bio?: string | null
    employee_role?: employee_roleUncheckedCreateNestedManyWithoutEmployeesInput
  }

  export type employeesUpdateInput = {
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    gender?: EnumgenderFieldUpdateOperationsInput | gender
    birth_date?: DateTimeFieldUpdateOperationsInput | Date | string
    date_of_employment?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    termination_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emergency_contact_name?: NullableStringFieldUpdateOperationsInput | string | null
    emergency_contact_phone?: NullableStringFieldUpdateOperationsInput | string | null
    emergency_contact_relation?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    postal_code?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    has_permanent_position?: NullableBoolFieldUpdateOperationsInput | boolean | null
    emoji?: NullableStringFieldUpdateOperationsInput | string | null
    role?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    employee_role?: employee_roleUpdateManyWithoutEmployeesInput
  }

  export type employeesUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    gender?: EnumgenderFieldUpdateOperationsInput | gender
    birth_date?: DateTimeFieldUpdateOperationsInput | Date | string
    date_of_employment?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    termination_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emergency_contact_name?: NullableStringFieldUpdateOperationsInput | string | null
    emergency_contact_phone?: NullableStringFieldUpdateOperationsInput | string | null
    emergency_contact_relation?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    postal_code?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    has_permanent_position?: NullableBoolFieldUpdateOperationsInput | boolean | null
    emoji?: NullableStringFieldUpdateOperationsInput | string | null
    role?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    employee_role?: employee_roleUncheckedUpdateManyWithoutEmployeesInput
  }

  export type employeesCreateManyInput = {
    id?: number
    first_name: string
    last_name: string
    title?: string | null
    phone: string
    email: string
    gender: gender
    birth_date: Date | string
    date_of_employment?: Date | string | null
    termination_date?: Date | string | null
    emergency_contact_name?: string | null
    emergency_contact_phone?: string | null
    emergency_contact_relation?: string | null
    address?: string | null
    postal_code?: string | null
    city?: string | null
    image_url?: string | null
    has_permanent_position?: boolean | null
    emoji?: string | null
    role?: string | null
    bio?: string | null
  }

  export type employeesUpdateManyMutationInput = {
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    gender?: EnumgenderFieldUpdateOperationsInput | gender
    birth_date?: DateTimeFieldUpdateOperationsInput | Date | string
    date_of_employment?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    termination_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emergency_contact_name?: NullableStringFieldUpdateOperationsInput | string | null
    emergency_contact_phone?: NullableStringFieldUpdateOperationsInput | string | null
    emergency_contact_relation?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    postal_code?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    has_permanent_position?: NullableBoolFieldUpdateOperationsInput | boolean | null
    emoji?: NullableStringFieldUpdateOperationsInput | string | null
    role?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type employeesUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    gender?: EnumgenderFieldUpdateOperationsInput | gender
    birth_date?: DateTimeFieldUpdateOperationsInput | Date | string
    date_of_employment?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    termination_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emergency_contact_name?: NullableStringFieldUpdateOperationsInput | string | null
    emergency_contact_phone?: NullableStringFieldUpdateOperationsInput | string | null
    emergency_contact_relation?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    postal_code?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    has_permanent_position?: NullableBoolFieldUpdateOperationsInput | boolean | null
    emoji?: NullableStringFieldUpdateOperationsInput | string | null
    role?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
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

  export type Enumemployee_role_typeFilter = {
    equals?: employee_role_type
    in?: Enumerable<employee_role_type>
    notIn?: Enumerable<employee_role_type>
    not?: NestedEnumemployee_role_typeFilter | employee_role_type
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

  export type EmployeesRelationFilter = {
    is?: employeesWhereInput
    isNot?: employeesWhereInput
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

  export type Enumemployee_role_typeWithAggregatesFilter = {
    equals?: employee_role_type
    in?: Enumerable<employee_role_type>
    notIn?: Enumerable<employee_role_type>
    not?: NestedEnumemployee_role_typeWithAggregatesFilter | employee_role_type
    count?: NestedIntFilter
    min?: NestedEnumemployee_role_typeFilter
    max?: NestedEnumemployee_role_typeFilter
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

  export type EnumgenderFilter = {
    equals?: gender
    in?: Enumerable<gender>
    notIn?: Enumerable<gender>
    not?: NestedEnumgenderFilter | gender
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

  export type BoolNullableFilter = {
    equals?: boolean | null
    not?: NestedBoolNullableFilter | boolean | null
  }

  export type Employee_roleListRelationFilter = {
    every?: employee_roleWhereInput
    some?: employee_roleWhereInput
    none?: employee_roleWhereInput
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

  export type EnumgenderWithAggregatesFilter = {
    equals?: gender
    in?: Enumerable<gender>
    notIn?: Enumerable<gender>
    not?: NestedEnumgenderWithAggregatesFilter | gender
    count?: NestedIntFilter
    min?: NestedEnumgenderFilter
    max?: NestedEnumgenderFilter
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

  export type BoolNullableWithAggregatesFilter = {
    equals?: boolean | null
    not?: NestedBoolNullableWithAggregatesFilter | boolean | null
    count?: NestedIntNullableFilter
    min?: NestedBoolNullableFilter
    max?: NestedBoolNullableFilter
  }

  export type employeesCreateNestedOneWithoutEmployee_roleInput = {
    create?: XOR<employeesCreateWithoutEmployee_roleInput, employeesUncheckedCreateWithoutEmployee_roleInput>
    connectOrCreate?: employeesCreateOrConnectWithoutEmployee_roleInput
    connect?: employeesWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type Enumemployee_role_typeFieldUpdateOperationsInput = {
    set?: employee_role_type
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type employeesUpdateOneRequiredWithoutEmployee_roleInput = {
    create?: XOR<employeesCreateWithoutEmployee_roleInput, employeesUncheckedCreateWithoutEmployee_roleInput>
    connectOrCreate?: employeesCreateOrConnectWithoutEmployee_roleInput
    upsert?: employeesUpsertWithoutEmployee_roleInput
    connect?: employeesWhereUniqueInput
    update?: XOR<employeesUpdateWithoutEmployee_roleInput, employeesUncheckedUpdateWithoutEmployee_roleInput>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type employee_roleCreateNestedManyWithoutEmployeesInput = {
    create?: XOR<Enumerable<employee_roleCreateWithoutEmployeesInput>, Enumerable<employee_roleUncheckedCreateWithoutEmployeesInput>>
    connectOrCreate?: Enumerable<employee_roleCreateOrConnectWithoutEmployeesInput>
    createMany?: employee_roleCreateManyEmployeesInputEnvelope
    connect?: Enumerable<employee_roleWhereUniqueInput>
  }

  export type employee_roleUncheckedCreateNestedManyWithoutEmployeesInput = {
    create?: XOR<Enumerable<employee_roleCreateWithoutEmployeesInput>, Enumerable<employee_roleUncheckedCreateWithoutEmployeesInput>>
    connectOrCreate?: Enumerable<employee_roleCreateOrConnectWithoutEmployeesInput>
    createMany?: employee_roleCreateManyEmployeesInputEnvelope
    connect?: Enumerable<employee_roleWhereUniqueInput>
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumgenderFieldUpdateOperationsInput = {
    set?: gender
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type employee_roleUpdateManyWithoutEmployeesInput = {
    create?: XOR<Enumerable<employee_roleCreateWithoutEmployeesInput>, Enumerable<employee_roleUncheckedCreateWithoutEmployeesInput>>
    connectOrCreate?: Enumerable<employee_roleCreateOrConnectWithoutEmployeesInput>
    upsert?: Enumerable<employee_roleUpsertWithWhereUniqueWithoutEmployeesInput>
    createMany?: employee_roleCreateManyEmployeesInputEnvelope
    connect?: Enumerable<employee_roleWhereUniqueInput>
    set?: Enumerable<employee_roleWhereUniqueInput>
    disconnect?: Enumerable<employee_roleWhereUniqueInput>
    delete?: Enumerable<employee_roleWhereUniqueInput>
    update?: Enumerable<employee_roleUpdateWithWhereUniqueWithoutEmployeesInput>
    updateMany?: Enumerable<employee_roleUpdateManyWithWhereWithoutEmployeesInput>
    deleteMany?: Enumerable<employee_roleScalarWhereInput>
  }

  export type employee_roleUncheckedUpdateManyWithoutEmployeesInput = {
    create?: XOR<Enumerable<employee_roleCreateWithoutEmployeesInput>, Enumerable<employee_roleUncheckedCreateWithoutEmployeesInput>>
    connectOrCreate?: Enumerable<employee_roleCreateOrConnectWithoutEmployeesInput>
    upsert?: Enumerable<employee_roleUpsertWithWhereUniqueWithoutEmployeesInput>
    createMany?: employee_roleCreateManyEmployeesInputEnvelope
    connect?: Enumerable<employee_roleWhereUniqueInput>
    set?: Enumerable<employee_roleWhereUniqueInput>
    disconnect?: Enumerable<employee_roleWhereUniqueInput>
    delete?: Enumerable<employee_roleWhereUniqueInput>
    update?: Enumerable<employee_roleUpdateWithWhereUniqueWithoutEmployeesInput>
    updateMany?: Enumerable<employee_roleUpdateManyWithWhereWithoutEmployeesInput>
    deleteMany?: Enumerable<employee_roleScalarWhereInput>
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

  export type NestedEnumemployee_role_typeFilter = {
    equals?: employee_role_type
    in?: Enumerable<employee_role_type>
    notIn?: Enumerable<employee_role_type>
    not?: NestedEnumemployee_role_typeFilter | employee_role_type
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

  export type NestedEnumemployee_role_typeWithAggregatesFilter = {
    equals?: employee_role_type
    in?: Enumerable<employee_role_type>
    notIn?: Enumerable<employee_role_type>
    not?: NestedEnumemployee_role_typeWithAggregatesFilter | employee_role_type
    count?: NestedIntFilter
    min?: NestedEnumemployee_role_typeFilter
    max?: NestedEnumemployee_role_typeFilter
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

  export type NestedEnumgenderFilter = {
    equals?: gender
    in?: Enumerable<gender>
    notIn?: Enumerable<gender>
    not?: NestedEnumgenderFilter | gender
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

  export type NestedBoolNullableFilter = {
    equals?: boolean | null
    not?: NestedBoolNullableFilter | boolean | null
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

  export type NestedEnumgenderWithAggregatesFilter = {
    equals?: gender
    in?: Enumerable<gender>
    notIn?: Enumerable<gender>
    not?: NestedEnumgenderWithAggregatesFilter | gender
    count?: NestedIntFilter
    min?: NestedEnumgenderFilter
    max?: NestedEnumgenderFilter
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

  export type NestedBoolNullableWithAggregatesFilter = {
    equals?: boolean | null
    not?: NestedBoolNullableWithAggregatesFilter | boolean | null
    count?: NestedIntNullableFilter
    min?: NestedBoolNullableFilter
    max?: NestedBoolNullableFilter
  }

  export type employeesCreateWithoutEmployee_roleInput = {
    first_name: string
    last_name: string
    title?: string | null
    phone: string
    email: string
    gender: gender
    birth_date: Date | string
    date_of_employment?: Date | string | null
    termination_date?: Date | string | null
    emergency_contact_name?: string | null
    emergency_contact_phone?: string | null
    emergency_contact_relation?: string | null
    address?: string | null
    postal_code?: string | null
    city?: string | null
    image_url?: string | null
    has_permanent_position?: boolean | null
    emoji?: string | null
    role?: string | null
    bio?: string | null
  }

  export type employeesUncheckedCreateWithoutEmployee_roleInput = {
    id?: number
    first_name: string
    last_name: string
    title?: string | null
    phone: string
    email: string
    gender: gender
    birth_date: Date | string
    date_of_employment?: Date | string | null
    termination_date?: Date | string | null
    emergency_contact_name?: string | null
    emergency_contact_phone?: string | null
    emergency_contact_relation?: string | null
    address?: string | null
    postal_code?: string | null
    city?: string | null
    image_url?: string | null
    has_permanent_position?: boolean | null
    emoji?: string | null
    role?: string | null
    bio?: string | null
  }

  export type employeesCreateOrConnectWithoutEmployee_roleInput = {
    where: employeesWhereUniqueInput
    create: XOR<employeesCreateWithoutEmployee_roleInput, employeesUncheckedCreateWithoutEmployee_roleInput>
  }

  export type employeesUpsertWithoutEmployee_roleInput = {
    update: XOR<employeesUpdateWithoutEmployee_roleInput, employeesUncheckedUpdateWithoutEmployee_roleInput>
    create: XOR<employeesCreateWithoutEmployee_roleInput, employeesUncheckedCreateWithoutEmployee_roleInput>
  }

  export type employeesUpdateWithoutEmployee_roleInput = {
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    gender?: EnumgenderFieldUpdateOperationsInput | gender
    birth_date?: DateTimeFieldUpdateOperationsInput | Date | string
    date_of_employment?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    termination_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emergency_contact_name?: NullableStringFieldUpdateOperationsInput | string | null
    emergency_contact_phone?: NullableStringFieldUpdateOperationsInput | string | null
    emergency_contact_relation?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    postal_code?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    has_permanent_position?: NullableBoolFieldUpdateOperationsInput | boolean | null
    emoji?: NullableStringFieldUpdateOperationsInput | string | null
    role?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type employeesUncheckedUpdateWithoutEmployee_roleInput = {
    id?: IntFieldUpdateOperationsInput | number
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    gender?: EnumgenderFieldUpdateOperationsInput | gender
    birth_date?: DateTimeFieldUpdateOperationsInput | Date | string
    date_of_employment?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    termination_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emergency_contact_name?: NullableStringFieldUpdateOperationsInput | string | null
    emergency_contact_phone?: NullableStringFieldUpdateOperationsInput | string | null
    emergency_contact_relation?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    postal_code?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    has_permanent_position?: NullableBoolFieldUpdateOperationsInput | boolean | null
    emoji?: NullableStringFieldUpdateOperationsInput | string | null
    role?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type employee_roleCreateWithoutEmployeesInput = {
    id?: string
    role_type: employee_role_type
    created?: Date | string | null
  }

  export type employee_roleUncheckedCreateWithoutEmployeesInput = {
    id?: string
    role_type: employee_role_type
    created?: Date | string | null
  }

  export type employee_roleCreateOrConnectWithoutEmployeesInput = {
    where: employee_roleWhereUniqueInput
    create: XOR<employee_roleCreateWithoutEmployeesInput, employee_roleUncheckedCreateWithoutEmployeesInput>
  }

  export type employee_roleCreateManyEmployeesInputEnvelope = {
    data: Enumerable<employee_roleCreateManyEmployeesInput>
    skipDuplicates?: boolean
  }

  export type employee_roleUpsertWithWhereUniqueWithoutEmployeesInput = {
    where: employee_roleWhereUniqueInput
    update: XOR<employee_roleUpdateWithoutEmployeesInput, employee_roleUncheckedUpdateWithoutEmployeesInput>
    create: XOR<employee_roleCreateWithoutEmployeesInput, employee_roleUncheckedCreateWithoutEmployeesInput>
  }

  export type employee_roleUpdateWithWhereUniqueWithoutEmployeesInput = {
    where: employee_roleWhereUniqueInput
    data: XOR<employee_roleUpdateWithoutEmployeesInput, employee_roleUncheckedUpdateWithoutEmployeesInput>
  }

  export type employee_roleUpdateManyWithWhereWithoutEmployeesInput = {
    where: employee_roleScalarWhereInput
    data: XOR<employee_roleUpdateManyMutationInput, employee_roleUncheckedUpdateManyWithoutEmployee_roleInput>
  }

  export type employee_roleScalarWhereInput = {
    AND?: Enumerable<employee_roleScalarWhereInput>
    OR?: Enumerable<employee_roleScalarWhereInput>
    NOT?: Enumerable<employee_roleScalarWhereInput>
    id?: StringFilter | string
    employee_id?: IntFilter | number
    role_type?: Enumemployee_role_typeFilter | employee_role_type
    created?: DateTimeNullableFilter | Date | string | null
  }

  export type employee_roleCreateManyEmployeesInput = {
    id?: string
    role_type: employee_role_type
    created?: Date | string | null
  }

  export type employee_roleUpdateWithoutEmployeesInput = {
    id?: StringFieldUpdateOperationsInput | string
    role_type?: Enumemployee_role_typeFieldUpdateOperationsInput | employee_role_type
    created?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type employee_roleUncheckedUpdateWithoutEmployeesInput = {
    id?: StringFieldUpdateOperationsInput | string
    role_type?: Enumemployee_role_typeFieldUpdateOperationsInput | employee_role_type
    created?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type employee_roleUncheckedUpdateManyWithoutEmployee_roleInput = {
    id?: StringFieldUpdateOperationsInput | string
    role_type?: Enumemployee_role_typeFieldUpdateOperationsInput | employee_role_type
    created?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
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