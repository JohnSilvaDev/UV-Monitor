import Form from "./components/Form";
import {Routes, Route} from 'react-router-dom'
import UVData from "./components/UVData";

function App() {
  return (
    <div>
<Form />
    </div>
  /* <Routes>
    <Route path="/" element = {<Form/>}/>
    <Route path="/forecast" element = {<UVData/>}/>
  </Routes>
     */
  );
}

export default App;
