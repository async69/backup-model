import Joi from "joi-browser"

export const data = [
  {
    partner_group_detail: "OOO",
    item_group_detail: 2,
    purchase_account_detail: "Account 1",
    sales_account_detail: 1222,
    cost_of_goods_sold_account_detail: "One",
    root_item: {
      value: "Some value 1"
    },
    updated_at: String(new Date()),
  },
  {
    partner_group_detail: "OOO",
    item_group_detail: 4,
    purchase_account_detail: "Account 1",
    sales_account_detail: 1222,
    cost_of_goods_sold_account_detail: "Three",
    root_item: {
      value: "Some value 2"
    },
    updated_at: String(new Date()),
  },
  {
    partner_group_detail: "OOO",
    item_group_detail: 2,
    purchase_account_detail: "Account 1",
    sales_account_detail: 4444,
    cost_of_goods_sold_account_detail: "Three",
    root_item: {
      value: "Some value 3"
    },
    updated_at: String(new Date()),
  },
];

export const options = ["One", "Two", "Three"];

export const optionsNew = [
  { name: "A", id: 1 },
  { name: "B", id: 2 },
  { name: "C", id: 3 },
  { name: "D", id: 4 },
]

export const columns = [
  {
    type: "text",
    label: "Partner Group",
    tag: "partner_group_detail",
    path: "partner_group_detail",
  },
  {
    type: "select",
    label: "Item Group",
    tag: "item_group_detail",
    path: "item_group_detail",
    options: optionsNew,
    optionsFrom: "server"
  },
  {
    type: "text",
    label: "Purchase Account",
    tag: "purchase_account_detail",
    path: "purchase_account_detail",
  },
  {
    type: "number",
    label: "Sales Account",
    tag: "sales_account_detail",
    path: "sales_account_detail",
  },
  {
    type: "select",
    label: "Cost Account",
    tag: "cost_of_goods_sold_account_detail",
    path: "cost_of_goods_sold_account_detail",
    options,
  },
  {
    type: "root_item",
    label: "Root Item",
    tag: "root_item",
    path: "root_item.value",
  },
  {
    type: "text",
    noEdit: true,
    label: "Last Modified",
    tag: "updated_at",
    path: "updated_at",
  }
];

export const schema = {
    _id: Joi.string().allow("").optional(),
    partner_group_detail: Joi.string(),
    item_group_detail: Joi.number(),
    purchase_account_detail: Joi.string(),
    sales_account_detail: Joi.number(),
    cost_of_goods_sold_account_detail: Joi.string(),
    root_item: Joi.string(),
    updated_at: Joi.string().allow("").optional(),
  };