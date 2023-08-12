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
  return (
    <div className="app">
      <Sidebar />
      <BillForm />
    </div>
  );
}

function Sidebar() {
  return (
    <div className="sidebar">
      <FriendList />
      <FriendForm />
      <button className="button">Add Friend</button>
    </div>
  );
}

function FriendList() {
  return (
    <ul>
      {initialFriends.map((friend) => (
        <Friend friend={friend} key={friend.id} />
      ))}
    </ul>
  );
}

function Friend({ friend }) {
  return (
    <li>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      <p>You owe {friend.name} X€</p>
      <button className="button">Select</button>
    </li>
  );
}

function FriendForm() {
  return (
    <form className="form-add-friend">
      <label htmlFor="name">👨 Friend name</label>
      <input type="text" id="name" />
      <label htmlFor="image">🖼️ Image URL</label>
      <input type="text" id="image" />
      <button className="button">Add</button>
    </form>
  );
}

function BillForm() {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with Clark</h2>
      <label htmlFor="bill">💰 Bill value</label>
      <input type="number" id="bill" />
      <label htmlFor="expense-own">👨 Your expense</label>
      <input type="number" id="expense-own" />
      <label htmlFor="expense-friend">🧑‍🤝‍🧑 Clark&apos;s expense</label>
      <input type="number" disabled placeholder="60" id="expense-friend" />
      <label htmlFor="who-paying">🤑 Who is paying the bill?</label>
      <select id="who-paying">
        <option>You</option>
        <option>Clark</option>
      </select>
    </form>
  );
}
