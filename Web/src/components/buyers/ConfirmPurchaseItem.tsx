import OrderDetailItem, {type OrderDetailItemType} from "./OrderDetailItem"
export interface ConfirmPurchaseItemType extends OrderDetailItemType{}

export default function ConfirmPurchaseItem({
  item,
}: {
  item: ConfirmPurchaseItemType;
}) {
  return (
    <>
      <OrderDetailItem item={item}/>
    </>
  );
}