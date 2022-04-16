import { useReducer, useContext, createContext } from "react";

const ModalContext = createContext();
ModalContext.displayName = "ModalContext";

const initialState = {
  data: {
    title: "",
    tagline: "",
    body: "",
  },
  document_id: null,
  colour: "green",
  open: false,
  pinned: false,
};

const actionTypes = {
  createNewNote: "CREATE-NEW-NOTE",
  syncNote: "SYNC-NOTE",
  closeNote: "CLOSE-NOTE",
  setTitle: "SET-TITLE",
  setTagline: "SET-TAGLINE",
  setBody: "SET-BODY",
  setColour: "SET-COLOUR",
};

const modalReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.createNewNote: {
      return {
        ...state,
        open: true,
      };
    }
    case actionTypes.syncNote: {
      const data = {
        title: action.payload.title,
        tagline: action.payload.tagline,
        body: action.payload.body,
      };
      return {
        ...state,
        data,
        colour: action.payload.colour,
        document_id: action.payload.id,
        pinned: action.payload.pinned,
        open: true,
      };
    }
    case actionTypes.closeNote: {
      return {
        ...initialState,
        open: false,
      };
    }
    case actionTypes.setTitle: {
      const data = { ...state.data, title: action.payload };
      return {
        ...state,
        data,
      };
    }
    case actionTypes.setTagline: {
      const data = { ...state.data, tagline: action.payload };
      return {
        ...state,
        data,
      };
    }
    case actionTypes.setBody: {
      const data = { ...state.data, body: action.payload };
      return {
        ...state,
        data,
      };
    }
    case actionTypes.setColour: {
      return {
        ...state,
        colour: action.payload,
      };
    }
    default: {
      throw new Error(`Unhandled action type in useNoteModal: ${action.type}`);
    }
  }
};

function ModalProvider({ children }) {
  const [state, dispatch] = useReducer(modalReducer, initialState);

  const value = [state, dispatch];
  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
}

export function useNoteModal() {
  const context = useContext(ModalContext);

  if (context === undefined) {
    throw new Error(`useNoteModal must be used within a Modal Provider`);
  }

  const [state, dispatch] = context;

  const createNote = () => dispatch({ type: actionTypes.createNewNote });
  const setTitle = (title) =>
    dispatch({ type: actionTypes.setTitle, payload: title });
  const setTagline = (tagline) =>
    dispatch({ type: actionTypes.setTagline, payload: tagline });
  const setBody = (body) =>
    dispatch({ type: actionTypes.setBody, payload: body });
  const setColour = (colour) =>
    dispatch({ type: actionTypes.setColour, payload: colour });
  const syncNote = (data) =>
    dispatch({ type: actionTypes.syncNote, payload: data });

  const closeNote = () => dispatch({ type: actionTypes.closeNote });

  return {
    ...state,
    state,
    createNote,
    syncNote,
    closeNote,
    setTitle,
    setTagline,
    setBody,
    setColour,
  };
}

export default ModalProvider;
