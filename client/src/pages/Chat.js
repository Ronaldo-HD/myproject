import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Loader from '../components/loader'

const ChatPage = () => {

  const [Receiver , setReceiver] = useState('')
  const myid = sessionStorage.getItem('FNP_userId');
  const [contacts, setContacts] = useState([]);
  const [messages, setMessages] = useState([]);
  const [testMessage, setTextMessage] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    setTextMessage(e.target.value);
    // Clear the input value by setting the state to an empty string
    
  };

  useEffect(() => {
    document.getElementById('loader').style.display='flex'

    function getusers(){
        fetch('http://localhost:3003/testusers') // Fetch contacts from the backend
        .then(res => res.json())
        .then(response => {
          setContacts(response);
        });
    }
   

    fetch('http://localhost:3003/messages') // Fetch messages from the backend
      .then(res => res.json())
      .then(response => {
        setMessages(response);
        document.getElementById('loader').style.display='none'
      });

      getusers()
  },[]);

  const handleContactClick = (contact , contactid) => {
    setSelectedContact(contact);
    setReceiver(contactid)
    displayMessages(myid,contactid)
  };




  function testsend(senderId, receiverId, messageText, timestamp){
         const sentMessage = {messageId: 41, senderId: myid, receiverId: Receiver, messageText: messageText, timestamp: timestamp}
         messages.push(sentMessage)

        fetch('http://localhost:3003/sendmessage', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              senderId: senderId,
              receiverId: receiverId,
              messageText: messageText,
              timestamp: timestamp,
            }),
          })
            .then((res) => res.text())
            .then((data) => {
              console.log('ds'); // Log the response message
              // You can perform additional actions based on the response if needed
            })
            .catch((error) => {
              console.error('Errorsss sending message:', error);
              // Handle error or display an error message to the user
            });


                fetch('http://localhost:3003/messages') // Fetch messages from the backend
                  .then(res => res.json())
                  .then(response => {
                    setMessages(response);
                    document.getElementById('inputmessage').value=''
                    displayMessages(myid, Receiver)
                
                  });
            
                  
                  
  }


  const displayMessages = (senderId, receiverId) => {
    console.log(messages)
    
    const div = document.getElementById('convoDiv')
    div.innerHTML=''
   
     for (let i = 0; i < messages.length; i++) {
      if ((messages[i].senderId == senderId && messages[i].receiverId == receiverId) ||
         (messages[i].receiverId == senderId && messages[i].senderId == receiverId)  ) {

            const thred = document.createElement('div')
            thred.innerText = messages[i].messageText
            thred.classList='textmessage'
            if(messages[i].senderId==myid){
                thred.classList.add('senderme')
                
            }
            div.appendChild(thred)
      };
      }
    }
   
  return (
    <div style={{ display: 'flex', width: '90%', margin:'auto', borderRadius:'10px',
    height: '75vh', backgroundColor: 'transparent' }}>
        <Loader/>
      {/* Contacts */}
      <div style={{ flexBasis: '25%', height: '100%', overflowY: 'auto', backgroundColor: 'var(--light)', color: 'white' , borderRight:'1px solid white' }}>
        <Typography variant="h6" style={{ padding: '16px' }}>
          Chat
        </Typography>
        <Divider />
        <div>
          {contacts.map((contact, index) => (
            <div key={index} onClick={() => handleContactClick(contact , contact.UserID)} style={{ display: 'flex', alignItems: 'center', gap: '25px', padding: '16px', cursor: 'pointer' }}>
              <img className='MyAvatar' src={require(`../photos/${contact.ProfilePicture}`)} alt={contact.Username} />
              <p>{contact.Username}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Conversation */}
      <div style={{ flex: 1, height: '100%', backgroundColor: 'var(--light)', color: 'white', position: 'relative' , padding:'10px' }}>
        {selectedContact && (
          <div style={{ display: 'flex', alignItems: 'center', padding: '10px', gap: '20px' , borderBottom:'1px solid white' }}>
            <img className='MyAvatar' src={require(`../photos/${selectedContact.ProfilePicture}`)} alt={selectedContact.Username} />
            <Typography variant="h6" style={{ padding: '16px' }}>
              {selectedContact.Username}
            </Typography>
          </div>
        )}

    
        <div id='convoDiv' style={{ overflowY: 'auto', maxHeight: 'calc(100% - 120px)', padding: '10px' , display:'flex' , flexDirection:'column'}}>
           
        </div>


        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'space-between', position: 'absolute',
         bottom: 0, width: '99%', borderRadius: '10px', border: '1px solid grey', padding: '5px 10px' }} >
          
          <input id='inputmessage'  className="messageInput" 
          onChange={handleInputChange} placeholder="Write a message ..." />

          <img style={{ height: '25px', cursor: 'pointer' }} src={require(`../images/attach-file.png`)} />

          <img style={{ height: '25px', cursor: 'pointer' }} src={require(`../images/send.png`)}
            onClick={()=>testsend(myid, Receiver, testMessage, new Date().toISOString())} />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
