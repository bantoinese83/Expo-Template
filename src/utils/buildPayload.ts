interface BuildPayloadProps {
  user?: any;
  customers?: any[];
  measurements?: any[];
  styles?: any[];
  orders?: any[];
}

interface BuildPayloadResult {
  user_id: string | number | null;
  customer: { customer_id: any; image: any }[];
  mearsuments: { measrument_id: any; image: any }[];
  styles: { styles_id: any; image: any }[];
  orders: { order_id: any; image: any }[];
}

// Utility to build the payload structure the app expects
export default function buildPayload({
  user,
  customers = [],
  measurements = [],
  styles = [],
  orders = [],
}: BuildPayloadProps = {}): BuildPayloadResult {
  const user_id = user?.user?.id ?? user?.id ?? null;

  const img = (item: any) => item?.image ?? item?.uri ?? item?.file ?? null;

  const customerList = (customers || []).map((c) => ({
    customer_id: c?.customer_id ?? c?.customerId ?? c?.id ?? null,
    image: img(c),
  }));

  const mearsumentsList = (measurements || []).map((m) => ({
    measrument_id: m?.measrument_id ?? m?.measurement_id ?? m?.id ?? null,
    image: img(m),
  }));

  const stylesList = (styles || []).map((s) => ({
    styles_id: s?.styles_id ?? s?.style_id ?? s?.id ?? null,
    image: img(s),
  }));

  const ordersList = (orders || []).map((o) => ({
    order_id: o?.order_id ?? o?.orderId ?? o?.id ?? null,
    image: img(o),
  }));

  return {
    user_id,
    customer: customerList,
    mearsuments: mearsumentsList,
    styles: stylesList,
    orders: ordersList,
  };
}
