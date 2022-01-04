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
  /** The `BigInt` scalar type represents non-fractional signed whole numeric values. */
  BigInt: any;
  /** The `Byte` scalar type represents byte value as a Buffer */
  Byte: any;
  /** A field whose value is a Currency: https://en.wikipedia.org/wiki/ISO_4217. */
  Currency: any;
  /** A field whose value conforms to the standard DID format as specified in did-core: https://www.w3.org/TR/did-core/. */
  DID: any;
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: any;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
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
  /** A field whose value is a CSS HSL color: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#hsl()_and_hsla(). */
  HSL: any;
  /** A field whose value is a CSS HSLA color: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#hsl()_and_hsla(). */
  HSLA: any;
  /** A field whose value is a hex color code: https://en.wikipedia.org/wiki/Web_colors. */
  HexColorCode: any;
  /** A field whose value is a hexadecimal: https://en.wikipedia.org/wiki/Hexadecimal. */
  Hexadecimal: any;
  /** A field whose value is an International Bank Account Number (IBAN): https://en.wikipedia.org/wiki/International_Bank_Account_Number. */
  IBAN: any;
  /** IPv4 혹은 IPv6 */
  IP: any;
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
  /** A field whose value is a JSON Web Token (JWT): https://jwt.io/introduction. */
  JWT: any;
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
  /** A field whose value conforms with the standard mongodb object ID as described here: https://docs.mongodb.com/manual/reference/method/ObjectId/#ObjectId. Example: 5e5677d71bdc2ae76344968c */
  ObjectID: any;
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
  /** 학번 eg) 10311 이는 1학년 3반 11번을 나타냅니다 */
  StudentID: any;
  /** A time string at UTC, such as 10:15:30Z, compliant with the `full-time` format outlined in section 5.6 of the RFC 3339profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Time: any;
  /** The javascript `Date` as integer. Type represents date and time as number of milliseconds from start of UNIX epoch. */
  Timestamp: any;
  /** A field whose value conforms to the standard URL format as specified in RFC3986: https://www.ietf.org/rfc/rfc3986.txt. */
  URL: any;
  /** A currency string, such as $21.25 */
  USCurrency: any;
  /** A field whose value is a generic Universally Unique Identifier: https://en.wikipedia.org/wiki/Universally_unique_identifier. */
  UUID: any;
  /** Floats that will have a value of 0 or more. */
  UnsignedFloat: any;
  /** Integers that will have a value of 0 or more. */
  UnsignedInt: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
  /** A field whose value is a UTC Offset: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones */
  UtcOffset: any;
  /** Represents NULL values */
  Void: any;
  data_String_NotNull_pattern_ping: any;
  id_String_NotNull_pattern_unifoxlayer7teamlognefusemotionteacher: any;
  message_String_NotNull_maxLength_80: any;
  name_String_NotNull_maxLength_5: any;
  password_String_NotNull_maxLength_30: any;
  phoneNumberList_List_ListNotNull_String_NotNull_pattern_010098: any;
  phoneNumber_String_NotNull_pattern_010098: any;
};

export type AdditionalEntityFields = {
  path?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};

export type Answer = StudentInfo & {
  __typename?: 'Answer';
  answerId: Scalars['ObjectID'];
  answerList: Array<Maybe<Scalars['String']>>;
  club: Club;
  date: Scalars['DateTime'];
  name: Scalars['name_String_NotNull_maxLength_5'];
  otherURLs: Array<Maybe<Scalars['URL']>>;
  phoneNumber: Scalars['phoneNumber_String_NotNull_pattern_010098'];
  portfolioURL?: Maybe<Scalars['URL']>;
  studentId: Scalars['StudentID'];
};

export type AnswerConnection = {
  __typename?: 'AnswerConnection';
  edges: Array<AnswerEdge>;
  pageInfo: CursorPageInfo;
  totalCount: Scalars['UnsignedInt'];
};

export type AnswerEdge = {
  __typename?: 'AnswerEdge';
  cursor: Scalars['ObjectID'];
  node: Answer;
};

export type AnswerStatus = {
  __typename?: 'AnswerStatus';
  answerCount: Scalars['UnsignedInt'];
  club: Club;
};

export enum CacheControlScope {
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

export enum Club {
  Emotion = 'EMOTION',
  Layer7 = 'LAYER7',
  Nefus = 'NEFUS',
  Teamlog = 'TEAMLOG',
  Unifox = 'UNIFOX'
}

export type CreateAnswerInput = {
  answerList: Array<Scalars['String']>;
  club: Club;
  name: Scalars['name_String_NotNull_maxLength_5'];
  otherURLs: Array<InputMaybe<Scalars['URL']>>;
  phoneNumber: Scalars['phoneNumber_String_NotNull_pattern_010098'];
  portfolioURL?: InputMaybe<Scalars['URL']>;
  studentId: Scalars['StudentID'];
};

export type CreateAnswerInvalidInputError = Error & {
  __typename?: 'CreateAnswerInvalidInputError';
  message: Scalars['String'];
  path: Scalars['String'];
  suggestion: Scalars['String'];
};

export type CreateAnswerResult = Answer | CreateAnswerInvalidInputError | RateLimitError;

export type CursorPageInfo = {
  __typename?: 'CursorPageInfo';
  endCursor?: Maybe<Scalars['ObjectID']>;
  hasNextPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['ObjectID']>;
};

export type Error = {
  message: Scalars['String'];
  path: Scalars['String'];
  suggestion: Scalars['String'];
};

export type File = {
  __typename?: 'File';
  encoding: Scalars['String'];
  filename: Scalars['String'];
  mimetype: Scalars['String'];
};

export type Form = {
  __typename?: 'Form';
  club: Club;
  introduce: Scalars['String'];
  lastUpdatedAt: Scalars['DateTime'];
  question: Array<QuestionList>;
};

export type GetFormByClubResult = Form | InvalidFormError;

export type HealthCheckInput = {
  data: Scalars['data_String_NotNull_pattern_ping'];
};

export type InvalidAccountError = Error & {
  __typename?: 'InvalidAccountError';
  message: Scalars['String'];
  path: Scalars['String'];
  suggestion: Scalars['String'];
};

export type InvalidFormError = Error & {
  __typename?: 'InvalidFormError';
  message: Scalars['String'];
  path: Scalars['String'];
  suggestion: Scalars['String'];
};

export enum KeyType {
  Ip = 'IP',
  Role = 'ROLE'
}

export type Log = {
  __typename?: 'Log';
  date: Scalars['DateTime'];
  ip: Scalars['IP'];
  logId: Scalars['ObjectID'];
  message: Scalars['String'];
  role: Club;
  status: Scalars['Boolean'];
};

export type LogConnection = {
  __typename?: 'LogConnection';
  edges: Array<Log>;
  pageInfo: OffsetPageInfo;
  totalCount: Scalars['UnsignedInt'];
};

export type LoginInput = {
  id: Scalars['id_String_NotNull_pattern_unifoxlayer7teamlognefusemotionteacher'];
  password: Scalars['password_String_NotNull_maxLength_30'];
};

export type LoginResult = InvalidAccountError | User;

export type Mutation = {
  __typename?: 'Mutation';
  createAnswer: CreateAnswerResult;
  healthCheck: Scalars['String'];
  login: LoginResult;
  sendMessage: SendMessageResult;
  upsertForm: Form;
};


export type MutationCreateAnswerArgs = {
  input: CreateAnswerInput;
};


export type MutationHealthCheckArgs = {
  input?: InputMaybe<HealthCheckInput>;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationSendMessageArgs = {
  input: SendMessageInput;
};


export type MutationUpsertFormArgs = {
  input: UpsertFormInput;
};

export type OffsetPageInfo = {
  __typename?: 'OffsetPageInfo';
  maxPage: Scalars['UnsignedInt'];
  nowPage: Scalars['UnsignedInt'];
};

export type Query = {
  __typename?: 'Query';
  getAnswerByClub: AnswerConnection;
  getAnswerByStudentId: AnswerConnection;
  getFormByClub: GetFormByClubResult;
  getLiveAnswerStatus: Array<AnswerStatus>;
  getLogByKeyword: LogConnection;
  healthLive: Scalars['DateTime'];
};


export type QueryGetAnswerByClubArgs = {
  club: Club;
  cursor?: InputMaybe<Scalars['ObjectID']>;
  limit?: InputMaybe<Scalars['UnsignedInt']>;
};


export type QueryGetAnswerByStudentIdArgs = {
  cursor?: InputMaybe<Scalars['ObjectID']>;
  limit?: InputMaybe<Scalars['UnsignedInt']>;
  studentId: Scalars['StudentID'];
};


export type QueryGetFormByClubArgs = {
  club: Club;
};


export type QueryGetLogByKeywordArgs = {
  keyword?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['UnsignedInt']>;
  page: Scalars['UnsignedInt'];
};

export type QuestionList = {
  __typename?: 'QuestionList';
  length: Scalars['UnsignedInt'];
  question: Scalars['String'];
};

export type QuestionListInput = {
  length: Scalars['UnsignedInt'];
  question: Scalars['String'];
};

export enum Role {
  Emotion = 'EMOTION',
  Layer7 = 'LAYER7',
  Nefus = 'NEFUS',
  Teacher = 'TEACHER',
  Teamlog = 'TEAMLOG',
  Unifox = 'UNIFOX'
}

export type RateLimitError = Error & {
  __typename?: 'RateLimitError';
  afterTry: Scalars['UnsignedInt'];
  message: Scalars['String'];
  path: Scalars['String'];
  suggestion: Scalars['String'];
};

export type SendMessageInput = {
  message: Scalars['message_String_NotNull_maxLength_80'];
  phoneNumberList: Array<Scalars['phoneNumberList_List_ListNotNull_String_NotNull_pattern_010098']>;
};

export type SendMessageInvalidInputError = Error & {
  __typename?: 'SendMessageInvalidInputError';
  message: Scalars['String'];
  path: Scalars['String'];
  suggestion: Scalars['String'];
};

export type SendMessagePayload = {
  __typename?: 'SendMessagePayload';
  message: Scalars['String'];
  status: Scalars['Boolean'];
};

export type SendMessageResult = RateLimitError | SendMessageInvalidInputError | SendMessagePayload;

export type StudentInfo = {
  name: Scalars['name_String_NotNull_maxLength_5'];
  phoneNumber: Scalars['phoneNumber_String_NotNull_pattern_010098'];
  studentId: Scalars['StudentID'];
};

export type UpsertFormInput = {
  introduce?: InputMaybe<Scalars['String']>;
  question?: InputMaybe<Array<QuestionListInput>>;
};

export type User = {
  __typename?: 'User';
  role: Role;
  token: Scalars['JWT'];
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
  AdditionalEntityFields: AdditionalEntityFields;
  String: ResolverTypeWrapper<Scalars['String']>;
  Answer: ResolverTypeWrapper<Answer>;
  AnswerConnection: ResolverTypeWrapper<AnswerConnection>;
  AnswerEdge: ResolverTypeWrapper<AnswerEdge>;
  AnswerStatus: ResolverTypeWrapper<AnswerStatus>;
  BigInt: ResolverTypeWrapper<Scalars['BigInt']>;
  Byte: ResolverTypeWrapper<Scalars['Byte']>;
  CacheControlScope: CacheControlScope;
  Club: Club;
  CreateAnswerInput: CreateAnswerInput;
  CreateAnswerInvalidInputError: ResolverTypeWrapper<CreateAnswerInvalidInputError>;
  CreateAnswerResult: ResolversTypes['Answer'] | ResolversTypes['CreateAnswerInvalidInputError'] | ResolversTypes['RateLimitError'];
  Currency: ResolverTypeWrapper<Scalars['Currency']>;
  CursorPageInfo: ResolverTypeWrapper<CursorPageInfo>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  DID: ResolverTypeWrapper<Scalars['DID']>;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  Duration: ResolverTypeWrapper<Scalars['Duration']>;
  EmailAddress: ResolverTypeWrapper<Scalars['EmailAddress']>;
  Error: ResolversTypes['CreateAnswerInvalidInputError'] | ResolversTypes['InvalidAccountError'] | ResolversTypes['InvalidFormError'] | ResolversTypes['RateLimitError'] | ResolversTypes['SendMessageInvalidInputError'];
  File: ResolverTypeWrapper<File>;
  Form: ResolverTypeWrapper<Form>;
  GUID: ResolverTypeWrapper<Scalars['GUID']>;
  GetFormByClubResult: ResolversTypes['Form'] | ResolversTypes['InvalidFormError'];
  HSL: ResolverTypeWrapper<Scalars['HSL']>;
  HSLA: ResolverTypeWrapper<Scalars['HSLA']>;
  HealthCheckInput: HealthCheckInput;
  HexColorCode: ResolverTypeWrapper<Scalars['HexColorCode']>;
  Hexadecimal: ResolverTypeWrapper<Scalars['Hexadecimal']>;
  IBAN: ResolverTypeWrapper<Scalars['IBAN']>;
  IP: ResolverTypeWrapper<Scalars['IP']>;
  IPv4: ResolverTypeWrapper<Scalars['IPv4']>;
  IPv6: ResolverTypeWrapper<Scalars['IPv6']>;
  ISBN: ResolverTypeWrapper<Scalars['ISBN']>;
  ISO8601Duration: ResolverTypeWrapper<Scalars['ISO8601Duration']>;
  InvalidAccountError: ResolverTypeWrapper<InvalidAccountError>;
  InvalidFormError: ResolverTypeWrapper<InvalidFormError>;
  JSON: ResolverTypeWrapper<Scalars['JSON']>;
  JSONObject: ResolverTypeWrapper<Scalars['JSONObject']>;
  JWT: ResolverTypeWrapper<Scalars['JWT']>;
  KeyType: KeyType;
  Latitude: ResolverTypeWrapper<Scalars['Latitude']>;
  LocalDate: ResolverTypeWrapper<Scalars['LocalDate']>;
  LocalEndTime: ResolverTypeWrapper<Scalars['LocalEndTime']>;
  LocalTime: ResolverTypeWrapper<Scalars['LocalTime']>;
  Log: ResolverTypeWrapper<Log>;
  LogConnection: ResolverTypeWrapper<LogConnection>;
  LoginInput: LoginInput;
  LoginResult: ResolversTypes['InvalidAccountError'] | ResolversTypes['User'];
  Long: ResolverTypeWrapper<Scalars['Long']>;
  Longitude: ResolverTypeWrapper<Scalars['Longitude']>;
  MAC: ResolverTypeWrapper<Scalars['MAC']>;
  Mutation: ResolverTypeWrapper<{}>;
  NegativeFloat: ResolverTypeWrapper<Scalars['NegativeFloat']>;
  NegativeInt: ResolverTypeWrapper<Scalars['NegativeInt']>;
  NonEmptyString: ResolverTypeWrapper<Scalars['NonEmptyString']>;
  NonNegativeFloat: ResolverTypeWrapper<Scalars['NonNegativeFloat']>;
  NonNegativeInt: ResolverTypeWrapper<Scalars['NonNegativeInt']>;
  NonPositiveFloat: ResolverTypeWrapper<Scalars['NonPositiveFloat']>;
  NonPositiveInt: ResolverTypeWrapper<Scalars['NonPositiveInt']>;
  ObjectID: ResolverTypeWrapper<Scalars['ObjectID']>;
  OffsetPageInfo: ResolverTypeWrapper<OffsetPageInfo>;
  PhoneNumber: ResolverTypeWrapper<Scalars['PhoneNumber']>;
  Port: ResolverTypeWrapper<Scalars['Port']>;
  PositiveFloat: ResolverTypeWrapper<Scalars['PositiveFloat']>;
  PositiveInt: ResolverTypeWrapper<Scalars['PositiveInt']>;
  PostalCode: ResolverTypeWrapper<Scalars['PostalCode']>;
  Query: ResolverTypeWrapper<{}>;
  QuestionList: ResolverTypeWrapper<QuestionList>;
  QuestionListInput: QuestionListInput;
  RGB: ResolverTypeWrapper<Scalars['RGB']>;
  RGBA: ResolverTypeWrapper<Scalars['RGBA']>;
  ROLE: Role;
  RateLimitError: ResolverTypeWrapper<RateLimitError>;
  SafeInt: ResolverTypeWrapper<Scalars['SafeInt']>;
  SendMessageInput: SendMessageInput;
  SendMessageInvalidInputError: ResolverTypeWrapper<SendMessageInvalidInputError>;
  SendMessagePayload: ResolverTypeWrapper<SendMessagePayload>;
  SendMessageResult: ResolversTypes['RateLimitError'] | ResolversTypes['SendMessageInvalidInputError'] | ResolversTypes['SendMessagePayload'];
  StudentID: ResolverTypeWrapper<Scalars['StudentID']>;
  StudentInfo: ResolversTypes['Answer'];
  Time: ResolverTypeWrapper<Scalars['Time']>;
  Timestamp: ResolverTypeWrapper<Scalars['Timestamp']>;
  URL: ResolverTypeWrapper<Scalars['URL']>;
  USCurrency: ResolverTypeWrapper<Scalars['USCurrency']>;
  UUID: ResolverTypeWrapper<Scalars['UUID']>;
  UnsignedFloat: ResolverTypeWrapper<Scalars['UnsignedFloat']>;
  UnsignedInt: ResolverTypeWrapper<Scalars['UnsignedInt']>;
  Upload: ResolverTypeWrapper<Scalars['Upload']>;
  UpsertFormInput: UpsertFormInput;
  User: ResolverTypeWrapper<User>;
  UtcOffset: ResolverTypeWrapper<Scalars['UtcOffset']>;
  Void: ResolverTypeWrapper<Scalars['Void']>;
  data_String_NotNull_pattern_ping: ResolverTypeWrapper<Scalars['data_String_NotNull_pattern_ping']>;
  id_String_NotNull_pattern_unifoxlayer7teamlognefusemotionteacher: ResolverTypeWrapper<Scalars['id_String_NotNull_pattern_unifoxlayer7teamlognefusemotionteacher']>;
  message_String_NotNull_maxLength_80: ResolverTypeWrapper<Scalars['message_String_NotNull_maxLength_80']>;
  name_String_NotNull_maxLength_5: ResolverTypeWrapper<Scalars['name_String_NotNull_maxLength_5']>;
  password_String_NotNull_maxLength_30: ResolverTypeWrapper<Scalars['password_String_NotNull_maxLength_30']>;
  phoneNumberList_List_ListNotNull_String_NotNull_pattern_010098: ResolverTypeWrapper<Scalars['phoneNumberList_List_ListNotNull_String_NotNull_pattern_010098']>;
  phoneNumber_String_NotNull_pattern_010098: ResolverTypeWrapper<Scalars['phoneNumber_String_NotNull_pattern_010098']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AdditionalEntityFields: AdditionalEntityFields;
  String: Scalars['String'];
  Answer: Answer;
  AnswerConnection: AnswerConnection;
  AnswerEdge: AnswerEdge;
  AnswerStatus: AnswerStatus;
  BigInt: Scalars['BigInt'];
  Byte: Scalars['Byte'];
  CreateAnswerInput: CreateAnswerInput;
  CreateAnswerInvalidInputError: CreateAnswerInvalidInputError;
  CreateAnswerResult: ResolversParentTypes['Answer'] | ResolversParentTypes['CreateAnswerInvalidInputError'] | ResolversParentTypes['RateLimitError'];
  Currency: Scalars['Currency'];
  CursorPageInfo: CursorPageInfo;
  Boolean: Scalars['Boolean'];
  DID: Scalars['DID'];
  Date: Scalars['Date'];
  DateTime: Scalars['DateTime'];
  Duration: Scalars['Duration'];
  EmailAddress: Scalars['EmailAddress'];
  Error: ResolversParentTypes['CreateAnswerInvalidInputError'] | ResolversParentTypes['InvalidAccountError'] | ResolversParentTypes['InvalidFormError'] | ResolversParentTypes['RateLimitError'] | ResolversParentTypes['SendMessageInvalidInputError'];
  File: File;
  Form: Form;
  GUID: Scalars['GUID'];
  GetFormByClubResult: ResolversParentTypes['Form'] | ResolversParentTypes['InvalidFormError'];
  HSL: Scalars['HSL'];
  HSLA: Scalars['HSLA'];
  HealthCheckInput: HealthCheckInput;
  HexColorCode: Scalars['HexColorCode'];
  Hexadecimal: Scalars['Hexadecimal'];
  IBAN: Scalars['IBAN'];
  IP: Scalars['IP'];
  IPv4: Scalars['IPv4'];
  IPv6: Scalars['IPv6'];
  ISBN: Scalars['ISBN'];
  ISO8601Duration: Scalars['ISO8601Duration'];
  InvalidAccountError: InvalidAccountError;
  InvalidFormError: InvalidFormError;
  JSON: Scalars['JSON'];
  JSONObject: Scalars['JSONObject'];
  JWT: Scalars['JWT'];
  Latitude: Scalars['Latitude'];
  LocalDate: Scalars['LocalDate'];
  LocalEndTime: Scalars['LocalEndTime'];
  LocalTime: Scalars['LocalTime'];
  Log: Log;
  LogConnection: LogConnection;
  LoginInput: LoginInput;
  LoginResult: ResolversParentTypes['InvalidAccountError'] | ResolversParentTypes['User'];
  Long: Scalars['Long'];
  Longitude: Scalars['Longitude'];
  MAC: Scalars['MAC'];
  Mutation: {};
  NegativeFloat: Scalars['NegativeFloat'];
  NegativeInt: Scalars['NegativeInt'];
  NonEmptyString: Scalars['NonEmptyString'];
  NonNegativeFloat: Scalars['NonNegativeFloat'];
  NonNegativeInt: Scalars['NonNegativeInt'];
  NonPositiveFloat: Scalars['NonPositiveFloat'];
  NonPositiveInt: Scalars['NonPositiveInt'];
  ObjectID: Scalars['ObjectID'];
  OffsetPageInfo: OffsetPageInfo;
  PhoneNumber: Scalars['PhoneNumber'];
  Port: Scalars['Port'];
  PositiveFloat: Scalars['PositiveFloat'];
  PositiveInt: Scalars['PositiveInt'];
  PostalCode: Scalars['PostalCode'];
  Query: {};
  QuestionList: QuestionList;
  QuestionListInput: QuestionListInput;
  RGB: Scalars['RGB'];
  RGBA: Scalars['RGBA'];
  RateLimitError: RateLimitError;
  SafeInt: Scalars['SafeInt'];
  SendMessageInput: SendMessageInput;
  SendMessageInvalidInputError: SendMessageInvalidInputError;
  SendMessagePayload: SendMessagePayload;
  SendMessageResult: ResolversParentTypes['RateLimitError'] | ResolversParentTypes['SendMessageInvalidInputError'] | ResolversParentTypes['SendMessagePayload'];
  StudentID: Scalars['StudentID'];
  StudentInfo: ResolversParentTypes['Answer'];
  Time: Scalars['Time'];
  Timestamp: Scalars['Timestamp'];
  URL: Scalars['URL'];
  USCurrency: Scalars['USCurrency'];
  UUID: Scalars['UUID'];
  UnsignedFloat: Scalars['UnsignedFloat'];
  UnsignedInt: Scalars['UnsignedInt'];
  Upload: Scalars['Upload'];
  UpsertFormInput: UpsertFormInput;
  User: User;
  UtcOffset: Scalars['UtcOffset'];
  Void: Scalars['Void'];
  data_String_NotNull_pattern_ping: Scalars['data_String_NotNull_pattern_ping'];
  id_String_NotNull_pattern_unifoxlayer7teamlognefusemotionteacher: Scalars['id_String_NotNull_pattern_unifoxlayer7teamlognefusemotionteacher'];
  message_String_NotNull_maxLength_80: Scalars['message_String_NotNull_maxLength_80'];
  name_String_NotNull_maxLength_5: Scalars['name_String_NotNull_maxLength_5'];
  password_String_NotNull_maxLength_30: Scalars['password_String_NotNull_maxLength_30'];
  phoneNumberList_List_ListNotNull_String_NotNull_pattern_010098: Scalars['phoneNumberList_List_ListNotNull_String_NotNull_pattern_010098'];
  phoneNumber_String_NotNull_pattern_010098: Scalars['phoneNumber_String_NotNull_pattern_010098'];
  Int: Scalars['Int'];
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

export type RatelimitDirectiveArgs = {
  key: Scalars['String'];
  keyType: KeyType;
  max: Scalars['UnsignedInt'];
  ttl: Scalars['UnsignedInt'];
};

export type RatelimitDirectiveResolver<Result, Parent, ContextType = any, Args = RatelimitDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AnswerResolvers<ContextType = any, ParentType extends ResolversParentTypes['Answer'] = ResolversParentTypes['Answer']> = {
  answerId?: Resolver<ResolversTypes['ObjectID'], ParentType, ContextType>;
  answerList?: Resolver<Array<Maybe<ResolversTypes['String']>>, ParentType, ContextType>;
  club?: Resolver<ResolversTypes['Club'], ParentType, ContextType>;
  date?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['name_String_NotNull_maxLength_5'], ParentType, ContextType>;
  otherURLs?: Resolver<Array<Maybe<ResolversTypes['URL']>>, ParentType, ContextType>;
  phoneNumber?: Resolver<ResolversTypes['phoneNumber_String_NotNull_pattern_010098'], ParentType, ContextType>;
  portfolioURL?: Resolver<Maybe<ResolversTypes['URL']>, ParentType, ContextType>;
  studentId?: Resolver<ResolversTypes['StudentID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AnswerConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['AnswerConnection'] = ResolversParentTypes['AnswerConnection']> = {
  edges?: Resolver<Array<ResolversTypes['AnswerEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['CursorPageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['UnsignedInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AnswerEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['AnswerEdge'] = ResolversParentTypes['AnswerEdge']> = {
  cursor?: Resolver<ResolversTypes['ObjectID'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Answer'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AnswerStatusResolvers<ContextType = any, ParentType extends ResolversParentTypes['AnswerStatus'] = ResolversParentTypes['AnswerStatus']> = {
  answerCount?: Resolver<ResolversTypes['UnsignedInt'], ParentType, ContextType>;
  club?: Resolver<ResolversTypes['Club'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface BigIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
  name: 'BigInt';
}

export interface ByteScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Byte'], any> {
  name: 'Byte';
}

export type CreateAnswerInvalidInputErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateAnswerInvalidInputError'] = ResolversParentTypes['CreateAnswerInvalidInputError']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  path?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  suggestion?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateAnswerResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateAnswerResult'] = ResolversParentTypes['CreateAnswerResult']> = {
  __resolveType: TypeResolveFn<'Answer' | 'CreateAnswerInvalidInputError' | 'RateLimitError', ParentType, ContextType>;
};

export interface CurrencyScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Currency'], any> {
  name: 'Currency';
}

export type CursorPageInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['CursorPageInfo'] = ResolversParentTypes['CursorPageInfo']> = {
  endCursor?: Resolver<Maybe<ResolversTypes['ObjectID']>, ParentType, ContextType>;
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  startCursor?: Resolver<Maybe<ResolversTypes['ObjectID']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DID'], any> {
  name: 'DID';
}

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export interface DurationScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Duration'], any> {
  name: 'Duration';
}

export interface EmailAddressScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['EmailAddress'], any> {
  name: 'EmailAddress';
}

export type ErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['Error'] = ResolversParentTypes['Error']> = {
  __resolveType: TypeResolveFn<'CreateAnswerInvalidInputError' | 'InvalidAccountError' | 'InvalidFormError' | 'RateLimitError' | 'SendMessageInvalidInputError', ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  path?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  suggestion?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type FileResolvers<ContextType = any, ParentType extends ResolversParentTypes['File'] = ResolversParentTypes['File']> = {
  encoding?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  filename?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  mimetype?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FormResolvers<ContextType = any, ParentType extends ResolversParentTypes['Form'] = ResolversParentTypes['Form']> = {
  club?: Resolver<ResolversTypes['Club'], ParentType, ContextType>;
  introduce?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lastUpdatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  question?: Resolver<Array<ResolversTypes['QuestionList']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface GuidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['GUID'], any> {
  name: 'GUID';
}

export type GetFormByClubResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['GetFormByClubResult'] = ResolversParentTypes['GetFormByClubResult']> = {
  __resolveType: TypeResolveFn<'Form' | 'InvalidFormError', ParentType, ContextType>;
};

export interface HslScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['HSL'], any> {
  name: 'HSL';
}

export interface HslaScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['HSLA'], any> {
  name: 'HSLA';
}

export interface HexColorCodeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['HexColorCode'], any> {
  name: 'HexColorCode';
}

export interface HexadecimalScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Hexadecimal'], any> {
  name: 'Hexadecimal';
}

export interface IbanScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['IBAN'], any> {
  name: 'IBAN';
}

export interface IpScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['IP'], any> {
  name: 'IP';
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

export type InvalidAccountErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['InvalidAccountError'] = ResolversParentTypes['InvalidAccountError']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  path?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  suggestion?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InvalidFormErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['InvalidFormError'] = ResolversParentTypes['InvalidFormError']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  path?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  suggestion?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export interface JsonObjectScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSONObject'], any> {
  name: 'JSONObject';
}

export interface JwtScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JWT'], any> {
  name: 'JWT';
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

export type LogResolvers<ContextType = any, ParentType extends ResolversParentTypes['Log'] = ResolversParentTypes['Log']> = {
  date?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  ip?: Resolver<ResolversTypes['IP'], ParentType, ContextType>;
  logId?: Resolver<ResolversTypes['ObjectID'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  role?: Resolver<ResolversTypes['Club'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LogConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['LogConnection'] = ResolversParentTypes['LogConnection']> = {
  edges?: Resolver<Array<ResolversTypes['Log']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['OffsetPageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['UnsignedInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LoginResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['LoginResult'] = ResolversParentTypes['LoginResult']> = {
  __resolveType: TypeResolveFn<'InvalidAccountError' | 'User', ParentType, ContextType>;
};

export interface LongScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Long'], any> {
  name: 'Long';
}

export interface LongitudeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Longitude'], any> {
  name: 'Longitude';
}

export interface MacScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['MAC'], any> {
  name: 'MAC';
}

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createAnswer?: Resolver<ResolversTypes['CreateAnswerResult'], ParentType, ContextType, RequireFields<MutationCreateAnswerArgs, 'input'>>;
  healthCheck?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationHealthCheckArgs, never>>;
  login?: Resolver<ResolversTypes['LoginResult'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'input'>>;
  sendMessage?: Resolver<ResolversTypes['SendMessageResult'], ParentType, ContextType, RequireFields<MutationSendMessageArgs, 'input'>>;
  upsertForm?: Resolver<ResolversTypes['Form'], ParentType, ContextType, RequireFields<MutationUpsertFormArgs, 'input'>>;
};

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

export interface ObjectIdScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['ObjectID'], any> {
  name: 'ObjectID';
}

export type OffsetPageInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['OffsetPageInfo'] = ResolversParentTypes['OffsetPageInfo']> = {
  maxPage?: Resolver<ResolversTypes['UnsignedInt'], ParentType, ContextType>;
  nowPage?: Resolver<ResolversTypes['UnsignedInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

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

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getAnswerByClub?: Resolver<ResolversTypes['AnswerConnection'], ParentType, ContextType, RequireFields<QueryGetAnswerByClubArgs, 'club' | 'limit'>>;
  getAnswerByStudentId?: Resolver<ResolversTypes['AnswerConnection'], ParentType, ContextType, RequireFields<QueryGetAnswerByStudentIdArgs, 'limit' | 'studentId'>>;
  getFormByClub?: Resolver<ResolversTypes['GetFormByClubResult'], ParentType, ContextType, RequireFields<QueryGetFormByClubArgs, 'club'>>;
  getLiveAnswerStatus?: Resolver<Array<ResolversTypes['AnswerStatus']>, ParentType, ContextType>;
  getLogByKeyword?: Resolver<ResolversTypes['LogConnection'], ParentType, ContextType, RequireFields<QueryGetLogByKeywordArgs, 'keyword' | 'limit' | 'page'>>;
  healthLive?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
};

export type QuestionListResolvers<ContextType = any, ParentType extends ResolversParentTypes['QuestionList'] = ResolversParentTypes['QuestionList']> = {
  length?: Resolver<ResolversTypes['UnsignedInt'], ParentType, ContextType>;
  question?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface RgbScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['RGB'], any> {
  name: 'RGB';
}

export interface RgbaScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['RGBA'], any> {
  name: 'RGBA';
}

export type RateLimitErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['RateLimitError'] = ResolversParentTypes['RateLimitError']> = {
  afterTry?: Resolver<ResolversTypes['UnsignedInt'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  path?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  suggestion?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface SafeIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['SafeInt'], any> {
  name: 'SafeInt';
}

export type SendMessageInvalidInputErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['SendMessageInvalidInputError'] = ResolversParentTypes['SendMessageInvalidInputError']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  path?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  suggestion?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SendMessagePayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['SendMessagePayload'] = ResolversParentTypes['SendMessagePayload']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SendMessageResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['SendMessageResult'] = ResolversParentTypes['SendMessageResult']> = {
  __resolveType: TypeResolveFn<'RateLimitError' | 'SendMessageInvalidInputError' | 'SendMessagePayload', ParentType, ContextType>;
};

export interface StudentIdScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['StudentID'], any> {
  name: 'StudentID';
}

export type StudentInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['StudentInfo'] = ResolversParentTypes['StudentInfo']> = {
  __resolveType: TypeResolveFn<'Answer', ParentType, ContextType>;
  name?: Resolver<ResolversTypes['name_String_NotNull_maxLength_5'], ParentType, ContextType>;
  phoneNumber?: Resolver<ResolversTypes['phoneNumber_String_NotNull_pattern_010098'], ParentType, ContextType>;
  studentId?: Resolver<ResolversTypes['StudentID'], ParentType, ContextType>;
};

export interface TimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Time'], any> {
  name: 'Time';
}

export interface TimestampScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Timestamp'], any> {
  name: 'Timestamp';
}

export interface UrlScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['URL'], any> {
  name: 'URL';
}

export interface UsCurrencyScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['USCurrency'], any> {
  name: 'USCurrency';
}

export interface UuidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['UUID'], any> {
  name: 'UUID';
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

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  role?: Resolver<ResolversTypes['ROLE'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['JWT'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface UtcOffsetScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['UtcOffset'], any> {
  name: 'UtcOffset';
}

export interface VoidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Void'], any> {
  name: 'Void';
}

export interface Data_String_NotNull_Pattern_PingScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['data_String_NotNull_pattern_ping'], any> {
  name: 'data_String_NotNull_pattern_ping';
}

export interface Id_String_NotNull_Pattern_Unifoxlayer7teamlognefusemotionteacherScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['id_String_NotNull_pattern_unifoxlayer7teamlognefusemotionteacher'], any> {
  name: 'id_String_NotNull_pattern_unifoxlayer7teamlognefusemotionteacher';
}

export interface Message_String_NotNull_MaxLength_80ScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['message_String_NotNull_maxLength_80'], any> {
  name: 'message_String_NotNull_maxLength_80';
}

export interface Name_String_NotNull_MaxLength_5ScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['name_String_NotNull_maxLength_5'], any> {
  name: 'name_String_NotNull_maxLength_5';
}

export interface Password_String_NotNull_MaxLength_30ScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['password_String_NotNull_maxLength_30'], any> {
  name: 'password_String_NotNull_maxLength_30';
}

export interface PhoneNumberList_List_ListNotNull_String_NotNull_Pattern_010098ScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['phoneNumberList_List_ListNotNull_String_NotNull_pattern_010098'], any> {
  name: 'phoneNumberList_List_ListNotNull_String_NotNull_pattern_010098';
}

export interface PhoneNumber_String_NotNull_Pattern_010098ScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['phoneNumber_String_NotNull_pattern_010098'], any> {
  name: 'phoneNumber_String_NotNull_pattern_010098';
}

export type Resolvers<ContextType = any> = {
  Answer?: AnswerResolvers<ContextType>;
  AnswerConnection?: AnswerConnectionResolvers<ContextType>;
  AnswerEdge?: AnswerEdgeResolvers<ContextType>;
  AnswerStatus?: AnswerStatusResolvers<ContextType>;
  BigInt?: GraphQLScalarType;
  Byte?: GraphQLScalarType;
  CreateAnswerInvalidInputError?: CreateAnswerInvalidInputErrorResolvers<ContextType>;
  CreateAnswerResult?: CreateAnswerResultResolvers<ContextType>;
  Currency?: GraphQLScalarType;
  CursorPageInfo?: CursorPageInfoResolvers<ContextType>;
  DID?: GraphQLScalarType;
  Date?: GraphQLScalarType;
  DateTime?: GraphQLScalarType;
  Duration?: GraphQLScalarType;
  EmailAddress?: GraphQLScalarType;
  Error?: ErrorResolvers<ContextType>;
  File?: FileResolvers<ContextType>;
  Form?: FormResolvers<ContextType>;
  GUID?: GraphQLScalarType;
  GetFormByClubResult?: GetFormByClubResultResolvers<ContextType>;
  HSL?: GraphQLScalarType;
  HSLA?: GraphQLScalarType;
  HexColorCode?: GraphQLScalarType;
  Hexadecimal?: GraphQLScalarType;
  IBAN?: GraphQLScalarType;
  IP?: GraphQLScalarType;
  IPv4?: GraphQLScalarType;
  IPv6?: GraphQLScalarType;
  ISBN?: GraphQLScalarType;
  ISO8601Duration?: GraphQLScalarType;
  InvalidAccountError?: InvalidAccountErrorResolvers<ContextType>;
  InvalidFormError?: InvalidFormErrorResolvers<ContextType>;
  JSON?: GraphQLScalarType;
  JSONObject?: GraphQLScalarType;
  JWT?: GraphQLScalarType;
  Latitude?: GraphQLScalarType;
  LocalDate?: GraphQLScalarType;
  LocalEndTime?: GraphQLScalarType;
  LocalTime?: GraphQLScalarType;
  Log?: LogResolvers<ContextType>;
  LogConnection?: LogConnectionResolvers<ContextType>;
  LoginResult?: LoginResultResolvers<ContextType>;
  Long?: GraphQLScalarType;
  Longitude?: GraphQLScalarType;
  MAC?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  NegativeFloat?: GraphQLScalarType;
  NegativeInt?: GraphQLScalarType;
  NonEmptyString?: GraphQLScalarType;
  NonNegativeFloat?: GraphQLScalarType;
  NonNegativeInt?: GraphQLScalarType;
  NonPositiveFloat?: GraphQLScalarType;
  NonPositiveInt?: GraphQLScalarType;
  ObjectID?: GraphQLScalarType;
  OffsetPageInfo?: OffsetPageInfoResolvers<ContextType>;
  PhoneNumber?: GraphQLScalarType;
  Port?: GraphQLScalarType;
  PositiveFloat?: GraphQLScalarType;
  PositiveInt?: GraphQLScalarType;
  PostalCode?: GraphQLScalarType;
  Query?: QueryResolvers<ContextType>;
  QuestionList?: QuestionListResolvers<ContextType>;
  RGB?: GraphQLScalarType;
  RGBA?: GraphQLScalarType;
  RateLimitError?: RateLimitErrorResolvers<ContextType>;
  SafeInt?: GraphQLScalarType;
  SendMessageInvalidInputError?: SendMessageInvalidInputErrorResolvers<ContextType>;
  SendMessagePayload?: SendMessagePayloadResolvers<ContextType>;
  SendMessageResult?: SendMessageResultResolvers<ContextType>;
  StudentID?: GraphQLScalarType;
  StudentInfo?: StudentInfoResolvers<ContextType>;
  Time?: GraphQLScalarType;
  Timestamp?: GraphQLScalarType;
  URL?: GraphQLScalarType;
  USCurrency?: GraphQLScalarType;
  UUID?: GraphQLScalarType;
  UnsignedFloat?: GraphQLScalarType;
  UnsignedInt?: GraphQLScalarType;
  Upload?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
  UtcOffset?: GraphQLScalarType;
  Void?: GraphQLScalarType;
  data_String_NotNull_pattern_ping?: GraphQLScalarType;
  id_String_NotNull_pattern_unifoxlayer7teamlognefusemotionteacher?: GraphQLScalarType;
  message_String_NotNull_maxLength_80?: GraphQLScalarType;
  name_String_NotNull_maxLength_5?: GraphQLScalarType;
  password_String_NotNull_maxLength_30?: GraphQLScalarType;
  phoneNumberList_List_ListNotNull_String_NotNull_pattern_010098?: GraphQLScalarType;
  phoneNumber_String_NotNull_pattern_010098?: GraphQLScalarType;
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
  ratelimit?: RatelimitDirectiveResolver<any, any, ContextType>;
};

import { ObjectID } from 'mongodb';