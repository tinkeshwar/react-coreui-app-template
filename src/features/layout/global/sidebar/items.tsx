const itemsListArray =  [
  {
    '_tag': 'CSidebarNavItem',
    'name': 'Dashboard',
    'to': '/dashboard',
    'path': 'dashboard',
    'icon': 'cil-speedometer'
  },
  {
    '_tag': 'CSidebarNavTitle',
    '_children': ['Admission Cell']
  },
  {
    '_tag': 'CSidebarNavDropdown',
    'name': 'Registrations',
    'path': 'registration',
    'icon': 'cil-layers',
    '_children': [
      {
        '_tag': 'CSidebarNavItem',
        'name': 'New Registration',
        'to': '/registration/create',
        'path': 'create',
        'scope': 'student_registrations.create'
      },
      {
        '_tag': 'CSidebarNavItem',
        'name': 'Registrations List',
        'to': '/registration/list',
        'path': 'list',
        'scope': 'student_registrations.list'
      }
    ]
  },
  {
    '_tag': 'CSidebarNavDropdown',
    'name': 'Admissions',
    'path': 'admission',
    'icon': 'cil-layers',
    '_children': [
      {
        '_tag': 'CSidebarNavItem',
        'name': 'Class Allotment',
        'to': '/admission/list',
        'path': 'list',
        'scope': 'admissions.list'
      }
    ]
  },
  {
    '_tag': 'CSidebarNavTitle',
    '_children': ['Accounts Cell']
  },
  {
    '_tag': 'CSidebarNavDropdown',
    'name': 'Accounting',
    'path': 'account',
    'icon': 'cil-money',
    '_children': [
      {
        '_tag': 'CSidebarNavItem',
        'name': 'Fee Collect',
        'to': '/account/collect/fee',
        'path': 'collect',
        'scope': 'fee_collects.collect'
      },
      {
        '_tag': 'CSidebarNavItem',
        'name': 'Fee Refund',
        'to': '/account/refund/fee',
        'path': 'refund',
        'scope': 'fee_collects.refund'
      }
    ]
  },
  {
    '_tag': 'CSidebarNavTitle',
    '_children': ['Management']
  },
  {
    '_tag': 'CSidebarNavDropdown',
    'name': 'Academics',
    'path': 'academic',
    'icon': 'cil-school',
    '_children': [
      {
        '_tag': 'CSidebarNavItem',
        'name': 'Session',
        'to': '/academic/sessions/list',
        'path': 'sessions',
        'scope': 'sessions.list'
      },
      {
        '_tag': 'CSidebarNavItem',
        'name': 'Standard',
        'to': '/academic/standards/list',
        'path': 'standards',
        'scope': 'standards.list'
      },
      {
        '_tag': 'CSidebarNavItem',
        'name': 'Section',
        'to': '/academic/sections/list',
        'path': 'sections',
        'scope': 'sections.list'
      },
      {
        '_tag': 'CSidebarNavItem',
        'name': 'Seat',
        'to': '/academic/seats/list',
        'path': 'seats',
        'scope': 'seats.list'
      },
      {
        '_tag': 'CSidebarNavItem',
        'name': 'Subject',
        'to': '/academic/subjects/list',
        'path': 'subjects',
        'scope': 'subjects.list'
      }
    ],
  },
  {
    '_tag': 'CSidebarNavDropdown',
    'name': 'Fees',
    'icon': 'cil-money',
    'path': 'fee-management',
    '_children': [
      {
        '_tag': 'CSidebarNavItem',
        'name': 'Fee Types',
        'to': '/fee-management/fee-types/list',
        'path': 'fee-types',
        'scope': 'fee_types.list',
      },
      {
        '_tag': 'CSidebarNavItem',
        'name': 'Fee Rates',
        'to': '/fee-management/fee-rates/list',
        'path': 'fee-rates',
        'scope': 'fee_rates.list',
      },
      {
        '_tag': 'CSidebarNavItem',
        'name': 'Late Fees',
        'to': '/fee-management/fee-lates/list',
        'path': 'fee-lates',
        'scope': 'fee_lates.list',
      }
    ],
  },
  {
    '_tag': 'CSidebarNavDropdown',
    'name': 'User',
    'icon': 'cil-user',
    'path': 'user-management',
    '_children': [
      {
        '_tag': 'CSidebarNavItem',
        'name': 'Users',
        'to': '/user-management/users/list',
        'path': 'users',
        'scope': 'users.list',
      },
      {
        '_tag': 'CSidebarNavItem',
        'name': 'Roles',
        'to': '/user-management/roles/list',
        'path': 'roles',
        'scope': 'roles.list'
      },
      {
        '_tag': 'CSidebarNavItem',
        'name': 'Permissions',
        'to': '/user-management/permissions/list',
        'path': 'permissions',
        'scope': 'permissions.list'
      },
    ],
  },
  {
    '_tag': 'CSidebarNavDropdown',
    'name': 'Miscellaneous',
    'path': 'misc-management',
    'icon': 'cib-medium',
    '_children': [
      {
        '_tag': 'CSidebarNavItem',
        'name': 'Religion',
        'to': '/misc-management/religions/list',
        'path': 'religions',
        'scope': 'religions.list'
      },
      {
        '_tag': 'CSidebarNavItem',
        'name': 'Castes',
        'to': '/misc-management/castes/list',
        'path': 'castes',
        'scope': 'castes.list'
      },
      {
        '_tag': 'CSidebarNavItem',
        'name': 'Document Types',
        'to': '/misc-management/document-types/list',
        'path': 'document-types',
        'scope': 'document_types.list'
      },
      {
        '_tag': 'CSidebarNavItem',
        'name': 'Qualifications',
        'to': '/misc-management/qualifications/list',
        'path': 'qualifications',
        'scope': 'qualifications.list'
      },
      {
        '_tag': 'CSidebarNavItem',
        'name': 'Occupations',
        'to': '/misc-management/occupations/list',
        'path': 'occupations',
        'scope': 'occupations.list'
      },
      {
        '_tag': 'CSidebarNavItem',
        'name': 'Income Slabs',
        'to': '/misc-management/income-slabs/list',
        'path': 'income-slabs',
        'scope': 'income_slabs.list'
      },
      {
        '_tag': 'CSidebarNavItem',
        'name': 'Exam Centre',
        'to': '/misc-management/entrance-examination-centres/list',
        'path': 'entrance-examination-centres',
        'scope': 'entrance_examination_centres.list'
      },
    ],
  },
  {
    '_tag': 'CSidebarNavDropdown',
    'name': 'Location',
    'path': 'location-management',
    'icon': 'cil-location-pin',
    '_children': [
      {
        '_tag': 'CSidebarNavItem',
        'name': 'Country',
        'to': '/location-management/countries/list',
        'path': 'countries',
        'scope': 'countries.list'
      },
      {
        '_tag': 'CSidebarNavItem',
        'name': 'State',
        'to': '/location-management/states/list',
        'path': 'states',
        'scope': 'states.list'
      },
      {
        '_tag': 'CSidebarNavItem',
        'name': 'District',
        'to': '/location-management/districts/list',
        'path': 'districts',
        'scope': 'districts.list'
      },
      {
        '_tag': 'CSidebarNavItem',
        'name': 'Areas',
        'to': '/location-management/areas/list',
        'path': 'areas',
        'scope': 'areas.list'
      }
    ],
  }
]

export default itemsListArray
