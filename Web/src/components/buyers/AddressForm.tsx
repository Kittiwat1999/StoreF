import { type BuyerAddress } from "../../types/address";

export interface AddressFormProps {
  addressForm: BuyerAddress;
  handleFormChange: (field: keyof BuyerAddress, value: string) => void;
}

export default function AddressForm({ addressForm, handleFormChange }: AddressFormProps) {
  return (
    <div className="rounded-4xl border border-slate-200 bg-slate-50 p-4 sm:p-6">
      <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Shipping address
          </h2>
          <p className="text-sm text-slate-600">
            Enter your delivery details below.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="block text-sm text-slate-700">
          <span className="mb-1 block font-medium">Recipient name</span>
          <input
            type="text"
            name="recipient_name"
            value={addressForm.recipientName}
            onChange={(e) => handleFormChange("recipientName", e.target.value)}
            className="w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
            placeholder="Recipient name"
          />
        </label>

        <label className="block text-sm text-slate-700">
          <span className="mb-1 block font-medium">Phone number</span>
          <input
            type="tel"
            name="phone_number"
            value={addressForm.phoneNumber}
            onChange={(e) => handleFormChange("phoneNumber", e.target.value)}
            className="w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
            placeholder="Phone number"
          />
        </label>

        <label className="block text-sm text-slate-700 sm:col-span-2">
          <span className="mb-1 block font-medium">Address line 1</span>
          <input
            type="text"
            name="address_line1"
            value={addressForm.addressLine1}
            onChange={(e) => handleFormChange("addressLine1", e.target.value)}
            className="w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
            placeholder="Street address, P.O. box, company name, c/o"
          />
        </label>

        <label className="block text-sm text-slate-700 sm:col-span-2">
          <span className="mb-1 block font-medium">Address line 2</span>
          <input
            type="text"
            name="address_line2"
            value={addressForm.addressLine2}
            onChange={(e) => handleFormChange("addressLine2", e.target.value)}
            className="w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
            placeholder="Apartment, suite, unit, building, floor, etc."
          />
        </label>

        <label className="block text-sm text-slate-700">
          <span className="mb-1 block font-medium">City</span>
          <input
            type="text"
            name="city"
            value={addressForm.city}
            onChange={(e) => handleFormChange("city", e.target.value)}
            className="w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
            placeholder="City"
          />
        </label>

        <label className="block text-sm text-slate-700">
          <span className="mb-1 block font-medium">Province</span>
          <input
            type="text"
            name="province"
            value={addressForm.province}
            onChange={(e) => handleFormChange("province", e.target.value)}
            className="w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
            placeholder="Province"
          />
        </label>

        <label className="block text-sm text-slate-700">
          <span className="mb-1 block font-medium">Postal code</span>
          <input
            type="text"
            name="postal_code"
            value={addressForm.postalCode}
            onChange={(e) => handleFormChange("postalCode", e.target.value)}
            className="w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
            placeholder="Postal code"
          />
        </label>

        <label className="block text-sm text-slate-700">
          <span className="mb-1 block font-medium">Country</span>
          <input
            type="text"
            name="country"
            value={addressForm.country}
            onChange={(e) => handleFormChange("country", e.target.value)}
            className="w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
            placeholder="Country"
          />
        </label>
      </div>
    </div>
  );
}
