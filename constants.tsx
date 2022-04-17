const DATA_TEMPLATE = {
    subscriptions: [
      
    ],
    budgeting: [
  
    ],
    cashflow: [
  
    ]
}

const SUBSCRIPTIONS_COLUMNS = [
    'name',
    'billing period',
    'cost',
    'card',
    'utility',
    'category',
    'active?',
    'time active'
]

const BUDGETING_COLUMNS = [
    'name',
    'category',
    'cost'
]

const CASHFLOW_COLUMNS = [
    'source',
    'value'
]

const DATA_TEMPLATE_EXAMPLE = {
    subscriptions: [
      {
        'name': 'Netflix',
        'billing period': 'Monthly',
        'cost': '18',
        'card': 'Amex',
        'utility': 3,
        'category': 'entertainment',
        'active?': true,
        'time active': 63
      },
      {
        'name': 'Netflix',
        'billing period': 'Monthly',
        'cost': '18',
        'card': 'Amex',
        'utility': 3,
        'category': 'entertainment',
        'active?': true,
        'time active': 63
      },
    ],
    budgeting: [
  
    ],
    cashflow: [
      {
          'source': 'income A',
          'value': 3000
      },
      {
          'source': 'tfsa',
          'value': -1500
      }
    ]
}

export { 
    DATA_TEMPLATE,
    SUBSCRIPTIONS_COLUMNS,
    BUDGETING_COLUMNS,
    CASHFLOW_COLUMNS,
    DATA_TEMPLATE_EXAMPLE
}