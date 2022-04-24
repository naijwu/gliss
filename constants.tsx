type AnyMap = {
  [key: string]: any
}


const SUBSCRIPTIONS_TEMPLATE: AnyMap = {
  'name': '',
  'billing': '',
  'cost': '',
  'card': '',
  'utility': '',
  'category': '',
  // 'active?': false,
  // 'months active': 0,
  'x': '',
}

const SUBSCRIPTIONS_COLUMNS = [
    'name',
    'billing',
    'cost',
    'card',
    'utility',
    'category',
    // 'active?',
    // 'months active'
    'x',
]

const BUDGETING_COLUMNS = [
    'name',
    'category',
    'cost',
    'x',
]

const BUDGETING_TEMPLATE: AnyMap = {
  'name': '',
  'category': '',
  'cost': '',
  'x': '',
}

const CASHFLOW_COLUMNS = [
  'source',
  'value',
  'x',
]

const CASHFLOW_TEMPLATE: AnyMap = {
  'source': '',
  'value': '',
  'x': '',
}

export { 
    SUBSCRIPTIONS_TEMPLATE,
    SUBSCRIPTIONS_COLUMNS,

    BUDGETING_COLUMNS,
    BUDGETING_TEMPLATE,

    CASHFLOW_COLUMNS,
    CASHFLOW_TEMPLATE,
}