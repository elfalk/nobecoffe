import { UserRole, UserStatus, ProductStatus, OrderStatus, SupplierStatus, BookingStatus, PostStatus, AffiliateStatus, ReferralStatus, CoffeeType, DiscountType, TransactionType, NotificationType, CommissionType, SupplierPackage } from '@prisma/client'

export type {
  UserRole,
  UserStatus,
  ProductStatus,
  OrderStatus,
  SupplierStatus,
  BookingStatus,
  PostStatus,
  AffiliateStatus,
  ReferralStatus,
  CoffeeType,
  DiscountType,
  TransactionType,
  NotificationType,
  CommissionType,
  SupplierPackage,
}

export interface CartItem {
  productId: string
  name: string
  nameAr: string
  image: string
  price: number
  quantity: number
  supplierId: string
  categoryId: string
  commission: number
}

export interface CartState {
  items: CartItem[]
  subtotal: number
  totalCommission: number
  total: number
}

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface DashboardStats {
  totalSales: number
  totalRevenue: number
  totalOrders: number
  totalProducts: number
  totalCommission: number
  activeSuppliers: number
  activeCustomers: number
  activeAffiliates: number
}

export interface ProductFilters {
  category?: string
  supplier?: string
  minPrice?: number
  maxPrice?: number
  search?: string
  sort?: 'newest' | 'price-low' | 'price-high' | 'rating' | 'sales'
  page?: number
  limit?: number
}

export interface OrderFilters {
  status?: OrderStatus
  supplierId?: string
  customerId?: string
  dateFrom?: Date
  dateTo?: Date
  search?: string
  page?: number
  limit?: number
}