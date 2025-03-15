export interface IOrg {
  id: number;
  name: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  acceptsTypes: string[];
  distance: number;
  type: string;
}
