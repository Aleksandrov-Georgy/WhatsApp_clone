import React from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import styles from './message.module.scss';
import {
  getIncomingMessage,
  fetchDeleteMessage,
  getIncomingMessageID,
} from '../../Store/Slice/listMessageSlice';
import { useDispatch } from 'react-redux';

const Messages = () => {
  const dispatch = useDispatch();

  const messages = useSelector((state) => state.listMessage.messages);

  const userID = useSelector((state) => state.login.idInstance);
  const userAPI = useSelector((state) => state.login.apiTokenInstance);
  const userOutNumber = useSelector((state) => state.pushMessage.chatId);

  const checkForNotifications = async () => {
    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://api.green-api.com/waInstance${userID}/receiveNotification/${userAPI}`,
      headers: {},
    };

    const getMessageFetch = await axios.request(config).then((response) => {
      return response;
    });

    if (getMessageFetch.data === null) {
      return;
    } else if (getMessageFetch.data.body.senderData.chatId.includes(userOutNumber)) {
      localStorage.setItem('idMessage', getMessageFetch.data.receiptId);

      dispatch(
        getIncomingMessage(getMessageFetch.data.body.messageData.textMessageData.textMessage),
      );
      dispatch(fetchDeleteMessage({ userID, userAPI }));
      dispatch(getIncomingMessageID(''));
    } else {
      localStorage.setItem('idMessage', getMessageFetch.data.receiptId);

      dispatch(fetchDeleteMessage({ userID, userAPI }));
    }
  };

  React.useEffect(() => {
    const interval = setInterval(() => {
      checkForNotifications();
    }, 6000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={styles.message}>
      {messages.map((el) =>
        el.type === 'outMessage' ? (
          <h1 key={Math.random()} className={styles.message_item}>
            {el.message}
          </h1>
        ) : (
          <h1 key={Math.random()} className={styles.message_item_incoming}>
            {el.message}
          </h1>
        ),
      )}
    </div>
  );
};

export default Messages;
