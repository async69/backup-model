import React, { useState, useContext, useEffect } from "react";
import { MdFilterList, MdSearch } from "react-icons/md";
import {
  Form,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "reactstrap";
import { SearchContext, MainContext } from "../context/";
import {
  updateSearchValue,
  getState,
  setLockComponent,
  isLocked,
} from "../context/Main/States/search";
import { getBreakpoint } from "../context/Main/States/Responsiveness";
import filterPages from "../static/data/NoFilterAllowedPages.json";
// import { FaCcDiscover } from "react-icons/fa";

const hasFilterAllowed = () => {
  const currentPath = String(window.location.href).slice(
    22,
    window.location.href.length
  );
  const index = filterPages.findIndex((page) => page === currentPath);
  return index < 0;
};

const SearchInput = ({ history }) => {
  const { rootState, dispatch } = useContext(MainContext);
  const [Component, setComponent] = useState(<></>);
  getBreakpoint(rootState);

  useEffect(() => {
    if (getState(rootState)) {
      if (!isLocked(rootState)) {
        const Component = getState(rootState).Component;
        setComponent(<Component />);
        setLockComponent({}, dispatch, true);
      }
    }
  }, [rootState]);

  const { toggleValue } = useContext(SearchContext);

  const handleChange = ({ currentTarget: { value } }) => {
    toggleValue(value);
    updateSearchValue({}, dispatch, value);
  };

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      {getBreakpoint(rootState).isMobile ? (
        <Form
          inline
          className="cr-search-form"
          onSubmit={(e) => e.preventDefault()}
        >
          <Input
            type="search"
            className="cr-search-form__input"
            placeholder="Search..."
            onChange={handleChange}
            style={{ marginRight: 20 }}
          />
          <MdFilterList
            className="cr-search-form__icon-filter text-secondary"
            onClick={toggle}
            size="20"
          />

          <Modal size="sm" isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Filter Your Results</ModalHeader>
            <ModalBody>{hasFilterAllowed() ? Component : <></>}</ModalBody>
            <ModalFooter className="footer">
              <Button onClick={toggle}>Filter</Button>
            </ModalFooter>
          </Modal>
        </Form>
      ) : (
        <Form
          inline
          className="cr-search-form"
          onSubmit={(e) => e.preventDefault()}
        >
          <MdSearch
            size="20"
            className="cr-search-form__icon-search text-secondary"
          />
          <Input
            type="search"
            className="cr-search-form__input"
            placeholder="Search..."
            onChange={handleChange}
            style={{ marginRight: 20 }}
          />
          {hasFilterAllowed() ? Component : <></>}
        </Form>
      )}
    </div>
  );
};

export default SearchInput;
