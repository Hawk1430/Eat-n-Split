import { useState } from "react";
import "./index.css";
import { initialFriends } from "./data";
import Button from "./Button";
import FriendsList from "./FriendList";
import FormAddFriend from "./FormAddFriend";
import SplitBillForm from "./SplitBillForm";

export default function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleFriends(newFriend) {
    setFriends((friends) => [...friends, newFriend]);
    setShowAddFriend(false);
  }

  function handleShowAddFriend() {
    setShowAddFriend((showAddFriend) => !showAddFriend);
    setSelectedFriend(null);
  }

  function handleSelection(friend) {
    setSelectedFriend((curr) => (curr?.id === friend.id ? null : friend));
    setShowAddFriend(false);
  }

  function handleSplitBill(value) {
    setFriends((friends) =>
      friends.map((friend) =>
        selectedFriend?.id === friend.id
          ? { ...friend, balance: value + friend.balance }
          : friend
      )
    );
    setSelectedFriend(null);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          onSelection={handleSelection}
          friends={friends}
          selectedFriend={selectedFriend}
        />

        {showAddFriend && <FormAddFriend onAddFriend={handleFriends} />}

        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? "Close" : "Add Friend"}
        </Button>
      </div>

      {selectedFriend && (
        <SplitBillForm
          selectedFriend={selectedFriend}
          onSplitBill={handleSplitBill}
        />
      )}
    </div>
  );
}
