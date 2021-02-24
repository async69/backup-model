export const statusTypes = {
  OPEN: "Open",
  DRAFTED: "Drafted",
  APPROVED: "Approved",
  POSTED: "Posted",
  SENT_FOR_APPROVAL: "Pending Approval",
  REJECTED: "Rejected",
  OPEN_SIV: "Open SIV",
  OPEN_GRN: "Open GRN",
  ISSUED: "Issued",
  INVOICING: "Invoicing",
  INVOICED: "Invoiced",
  PAID: "Paid",
  PENDING_PAYMENT: "Pending Payment",
  RECEIVED: "Received",
  ADJUSTED: "Adjusted",
  PROCESS: "Process",
  DELETED: "Deleted",
  CLOSED: "Closed",
  SAVED: "Saved",
  PROCESSED: "Processed",
};

export default statusTypes;

export const statuses = Object.values(statusTypes);

export const purchaseStatusTypes = {
  OPEN: "Open",
  APPROVED: "Approved",
  POSTED: "Posted",
  SENT_FOR_APPROVAL: "Pending Approval",
  REJECTED: "Rejected",
  OPEN_GRN: "Open GRN",
};
