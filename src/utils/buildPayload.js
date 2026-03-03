// Utility to build the payload structure the app expects
export default function buildPayload({
  user,
  customers = [],
  measurements = [],
  styles = [],
  orders = [],
} = {}) {
  const user_id = user?.user?.id ?? user?.id ?? null;

  const img = (item) => item?.image ?? item?.uri ?? item?.file ?? null;

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
