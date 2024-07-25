import './App.css';
import Layout from './layout/Layout';
import { SocketProvider } from './context/SocketContext';




function App() {
  
  return (
    <>
     <SocketProvider>
     <Layout />
     </SocketProvider>
    </>
  )
}

export default App
 