function AddModal({ page_name, children }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm transition-opacity duration-200 animate-in fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-2xl ring-1 ring-black/5 animate-in zoom-in-95 duration-200">
        {/* Header Section */}
        <div className="mb-6">
          <h3 id="modal-title" className="text-lg font-semibold text-gray-900">
            Add New {page_name}
          </h3>
          <p className="mt-1.5 text-sm text-gray-500">
            Enter the details below to register a new {page_name.toLowerCase()}.
          </p>
        </div>
        {children}
      </div>
    </div>
  );
}

export default AddModal;
