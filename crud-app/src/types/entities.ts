export type EntityType = 'Product' | 'Invoice' | 'Employee' | 'Customer' | 'Order'

export interface BaseEntity {
  id: string
  code: string
  entityType: EntityType
  legalEntity: string
  createdAt: string
}

export interface Product extends BaseEntity {
  name: string
  price?: number
  category?: string
  status?: string
}

export interface Invoice extends BaseEntity {
  customerName?: string
  date?: string
  total?: number
  status?: string
}

export interface Employee extends BaseEntity {
  name?: string
  department?: string
  startDate?: string
  status?: string
}

export interface Customer extends BaseEntity {
  name?: string
  email?: string
  phone?: string
  customerType?: string
}

export interface Order extends BaseEntity {
  orderDate?: string
  customer?: string
  total?: number
  status?: string
}
