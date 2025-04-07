import React, { useEffect, useRef, useState } from "react";
import "./multiSelectInput.css";
import Pill from "./pill";

const MultiSelectInput = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestionList, setSuggestionList] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);
  const [selectedUserSet, setSelectedUserSet] = useState(new Set());
  const inputRef = useRef(null);

  console.log(selectedUserSet);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      return;
    }
    fetch(`https://dummyjson.com/users/search?q=${searchTerm}`)
      .then((res) => res.json())
      .then((data) => setSuggestionList(data.users));
  }, [searchTerm]);

  const handleSelectedUser = (user) => {
    const newList = [...selectedUser, user];
    setSelectedUser(newList);
    setSelectedUserSet(new Set([...selectedUserSet, user.email]));
    setSearchTerm("");
    // setSuggestionList([]);
    inputRef.current.focus();
  };

  const handleRemoveUser = (user) => {
    const updateList = selectedUser.filter((li) => li.id !== user.id);
    setSelectedUser(updateList);

    const updateEmail = new Set(selectedUserSet);
    updateEmail.delete(user.email);
    setSelectedUserSet(updateEmail);
  };

  function onHandleKey(e) {
    if (e.key === "Backspace" && selectedUser.length > 0 && searchTerm === "") {
      const lastUser = selectedUser[selectedUser.length - 1];
      handleRemoveUser(lastUser);
      setSuggestionList([]);
    }
  }

  return (
    <div className="input_component">
      <div className="input_section">
        {/* {Pills} */}
        {selectedUser.map((user) => {
          return (
            <Pill
              key={user.email}
              image={user.image}
              text={`${user.firstName} ${user.lastName}`}
              onClick={() => handleRemoveUser(user)}
            />
          );
        })}
        <div>
          <input
            ref={inputRef}
            type="text"
            placeholder="input here"
            className="input_box"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={onHandleKey}
          />

          <ul className="suggestion-list">
            {suggestionList.map((user) => {
              return !selectedUserSet?.has(user.email) ? (
                <li
                  key={user.email}
                  className="list"
                  onClick={() => handleSelectedUser(user)}
                >
                  <img src={user.image} alt={user.firstName} />
                  <span>{user?.firstName + " " + user?.lastName}</span>
                </li>
              ) : (
                <></>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MultiSelectInput;
