/*
import React, { Component } from 'react';
import Contacts from './Contacts/Contacts';
import Filter from './Filter/Filter';
import Form from './Form';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

/*class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Homer Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };
  
class App extends Component {
  state = {
    contacts: [],
  };

  componentDidMount() {
    this.allContactsFromLS();
  }

  /*
  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('contacts'));
    if (contacts) {
      this.setState({ contacts });
    }
  }

  /*
  allContactsFromLS = () => {
    try {
      return this.setState({
        contacts: JSON.parse(localStorage.getItem('contacts')) ?? [],
      });
    } catch (error) {
      return [];
    }
  };

  onAddContact = newName => {
    if (
      this.state.contacts.some(
        ({ name }) => name.toLowerCase() === newName.name.toLowerCase()
      )
    ) {
      alert(`${newName.name} is alredy in contacts`);
      return;
    }
    this.setState(({ contacts }) => ({ contacts: [...contacts, newName] }));
  };

  onFilterContact = evt => {
    this.setState({ filter: evt.currentTarget.value });
  };

  getContactList = () => {
    const { filter, contacts } = this.state;

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  onRemoveContact = idContact => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(
          contact => contact.id !== idContact
        ),
      };
    });
  };

  render() {
    const { filter, contacts } = this.state;
    return (
      <>
        <h1
          style={{
            marginTop: '25px',
            textAlign: 'center',
            color: 'rgb(145, 122, 122)',
          }}
        >
          Phonebook
        </h1>
        <Form addToContact={this.onAddContact} />

        <h2
          style={{
            marginTop: '20px',
            textAlign: 'center',
            color: 'rgb(145, 122, 122)',
          }}
        >
          Contacts:
        </h2>

        {contacts.length !== 0 && (
          <Filter value={filter} filterContacts={this.onFilterContact} />
        )}

        {contacts.length !== 0 && (
          <Contacts
            contacts={this.getContactList()}
            onRemove={this.onRemoveContact}
          />
        )}

        <ToastContainer />
      </>
    );
  }
}

export default App;*/

import React, { Component } from 'react';
import Contacts from './Contacts/Contacts';
import Filter from './Filter/Filter';
import Form from './Form';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    this.loadContactsFromLocalStorage();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      this.saveContactsToLocalStorage();
    }
  }

  loadContactsFromLocalStorage() {
    try {
      const storedContacts = JSON.parse(localStorage.getItem('contacts'));
      if (storedContacts) {
        this.setState({ contacts: storedContacts });
      }
    } catch (error) {
      console.error('Error loading contacts from local storage:', error);
    }
  }

  saveContactsToLocalStorage() {
    localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  }

  handleAddContact = newContact => {
    const { contacts } = this.state;
    if (
      contacts.some(
        ({ name }) => name.toLowerCase() === newContact.name.toLowerCase()
      )
    ) {
      alert(`${newContact.name} is already in contacts`);
    } else {
      this.setState(prevState => ({
        contacts: [...prevState.contacts, newContact],
      }));
    }
  };

  handleFilterContact = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  filterContacts() {
    const { filter, contacts } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  }

  handleRemoveContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const { filter, contacts } = this.state;
    return (
      <div>
        <h1
          style={{
            marginTop: '25px',
            textAlign: 'center',
            color: 'rgb(145, 122, 122)',
          }}
        >
          Phonebook
        </h1>
        <Form addToContact={this.handleAddContact} />
        <h2
          style={{
            marginTop: '20px',
            textAlign: 'center',
            color: 'rgb(145, 122, 122)',
          }}
        >
          Contacts:
        </h2>
        {contacts.length !== 0 && (
          <Filter value={filter} filterContacts={this.handleFilterContact} />
        )}
        {contacts.length !== 0 && (
          <Contacts
            contacts={this.filterContacts()}
            onRemove={this.handleRemoveContact}
          />
        )}
      </div>
    );
  }
}

export default App;
