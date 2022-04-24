export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  JSONStringUTF8: string;
};

/** Condition Base for filtering audience. */
export type Condition = {
  __typename: 'Condition';
  /** data type of value */
  fieldType: Maybe<DataType>;
  /** data value */
  fieldValue: Maybe<Scalars['String']>;
  /** Label's Id */
  id: Maybe<Scalars['String']>;
  /** Label's Name */
  name: Maybe<Scalars['String']>;
  /** The logic used for condition */
  operator: Maybe<Operator>;
  sourceType: Maybe<SourceType>;
};

/**
 * This ConditionContainer carries list of ConditionCrate.
 *
 */
export type ConditionContainer = {
  __typename: 'ConditionContainer';
  /** List of ConditionContainer */
  conditionCrates: Maybe<Array<Maybe<ConditionCrate>>>;
  /** Logic for connection each ConditionCrate in List: conditionCrates */
  logicType: Maybe<Scalars['String']>;
};

/**
 * This ConditionContainer carries list of ConditionCrate.
 *
 */
export type ConditionContainerInput = {
  /** List of ConditionContainer */
  conditionCrates: Array<InputMaybe<ConditionCrateInput>>;
  /** Logic for connection each ConditionCrate in List: conditionCrates */
  logicType: LogicType;
};

/**
 * This ConditionCrate carries list of Conditions.
 * The logic used for connecting each Conditions in ConditionCrate will be
 * always "AND".
 */
export type ConditionCrate = {
  __typename: 'ConditionCrate';
  /** List of Condition */
  conditions: Maybe<Array<Maybe<Condition>>>;
  /** currency info */
  currency: Maybe<Scalars['String']>;
  /** Theme's ID */
  id: Maybe<Scalars['String']>;
  /** Theme's Name */
  name: Maybe<Scalars['String']>;
};

/**
 * This ConditionCrate carries list of Conditions.
 * The logic used for connecting each Conditions in ConditionCrate will be
 * always "AND".
 */
export type ConditionCrateInput = {
  /** List of Condition */
  conditions: Array<InputMaybe<ConditionInput>>;
  /** currency info */
  currency: InputMaybe<Scalars['String']>;
  /** Theme's ID */
  id: Scalars['String'];
};

/**
 * This ConditionHatch carries list of ConditionContainer.
 *
 */
export type ConditionHatch = {
  __typename: 'ConditionHatch';
  /** List of ConditionContainer */
  conditionContainers: Maybe<Array<Maybe<ConditionContainer>>>;
  /** Logic for connection each ConditionContainer in List: conditionContainers */
  logicType: Maybe<LogicType>;
};

/**
 * This ConditionHatch carries list of ConditionContainer.
 *
 */
export type ConditionHatchInput = {
  /** List of ConditionContainer */
  conditionContainers: Array<InputMaybe<ConditionContainerInput>>;
  /** Logic for connection each ConditionContainer in List: conditionContainers */
  logicType: LogicType;
};

/** Condition for filtering audience. */
export type ConditionInput = {
  /** data type of value */
  fieldType: DataType;
  fieldValue: InputMaybe<Scalars['String']>;
  /** Label's Id */
  id: Scalars['String'];
  /** The logic used for condition */
  operator: Operator;
  sourceType: SourceType;
};

export type ConditionOption = {
  __typename: 'ConditionOption';
  themes: Maybe<Array<Maybe<LabelTheme>>>;
};

/**
 * This ConditionShip, which is for filtering audience, carries two
 * ConditionHatch. One is for "include", another one is for "exclude".
 */
export type ConditionShip = {
  __typename: 'ConditionShip';
  /** conditions for 'exclude' */
  exclude: Maybe<ConditionHatch>;
  /** conditions for 'include' */
  include: Maybe<ConditionHatch>;
};

/**
 * This ConditionShip, which is for filtering audience, carries two
 * ConditionHatch. One is for "include", another one is for "exclude".
 */
export type ConditionShipInput = {
  /** conditions for 'exclude' */
  exclude: InputMaybe<ConditionHatchInput>;
  /** conditions for 'include' */
  include: InputMaybe<ConditionHatchInput>;
};

/** Creates a new custom group */
export type CreateCustomGroup = {
  __typename: 'CreateCustomGroup';
  /** The id of new group */
  groupId: Maybe<Scalars['Int']>;
  /** This Value will be True when new group was created successfully.  */
  isCreated: Maybe<Scalars['Boolean']>;
};

/** Provides details info of Custom Group by args of groupId */
export type CustomGroup = {
  __typename: 'CustomGroup';
  /** Carries Conditions for filtering users */
  conditionShip: Maybe<ConditionShip>;
  /** Timestamp of custom group created */
  createdDate: Maybe<Scalars['Int']>;
  /** the id who created the custom group */
  creatorId: Scalars['String'];
  /** Group's description */
  description: Maybe<Scalars['String']>;
  /** Group's Id */
  id: Maybe<Scalars['Int']>;
  /** Last timestamp of custom group edited */
  lastEditedDate: Maybe<Scalars['Int']>;
  /** Group's name */
  name: Scalars['String'];
  statistics: Maybe<CustomGroupStatistic>;
  /** Data within trackingDates will be provided */
  trackingDates: Maybe<DateRangeEndDateNotRequired>;
  /** group created by server(type_code: 0) or user(type_code: 1). */
  typeCode: Maybe<Scalars['Int']>;
  /** Total User Count of latest data date.Note that a 'null' indicates totalUserCount is still being calculated or calculating job went wrong. In addition, if startDate is a future date, totalUserCount will be 'null' until startDate arrives */
  userCount: Maybe<Scalars['Int']>;
  /** Vendor's ID */
  vendor: Maybe<Scalars['String']>;
  /** Total User Count of Vendor on latest data date */
  vendorUserCount: Maybe<Scalars['Int']>;
};


/** Provides details info of Custom Group by args of groupId */
export type CustomGroupConditionShipArgs = {
  lang: Language;
};


/** Provides details info of Custom Group by args of groupId */
export type CustomGroupStatisticsArgs = {
  lang: Language;
};

/** Provides details info of Custom Group by args of groupId */
export type CustomGroupPeriodDataQuery = {
  __typename: 'CustomGroupPeriodDataQuery';
  /** (Input data) 多幣別 */
  currency: Maybe<Scalars['String']>;
  /** (Input data) The unit of analysis data. */
  dataUnit: Maybe<Scalars['String']>;
  /** (Input data) Custom group's Id. */
  id: Scalars['Int'];
  /** (Input data) interval dates of Statistics. */
  interval: Maybe<Scalars['String']>;
  /** (Input data) Details of Custom Group */
  lang: Maybe<Scalars['String']>;
  statisticData: Array<Maybe<CustomGroupUserPeriodData>>;
  /** (Input data) Statistic data id */
  statisticIds: Maybe<Array<Maybe<Scalars['String']>>>;
  /** (Input data) Owner's name */
  vendor: Maybe<Scalars['String']>;
};

export type CustomGroupStatistic = {
  __typename: 'CustomGroupStatistic';
  /** List of Item's statistic data */
  drillDownLabels: Maybe<Array<Maybe<CustomGroupStatisticList>>>;
  /** Latest timestamp of data of custom group calculated */
  lastUpdateDate: Maybe<Scalars['Int']>;
  linearLabels: Maybe<CustomGroupPeriodDataQuery>;
  /** Data date */
  statisticsDate: Maybe<Scalars['Int']>;
  /** Total User Count of latest data date */
  userCount: Maybe<Scalars['Int']>;
  /** Carries Conditions for filtering users */
  userCountList: Maybe<Array<Maybe<CustomGroupUserCount>>>;
};


export type CustomGroupStatisticDrillDownLabelsArgs = {
  currency: Scalars['String'];
  interval: Interval;
  numsOfItemsForEachStatistic?: InputMaybe<Scalars['Int']>;
  statisticIds: Array<Scalars['String']>;
};


export type CustomGroupStatisticLinearLabelsArgs = {
  currency?: InputMaybe<Scalars['String']>;
  dataUnit?: InputMaybe<DataUnit>;
  interval: Interval;
  statisticIds: Array<Scalars['String']>;
};


export type CustomGroupStatisticUserCountListArgs = {
  statisticIds: Array<Scalars['String']>;
};

/**
 * This item is for Label. For example,
 * '66-70歲' is an item of label: AgeUserCount
 */
export type CustomGroupStatisticItem = {
  __typename: 'CustomGroupStatisticItem';
  info: Maybe<Scalars['String']>;
  infoDescription: Maybe<Scalars['String']>;
  infoName: Maybe<Scalars['String']>;
  /** Drill-down statistic data of item. */
  moreLabels: Maybe<CustomGroupStatisticList>;
  /** label當中佔比例 */
  percent: Maybe<Scalars['Float']>;
  periodOnPeriod: Maybe<PeriodOnPeriod>;
  /** Count for the Item */
  value: Scalars['Int'];
};

/**
 * Statistic of Label. For example: VIPLevelUserCount.
 *
 */
export type CustomGroupStatisticList = {
  __typename: 'CustomGroupStatisticList';
  /** Label's description */
  description: Maybe<Scalars['String']>;
  /** Label's Id */
  labelId: Maybe<Scalars['String']>;
  /** List of Item's statistic data */
  labelValues: Maybe<Array<Maybe<CustomGroupStatisticItem>>>;
  /** Label's name */
  name: Maybe<Scalars['String']>;
};

/**
 * This item is for Label. For example,
 * '66-70歲' is an item of label: AgeUserCount
 */
export type CustomGroupStatisticPeriodItem = {
  __typename: 'CustomGroupStatisticPeriodItem';
  /** Drill-down statistic data of item. */
  details: Maybe<CustomGroupStatisticSubItem>;
  info: Maybe<Scalars['String']>;
  infoDescription: Maybe<Scalars['String']>;
  infoName: Maybe<Scalars['String']>;
  /** label當中佔比例 */
  percent: Maybe<Scalars['Float']>;
  periodOnPeriod: Maybe<PeriodOnPeriod>;
  /** Count for the Item */
  value: Scalars['Int'];
};

export type CustomGroupStatisticSubItem = {
  __typename: 'CustomGroupStatisticSubItem';
  /** Label's Id */
  labelId: Maybe<Scalars['String']>;
  labelValue: Maybe<Array<Maybe<LabelItemPercent>>>;
};

export type CustomGroupUserCount = {
  __typename: 'CustomGroupUserCount';
  /** Label's description */
  description: Maybe<Scalars['String']>;
  /** Label's Id */
  labelId: Maybe<Scalars['String']>;
  /** Label's name */
  name: Maybe<Scalars['String']>;
  /** user count of label */
  value: Maybe<Scalars['Int']>;
};

export type CustomGroupUserDateValue = {
  __typename: 'CustomGroupUserDateValue';
  /** Timestamp of Analysis date */
  date: Maybe<Scalars['Int']>;
  /** List of Item's statistic data */
  items: Maybe<Array<Maybe<CustomGroupStatisticPeriodItem>>>;
  /** Count unique user */
  totalValue: Maybe<Scalars['Float']>;
};

export type CustomGroupUserPeriodAverageDateValue = {
  __typename: 'CustomGroupUserPeriodAverageDateValue';
  /** value's description */
  description: Maybe<Scalars['String']>;
  /** Display name */
  name: Maybe<Scalars['String']>;
  /** average value */
  value: Maybe<Scalars['Float']>;
};

export type CustomGroupUserPeriodData = {
  __typename: 'CustomGroupUserPeriodData';
  average: Maybe<CustomGroupUserPeriodAverageDateValue>;
  /** List of label's statistic data */
  data: Maybe<Array<Maybe<CustomGroupUserDateValue>>>;
  /** Label's description */
  description: Maybe<Scalars['String']>;
  /** Label's Id */
  labelId: Maybe<Scalars['String']>;
  /** Label's name */
  name: Maybe<Scalars['String']>;
};

/** Data Types */
export enum DataType {
  Date = 'DATE',
  Decimal = 'DECIMAL',
  Float = 'FLOAT',
  Integer = 'INTEGER',
  Null = 'NULL',
  String = 'STRING',
  Timestamp = 'TIMESTAMP'
}

/** An enumeration. */
export enum DataUnit {
  Daily = 'DAILY',
  Monthly = 'MONTHLY',
  Weekly = 'WEEKLY'
}

/** Time interval for which statistic of Labels are calculated */
export type DateRangeEndDateNotRequired = {
  __typename: 'DateRangeEndDateNotRequired';
  /** End Day of time period */
  endDate: Maybe<Scalars['String']>;
  /** Start Day of time period */
  startDate: Scalars['String'];
};

/** Delete a custom audience group */
export type DeleteCustomGroup = {
  __typename: 'DeleteCustomGroup';
  /** This Value will be True when the group was deleted successfully. */
  isDeleted: Maybe<Scalars['Boolean']>;
};

export type DrillDownLabel = {
  __typename: 'DrillDownLabel';
  /** Label's definition */
  description: Maybe<Scalars['String']>;
  /** Label's Id */
  id: Maybe<Scalars['String']>;
  labelValues: Maybe<Array<Maybe<DrillDownStatistics>>>;
  /** Label's name */
  name: Maybe<Scalars['String']>;
};

export type DrillDownStatistics = {
  __typename: 'DrillDownStatistics';
  info: Maybe<Scalars['String']>;
  infoDescription: Maybe<Scalars['String']>;
  infoName: Maybe<Scalars['String']>;
  moreLabels: Maybe<Array<Maybe<DrillDownLabel>>>;
  /** label當中佔比例 */
  percent: Maybe<Scalars['Float']>;
  /** Count for the Item */
  value: Scalars['Float'];
};

/** UserEvent gameDetail */
export type GameDetail = {
  __typename: 'GameDetail';
  bet: Maybe<GameDetailBaseData>;
  gameItem: Maybe<GameDetailBaseData>;
  inPlay: Maybe<GameDetailBaseData>;
};

/** UserEvent gameDetail's base data */
export type GameDetailBaseData = {
  __typename: 'GameDetailBaseData';
  displayTitle: Maybe<Scalars['String']>;
  info: Maybe<Scalars['String']>;
  infoName: Maybe<Scalars['String']>;
};

export type GroupUser = Node & {
  __typename: 'GroupUser';
  account: Maybe<Scalars['String']>;
  detail: Maybe<Scalars['JSONStringUTF8']>;
  /** The ID of the object */
  id: Scalars['ID'];
  userId: Maybe<Scalars['String']>;
};

export type GroupUserCollection = Node & {
  __typename: 'GroupUserCollection';
  /** The ID of the object */
  id: Scalars['ID'];
  users: Maybe<GroupUserConnection>;
};


export type GroupUserCollectionUsersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type GroupUserConnection = {
  __typename: 'GroupUserConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<GroupUserEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `GroupUser` and its cursor. */
export type GroupUserEdge = {
  __typename: 'GroupUserEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node: Maybe<GroupUser>;
};

/** An enumeration. */
export enum Interval {
  /** Statistic of Labels are calculated in past interval_custom_duration by Group day(s). */
  CustomDuration = 'CUSTOM_DURATION',
  /** Statistic of Labels are calculated in past 1 day(s). */
  Interval_1D = 'INTERVAL_1D',
  /** Statistic of Labels are calculated in past 7 day(s). */
  Interval_7D = 'INTERVAL_7D',
  /** Statistic of Labels are calculated in past 30 day(s). */
  Interval_30D = 'INTERVAL_30D',
  /** Statistic of Labels are calculated in past 60 day(s). */
  Interval_60D = 'INTERVAL_60D',
  /** Statistic of Labels are calculated in past 90 day(s). */
  Interval_90D = 'INTERVAL_90D',
  /** Statistic of Labels are calculated in past 180 day(s). */
  Interval_180D = 'INTERVAL_180D',
  /** Statistic of Labels are calculated in past interval_lifetime by User day(s). */
  Lifetime = 'LIFETIME'
}

/** Label schema */
export type Label = {
  __typename: 'Label';
  /** Label's definition */
  description: Maybe<Scalars['String']>;
  /** Label's Id */
  id: Maybe<Scalars['String']>;
  labelValue: Maybe<LabelValue>;
  /** Label's name */
  name: Maybe<Scalars['String']>;
  themeId: Maybe<Scalars['String']>;
  themeName: Maybe<Scalars['String']>;
};

/** Label schema */
export type LabelBase = {
  __typename: 'LabelBase';
  /** Label's definition */
  description: Maybe<Scalars['String']>;
  /** Label's Id */
  id: Maybe<Scalars['String']>;
  /** Label's name */
  name: Maybe<Scalars['String']>;
};

/** LabelCategory schema */
export type LabelCategory = {
  __typename: 'LabelCategory';
  /** LabelCategory count */
  count: Maybe<Scalars['Int']>;
  /** Label's definition */
  description: Maybe<Scalars['String']>;
  /** Label's Id */
  id: Maybe<Scalars['String']>;
  /** List of label detail */
  labels: Maybe<Array<Maybe<LabelBase>>>;
  /** Label's name */
  name: Maybe<Scalars['String']>;
};

export type LabelCombine = {
  __typename: 'LabelCombine';
  /** Label's definition */
  description: Maybe<Scalars['String']>;
  /** Label's Id */
  id: Maybe<Scalars['String']>;
  /** Label's name */
  name: Maybe<Scalars['String']>;
  statistic: Array<Maybe<StatisticLabelsDetailList>>;
};

/** Label for Feature id */
export type LabelForFeature = {
  __typename: 'LabelForFeature';
  /** Label's definition */
  description: Maybe<Scalars['String']>;
  /** Label's Id */
  id: Maybe<Scalars['String']>;
  /** Is this label relate to currency */
  isCurrency: Maybe<Scalars['Boolean']>;
  /** List of Item's data */
  items: Maybe<Array<Maybe<LabelItemBase>>>;
  /** Label's name */
  name: Maybe<Scalars['String']>;
  /** Theme's Id */
  themeId: Maybe<Scalars['String']>;
  /** Theme's name */
  themeName: Maybe<Scalars['String']>;
};

export type LabelItemBase = {
  __typename: 'LabelItemBase';
  /** Item's info key */
  info: Maybe<Scalars['String']>;
  /** Description of Item */
  infoDescription: Maybe<Scalars['String']>;
  /** Item's name */
  infoName: Maybe<Scalars['String']>;
};

export type LabelItemPercent = {
  __typename: 'LabelItemPercent';
  info: Maybe<Scalars['String']>;
  infoDescription: Maybe<Scalars['String']>;
  infoName: Maybe<Scalars['String']>;
  /** label當中佔比例 */
  percent: Maybe<Scalars['Float']>;
  periodOnPeriod: Maybe<PeriodOnPeriod>;
  /** Count for the Item */
  value: Scalars['Int'];
};

export type LabelOption = {
  __typename: 'LabelOption';
  /** Label's ID */
  id: Maybe<Scalars['String']>;
  infoFieldType: Maybe<DataType>;
  /** List of Label item */
  infoItems: Maybe<Array<LabelOptionInfoItem>>;
  /** Operators for infoItem */
  infoOperators: Maybe<Array<Operator>>;
  /** Label's name */
  name: Maybe<Scalars['String']>;
  rawFieldType: Maybe<DataType>;
  /** Operators for raw value */
  rawOperators: Maybe<Array<Operator>>;
  sourceTypes: Maybe<Array<SourceType>>;
};

export type LabelOptionInfoItem = {
  __typename: 'LabelOptionInfoItem';
  /** Label item's info id */
  info: Maybe<Scalars['String']>;
  /** Label item's name */
  name: Maybe<Scalars['String']>;
};

export type LabelSummaryDetail = {
  __typename: 'LabelSummaryDetail';
  allLabelValueInfo: Maybe<Array<Maybe<LabelItemBase>>>;
  /** Label's description */
  description: Maybe<Scalars['String']>;
  /** Label's Id */
  id: Maybe<Scalars['String']>;
  /** Timestamp of last data updated time */
  lastUpdateDate: Maybe<Scalars['Int']>;
  /** Label's name */
  name: Maybe<Scalars['String']>;
  /** Themes Category */
  statistics: Maybe<Array<Maybe<StatisticLabelsDetailList>>>;
  /** Timestamp of data date */
  statisticsDate: Maybe<Scalars['Int']>;
  /** Array of suggestion_menu */
  suggestionMenu: Maybe<Array<Maybe<LabelBase>>>;
  /** Unique user count */
  userCount: Maybe<Scalars['Int']>;
};


export type LabelSummaryDetailStatisticsArgs = {
  currency?: InputMaybe<Scalars['String']>;
  interval?: InputMaybe<Interval>;
};

export type LabelTheme = {
  __typename: 'LabelTheme';
  /** Label's theme ID */
  id: Maybe<Scalars['String']>;
  /** indicate whether themeId is currency type or not */
  isCurrency: Maybe<Scalars['Boolean']>;
  labels: Maybe<Array<Maybe<LabelOption>>>;
  /** Label's theme name */
  themeName: Maybe<Scalars['String']>;
};

export type LabelValue = {
  __typename: 'LabelValue';
  info: Maybe<Scalars['String']>;
  infoDescription: Maybe<Scalars['String']>;
  infoName: Maybe<Scalars['String']>;
  value: Maybe<Scalars['String']>;
  valueType: Maybe<ValueType>;
};

/** An enumeration. */
export enum Language {
  /** Simplified Chinese. 简体中文 */
  ZhCn = 'ZH_CN',
  /** Traditional Chinese. 繁體中文 */
  ZhTw = 'ZH_TW'
}

export type LinearLabel = {
  __typename: 'LinearLabel';
  /** Label's definition */
  description: Maybe<Scalars['String']>;
  /** Label's Id */
  id: Maybe<Scalars['String']>;
  /** list of LinearStatistics */
  labelValues: Maybe<Array<Maybe<LinearStatistics>>>;
  /** Label's name */
  name: Maybe<Scalars['String']>;
};

export type LinearStatistics = {
  __typename: 'LinearStatistics';
  info: Maybe<Scalars['String']>;
  infoDescription: Maybe<Scalars['String']>;
  infoName: Maybe<Scalars['String']>;
  /** list of LinearStatisticsValue */
  values: Maybe<Array<Maybe<LinearStatisticsValue>>>;
};

export type LinearStatisticsValue = {
  __typename: 'LinearStatisticsValue';
  /** timestamp of date of value. */
  date: Maybe<Scalars['Int']>;
  /** value of data */
  value: Maybe<Scalars['Float']>;
};

/** An enumeration. */
export enum LogicType {
  And = 'AND',
  Or = 'OR'
}

export type Mutation = {
  __typename: 'Mutation';
  /** Creates a new custom group */
  createCustomGroup: Maybe<CreateCustomGroup>;
  /** Delete a custom audience group */
  deleteCustomGroup: Maybe<DeleteCustomGroup>;
  /** Update custom grouping basic information */
  updateCustomGroup: Maybe<UpdateCustomGroup>;
};


export type MutationCreateCustomGroupArgs = {
  conditionShip: ConditionShipInput;
  creatorId: Scalars['String'];
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  trackingDates: TrackingDates;
  vendor: Vendor;
};


export type MutationDeleteCustomGroupArgs = {
  groupId: Scalars['Int'];
  vendor: Vendor;
};


export type MutationUpdateCustomGroupArgs = {
  description?: InputMaybe<Scalars['String']>;
  groupId: Scalars['Int'];
  name: Scalars['String'];
  vendor: Vendor;
};

/** An object with an ID */
export type Node = {
  /** The ID of the object */
  id: Scalars['ID'];
};

/** Logical operators */
export enum Operator {
  /** Stands for Equal. Symbol: = */
  Eq = 'EQ',
  /** Stands for Greater Than. Symbol: > */
  Gt = 'GT',
  /** Stands for Greater Than or Equal. Symbol: >= */
  Gte = 'GTE',
  /** Stands for 'IS NOT NULL' */
  HasValue = 'HAS_VALUE',
  /** Stands for Less Than. Symbol: < */
  Lt = 'LT',
  /** Stands for Less Than or Equal. Symbol: <= */
  Lte = 'LTE',
  /** Stands for 'IS NULL' */
  NoValue = 'NO_VALUE'
}

/** An enumeration. */
export enum OrderStrategy {
  Asc = 'ASC',
  Desc = 'DESC'
}

/** The Relay compliant `PageInfo` type, containing data necessary to paginate this connection. */
export type PageInfo = {
  __typename: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor: Maybe<Scalars['String']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor: Maybe<Scalars['String']>;
};

export type PeriodOnPeriod = {
  __typename: 'PeriodOnPeriod';
  compareDate: Maybe<Scalars['Int']>;
  value: Maybe<Scalars['Int']>;
};

export type PeriodOnPeriodPercent = {
  __typename: 'PeriodOnPeriodPercent';
  day: Maybe<Scalars['Float']>;
  week: Maybe<Scalars['Float']>;
};

/**
 * Entrypoint for GraphQL Query.
 *
 */
export type Query = {
  __typename: 'Query';
  customGroup: Maybe<CustomGroup>;
  customGroupList: Maybe<Array<Maybe<CustomGroup>>>;
  featureLabels: Maybe<Array<Maybe<LabelForFeature>>>;
  groupUsers: Maybe<GroupUserCollection>;
  labelDetail: Maybe<LabelSummaryDetail>;
  optionLabels: Maybe<ConditionOption>;
  sideBar: Maybe<SideBarDataQuery>;
  suggestionDetail: Maybe<LabelCombine>;
  user: Maybe<User>;
  userList: Maybe<Array<Maybe<User>>>;
  vendor: Maybe<VendorSchema>;
};


/**
 * Entrypoint for GraphQL Query.
 *
 */
export type QueryCustomGroupArgs = {
  groupId: Scalars['Int'];
  vendor: Vendor;
};


/**
 * Entrypoint for GraphQL Query.
 *
 */
export type QueryCustomGroupListArgs = {
  isAllGroups?: InputMaybe<Scalars['Boolean']>;
  vendor: Vendor;
};


/**
 * Entrypoint for GraphQL Query.
 *
 */
export type QueryFeatureLabelsArgs = {
  featureId: Scalars['String'];
  labelIds?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  lang: Language;
  vendor: Vendor;
};


/**
 * Entrypoint for GraphQL Query.
 *
 */
export type QueryGroupUsersArgs = {
  account?: InputMaybe<Scalars['String']>;
  currency?: InputMaybe<Scalars['String']>;
  date: Scalars['Int'];
  groupId: Scalars['Int'];
  isCurrencySortKey?: InputMaybe<Scalars['Boolean']>;
  lang: Language;
  order?: InputMaybe<Scalars['String']>;
  requiredKeys?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sortKey?: InputMaybe<Scalars['String']>;
  vendor: Vendor;
};


/**
 * Entrypoint for GraphQL Query.
 *
 */
export type QueryLabelDetailArgs = {
  labelId: Scalars['String'];
  lang: Language;
  vendor: Vendor;
};


/**
 * Entrypoint for GraphQL Query.
 *
 */
export type QueryOptionLabelsArgs = {
  lang: Language;
  vendor: Vendor;
};


/**
 * Entrypoint for GraphQL Query.
 *
 */
export type QuerySideBarArgs = {
  lang: Language;
  vendor: Vendor;
};


/**
 * Entrypoint for GraphQL Query.
 *
 */
export type QuerySuggestionDetailArgs = {
  currency?: InputMaybe<Scalars['String']>;
  lang: Language;
  suggestionLabelId: Scalars['String'];
  vendor: Vendor;
};


/**
 * Entrypoint for GraphQL Query.
 *
 */
export type QueryUserArgs = {
  currency?: InputMaybe<Scalars['String']>;
  lang: Language;
  userId: Scalars['String'];
  vendor: Vendor;
};


/**
 * Entrypoint for GraphQL Query.
 *
 */
export type QueryUserListArgs = {
  account: Scalars['String'];
  vendor: Vendor;
};


/**
 * Entrypoint for GraphQL Query.
 *
 */
export type QueryVendorArgs = {
  vendor: Vendor;
};

/**
 * Provides side bar of labels by args of query
 *
 */
export type SideBarDataQuery = {
  __typename: 'SideBarDataQuery';
  /** Themes of Labels */
  labelList: Maybe<Themes>;
  /** (Input data) zh_tw: 繁體中文, zh_cn:简体中文 */
  language: Maybe<Scalars['String']>;
  /** (Input data) Owner's name */
  vendor: Maybe<Scalars['String']>;
};

/** Indicating how is a Label used. */
export enum SourceType {
  /** Category Type. It may come with several Label Item */
  Info = 'INFO',
  /** Primitive Type. It may a INTEGER, DATE, STRING, and so on. */
  Raw = 'RAW'
}

export type StatisticLabelsDetailList = {
  __typename: 'StatisticLabelsDetailList';
  labelValues: Maybe<Array<Maybe<LabelItemPercent>>>;
  statisticDate: Maybe<Scalars['Int']>;
  userCount: Maybe<Scalars['Int']>;
};


export type StatisticLabelsDetailListLabelValuesArgs = {
  infoIds?: InputMaybe<Array<Scalars['String']>>;
  numsOfValues?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<OrderStrategy>;
  pivotDate?: InputMaybe<Scalars['Int']>;
};

export type Statistics = {
  __typename: 'Statistics';
  drillDownLabels: Maybe<Array<Maybe<DrillDownLabel>>>;
  linearLabels: Maybe<Array<Maybe<LinearLabel>>>;
};


export type StatisticsDrillDownLabelsArgs = {
  interval?: InputMaybe<Interval>;
  labelIds?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type StatisticsLinearLabelsArgs = {
  dataUnit: DataUnit;
  interval: Interval;
  labelIds?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

/** Themes category schema */
export type ThemeData = {
  __typename: 'ThemeData';
  /** List of category label */
  category: Maybe<Array<Maybe<LabelCategory>>>;
  /** Label count of category */
  count: Maybe<Scalars['Int']>;
  /** Theme's Id */
  id: Maybe<Scalars['String']>;
  /** Theme's name */
  name: Maybe<Scalars['String']>;
};

/** Themes base schema */
export type Themes = {
  __typename: 'Themes';
  /** Label count of theme */
  count: Maybe<Scalars['Int']>;
  /** Themes Category */
  themes: Array<Maybe<ThemeData>>;
};

/** Data within trackingDates will be provided */
export type TrackingDates = {
  /** Timestamp of End Date of TrackingDates */
  endDate: InputMaybe<Scalars['Int']>;
  /** Timestamp of Start Date of TrackingDates */
  startDate: Scalars['Int'];
};

/** Update custom grouping basic information */
export type UpdateCustomGroup = {
  __typename: 'UpdateCustomGroup';
  /**
   * true:The group is success.
   *         false:The data is same or Group Id is not exist
   */
  isUpdate: Maybe<Scalars['Boolean']>;
};

/** User schema */
export type User = {
  __typename: 'User';
  /** User's account */
  account: Maybe<Scalars['String']>;
  /** Activities of User' behavior */
  activityCollection: Maybe<UserActivityCollection>;
  /** User's groups */
  groups: Maybe<Array<Maybe<Scalars['Int']>>>;
  /** User's Id */
  id: Maybe<Scalars['String']>;
  /** Label data of User */
  labels: Maybe<Array<Maybe<Label>>>;
  /** Timestamp of last data updated time */
  lastUpdateDate: Maybe<Scalars['Int']>;
  /** Timestamp of date of user registration */
  registryDate: Maybe<Scalars['Int']>;
  /** Charts data of User */
  statistics: Maybe<Statistics>;
  /** Timestamp of data date */
  statisticsDate: Maybe<Scalars['Int']>;
  /** Vendor's Id */
  vendor: Maybe<Scalars['String']>;
};


/** User schema */
export type UserActivityCollectionArgs = {
  interval?: InputMaybe<Interval>;
  order?: InputMaybe<OrderStrategy>;
  statisticsDate: Scalars['Int'];
};


/** User schema */
export type UserLabelsArgs = {
  currency?: InputMaybe<Scalars['String']>;
  ids?: InputMaybe<Array<Scalars['String']>>;
  themeIds?: InputMaybe<Array<Scalars['String']>>;
};


/** User schema */
export type UserStatisticsArgs = {
  currency?: InputMaybe<Scalars['String']>;
};

/** Activity of a user. There are events in a Activity Date */
export type UserActivity = Node & {
  __typename: 'UserActivity';
  /** date of a activity */
  activityDate: Maybe<Scalars['Int']>;
  /** events of a user */
  events: Array<UserEvent>;
  /** The ID of the object */
  id: Scalars['ID'];
};

export type UserActivityCollection = Node & {
  __typename: 'UserActivityCollection';
  activities: Maybe<UserActivityConnection>;
  /** The ID of the object */
  id: Scalars['ID'];
};


export type UserActivityCollectionActivitiesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type UserActivityConnection = {
  __typename: 'UserActivityConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<UserActivityEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `UserActivity` and its cursor. */
export type UserActivityEdge = {
  __typename: 'UserActivityEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node: Maybe<UserActivity>;
};

/** Events of a user. For example, login, deposit, and etc. */
export type UserEvent = {
  __typename: 'UserEvent';
  /** If currency is not null, this field will be a number with string format */
  amount: Maybe<Scalars['String']>;
  /** category Id of an event */
  categoryId: Maybe<Scalars['String']>;
  /** category of an event */
  categoryName: Maybe<Scalars['String']>;
  /** currency type of an event */
  currency: Maybe<Scalars['String']>;
  /** electronic device type of an user */
  device: Maybe<Scalars['String']>;
  /** timestamp of an event */
  eventDate: Maybe<Scalars['Int']>;
  /** If UserEvent is game, gameDetail have value, else None. */
  gameDetail: Maybe<GameDetail>;
  /** sub-category of an event */
  subCategoryName: Maybe<Scalars['String']>;
};

export enum ValueType {
  /** Data Type of the value is Date. The value is a timestamp such as "1629259200". */
  Date = 'DATE',
  /** Data Type of the value is Null. The value is null. */
  Null = 'NULL',
  /** Data Type of the value is Number. The format of value could be "1.0" or "2". */
  Number = 'NUMBER',
  /** Data Type of the value is String */
  String = 'STRING'
}

/** An enumeration. */
export enum Vendor {
  Dmo = 'DMO',
  Pd1 = 'PD1',
  Pd2 = 'PD2',
  Pd4 = 'PD4',
  Ua2 = 'UA2',
  Ua3 = 'UA3',
  Ua4 = 'UA4',
  Ua5 = 'UA5',
  Uat = 'UAT'
}

export type VendorDrillDownStatistic = {
  __typename: 'VendorDrillDownStatistic';
  /** Label's description */
  description: Maybe<Scalars['String']>;
  /** Label's Id */
  labelId: Maybe<Scalars['String']>;
  /** List of Item's statistic data */
  labelValues: Maybe<Array<Maybe<VendorStatisticItem>>>;
  /** Label's name */
  name: Maybe<Scalars['String']>;
};

export type VendorLiveStatistics = {
  __typename: 'VendorLiveStatistics';
  data: Maybe<Array<Maybe<VendorLiveStatisticsData>>>;
  date: Maybe<Scalars['Int']>;
};

export type VendorLiveStatisticsData = {
  __typename: 'VendorLiveStatisticsData';
  description: Maybe<Scalars['String']>;
  labelId: Maybe<Scalars['ID']>;
  name: Maybe<Scalars['String']>;
  periodOnPeriodPercent: Maybe<PeriodOnPeriodPercent>;
  value: Maybe<Scalars['Float']>;
};

/** Provides details info of vendor */
export type VendorSchema = {
  __typename: 'VendorSchema';
  statistics: Maybe<VendorStatistic>;
  /** Total User Count of latest data date. */
  userCount: Maybe<Scalars['Int']>;
  /** Vendor's ID */
  vendorId: Maybe<Scalars['String']>;
};


/** Provides details info of vendor */
export type VendorSchemaStatisticsArgs = {
  currency: Scalars['String'];
  lang: Language;
};

export type VendorStatistic = {
  __typename: 'VendorStatistic';
  drillDownLabels: Maybe<Array<Maybe<VendorDrillDownStatistic>>>;
  /** Latest timestamp of data calculated */
  lastUpdateDate: Maybe<Scalars['Int']>;
  /** Today's live statistics. Update Frequency: 1 hour */
  liveStatistics: Maybe<VendorLiveStatistics>;
  /** Data date */
  statisticsDate: Maybe<Scalars['Int']>;
  /** Total User Count of latest data date */
  userCount: Maybe<Scalars['Int']>;
};


export type VendorStatisticDrillDownLabelsArgs = {
  currency?: InputMaybe<Scalars['String']>;
  interval: Interval;
  statisticIds: Array<Scalars['String']>;
};


export type VendorStatisticLiveStatisticsArgs = {
  statisticIds: Array<Scalars['String']>;
};

export type VendorStatisticItem = {
  __typename: 'VendorStatisticItem';
  info: Maybe<Scalars['String']>;
  infoDescription: Maybe<Scalars['String']>;
  infoName: Maybe<Scalars['String']>;
  /** Drill-down statistic data of item. */
  moreLabels: Maybe<Array<Maybe<VendorDrillDownStatistic>>>;
  percent: Maybe<Scalars['Float']>;
  /** Count for the Item */
  value: Scalars['Int'];
};
