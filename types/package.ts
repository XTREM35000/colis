export interface Package {
  id: string;
  trackingNumber: string;
  status: 'pending' | 'in_transit' | 'delivered' | 'cancelled';
  sender: {
    name: string;
    address: string;
    phone: string;
  };
  recipient: {
    name: string;
    address: string;
    phone: string;
  };
  weight: number;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  price: number;
  insurance?: {
    covered: boolean;
    value: number;
  };
  createdAt: string;
  updatedAt: string;
  estimatedDeliveryDate?: string;
  notes?: string;
}