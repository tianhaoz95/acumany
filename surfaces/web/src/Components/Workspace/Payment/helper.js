export function hasPayment(basicInfo) {
  if (basicInfo.customerID === undefined || basicInfo.customerID === null) {
    return "no_payment";
  } else {
    return "loading";
  }
}
