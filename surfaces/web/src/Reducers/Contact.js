const initState = {
  conversationList: [],
  showConversationID: "",
  withUid: "",
  showMessageChain: [],
  chainStatus: "no_select",
  messageComposerStatus: "composing",
  sessionInvitationComposerStatus: "composing",
  invitationDefaultTime: null,
  composerMode: "plain_message",
};

export default function Contact(state=initState, action) {
  switch (action.type) {
    case "UPDATE_CONVERSATION_LIST": {
      return {
        ...state,
        conversationList: action.payload.val,
      };
    }

    case "UPDATE_COMPOSER_MODE": {
      return {
        ...state,
        composerMode: action.payload.val,
      };
    }

    case "UPDATE_INVITATION_DEFAULT_TIME": {
      return {
        ...state,
        invitationDefaultTime: action.payload.val,
      };
    }

    case "UPDATE_SESSION_INVITATION_COMPOSER_STATUS": {
      return {
        ...state,
        sessionInvitationComposerStatus: action.payload.val,
      };
    }

    case "UPDATE_WITH_UID": {
      return {
        ...state,
        withUid: action.payload.val,
      };
    }

    case "UPDATE_MESSAGE_COMPOSER_STATUS": {
      return {
        ...state,
        messageComposerStatus: action.payload.val,
      };
    }

    case "UPDATE_CHAIN_STATUS": {
      return {
        ...state,
        chainStatus: action.payload.val,
      };
    }

    case "UPDATE_SHOW_CONVERSATION_ID": {
      return {
        ...state,
        showConversationID: action.payload.val,
      };
    }

    case "UPDATE_SHOW_MESSAGE_CHAIN": {
      return {
        ...state,
        showMessageChain: action.payload.val,
      };
    }

    default: return state;
  }
}
