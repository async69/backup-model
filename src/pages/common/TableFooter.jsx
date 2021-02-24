import React, { useContext, useEffect, useState } from "react";
import { Pagination, PaginationItem, PaginationLink, Col } from "reactstrap";
import { MainContext } from "../../context/Main/";
import {
  getState,
  setPageOptions,
  getPageLimit,
} from "../../context/Main/States/Pagination";

const TableFooter = () => {
  const { rootState, dispatch } = useContext(MainContext);
  const [offset, setOffset] = useState(0);
  const [pageLimit, setPageLimit] = useState(0);
  const [maxLimit, setMaxLimit] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [lock, setLock] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [buffer, setBuffer] = useState({ count: 0, results: [] });
  const [count, setCount] = useState(0);
  const [openTab, setOpenTab] = useState("");

  useEffect(() => {
    const limit = getPageLimit(rootState);
    if (typeof limit !== "undefined") {
      if (pageLimit !== limit) {
        // handleChange(offset, limit)
      }
    }
  }, [rootState]);

  useEffect(() => {
    const { count, results } = buffer;
    if (!(results.length === 0 && count === 0)) {
      setNumberOfPages(Math.ceil(count / results.length));
      setPageLimit(results.length);
      setMaxLimit(count);
      setLock(true);
    }
  }, [openTab, setNumberOfPages, setPageLimit, setMaxLimit, setLock]);

  useEffect(() => {
    if (count) {
      const { count: fetchedCount, results: data } = buffer;
      if (pageLimit <= data.length) {
        setNumberOfPages(Math.ceil(fetchedCount / data.length));
        setPageLimit(data.length);
        setMaxLimit(fetchedCount);
        setLock(true);
      }
    }
  }, [count, buffer]);

  useEffect(() => {
    try {
      const { results, amount, activeTab } = getState(rootState);
      activeTab !== ""
        ? setOpenTab(activeTab)
        : console.warn("Pass active tab for paginations");
      if (amount !== count) {
        if (typeof amount !== "undefined") {
          setCount(amount);
          setBuffer(results);
        }
      }
      if (String(results) !== "undefined" && !lock) {
        const { count, results: data } = results;
        setNumberOfPages(Math.ceil(count / data.length));
        setPageLimit(data.length);
        setMaxLimit(count);
        setLock(true);
      }
    } catch (e) {}
  }, [rootState, setCount, setBuffer]);

  const handleChange = (offset, limit = null) => {
    if (!clicked) {
      setClicked(true);
    }
    setOffset(offset);
    if (limit) {
      setPageLimit(limit);
    }
  };

  useEffect(() => {
    if (offset < maxLimit) {
      if (clicked) {
        setPageOptions({}, dispatch, {
          offset,
          limit: pageLimit,
          onClick: clicked,
        });
      }
    }
  }, [offset, pageLimit]);

  return (
    <Col sm={12} xs={12} md={12} align="center">
      <Pagination size="sm">
        <PaginationItem disabled={offset === 0}>
          <PaginationLink first href="#" onClick={() => handleChange(0)}>
            First
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            previous
            disabled={offset === 0}
            onClick={() => handleChange(offset - pageLimit)}
          />
        </PaginationItem>
        {Array(numberOfPages)
          .fill("")
          .map((_, idx) => (
            <PaginationItem active={idx === Math.floor(offset / pageLimit)}>
              <PaginationLink onClick={() => handleChange(idx * pageLimit)}>
                {idx + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
        <PaginationItem>
          <PaginationLink
            next
            onClick={() => handleChange(offset + pageLimit)}
            disabled={offset + pageLimit >= maxLimit}
          />
        </PaginationItem>
        <PaginationItem disabled={offset + pageLimit >= maxLimit}>
          <PaginationLink
            last
            onClick={() => handleChange((numberOfPages - 1) * pageLimit)}
          >
            Last
          </PaginationLink>
        </PaginationItem>
      </Pagination>
    </Col>
  );
};

export default TableFooter;
