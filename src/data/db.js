// Simple in-memory data store for the waitlist
// (Client ke liye baad mein real DB — MongoDB/Postgres — se replace kiya ja sakta hai)

let waitlist = [];
let nextId = 1;

const getAll = () => waitlist;

const getById = (id) => waitlist.find(entry => entry.id === Number(id));

const create = (entryData) => {
  const newEntry = {
    id: nextId++,
    ...entryData,
    joinedAt: new Date().toISOString(),
  };
  waitlist.push(newEntry);
  return newEntry;
};

const update = (id, updates) => {
  const index = waitlist.findIndex(entry => entry.id === Number(id));
  if (index === -1) return null;

  waitlist[index] = { ...waitlist[index], ...updates };
  return waitlist[index];
};

const remove = (id) => {
  const index = waitlist.findIndex(entry => entry.id === Number(id));
  if (index === -1) return false;

  waitlist.splice(index, 1);
  return true;
};

module.exports = { getAll, getById, create, update, remove };