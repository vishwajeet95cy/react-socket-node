import UserForm from "./components/UserForm";
import SocketContext, { socket, socketAuth } from "./config/socketContext";

function App() {
  return (
    <SocketContext.Provider value={{ socket, socketAuth }}>
      <UserForm />
    </SocketContext.Provider>
  );
}

export default App;
