import { monthList } from "helpers/date";
import HelpMath from "helpers/math";
import { colorscheme } from "../../../demos/dashboardPage";

export const sliceAmount = 5;

export const getSIVData = (SIVs) => {
  let itemSet = {};
  const itemData = [];
  const uniqueSet = [];
  SIVs.forEach((issue) => {
    issue.siv_lines.forEach((line) => {
      const index = uniqueSet.findIndex((item) => line.item_detail.id === item);
      if (index < 0) {
        itemSet[line.item_detail.id] = 1;
        itemData.push({
          id: line.item_detail.id,
          name: line.item_detail.name,
          timestamp: issue.updated_at,
        });
        uniqueSet.push(line.item_detail.id);
      } else {
        itemSet[line.item_detail.id] = 1 + itemSet[line.item_detail.id];
      }
    });
  });

  let itemValues = Object.values(itemSet);
  let itemIDs = Object.keys(itemSet);
  const itemAmount = itemIDs.length;

  for (let i = 0; i < itemAmount - 1; ++i) {
    for (let j = 0; j < itemAmount - i - 1; ++j) {
      if (itemValues[j] < itemValues[j + 1]) {
        itemValues = swap(j, j + 1, itemValues);
        itemIDs = swap(j, j + 1, itemIDs);
      }
    }
  }

  const sortedNames = itemIDs
    .map((id) => {
      const found = itemData.find((item) => item.id === id);
      return found ? found.name : false;
    })
    .filter((item) => Boolean(item))
    .slice(0, sliceAmount);

  const itemTimestamps = itemIDs
    .map((id) => {
      const found = itemData.find((item) => item.id === id);
      return found ? found.timestamp : false;
    })
    .filter((item) => Boolean(item))
    .slice(0, sliceAmount);

  const monthlyData = Array(12).fill(0);

  let itemMontlyData = {};
  itemIDs.forEach((item) => {
    itemMontlyData[item] = Array(12).fill(0);
  });

  itemTimestamps.forEach((timestamp, idx) => {
    const index = new Date(String(timestamp)).getMonth();
    monthlyData[index] = monthlyData[index] + 1;
    const itemID = itemIDs.find((id) => id === itemIDs[idx]);
    itemMontlyData[itemID][index] = itemMontlyData[itemID][index] + 1;
  });

  return {
    monthList,
    monthlyData,
    sortedNames,
    itemIDs,
    itemValues,
    itemMontlyData,
  };
};

export const getGRNData = (GRNs) => {
  let itemSet = {};
  const itemData = [];
  const uniqueSet = [];
  GRNs.forEach((issue) => {
    issue.grn_lines.forEach((line) => {
      const index = uniqueSet.findIndex((item) => line.item_detail.id === item);
      if (index < 0) {
        itemSet[line.item_detail.id] = 1;
        itemData.push({
          id: line.item_detail.id,
          name: line.item_detail.name,
          timestamp: issue.updated_at,
        });
        uniqueSet.push(line.item_detail.id);
      } else {
        itemSet[line.item_detail.id] = 1 + itemSet[line.item_detail.id];
      }
    });
  });

  let itemValues = Object.values(itemSet);
  let itemIDs = Object.keys(itemSet);
  const itemAmount = itemIDs.length;

  for (let i = 0; i < itemAmount - 1; ++i) {
    for (let j = 0; j < itemAmount - i - 1; ++j) {
      if (itemValues[j] < itemValues[j + 1]) {
        itemValues = swap(j, j + 1, itemValues);
        itemIDs = swap(j, j + 1, itemIDs);
      }
    }
  }

  const sortedNames = itemIDs
    .map((id) => {
      const found = itemData.find((item) => item.id === id);
      return found ? found.name : false;
    })
    .filter((item) => Boolean(item))
    .slice(0, sliceAmount);

  const itemTimestamps = itemIDs
    .slice(0, sliceAmount)
    .map((id) => {
      const found = itemData.find((item) => item.id === id);
      console.log(found);
      return found ? found.timestamp : false;
    })
    .filter((item) => Boolean(item));

  const monthlyData = Array(12).fill(0);

  let itemMontlyData = {};
  itemIDs.forEach((item) => {
    itemMontlyData[item] = Array(12).fill(0);
  });

  itemTimestamps.forEach((timestamp, idx) => {
    const index = new Date(String(timestamp)).getMonth();
    monthlyData[index] = monthlyData[index] + 1;
    const itemID = itemIDs.find((id) => id === itemIDs[idx]);
    itemMontlyData[itemID][index] = itemMontlyData[itemID][index] + 1;
  });

  return {
    monthList,
    monthlyData,
    sortedNames,
    itemIDs,
    itemValues,
    itemMontlyData,
  };
};

const swap = (i, j, arr) => {
  let temp = null;
  temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
  return arr;
};

export const getTurnOverRateByItem = (SIVs, GRNs, itemMasterDatas) => {
  const {
    // monthlyData: sivMonthlyData,
    itemIDs: sivIDs,
    itemMontlyData: sivItemMontlyData,
  } = getSIVData(SIVs);
  const { itemIDs: grnIDs, itemMontlyData: grnItemMontlyData } = getSIVData(
    SIVs
  );

  let uniqueItems = [];
  sivIDs.concat(grnIDs).forEach((id) => {
    const index = uniqueItems.findIndex((prop) => prop === id);
    if (index < 0) {
      uniqueItems.push(id);
    }
  });

  let commonData = {};
  for (let item in sivItemMontlyData) {
    let isSame = false;
    for (let prop in grnItemMontlyData) {
      isSame = prop === item;
    }
    if (isSame) {
      commonData[item] = HelpMath.ArraySummation(
        sivItemMontlyData[item],
        grnItemMontlyData[item]
      );
    }
  }
  console.log(sivItemMontlyData);

  let notCommonData = {};
  const commonKeys = Object.keys(commonData);
  for (let item in sivItemMontlyData) {
    const index = commonKeys.findIndex((key) => key === item);
    if (index < 0) {
      notCommonData[item] = sivItemMontlyData[item];
    }
  }

  for (let item in grnItemMontlyData) {
    const index = commonKeys.findIndex((key) => key === item);
    if (index < 0) {
      notCommonData[item] = grnItemMontlyData[item];
    }
  }

  const combinedItemData = {
    ...commonData,
    ...notCommonData,
  };

  const foundNames = Object.keys(combinedItemData)
    .map((id) => {
      const index = itemMasterDatas.findIndex((item) => item.id === id);
      return index >= 0 ? itemMasterDatas[index].name : false;
    })
    .filter((item) => Boolean(item));

  const foundData = Object.keys(combinedItemData)
    .map((id, idx) => {
      const label = foundNames[idx];
      return {
        label,
        data: combinedItemData[id],
        backgroundColor: colorscheme.backgroundColor[idx],
      };
    })
    .filter((item) => Boolean(item.label));

  return {
    items: uniqueItems,
    foundData,
  };
};
