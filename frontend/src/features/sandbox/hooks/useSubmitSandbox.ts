import { useNavigate } from 'react-router-dom';
import { useSandboxUi } from '../context/SandboxUiContext';
import { useActiveTable } from './useActiveTable';

export function useSubmitSandbox() {
  const navigate = useNavigate();
  const activeTable = useActiveTable();
  const { triggerToast } = useSandboxUi();

  const submitAndExit = () => {
    if (!activeTable) {
      triggerToast("No active database to submit");
      return;
    }

    const tableJson = JSON.stringify(activeTable, null, 2);

    console.log("=========================================");
    console.log("📊 SUBMITTED ACTIVE TABLE JSON REPRESENTATION");
    console.log("=========================================");
    console.log(tableJson);
    console.log("=========================================");

    /*
    // OPTIONAL: Sending the Table JSON payload via Axios POST request
    // To use this, first install axios into your project:
    // npmi axios
    // then uncomment the import at top: import axios from 'axios';
    //
    // const sendTableData = async () => {
    //   try {
    //     const response = await axios.post('https://your-custom-backend-api.com/v1/submit-table', activeTable, {
    //       headers: {
    //         'Content-Type': 'application/json'
    //       }
    //     });
    //     console.log('API Post request successful:', response.data);
    //   } catch (error) {
    //     console.error('API Post request failed:', error);
    //   }
    // };
    // sendTableData();
    */

    triggerToast("Matrix JSON submitted & printed to Console!");

    setTimeout(() => {
      navigate('/dashboard');
    }, 1500);
  };

  return { submitAndExit };
}
