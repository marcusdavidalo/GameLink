import React, { useRef } from "react";

const AvatarModal = ({ onClose, onUpload, onRemove }) => {
  const fileInputRef = useRef();

  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      onUpload(file);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
      <div className="bg-[rgba(31,41,55,0.5)] backdrop-blur-md rounded-lg p-4 h-auto w-auto overflow-y-auto">
        <div className="flex flex-col">
          <button
            className="bg-cyan-600/60 rounded-md text-base font-semibold px-20 py-1 my-1"
            onClick={() => fileInputRef.current.click()}
          >
            Upload Photo
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/"
          />
          <button
            className="bg-amber-600/60 rounded-md text-base font-semibold px-20 py-1 my-1"
            onClick={onRemove}
          >
            Remove Photo
          </button>
          <button
            className="bg-red-600/60 rounded-md text-base font-semibold px-20 py-1 my-1"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AvatarModal;
