export function AmountFormat(total) {
    // Check if total is defined and is a number
    if (typeof total !== "number") {
      return `-`;
    }
  
    // Format the number according to Indian numbering system with 2 decimal places
    return `Rs. ${total.toLocaleString("en-IN", {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
      })}`;
  }
  