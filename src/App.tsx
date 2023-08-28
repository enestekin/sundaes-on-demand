import Options from "./pages/entry/Option";
import SummaryForm from "./pages/summary/SummaryForm";

function App() {
  return (
    <div>
      <SummaryForm />
      <Options optionType="scoops" />
    </div>
  );
}

export default App;
