import { useEffect, useState } from "react";
import { type BuyerAddress } from "../../types/address";
export interface BuyerAddressSelectProps {
  addresses: BuyerAddress[];
  selectedAddressId?: string;
  onChange?: (addressId: string) => void;
  className?: string;
}


export default function BuyerAddressSelect({
  addresses,
  selectedAddressId,
  onChange,
  className = "",
}: BuyerAddressSelectProps) {
  const [selectedId, setSelectedId] = useState<string>(
    selectedAddressId ?? addresses[0]?.id ?? "",
  );

  useEffect(() => {
    if (selectedAddressId) {
      setSelectedId(selectedAddressId);
    }
  }, [selectedAddressId]);

  const handleSelect = (addressId: string) => {
    setSelectedId(addressId);
    onChange?.(addressId);
  };

  const isCompact = addresses.length > 2;

  return (
    <div className={className}>
      <div className="mb-4 gap-4 rounded-3xl bg-white border border-slate-100 px-2 py-4 sm:px-5">
        <div className="mb-3">
          <p className="text-lg font-semibold text-slate-900">
            Shipping Address
          </p>
          <h2 className="text-sm text-slate-600">
            Select your address
          </h2>
        </div>

      {isCompact ? (
        <div className="space-y-2">
          {addresses.map((address) => {
            const isSelected = selectedId === address.id;
            return (
              <label
                key={address.id}
                className={`flex cursor-pointer items-center justify-between gap-4 rounded-3xl border px-4 py-3 transition ${
                  isSelected
                    ? "border-orange-500 bg-orange-50"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-900">
                    {address.recipientName}
                  </p>
                  <p className="truncate text-xs text-slate-500">
                    {address.addressLine1}, {address.city}
                  </p>
                </div>
                <input
                  type="radio"
                  name="buyer-address"
                  value={address.id}
                  checked={isSelected}
                  onChange={() => handleSelect(address.id)}
                  className="h-5 w-5 cursor-pointer rounded-full border border-slate-300 text-orange-500 focus:ring-orange-400"
                />
              </label>
            );
          })}
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {addresses.map((address) => {
            const isSelected = selectedId === address.id;
            return (
              <label
                key={address.id}
                className={`group flex cursor-pointer flex-col gap-3 rounded-3xl border bg-white p-4 transition focus-within:border-orange-400 focus-within:ring-2 focus-within:ring-orange-200 ${
                  isSelected
                    ? "border-orange-500 shadow-sm"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {address.recipientName}
                    </p>
                    <p className="text-xs text-slate-500">
                      {address.phoneNumber}
                    </p>
                  </div>
                  <input
                    type="radio"
                    name="buyer-address"
                    value={address.id}
                    checked={isSelected}
                    onChange={() => handleSelect(address.id)}
                    className="mt-1 h-5 w-5 cursor-pointer rounded-full border border-slate-300 text-orange-500 focus:ring-orange-400"
                  />
                </div>
                <div className="space-y-1 text-sm text-slate-700">
                  <p>{address.addressLine1}</p>
                  {address.addressLine2 ? <p>{address.addressLine2}</p> : null}
                  <p>
                    {address.city}, {address.province} {address.postalCode}
                  </p>
                  <p>{address.country}</p>
                </div>
              </label>
            );
          })}
        </div>
      )}
      </div>

    </div>
  );
}
