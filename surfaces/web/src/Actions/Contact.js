import { fetchConversationList, markConversationAsRead, fetchMessageChain, uploadMessage, createSession, retrieveSessionFromProfile, sendSignUpSession, removeMessage } from '../Components/Async/Contact';
import { updateSignUpError, updateSignUpLoading } from './Session';
import { push } from 'react-router-redux';
import { deleteEventFromMySchedule } from './Schedule';

export function updateConversationList(val) {
  return {
    type: "UPDATE_CONVERSATION_LIST",
    payload: { val: val }
  };
}

export function updateComposerMode(val) {
  return {
    type: "UPDATE_COMPOSER_MODE",
    payload: { val: val }
  };
}

export function updateInvitationDefaultTime(val) {
  return {
    type: "UPDATE_INVITATION_DEFAULT_TIME",
    payload: { val: val }
  };
}

export function updateShowConversationID(val) {
  return {
    type: "UPDATE_SHOW_CONVERSATION_ID",
    payload: { val: val }
  };
}

export function updateWithUid(val) {
  return {
    type: "UPDATE_WITH_UID",
    payload: { val: val }
  };
}

export function updateShowMessageChain(val) {
  return {
    type: "UPDATE_SHOW_MESSAGE_CHAIN",
    payload: { val: val }
  };
}

export function updateChainStatus(val) {
  return {
    type: "UPDATE_CHAIN_STATUS",
    payload: { val: val }
  };
}

export function updateMessageComposerStatus(val) {
  return {
    type: "UPDATE_MESSAGE_COMPOSER_STATUS",
    payload: { val: val }
  };
}

export function updateSessionInvitationComposerStatus(val) {
  return {
    type: "UPDATE_SESSION_INVITATION_COMPOSER_STATUS",
    payload: { val: val }
  };
}

export function refreshMessageChain() {
  return (dispatch, getState) => {
    dispatch(updateChainStatus("loading"));
    var conversationID = getState().contact.showConversationID;
    if (conversationID !== "") {
      fetchMessageChain(conversationID)
      .then((snap) => {
        dispatch(updateShowMessageChain(snap.data));
        dispatch(updateChainStatus("ready"));
      })
      .catch((err) => {
        console.log("fuck", err);
        dispatch(updateChainStatus("no_select"));
      });
    }
  };
}

export function checkConversation(conversationID, active, withUid) {
  return (dispatch, getState) => {
    dispatch(updateShowConversationID(conversationID));
    dispatch(updateWithUid(withUid));
    dispatch(refreshMessageChain());
    if (active) {
      markConversationAsRead(conversationID)
      .then(() => {
        dispatch(refreshConversationList());
      })
      .catch((err) => {
        console.log("fuck", err);
      });
    }
  };
}

export function refreshConversationList() {
  return (dispatch, getState) => {
    fetchConversationList()
    .then((snap) => {
      dispatch(updateConversationList(snap.data));
    })
    .catch((err) => {
      console.log("fuck", err);
      dispatch(updateConversationList([]));
    });
  };
}

export function sendPlainMessage(info) {
  return (dispatch, getState) => {
    dispatch(updateMessageComposerStatus("loading"));
    var conversationID = getState().contact.showConversationID;
    var toUid = getState().contact.withUid;
    var title = info.title;
    var content = { text: info.content };
    uploadMessage(toUid, title, content, conversationID, "plain_message")
    .then(() => {
      dispatch(refreshMessageChain());
      dispatch(updateMessageComposerStatus("composing"));
    })
    .catch((err) => {
      console.log("fuck", err);
      dispatch(updateMessageComposerStatus("error"));
    });
  };
}

export function sendConfirmation(session) {
  return (dispatch, getState) => {
    var conversationID = getState().contact.showConversationID;
    var toUid = getState().contact.withUid;
    var title = "Session Confirmation";
    uploadMessage(toUid, title, session, conversationID, "confirmation")
    .then(() => {
      dispatch(refreshMessageChain());
    })
    .catch((err) => {
      console.log("fuck", err);
    });
  };
}

export function sendAcceptance(event) {
  return (dispatch, getState) => {
    var conversationID = getState().contact.showConversationID;
    var toUid = getState().contact.withUid;
    var title = "Appointment Accepted";
    uploadMessage(toUid, title, event, conversationID, "acceptance")
    .then(() => {
      dispatch(refreshMessageChain());
    })
    .catch((err) => {
      console.log("fuck", err);
    });
  };
}

export function sendSessionInvitation(info) {
  return (dispatch, getState) => {
    dispatch(updateSessionInvitationComposerStatus("loading"));
    var conversationID = getState().contact.showConversationID;
    var toUid = getState().contact.withUid;
    createSession(info)
    .then((snap) => {
      var sessionID = snap.data;
      retrieveSessionFromProfile(sessionID)
      .then((session) => {
        uploadMessage(toUid, "New Session", session, conversationID, "session_invitation")
        .then(() => {
          dispatch(refreshMessageChain());
          dispatch(updateMessageComposerStatus("composing"));
        })
      })
    })
    .catch((err) => {
      console.log("fuck", err);
      dispatch(updateMessageComposerStatus("error"));
    });
  };
}

export function signUpSession(info) {
  return (dispatch, getState) => {
    var sessionID = info.content.sessionID;
    var selfKey = info.selfKey;
    var conversationID = getState().contact.showConversationID;
    dispatch(updateSignUpLoading(true));
    sendSignUpSession(sessionID)
    .then(() => {
      removeMessage(selfKey, conversationID)
      .then(() => {
        dispatch(refreshMessageChain());
        dispatch(sendConfirmation(info.content));
        dispatch(updateSignUpLoading(false));
        dispatch(updateSignUpError(false));
      })
    })
    .catch((err) => {
      console.log("fuck", err);
      dispatch(updateSignUpLoading(false));
      dispatch(updateSignUpError(true));
    })
  };
}

export function jumpToConversation(conversationID, withUid) {
  return (dispatch, getState) => {
    dispatch(push("/workspace/contacts"));
    dispatch(refreshConversationList());
    dispatch(checkConversation(conversationID, true, withUid));
  }
}

export function acceptAppointmentProposal(info) {
  return (dispatch, getState) => {
    var selfKey = info.selfKey;
    var conversationID = getState().contact.showConversationID;
    dispatch(sendAcceptance(info.content));
    dispatch(deleteEventFromMySchedule(info.content));
    removeMessage(selfKey, conversationID)
    .then(() => {
      dispatch(refreshMessageChain());
    })
    .catch((err) => {
      console.log("fuck", err);
    });
  };
}
