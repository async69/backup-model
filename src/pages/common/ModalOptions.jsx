import PostForm from "pages/common/PostForm";
import React from "react";
import { ConfirmAlert } from "./ConfirmAlert";

export const initialState = {
  openModal: false,
  data: {},
  title: "",
  Component: <React.Fragment />,
  options: {},
  loader: false,
};

export const _toggle = (prop, dispatch) => {
  if (prop === "CLOSE") {
    dispatch({ type: "CLOSE" });
    return null;
  }

  const {
    type,
    title,
    data,
    Component,
    deleteOptions,
    options,
    loader,
    submit,
    size,
    submitButtonLabel,
  } = prop;

  switch (type) {
    case "VIEW": {
      dispatch({
        type: "OPEN",
        data,
        title,
        loader,
        size,
        Component,
        props: {
          disabled: true,
          data: data,
          isView: true,
          options: options,
          title: title,
        },
      });
      break;
    }

    case "ADD": {
      dispatch({
        type: "OPEN",
        data,
        Component,
        size,
        props: {
          data: data,
          options: options,
          submit: submit,
          isAdd: true,
          title: title ? title : "",
        },
      });
      break;
    }

    case "EDIT": {
      dispatch({
        type: "OPEN",
        data,
        title,
        loader,
        Component,
        size,
        props: {
          data: data,
          options: options,
          isEdit: true,
          submit: submit,
          title: title ? title : "",
        },
      });
      break;
    }

    case "PATCH": {
      dispatch({
        type: "OPEN",
        data,
        title,
        loader,
        Component,
        size,
        props: {
          data: data,
          options: options,
          isPatch: true,
          submit: submit,
          title: title ? title : "",
        },
      });
      break;
    }

    case "DELETE": {
      ConfirmAlert({ ...deleteOptions });
      break;
    }

    case "CLOSE": {
      dispatch({ type: "CLOSE" });
      break;
    }
    case "POST": {
      dispatch({
        type: "OPEN",
        data,
        title,
        size,
        loader,
        Component: PostForm,
        props: {
          data: data,
          options: options,
          isEdit: true,
          submit: submit,
          submitButtonLabel: submitButtonLabel,
          title: title ? title : "",
        },
      });
      break;
    }

    default:
      return null;
  }
};

export const reducer = (state = initialState, action) => {
  const { type, title, Component, props, size } = action;
  switch (type) {
    case "OPEN": {
      return {
        ...state,
        openModal: true,
        title,
        size,
        Component: <Component {...props} />,
      };
    }

    case "CLOSE": {
      return {
        ...state,
        openModal: false,
      };
    }

    default:
      return null;
  }
};
