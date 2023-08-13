import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [friends, setFriends] = useState([...initialFriends]);
  const [selected, setSelected] = useState(null);
  const [isShown, setIsShown] = useState(false);

  function handleAddFriend(newFriend) {
    setFriends((friends) => [...friends, newFriend]);
  }

  return (
    <div className="app">
      <Sidebar
        friends={friends}
        onAddFriend={handleAddFriend}
        selected={selected}
        setSelected={setSelected}
        isShown={isShown}
        setIsShown={setIsShown}
      />
      {selected && (
        <BillForm
          selected={selected}
          setSelected={setSelected}
          friends={friends}
          setFriends={setFriends}
        />
      )}
    </div>
  );
}

function Sidebar({
  friends,
  onAddFriend,
  selected,
  setSelected,
  isShown,
  setIsShown,
}) {
  function toggleForm() {
    setIsShown(!isShown);
    setSelected(null);
  }

  return (
    <div className="sidebar">
      <FriendList
        friends={friends}
        selected={selected}
        setSelected={setSelected}
        isShown={isShown}
        setIsShown={setIsShown}
      />
      {isShown && (
        <FriendForm
          onAddFriend={onAddFriend}
          isShown={isShown}
          setIsShown={setIsShown}
        />
      )}
      <button className="button" onClick={toggleForm}>
        {isShown ? "Close" : "Add friend"}
      </button>
      ;
    </div>
  );
}

function FriendList({ friends, selected, setSelected, isShown, setIsShown }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          selected={selected}
          setSelected={setSelected}
          isShown={isShown}
          setIsShown={setIsShown}
        />
      ))}
    </ul>
  );
}

function Friend({ friend, selected, setSelected, isShown, setIsShown }) {
  const isSelected = selected === friend.id;

  function handleSelected() {
    setSelected(isSelected ? null : friend.id);
    isShown && setIsShown(!isShown);
  }

  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} {Math.abs(friend.balance)}€
        </p>
      )}

      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you {friend.balance}€
        </p>
      )}

      {friend.balance === 0 && <p>You and {friend.name} are even.</p>}
      <button className="button" onClick={handleSelected}>
        {isSelected ? "Close" : "Select"}
      </button>
    </li>
  );
}

function FriendForm({ onAddFriend, isShown, setIsShown }) {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  function handleNewFriend(e) {
    e.preventDefault();

    if (!name || !url) return;

    const newFriend = {
      id: Date.now(),
      name: name,
      image: `${url}=${Date.now()}`,
      balance: 0,
    };

    onAddFriend(newFriend);

    setName("");
    setUrl("");
    setIsShown(!isShown);
  }

  return (
    <form className="form-add-friend" onSubmit={handleNewFriend}>
      <label htmlFor="name">👨 Friend name</label>
      <input
        type="text"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <label htmlFor="image">🖼️ Image URL</label>
      <input
        type="text"
        id="image"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
      />
      <button className="button">Add</button>
    </form>
  );
}

function BillForm({ selected, setSelected, friends, setFriends }) {
  const [bill, setBill] = useState("");
  const [expenseOwn, setExpenseOwn] = useState("");
  const [expenseFriend, setExpenseFriend] = useState("");
  const [whoPays, setWhoPays] = useState("You");

  const friend = friends.find((friend) => friend.id === selected);

  function handleBill(billValue) {
    setBill(billValue);
    setExpenseFriend(billValue - expenseOwn);
  }

  function handleExpenseOwn(expenseOwnValue) {
    setExpenseOwn(expenseOwnValue);
    setExpenseFriend(bill - expenseOwnValue);
  }

  function handleSplitBill(e) {
    e.preventDefault();

    if (!bill || !expenseOwn) return;

    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selected
          ? whoPays === "You"
            ? { ...friend, balance: friend.balance + expenseFriend }
            : { ...friend, balance: friend.balance - expenseOwn }
          : friend
      )
    );

    setBill("");
    setExpenseOwn("");
    setExpenseFriend("");
    setWhoPays("You");
    setSelected(null);
  }

  return (
    <form className="form-split-bill" onSubmit={handleSplitBill}>
      <h2>Split a bill with {friend.name}</h2>

      <label htmlFor="bill">💰 Bill value</label>
      <input
        type="number"
        id="bill"
        value={bill}
        onChange={(e) => handleBill(+e.target.value)}
        min={0}
      />

      <label htmlFor="expense-own">👨 Your expense</label>
      <input
        type="number"
        id="expense-own"
        value={expenseOwn}
        onChange={(e) => handleExpenseOwn(+e.target.value)}
        max={bill}
      />

      <label htmlFor="expense-friend">🧑‍🤝‍🧑 {friend.name}&apos;s expense</label>
      <input
        type="number"
        disabled
        placeholder={expenseFriend}
        id="expense-friend"
      />

      <label htmlFor="who-paying">🤑 Who is paying the bill?</label>
      <select
        id="who-paying"
        value={whoPays}
        onChange={(e) => setWhoPays(e.target.value)}
      >
        <option>You</option>
        <option>{friend.name}</option>
      </select>

      <button className="button">Split bill</button>
    </form>
  );
}
