type TitleProps = {
  children: React.ReactNode;
};

export default function Title({ children }: TitleProps) {
  return (
    <h1 className="text-slate-800 text-2xl font-semibold pb-4 border-b border-slate-300">
      {children}
    </h1>
  );
}
