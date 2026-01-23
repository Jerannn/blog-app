import { useState } from "react";

function useFileChange() {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] ?? null;
    setFile(selectedFile);
    console.log(selectedFile);
  };
  return { file, setFile, handleFileChange };
}

export default useFileChange;
