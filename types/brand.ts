export interface BrandInfo {
  companyName: string;
  companyLogo: string;
  contactPerson: {
    name: string;
    email: string;
    phone: string;
    role: string;
    avatar?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface UpdateBrandInfo extends Partial<BrandInfo> {}