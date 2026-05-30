import { useState } from "react";

export function useCreateWish() {
  const [isPending, setIsPending] = useState(false);

  const mutate = (variables: { data: { text: string } }, options?: { onSuccess?: () => void }) => {
    setIsPending(true);
    setTimeout(() => {
      setIsPending(false);
      // Save wish to localStorage so the creator can see what they wished!
      try {
        const existing = JSON.parse(localStorage.getItem("varsha_wishes") || "[]");
        existing.push({ text: variables.data.text, date: new Date().toISOString() });
        localStorage.setItem("varsha_wishes", JSON.stringify(existing));
      } catch (e) {
        console.error("Failed to save wish to localStorage", e);
      }
      
      if (options?.onSuccess) {
        options.onSuccess();
      }
    }, 1000);
  };

  return { mutate, isPending };
}

export function useCreateFeeling() {
  const [isPending, setIsPending] = useState(false);

  const mutateAsync = async (variables: { data: { text: string } }) => {
    setIsPending(true);
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setIsPending(false);
        // Save feeling to localStorage so the creator can see what they felt!
        try {
          const existing = JSON.parse(localStorage.getItem("varsha_feelings") || "[]");
          existing.push({ text: variables.data.text, date: new Date().toISOString() });
          localStorage.setItem("varsha_feelings", JSON.stringify(existing));
        } catch (e) {
          console.error("Failed to save feeling to localStorage", e);
        }
        resolve();
      }, 1000);
    });
  };

  return { mutateAsync, isPending };
}
