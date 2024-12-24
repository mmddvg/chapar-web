import {create} from "zustand";

interface User {
  contact_id: string;
  name: string;
  pv_id : string;
  is_contact : boolean;
}

interface PrivateChat {
  id: string;
  user_id: string; 
  messages: PvMessage[];
}

interface GroupChat {
  id: string;
  name: string; 
  messages: GroupMessage[];
}

interface ChatState {
  chatters : User[];
  privateChats: PrivateChat[];
  groupChats: GroupChat[];

  serverUrl : string;


  addChatter:(chatter : User,is_contact : boolean) => void;
  addNonContactChatter:(Chatter:User,pv_id : string) => void;

  pushPvMessage: (pvId: string, message: PvMessage) => void;
  pushGroupMessage: (groupId: string, message: GroupMessage) => void;

  setPvMessages: (pvId: string, message: PvMessage[]) => void;
  setGroupMessages: (groupId: string, message: GroupMessage[]) => void;

  addPrivateChat: (chat: PrivateChat) => void;
  addGroupChat: (chat: GroupChat) => void;

  switchServer: () => void;
}

const useChatStore = create<ChatState>((set) => ({
  contacts: [],
  privateChats: [],
  groupChats: [],
  chatters : [],
  serverUrl:"localhost:8080",


  switchServer:()=> set(state => {return {serverUrl:state.serverUrl == "localhost:8080"?"localhost:8081":"localhost:8080"}}),


  addChatter:(chatter,is_contact)=> set(state => {
    const exists = state.chatters.some((c) => c.contact_id == chatter.contact_id);
    if (exists) return state; 
    return {chatters:[...state.chatters,{...chatter,is_contact}]}
  }),

  addNonContactChatter:(chatter,pv_id) => set((state) => {
    const exists = state.chatters.some((c) => c.contact_id == chatter.contact_id);
    if (exists) return state; 

    return {chatters:[...state.chatters,{...chatter,is_contact:false,pv_id:pv_id}]};
  }),

  pushPvMessage: (pvId, message) =>
    set((state) => {
      const exists = state.privateChats.find(d => d.id == pvId)?.messages.some(d => d.id == message.id)
      if (exists) return state;
      const updatedPrivateChats = state.privateChats.map((chat) =>
        chat.id === pvId
          ? { ...chat, messages: [...chat.messages, message] }
          : chat
      );
      return { privateChats: updatedPrivateChats };
    }),

  pushGroupMessage: (groupId, message) =>
    set((state) => {
      const updatedGroupChats = state.groupChats.map((chat) =>
        chat.id === groupId
          ? { ...chat, messages: [...chat.messages, message] }
          : chat
      );
      return { groupChats: updatedGroupChats };
    }),
    setPvMessages: (pvId, messages) =>
      set((state) => {
        let tmp = state.privateChats;
        tmp[tmp.findIndex(d => d.id == pvId)].messages = messages??[];
        return {privateChats:tmp};
      }),
    
      setGroupMessages: (pvId, messages) =>
        set((state) => {
          let tmp = state.groupChats;
          tmp[tmp.findIndex(d => d.id == pvId)].messages = messages??[];
          return {groupChats:tmp};
        }),
  addPrivateChat: (chat) =>
    set((state) => ({
      privateChats: [...state.privateChats, chat],
    })),

  addGroupChat: (chat) =>
    set((state) => ({
      groupChats: [...state.groupChats, chat],
    })),
}));

export default useChatStore;
