export interface BuyerAddress {
  id: string;
  recipientName: string;
  phoneNumber: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
}

export const defaultAddresses: BuyerAddress[] = [
  {
    id: "home",
    recipientName: "Kittiwat",
    phoneNumber: "+66 8123 45678",
    addressLine1: "123 Sukhumvit Road",
    addressLine2: "Apt 4B, Blossom Tower",
    city: "Bangkok",
    province: "Bangkok",
    postalCode: "10110",
    country: "Thailand",
  },
  {
    id: "office",
    recipientName: "Kittiwat",
    phoneNumber: "+66 8123 45678",
    addressLine1: "456 Silom Road",
    addressLine2: "Floor 12, Blue Space",
    city: "Bangkok",
    province: "Bangkok",
    postalCode: "10500",
    country: "Thailand",
  },
  {
    id: "dd",
    recipientName: "Kittiwat",
    phoneNumber: "+66 8123 45678",
    addressLine1: "456 Silom Road",
    addressLine2: "Floor 12, Blue Space",
    city: "Bangkok",
    province: "Bangkok",
    postalCode: "10500",
    country: "Thailand",
  },
];