const fetchSameValues = (data = []) => {
    const label = "order_number";
  
    const pairs = {};
    data.forEach((item, idx) => {
      const keys = Object.keys(pairs);
      const index = keys.findIndex((key) => key === item[label]);
      if (index >= 0) {
        pairs[item[label]].push(idx);
      } else {
        pairs[item[label]] = [idx];
      }
    });
  
    const commonProps = [
      "partner_name",
      "partner_number",
      "invoice_id",
      "reference_number",
      "order_number",
    ];
    const differentProps = [
      "posting_date",
      "document_number",
      "description",
      "credit",
      "debit",
      "account_number",
      "account_name",
      "account_balance",
    ];
  
    return Object.values(pairs).map((masterValue) => {
      let objectSet = {};
      masterValue.forEach((idx) => {
        const allKeys = Object.keys(data[idx]);
        const allValues = Object.values(data[idx]);
        allKeys.forEach((key, _idx) => {
          const index = commonProps.findIndex((prop) => prop === key);
          if (index >= 0) {
            if (typeof objectSet[key] === "undefined") {
              objectSet[key] = allValues[_idx];
              const firstLine = {};
              differentProps.forEach((prop) => {
                firstLine[prop] = data[idx][prop];
              });
              objectSet.ledgerLines = [firstLine];
            }
          }
        });
  
        if (objectSet.ledgerLines.length === 1) {
          objectSet.ledgerLines.push(false);
        } else {
          const newLine = {};
          differentProps.forEach((prop) => {
            newLine[prop] = data[idx][prop];
          });
          objectSet.ledgerLines.push(newLine);
        }
      });
      objectSet.ledgerLines = objectSet.ledgerLines.filter((prop) =>
        Boolean(prop)
      );
      
      return objectSet
    });
  };