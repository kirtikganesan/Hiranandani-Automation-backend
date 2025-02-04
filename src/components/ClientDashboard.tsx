import React, { useEffect, useState } from "react";

interface Client {
  id: number;
  client_name: string;
  full_name: string;
  total: number;
  unallotted: number;
  pastdue: number;
  probable_overdue: number;
  high: number;
  medium: number;
  low: number;
  documents: string;
  billed_outstanding: number;
  unbilled: number;
}

interface Group {
  id: number;
  name: string;
  members: Client[];
}

const ClientDashboard = () => {
  const [financialData, setFinancialData] = useState<Client[]>([]);
  const [selectedClients, setSelectedClients] = useState<Client[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [groupName, setGroupName] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [groupToDelete, setGroupToDelete] = useState<number | null>(null);
  const [showGroupList, setShowGroupList] = useState(false); // Toggle groups display
  const [modalMessage, setModalMessage] = useState<string | null>(null); // New state for modal message

  useEffect(() => {
    fetch("http://localhost:5000/api/client-details")
      .then((response) => response.json())
      .then((data) => setFinancialData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleClientSelection = (client: Client) => {
    setSelectedClients((prev) =>
      prev.includes(client)
        ? prev.filter((c) => c !== client)
        : [...prev, client]
    );
  };

  const createGroup = () => {
    if (selectedClients.length < 2 || !groupName.trim()) {
      setModalMessage("Group should be created with a minimum of 2 members.");
      return;
    }

    const newGroup: Group = { id: Date.now(), name: groupName, members: selectedClients };

    fetch("http://localhost:5000/api/groups", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: groupName, members: selectedClients }),
    })
      .then((response) => response.json())
      .then((data) => {
        setGroups([...groups, { id: data.groupId, name: groupName, members: selectedClients }]);
        setSelectedClients([]);
        setGroupName("");
        setModalMessage("Group created successfully.");
      })
      .catch((error) => {
        setModalMessage("Error creating group.");
        console.error("Error creating group:", error);
      });
  };

  const deleteGroup = (groupId: number) => {
    setGroupToDelete(groupId);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (groupToDelete === null) return;
    
    fetch(`http://localhost:5000/api/groups/${groupToDelete}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        setGroups(groups.filter((group) => group.id !== groupToDelete));
        if (selectedGroup?.id === groupToDelete) {
          setSelectedGroup(null);
        }
        setShowDeleteModal(false);
      })
      .catch((error) => console.error("Error deleting group:", error));
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setGroupToDelete(null);
  };

  const handleGroupSelection = (group: Group) => {
    setSelectedGroup(group);
  };

  const toggleGroupList = () => {
    setShowGroupList(!showGroupList);
  };

  const closeModal = () => {
    setModalMessage(null);
  };

  const displayedData = selectedGroup
    ? financialData.filter((item) =>
        Array.isArray(selectedGroup.members) && selectedGroup.members.some((client) => client.id === item.id)
      )
    : financialData;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Client Dashboard</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter Group Name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          className="border p-2 mr-2"
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          onClick={createGroup}
        >
          Create Group
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={toggleGroupList}
        >
          Your Groups
        </button>
      </div>

      {/* Show the success/error modal */}
      {modalMessage && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <h3 className="text-xl mb-4">{modalMessage}</h3>
            <div className="flex justify-end">
              <button
                className="bg-gray-300 text-black px-4 py-2 rounded"
                onClick={closeModal}
              >
                Ok
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Show Groups Section */}
      {showGroupList && groups.length > 0 && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Your Groups:</h3>
          {groups.map((group) => (
            <div key={group.id} className="flex items-center mb-2">
              <button
                className="bg-gray-300 p-2 mr-2 rounded"
                onClick={() => handleGroupSelection(group)}
              >
                {group.name}
              </button>
              <button
                className="bg-red-500 text-white p-2 rounded"
                onClick={() => deleteGroup(group.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <h3 className="text-xl mb-4">Are you sure you want to delete this group?</h3>
            <div className="flex justify-end">
              <button
                className="bg-gray-400 text-white px-4 py-2 rounded mr-2"
                onClick={cancelDelete}
              >
                No
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={confirmDelete}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Select</th>
              <th className="p-2">Client Name</th>
              <th className="p-2">Total</th>
              <th className="p-2">Unallotted</th>
              <th className="p-2">Pastdue</th>
              <th className="p-2">Probable Overdue</th>
              <th className="p-2">High</th>
              <th className="p-2">Medium</th>
              <th className="p-2">Low</th>
              <th className="p-2">Documents</th>
              <th className="p-2">Billed & Outstanding</th>
              <th className="p-2">Unbilled</th>
            </tr>
          </thead>
          <tbody>
            {displayedData.map((item) => (
              <tr key={item.id} className="border">
                <td className="p-2">
                  <input
                    type="checkbox"
                    checked={selectedClients.includes(item)}
                    onChange={() => handleClientSelection(item)}
                  />
                </td>
                <td className="p-2">{item.client_name} ({item.full_name})</td>
                <td className="p-2">{item.total}</td>
                <td className="p-2">{item.unallotted}</td>
                <td className="p-2">{item.pastdue}</td>
                <td className="p-2">{item.probable_overdue}</td>
                <td className="p-2">{item.high}</td>
                <td className="p-2">{item.medium}</td>
                <td className="p-2">{item.low}</td>
                <td className="p-2">{item.documents}</td>
                <td className="p-2">{item.billed_outstanding}</td>
                <td className="p-2">{item.unbilled}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientDashboard;
