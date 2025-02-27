import React, { useEffect, useState } from "react";

interface Client {
  Client_Name: string;
  Total: number;
  Unallotted: number;
  Pastdue: number;
  Probable_Overdue: number;
  High: number;
  Medium: number;
  Low: number;
  Documents: string;
  Billed_Outstanding: number;
  Unbilled: number;
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
  const [showGroupList, setShowGroupList] = useState(false);
  const [modalMessage, setModalMessage] = useState<string | null>(null);

  useEffect(() => {
    // Fetch client data
    fetch("http://localhost:5000/api/client-dashboard")
      .then((response) => response.json())
      .then((data) => setFinancialData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    // Fetch groups
    fetch("http://localhost:5000/api/groups")
      .then((res) => res.json())
      .then((groupData: { id: number; name: string; members: string }[]) => {
        const updatedGroups: Group[] = groupData.map((group) => ({
          id: group.id,
          name: group.name,
          members: JSON.parse(group.members) || [],
        }));
        setGroups(updatedGroups);
      })
      .catch((error) => console.error("Error fetching groups:", error));
  }, []);

  const handleClientSelection = (client: Client) => {
    setSelectedClients((prev) =>
      prev.some((c) => c.Client_Name === client.Client_Name)
        ? prev.filter((c) => c.Client_Name !== client.Client_Name)
        : [...prev, client]
    );
  };

  const createGroup = () => {
    if (selectedClients.length < 2) {
      setModalMessage("Group should be created with a minimum of 2 members.");
      return;
    }
    if (!groupName.trim()) {
      setModalMessage("Please enter Group name.");
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
        Array.isArray(selectedGroup.members) && selectedGroup.members.some((client) => client.Client_Name === item.Client_Name)
      )
    : financialData;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Client Dashboard</h2>
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

      {selectedGroup && (
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded mb-4"
          onClick={() => setSelectedGroup(null)}
        >
          Back to All Clients
        </button>
      )}

      <div className="overflow-x-auto rounded-lg shadow">
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="p-2 border">Select</th>
              <th className="p-2 border">Client Name</th>
              <th className="p-2 border">Total</th>
              <th className="p-2 border">Unallotted</th>
              <th className="p-2 border">Pastdue</th>
              <th className="p-2 border">Probable Overdue</th>
              <th className="p-2 border">High</th>
              <th className="p-2 border">Medium</th>
              <th className="p-2 border">Low</th>
              <th className="p-2 border">Documents</th>
              <th className="p-2 border">Billed & Outstanding</th>
              <th className="p-2 border">Unbilled</th>
            </tr>
          </thead>
          <tbody>
            {displayedData.map((item) => (
              <tr key={item.Client_Name} className="border text-sm text-center">
                <td className="p-2">
                  <input
                    type="checkbox"
                    checked={selectedClients.some(c => c.Client_Name === item.Client_Name)}
                    onChange={() => handleClientSelection(item)}
                  />
                </td>
                <td className="p-2 border">{item.Client_Name}</td>
                <td className="p-2 border">{item.Total}</td>
                <td className="p-2 border">{item.Unallotted}</td>
                <td className="p-2 border">{item.Pastdue}</td>
                <td className="p-2 border">{item.Probable_Overdue}</td>
                <td className="p-2 border">{item.High}</td>
                <td className="p-2 border">{item.Medium}</td>
                <td className="p-2 border">{item.Low}</td>
                <td className="p-2 border">{item.Documents}</td>
                <td className="p-2 border">{item.Billed_Outstanding}</td>
                <td className="p-2 border">{item.Unbilled}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientDashboard;
