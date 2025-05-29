import { useState } from "react";
import data from "../../data.json";
import { GoPlus } from "react-icons/go";
import { FiMinus } from "react-icons/fi";
import { FaFolderPlus } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md";

import "./fileExprorer.css";

const List = ({ list, addItemInLost, deleteItemInLost }) => {
  const [isExpanded, setIsExpanded] = useState({});
  return (
    <div className="list">
      {list.map((item) => (
        <>
          <div key={item.id} className="list-item">
            {item.isFolder && (
              <span
                onClick={() =>
                  setIsExpanded((prev) => ({
                    ...prev,
                    [item?.name]: !prev[item?.name],
                  }))
                }
              >
                {isExpanded?.[item?.name] ? <FiMinus /> : <GoPlus />}
              </span>
            )}
            <span>{item.name}</span>
            {item.isFolder && (
              <span
                style={{ marginLeft: "12px" }}
                onClick={() => addItemInLost(item.id)}
              >
                <FaFolderPlus />
              </span>
            )}
            <span
              style={{ marginLeft: "12px" }}
              onClick={() => deleteItemInLost(item.id)}
            >
              <MdDeleteOutline />
            </span>

            {isExpanded?.[item?.name] && item.children && (
              <List
                list={item.children}
                addItemInLost={addItemInLost}
                deleteItemInLost={deleteItemInLost}
              />
            )}
          </div>
        </>
      ))}
    </div>
  );
};
const FileExprorer = () => {
  const [list, setList] = useState(data);

  const addItemInLost = (parentId) => {
    const name = prompt("Enter folder name");

    const updateList = (list) => {
      return list.map((node) => {
        if (node.id === parentId) {
          return {
            ...node,
            children: [
              ...node.children,
              {
                id: Date.now().toString(),
                name: name,
                isFolder: true,
                children: [],
              },
            ],
          };
        }

        if (node.children) {
          return {
            ...node,
            children: updateList(node.children),
          };
        }

        return node;
      });
    };

    setList((prev) => updateList(prev));
  };

  const deleteItemInLost = (parentId) => {
    const updateList = (list) => {
      return list
        .filter((node) => node.id !== parentId)
        .map((node) => {
          if (node.children) {
            return {
              ...node,
              children: updateList(node.children),
            };
          }

          return node;
        });
    };

    setList((prev) => updateList(prev));
  };
  return (
    <div className="container">
      <List
        list={list}
        addItemInLost={addItemInLost}
        deleteItemInLost={deleteItemInLost}
      />
    </div>
  );
};

export default FileExprorer;
