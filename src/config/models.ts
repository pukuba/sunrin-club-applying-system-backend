import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** 동아리 eg) nefus, layer7, unifox, teamlog, emotion */
  Club: any;
  /** A field whose value conforms with the standard mongodb object ID as described here: https://docs.mongodb.com/manual/reference/method/ObjectId/#ObjectId. Example: 5e5677d71bdc2ae76344968c */
  ObjectID: any;
  name_String_NotNull_maxLength_5: any;
  phoneNumber_String_NotNull_pattern_010098: any;
  /** 학번 eg) 10311 이는 1학년 3반 11번을 나타냅니다 */
  StudentID: any;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
  /** A field whose value conforms to the standard URL format as specified in RFC3986: https://www.ietf.org/rfc/rfc3986.txt. */
  URL: any;
  data_String_NotNull_pattern_ping: any;
  id_String_NotNull_pattern_unifoxlayer7teamlognefusemotionteacher: any;
  password_String_NotNull_maxLength_30: any;
  /** A field whose value is a JSON Web Token (JWT): https://jwt.io/introduction. */
  JWT: any;
  /** The `BigInt` scalar type represents non-fractional signed whole numeric values. */
  BigInt: any;
  /** The `Byte` scalar type represents byte value as a Buffer */
  Byte: any;
  /** A field whose value is a Currency: https://en.wikipedia.org/wiki/ISO_4217. */
  Currency: any;
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: any;
  /** A field whose value conforms to the standard DID format as specified in did-core: https://www.w3.org/TR/did-core/. */
  DID: any;
  /**
   *
   *     A string representing a duration conforming to the ISO8601 standard,
   *     such as: P1W1DT13H23M34S
   *     P is the duration designator (for period) placed at the start of the duration representation.
   *     Y is the year designator that follows the value for the number of years.
   *     M is the month designator that follows the value for the number of months.
   *     W is the week designator that follows the value for the number of weeks.
   *     D is the day designator that follows the value for the number of days.
   *     T is the time designator that precedes the time components of the representation.
   *     H is the hour designator that follows the value for the number of hours.
   *     M is the minute designator that follows the value for the number of minutes.
   *     S is the second designator that follows the value for the number of seconds.
   *
   *     Note the time designator, T, that precedes the time value.
   *
   *     Matches moment.js, Luxon and DateFns implementations
   *     ,/. is valid for decimal places and +/- is a valid prefix
   *
   */
  Duration: any;
  /** A field whose value conforms to the standard internet email address format as specified in RFC822: https://www.w3.org/Protocols/rfc822/. */
  EmailAddress: any;
  /** A field whose value is a generic Universally Unique Identifier: https://en.wikipedia.org/wiki/Universally_unique_identifier. */
  GUID: any;
  /** A field whose value is a hexadecimal: https://en.wikipedia.org/wiki/Hexadecimal. */
  Hexadecimal: any;
  /** A field whose value is a hex color code: https://en.wikipedia.org/wiki/Web_colors. */
  HexColorCode: any;
  /** A field whose value is a CSS HSL color: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#hsl()_and_hsla(). */
  HSL: any;
  /** A field whose value is a CSS HSLA color: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#hsl()_and_hsla(). */
  HSLA: any;
  /** A field whose value is an International Bank Account Number (IBAN): https://en.wikipedia.org/wiki/International_Bank_Account_Number. */
  IBAN: any;
  /** A field whose value is a IPv4 address: https://en.wikipedia.org/wiki/IPv4. */
  IPv4: any;
  /** A field whose value is a IPv6 address: https://en.wikipedia.org/wiki/IPv6. */
  IPv6: any;
  /** A field whose value is a ISBN-10 or ISBN-13 number: https://en.wikipedia.org/wiki/International_Standard_Book_Number. */
  ISBN: any;
  /**
   *
   *     A string representing a duration conforming to the ISO8601 standard,
   *     such as: P1W1DT13H23M34S
   *     P is the duration designator (for period) placed at the start of the duration representation.
   *     Y is the year designator that follows the value for the number of years.
   *     M is the month designator that follows the value for the number of months.
   *     W is the week designator that follows the value for the number of weeks.
   *     D is the day designator that follows the value for the number of days.
   *     T is the time designator that precedes the time components of the representation.
   *     H is the hour designator that follows the value for the number of hours.
   *     M is the minute designator that follows the value for the number of minutes.
   *     S is the second designator that follows the value for the number of seconds.
   *
   *     Note the time designator, T, that precedes the time value.
   *
   *     Matches moment.js, Luxon and DateFns implementations
   *     ,/. is valid for decimal places and +/- is a valid prefix
   *
   */
  ISO8601Duration: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: any;
  /** A field whose value is a valid decimal degrees latitude number (53.471): https://en.wikipedia.org/wiki/Latitude */
  Latitude: any;
  /** A local date string (i.e., with no associated timezone) in `YYYY-MM-DD` format, e.g. `2020-01-01`. */
  LocalDate: any;
  /** A local time string (i.e., with no associated timezone) in 24-hr `HH:mm[:ss[.SSS]]` format, e.g. `14:25` or `14:25:06` or `14:25:06.123`.  This scalar is very similar to the `LocalTime`, with the only difference being that `LocalEndTime` also allows `24:00` as a valid value to indicate midnight of the following day.  This is useful when using the scalar to represent the exclusive upper bound of a time block. */
  LocalEndTime: any;
  /** A local time string (i.e., with no associated timezone) in 24-hr `HH:mm[:ss[.SSS]]` format, e.g. `14:25` or `14:25:06` or `14:25:06.123`. */
  LocalTime: any;
  /** The `BigInt` scalar type represents non-fractional signed whole numeric values. */
  Long: any;
  /** A field whose value is a valid decimal degrees longitude number (53.471): https://en.wikipedia.org/wiki/Longitude */
  Longitude: any;
  /** A field whose value is a IEEE 802 48-bit MAC address: https://en.wikipedia.org/wiki/MAC_address. */
  MAC: any;
  /** Floats that will have a value less than 0. */
  NegativeFloat: any;
  /** Integers that will have a value less than 0. */
  NegativeInt: any;
  /** A string that cannot be passed as an empty value */
  NonEmptyString: any;
  /** Floats that will have a value of 0 or more. */
  NonNegativeFloat: any;
  /** Integers that will have a value of 0 or more. */
  NonNegativeInt: any;
  /** Floats that will have a value of 0 or less. */
  NonPositiveFloat: any;
  /** Integers that will have a value of 0 or less. */
  NonPositiveInt: any;
  /** A field whose value conforms to the standard E.164 format as specified in: https://en.wikipedia.org/wiki/E.164. Basically this is +17895551234. */
  PhoneNumber: any;
  /** A field whose value is a valid TCP port within the range of 0 to 65535: https://en.wikipedia.org/wiki/Transmission_Control_Protocol#TCP_ports */
  Port: any;
  /** Floats that will have a value greater than 0. */
  PositiveFloat: any;
  /** Integers that will have a value greater than 0. */
  PositiveInt: any;
  /** A field whose value conforms to the standard postal code formats for United States, United Kingdom, Germany, Canada, France, Italy, Australia, Netherlands, Spain, Denmark, Sweden, Belgium, India, Austria, Portugal, Switzerland or Luxembourg. */
  PostalCode: any;
  /** A field whose value is a CSS RGB color: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#rgb()_and_rgba(). */
  RGB: any;
  /** A field whose value is a CSS RGBA color: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#rgb()_and_rgba(). */
  RGBA: any;
  /** The `SafeInt` scalar type represents non-fractional signed whole numeric values that are considered safe as defined by the ECMAScript specification. */
  SafeInt: any;
  /** A time string at UTC, such as 10:15:30Z, compliant with the `full-time` format outlined in section 5.6 of the RFC 3339profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Time: any;
  /** The javascript `Date` as integer. Type represents date and time as number of milliseconds from start of UNIX epoch. */
  Timestamp: any;
  /** Floats that will have a value of 0 or more. */
  UnsignedFloat: any;
  /** Integers that will have a value of 0 or more. */
  UnsignedInt: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
  /** A currency string, such as $21.25 */
  USCurrency: any;
  /** A field whose value is a UTC Offset: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones */
  UtcOffset: any;
  /** A field whose value is a generic Universally Unique Identifier: https://en.wikipedia.org/wiki/Universally_unique_identifier. */
  UUID: any;
  /** Represents NULL values */
  Void: any;
};

export type Query = {
  __typename?: 'Query';
  getFormByClub: FormConnection;
  getFormByStudentId: FormConnection;
  getStudentByClub: Array<Student>;
  healthLive: Scalars['DateTime'];
};


export type QueryGetFormByClubArgs = {
  club: Scalars['Club'];
  cursor?: InputMaybe<Scalars['ObjectID']>;
  offset?: Scalars['Int'];
};


export type QueryGetFormByStudentIdArgs = {
  cursor?: InputMaybe<Scalars['ObjectID']>;
  offset?: Scalars['Int'];
  studentId: Scalars['StudentID'];
};


export type QueryGetStudentByClubArgs = {
  club: Scalars['Club'];
};

export type FormConnection = {
  __typename?: 'FormConnection';
  edges: Array<FormEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type FormEdge = {
  __typename?: 'FormEdge';
  cursor: Scalars['ObjectID'];
  node: Form;
};

export type Form = StudentInfo & {
  __typename?: 'Form';
  answerList: Array<Maybe<Scalars['String']>>;
  club: Scalars['String'];
  date: Scalars['DateTime'];
  formId: Scalars['ObjectID'];
  name: Scalars['name_String_NotNull_maxLength_5'];
  otherURLs: Array<Maybe<Scalars['URL']>>;
  phoneNumber: Scalars['phoneNumber_String_NotNull_pattern_010098'];
  portfolioURL?: Maybe<Scalars['URL']>;
  studentId: Scalars['StudentID'];
};

export type StudentInfo = {
  name: Scalars['name_String_NotNull_maxLength_5'];
  phoneNumber: Scalars['phoneNumber_String_NotNull_pattern_010098'];
  studentId: Scalars['StudentID'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['ObjectID']>;
  hasNextPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['ObjectID']>;
};

export type Student = StudentInfo & {
  __typename?: 'Student';
  name: Scalars['name_String_NotNull_maxLength_5'];
  phoneNumber: Scalars['phoneNumber_String_NotNull_pattern_010098'];
  studentId: Scalars['StudentID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createForm: Form;
  healthCheck: Scalars['String'];
  login: User;
};


export type MutationCreateFormArgs = {
  input: CreateFormInput;
};


export type MutationHealthCheckArgs = {
  input?: InputMaybe<HealthCheckInput>;
};


export type MutationLoginArgs = {
  input: LoginInput;
};

export type CreateFormInput = {
  answerList: Array<Scalars['String']>;
  club: Scalars['Club'];
  name: Scalars['name_String_NotNull_maxLength_5'];
  otherURLs: Array<InputMaybe<Scalars['URL']>>;
  portfolioURL?: InputMaybe<Scalars['URL']>;
  studentId: Scalars['StudentID'];
};

export type HealthCheckInput = {
  data: Scalars['data_String_NotNull_pattern_ping'];
};

export type LoginInput = {
  id: Scalars['id_String_NotNull_pattern_unifoxlayer7teamlognefusemotionteacher'];
  password: Scalars['password_String_NotNull_maxLength_30'];
};

export type User = {
  __typename?: 'User';
  role: Scalars['String'];
  token: Scalars['JWT'];
};

export type AdditionalEntityFields = {
  path?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};

export enum CacheControlScope {
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

export type File = {
  __typename?: 'File';
  encoding: Scalars['String'];
  filename: Scalars['String'];
  mimetype: Scalars['String'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>;
  Club: ResolverTypeWrapper<Scalars['Club']>;
  ObjectID: ResolverTypeWrapper<Scalars['ObjectID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  FormConnection: ResolverTypeWrapper<FormConnection>;
  FormEdge: ResolverTypeWrapper<FormEdge>;
  Form: ResolverTypeWrapper<Form>;
  StudentInfo: ResolversTypes['Form'] | ResolversTypes['Student'];
  name_String_NotNull_maxLength_5: ResolverTypeWrapper<Scalars['name_String_NotNull_maxLength_5']>;
  phoneNumber_String_NotNull_pattern_010098: ResolverTypeWrapper<Scalars['phoneNumber_String_NotNull_pattern_010098']>;
  StudentID: ResolverTypeWrapper<Scalars['StudentID']>;
  String: ResolverTypeWrapper<Scalars['String']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  URL: ResolverTypeWrapper<Scalars['URL']>;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Student: ResolverTypeWrapper<Student>;
  Mutation: ResolverTypeWrapper<{}>;
  CreateFormInput: CreateFormInput;
  HealthCheckInput: HealthCheckInput;
  data_String_NotNull_pattern_ping: ResolverTypeWrapper<Scalars['data_String_NotNull_pattern_ping']>;
  LoginInput: LoginInput;
  id_String_NotNull_pattern_unifoxlayer7teamlognefusemotionteacher: ResolverTypeWrapper<Scalars['id_String_NotNull_pattern_unifoxlayer7teamlognefusemotionteacher']>;
  password_String_NotNull_maxLength_30: ResolverTypeWrapper<Scalars['password_String_NotNull_maxLength_30']>;
  User: ResolverTypeWrapper<User>;
  JWT: ResolverTypeWrapper<Scalars['JWT']>;
  AdditionalEntityFields: AdditionalEntityFields;
  BigInt: ResolverTypeWrapper<Scalars['BigInt']>;
  Byte: ResolverTypeWrapper<Scalars['Byte']>;
  CacheControlScope: CacheControlScope;
  Currency: ResolverTypeWrapper<Scalars['Currency']>;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  DID: ResolverTypeWrapper<Scalars['DID']>;
  Duration: ResolverTypeWrapper<Scalars['Duration']>;
  EmailAddress: ResolverTypeWrapper<Scalars['EmailAddress']>;
  File: ResolverTypeWrapper<File>;
  GUID: ResolverTypeWrapper<Scalars['GUID']>;
  Hexadecimal: ResolverTypeWrapper<Scalars['Hexadecimal']>;
  HexColorCode: ResolverTypeWrapper<Scalars['HexColorCode']>;
  HSL: ResolverTypeWrapper<Scalars['HSL']>;
  HSLA: ResolverTypeWrapper<Scalars['HSLA']>;
  IBAN: ResolverTypeWrapper<Scalars['IBAN']>;
  IPv4: ResolverTypeWrapper<Scalars['IPv4']>;
  IPv6: ResolverTypeWrapper<Scalars['IPv6']>;
  ISBN: ResolverTypeWrapper<Scalars['ISBN']>;
  ISO8601Duration: ResolverTypeWrapper<Scalars['ISO8601Duration']>;
  JSON: ResolverTypeWrapper<Scalars['JSON']>;
  JSONObject: ResolverTypeWrapper<Scalars['JSONObject']>;
  Latitude: ResolverTypeWrapper<Scalars['Latitude']>;
  LocalDate: ResolverTypeWrapper<Scalars['LocalDate']>;
  LocalEndTime: ResolverTypeWrapper<Scalars['LocalEndTime']>;
  LocalTime: ResolverTypeWrapper<Scalars['LocalTime']>;
  Long: ResolverTypeWrapper<Scalars['Long']>;
  Longitude: ResolverTypeWrapper<Scalars['Longitude']>;
  MAC: ResolverTypeWrapper<Scalars['MAC']>;
  NegativeFloat: ResolverTypeWrapper<Scalars['NegativeFloat']>;
  NegativeInt: ResolverTypeWrapper<Scalars['NegativeInt']>;
  NonEmptyString: ResolverTypeWrapper<Scalars['NonEmptyString']>;
  NonNegativeFloat: ResolverTypeWrapper<Scalars['NonNegativeFloat']>;
  NonNegativeInt: ResolverTypeWrapper<Scalars['NonNegativeInt']>;
  NonPositiveFloat: ResolverTypeWrapper<Scalars['NonPositiveFloat']>;
  NonPositiveInt: ResolverTypeWrapper<Scalars['NonPositiveInt']>;
  PhoneNumber: ResolverTypeWrapper<Scalars['PhoneNumber']>;
  Port: ResolverTypeWrapper<Scalars['Port']>;
  PositiveFloat: ResolverTypeWrapper<Scalars['PositiveFloat']>;
  PositiveInt: ResolverTypeWrapper<Scalars['PositiveInt']>;
  PostalCode: ResolverTypeWrapper<Scalars['PostalCode']>;
  RGB: ResolverTypeWrapper<Scalars['RGB']>;
  RGBA: ResolverTypeWrapper<Scalars['RGBA']>;
  SafeInt: ResolverTypeWrapper<Scalars['SafeInt']>;
  Time: ResolverTypeWrapper<Scalars['Time']>;
  Timestamp: ResolverTypeWrapper<Scalars['Timestamp']>;
  UnsignedFloat: ResolverTypeWrapper<Scalars['UnsignedFloat']>;
  UnsignedInt: ResolverTypeWrapper<Scalars['UnsignedInt']>;
  Upload: ResolverTypeWrapper<Scalars['Upload']>;
  USCurrency: ResolverTypeWrapper<Scalars['USCurrency']>;
  UtcOffset: ResolverTypeWrapper<Scalars['UtcOffset']>;
  UUID: ResolverTypeWrapper<Scalars['UUID']>;
  Void: ResolverTypeWrapper<Scalars['Void']>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {};
  Club: Scalars['Club'];
  ObjectID: Scalars['ObjectID'];
  Int: Scalars['Int'];
  FormConnection: FormConnection;
  FormEdge: FormEdge;
  Form: Form;
  StudentInfo: ResolversParentTypes['Form'] | ResolversParentTypes['Student'];
  name_String_NotNull_maxLength_5: Scalars['name_String_NotNull_maxLength_5'];
  phoneNumber_String_NotNull_pattern_010098: Scalars['phoneNumber_String_NotNull_pattern_010098'];
  StudentID: Scalars['StudentID'];
  String: Scalars['String'];
  DateTime: Scalars['DateTime'];
  URL: Scalars['URL'];
  PageInfo: PageInfo;
  Boolean: Scalars['Boolean'];
  Student: Student;
  Mutation: {};
  CreateFormInput: CreateFormInput;
  HealthCheckInput: HealthCheckInput;
  data_String_NotNull_pattern_ping: Scalars['data_String_NotNull_pattern_ping'];
  LoginInput: LoginInput;
  id_String_NotNull_pattern_unifoxlayer7teamlognefusemotionteacher: Scalars['id_String_NotNull_pattern_unifoxlayer7teamlognefusemotionteacher'];
  password_String_NotNull_maxLength_30: Scalars['password_String_NotNull_maxLength_30'];
  User: User;
  JWT: Scalars['JWT'];
  AdditionalEntityFields: AdditionalEntityFields;
  BigInt: Scalars['BigInt'];
  Byte: Scalars['Byte'];
  Currency: Scalars['Currency'];
  Date: Scalars['Date'];
  DID: Scalars['DID'];
  Duration: Scalars['Duration'];
  EmailAddress: Scalars['EmailAddress'];
  File: File;
  GUID: Scalars['GUID'];
  Hexadecimal: Scalars['Hexadecimal'];
  HexColorCode: Scalars['HexColorCode'];
  HSL: Scalars['HSL'];
  HSLA: Scalars['HSLA'];
  IBAN: Scalars['IBAN'];
  IPv4: Scalars['IPv4'];
  IPv6: Scalars['IPv6'];
  ISBN: Scalars['ISBN'];
  ISO8601Duration: Scalars['ISO8601Duration'];
  JSON: Scalars['JSON'];
  JSONObject: Scalars['JSONObject'];
  Latitude: Scalars['Latitude'];
  LocalDate: Scalars['LocalDate'];
  LocalEndTime: Scalars['LocalEndTime'];
  LocalTime: Scalars['LocalTime'];
  Long: Scalars['Long'];
  Longitude: Scalars['Longitude'];
  MAC: Scalars['MAC'];
  NegativeFloat: Scalars['NegativeFloat'];
  NegativeInt: Scalars['NegativeInt'];
  NonEmptyString: Scalars['NonEmptyString'];
  NonNegativeFloat: Scalars['NonNegativeFloat'];
  NonNegativeInt: Scalars['NonNegativeInt'];
  NonPositiveFloat: Scalars['NonPositiveFloat'];
  NonPositiveInt: Scalars['NonPositiveInt'];
  PhoneNumber: Scalars['PhoneNumber'];
  Port: Scalars['Port'];
  PositiveFloat: Scalars['PositiveFloat'];
  PositiveInt: Scalars['PositiveInt'];
  PostalCode: Scalars['PostalCode'];
  RGB: Scalars['RGB'];
  RGBA: Scalars['RGBA'];
  SafeInt: Scalars['SafeInt'];
  Time: Scalars['Time'];
  Timestamp: Scalars['Timestamp'];
  UnsignedFloat: Scalars['UnsignedFloat'];
  UnsignedInt: Scalars['UnsignedInt'];
  Upload: Scalars['Upload'];
  USCurrency: Scalars['USCurrency'];
  UtcOffset: Scalars['UtcOffset'];
  UUID: Scalars['UUID'];
  Void: Scalars['Void'];
  Float: Scalars['Float'];
};

export type UnionDirectiveArgs = {
  discriminatorField?: Maybe<Scalars['String']>;
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>;
};

export type UnionDirectiveResolver<Result, Parent, ContextType = any, Args = UnionDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AbstractEntityDirectiveArgs = {
  discriminatorField: Scalars['String'];
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>;
};

export type AbstractEntityDirectiveResolver<Result, Parent, ContextType = any, Args = AbstractEntityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type EntityDirectiveArgs = {
  embedded?: Maybe<Scalars['Boolean']>;
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>;
};

export type EntityDirectiveResolver<Result, Parent, ContextType = any, Args = EntityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type ColumnDirectiveArgs = {
  overrideType?: Maybe<Scalars['String']>;
};

export type ColumnDirectiveResolver<Result, Parent, ContextType = any, Args = ColumnDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type IdDirectiveArgs = { };

export type IdDirectiveResolver<Result, Parent, ContextType = any, Args = IdDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type LinkDirectiveArgs = {
  overrideType?: Maybe<Scalars['String']>;
};

export type LinkDirectiveResolver<Result, Parent, ContextType = any, Args = LinkDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type EmbeddedDirectiveArgs = { };

export type EmbeddedDirectiveResolver<Result, Parent, ContextType = any, Args = EmbeddedDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type MapDirectiveArgs = {
  path: Scalars['String'];
};

export type MapDirectiveResolver<Result, Parent, ContextType = any, Args = MapDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type CacheControlDirectiveArgs = {
  inheritMaxAge?: Maybe<Scalars['Boolean']>;
  maxAge?: Maybe<Scalars['Int']>;
  scope?: Maybe<CacheControlScope>;
};

export type CacheControlDirectiveResolver<Result, Parent, ContextType = any, Args = CacheControlDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type ConstraintDirectiveArgs = {
  contains?: Maybe<Scalars['String']>;
  endsWith?: Maybe<Scalars['String']>;
  exclusiveMax?: Maybe<Scalars['Float']>;
  exclusiveMin?: Maybe<Scalars['Float']>;
  format?: Maybe<Scalars['String']>;
  max?: Maybe<Scalars['Float']>;
  maxLength?: Maybe<Scalars['Int']>;
  min?: Maybe<Scalars['Float']>;
  minLength?: Maybe<Scalars['Int']>;
  multipleOf?: Maybe<Scalars['Float']>;
  notContains?: Maybe<Scalars['String']>;
  pattern?: Maybe<Scalars['String']>;
  startsWith?: Maybe<Scalars['String']>;
  uniqueTypeName?: Maybe<Scalars['String']>;
};

export type ConstraintDirectiveResolver<Result, Parent, ContextType = any, Args = ConstraintDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getFormByClub?: Resolver<ResolversTypes['FormConnection'], ParentType, ContextType, RequireFields<QueryGetFormByClubArgs, 'club' | 'offset'>>;
  getFormByStudentId?: Resolver<ResolversTypes['FormConnection'], ParentType, ContextType, RequireFields<QueryGetFormByStudentIdArgs, 'offset' | 'studentId'>>;
  getStudentByClub?: Resolver<Array<ResolversTypes['Student']>, ParentType, ContextType, RequireFields<QueryGetStudentByClubArgs, 'club'>>;
  healthLive?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
};

export interface ClubScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Club'], any> {
  name: 'Club';
}

export interface ObjectIdScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['ObjectID'], any> {
  name: 'ObjectID';
}

export type FormConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['FormConnection'] = ResolversParentTypes['FormConnection']> = {
  edges?: Resolver<Array<ResolversTypes['FormEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FormEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['FormEdge'] = ResolversParentTypes['FormEdge']> = {
  cursor?: Resolver<ResolversTypes['ObjectID'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Form'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FormResolvers<ContextType = any, ParentType extends ResolversParentTypes['Form'] = ResolversParentTypes['Form']> = {
  answerList?: Resolver<Array<Maybe<ResolversTypes['String']>>, ParentType, ContextType>;
  club?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  date?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  formId?: Resolver<ResolversTypes['ObjectID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['name_String_NotNull_maxLength_5'], ParentType, ContextType>;
  otherURLs?: Resolver<Array<Maybe<ResolversTypes['URL']>>, ParentType, ContextType>;
  phoneNumber?: Resolver<ResolversTypes['phoneNumber_String_NotNull_pattern_010098'], ParentType, ContextType>;
  portfolioURL?: Resolver<Maybe<ResolversTypes['URL']>, ParentType, ContextType>;
  studentId?: Resolver<ResolversTypes['StudentID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StudentInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['StudentInfo'] = ResolversParentTypes['StudentInfo']> = {
  __resolveType: TypeResolveFn<'Form' | 'Student', ParentType, ContextType>;
  name?: Resolver<ResolversTypes['name_String_NotNull_maxLength_5'], ParentType, ContextType>;
  phoneNumber?: Resolver<ResolversTypes['phoneNumber_String_NotNull_pattern_010098'], ParentType, ContextType>;
  studentId?: Resolver<ResolversTypes['StudentID'], ParentType, ContextType>;
};

export interface Name_String_NotNull_MaxLength_5ScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['name_String_NotNull_maxLength_5'], any> {
  name: 'name_String_NotNull_maxLength_5';
}

export interface PhoneNumber_String_NotNull_Pattern_010098ScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['phoneNumber_String_NotNull_pattern_010098'], any> {
  name: 'phoneNumber_String_NotNull_pattern_010098';
}

export interface StudentIdScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['StudentID'], any> {
  name: 'StudentID';
}

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export interface UrlScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['URL'], any> {
  name: 'URL';
}

export type PageInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = {
  endCursor?: Resolver<Maybe<ResolversTypes['ObjectID']>, ParentType, ContextType>;
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  startCursor?: Resolver<Maybe<ResolversTypes['ObjectID']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StudentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Student'] = ResolversParentTypes['Student']> = {
  name?: Resolver<ResolversTypes['name_String_NotNull_maxLength_5'], ParentType, ContextType>;
  phoneNumber?: Resolver<ResolversTypes['phoneNumber_String_NotNull_pattern_010098'], ParentType, ContextType>;
  studentId?: Resolver<ResolversTypes['StudentID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createForm?: Resolver<ResolversTypes['Form'], ParentType, ContextType, RequireFields<MutationCreateFormArgs, 'input'>>;
  healthCheck?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationHealthCheckArgs, never>>;
  login?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'input'>>;
};

export interface Data_String_NotNull_Pattern_PingScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['data_String_NotNull_pattern_ping'], any> {
  name: 'data_String_NotNull_pattern_ping';
}

export interface Id_String_NotNull_Pattern_Unifoxlayer7teamlognefusemotionteacherScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['id_String_NotNull_pattern_unifoxlayer7teamlognefusemotionteacher'], any> {
  name: 'id_String_NotNull_pattern_unifoxlayer7teamlognefusemotionteacher';
}

export interface Password_String_NotNull_MaxLength_30ScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['password_String_NotNull_maxLength_30'], any> {
  name: 'password_String_NotNull_maxLength_30';
}

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  role?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['JWT'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface JwtScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JWT'], any> {
  name: 'JWT';
}

export interface BigIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
  name: 'BigInt';
}

export interface ByteScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Byte'], any> {
  name: 'Byte';
}

export interface CurrencyScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Currency'], any> {
  name: 'Currency';
}

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export interface DidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DID'], any> {
  name: 'DID';
}

export interface DurationScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Duration'], any> {
  name: 'Duration';
}

export interface EmailAddressScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['EmailAddress'], any> {
  name: 'EmailAddress';
}

export type FileResolvers<ContextType = any, ParentType extends ResolversParentTypes['File'] = ResolversParentTypes['File']> = {
  encoding?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  filename?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  mimetype?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface GuidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['GUID'], any> {
  name: 'GUID';
}

export interface HexadecimalScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Hexadecimal'], any> {
  name: 'Hexadecimal';
}

export interface HexColorCodeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['HexColorCode'], any> {
  name: 'HexColorCode';
}

export interface HslScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['HSL'], any> {
  name: 'HSL';
}

export interface HslaScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['HSLA'], any> {
  name: 'HSLA';
}

export interface IbanScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['IBAN'], any> {
  name: 'IBAN';
}

export interface IPv4ScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['IPv4'], any> {
  name: 'IPv4';
}

export interface IPv6ScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['IPv6'], any> {
  name: 'IPv6';
}

export interface IsbnScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['ISBN'], any> {
  name: 'ISBN';
}

export interface Iso8601DurationScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['ISO8601Duration'], any> {
  name: 'ISO8601Duration';
}

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export interface JsonObjectScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSONObject'], any> {
  name: 'JSONObject';
}

export interface LatitudeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Latitude'], any> {
  name: 'Latitude';
}

export interface LocalDateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['LocalDate'], any> {
  name: 'LocalDate';
}

export interface LocalEndTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['LocalEndTime'], any> {
  name: 'LocalEndTime';
}

export interface LocalTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['LocalTime'], any> {
  name: 'LocalTime';
}

export interface LongScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Long'], any> {
  name: 'Long';
}

export interface LongitudeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Longitude'], any> {
  name: 'Longitude';
}

export interface MacScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['MAC'], any> {
  name: 'MAC';
}

export interface NegativeFloatScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['NegativeFloat'], any> {
  name: 'NegativeFloat';
}

export interface NegativeIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['NegativeInt'], any> {
  name: 'NegativeInt';
}

export interface NonEmptyStringScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['NonEmptyString'], any> {
  name: 'NonEmptyString';
}

export interface NonNegativeFloatScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['NonNegativeFloat'], any> {
  name: 'NonNegativeFloat';
}

export interface NonNegativeIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['NonNegativeInt'], any> {
  name: 'NonNegativeInt';
}

export interface NonPositiveFloatScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['NonPositiveFloat'], any> {
  name: 'NonPositiveFloat';
}

export interface NonPositiveIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['NonPositiveInt'], any> {
  name: 'NonPositiveInt';
}

export interface PhoneNumberScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['PhoneNumber'], any> {
  name: 'PhoneNumber';
}

export interface PortScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Port'], any> {
  name: 'Port';
}

export interface PositiveFloatScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['PositiveFloat'], any> {
  name: 'PositiveFloat';
}

export interface PositiveIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['PositiveInt'], any> {
  name: 'PositiveInt';
}

export interface PostalCodeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['PostalCode'], any> {
  name: 'PostalCode';
}

export interface RgbScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['RGB'], any> {
  name: 'RGB';
}

export interface RgbaScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['RGBA'], any> {
  name: 'RGBA';
}

export interface SafeIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['SafeInt'], any> {
  name: 'SafeInt';
}

export interface TimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Time'], any> {
  name: 'Time';
}

export interface TimestampScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Timestamp'], any> {
  name: 'Timestamp';
}

export interface UnsignedFloatScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['UnsignedFloat'], any> {
  name: 'UnsignedFloat';
}

export interface UnsignedIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['UnsignedInt'], any> {
  name: 'UnsignedInt';
}

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload';
}

export interface UsCurrencyScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['USCurrency'], any> {
  name: 'USCurrency';
}

export interface UtcOffsetScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['UtcOffset'], any> {
  name: 'UtcOffset';
}

export interface UuidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['UUID'], any> {
  name: 'UUID';
}

export interface VoidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Void'], any> {
  name: 'Void';
}

export type Resolvers<ContextType = any> = {
  Query?: QueryResolvers<ContextType>;
  Club?: GraphQLScalarType;
  ObjectID?: GraphQLScalarType;
  FormConnection?: FormConnectionResolvers<ContextType>;
  FormEdge?: FormEdgeResolvers<ContextType>;
  Form?: FormResolvers<ContextType>;
  StudentInfo?: StudentInfoResolvers<ContextType>;
  name_String_NotNull_maxLength_5?: GraphQLScalarType;
  phoneNumber_String_NotNull_pattern_010098?: GraphQLScalarType;
  StudentID?: GraphQLScalarType;
  DateTime?: GraphQLScalarType;
  URL?: GraphQLScalarType;
  PageInfo?: PageInfoResolvers<ContextType>;
  Student?: StudentResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  data_String_NotNull_pattern_ping?: GraphQLScalarType;
  id_String_NotNull_pattern_unifoxlayer7teamlognefusemotionteacher?: GraphQLScalarType;
  password_String_NotNull_maxLength_30?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
  JWT?: GraphQLScalarType;
  BigInt?: GraphQLScalarType;
  Byte?: GraphQLScalarType;
  Currency?: GraphQLScalarType;
  Date?: GraphQLScalarType;
  DID?: GraphQLScalarType;
  Duration?: GraphQLScalarType;
  EmailAddress?: GraphQLScalarType;
  File?: FileResolvers<ContextType>;
  GUID?: GraphQLScalarType;
  Hexadecimal?: GraphQLScalarType;
  HexColorCode?: GraphQLScalarType;
  HSL?: GraphQLScalarType;
  HSLA?: GraphQLScalarType;
  IBAN?: GraphQLScalarType;
  IPv4?: GraphQLScalarType;
  IPv6?: GraphQLScalarType;
  ISBN?: GraphQLScalarType;
  ISO8601Duration?: GraphQLScalarType;
  JSON?: GraphQLScalarType;
  JSONObject?: GraphQLScalarType;
  Latitude?: GraphQLScalarType;
  LocalDate?: GraphQLScalarType;
  LocalEndTime?: GraphQLScalarType;
  LocalTime?: GraphQLScalarType;
  Long?: GraphQLScalarType;
  Longitude?: GraphQLScalarType;
  MAC?: GraphQLScalarType;
  NegativeFloat?: GraphQLScalarType;
  NegativeInt?: GraphQLScalarType;
  NonEmptyString?: GraphQLScalarType;
  NonNegativeFloat?: GraphQLScalarType;
  NonNegativeInt?: GraphQLScalarType;
  NonPositiveFloat?: GraphQLScalarType;
  NonPositiveInt?: GraphQLScalarType;
  PhoneNumber?: GraphQLScalarType;
  Port?: GraphQLScalarType;
  PositiveFloat?: GraphQLScalarType;
  PositiveInt?: GraphQLScalarType;
  PostalCode?: GraphQLScalarType;
  RGB?: GraphQLScalarType;
  RGBA?: GraphQLScalarType;
  SafeInt?: GraphQLScalarType;
  Time?: GraphQLScalarType;
  Timestamp?: GraphQLScalarType;
  UnsignedFloat?: GraphQLScalarType;
  UnsignedInt?: GraphQLScalarType;
  Upload?: GraphQLScalarType;
  USCurrency?: GraphQLScalarType;
  UtcOffset?: GraphQLScalarType;
  UUID?: GraphQLScalarType;
  Void?: GraphQLScalarType;
};

export type DirectiveResolvers<ContextType = any> = {
  union?: UnionDirectiveResolver<any, any, ContextType>;
  abstractEntity?: AbstractEntityDirectiveResolver<any, any, ContextType>;
  entity?: EntityDirectiveResolver<any, any, ContextType>;
  column?: ColumnDirectiveResolver<any, any, ContextType>;
  id?: IdDirectiveResolver<any, any, ContextType>;
  link?: LinkDirectiveResolver<any, any, ContextType>;
  embedded?: EmbeddedDirectiveResolver<any, any, ContextType>;
  map?: MapDirectiveResolver<any, any, ContextType>;
  cacheControl?: CacheControlDirectiveResolver<any, any, ContextType>;
  constraint?: ConstraintDirectiveResolver<any, any, ContextType>;
};

import { ObjectID } from 'mongodb';