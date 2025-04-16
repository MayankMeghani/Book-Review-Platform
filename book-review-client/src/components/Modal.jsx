const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
  
    const handleOverlayClick = (e) => {
      // If the user clicked on the overlay (not inside the modal content)
      onClose();
    };
  
    const handleContentClick = (e) => {
      // Prevent click inside the modal from bubbling up to overlay
      e.stopPropagation();
    };
  
    return (
      <div
        className="fixed inset-0 bg-gray-50 bg-opacity-75 flex justify-center items-center z-50"
        onClick={handleOverlayClick}
      >
        <div
          className="bg-white p-6 rounded-md shadow-lg max-w-lg w-full relative"
          onClick={handleContentClick}
        >
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500"
          >
            <span className="text-xl">×</span>
          </button>
          {children}
        </div>
      </div>
    );
  };
  
  export default Modal;
  