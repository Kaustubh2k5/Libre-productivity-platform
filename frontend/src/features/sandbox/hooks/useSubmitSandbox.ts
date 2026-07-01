import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSandboxUi } from '../context/SandboxUiContext';
import { useActiveTable } from './useActiveTable';
import { createSandboxTable } from '../api/sandboxApi';

export function useSubmitSandbox() {
  const navigate = useNavigate();
  const activeTable = useActiveTable();
  const { triggerToast } = useSandboxUi();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitAndExit = async () => {
    if (!activeTable) {
      triggerToast('No active database to submit');
      return;
    }

    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      await createSandboxTable(activeTable);
      triggerToast('Matrix saved successfully');

      setTimeout(() => {
        navigate('/dashboard');
      }, 800);
    } catch (error) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.error || error.response?.data?.errors?.formErrors?.[0] || error.message
        : 'Unable to save matrix';

      triggerToast(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return { submitAndExit, isSubmitting };
}
