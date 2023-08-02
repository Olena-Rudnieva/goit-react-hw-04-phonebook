import { useState, useEffect } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { nanoid } from 'nanoid';

const LS_KEY = 'phonebook_contacts';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const savedContacts = localStorage.getItem(LS_KEY);
    const parsedContacts = JSON.parse(savedContacts) ?? [];
    setContacts(parsedContacts);
  }, []);

  useEffect(() => {
    if (contacts.length === 0) return;
    localStorage.setItem(LS_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const formSubmitHandler = data => {
    const newContact = {
      id: nanoid(),
      ...data,
    };

    if (contacts.find(contact => data.name === contact.name)) {
      alert(`${data.name} is already in contacts.`);
      return;
    }

    setContacts(prevState => [newContact, ...prevState]);
  };

  const changeFilter = event => {
    setFilter(event.target.value);
  };

  const getFilteredNames = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter.toLowerCase())
    );
  };

  const deleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };

  return (
    <div className="container">
      <h1>Phonebook</h1>
      <ContactForm onSubmit={formSubmitHandler} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList data={getFilteredNames()} onDeleteContact={deleteContact} />
    </div>
  );
};
