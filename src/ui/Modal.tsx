type ModalProps = {
  children: React.ReactNode;
};

export default function Modal({ children }: ModalProps) {
  return (
    <div className="w-full h-full fixed z-30 inset-0 bg-black/50 flex justify-center items-center overflow-auto">
      {children}
    </div>
  );
}
