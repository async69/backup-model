import React from "react";
import PropTypes from "../utils/propTypes";
import bn from "../utils/bemnames";
import { Breadcrumb, BreadcrumbItem, Col } from "reactstrap";
import Typography from "./Typography";

const bem = bn.create("page");

const Page = ({
  title,
  breadcrumbs,
  tag: Tag,
  className,
  children,
  editable,
  ...restProps
}) => {
  const classes = bem.b("px-3", className);

  return (
    <Tag className={classes} {...restProps}>
      <Col md={12} sm={12} xs={12}>
        <div className={bem.e("header")}>
          {title && typeof title === "string" ? (
            <Typography type="h4" className={bem.e("title")}>
              {title}
            </Typography>
          ) : (
            title
          )}
          {breadcrumbs && (
            <Breadcrumb className={bem.e("breadcrumb")}>
              {/* <BreadcrumbItem>Home</BreadcrumbItem> */}
              {breadcrumbs.length &&
                breadcrumbs.map(({ name }, index) => (
                  <BreadcrumbItem key={index}>
                    <small>{name}</small>
                  </BreadcrumbItem>
                ))}
            </Breadcrumb>
          )}
        </div>
      </Col>
      {children}
    </Tag>
  );
};

Page.propTypes = {
  tag: PropTypes.component,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  className: PropTypes.string,
  children: PropTypes.node,
  editable: PropTypes.bool,
  breadcrumbs: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      active: PropTypes.bool,
    })
  ),
};

Page.defaultProps = {
  tag: "div",
  title: "",
};

export default Page;
