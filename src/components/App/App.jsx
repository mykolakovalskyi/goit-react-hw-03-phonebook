import React, { Component } from 'react';
import ContactForm from '../ContactForm/ContactForm';
import Filter from '../Filter/Filter';
import ContactList from '../ContactList/ContactList';
import css from './App.module.css';

export default class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addContact = newContact => {
    const { contacts } = this.state;
    let nameCheckingArray = contacts.map(contact => contact.name);
    if (!nameCheckingArray.includes(newContact.name)) {
      this.setState({ contacts: [...contacts, newContact] });
    } else {
      alert(`${newContact.name} is already in contacts`);
    }
  };

  deleteContact = contactId => {
    const { contacts } = this.state;
    this.setState({
      contacts: contacts.filter(contact => contact.id !== contactId),
    });
  };

  setFilter = value => {
    this.setState({ filter: value });
  };

  contactsFilter = () => {
    const { contacts, filter } = this.state;

    if (filter === '') {
      return contacts;
    }

    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
    return filteredContacts;
  };

  componentDidMount() {
    try {
      const savedContacts = localStorage.getItem('contacts');
      const parsedContacts = JSON.parse(savedContacts);
      if (parsedContacts) {
        this.setState({
          contacts: parsedContacts,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async componentDidUpdate(prevState) {
    const { contacts } = this.state;
    if (prevState.contacts !== contacts) {
      await localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  render() {
    return (
      <div className={css.wraper}>
        <h1>Phonebook</h1>
        <ContactForm newContactData={this.addContact}></ContactForm>
        <h2>Contacts</h2>
        <Filter setFilter={this.setFilter}></Filter>
        <ContactList
          contacts={this.contactsFilter()}
          deleteContact={this.deleteContact}
        ></ContactList>
      </div>
    );
  }
}
